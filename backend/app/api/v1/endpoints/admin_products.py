import re
import random
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select, func
from app.core.database import get_session
from app.api.deps import get_current_admin
from app.models.user import User
from app.models.product import Product, ProductVariation
from app.models.category import Category, ProductCategoryLink
from app.models.image import MediaAsset
from app.schemas.product import AdminProductCreate, AdminProductUpdate
from app.data.loader import repo

router = APIRouter()


def slugify(text: str) -> str:
    cleaned = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    return re.sub(r"[-\s]+", "-", cleaned)


@router.get("", summary="Admin: List all products for catalog management")
async def list_admin_products(
    q: Optional[str] = Query(None, description="Search by title, SKU, or category"),
    category: Optional[str] = Query(None),
    admin: User = Depends(get_current_admin),
):
    products = repo._products
    if q and q.strip():
        term = q.strip().lower()
        products = [
            p for p in products
            if term in p["title"].lower()
            or term in p.get("sku", "").lower()
            or (p.get("primary_category") and term in p["primary_category"].get("name", "").lower())
        ]
    if category and category.lower() != "all":
        c_term = category.lower()
        products = [
            p for p in products
            if (p.get("primary_category") and p["primary_category"].get("slug") == c_term)
            or any(c.get("slug") == c_term for c in p.get("all_categories", []))
        ]

    # Format summary for admin table
    items = []
    for p in products:
        items.append({
            "id": p["id"],
            "title": p["title"],
            "slug": p["slug"],
            "sku": p.get("sku", f"RO-{p['id']}"),
            "base_price_pkr": p["base_price_pkr"],
            "sale_price_pkr": p.get("sale_price_pkr"),
            "stock_status": p.get("stock_status", "instock"),
            "is_featured": p.get("is_featured", False),
            "primary_category": p.get("primary_category", {}).get("name", "Eyewear") if p.get("primary_category") else "General",
            "image_url": p.get("primary_image", {}).get("url") or "https://ik.imagekit.io/ridaoptical/tr:w-300/placeholder.jpg",
            "variations_count": len(p.get("variations", [])),
            "has_prescription_support": p.get("has_prescription_support", True),
        })

    return {
        "total": len(items),
        "items": items,
    }


