import pytest
from starlette.testclient import TestClient


@pytest.fixture
def admin_headers(client: TestClient):
    res = client.post(
        "/api/v1/auth/login",
        json={"email": "ridaoptical@gmail.com", "password": "Optical@1234"},
    )
    assert res.status_code == 200
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_admin_list_products(client: TestClient, admin_headers: dict):
    res = client.get("/api/v1/admin/products", headers=admin_headers)
    assert res.status_code == 200
    data = res.json()
    assert "total" in data
    assert "items" in data
    assert data["total"] >= 17
    first_prod = data["items"][0]
    assert "id" in first_prod
    assert "title" in first_prod
    assert "base_price_pkr" in first_prod
    assert "stock_status" in first_prod


def test_admin_create_and_delete_product(client: TestClient, admin_headers: dict):
    # 1. Create product
    new_product_payload = {
        "title": "Titanium Aviator Flex Eyeglasses",
        "category_slug": "eye-glasses",
        "base_price_pkr": 3800.0,
        "sale_price_pkr": 3400.0,
        "sku": "RO-TITANIUM-01",
        "stock_status": "instock",
        "is_featured": True,
        "has_prescription_support": True,
        "primary_image_url": "https://ik.imagekit.io/ridaoptical/tr:w-600/sample-glasses-1.jpg",
        "description": "Ultra lightweight aerospace titanium frames designed for prescription lenses.",
        "short_description": "Titanium flexible optical frame.",
        "variations": [
            {
                "color_name": "Brushed Gold",
                "color_hex": "#D4AF37",
                "price_pkr": 3800.0,
            },
            {
                "color_name": "Midnight Gunmetal",
                "color_hex": "#2C3539",
                "price_pkr": 3800.0,
            },
        ],
    }

    create_res = client.post("/api/v1/admin/products", json=new_product_payload, headers=admin_headers)
    assert create_res.status_code == 201
    created_data = create_res.json()
    assert created_data["success"] is True
    prod = created_data["product"]
    assert prod["title"] == "Titanium Aviator Flex Eyeglasses"
    assert prod["base_price_pkr"] == 3800.0
    assert len(prod["variations"]) == 2
    created_id = prod["id"]
    created_slug = prod["slug"]

    # 2. Verify product is immediately retrievable from public catalog
    get_res = client.get(f"/api/v1/products/{created_slug}")
    assert get_res.status_code == 200
    public_prod = get_res.json()
    assert public_prod["id"] == created_id
    assert public_prod["title"] == "Titanium Aviator Flex Eyeglasses"

    # 3. Delete product via admin
    delete_res = client.delete(f"/api/v1/admin/products/{created_id}", headers=admin_headers)
    assert delete_res.status_code == 200
    assert delete_res.json()["success"] is True

    # 4. Verify product is no longer in catalog
    get_after_delete = client.get(f"/api/v1/products/{created_slug}")
    assert get_after_delete.status_code == 404


def test_admin_create_product_unauthorized(client: TestClient):
    res = client.post(
        "/api/v1/admin/products",
        json={"title": "Hacker Frame", "base_price_pkr": 1000.0},
    )
    assert res.status_code == 401
