def test_create_order_frame_only(client):
    order_payload = {
        "customer": {
            "full_name": "Tariq Mahmood",
            "phone": "03211234567",
            "address": "Flat 402, Block 5, Gulshan-e-Iqbal",
            "city": "Karachi",
        },
        "items": [
            {
                "product_id": 4634,
                "variation_id": 4727,
                "quantity": 1,
                "optical_selection": {
                    "type": "frame_only",
                },
            }
        ],
        "payment_method": "cod",
    }

    response = client.post("/api/v1/orders", json=order_payload)
    assert response.status_code == 201
    order = response.json()
    assert order["order_id"].startswith("RO-")
    assert order["status"] == "pending"
    assert order["subtotal_pkr"] == 2500.0  # Variation 4727 price
    assert order["shipping_fee_pkr"] == 349.0
    assert order["total_amount_pkr"] == 2849.0
    assert "https://wa.me/923212318001" in order["whatsapp_url"]


def test_create_order_with_prescription_lenses(client):
    order_payload = {
        "customer": {
            "full_name": "Sara Ahmed",
            "phone": "03009876543",
            "address": "House 12, Street 4, Sector F-8/2",
            "city": "Islamabad",
        },
        "items": [
            {
                "product_id": 4634,
                "quantity": 1,
                "optical_selection": {
                    "type": "prescription",
                    "usage_id": "single-vision",
                    "coating_id": "screen-standard",  # +PKR 1,700
                    "prescription": {
                        "prescription_text": "OD: -2.00, OS: -1.75 | PD: 63mm",
                    },
                },
            }
        ],
        "payment_method": "cod",
    }

    response = client.post("/api/v1/orders", json=order_payload)
    assert response.status_code == 201
    order = response.json()
    # Base frame is 2500 + 1700 coating = 4200 subtotal
    assert order["subtotal_pkr"] == 4200.0
    assert order["shipping_fee_pkr"] == 349.0
    assert order["total_amount_pkr"] == 4549.0
    assert "screen-standard" in order["items"][0]["optical_details"]["coating"].lower() or "screen" in order["items"][0]["optical_details"]["coating"].lower()


def test_search_endpoint(client):
    response = client.get("/api/v1/search?q=Maybach")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] > 0
    assert any("maybach" in r["title"].lower() or "maybach" in r["slug"] for r in data["results"])
