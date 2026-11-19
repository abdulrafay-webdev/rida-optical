import pytest
from starlette.testclient import TestClient


def test_coupon_validation_success(client: TestClient):
    # Valid OFF10 with subtotal 2500
    res = client.post("/api/v1/coupons/validate", json={"code": "OFF10", "subtotal": 2500.0})
    assert res.status_code == 200
    data = res.json()
    assert data["valid"] is True
    assert data["code"] == "OFF10"
    assert data["discount_percent"] == 10.0
    assert data["discount_amount_pkr"] == 250.0
    assert data["new_subtotal_pkr"] == 2250.0


def test_coupon_validation_subtotal_too_low(client: TestClient):
    # OFF10 requires min 1000
    res = client.post("/api/v1/coupons/validate", json={"code": "OFF10", "subtotal": 500.0})
    assert res.status_code == 200
    data = res.json()
    assert data["valid"] is False
    assert "minimum subtotal" in data["message"].lower()


def test_coupon_validation_invalid_code(client: TestClient):
    res = client.post("/api/v1/coupons/validate", json={"code": "INVALID99", "subtotal": 5000.0})
    assert res.status_code == 200
    data = res.json()
    assert data["valid"] is False
    assert "invalid or expired" in data["message"].lower()


def test_order_with_coupon_discount(client: TestClient):
    payload = {
        "customer": {
            "full_name": "Hamza Ali",
            "phone": "03331234567",
            "address": "DHA Phase 6",
            "city": "Lahore",
        },
        "items": [
            {
                "product_id": 4634,
                "variation_id": 4727,
                "quantity": 1,
            }
        ],
        "coupon_code": "OFF10",
        "payment_method": "cod",
    }
    res = client.post("/api/v1/orders", json=payload)
    assert res.status_code == 201
    order = res.json()
    assert order["subtotal_pkr"] == 2500.0
    assert order["discount_pkr"] == 250.0
    assert order["shipping_fee_pkr"] == 349.0
    assert order["total_amount_pkr"] == 2599.0  # 2500 - 250 + 349


def test_admin_login_bad_credentials(client: TestClient):
    res = client.post(
        "/api/v1/auth/login",
        json={"email": "wrong@example.com", "password": "BadPassword123"},
    )
    assert res.status_code == 401


def test_admin_auth_and_protected_routes(client: TestClient):
    # 1. Login with seeded admin credentials
    login_res = client.post(
        "/api/v1/auth/login",
        json={"email": "ridaoptical@gmail.com", "password": "Optical@1234"},
    )
    assert login_res.status_code == 200
    login_data = login_res.json()
    assert "access_token" in login_data
    token = login_data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Verify /api/v1/auth/me
    me_res = client.get("/api/v1/auth/me", headers=headers)
    assert me_res.status_code == 200
    user_info = me_res.json()
    assert user_info["email"] == "ridaoptical@gmail.com"
    assert user_info["role"] == "admin"

    # 3. Access admin stats
    stats_res = client.get("/api/v1/admin/stats", headers=headers)
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert "total_orders" in stats
    assert "pending_orders" in stats
    assert "total_revenue_pkr" in stats

    # 4. List admin orders
    orders_res = client.get("/api/v1/admin/orders", headers=headers)
    assert orders_res.status_code == 200
    orders_data = orders_res.json()
    assert "items" in orders_data
    assert "total" in orders_data
    assert isinstance(orders_data["items"], list)

    # 5. Test updating order status if any orders exist
    if orders_data["items"]:
        first_order = orders_data["items"][0]
        order_num = first_order["order_number"]
        update_res = client.patch(
            f"/api/v1/admin/orders/{order_num}/status",
            json={
                "status": "processing",
                "courier_name": "TCS",
                "tracking_number": "TCS-987654321",
                "order_notes": "Prescription lenses undergoing optical edging.",
            },
            headers=headers,
        )
        assert update_res.status_code == 200
        assert update_res.json()["new_status"] == "processing"


def test_admin_routes_unauthorized_without_token(client: TestClient):
    res = client.get("/api/v1/admin/stats")
    assert res.status_code == 401

    res = client.get("/api/v1/admin/orders")
    assert res.status_code == 401
