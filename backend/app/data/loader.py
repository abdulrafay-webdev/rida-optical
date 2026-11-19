import json
import urllib.parse
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, List, Dict, Any, Tuple
from app.core.config import settings
from app.schemas.product import ProductFilterQuery
from app.schemas.order import OrderCreate, OrderResponse, OrderItemDetail, CustomerInfoCreate


class DataRepository:
    def __init__(self):
        self._products: List[Dict[str, Any]] = []
        self._categories: List[Dict[str, Any]] = []
        self._reviews: List[Dict[str, Any]] = []
        self._optical_config: Dict[str, Any] = {}

        self._products_by_id: Dict[int, Dict[str, Any]] = {}
        self._products_by_slug: Dict[str, Dict[str, Any]] = {}
        self._categories_by_id: Dict[int, Dict[str, Any]] = {}
        self._categories_by_slug: Dict[str, Dict[str, Any]] = {}
        self._coatings_by_id: Dict[str, Dict[str, Any]] = {}
        self._usage_by_id: Dict[str, Dict[str, Any]] = {}

        self._load_data()

    def _get_data_dir(self) -> Path:
        here = Path(__file__).resolve().parent
        for candidate in [
            here.parent.parent / "data",
            here.parent.parent.parent / "backend" / "data",
            here.parent.parent.parent / "data",
        ]:
            if candidate.exists() and (candidate / "products.json").exists():
                return candidate
        return here.parent.parent / "data"

    def _load_data(self):
        data_dir = self._get_data_dir()

        products_file = data_dir / "products.json"
        categories_file = data_dir / "categories.json"
        optical_file = data_dir / "optical_options.json"

        if products_file.exists():
            with open(products_file, "r", encoding="utf-8") as f:
                self._products = json.load(f)
                for p in self._products:
                    self._products_by_id[p["id"]] = p
                    self._products_by_slug[p["slug"]] = p

        if categories_file.exists():
            with open(categories_file, "r", encoding="utf-8") as f:
                self._categories = json.load(f)
                for c in self._categories:
                    self._categories_by_id[c["id"]] = c
                    self._categories_by_slug[c["slug"]] = c

        if optical_file.exists():
            with open(optical_file, "r", encoding="utf-8") as f:
                self._optical_config = json.load(f)
                for c in self._optical_config.get("step_2_lens_coatings", []):
                    self._coatings_by_id[c["id"]] = c
                for u in self._optical_config.get("step_1_usage_types", []):
                    self._usage_by_id[u["id"]] = u

        reviews_file = data_dir / "reviews.json"
        if reviews_file.exists():
            with open(reviews_file, "r", encoding="utf-8") as f:
                self._reviews = json.load(f)

    # --------------------------------------------------------------------------
    # Products
    # --------------------------------------------------------------------------
    def get_products(self, params: ProductFilterQuery) -> Tuple[List[Dict[str, Any]], int]:
        items = list(self._products)

        # 1. Search query
        if params.q and params.q.strip():
            q = params.q.strip().lower()
            items = [
                p for p in items
                if q in p["title"].lower()
                or q in p.get("sku", "").lower()
                or q in p.get("description", "").lower()
                or any(q in v.get("color", {}).get("name", "").lower() for v in p.get("variations", []))
            ]

        # 2. Category filter
        if params.category and params.category.lower() not in ("all", "store"):
            cat_slug = params.category.lower()
            items = [
                p for p in items
                if (p.get("primary_category") and p["primary_category"].get("slug") == cat_slug)
                or any(c.get("slug") == cat_slug for c in p.get("all_categories", []))
            ]

        # 3. Price range
        if params.min_price is not None:
            items = [p for p in items if p["base_price_pkr"] >= params.min_price]
        if params.max_price is not None:
            items = [p for p in items if p["base_price_pkr"] <= params.max_price]

        # 4. Color filter
        if params.color:
            c_query = params.color.strip().lower()
            items = [
                p for p in items
                if any(c_query in v.get("color", {}).get("name", "").lower() for v in p.get("variations", []))
            ]

        # 5. In-stock only
        if params.in_stock_only:
            items = [p for p in items if p.get("stock_status") == "instock"]

        # 6. Prescription support
        if params.has_prescription is not None:
            items = [p for p in items if p.get("has_prescription_support") == params.has_prescription]

        # 7. Sorting
        if params.sort_by == "price_asc":
            items.sort(key=lambda x: x["base_price_pkr"])
        elif params.sort_by == "price_desc":
            items.sort(key=lambda x: x["base_price_pkr"], reverse=True)
        elif params.sort_by == "title_asc":
            items.sort(key=lambda x: x["title"])
        # default is featured / original order

        total = len(items)

        # 8. Pagination
        start = (params.page - 1) * params.page_size
        end = start + params.page_size
        paginated_items = items[start:end]

        # Transform to list item schema representation
        list_items = []
        for p in paginated_items:
            colors = []
            seen_colors = set()
            for v in p.get("variations", []):
                c = v.get("color", {})
                c_name = c.get("name")
                if c_name and c_name not in seen_colors:
                    seen_colors.add(c_name)
                    colors.append(c)

            list_items.append({
                "id": p["id"],
                "title": p["title"],
                "slug": p["slug"],
                "sku": p["sku"],
                "base_price_pkr": p["base_price_pkr"],
                "regular_price_pkr": p.get("regular_price_pkr"),
                "sale_price_pkr": p.get("sale_price_pkr"),
                "stock_status": p.get("stock_status", "instock"),
                "is_featured": p.get("is_featured", False),
                "primary_category": p.get("primary_category"),
                "has_prescription_support": p.get("has_prescription_support", True),
                "primary_image": p["primary_image"],
                "variations_count": p.get("variations_count", len(p.get("variations", []))),
                "available_colors": colors,
            })

        return list_items, total

    def get_product(self, identifier: str | int) -> Optional[Dict[str, Any]]:
        if isinstance(identifier, int) or (isinstance(identifier, str) and identifier.isdigit()):
            return self._products_by_id.get(int(identifier))
        return self._products_by_slug.get(str(identifier))

    def add_product(self, product_dict: Dict[str, Any]) -> Dict[str, Any]:
        if "id" not in product_dict or not product_dict["id"]:
            max_id = max(self._products_by_id.keys(), default=5000)
            product_dict["id"] = max_id + 1

        p_id = product_dict["id"]
        slug = product_dict.get("slug") or f"product-{p_id}"
        product_dict["slug"] = slug

        # Prepend to list so newest product appears first
        self._products.insert(0, product_dict)
        self._products_by_id[p_id] = product_dict
        self._products_by_slug[slug] = product_dict

        # Persist to disk if data_dir is writable
        try:
            data_file = self._get_data_dir() / "products.json"
            if data_file.exists():
                with open(data_file, "w", encoding="utf-8") as f:
                    json.dump(self._products, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

        return product_dict

    def delete_product(self, product_id: int) -> bool:
        if product_id not in self._products_by_id:
            return False

        prod = self._products_by_id.pop(product_id)
        slug = prod.get("slug")
        if slug and slug in self._products_by_slug:
            del self._products_by_slug[slug]

        self._products = [p for p in self._products if p["id"] != product_id]

        try:
            data_file = self._get_data_dir() / "products.json"
            if data_file.exists():
                with open(data_file, "w", encoding="utf-8") as f:
                    json.dump(self._products, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

        return True

    def update_product(self, product_id: int, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        if product_id not in self._products_by_id:
            return None

        prod = self._products_by_id[product_id]
        old_slug = prod.get("slug")

        for k, v in updates.items():
            if v is not None:
                prod[k] = v

        new_slug = prod.get("slug")
        if old_slug and new_slug and old_slug != new_slug:
            if old_slug in self._products_by_slug:
                del self._products_by_slug[old_slug]
            self._products_by_slug[new_slug] = prod

        try:
            data_file = self._get_data_dir() / "products.json"
            if data_file.exists():
                with open(data_file, "w", encoding="utf-8") as f:
                    json.dump(self._products, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

        return prod

    # --------------------------------------------------------------------------
    # Categories
    # --------------------------------------------------------------------------
    def get_categories(self, parent_only: bool = False, as_tree: bool = False) -> List[Dict[str, Any]]:
        if as_tree:
            # Build hierarchy
            parent_cats = [dict(c) for c in self._categories if not c.get("parent_id")]
            cat_map = {c["id"]: c for c in parent_cats}
            for c in parent_cats:
                c["children"] = []

            for c in self._categories:
                pid = c.get("parent_id")
                if pid and pid in cat_map:
                    cat_map[pid]["children"].append(c)
            return parent_cats

        if parent_only:
            return [c for c in self._categories if not c.get("parent_id")]

        return self._categories

    def get_category(self, slug_or_id: str | int) -> Optional[Dict[str, Any]]:
        if isinstance(slug_or_id, int) or (isinstance(slug_or_id, str) and slug_or_id.isdigit()):
            return self._categories_by_id.get(int(slug_or_id))
        return self._categories_by_slug.get(str(slug_or_id))

    def add_category(self, cat_dict: Dict[str, Any]) -> Dict[str, Any]:
        if "id" not in cat_dict or not cat_dict["id"]:
            max_id = max(self._categories_by_id.keys(), default=200)
            cat_dict["id"] = max_id + 1

        cid = cat_dict["id"]
        slug = cat_dict.get("slug") or f"category-{cid}"
        cat_dict["slug"] = slug
        cat_dict["product_count"] = cat_dict.get("product_count", 0)

        self._categories.append(cat_dict)
        self._categories_by_id[cid] = cat_dict
        self._categories_by_slug[slug] = cat_dict

        try:
            data_file = self._get_data_dir() / "categories.json"
            if data_file.exists():
                with open(data_file, "w", encoding="utf-8") as f:
                    json.dump(self._categories, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

        return cat_dict

    def delete_category(self, category_id: int) -> bool:
        if category_id not in self._categories_by_id:
            return False

        cat = self._categories_by_id.pop(category_id)
        slug = cat.get("slug")
        if slug and slug in self._categories_by_slug:
            del self._categories_by_slug[slug]

        self._categories = [c for c in self._categories if c["id"] != category_id]

        try:
            data_file = self._get_data_dir() / "categories.json"
            if data_file.exists():
                with open(data_file, "w", encoding="utf-8") as f:
                    json.dump(self._categories, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

        return True

    # --------------------------------------------------------------------------
    # Reviews
    # --------------------------------------------------------------------------
    def get_reviews(self) -> List[Dict[str, Any]]:
        return self._reviews

    def add_review(self, rev_dict: Dict[str, Any]) -> Dict[str, Any]:
        if "id" not in rev_dict or not rev_dict["id"]:
            max_id = max([r["id"] for r in self._reviews], default=0)
            rev_dict["id"] = max_id + 1

        if "created_at" not in rev_dict:
            rev_dict["created_at"] = datetime.now(timezone.utc).isoformat()

        self._reviews.insert(0, rev_dict)

        try:
            data_file = self._get_data_dir() / "reviews.json"
            with open(data_file, "w", encoding="utf-8") as f:
                json.dump(self._reviews, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

        return rev_dict

    def delete_review(self, review_id: int) -> bool:
        initial_len = len(self._reviews)
        self._reviews = [r for r in self._reviews if r["id"] != review_id]

        if len(self._reviews) < initial_len:
            try:
                data_file = self._get_data_dir() / "reviews.json"
                with open(data_file, "w", encoding="utf-8") as f:
                    json.dump(self._reviews, f, indent=2, ensure_ascii=False)
            except Exception:
                pass
            return True
        return False

    # --------------------------------------------------------------------------
    # Optical Options
    # --------------------------------------------------------------------------
    def get_optical_config(self) -> Dict[str, Any]:
        return self._optical_config

    # --------------------------------------------------------------------------
    # Search
    # --------------------------------------------------------------------------
    def search(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        if not query or not query.strip():
            return []
        q = query.strip().lower()
        matches = []
        for p in self._products:
            score = 0
            if q in p["title"].lower():
                score += 10
            if q in p.get("sku", "").lower():
                score += 15
            if any(q in v.get("color", {}).get("name", "").lower() for v in p.get("variations", [])):
                score += 5
            if q in p.get("description", "").lower():
                score += 2

            if score > 0:
                matches.append((score, {
                    "id": p["id"],
                    "title": p["title"],
                    "slug": p["slug"],
                    "sku": p["sku"],
                    "base_price_pkr": p["base_price_pkr"],
                    "primary_category": p.get("primary_category"),
                    "primary_image": p["primary_image"],
                }))

        matches.sort(key=lambda x: x[0], reverse=True)
        return [item for _, item in matches[:limit]]

    # --------------------------------------------------------------------------
    # Order Processing & WhatsApp Dispatch
    # --------------------------------------------------------------------------
    def create_order(self, order_in: OrderCreate) -> OrderResponse:
        import random
        order_id = f"RO-{random.randint(10000, 99999)}"
        created_at = datetime.now(timezone.utc).isoformat()

        order_items_detail: List[OrderItemDetail] = []
        subtotal = 0.0

        for item in order_in.items:
            product = self._products_by_id.get(item.product_id)
            if not product:
                continue

            # Determine frame price & variation
            unit_frame_price = product["base_price_pkr"]
            variation_title = None

            if item.variation_id:
                for v in product.get("variations", []):
                    if v.get("variation_id") == item.variation_id:
                        unit_frame_price = v.get("price_pkr", unit_frame_price)
                        variation_title = v.get("color", {}).get("name")
                        break

            # Optical surcharge
            optical_surcharge = 0.0
            optical_details = None

            if item.optical_selection and item.optical_selection.type == "prescription":
                coating_id = item.optical_selection.coating_id
                if coating_id and coating_id in self._coatings_by_id:
                    optical_surcharge = self._coatings_by_id[coating_id]["price_pkr"]

                usage_name = None
                if item.optical_selection.usage_id and item.optical_selection.usage_id in self._usage_by_id:
                    usage_name = self._usage_by_id[item.optical_selection.usage_id]["name"]

                optical_details = {
                    "type": "prescription",
                    "usage": usage_name,
                    "coating": self._coatings_by_id.get(coating_id, {}).get("name") if coating_id else None,
                    "prescription": item.optical_selection.prescription.model_dump() if item.optical_selection.prescription else None
                }

            unit_total = unit_frame_price + optical_surcharge
            line_total = unit_total * item.quantity
            subtotal += line_total

            order_items_detail.append(OrderItemDetail(
                product_id=product["id"],
                product_title=product["title"],
                variation_id=item.variation_id,
                variation_title=variation_title,
                unit_frame_price=unit_frame_price,
                optical_surcharge=optical_surcharge,
                unit_total_price=unit_total,
                quantity=item.quantity,
                line_total=line_total,
                optical_details=optical_details
            ))

        discount_amount = 0.0
        if order_in.coupon_code:
            code = order_in.coupon_code.strip().upper()
            from app.api.v1.endpoints.coupons import ACTIVE_COUPONS
            if code in ACTIVE_COUPONS and subtotal >= ACTIVE_COUPONS[code]["min_subtotal"]:
                percent = ACTIVE_COUPONS[code]["discount_percent"]
                discount_amount = round((subtotal * percent) / 100.0, 2)

        shipping_fee = settings.FLAT_SHIPPING_FEE_PKR if order_items_detail else 0.0
        total_amount = max(0.0, subtotal - discount_amount) + shipping_fee

        # Generate WhatsApp order message URL
        wa_message = f"*New Order #{order_id} - Rida Optical*\n"
        wa_message += "----------------------------------------\n"
        for idx, it in enumerate(order_items_detail, 1):
            wa_message += f"{idx}. *{it.product_title}*\n"
            if it.variation_title:
                wa_message += f"   • Color: {it.variation_title}\n"
            if it.optical_details:
                if it.optical_details.get('usage'):
                    wa_message += f"   • Usage: {it.optical_details['usage']}\n"
                if it.optical_details.get('coating'):
                    wa_message += f"   • Coating: {it.optical_details['coating']}\n"
            wa_message += f"   • Qty: {it.quantity} × Rs. {int(it.unit_total_price):,}\n\n"

        wa_message += "----------------------------------------\n"
        wa_message += f"*Subtotal:* Rs. {int(subtotal):,}\n"
        if discount_amount > 0:
            wa_message += f"*Discount ({order_in.coupon_code.upper()}):* -Rs. {int(discount_amount):,}\n"
        wa_message += f"*Delivery Fee:* Rs. {int(shipping_fee):,}\n"
        wa_message += f"*Total (COD):* Rs. {int(total_amount):,}\n"
        wa_message += "----------------------------------------\n"
        wa_message += f"*Customer:* {order_in.customer.full_name}\n"
        wa_message += f"*Phone:* {order_in.customer.phone}\n"
        wa_message += f"*Address:* {order_in.customer.address}, {order_in.customer.city}\n"

        phone_clean = settings.STORE_PHONE.replace("+", "").replace(" ", "")
        encoded_text = urllib.parse.quote(wa_message)
        whatsapp_url = f"https://wa.me/{phone_clean}?text={encoded_text}"

        # Persist to Neon PostgreSQL if database is accessible
        try:
            from sqlmodel import Session, select
            from app.core.database import engine
            from app.models.order import Customer as DBCustomer, Order as DBOrder, OrderItem as DBOrderItem

            with Session(engine) as session:
                # 1. Create / match customer
                db_customer = session.exec(
                    select(DBCustomer).where(DBCustomer.phone == order_in.customer.phone)
                ).first()
                if not db_customer:
                    db_customer = DBCustomer(
                        full_name=order_in.customer.full_name,
                        phone=order_in.customer.phone,
                        alternate_phone=order_in.customer.alternate_phone,
                        email=order_in.customer.email,
                        address=order_in.customer.address,
                        city=order_in.customer.city,
                        postal_code=order_in.customer.postal_code,
                    )
                    session.add(db_customer)
                    session.commit()
                    session.refresh(db_customer)

                # 2. Create order
                db_order = DBOrder(
                    order_number=order_id,
                    customer_id=db_customer.id,
                    status="pending",
                    payment_method=order_in.payment_method,
                    subtotal_pkr=subtotal,
                    shipping_fee_pkr=shipping_fee,
                    discount_pkr=discount_amount,
                    total_amount_pkr=total_amount,
                    shipping_address=order_in.customer.address,
                    shipping_city=order_in.customer.city,
                    order_notes=order_in.customer.order_notes,
                )
                session.add(db_order)
                session.commit()
                session.refresh(db_order)

                # 3. Create items
                for it in order_items_detail:
                    db_item = DBOrderItem(
                        order_id=db_order.id,
                        product_id=it.product_id,
                        variation_id=it.variation_id,
                        product_title=it.product_title,
                        variation_title=it.variation_title,
                        unit_frame_price=it.unit_frame_price,
                        quantity=it.quantity,
                        line_total=it.line_total,
                        has_prescription=bool(it.optical_details and it.optical_details.get("type") == "prescription"),
                        optical_surcharge=it.optical_surcharge,
                        prescription_text=it.optical_details.get("prescription", {}).get("prescription_text") if it.optical_details else None,
                    )
                    session.add(db_item)
                session.commit()
        except Exception as e:
            # Non-blocking log if DB unavailable
            pass

        return OrderResponse(
            order_id=order_id,
            created_at=created_at,
            status="pending",
            payment_method=order_in.payment_method,
            customer=order_in.customer,
            items=order_items_detail,
            subtotal_pkr=subtotal,
            shipping_fee_pkr=shipping_fee,
            discount_pkr=discount_amount,
            total_amount_pkr=total_amount,
            whatsapp_url=whatsapp_url,
            tracking_note="Order submitted for dispatch via TCS/Leopards Courier with Cash on Delivery."
        )


repo = DataRepository()
