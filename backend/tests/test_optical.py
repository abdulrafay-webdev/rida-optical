def test_get_optical_options(client):
    response = client.get("/api/v1/optical/options")
    assert response.status_code == 200
    data = response.json()
    assert data["engine_name"] == "Rida Optical Custom Lens Selector"
    assert "important_notice" in data
    assert len(data["step_1_usage_types"]) == 4
    assert len(data["step_2_lens_coatings"]) == 15


def test_get_lens_coatings(client):
    response = client.get("/api/v1/optical/coatings")
    assert response.status_code == 200
    coatings = response.json()
    assert len(coatings) == 15
    # Verify Blue-Cut standard exists at PKR 1700
    screen_std = next((c for c in coatings if c["id"] == "screen-standard"), None)
    assert screen_std is not None
    assert screen_std["price_pkr"] == 1700.0


def test_get_lens_coatings_filter_category(client):
    response = client.get("/api/v1/optical/coatings?category=clear")
    assert response.status_code == 200
    coatings = response.json()
    for c in coatings:
        assert c["category"] == "clear"


def test_get_usage_types(client):
    response = client.get("/api/v1/optical/usage-types")
    assert response.status_code == 200
    types = response.json()
    assert len(types) == 4
    slugs = [t["slug"] for t in types]
    assert "single-vision" in slugs
    assert "progressive" in slugs
