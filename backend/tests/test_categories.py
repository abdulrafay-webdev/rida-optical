def test_list_all_categories(client):
    response = client.get("/api/v1/categories")
    assert response.status_code == 200
    categories = response.json()
    assert len(categories) == 27


def test_list_parent_categories(client):
    response = client.get("/api/v1/categories?parent_only=true")
    assert response.status_code == 200
    parents = response.json()
    assert len(parents) < 27
    for cat in parents:
        assert cat["parent_id"] is None


def test_category_tree(client):
    response = client.get("/api/v1/categories?tree=true")
    assert response.status_code == 200
    tree = response.json()
    # At least AL Mahash (id: 15) has children
    al_mahash = next((c for c in tree if c["id"] == 15), None)
    assert al_mahash is not None
    assert len(al_mahash["children"]) > 0


def test_get_single_category(client):
    response = client.get("/api/v1/categories/eye-glasses")
    assert response.status_code == 200
    assert response.json()["name"] == "Eye Glasses"