@router.post("", status_code=status.HTTP_201_CREATED, summary="Admin: Add a new optical product")
async def create_admin_product(
    payload: AdminProductCreate,
    session: Session = Depends(get_session),
    admin: User = Depends(get_current_admin),
):
    # 1. Determine Product ID
    try:
        max_db_id = session.exec(select(func.max(Product.id))).one() or 5000
    except Exception:
        max_db_id = 5000
    max_repo_id = max(repo._products_by_id.keys(), default=5000)
    new_product_id = max(max_db_id, max_repo_id) + 1

    # 2. Slug & SKU
    base_slug = payload.slug.strip() if payload.slug and payload.slug.strip() else slugify(payload.title)
    slug = base_slug
    # Ensure unique slug
    if repo.get_product(slug):
        slug = f"{base_slug}-{new_product_id}"

    sku = payload.sku.strip() if payload.sku and payload.sku.strip() else f"RO-{new_product_id}"

    # 3. Match or Assign Category
    category_id = payload.category_id
    category_name = "Eye Glasses"
    category_slug = "eye-glasses"

    if category_id:
        cat_in_repo = repo._categories_by_id.get(category_id)
        if cat_in_repo:
            category_name = cat_in_repo["name"]
            category_slug = cat_in_repo["slug"]
    elif payload.category_slug:
        cat_in_repo = repo._categories_by_slug.get(payload.category_slug.lower())
        if cat_in_repo:
            category_id = cat_in_repo["id"]
            category_name = cat_in_repo["name"]
            category_slug = cat_in_repo["slug"]
    else:
        # Default to Eye Glasses (id: 133)
        category_id = 133

    # 4. Handle Primary Image
    default_img_url = payload.primary_image_url or "https://ik.imagekit.io/ridaoptical/tr:w-600/default-frame.jpg"
    primary_image_dict = {
        "id": new_product_id * 10,
        "title": f"{slug}-primary.jpg",
        "relative_path": f"2026/products/{slug}.jpg",
        "url": default_img_url,
        "alt_text": payload.title,
        "file_exists_on_disk": True,
    }

    # 5. Process Variations
    variations_list = []
    available_colors = []
    if payload.variations and len(payload.variations) > 0:
        for idx, var_in in enumerate(payload.variations, 1):
            var_id = new_product_id * 10 + idx
            var_color_name = var_in.color_name.strip()
            var_color_slug = slugify(var_color_name)
            var_color_hex = var_in.color_hex or "#000000"
            var_price = var_in.price_pkr if var_in.price_pkr and var_in.price_pkr > 0 else payload.base_price_pkr
            var_sku = var_in.sku or f"{sku}-{var_color_slug.upper()}"
            var_img_url = var_in.image_url or default_img_url

            var_dict = {
                "variation_id": var_id,
                "title": f"{payload.title} - {var_color_name}",
                "slug": f"{slug}-{var_color_slug}",
                "sku": var_sku,
                "color": {
                    "term_id": var_id,
                    "name": var_color_name,
                    "slug": var_color_slug,
                    "hex_code": var_color_hex,
                },
                "size": "Standard",
                "price_pkr": var_price,
                "regular_price_pkr": var_price,
                "sale_price_pkr": payload.sale_price_pkr,
                "stock_status": payload.stock_status,
                "image": {
                    "id": var_id,
                    "title": f"{slug}-{var_color_slug}.jpg",
                    "relative_path": f"2026/products/{slug}-{var_color_slug}.jpg",
                    "url": var_img_url,
                    "alt_text": f"{payload.title} in {var_color_name}",
                    "file_exists_on_disk": True,
                },
            }
            variations_list.append(var_dict)
            available_colors.append(var_dict["color"])
    else:
        # Default single variation
        var_id = new_product_id * 10 + 1
        var_dict = {
            "variation_id": var_id,
            "title": f"{payload.title} - Classic Black",
            "slug": f"{slug}-classic-black",
            "sku": f"{sku}-BLK",
            "color": {
                "term_id": var_id,
                "name": "Classic Black",
                "slug": "classic-black",
                "hex_code": "#000000",
            },
            "size": "Standard",
            "price_pkr": payload.base_price_pkr,
            "regular_price_pkr": payload.base_price_pkr,
            "sale_price_pkr": payload.sale_price_pkr,
            "stock_status": payload.stock_status,
            "image": primary_image_dict,
        }
        variations_list.append(var_dict)
        available_colors.append(var_dict["color"])

    # 6. Build Master Product Dict
    product_dict = {
        "id": new_product_id,
        "title": payload.title.strip(),
        "slug": slug,
        "sku": sku,
        "base_price_pkr": payload.base_price_pkr,
        "regular_price_pkr": payload.regular_price_pkr or payload.base_price_pkr,
        "sale_price_pkr": payload.sale_price_pkr,
        "stock_status": payload.stock_status,
        "is_featured": payload.is_featured,
        "total_sales": 0,
        "short_description": payload.short_description or "",
        "description": payload.description or f"High quality optical frames: {payload.title}. Engineered for lightweight comfort and all-day vision clarity.",
        "primary_category": {
            "id": category_id,
            "name": category_name,
            "slug": category_slug,
        },
        "all_categories": [
            {
                "id": category_id,
                "name": category_name,
                "slug": category_slug,
            }
        ],
        "has_prescription_support": payload.has_prescription_support,
        "primary_image": primary_image_dict,
        "gallery_images": [primary_image_dict],
        "variations_count": len(variations_list),
        "variations": variations_list,
        "seo": {
            "meta_title": f"{payload.title} | Rida Optical Pakistan",
            "meta_description": f"Buy {payload.title} online in Pakistan with prescription lenses and cash on delivery from Rida Optical.",
            "canonical_url": f"https://ridaoptical.com/product/{slug}/",
        },
    }

    # 7. Persist to Neon PostgreSQL Database
    try:
        # A. Media Asset
        db_media = MediaAsset(
            id=primary_image_dict["id"],
            title=primary_image_dict["title"],
            relative_path=primary_image_dict["relative_path"],
            original_url=primary_image_dict["url"],
            imagekit_url=primary_image_dict["url"],
            alt_text=primary_image_dict["alt_text"],
            mime_type="image/jpeg",
        )
        session.add(db_media)
        session.flush()

        # B. Product
        db_product = Product(
            id=new_product_id,
            title=product_dict["title"],
            slug=product_dict["slug"],
            sku=product_dict["sku"],
            base_price_pkr=product_dict["base_price_pkr"],
            regular_price_pkr=product_dict["regular_price_pkr"],
            sale_price_pkr=product_dict["sale_price_pkr"],
            stock_status=product_dict["stock_status"],
            is_featured=product_dict["is_featured"],
            total_sales=0,
            short_description=product_dict["short_description"],
            description=product_dict["description"],
            has_prescription_support=product_dict["has_prescription_support"],
            primary_image_id=db_media.id,
            meta_title=product_dict["seo"]["meta_title"],
            meta_description=product_dict["seo"]["meta_description"],
            canonical_url=product_dict["seo"]["canonical_url"],
        )
        session.add(db_product)
        session.flush()

        # C. Category Link
        if category_id:
            link = ProductCategoryLink(product_id=db_product.id, category_id=category_id)
            session.add(link)

        # D. Variations
        for v in variations_list:
            db_var = ProductVariation(
                id=v["variation_id"],
                product_id=db_product.id,
                title=v["title"],
                slug=v["slug"],
                sku=v["sku"],
                color_name=v["color"]["name"],
                color_slug=v["color"]["slug"],
                color_hex=v["color"].get("hex_code"),
                size=v["size"],
                price_pkr=v["price_pkr"],
                regular_price_pkr=v["regular_price_pkr"],
                sale_price_pkr=v["sale_price_pkr"],
                stock_status=v["stock_status"],
                image_id=db_media.id,
            )
            session.add(db_var)

        session.commit()
    except Exception as db_err:
        session.rollback()
        # Non-fatal if DB table has slight schema deviation; data loader will still serve it!
        print(f"Warning: Neon DB persistence notice: {db_err}")

    # 8. Register in in-memory repository & disk file
    saved_product = repo.add_product(product_dict)

    return {
        "success": True,
        "message": f"Product '{saved_product['title']}' created successfully.",
        "product": saved_product,
    }


