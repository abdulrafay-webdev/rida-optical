# Rida Optical — Comprehensive Technical Audit Report

> **Audit Status:** Phase 2 Technical Audit Completed  
> **Source Backups Audited:** `reference/live-database.sql.gz` & `extracted/wordpress-files/`  
> **Target Architecture:** Next.js (Frontend) + FastAPI (Backend) + Neon PostgreSQL (Database) + ImageKit (CDN)

---

## 1. Core Platform & Environment

| Parameter | Audited Value / Ground Truth | Verification Source |
| :--- | :--- | :--- |
| **WordPress Core Version** | **7.0.8** | `wp-includes/version.php` |
| **WordPress DB Revision** | **61833** | `wp-includes/version.php` |
| **Minimum Required PHP** | **>= 7.4** | `wp-includes/version.php` |
| **Active Theme** | **Astra** (`template: astra`, `stylesheet: astra`) | `wp_options` table in live DB |
| **Installed Child Themes** | `footer-astra-child` (WPS Child Theme Generator) | `wp-content/themes/` |
| **Fallback Themes** | `twentytwentyfive` | `wp-content/themes/` |
| **Live Site URL / Home** | `https://ridaoptical.com` | `wp_options` (`siteurl`, `home`) |
| **Store Name** | **Rida Optical** | `wp_options` (`blogname`) |
| **Store Admin Contact** | `ridaoptical@gmail.com` | `wp_options` (`admin_email`) |
| **Target Audience / Country** | **Pakistan (PK:SD)** | `wp_options` (`woocommerce_default_country`) |
| **Store Currency** | **PKR** (Pakistani Rupee, Left Symbol) | `wp_options` (`woocommerce_currency`) |

---

## 2. Plugin Ecosystem & Modern Architectural Equivalents

A total of **33 plugins** were detected on disk, with **27 actively enabled** in the production database.

| Plugin Name & Version | Status in DB | Functional Role in WordPress | Target Stack Modern Equivalent |
| :--- | :--- | :--- | :--- |
| `woocommerce` (11.2.1) | **ACTIVE** | Core e-commerce cart, catalog, and checkout | FastAPI REST API (`/api/products`, `/api/orders`) + Next.js App Router |
| `advanced-product-fields-for-woocommerce` | **ACTIVE** | Optical prescription & lens selection workflow | Custom Next.js Optical Prescription Builder component |
| `variation-swatches-woo` | **ACTIVE** | Frame color & attribute visual swatches | Tailwind CSS custom color swatch & pill button selectors |
| `woo-addon-uploads` | **ACTIVE** | Prescription slip upload on product page | Next.js Drag-and-Drop File Upload with ImageKit / S3 direct upload |
| `cartflows` | **ACTIVE** | Sales funnels & optimized checkout steps | Next.js streamlined checkout route (`/checkout` -> `/order-received`) |
| `click-to-chat-for-whatsapp` | **ACTIVE** | WhatsApp customer chat & direct ordering | Next.js Floating WhatsApp component (`+923212318001`) + direct WhatsApp order generator |
| `all-in-one-seo-pack` | **ACTIVE** | Search engine meta titles, descriptions & sitemaps | Next.js Metadata API (`generateMetadata`), dynamic `sitemap.ts`, OpenGraph |
| `surerank` | **ACTIVE** | Content & on-page SEO analysis | Built-in Next.js JSON-LD schema (`Product`, `Store`, `BreadcrumbList`) |
| `elementor` | **ACTIVE** | Visual drag-and-drop page layout builder | Semantic React / Next.js Server Components with Tailwind CSS |
| `header-footer-elementor` | **ACTIVE** | Custom site-wide header and footer builder | Global Next.js `Header` and `Footer` layout components |
| `custom-css-js` | **ACTIVE** | Custom CSS and JavaScript injection | Native Tailwind CSS styles and React hooks |
| `code-snippets` | **ACTIVE** | Custom PHP functions & action hooks | FastAPI backend business logic & Next.js UI components |
| `google-site-kit` | **ACTIVE** | Google Analytics, Search Console, Tag Manager | `@next/third-parties/google` (Google Tag Manager & Analytics) |
| `omnisend` | **ACTIVE** | Customer marketing automation & notifications | Omnisend API webhooks via FastAPI background tasks |
| `wpforms-lite` | **ACTIVE** | Contact Us & Signup lead forms | React Hook Form + Zod schema validation + FastAPI `/api/contact` |
| `sureforms` | **ACTIVE** | Form builder | Unified under Next.js React Hook Form system |
| `woo-cart-abandonment-recovery` | **ACTIVE** | Abandoned checkout follow-ups | FastAPI scheduled task / Celery / Omnisend event trigger |
| `woocommerce-payments` | **ACTIVE** (COD Primary) | Credit card / payment processing | Cash on Delivery (COD) workflow + modular Stripe integration |
| `wpb-woocommerce-category-slider` | **ACTIVE** | Homepage category carousel slider | Embla Carousel / Swiper React component |
| `wpc-buy-now-button` | **ACTIVE** | Instant checkout button bypass | Next.js "Buy Now" button with immediate checkout routing |
| `loftloader` | **ACTIVE** | Page loading screen animation | Next.js `loading.tsx` suspense boundaries & micro-loaders |
| `ml-slider` | **ACTIVE** | Homepage hero image slider | Next.js Hero Carousel component with optimized next/image |
| `litespeed-cache` | **ACTIVE** | WordPress caching & optimization | Vercel Edge Cache, Next.js Incremental Static Regeneration (ISR) |
| `image-optimization` | **ACTIVE** | Asset compression | ImageKit dynamic global CDN delivery & next/image optimization |
| `astra-sites` | **ACTIVE** | Astra starter site templates | Obsolete in custom Next.js frontend (remove) |
| `hostinger` & hostinger helpers | **ACTIVE** | Hosting environment integrations | Obsolete in Vercel deployment (remove) |

