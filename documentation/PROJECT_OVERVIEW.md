# Rida Optical — Project Overview & Migration Specification

## 1. Project Objective

The primary objective of the **Rida Optical Migration** project is to execute a complete, enterprise-grade migration of the existing live WordPress e-commerce website ([ridaoptical.com](https://ridaoptical.com)) to a modern, decoupled full-stack web application.

The migration preserves all original business assets, brand identity, visual design, products, categories, optical attributes, imagery, SEO structure, and customer-facing e-commerce functionality, while providing substantial performance, scalability, security, and developer ergonomics improvements.

---

## 2. Existing Website Information

- **Brand / Store Name:** Rida Optical
- **Live URL:** [https://ridaoptical.com](https://ridaoptical.com)
- **Current Business Domain:** Eyewear, prescription lenses, optical frames, sunglasses, and eye care accessories.
- **Hosting Environment:** Hostinger Cloud / Shared Hosting
- **Original Source Backups:**
  - Database Live: `u684309338_s6XlU.20261102184605.sql.gz`
  - Database Staging: `u684309338_FkXzS.20261102184605.sql.gz`
  - Website Files Archive: `files backup.gz` (multi-domain container including `ridaoptical.com`)

---

## 3. Current Platform Architecture (Source)

- **CMS Core:** WordPress 7.0.8 (PHP >= 7.4 runtime required)
- **E-Commerce Engine:** WooCommerce 11.2.1
- **Database Engine:** MySQL 5.5.5+ compatible (80 core, WooCommerce, and plugin tables in production)
- **Active / Installed Themes:**
  - Astra & Child Theme (`footer-astra-child`)
  - Twenty Twenty-Five (fallback)
- **Primary Plugins Identified:**
  - E-Commerce & Checkout: `woocommerce`, `woocommerce-payments`, `cartflows`, `variation-swatches-woo`, `advanced-product-fields-for-woocommerce`, `woo-custom-product-addons`, `woo-cart-abandonment-recovery`, `wpc-buy-now-button`, `wpb-woocommerce-category-slider`
  - Page Building & Styling: `elementor`, `header-footer-elementor`, `custom-css-js`, `loftloader`, `ml-slider`
  - SEO & Analytics: `all-in-one-seo-pack`, `surerank`, `google-site-kit`
  - Customer Communication: `click-to-chat-for-whatsapp`, `omnisend`, `wpforms-lite`, `sureforms`
  - Performance & Hosting: `litespeed-cache`, `image-optimization`, Hostinger support plugins

---

## 4. Target Technology Architecture

| Layer | Technology | Details / Role |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js (React 19 / TypeScript)** | App Router, Server & Client Components, React Hook Form, Zod validation |
| **Styling & UI** | **Tailwind CSS** | Responsive mobile-first design, modern design tokens, accessible components |
| **Backend API** | **FastAPI (Python 3.12+)** | High-performance asynchronous REST API, Pydantic schemas, dependency injection |
| **Backend Structure** | **`app/` package structure** | Entry point `app.main:app` (superseding legacy `src/` patterns) |
| **Database** | **Neon Serverless PostgreSQL** | Cloud-native, autoscaling relational storage with point-in-time recovery |
| **ORM & Migrations** | **SQLModel & Alembic** | Pythonic type-safe database models, version-controlled schema migrations |
| **Media Delivery** | **ImageKit** | Global CDN image optimization, responsive resizing, WebP/AVIF transformations |
| **Frontend Hosting** | **Vercel** | Edge network, automatic preview deployments, global caching |
| **Backend Hosting** | **Vercel + Python** | Serverless Python backend runtime integration |

---

## 5. Migration Goals & Success Criteria

1. **Brand & Visual Fidelity:** Recreate the exact UI/UX, typography, color palette, navigation menus, hero sections, and category displays of the live Rida Optical website.
2. **Product Catalog Parity:** Full extraction and relational mapping of all optical products, frames, lenses, variations (color, size, material), categories, tags, pricing, and stock status.
3. **SEO Preservation:** 1:1 parity for meta titles, descriptions, OpenGraph tags, canonical URLs, and 301 redirect mapping for legacy URL patterns.
4. **Optimized Media Assets:** Migration of product photography and banners to ImageKit with next-gen image formats (AVIF/WebP) and responsive source sets.
5. **Clean Data Model:** Transition from WordPress EAV (`wp_posts` + `wp_postmeta`) anti-patterns to normalized, relational PostgreSQL schemas.
6. **Cart & Checkout Experience:** Modern client-side basket state management with smooth validation, WhatsApp ordering support, and integrated payment gateway options.

---

## 6. Important Operational Constraints

- **Security First:** Strict adherence to zero-credential leakage. No database passwords, salt keys, auth tokens, or private environment variables in documentation or version control.
- **Data Immutability:** Original archives (`reference/`) and extracted WordPress assets (`extracted/`) are read-only references and must never be altered or committed to public repositories.
- **No MySQL in Target Stack:** MySQL is solely used as an archival source; all production persistent data will reside on Neon Serverless PostgreSQL.
- **Phase-Gated Development:** No premature code generation or dependency installation before comprehensive technical audits and schema design reviews.
