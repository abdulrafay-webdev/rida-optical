def test_list_products_default(client):
    response = client.get("/api/v1/products")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "meta" in data
    assert data["meta"]["total"] == 17
    assert len(data["items"]) == 17


def test_list_products_category_filter(client):
    response = client.get("/api/v1/products?category=eye-glasses")
    assert response.status_code == 200
    data = response.json()
    assert data["meta"]["total"] >= 1
    for item in data["items"]:
        assert item["primary_category"]["slug"] == "eye-glasses"


def test_list_products_price_sort(client):
    response = client.get("/api/v1/products?sort_by=price_asc")
    assert response.status_code == 200
    items = response.json()["items"]
    prices = [p["base_price_pkr"] for p in items]
    assert prices == sorted(prices)


def test_get_featured_products(client):
    response = client.get("/api/v1/products/featured?limit=4")
    assert response.status_code == 200
    items = response.json()
    assert len(items) == 4


def test_get_product_detail_success(client):
    response = client.get("/api/v1/products/fashion-eye-glasses")
    assert response.status_code == 200
    product = response.json()
    assert product["slug"] == "fashion-eye-glasses"
    assert product["sku"] == "RO-4634"
    assert len(product["variations"]) == 4
    assert product["has_prescription_support"] is True


def test_get_product_detail_by_id(client):
    response = client.get("/api/v1/products/4634")
    assert response.status_code == 200
    assert response.json()["id"] == 4634


def test_get_product_not_found(client):
    response = client.get("/api/v1/products/non-existent-frame-slug")
    assert response.status_code == 404