---

## 3. Custom Code Snippets & Child Theme Customizations

### A. Custom PHP / JS Code Snippets (`wp_snippets`)

1. **Optical Prescription Upload Label (Snippet ID 5):**
   - **Target:** `label[for="wau_file_addon"]`
   - **Original Code:**
     ```javascript
     document.addEventListener('DOMContentLoaded', function () {
       const label = document.querySelector('label[for="wau_file_addon"]');
       if (label) {
         label.textContent = "Upload a prescription:";
       }
     });
     ```
   - **Migration Equivalent:** Built directly into the Next.js product page prescription upload component.

2. **Single Product Page Important Notice (Snippet ID 6):**
   - **Hook:** `woocommerce_single_product_summary` (Priority 9)
   - **Original Markup:**
     ```html
     <div style="background:#fff3cd; padding:10px; margin-bottom:15px; border:1px solid #ffeeba; font-size:14px; font-weight:bold; color:#000;">
       <span style="background:red; color:#fff; padding:2px 6px; border-radius:3px;">Important Note:</span> 
       If your prescription has a high cylinder (above ±2.00) or requires bifocal/progressive lenses, please contact us via WhatsApp for a customized quote. For single vision glasses, simply follow the steps below
     </div>
     ```
   - **Migration Equivalent:** Modern Tailwind alert banner component placed directly above product options on the Product Detail Page (PDP).

3. **Floating Review Button (Snippet ID 7):**
   - **Position:** Fixed vertical pill on left screen edge (`top: 40%`, `left: 0`, `writing-mode: vertical-rl`).
   - **Styling:** Blue background (`#007bff`), white text, rounded right corners (`0 10px 10px 0`), shadow.
   - **Target Link:** `https://ridaoptical.com/review-gallery/`
   - **Migration Equivalent:** Next.js Floating Review button component placed in `app/layout.tsx`.

### B. Child Theme (`footer-astra-child/functions.php`)
- Standard stylesheet enqueueing (`parent-style` + `child-style`).
- Unregisters AIOSEO breadcrumbs and HTML sitemap widgets.

---

## 4. Optical Lens & Custom Product Field Architecture

