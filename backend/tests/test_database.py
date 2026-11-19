import pytest
from sqlmodel import SQLModel, Session, create_engine, select
from app.models.category import Category, ProductCategoryLink
from app.models.image import MediaAsset, ProductImageLink
from app.models.product import Product, ProductVariation
from app.models.optical import LensUsageType, LensCoating
from app.models.order import Customer, Order, OrderItem


@pytest.fixture(name="db_session")
def db_session_fixture():
    # In-memory SQLite for testing SQLModel schema & relational integrity
    test_engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
    SQLModel.metadata.create_all(test_engine)

    with Session(test_engine) as session:
        yield session

    SQLModel.metadata.drop_all(test_engine)


def test_category_hierarchy_and_products(db_session: Session):
    # Root category
    parent_cat = Category(id=15, name="AL Mahash", slug="al-mahash")
    db_session.add(parent_cat)
    db_session.commit()

    # Child category
    child_cat = Category(id=155, name="Coat", slug="coat", parent_id=15)
    db_session.add(child_cat)
    db_session.commit()
    db_session.refresh(parent_cat)

    assert len(parent_cat.children) == 1
    assert parent_cat.children[0].name == "Coat"
    assert child_cat.parent.name == "AL Mahash"


def test_product_variations_and_cascade(db_session: Session):
    # Media Asset
    img = MediaAsset(
        id=4629,
        title="Maybach Frame Photo",
        file_path="2025/07/maybach.jpg",
        original_url="https://ridaoptical.com/wp-content/uploads/2025/07/maybach.jpg",
    )
    db_session.add(img)

    # Product
    product = Product(
        id=4634,
        title="Maybach Rimless Frame",
        slug="maybach-rimless",
        sku="RO-4634",
        base_price_pkr=2500.0,
        primary_image_id=4629,
    )
    db_session.add(product)
    db_session.commit()

    # Variations
    var1 = ProductVariation(
        id=4727,
        product_id=4634,
        title="Maybach Rimless - Silver",
        slug="maybach-rimless-silver",
        sku="RO-4634-SILVER",
        color_name="Silver",
        color_slug="silver",
        color_hex="#C0C0C0",
        price_pkr=2500.0,
    )
    var2 = ProductVariation(
        id=4728,
        product_id=4634,
        title="Maybach Rimless - Golden",
        slug="maybach-rimless-golden",
        sku="RO-4634-GOLDEN",
        color_name="Golden",
        color_slug="golden",
        color_hex="#FFD700",
        price_pkr=2800.0,
    )
    db_session.add_all([var1, var2])
    db_session.commit()
    db_session.refresh(product)

    assert len(product.variations) == 2
    assert product.variations[0].color_name == "Silver"
    assert product.variations[1].color_name == "Golden"


def test_optical_options_persistence(db_session: Session):
    usage = LensUsageType(
        id="single-vision",
        name="Single Vision",
        slug="single-vision",
        price_modifier_pkr=0.0,
        is_default=True,
    )
    coating = LensCoating(
        id="screen-standard",
        name="Screen Standard (Blue-Cut)",
        slug="screen-standard",
        category="blue_cut",
        price_pkr=1700.0,
    )
    db_session.add_all([usage, coating])
    db_session.commit()

    queried_coating = db_session.exec(select(LensCoating).where(LensCoating.id == "screen-standard")).first()
    assert queried_coating is not None
    assert queried_coating.price_pkr == 1700.0
    assert queried_coating.category == "blue_cut"


def test_order_creation_flow(db_session: Session):
    customer = Customer(
        full_name="Muhammad Ali",
        phone="03212318001",
        address="Fatima Shopping Mall, Main Kasba Colony",
        city="Karachi",
    )
    db_session.add(customer)
    db_session.commit()

    order = Order(
        order_number="RO-99881",
        customer_id=customer.id,
        subtotal_pkr=4200.0,
        shipping_fee_pkr=349.0,
        total_amount_pkr=4549.0,
        shipping_address="Fatima Shopping Mall, Main Kasba Colony",
        shipping_city="Karachi",
    )
    db_session.add(order)
    db_session.commit()

    item = OrderItem(
        order_id=order.id,
        product_id=4634,
        variation_id=4727,
        product_title="Maybach Rimless Frame",
        variation_title="Silver",
        unit_frame_price=2500.0,
        quantity=1,
        line_total=4200.0,
        has_prescription=True,
        lens_usage_id="single-vision",
        lens_coating_id="screen-standard",
        optical_surcharge=1700.0,
        prescription_text="OD: -2.00, OS: -1.75",
    )
    db_session.add(item)
    db_session.commit()
    db_session.refresh(order)

    assert len(order.items) == 1
    assert order.items[0].optical_surcharge == 1700.0
    assert order.customer.full_name == "Muhammad Ali"
    assert order.total_amount_pkr == 4549.0
