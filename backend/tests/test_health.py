def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "Rida Optical API"
    assert "endpoints" in data


def test_health_endpoint(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["catalog"]["products_loaded"] == 17
    assert data["catalog"]["categories_loaded"] == 27
    assert data["catalog"]["lens_coatings_loaded"] == 15
    assert data["catalog"]["optical_usage_types_loaded"] == 4