Extracted from Advanced Product Fields (`wapf_product`, Post ID **4620**):

| Step | Option / Choice | Type | Pricing Type | Price (PKR) | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Choose Type** | `prescription Lenses` | Select | None | **Base Product** | Requires prescription steps |
| | `without prescription Lenses` | Select | None | **Base Product** | Frame only / demo lenses |
| **2. Glasses Usage** | `Single Vision` | Select | None | **+0 PKR** | Standard distance or reading |
| | `Bifocal Round Segment` | Select | None | **+0 PKR** | Reading + distance (round segment) |
| | `Bifocal D Segment` | Select | None | **+0 PKR** | Reading + distance (D segment) |
| | `progressive` | Select | None | **+0 PKR** | Multi-focal progressive |
| **3. Lens Coating** | `clear standard` | Select | Fixed | **+1,300 PKR** | Standard anti-reflective clear |
| | `clear premium` | Select | Fixed | **+1,800 PKR** | Premium high-index clear |
| | `Tinted Standerd` | Select | Fixed | **+1,600 PKR** | Sunglasses tint standard |
| | `Tinted Premium` | Select | Fixed | **+2,300 PKR** | Sunglasses tint premium UV |
| | `Screen Standerd` | Select | Fixed | **+1,700 PKR** | Blue-cut computer coating |
| | `Screen premium` | Select | Fixed | **+2,600 PKR** | Premium blue-cut anti-glare |
| | `Transition Standerd` | Select | Fixed | **+2,300 PKR** | Photochromic sun-adaptive |
| | `Transition premium` | Select | Fixed | **+3,450 PKR** | Fast-adaptive photochromic |
| | `Transition Screen Standard` | Select | Fixed | **+2,350 PKR** | Photochromic + Blue-cut standard |
| | `Transition Screen premium` | Select | Fixed | **+3,150 PKR** | Photochromic + Blue-cut premium |
| | `Drive Clear` | Select | Fixed | **+3,000 PKR** | Night driving anti-glare |
| | `Drive Digital` | Select | Fixed | **+3,500 PKR** | Digital anti-fatigue driving lens |
| | `Drive Transition` | Select | Fixed | **+3,500 PKR** | Driving lens with photochromic |
| | `Unbreakable Tinted` | Select | Fixed | **+2,000 PKR** | Polycarbonate impact resistant |
| | `Unbreakable Transition` | Select | Fixed | **+3,450 PKR** | Polycarbonate photochromic |
| **4. Prescription Input**| `Enter Your Prescription Here` | Text | None | **N/A** | Manual spherical/cylindrical entry |
| **5. File Upload** | `Upload a prescription:` | File | None | **N/A** | Image/PDF prescription doctor slip |
| **6. Comments** | `Additional Comments` | Textarea | None | **N/A** | Special pupillary distance (PD) notes |

---

## 5. Website Content & Page Directory

| Page ID | Title | Slug | Status | Purpose & Target Route |
| :--- | :--- | :--- | :--- | :--- |
| **4387** | **Home** | `home` | Published | Next.js `/` (Hero, Category Slider, Featured Products, Testimonials) |
| **38** | **Store** | `store` | Published | Next.js `/store` (Catalog listing, filtering by category, shape, color, price) |
| **43** | **About** | `about` | Published | Next.js `/about` (Brand story, optical expertise, workshop details) |
| **414** | **Contact Us** | `contact-us` | Published | Next.js `/contact-us` (Contact form, address, WhatsApp link, Google Map) |
| **4675** | **Frequently Questions** | `frequently-questions` | Published | Next.js `/faq` (Accordion FAQ component for optical prescriptions & delivery) |
| **5051** | **Review Gallery** | `review-gallery` | Published | Next.js `/review-gallery` (Customer review gallery, trust badges, photos) |
| **39** | **Cart** | `cart` | Published | Next.js `/cart` (Persistent client cart drawer & page) |
| **40** | **Checkout** | `checkout-2` | Published | Next.js `/checkout` (Streamlined COD and payment checkout flow) |
| **41** | **My account** | `my-account` | Published | Next.js `/account` (Customer login, order history) |
| **3** | **Privacy Policy** | `privacy-policy` | Draft | Next.js `/privacy-policy` (Legal & return policy) |