@router.get("/{product_id}", summary="Admin: Get single product for editing")
async def get_admin_product(
    product_id: int,
    admin: User = Depends(get_current_admin),
):
    prod = repo.get_product(product_id)
    if not prod:
        raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found.")
    return prod


@router.put("/{product_id}", summary="Admin: Update an existing product")
async def update_admin_product(
    product_id: int,
    payload: AdminProductUpdate,
    session: Session = Depends(get_session),
    admin: User = Depends(get_current_admin),
):
    existing = repo.get_product(product_id)
    if not existing:
        raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found.")

    updates: Dict[str, Any] = {}

    if payload.title is not None:
        updates["title"] = payload.title.strip()
    if payload.slug is not None:
        updates["slug"] = payload.slug.strip() or slugify(payload.title or existing["title"])
    if payload.sku is not None:
        updates["sku"] = payload.sku.strip()
    if payload.base_price_pkr is not None:
        updates["base_price_pkr"] = payload.base_price_pkr
        updates["regular_price_pkr"] = payload.regular_price_pkr or payload.base_price_pkr
    if payload.sale_price_pkr is not None:
        updates["sale_price_pkr"] = payload.sale_price_pkr
    if payload.stock_status is not None:
        updates["stock_status"] = payload.stock_status
    if payload.is_featured is not None:
        updates["is_featured"] = payload.is_featured
    if payload.has_prescription_support is not None:
        updates["has_prescription_support"] = payload.has_prescription_support
    if payload.short_description is not None:
        updates["short_description"] = payload.short_description
    if payload.description is not None:
        updates["description"] = payload.description

    # Category update
    category_id = payload.category_id
    if category_id:
        cat_in_repo = repo._categories_by_id.get(category_id)
        if cat_in_repo:
            updates["primary_category"] = {
                "id": cat_in_repo["id"],
                "name": cat_in_repo["name"],
                "slug": cat_in_repo["slug"],
            }
            updates["all_categories"] = [updates["primary_category"]]
    elif payload.category_slug:
        cat_in_repo = repo._categories_by_slug.get(payload.category_slug.lower())
        if cat_in_repo:
            updates["primary_category"] = {
                "id": cat_in_repo["id"],
                "name": cat_in_repo["name"],
                "slug": cat_in_repo["slug"],
            }
            updates["all_categories"] = [updates["primary_category"]]

    # Image update
    if payload.primary_image_url:
        updates["primary_image"] = {
            "id": existing.get("primary_image", {}).get("id", product_id * 10),
            "title": f"{updates.get('slug', existing['slug'])}-primary.jpg",
            "relative_path": f"2026/products/{updates.get('slug', existing['slug'])}.jpg",
            "url": payload.primary_image_url,
            "alt_text": updates.get("title", existing["title"]),
            "file_exists_on_disk": True,
        }

    # Variations update
    if payload.variations is not None:
        variations_list = []
        available_colors = []
        for idx, var_in in enumerate(payload.variations, 1):
            var_id = product_id * 10 + idx
            var_color_name = var_in.color_name.strip()
            var_color_slug = slugify(var_color_name)
            var_color_hex = var_in.color_hex or "#000000"
            var_price = var_in.price_pkr if var_in.price_pkr and var_in.price_pkr > 0 else updates.get("base_price_pkr", existing["base_price_pkr"])
            var_sku = var_in.sku or f"{updates.get('sku', existing['sku'])}-{var_color_slug.upper()}"
            var_img_url = var_in.image_url or (updates.get("primary_image", {}).get("url") or existing.get("primary_image", {}).get("url"))

            var_dict = {
                "variation_id": var_id,
                "title": f"{updates.get('title', existing['title'])} - {var_color_name}",
                "slug": f"{updates.get('slug', existing['slug'])}-{var_color_slug}",
                "sku": var_sku,
                "color": {
                    "term_id": var_id,
                    "name": var_color_name,
                    "slug": var_color_slug,
                    "hex_code": var_color_hex,
                },
                "size": "Standard",
                "price_pkr": var_price,
                "regular_price_pkr": var_price,
                "sale_price_pkr": updates.get("sale_price_pkr", existing.get("sale_price_pkr")),
                "stock_status": updates.get("stock_status", existing.get("stock_status", "instock")),
                "image": {
                    "id": var_id,
                    "title": f"{updates.get('slug', existing['slug'])}-{var_color_slug}.jpg",
                    "relative_path": f"2026/products/{updates.get('slug', existing['slug'])}-{var_color_slug}.jpg",
                    "url": var_img_url,
                    "alt_text": f"{updates.get('title', existing['title'])} in {var_color_name}",
                    "file_exists_on_disk": True,
                },
            }
            variations_list.append(var_dict)
            available_colors.append(var_dict["color"])
        updates["variations"] = variations_list
        updates["variations_count"] = len(variations_list)
        updates["available_colors"] = available_colors

    # Persist to Neon DB
    try:
        db_prod = session.get(Product, product_id)
        if db_prod:
            if "title" in updates:
                db_prod.title = updates["title"]
            if "slug" in updates:
                db_prod.slug = updates["slug"]
            if "sku" in updates:
                db_prod.sku = updates["sku"]
            if "base_price_pkr" in updates:
                db_prod.base_price_pkr = updates["base_price_pkr"]
            if "regular_price_pkr" in updates:
                db_prod.regular_price_pkr = updates["regular_price_pkr"]
            if "sale_price_pkr" in updates:
                db_prod.sale_price_pkr = updates["sale_price_pkr"]
            if "stock_status" in updates:
                db_prod.stock_status = updates["stock_status"]
            if "is_featured" in updates:
                db_prod.is_featured = updates["is_featured"]
            if "has_prescription_support" in updates:
                db_prod.has_prescription_support = updates["has_prescription_support"]
            if "description" in updates:
                db_prod.description = updates["description"]
            if "short_description" in updates:
                db_prod.short_description = updates["short_description"]
            session.add(db_prod)
            session.commit()
    except Exception as db_err:
        session.rollback()
        print(f"Warning: Neon DB update error: {db_err}")

    # Update in memory & json
    updated_prod = repo.update_product(product_id, updates)
    return {
        "success": True,
        "message": f"Product '{updated_prod['title']}' updated successfully.",
        "product": updated_prod,
    }


@router.delete("/{product_id}", summary="Admin: Delete a product from catalog")
async def delete_admin_product(
    product_id: int,
    session: Session = Depends(get_session),
    admin: User = Depends(get_current_admin),
):
    # 1. Delete from PostgreSQL
    try:
        db_prod = session.get(Product, product_id)
        if db_prod:
            session.delete(db_prod)
            session.commit()
    except Exception as e:
        session.rollback()

    # 2. Delete from Loader & JSON
    deleted = repo.delete_product(product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found.")

    return {
        "success": True,
        "message": f"Product {product_id} has been permanently deleted.",
        "deleted_id": product_id,
    }
