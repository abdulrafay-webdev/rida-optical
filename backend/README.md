# Rida Optical — FastAPI Backend Application

Production-ready modern REST API for Rida Optical e-commerce platform, built with **Python 3.13**, **FastAPI**, **Pydantic v2**, and designed for deployment on **Vercel** with **Neon Serverless PostgreSQL**.

---

## 1. Quickstart & Local Development

### Prerequisites
- Python 3.11+
- Virtual environment (optional but recommended)

### Run with Uvicorn
In accordance with project architecture guidelines, the package root is `app`. Run from the `backend/` directory:

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

Access the interactive API documentation:
- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Check:** [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

---

## 2. API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status and route directory |
| `GET` | `/api/v1/health` | System health and catalog entity counters |
| `GET` | `/api/v1/products` | Paginated product listing with category, price & color filters |
| `GET` | `/api/v1/products/featured` | Bestseller optical frames |
| `GET` | `/api/v1/products/{slug_or_id}` | Product details with variations & optical options |
| `GET` | `/api/v1/categories` | Categories list (supports `?tree=true` & `?parent_only=true`) |
| `GET` | `/api/v1/categories/{slug_or_id}` | Single category detail |
| `GET` | `/api/v1/optical/options` | Complete 4-step WAPF lens selector configuration |
| `GET` | `/api/v1/optical/coatings` | 15 lens coatings & PKR price surcharges |
| `GET` | `/api/v1/optical/usage-types` | Vision usage types (Single vision, Bifocal, Progressive) |
| `POST` | `/api/v1/orders` | Checkout submission (COD + WhatsApp dispatch link) |
| `GET` | `/api/v1/orders/{order_id}` | Order tracking by ID |
| `GET` | `/api/v1/search?q={query}` | Autocomplete search across frames & SKUs |

---

## 3. Deployment Configuration (Vercel + Python)

This backend is pre-configured for **Vercel** deployment via [`vercel.json`](vercel.json):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app/main.py"
    }
  ]
}
```

---

## 4. Running Tests

Run the complete test suite using pytest:

```bash
cd backend
pytest
```