---

## 6. Navigation Hierarchy

```
Main Menu (ID 128)
├── Home (/)
├── Eye Glasses (/category/eye-glasses)
│   ├── Men's Eye Glasses (/category/mens-eye-glasses)
│   ├── Women's Eye Glasses (/category/womens-eye-glasses)
│   ├── Kid's Eye Glasses (/category/kids-eye-glasses)
│   ├── Trending Eye Glasses (/category/trending-eye-glasses)
│   └── Reading Eye Glasses (/category/reading-eye-glasses)
├── SunGlasses (/category/sunglasses)
│   ├── Fashion Glasses (/category/fashion-glasses)
│   ├── Men's Sunglasses (/category/mens-sunglasses)
│   └── Women's Sunglasses (/category/womens-sunglasses)
├── Contact Lenses (/category/contact-lenses)
│   ├── Daily wear
│   ├── Standard Wear
│   ├── Party Wear
│   ├── Color Brand
│   ├── Solution
│   └── Lens Kit
├── Lenses (for glasses) (/category/lenses-for-glasses)
├── Review Gallery (/review-gallery)
├── FAQ's (/frequently-questions)
├── About (/about)
└── Contact Us (/contact-us)
```

---

## 7. Product Catalog Baseline (17 Published Products)

| Product ID | Product Title | Slug | Price (PKR) | Primary Category | Thumbnail ID |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **4634** | Fashion Eye Glasses | `fashion-eye-glasses` | Rs. 2,500 | Eye Glasses / Trending | 4629 |
| **4800** | Vintage | `vintage` | Rs. 1,999 | Eye Glasses / Men's | 4798 |
| **4820** | Fashion Sunglasses | `fashion-sunglasses` | Rs. 1,499 | SunGlasses / Fashion | 4818 |
| **5036** | SAPPHIRE | `sapphire` | Rs. 1,499 | Eye Glasses / Women's | 5033 |
| **5098** | Gtayoti Cateye | `gtayoti-cateye` | Rs. 999 | Eye Glasses / Women's | 5095 |
| **5168** | Vison Fashion | `product` | Rs. 1,600 | Eye Glasses / Men's | 5167 |
| **5170** | Vison Fashion - Silver Black | `product-silver-black` | Rs. 1,600 (Sale) | Eye Glasses / Men's | 5167 |
| **5184** | *Maybach Premium Rimless Frame | `maybach-premium-rimless` | Rs. 2,199 | Eye Glasses / Men's | 5185 |
| **5219** | Perfect — Metal Flexible | `perfect-metal-flexible` | Rs. 1,599 | Eye Glasses / Men's | 5218 |
| **5228** | FlexiFold | `flexifold` | Rs. 1,299 | Eye Glasses / Reading | 5225 |
| **5235** | FlexiFold Model 2 | `flexifold-2` | Rs. 1,299 | Eye Glasses / Reading | 5233 |
| **5240** | FlexiFold Model 3 | `flexifold-3` | Rs. 1,299 | Eye Glasses / Reading | 5242 |
| **5253** | Perfect | `perfect` | Rs. 1,599 | Eye Glasses / Trending | 5252 |
| **5262** | Ray-Ban Aviator | `ray-ban-aviator` | Rs. 1,750 | SunGlasses / Aviator | 5260 |
| **5272** | Maybach | `maybach` | Rs. 2,199 | Eye Glasses / Men's | 5268 |
| **5282** | Cartier Wooden | `cartier-wooden` | Rs. 3,999 | Eye Glasses / Men's | 5278 |
| **5288** | Mont Blank | `mont-blank` | Rs. 2,400 | Eye Glasses / Men's | 5286 |
| **5296** | Monk Blank Edition | `monk-blank` | Rs. 2,400 | Eye Glasses / Men's | 5292 |
