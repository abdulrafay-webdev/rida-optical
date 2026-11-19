/**
 * Rida Optical - Frontend API Client
 * Provides typed endpoints for Orders, Promotions, Catalog, and Admin Management.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ApiCouponValidationResponse {
  valid: boolean;
  code: string;
  discount_percent: number;
  discount_amount_pkr: number;
  new_subtotal_pkr: number;
  message: string;
}

export interface ApiOrderCustomerPayload {
  full_name: string;
  phone: string;
  alternate_phone?: string;
  email?: string;
  address: string;
  city: string;
  postal_code?: string;
  order_notes?: string;
}

export interface ApiOrderItemPayload {
  product_id: number;
  variation_id?: number;
  quantity: number;
  optical_selection?: {
    type: "frame_only" | "prescription";
    usage_id?: string;
    coating_id?: string;
    prescription?: {
      prescription_text?: string;
      prescription_file_url?: string;
      pd_measurement?: string;
      sph_od?: string;
      cyl_od?: string;
      axis_od?: string;
      sph_os?: string;
      cyl_os?: string;
      axis_os?: string;
    };
  };
}

export interface ApiOrderCreatePayload {
  customer: ApiOrderCustomerPayload;
  items: ApiOrderItemPayload[];
  payment_method: "cod" | "whatsapp";
  coupon_code?: string;
}

export interface ApiOrderResponse {
  order_id: string;
  created_at: string;
  status: string;
  payment_method: string;
  customer: ApiOrderCustomerPayload;
  items: Array<{
    product_id: number;
    product_title: string;
    variation_id?: number;
    variation_title?: string;
    unit_frame_price: number;
    optical_surcharge: number;
    unit_total_price: number;
    quantity: number;
    line_total: number;
    optical_details?: any;
  }>;
  subtotal_pkr: number;
  shipping_fee_pkr: number;
  discount_pkr: number;
  total_amount_pkr: number;
  whatsapp_url: string;
  tracking_note: string;
}

export interface ApiAdminStats {
  total_orders: number;
  pending_orders: number;
  dispatched_orders: number;
  completed_orders: number;
  total_revenue_pkr: number;
  currency: string;
}

export interface ApiAdminOrderSummary {
  id: number;
  order_number: string;
  created_at: string;
  status: string;
  payment_method: string;
  total_amount_pkr: number;
  shipping_city: string;
  customer_name: string;
  customer_phone: string;
  items_count: number;
  tracking_number?: string;
  courier_name?: string;
  whatsapp_url: string;
}

export interface ApiAdminOrdersResponse {
  items: ApiAdminOrderSummary[];
  total: number;
  page: number;
  page_size: number;
}

export interface ApiAdminOrderDetail {
  id: number;
  order_number: string;
  created_at: string;
  status: string;
  payment_method: string;
  payment_status: string;
  subtotal_pkr: number;
  shipping_fee_pkr: number;
  discount_pkr: number;
  total_amount_pkr: number;
  shipping_address: string;
  shipping_city: string;
  order_notes?: string;
  tracking_number?: string;
  courier_name?: string;
  customer: {
    full_name: string;
    phone: string;
    alternate_phone?: string;
    email?: string;
    address: string;
    city: string;
  };
  items: Array<{
    id: number;
    product_id: number;
    product_title: string;
    variation_title?: string;
    unit_frame_price: number;
    quantity: number;
    line_total: number;
    has_prescription: boolean;
    optical_surcharge: number;
    prescription_text?: string;
    prescription_file_url?: string;
  }>;
  whatsapp_url: string;
}

/**
 * Validate a discount coupon code with current subtotal.
 */
export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<ApiCouponValidationResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, subtotal }),
  });
  if (!res.ok) {
    throw new Error(`Coupon validation failed with status ${res.status}`);
  }
  return res.json();
}

/**
 * Submit an order to the backend API & Neon PostgreSQL database.
 */
