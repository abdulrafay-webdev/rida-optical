import { Product, Category, LensUsageOption, LensCoatingOption } from "@/types";

export const PRODUCTS: Product[] = [
  {
    "id": 4634,
    "title": "Fashion Eye Glasses",
    "slug": "fashion-eye-glasses",
    "sku": "RO-4634",
    "base_price_pkr": 2500.0,
    "regular_price_pkr": 2500.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "Balenciaga-Style Eyeglass Frames \u2013 Fashion Meets Function\\n\\nDiscover the perfect blend of elegance and practicality with these Balenciaga-style eyeglass frames. Designed in five versatile colors, each pair features a bold front and stylish wood-textured side arms \u2013 crafted from high-quality plastic for lightweight comfort and durability.\\n\\nIdeal for both fashion wear and prescription use, these frames are a smart choice for anyone who values modern aesthetics and all-day comfort.\\n\\n---\\n\\nWhy You'll Love It:\\n\\nStylish Balenciaga-inspired design\\n\\nWood-look plastic side arms\\n\\nAvailable in 5 classic colors\\n\\nComfortable, lightweight, and durable\\n\\nPerfect for prescription or plain lenses\\n\\nUnisex \u2013 suitable for men and women",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 4629,
      "title": "2025/07/1000424554-scaled.jpg",
      "relative_path": "2025/07/1000424554-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2025/07/1000424554-scaled.jpg",
      "alt_text": "1000424554.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 4630,
        "title": "2025/07/1000424560-scaled.jpg",
        "relative_path": "2025/07/1000424560-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/07/1000424560-scaled.jpg",
        "alt_text": "1000424560.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 4631,
        "title": "2025/07/1000424563-scaled.jpg",
        "relative_path": "2025/07/1000424563-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/07/1000424563-scaled.jpg",
        "alt_text": "1000424563.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 4632,
        "title": "2025/07/1000424572-scaled.jpg",
        "relative_path": "2025/07/1000424572-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/07/1000424572-scaled.jpg",
        "alt_text": "1000424572.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 4633,
        "title": "2025/07/1000424557-scaled.jpg",
        "relative_path": "2025/07/1000424557-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/07/1000424557-scaled.jpg",
        "alt_text": "1000424557.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 4,
    "variations": [
      {
        "variation_id": 4727,
        "title": "Fashion Eye Glasses - Green",
        "slug": "fashion-eye-glasses",
        "sku": "RO-4634-4727",
        "color": {
          "term_id": 113,
          "name": "Green",
          "slug": "green",
          "hex_code": "#81d742"
        },
        "size": "Standard",
        "price_pkr": 2500.0,
        "regular_price_pkr": 3000.0,
        "sale_price_pkr": 2500.0,
        "stock_status": "instock",
        "image": {
          "id": 4629,
          "title": "2025/07/1000424554-scaled.jpg",
          "relative_path": "2025/07/1000424554-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/07/1000424554-scaled.jpg",
          "alt_text": "1000424554.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 4728,
        "title": "Fashion Eye Glasses - Gray",
        "slug": "fashion-eye-glasses-2",
        "sku": "RO-4634-4728",
        "color": {
          "term_id": 112,
          "name": "Gray",
          "slug": "gray",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 2500.0,
        "regular_price_pkr": 3000.0,
        "sale_price_pkr": 2500.0,
        "stock_status": "instock",
        "image": {
          "id": 4631,
          "title": "2025/07/1000424563-scaled.jpg",
          "relative_path": "2025/07/1000424563-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/07/1000424563-scaled.jpg",
          "alt_text": "1000424563.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 4729,
        "title": "Fashion Eye Glasses - Brown",
        "slug": "fashion-eye-glasses-3",
        "sku": "RO-4634-4729",
        "color": {
          "term_id": 109,
          "name": "Brown",
          "slug": "brown",
          "hex_code": "#aa7627"
        },
        "size": "Standard",
        "price_pkr": 2500.0,
        "regular_price_pkr": 3000.0,
        "sale_price_pkr": 2500.0,
        "stock_status": "instock",
        "image": {
          "id": 4632,
          "title": "2025/07/1000424572-scaled.jpg",
          "relative_path": "2025/07/1000424572-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/07/1000424572-scaled.jpg",
          "alt_text": "1000424572.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 4730,
        "title": "Fashion Eye Glasses",
        "slug": "fashion-eye-glasses-4",
        "sku": "RO-4634-4730",
        "color": {
          "term_id": null,
          "name": "Standard",
          "slug": "standard",
          "hex_code": null
        },
        "size": "",
        "price_pkr": 2500.0,
        "regular_price_pkr": 3000.0,
        "sale_price_pkr": 2500.0,
        "stock_status": "instock",
        "image": {
          "id": 4630,
          "title": "2025/07/1000424560-scaled.jpg",
          "relative_path": "2025/07/1000424560-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/07/1000424560-scaled.jpg",
          "alt_text": "1000424560.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Fashion Eye Glasses \u2014 Rida Optical",
      "meta_description": "Buy Fashion Eye Glasses online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/fashion-eye-glasses/"
    }
  },
  {
    "id": 4800,
    "title": "Vintage",
    "slug": "vintage",
    "sku": "RO-4800",
    "base_price_pkr": 1999.0,
    "regular_price_pkr": 1999.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 4798,
      "title": "2025/08/1000485538-scaled.jpg",
      "relative_path": "2025/08/1000485538-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000485538-scaled.jpg",
      "alt_text": "1000485538.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 4799,
        "title": "2025/08/1000485620-scaled.jpg",
        "relative_path": "2025/08/1000485620-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000485620-scaled.jpg",
        "alt_text": "1000485620.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 2,
    "variations": [
      {
        "variation_id": 4801,
        "title": "Vintage - Golden Black",
        "slug": "product-3",
        "sku": "RO-4800-4801",
        "color": {
          "term_id": 172,
          "name": "Golden Black",
          "slug": "golden-black",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1999.0,
        "regular_price_pkr": 3000.0,
        "sale_price_pkr": 1999.0,
        "stock_status": "instock",
        "image": {
          "id": 4799,
          "title": "2025/08/1000485620-scaled.jpg",
          "relative_path": "2025/08/1000485620-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000485620-scaled.jpg",
          "alt_text": "1000485620.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 4803,
        "title": "Vintage - Silver Black",
        "slug": "vintage",
        "sku": "RO-4800-4803",
        "color": {
          "term_id": 173,
          "name": "Silver Black",
          "slug": "silver-black",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1999.0,
        "regular_price_pkr": 3000.0,
        "sale_price_pkr": 1999.0,
        "stock_status": "instock",
        "image": {
          "id": 4798,
          "title": "2025/08/1000485538-scaled.jpg",
          "relative_path": "2025/08/1000485538-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000485538-scaled.jpg",
          "alt_text": "1000485538.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Vintage \u2014 Rida Optical",
      "meta_description": "Buy Vintage online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/vintage/"
    }
  },
  {
    "id": 4820,
    "title": "Fashion Sunglasses",
    "slug": "fashion-sunglasses",
    "sku": "RO-4820",
    "base_price_pkr": 1499.0,
    "regular_price_pkr": 1499.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "\\\"Elevate your look with our stylish SUM sunglasses, designed for comfort and a bold fashion statement. Crafted with premium materials, these sunglasses offer excellent UV protection while adding a modern, trendy touch to your everyday style. Perfect for sunny days, driving, or outdoor adventures \u2013 a must-have accessory for every season",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 4818,
      "title": "2025/08/1000484452-scaled.jpg",
      "relative_path": "2025/08/1000484452-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000484452-scaled.jpg",
      "alt_text": "1000484452.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 4819,
        "title": "2025/08/1000484446-scaled.jpg",
        "relative_path": "2025/08/1000484446-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000484446-scaled.jpg",
        "alt_text": "1000484446.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 2,
    "variations": [
      {
        "variation_id": 4821,
        "title": "Fashion Sunglasses - Transparent",
        "slug": "fashion-sunglasses",
        "sku": "RO-4820-4821",
        "color": {
          "term_id": 174,
          "name": "Transparent",
          "slug": "transparent",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1499.0,
        "regular_price_pkr": 2000.0,
        "sale_price_pkr": 1499.0,
        "stock_status": "instock",
        "image": {
          "id": 4818,
          "title": "2025/08/1000484452-scaled.jpg",
          "relative_path": "2025/08/1000484452-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000484452-scaled.jpg",
          "alt_text": "1000484452.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 4822,
        "title": "Fashion Sunglasses - Gloss",
        "slug": "fashion-sunglasses-2",
        "sku": "RO-4820-4822",
        "color": {
          "term_id": 175,
          "name": "Gloss",
          "slug": "gloss",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1499.0,
        "regular_price_pkr": 2000.0,
        "sale_price_pkr": 1499.0,
        "stock_status": "instock",
        "image": {
          "id": 4819,
          "title": "2025/08/1000484446-scaled.jpg",
          "relative_path": "2025/08/1000484446-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000484446-scaled.jpg",
          "alt_text": "1000484446.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Fashion Sunglasses \u2014 Rida Optical",
      "meta_description": "Buy Fashion Sunglasses online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/fashion-sunglasses/"
    }
  },
  {
    "id": 5036,
    "title": "SAPPHIRE",
    "slug": "sapphire",
    "sku": "RO-5036",
    "base_price_pkr": 1499.0,
    "regular_price_pkr": 1499.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "\\\"Sapphire Frame \u2013 A blend of elegance and durability. Its stylish design with a premium finish makes it perfect for everyday wear. Lightweight, comfortable, and crafted to enhance your look with a touch of sophistication.\\\"",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5033,
      "title": "2025/08/1000511499-scaled.jpg",
      "relative_path": "2025/08/1000511499-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000511499-scaled.jpg",
      "alt_text": "1000511499.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5032,
        "title": "2025/08/1000511502-scaled.jpg",
        "relative_path": "2025/08/1000511502-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000511502-scaled.jpg",
        "alt_text": "1000511502.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5034,
        "title": "2025/08/1000511501-scaled.jpg",
        "relative_path": "2025/08/1000511501-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000511501-scaled.jpg",
        "alt_text": "1000511501.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5035,
        "title": "2025/08/1000511500-scaled.jpg",
        "relative_path": "2025/08/1000511500-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000511500-scaled.jpg",
        "alt_text": "1000511500.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 4,
    "variations": [
      {
        "variation_id": 5037,
        "title": "SAPPHIRE - Pink",
        "slug": "product-18",
        "sku": "RO-5036-5037",
        "color": {
          "term_id": 118,
          "name": "Pink",
          "slug": "pink",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1499.0,
        "regular_price_pkr": 1800.0,
        "sale_price_pkr": 1499.0,
        "stock_status": "instock",
        "image": {
          "id": 5033,
          "title": "2025/08/1000511499-scaled.jpg",
          "relative_path": "2025/08/1000511499-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000511499-scaled.jpg",
          "alt_text": "1000511499.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5038,
        "title": "SAPPHIRE - Gray",
        "slug": "product-19",
        "sku": "RO-5036-5038",
        "color": {
          "term_id": 112,
          "name": "Gray",
          "slug": "gray",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1499.0,
        "regular_price_pkr": 1800.0,
        "sale_price_pkr": 1499.0,
        "stock_status": "instock",
        "image": {
          "id": 5034,
          "title": "2025/08/1000511501-scaled.jpg",
          "relative_path": "2025/08/1000511501-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000511501-scaled.jpg",
          "alt_text": "1000511501.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5039,
        "title": "SAPPHIRE - Brown",
        "slug": "product-20",
        "sku": "RO-5036-5039",
        "color": {
          "term_id": 109,
          "name": "Brown",
          "slug": "brown",
          "hex_code": "#aa7627"
        },
        "size": "Standard",
        "price_pkr": 1499.0,
        "regular_price_pkr": 1800.0,
        "sale_price_pkr": 1499.0,
        "stock_status": "instock",
        "image": {
          "id": 5040,
          "title": "2025/08/1000511502-1-scaled.jpg",
          "relative_path": "2025/08/1000511502-1-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000511502-1-scaled.jpg",
          "alt_text": "1000511502.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5041,
        "title": "SAPPHIRE - Transparent",
        "slug": "product-21",
        "sku": "RO-5036-5041",
        "color": {
          "term_id": 174,
          "name": "Transparent",
          "slug": "transparent",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1499.0,
        "regular_price_pkr": 1800.0,
        "sale_price_pkr": 1499.0,
        "stock_status": "instock",
        "image": {
          "id": 5035,
          "title": "2025/08/1000511500-scaled.jpg",
          "relative_path": "2025/08/1000511500-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/08/1000511500-scaled.jpg",
          "alt_text": "1000511500.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "SAPPHIRE \u2014 Rida Optical",
      "meta_description": "Buy SAPPHIRE online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/sapphire/"
    }
  },
  {
    "id": 5098,
    "title": "Gtayoti Cateye",
    "slug": "gtayoti-cateye",
    "sku": "RO-5098",
    "base_price_pkr": 999.0,
    "regular_price_pkr": 999.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "Gtayoti Cat-Eye Eyewear Frame for Women\\n\\nBold. Elegant. Uniquely You.\\nMake a statement with the Gtayoti Cat-Eye frame \u2014 a perfect fusion of vintage charm and modern flair. Designed exclusively for women who love to express their style, this frame features a stunning blend of green, brown, and pink tones that add depth and sophistication to any look.\\n\\nCrafted for comfort and built to stand out, the cat-eye silhouette enhances facial features while providing a fashionable edge. Whether you're dressing up for a special occasion or elevating your everyday look, the Gtayoti frame is your go-to accessory for confidence and class.",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5095,
      "title": "2025/09/1000098097-scaled.jpg",
      "relative_path": "2025/09/1000098097-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2025/09/1000098097-scaled.jpg",
      "alt_text": "1000098097.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5096,
        "title": "2025/09/1000098089-scaled.jpg",
        "relative_path": "2025/09/1000098089-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/09/1000098089-scaled.jpg",
        "alt_text": "1000098089.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5097,
        "title": "2025/09/1000098088-scaled.jpg",
        "relative_path": "2025/09/1000098088-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2025/09/1000098088-scaled.jpg",
        "alt_text": "1000098088.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 3,
    "variations": [
      {
        "variation_id": 5099,
        "title": "Gtayoti Cateye - Pink",
        "slug": "gtayoti-cateye",
        "sku": "RO-5098-5099",
        "color": {
          "term_id": 118,
          "name": "Pink",
          "slug": "pink",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 999.0,
        "regular_price_pkr": 1800.0,
        "sale_price_pkr": 999.0,
        "stock_status": "instock",
        "image": {
          "id": 5095,
          "title": "2025/09/1000098097-scaled.jpg",
          "relative_path": "2025/09/1000098097-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/09/1000098097-scaled.jpg",
          "alt_text": "1000098097.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5100,
        "title": "Gtayoti Cateye - Brown",
        "slug": "gtayoti-cateye-2",
        "sku": "RO-5098-5100",
        "color": {
          "term_id": 109,
          "name": "Brown",
          "slug": "brown",
          "hex_code": "#aa7627"
        },
        "size": "Standard",
        "price_pkr": 999.0,
        "regular_price_pkr": 1800.0,
        "sale_price_pkr": 999.0,
        "stock_status": "instock",
        "image": {
          "id": 5096,
          "title": "2025/09/1000098089-scaled.jpg",
          "relative_path": "2025/09/1000098089-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/09/1000098089-scaled.jpg",
          "alt_text": "1000098089.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5101,
        "title": "Gtayoti Cateye - Green",
        "slug": "gtayoti-cateye-3",
        "sku": "RO-5098-5101",
        "color": {
          "term_id": 113,
          "name": "Green",
          "slug": "green",
          "hex_code": "#81d742"
        },
        "size": "Standard",
        "price_pkr": 999.0,
        "regular_price_pkr": 1800.0,
        "sale_price_pkr": 999.0,
        "stock_status": "instock",
        "image": {
          "id": 5097,
          "title": "2025/09/1000098088-scaled.jpg",
          "relative_path": "2025/09/1000098088-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2025/09/1000098088-scaled.jpg",
          "alt_text": "1000098088.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Gtayoti Cateye \u2014 Rida Optical",
      "meta_description": "Buy Gtayoti Cateye online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/gtayoti-cateye/"
    }
  },
  {
    "id": 5168,
    "title": "Vison Fashion",
    "slug": "product",
    "sku": "RO-5168",
    "base_price_pkr": 1600.0,
    "regular_price_pkr": 1600.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "*Vision Fashion Premium Eyeglass Frame*\\n\\nUpgrade your style with our best-selling Vision Fashion frame. Designed for both comfort and class, this frame is perfect for daily wear and professional looks.\\n\\n*Key Features:*\\n- *Two Stunning Colors*: Available in Golden Black and Silver Black\\n- *Premium Build*: Lightweight yet durable material for all-day comfort \\n- *Universal Fit*: Suitable for both men and women\\n- *Modern Design*: Sleek, trendy look that matches every outfit\\n- *Top Seller*: Our most popular article loved by customers\\n\\nWhether for office, casual, or prescription use, Vision Fashion gives you a sharp, confident look without compromising on comfort.\\n\\n*Price*: [Your Price] \\n*Colors*: Golden Black | Silver Black\\n\\n*Hashtags:* \\n#VisionFashion #EyeglassFrames #MensEyewear #WomensEyewear #GoldenBlack #SilverBlack #TrendyFrames #OpticalFashion #PremiumEyewear #DailyWear #BestSeller #NewArrival #FashionFrames #PakistanOptics",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5167,
      "title": "2026/06/1000200087-1.jpg",
      "relative_path": "2026/06/1000200087-1.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/06/1000200087-1.jpg",
      "alt_text": "1000200087.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5169,
        "title": "2026/06/1000238310-1.jpg",
        "relative_path": "2026/06/1000238310-1.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/06/1000238310-1.jpg",
        "alt_text": "1000238310.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 2,
    "variations": [
      {
        "variation_id": 5170,
        "title": "Vison Fashion - Silver Black",
        "slug": "product",
        "sku": "RO-5168-5170",
        "color": {
          "term_id": 173,
          "name": "Silver Black",
          "slug": "silver-black",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1600.0,
        "regular_price_pkr": 2200.0,
        "sale_price_pkr": 1600.0,
        "stock_status": "instock",
        "image": {
          "id": 5167,
          "title": "2026/06/1000200087-1.jpg",
          "relative_path": "2026/06/1000200087-1.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/06/1000200087-1.jpg",
          "alt_text": "1000200087.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5171,
        "title": "Vison Fashion - Golden Black",
        "slug": "product-2",
        "sku": "RO-5168-5171",
        "color": {
          "term_id": 172,
          "name": "Golden Black",
          "slug": "golden-black",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1600.0,
        "regular_price_pkr": 2200.0,
        "sale_price_pkr": 1600.0,
        "stock_status": "instock",
        "image": {
          "id": 5172,
          "title": "2026/06/1000238310-2.jpg",
          "relative_path": "2026/06/1000238310-2.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/06/1000238310-2.jpg",
          "alt_text": "1000238310.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Vison Fashion \u2014 Rida Optical",
      "meta_description": "Buy Vison Fashion online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/product/"
    }
  },
  {
    "id": 5184,
    "title": "*Maybach Premium Rimless Eyeglass Frame",
    "slug": "maybach-premium-rimless-eyeglass-frame",
    "sku": "RO-5184",
    "base_price_pkr": 2199.0,
    "regular_price_pkr": 2199.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "*Maybach Luxury Eyeglass Frame*\\n\\nInspired by ultimate luxury and precision, the Maybach frame delivers exceptional craftsmanship and timeless elegance. A statement piece for those who demand the best.\\n\\n*Key Features:*\\n- *Luxury Design*: Premium aesthetic inspired by iconic automotive excellence\\n- *Superior Build*: High-quality titanium and acetate for durability and comfort\\n- *Refined Finish*: Sleek lines with polished details for a sophisticated look\\n- *Perfect for Professionals*: Ideal for business, formal, and luxury wear\\n- *Signature Style*: Bold yet classy frame that stands out effortlessly\\n\\nExperience luxury on your face. Perfect for prescription or fashion lenses.\\n\\n*Colors*: Gold Black | Silver Black | Matte Gunmetal \\n*Material*: Premium Titanium & Acetate\\n\\n*Hashtags:* \\n#MaybachFrames #LuxuryEyewear #PremiumGlasses #TitaniumEyewear #VisionFashion #MensLuxury #BusinessClass #ExecutiveStyle #HighEndFrames #DesignerEyewear #PakistanOptics #LuxuryOptics",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5185,
      "title": "2026/06/1000185251-4.jpg",
      "relative_path": "2026/06/1000185251-4.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/06/1000185251-4.jpg",
      "alt_text": "product",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5186,
        "title": "2026/06/1000185260.jpg",
        "relative_path": "2026/06/1000185260.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/06/1000185260.jpg",
        "alt_text": "product",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 2,
    "variations": [
      {
        "variation_id": 5188,
        "title": "*Maybach Premium Rimless Eyeglass Frame - Brown Golden",
        "slug": "maybach-premium-rimless-eyeglass-frame",
        "sku": "RO-5184-5188",
        "color": {
          "term_id": 179,
          "name": "Brown Golden",
          "slug": "brown-golden",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 2199.0,
        "regular_price_pkr": 2700.0,
        "sale_price_pkr": 2199.0,
        "stock_status": "instock",
        "image": {
          "id": 5174,
          "title": "1000185251.jpg",
          "relative_path": "2026/06/1000185251.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/06/1000185251.jpg",
          "alt_text": "1000185251.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5190,
        "title": "*Maybach Premium Rimless Eyeglass Frame - Silver Black",
        "slug": "maybach-premium-rimless-eyeglass-frame-2",
        "sku": "RO-5184-5190",
        "color": {
          "term_id": 173,
          "name": "Silver Black",
          "slug": "silver-black",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 2199.0,
        "regular_price_pkr": 2700.0,
        "sale_price_pkr": 2199.0,
        "stock_status": "instock",
        "image": {
          "id": 5189,
          "title": "2026/06/1000185260-1.jpg",
          "relative_path": "2026/06/1000185260-1.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/06/1000185260-1.jpg",
          "alt_text": "1000185260.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "*Maybach Premium Rimless Eyeglass Frame \u2014 Rida Optical",
      "meta_description": "Buy *Maybach Premium Rimless Eyeglass Frame online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/maybach-premium-rimless-eyeglass-frame/"
    }
  },
  {
    "id": 5219,
    "title": "Perfect \u2014 Metal Flexible",
    "slug": "perfect-metal-flexible",
    "sku": "RO-5219",
    "base_price_pkr": 1599.0,
    "regular_price_pkr": 1599.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5218,
      "title": "2026/08/1000490889-1-scaled.jpg",
      "relative_path": "2026/08/1000490889-1-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490889-1-scaled.jpg",
      "alt_text": "1000490889.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5214,
        "title": "2026/08/1000490892-scaled.jpg",
        "relative_path": "2026/08/1000490892-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490892-scaled.jpg",
        "alt_text": "1000490892.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5215,
        "title": "2026/08/1000490894-scaled.jpg",
        "relative_path": "2026/08/1000490894-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490894-scaled.jpg",
        "alt_text": "1000490894.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5216,
        "title": "2026/08/1000490891-scaled.jpg",
        "relative_path": "2026/08/1000490891-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490891-scaled.jpg",
        "alt_text": "1000490891.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5217,
        "title": "2026/08/1000490893-scaled.jpg",
        "relative_path": "2026/08/1000490893-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490893-scaled.jpg",
        "alt_text": "1000490893.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 3,
    "variations": [
      {
        "variation_id": 5221,
        "title": "Perfect \u2014 Metal Flexible - Gray",
        "slug": "perfect-metal-flexible",
        "sku": "RO-5219-5221",
        "color": {
          "term_id": 112,
          "name": "Gray",
          "slug": "gray",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1599.0,
        "regular_price_pkr": 2100.0,
        "sale_price_pkr": 1599.0,
        "stock_status": "instock",
        "image": {
          "id": 5218,
          "title": "2026/08/1000490889-1-scaled.jpg",
          "relative_path": "2026/08/1000490889-1-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490889-1-scaled.jpg",
          "alt_text": "1000490889.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5222,
        "title": "Perfect \u2014 Metal Flexible - Brown",
        "slug": "perfect-metal-flexible-2",
        "sku": "RO-5219-5222",
        "color": {
          "term_id": 109,
          "name": "Brown",
          "slug": "brown",
          "hex_code": "#aa7627"
        },
        "size": "Standard",
        "price_pkr": 1599.0,
        "regular_price_pkr": 2500.0,
        "sale_price_pkr": 1599.0,
        "stock_status": "instock",
        "image": {
          "id": 5214,
          "title": "2026/08/1000490892-scaled.jpg",
          "relative_path": "2026/08/1000490892-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490892-scaled.jpg",
          "alt_text": "1000490892.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5223,
        "title": "Perfect \u2014 Metal Flexible - Black",
        "slug": "perfect-metal-flexible-3",
        "sku": "RO-5219-5223",
        "color": {
          "term_id": 107,
          "name": "Black",
          "slug": "black",
          "hex_code": "#000000"
        },
        "size": "Standard",
        "price_pkr": 1599.0,
        "regular_price_pkr": 2500.0,
        "sale_price_pkr": 1599.0,
        "stock_status": "instock",
        "image": {
          "id": 5217,
          "title": "2026/08/1000490893-scaled.jpg",
          "relative_path": "2026/08/1000490893-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490893-scaled.jpg",
          "alt_text": "1000490893.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Perfect \u2014 Metal Flexible \u2014 Rida Optical",
      "meta_description": "Buy Perfect \u2014 Metal Flexible online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/perfect-metal-flexible/"
    }
  },
  {
    "id": 5228,
    "title": "FlexiFold",
    "slug": "flexifold",
    "sku": "RO-5228",
    "base_price_pkr": 1299.0,
    "regular_price_pkr": 1299.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5225,
      "title": "2026/08/1000490409-scaled.jpg",
      "relative_path": "2026/08/1000490409-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490409-scaled.jpg",
      "alt_text": "1000490409.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5226,
        "title": "2026/08/1000490410-scaled.jpg",
        "relative_path": "2026/08/1000490410-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490410-scaled.jpg",
        "alt_text": "1000490410.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5227,
        "title": "2026/08/1000490404-scaled.jpg",
        "relative_path": "2026/08/1000490404-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490404-scaled.jpg",
        "alt_text": "1000490404.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 3,
    "variations": [
      {
        "variation_id": 5229,
        "title": "FlexiFold - Blue",
        "slug": "flexifold",
        "sku": "RO-5228-5229",
        "color": {
          "term_id": 108,
          "name": "Blue",
          "slug": "blue",
          "hex_code": "#1e73be"
        },
        "size": "Standard",
        "price_pkr": 1299.0,
        "regular_price_pkr": 1999.0,
        "sale_price_pkr": 1299.0,
        "stock_status": "instock",
        "image": {
          "id": 5225,
          "title": "2026/08/1000490409-scaled.jpg",
          "relative_path": "2026/08/1000490409-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490409-scaled.jpg",
          "alt_text": "1000490409.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5230,
        "title": "FlexiFold - Purple",
        "slug": "flexifold-2",
        "sku": "RO-5228-5230",
        "color": {
          "term_id": 119,
          "name": "Purple",
          "slug": "purple",
          "hex_code": "#ce25e8"
        },
        "size": "Standard",
        "price_pkr": 1299.0,
        "regular_price_pkr": 1999.0,
        "sale_price_pkr": 1299.0,
        "stock_status": "instock",
        "image": {
          "id": 5226,
          "title": "2026/08/1000490410-scaled.jpg",
          "relative_path": "2026/08/1000490410-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490410-scaled.jpg",
          "alt_text": "1000490410.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5231,
        "title": "FlexiFold - Pink",
        "slug": "flexifold-3",
        "sku": "RO-5228-5231",
        "color": {
          "term_id": 118,
          "name": "Pink",
          "slug": "pink",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1299.0,
        "regular_price_pkr": 1999.0,
        "sale_price_pkr": 1299.0,
        "stock_status": "instock",
        "image": {
          "id": 5227,
          "title": "2026/08/1000490404-scaled.jpg",
          "relative_path": "2026/08/1000490404-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490404-scaled.jpg",
          "alt_text": "1000490404.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "FlexiFold \u2014 Rida Optical",
      "meta_description": "Buy FlexiFold online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/flexifold/"
    }
  },
  {
    "id": 5235,
    "title": "FlexiFold",
    "slug": "flexifold-2",
    "sku": "RO-5235",
    "base_price_pkr": 1299.0,
    "regular_price_pkr": 1299.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5233,
      "title": "2026/08/1000490364-scaled.jpg",
      "relative_path": "2026/08/1000490364-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490364-scaled.jpg",
      "alt_text": "1000490364.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5234,
        "title": "2026/08/1000490381-scaled.jpg",
        "relative_path": "2026/08/1000490381-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490381-scaled.jpg",
        "alt_text": "1000490381.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 2,
    "variations": [
      {
        "variation_id": 5236,
        "title": "FlexiFold - Blue",
        "slug": "product-4",
        "sku": "RO-5235-5236",
        "color": {
          "term_id": 108,
          "name": "Blue",
          "slug": "blue",
          "hex_code": "#1e73be"
        },
        "size": "Standard",
        "price_pkr": 1299.0,
        "regular_price_pkr": 1999.0,
        "sale_price_pkr": 1299.0,
        "stock_status": "instock",
        "image": {
          "id": 5233,
          "title": "2026/08/1000490364-scaled.jpg",
          "relative_path": "2026/08/1000490364-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490364-scaled.jpg",
          "alt_text": "1000490364.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5238,
        "title": "FlexiFold - Purple",
        "slug": "flexifold-4",
        "sku": "RO-5235-5238",
        "color": {
          "term_id": 119,
          "name": "Purple",
          "slug": "purple",
          "hex_code": "#ce25e8"
        },
        "size": "Standard",
        "price_pkr": 1299.0,
        "regular_price_pkr": 1999.0,
        "sale_price_pkr": 1299.0,
        "stock_status": "instock",
        "image": {
          "id": 5234,
          "title": "2026/08/1000490381-scaled.jpg",
          "relative_path": "2026/08/1000490381-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490381-scaled.jpg",
          "alt_text": "1000490381.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "FlexiFold \u2014 Rida Optical",
      "meta_description": "Buy FlexiFold online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/flexifold-2/"
    }
  },
  {
    "id": 5240,
    "title": "FlexiFold",
    "slug": "flexifold-3",
    "sku": "RO-5240",
    "base_price_pkr": 1299.0,
    "regular_price_pkr": 1299.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5242,
      "title": "2026/08/1000490353-scaled.jpg",
      "relative_path": "2026/08/1000490353-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490353-scaled.jpg",
      "alt_text": "1000490353.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5243,
        "title": "2026/08/1000490362-scaled.jpg",
        "relative_path": "2026/08/1000490362-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490362-scaled.jpg",
        "alt_text": "1000490362.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 3,
    "variations": [
      {
        "variation_id": 5244,
        "title": "FlexiFold - Blue",
        "slug": "flexifold-5",
        "sku": "RO-5240-5244",
        "color": {
          "term_id": 108,
          "name": "Blue",
          "slug": "blue",
          "hex_code": "#1e73be"
        },
        "size": "Standard",
        "price_pkr": 1299.0,
        "regular_price_pkr": 1999.0,
        "sale_price_pkr": 1299.0,
        "stock_status": "instock",
        "image": {
          "id": 5243,
          "title": "2026/08/1000490362-scaled.jpg",
          "relative_path": "2026/08/1000490362-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490362-scaled.jpg",
          "alt_text": "1000490362.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5245,
        "title": "FlexiFold - Pink",
        "slug": "flexifold-6",
        "sku": "RO-5240-5245",
        "color": {
          "term_id": 118,
          "name": "Pink",
          "slug": "pink",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1299.0,
        "regular_price_pkr": 1999.0,
        "sale_price_pkr": 1299.0,
        "stock_status": "instock",
        "image": {
          "id": 5239,
          "title": "1000490363.jpg",
          "relative_path": "2026/08/1000490363-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490363-scaled.jpg",
          "alt_text": "1000490363.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5246,
        "title": "FlexiFold - Purple",
        "slug": "flexifold-7",
        "sku": "RO-5240-5246",
        "color": {
          "term_id": 119,
          "name": "Purple",
          "slug": "purple",
          "hex_code": "#ce25e8"
        },
        "size": "Standard",
        "price_pkr": 1299.0,
        "regular_price_pkr": 1999.0,
        "sale_price_pkr": 1299.0,
        "stock_status": "instock",
        "image": {
          "id": 5242,
          "title": "2026/08/1000490353-scaled.jpg",
          "relative_path": "2026/08/1000490353-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000490353-scaled.jpg",
          "alt_text": "1000490353.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "FlexiFold \u2014 Rida Optical",
      "meta_description": "Buy FlexiFold online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/flexifold-3/"
    }
  },
  {
    "id": 5253,
    "title": "Perfect",
    "slug": "product-2",
    "sku": "RO-5253",
    "base_price_pkr": 1599.0,
    "regular_price_pkr": 1599.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5252,
      "title": "2026/08/1000491157-scaled.jpg",
      "relative_path": "2026/08/1000491157-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491157-scaled.jpg",
      "alt_text": "1000491157.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5249,
        "title": "2026/08/1000491156-scaled.jpg",
        "relative_path": "2026/08/1000491156-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491156-scaled.jpg",
        "alt_text": "1000491156.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5250,
        "title": "2026/08/1000491158-scaled.jpg",
        "relative_path": "2026/08/1000491158-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491158-scaled.jpg",
        "alt_text": "1000491158.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5251,
        "title": "2026/08/1000491155-scaled.jpg",
        "relative_path": "2026/08/1000491155-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491155-scaled.jpg",
        "alt_text": "1000491155.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 4,
    "variations": [
      {
        "variation_id": 5255,
        "title": "Perfect - White",
        "slug": "perfect",
        "sku": "RO-5253-5255",
        "color": {
          "term_id": 122,
          "name": "White",
          "slug": "white",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1599.0,
        "regular_price_pkr": 2099.0,
        "sale_price_pkr": 1599.0,
        "stock_status": "instock",
        "image": {
          "id": 5252,
          "title": "2026/08/1000491157-scaled.jpg",
          "relative_path": "2026/08/1000491157-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491157-scaled.jpg",
          "alt_text": "1000491157.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5257,
        "title": "Perfect - Gray",
        "slug": "product-5",
        "sku": "RO-5253-5257",
        "color": {
          "term_id": 112,
          "name": "Gray",
          "slug": "gray",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1599.0,
        "regular_price_pkr": 2099.0,
        "sale_price_pkr": 1599.0,
        "stock_status": "instock",
        "image": {
          "id": 5251,
          "title": "2026/08/1000491155-scaled.jpg",
          "relative_path": "2026/08/1000491155-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491155-scaled.jpg",
          "alt_text": "1000491155.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5258,
        "title": "Perfect - Brown",
        "slug": "product-6",
        "sku": "RO-5253-5258",
        "color": {
          "term_id": 109,
          "name": "Brown",
          "slug": "brown",
          "hex_code": "#aa7627"
        },
        "size": "Standard",
        "price_pkr": 1599.0,
        "regular_price_pkr": 2099.0,
        "sale_price_pkr": 1599.0,
        "stock_status": "instock",
        "image": {
          "id": 5249,
          "title": "2026/08/1000491156-scaled.jpg",
          "relative_path": "2026/08/1000491156-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491156-scaled.jpg",
          "alt_text": "1000491156.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5259,
        "title": "Perfect - Orange",
        "slug": "product-7",
        "sku": "RO-5253-5259",
        "color": {
          "term_id": 117,
          "name": "Orange",
          "slug": "orange",
          "hex_code": "#f49922"
        },
        "size": "Standard",
        "price_pkr": 1599.0,
        "regular_price_pkr": 2099.0,
        "sale_price_pkr": 1599.0,
        "stock_status": "instock",
        "image": {
          "id": 5250,
          "title": "2026/08/1000491158-scaled.jpg",
          "relative_path": "2026/08/1000491158-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491158-scaled.jpg",
          "alt_text": "1000491158.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Perfect \u2014 Rida Optical",
      "meta_description": "Buy Perfect online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/product-2/"
    }
  },
  {
    "id": 5262,
    "title": "Ray-Ban Aviator",
    "slug": "ray-ban-aviator",
    "sku": "RO-5262",
    "base_price_pkr": 1750.0,
    "regular_price_pkr": 1750.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5260,
      "title": "2026/08/1000491181-scaled.jpg",
      "relative_path": "2026/08/1000491181-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491181-scaled.jpg",
      "alt_text": "1000491181.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5261,
        "title": "2026/08/1000491182-scaled.jpg",
        "relative_path": "2026/08/1000491182-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491182-scaled.jpg",
        "alt_text": "1000491182.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 2,
    "variations": [
      {
        "variation_id": 5263,
        "title": "Ray-Ban Aviator - Black",
        "slug": "product-8",
        "sku": "RO-5262-5263",
        "color": {
          "term_id": 107,
          "name": "Black",
          "slug": "black",
          "hex_code": "#000000"
        },
        "size": "Standard",
        "price_pkr": 1750.0,
        "regular_price_pkr": 2499.0,
        "sale_price_pkr": 1750.0,
        "stock_status": "instock",
        "image": {
          "id": 5260,
          "title": "2026/08/1000491181-scaled.jpg",
          "relative_path": "2026/08/1000491181-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491181-scaled.jpg",
          "alt_text": "1000491181.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5265,
        "title": "Ray-Ban Aviator - Gloss",
        "slug": "ray-ban-aviator",
        "sku": "RO-5262-5265",
        "color": {
          "term_id": 175,
          "name": "Gloss",
          "slug": "gloss",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 1750.0,
        "regular_price_pkr": 2499.0,
        "sale_price_pkr": 1750.0,
        "stock_status": "instock",
        "image": {
          "id": 5261,
          "title": "2026/08/1000491182-scaled.jpg",
          "relative_path": "2026/08/1000491182-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000491182-scaled.jpg",
          "alt_text": "1000491182.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Ray-Ban Aviator \u2014 Rida Optical",
      "meta_description": "Buy Ray-Ban Aviator online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/ray-ban-aviator/"
    }
  },
  {
    "id": 5272,
    "title": "Maybach",
    "slug": "maybach",
    "sku": "RO-5272",
    "base_price_pkr": 2199.0,
    "regular_price_pkr": 2199.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5268,
      "title": "2026/08/1000493447.jpg",
      "relative_path": "2026/08/1000493447.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000493447.jpg",
      "alt_text": "1000493447.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5269,
        "title": "2026/08/1000493444.jpg",
        "relative_path": "2026/08/1000493444.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000493444.jpg",
        "alt_text": "1000493444.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5270,
        "title": "2026/08/1000493445.jpg",
        "relative_path": "2026/08/1000493445.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000493445.jpg",
        "alt_text": "1000493445.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5271,
        "title": "2026/08/1000493446.jpg",
        "relative_path": "2026/08/1000493446.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000493446.jpg",
        "alt_text": "1000493446.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 3,
    "variations": [
      {
        "variation_id": 5274,
        "title": "Maybach - Brown",
        "slug": "maybach",
        "sku": "RO-5272-5274",
        "color": {
          "term_id": 109,
          "name": "Brown",
          "slug": "brown",
          "hex_code": "#aa7627"
        },
        "size": "Standard",
        "price_pkr": 2199.0,
        "regular_price_pkr": 2700.0,
        "sale_price_pkr": 2199.0,
        "stock_status": "instock",
        "image": {
          "id": 5268,
          "title": "2026/08/1000493447.jpg",
          "relative_path": "2026/08/1000493447.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000493447.jpg",
          "alt_text": "1000493447.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5275,
        "title": "Maybach - Blue",
        "slug": "maybach-2",
        "sku": "RO-5272-5275",
        "color": {
          "term_id": 108,
          "name": "Blue",
          "slug": "blue",
          "hex_code": "#1e73be"
        },
        "size": "Standard",
        "price_pkr": 2199.0,
        "regular_price_pkr": 2700.0,
        "sale_price_pkr": 2199.0,
        "stock_status": "instock",
        "image": {
          "id": 5271,
          "title": "2026/08/1000493446.jpg",
          "relative_path": "2026/08/1000493446.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000493446.jpg",
          "alt_text": "1000493446.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5276,
        "title": "Maybach - Black",
        "slug": "maybach-3",
        "sku": "RO-5272-5276",
        "color": {
          "term_id": 107,
          "name": "Black",
          "slug": "black",
          "hex_code": "#000000"
        },
        "size": "Standard",
        "price_pkr": 2199.0,
        "regular_price_pkr": 2700.0,
        "sale_price_pkr": 2199.0,
        "stock_status": "instock",
        "image": {
          "id": 5277,
          "title": "2026/08/1000493445-1.jpg",
          "relative_path": "2026/08/1000493445-1.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000493445-1.jpg",
          "alt_text": "1000493445.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Maybach \u2014 Rida Optical",
      "meta_description": "Buy Maybach online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/maybach/"
    }
  },
  {
    "id": 5282,
    "title": "Cartier Wooden",
    "slug": "cartier-wooden",
    "sku": "RO-5282",
    "base_price_pkr": 3999.0,
    "regular_price_pkr": 3999.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5278,
      "title": "1000426366.jpg",
      "relative_path": "2026/08/1000426366-scaled.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000426366-scaled.jpg",
      "alt_text": "1000426366.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5279,
        "title": "1000426368.jpg",
        "relative_path": "2026/08/1000426368-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000426368-scaled.jpg",
        "alt_text": "1000426368.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5280,
        "title": "1000426397.jpg",
        "relative_path": "2026/08/1000426397-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000426397-scaled.jpg",
        "alt_text": "1000426397.jpg",
        "file_exists_on_disk": true
      },
      {
        "id": 5281,
        "title": "1000426426.jpg",
        "relative_path": "2026/08/1000426426-scaled.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000426426-scaled.jpg",
        "alt_text": "1000426426.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 2,
    "variations": [
      {
        "variation_id": 5283,
        "title": "Cartier Wooden - Selver",
        "slug": "cartier-wooden",
        "sku": "RO-5282-5283",
        "color": {
          "term_id": 164,
          "name": "Selver",
          "slug": "selver",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 3999.0,
        "regular_price_pkr": 5000.0,
        "sale_price_pkr": 3999.0,
        "stock_status": "instock",
        "image": {
          "id": 5278,
          "title": "1000426366.jpg",
          "relative_path": "2026/08/1000426366-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000426366-scaled.jpg",
          "alt_text": "1000426366.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5284,
        "title": "Cartier Wooden - Golden",
        "slug": "cartier-wooden-2",
        "sku": "RO-5282-5284",
        "color": {
          "term_id": 163,
          "name": "Golden",
          "slug": "golden",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 3999.0,
        "regular_price_pkr": 5000.0,
        "sale_price_pkr": 3999.0,
        "stock_status": "instock",
        "image": {
          "id": 5280,
          "title": "1000426397.jpg",
          "relative_path": "2026/08/1000426397-scaled.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000426397-scaled.jpg",
          "alt_text": "1000426397.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Cartier Wooden \u2014 Rida Optical",
      "meta_description": "Buy Cartier Wooden online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/cartier-wooden/"
    }
  },
  {
    "id": 5288,
    "title": "Mont Blank",
    "slug": "mont-blank",
    "sku": "RO-5288",
    "base_price_pkr": 2400.0,
    "regular_price_pkr": 2400.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "Montblanc Wooden Frame\\n\\nA sophisticated Montblanc frame featuring a distinctive wooden temple design and elegant wood detailing. Crafted for a premium, refined look, this frame beautifully combines classic styling with a natural wooden touch. Lightweight, stylish, and comfortable for everyday wear.\\n\\nMaterial: Wood & Premium Frame Material\\nStyle: Classic / Luxury\\nDesign: Wooden Side Temples\\nFit: Comfortable for Everyday Wear",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5286,
      "title": "2026/08/1000498641.jpg",
      "relative_path": "2026/08/1000498641.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000498641.jpg",
      "alt_text": "1000498641.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [
      {
        "id": 5287,
        "title": "2026/08/1000498640.jpg",
        "relative_path": "2026/08/1000498640.jpg",
        "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000498640.jpg",
        "alt_text": "1000498640.jpg",
        "file_exists_on_disk": true
      }
    ],
    "variations_count": 2,
    "variations": [
      {
        "variation_id": 5289,
        "title": "Mont Blank - Gray",
        "slug": "mont-blank",
        "sku": "RO-5288-5289",
        "color": {
          "term_id": 112,
          "name": "Gray",
          "slug": "gray",
          "hex_code": null
        },
        "size": "Standard",
        "price_pkr": 2400.0,
        "regular_price_pkr": 3000.0,
        "sale_price_pkr": 2400.0,
        "stock_status": "instock",
        "image": {
          "id": 5287,
          "title": "2026/08/1000498640.jpg",
          "relative_path": "2026/08/1000498640.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000498640.jpg",
          "alt_text": "1000498640.jpg",
          "file_exists_on_disk": true
        }
      },
      {
        "variation_id": 5290,
        "title": "Mont Blank - Black",
        "slug": "mont-blank-2",
        "sku": "RO-5288-5290",
        "color": {
          "term_id": 107,
          "name": "Black",
          "slug": "black",
          "hex_code": "#000000"
        },
        "size": "Standard",
        "price_pkr": 2400.0,
        "regular_price_pkr": 3000.0,
        "sale_price_pkr": 2400.0,
        "stock_status": "instock",
        "image": {
          "id": 5286,
          "title": "2026/08/1000498641.jpg",
          "relative_path": "2026/08/1000498641.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000498641.jpg",
          "alt_text": "1000498641.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Mont Blank \u2014 Rida Optical",
      "meta_description": "Buy Mont Blank online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/mont-blank/"
    }
  },
  {
    "id": 5296,
    "title": "Monk Blank",
    "slug": "monk-blank",
    "sku": "RO-5296",
    "base_price_pkr": 2400.0,
    "regular_price_pkr": 2400.0,
    "sale_price_pkr": null,
    "stock_status": "instock",
    "is_featured": false,
    "total_sales": 0,
    "short_description": "",
    "description": "",
    "primary_category": {
      "id": 133,
      "name": "Eye Glasses",
      "slug": "eye-glasses"
    },
    "all_categories": [],
    "has_prescription_support": true,
    "primary_image": {
      "id": 5292,
      "title": "1000498634.jpg",
      "relative_path": "2026/08/1000498634.jpg",
      "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000498634.jpg",
      "alt_text": "1000498634.jpg",
      "file_exists_on_disk": true
    },
    "gallery_images": [],
    "variations_count": 1,
    "variations": [
      {
        "variation_id": 5297,
        "title": "Monk Blank - Black",
        "slug": "monk-blank",
        "sku": "RO-5296-5297",
        "color": {
          "term_id": 107,
          "name": "Black",
          "slug": "black",
          "hex_code": "#000000"
        },
        "size": "Standard",
        "price_pkr": 2400.0,
        "regular_price_pkr": 3000.0,
        "sale_price_pkr": 2400.0,
        "stock_status": "instock",
        "image": {
          "id": 5292,
          "title": "1000498634.jpg",
          "relative_path": "2026/08/1000498634.jpg",
          "url": "https://ridaoptical.com/wp-content/uploads/2026/08/1000498634.jpg",
          "alt_text": "1000498634.jpg",
          "file_exists_on_disk": true
        }
      }
    ],
    "seo": {
      "meta_title": "Monk Blank \u2014 Rida Optical",
      "meta_description": "Buy Monk Blank online at Rida Optical. Premium quality optical frames with custom prescription lenses.",
      "canonical_url": "https://ridaoptical.com/product/monk-blank/"
    }
  }
];

export const CATEGORIES: Category[] = [
  {
    "id": 15,
    "taxonomy_id": 15,
    "name": "AL Mahash",
    "slug": "al-mahash",
    "parent_id": null,
    "product_count": 0,
    "thumbnail_id": 4769
  },
  {
    "id": 131,
    "taxonomy_id": 131,
    "name": "Contact Lenses",
    "slug": "contatc-lenses",
    "parent_id": null,
    "product_count": 0,
    "thumbnail_id": 5026
  },
  {
    "id": 133,
    "taxonomy_id": 133,
    "name": "Eye Glasses",
    "slug": "eye-glasses",
    "parent_id": null,
    "product_count": 16,
    "thumbnail_id": 5027
  },
  {
    "id": 167,
    "taxonomy_id": 167,
    "name": "Lenses (for glasses)",
    "slug": "lenses-for-glasses",
    "parent_id": null,
    "product_count": 0,
    "thumbnail_id": 5025
  },
  {
    "id": 176,
    "taxonomy_id": 176,
    "name": "Screen Glass",
    "slug": "screen-glass",
    "parent_id": null,
    "product_count": 1,
    "thumbnail_id": 5028
  },
  {
    "id": 132,
    "taxonomy_id": 132,
    "name": "SunGlasses",
    "slug": "sunglasses",
    "parent_id": null,
    "product_count": 1,
    "thumbnail_id": 5031
  },
  {
    "id": 177,
    "taxonomy_id": 177,
    "name": "Transition Glaass",
    "slug": "transition-glass",
    "parent_id": null,
    "product_count": 0,
    "thumbnail_id": 5030
  },
  {
    "id": 155,
    "taxonomy_id": 155,
    "name": "Coat",
    "slug": "coat",
    "parent_id": 15,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 154,
    "taxonomy_id": 154,
    "name": "Prince\u00a0Coat",
    "slug": "prince-coat",
    "parent_id": 15,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 151,
    "taxonomy_id": 151,
    "name": "Waistcoat Colar casual",
    "slug": "waistcoat-colar-casual",
    "parent_id": 15,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 152,
    "taxonomy_id": 152,
    "name": "Waistcoat O shape",
    "slug": "waistcoat-o-shape",
    "parent_id": 15,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 153,
    "taxonomy_id": 153,
    "name": "Waistcoat V shape",
    "slug": "waistcoat-v-shape",
    "parent_id": 15,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 148,
    "taxonomy_id": 148,
    "name": "Color Brand",
    "slug": "color-brand",
    "parent_id": 131,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 145,
    "taxonomy_id": 145,
    "name": "Daily wear",
    "slug": "daily-wear",
    "parent_id": 131,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 150,
    "taxonomy_id": 150,
    "name": "Lens\u00a0Kit",
    "slug": "lens-kit",
    "parent_id": 131,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 147,
    "taxonomy_id": 147,
    "name": "Party Wear",
    "slug": "party-wear",
    "parent_id": 131,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 149,
    "taxonomy_id": 149,
    "name": "Solution",
    "slug": "solution",
    "parent_id": 131,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 146,
    "taxonomy_id": 146,
    "name": "Standard Wear",
    "slug": "standard-wear",
    "parent_id": 131,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 144,
    "taxonomy_id": 144,
    "name": "Fashion Glasses",
    "slug": "fashion-glasses",
    "parent_id": 132,
    "product_count": 2,
    "thumbnail_id": 0
  },
  {
    "id": 142,
    "taxonomy_id": 142,
    "name": "Men's Sunglasses",
    "slug": "mens-sunglasses",
    "parent_id": 132,
    "product_count": 1,
    "thumbnail_id": 0
  },
  {
    "id": 162,
    "taxonomy_id": 162,
    "name": "featured",
    "slug": "featured",
    "parent_id": 132,
    "product_count": 17,
    "thumbnail_id": 0
  },
  {
    "id": 143,
    "taxonomy_id": 143,
    "name": "women's Sunglasses",
    "slug": "womens-sunglasses",
    "parent_id": 132,
    "product_count": 0,
    "thumbnail_id": 0
  },
  {
    "id": 139,
    "taxonomy_id": 139,
    "name": "Kid's Eye Glasses",
    "slug": "kids-eye-glasses",
    "parent_id": 133,
    "product_count": 3,
    "thumbnail_id": 0
  },
  {
    "id": 137,
    "taxonomy_id": 137,
    "name": "Men's Eye Glasses",
    "slug": "mens-eye-glasses",
    "parent_id": 133,
    "product_count": 10,
    "thumbnail_id": 0
  },
  {
    "id": 141,
    "taxonomy_id": 141,
    "name": "Reading Eye Glasses",
    "slug": "reading-eye-glasses",
    "parent_id": 133,
    "product_count": 1,
    "thumbnail_id": 0
  },
  {
    "id": 140,
    "taxonomy_id": 140,
    "name": "Trending Eye Glasses",
    "slug": "trending-eye-glasses",
    "parent_id": 133,
    "product_count": 7,
    "thumbnail_id": 0
  },
  {
    "id": 138,
    "taxonomy_id": 138,
    "name": "Women's Eye Glasses",
    "slug": "womens-eye-glasses",
    "parent_id": 133,
    "product_count": 5,
    "thumbnail_id": 0
  }
];

export const OPTICAL_CONFIG = {
  "engine_name": "Rida Optical Custom Lens Selector",
  "version": "1.0",
  "currency": "PKR",
  "important_notice": {
    "title": "Important Note:",
    "message": "If your prescription has a high cylinder (above \u00b12.00) or requires bifocal/progressive lenses, please contact us via WhatsApp for a customized quote. For single vision glasses, simply follow the steps below."
  },
  "step_1_usage_types": [
    {
      "id": "single-vision",
      "name": "Single Vision",
      "slug": "single-vision",
      "description": "Standard single vision distance or reading lenses",
      "price_modifier_pkr": 0.0,
      "is_default": true
    },
    {
      "id": "bifocal-round",
      "name": "Bifocal Round Segment",
      "slug": "bifocal-round-segment",
      "description": "Dual focus distance and reading with round segment",
      "price_modifier_pkr": 0.0,
      "is_default": false
    },
    {
      "id": "bifocal-d",
      "name": "Bifocal D Segment",
      "slug": "bifocal-d-segment",
      "description": "Dual focus distance and reading with flat-top D segment",
      "price_modifier_pkr": 0.0,
      "is_default": false
    },
    {
      "id": "progressive",
      "name": "Progressive",
      "slug": "progressive",
      "description": "Seamless multifocal lenses without visible lines",
      "price_modifier_pkr": 0.0,
      "is_default": false
    }
  ],
  "step_2_lens_coatings": [
    {
      "id": "clear-standard",
      "name": "Clear Standard",
      "slug": "clear-standard",
      "category": "clear",
      "price_pkr": 1300.0,
      "description": "Standard anti-reflective clear lens with basic scratch protection"
    },
    {
      "id": "clear-premium",
      "name": "Clear Premium",
      "slug": "clear-premium",
      "category": "clear",
      "price_pkr": 1800.0,
      "description": "High-index ultra-thin clear lens with superior clarity"
    },
    {
      "id": "screen-standard",
      "name": "Screen Standard (Blue-Cut)",
      "slug": "screen-standerd",
      "category": "blue_cut",
      "price_pkr": 1700.0,
      "description": "Digital protection blue-cut coating for screens and computers"
    },
    {
      "id": "screen-premium",
      "name": "Screen Premium (Blue-Cut)",
      "slug": "screen-premium",
      "category": "blue_cut",
      "price_pkr": 2600.0,
      "description": "Advanced anti-glare blue-light filter with hydrophobic smudge resistance"
    },
    {
      "id": "transition-standard",
      "name": "Transition Standard",
      "slug": "transition-standerd",
      "category": "photochromic",
      "price_pkr": 2300.0,
      "description": "Photochromic lenses that darken outdoors in sunlight and clear indoors"
    },
    {
      "id": "transition-premium",
      "name": "Transition Premium",
      "slug": "transition-premium",
      "category": "photochromic",
      "price_pkr": 3450.0,
      "description": "Rapid-reaction active photochromic lenses with fast fade back"
    },
    {
      "id": "transition-screen-std",
      "name": "Transition Screen Standard",
      "slug": "transition-screen-standard",
      "category": "hybrid",
      "price_pkr": 2350.0,
      "description": "Dual protection: blue-light digital filter plus photochromic sun protection"
    },
    {
      "id": "transition-screen-prem",
      "name": "Transition Screen Premium",
      "slug": "transition-screen-premium",
      "category": "hybrid",
      "price_pkr": 3150.0,
      "description": "Premium dual protection: high-index blue blocker with fast transition response"
    },
    {
      "id": "drive-clear",
      "name": "Drive Clear",
      "slug": "drive-clear",
      "category": "driving",
      "price_pkr": 3000.0,
      "description": "Specialized night and daylight driving anti-reflection coating"
    },
    {
      "id": "drive-digital",
      "name": "Drive Digital",
      "slug": "drive-digital",
      "category": "driving",
      "price_pkr": 3500.0,
      "description": "Digital driver optimization coating reducing headlight glare and eyestrain"
    },
    {
      "id": "drive-transition",
      "name": "Drive Transition",
      "slug": "drive-transition",
      "category": "driving",
      "price_pkr": 3500.0,
      "description": "Contrast-enhancing driver lenses that activate behind vehicle windshields"
    },
    {
      "id": "tinted-standard",
      "name": "Tinted Standard",
      "slug": "tinted-standerd",
      "category": "tinted",
      "price_pkr": 1600.0,
      "description": "Solid UV400 protective sunglasses tint"
    },
    {
      "id": "tinted-premium",
      "name": "Tinted Premium",
      "slug": "tinted-premium",
      "category": "tinted",
      "price_pkr": 2300.0,
      "description": "Polarized UV400 premium sunglasses tint eliminating water/road glare"
    },
    {
      "id": "unbreakable-tinted",
      "name": "Unbreakable Tinted",
      "slug": "unbreakable-tinted",
      "category": "polycarbonate",
      "price_pkr": 2000.0,
      "description": "High-impact polycarbonate tinted lenses ideal for sports and rimless frames"
    },
    {
      "id": "unbreakable-transition",
      "name": "Unbreakable Transition",
      "slug": "unbreakable-transition",
      "category": "polycarbonate",
      "price_pkr": 3450.0,
      "description": "High-impact polycarbonate photochromic lenses with shatterproof durability"
    }
  ],
  "step_3_prescription_inputs": {
    "text_input": {
      "label": "Enter Your Prescription Here",
      "placeholder": "e.g. SPH: OD -2.00, OS -1.75 | CYL: -0.50 | AXIS: 90",
      "required": false
    },
    "file_upload": {
      "label": "Upload a prescription:",
      "accepted_formats": [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".pdf"
      ],
      "max_size_mb": 15,
      "required": false
    },
    "additional_comments": {
      "label": "Additional Comments",
      "placeholder": "Any special requirements, pupillary distance (PD) measurements, or instructions",
      "required": false
    }
  }
};

export const LENS_USAGE_OPTIONS: LensUsageOption[] = OPTICAL_CONFIG.step_1_usage_types.map((u: any) => ({
  id: u.id,
  label: u.name,
  price_pkr: u.price_modifier_pkr,
  description: u.description,
}));

export const LENS_COATING_OPTIONS: LensCoatingOption[] = OPTICAL_CONFIG.step_2_lens_coatings.map((c: any) => ({
  id: c.id,
  label: c.name,
  category: c.category,
  tier: c.name.toLowerCase().includes("premium") ? "premium" : c.name.toLowerCase().includes("digital") ? "digital" : "standard",
  price_pkr: c.price_pkr,
  description: c.description,
}));

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  // Show popular optical frames first
  return PRODUCTS.slice(0, limit);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (!categorySlug || categorySlug === "all" || categorySlug === "store") {
    return PRODUCTS;
  }
  return PRODUCTS.filter((p) => {
    if (p.primary_category?.slug === categorySlug) return true;
    return p.all_categories?.some((c) => c.slug === categorySlug);
  });
}

export function getRelatedProducts(productId: number, categorySlug?: string, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.id !== productId && (!categorySlug || p.primary_category?.slug === categorySlug))
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.variations.some((v) => v.color.name.toLowerCase().includes(q))
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getPrimaryNavCategories(): Category[] {
  return CATEGORIES.filter((c) => !c.parent_id && (c.product_count ?? 0) > 0 || [133, 132, 131, 167, 176, 177].includes(c.id));
}
