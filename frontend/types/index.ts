export interface ProductImage {
  id: number;
  title: string;
  relative_path: string;
  url: string;
  alt_text: string;
  file_exists_on_disk?: boolean;
}

export interface VariationColor {
  term_id: number | null;
  name: string;
  slug: string;
  hex_code: string | null;
}

export interface ProductVariation {
  variation_id: number;
  title: string;
  slug: string;
  sku: string;
  color: VariationColor;
  size: string;
  price_pkr: number;
  regular_price_pkr: number | null;
  sale_price_pkr: number | null;
  stock_status: string;
  image: ProductImage;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  count?: number;
  product_count?: number;
  taxonomy_id?: number;
  thumbnail_id?: number;
  description?: string;
  image?: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  sku: string;
  base_price_pkr: number;
  regular_price_pkr: number | null;
  sale_price_pkr: number | null;
  stock_status: string;
  is_featured: boolean;
  total_sales: number;
  short_description: string;
  description: string;
  primary_category: {
    id: number;
    name: string;
    slug: string;
  };
  all_categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  has_prescription_support: boolean;
  primary_image: ProductImage;
  gallery_images: ProductImage[];
  variations_count: number;
  variations: ProductVariation[];
  seo?: {
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
  };
}

export interface LensUsageOption {
  id: string;
  label: string;
  price_pkr: number;
  description?: string;
}

export interface LensCoatingOption {
  id: string;
  label: string;
  category: "clear" | "screen" | "transition" | "drive" | "tinted" | "unbreakable";
  tier: "standard" | "premium" | "digital";
  price_pkr: number;
  description?: string;
}

export interface PrescriptionDetails {
  leftEye?: {
    sph?: string;
    cyl?: string;
    axis?: string;
  };
  rightEye?: {
    sph?: string;
    cyl?: string;
    axis?: string;
  };
  prescriptionText?: string;
  prescriptionFileName?: string;
}

export interface OpticalSelection {
  type: "frame_only" | "prescription";
  usage?: LensUsageOption;
  coating?: LensCoatingOption;
  prescriptionDetails?: PrescriptionDetails;
  totalOpticalSurcharge: number;
}

export interface CartItem {
  id: string; // unique item id: productId-variationId-timestamp
  product: Product;
  selectedVariation?: ProductVariation;
  opticalSelection?: OpticalSelection;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  address: string;
  city: string;
  postalCode?: string;
  orderNotes?: string;
  paymentMethod: "cod" | "whatsapp";
}