export async function createOrder(
  payload: ApiOrderCreatePayload
): Promise<ApiOrderResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Order placement failed: ${errorText || res.statusText}`);
  }
  return res.json();
}

/**
 * Admin Login
 */
export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Login failed" }));
    throw new Error(err.detail || "Authentication error");
  }
  return res.json();
}

/**
 * Fetch Admin Dashboard Stats
 */
export async function getAdminStats(token: string): Promise<ApiAdminStats> {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to load admin stats: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetch Admin Orders List
 */
export async function getAdminOrders(
  token: string,
  params: { status?: string; q?: string; page?: number; page_size?: number } = {}
): Promise<ApiAdminOrdersResponse> {
  const query = new URLSearchParams();
  if (params.status && params.status !== "all") query.set("status", params.status);
  if (params.q) query.set("q", params.q);
  if (params.page) query.set("page", params.page.toString());
  if (params.page_size) query.set("page_size", params.page_size.toString());

  const res = await fetch(
    `${API_BASE_URL}/api/v1/admin/orders?${query.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to load admin orders: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetch full order detail for admin inspection
 */
export async function getAdminOrderDetail(
  token: string,
  orderId: string | number
): Promise<ApiAdminOrderDetail> {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to load order: ${res.status}`);
  }
  return res.json();
}

/**
 * Update order dispatch/delivery status and courier tracking info
 */
export async function updateOrderStatus(
  token: string,
  orderId: string | number,
  payload: {
    status: string;
    courier_name?: string;
    tracking_number?: string;
    order_notes?: string;
  }
) {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/admin/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Update failed" }));
    throw new Error(err.detail || "Failed to update order status");
  }
  return res.json();
}

export interface ApiAdminProductListItem {
  id: number;
  title: string;
  slug: string;
  sku: string;
  base_price_pkr: number;
  sale_price_pkr?: number;
  stock_status: string;
  is_featured: boolean;
  primary_category: string;
  image_url: string;
  variations_count: number;
  has_prescription_support: boolean;
}

export interface ApiAdminProductCreatePayload {
  title: string;
  slug?: string;
  sku?: string;
  base_price_pkr: number;
  regular_price_pkr?: number;
  sale_price_pkr?: number;
  category_id?: number;
  category_slug?: string;
  stock_status?: string;
  is_featured?: boolean;
  has_prescription_support?: boolean;
  short_description?: string;
  description?: string;
  primary_image_url?: string;
  variations?: Array<{
    color_name: string;
    color_hex?: string;
    price_pkr?: number;
    image_url?: string;
  }>;
}

/**
 * Admin: List Products for Catalog Management
 */
export async function getAdminProducts(
  token: string,
  params: { q?: string; category?: string } = {}
): Promise<{ total: number; items: ApiAdminProductListItem[] }> {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.category && params.category !== "all") query.set("category", params.category);

  const res = await fetch(`${API_BASE_URL}/api/v1/admin/products?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to load products: ${res.status}`);
  }
  return res.json();
}

/**
 * Admin: Create a New Optical Product
 */
export async function createAdminProduct(
  token: string,
  payload: ApiAdminProductCreatePayload
) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to create product" }));
    throw new Error(err.detail || "Product creation failed");
  }
  return res.json();
}

/**
 * Admin: Delete a Product from Catalog
 */
export async function deleteAdminProduct(token: string, productId: number) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/products/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to delete product" }));
    throw new Error(err.detail || "Product deletion failed");
  }
  return res.json();
}

/**
 * Admin: Get Single Product Details for Editing
 */
export async function getAdminProduct(token: string, productId: number) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to load product details: ${res.status}`);
  }
  return res.json();
}

/**
 * Admin: Update an Existing Product
 */
export async function updateAdminProduct(
  token: string,
  productId: number,
  payload: Partial<ApiAdminProductCreatePayload>
) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to update product" }));
    throw new Error(err.detail || "Product update failed");
  }
  return res.json();
}

export interface ApiCategoryItem {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  product_count: number;
  description?: string | null;
}

/**
 * Public/Admin: Get All Categories
 */
export async function getCategories(parentOnly: boolean = false): Promise<ApiCategoryItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/categories?parent_only=${parentOnly}`);
  if (!res.ok) {
    throw new Error(`Failed to load categories: ${res.status}`);
  }
  return res.json();
}

/**
 * Admin: Create New Product Category
 */
export async function createCategory(
  token: string,
  payload: { name: string; slug?: string; parent_id?: number | null; description?: string }
): Promise<ApiCategoryItem> {
  const res = await fetch(`${API_BASE_URL}/api/v1/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to create category" }));
    throw new Error(err.detail || "Category creation failed");
  }
  return res.json();
}

/**
 * Admin: Delete Category
 */
export async function deleteCategory(token: string, categoryId: number) {
  const res = await fetch(`${API_BASE_URL}/api/v1/categories/${categoryId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to delete category" }));
    throw new Error(err.detail || "Category deletion failed");
  }
  return res.json();
}
