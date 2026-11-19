"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAdminStats,
  getAdminOrders,
  getAdminOrderDetail,
  updateOrderStatus,
  getAdminProducts,
  createAdminProduct,
  deleteAdminProduct,
  ApiAdminStats,
  ApiAdminOrderSummary,
  ApiAdminOrderDetail,
  ApiAdminProductListItem,
  ApiAdminProductCreatePayload,
} from "@/lib/api";
import { formatPricePKR } from "@/lib/utils";
import {
  ShieldCheck,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  LogOut,
  ExternalLink,
  MessageCircle,
  Eye,
  Edit3,
  X,
  AlertCircle,
  Plus,
  Glasses,
  Tag,
  Trash2,
  Sparkles,
  Layers,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);

  // Active Tab: "orders" or "products"
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");

  // Orders State
  const [stats, setStats] = useState<ApiAdminStats | null>(null);
  const [orders, setOrders] = useState<ApiAdminOrderSummary[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Products State
  const [products, setProducts] = useState<ApiAdminProductListItem[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");

  // Modal: Order Detail
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<ApiAdminOrderDetail | null>(null);

  // Modal: Update Status
  const [statusModalOrder, setStatusModalOrder] = useState<ApiAdminOrderSummary | null>(null);
  const [newStatus, setNewStatus] = useState("processing");
  const [courierName, setCourierName] = useState("TCS Express");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Modal: Add Product
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productForm, setProductForm] = useState<{
    title: string;
    category_slug: string;
    base_price_pkr: number;
    sale_price_pkr?: number;
    sku?: string;
    stock_status: string;
    is_featured: boolean;
    has_prescription_support: boolean;
    primary_image_url: string;
    description: string;
    short_description: string;
    variations: Array<{ color_name: string; color_hex: string; price_pkr?: number }>;
  }>({
    title: "",
    category_slug: "eye-glasses",
    base_price_pkr: 2500,
    sale_price_pkr: undefined,
    sku: "",
    stock_status: "instock",
    is_featured: false,
    has_prescription_support: true,
    primary_image_url: "https://ik.imagekit.io/ridaoptical/tr:w-600/default-frame.jpg",
    description: "",
    short_description: "",
    variations: [
      { color_name: "Classic Black", color_hex: "#000000", price_pkr: 2500 },
      { color_name: "Gold & Tortoise", color_hex: "#D4AF37", price_pkr: 2500 },
    ],
  });
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [productMessage, setProductMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Authentication check
  useEffect(() => {
    const savedToken = localStorage.getItem("rida_admin_token");
    if (!savedToken) {
      router.push("/admin/login");
      return;
    }
    setToken(savedToken);
    const user = localStorage.getItem("rida_admin_user");
    if (user) {
      try {
        setAdminUser(JSON.parse(user));
      } catch {}
    }
  }, [router]);

  // Load Orders & Stats
  const loadOrdersData = async (activeToken: string) => {
    setLoadingOrders(true);
    try {
      const [statsData, ordersData] = await Promise.all([
        getAdminStats(activeToken).catch(() => null),
        getAdminOrders(activeToken, {
          status: statusFilter !== "all" ? statusFilter : undefined,
          q: searchQuery.trim() || undefined,
        }),
      ]);

      if (statsData) setStats(statsData);
      setOrders(ordersData.items || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Load Products
  const loadProductsData = async (activeToken: string) => {
    setLoadingProducts(true);
    try {
      const data = await getAdminProducts(activeToken, {
        q: productSearchQuery.trim() || undefined,
        category: productCategoryFilter !== "all" ? productCategoryFilter : undefined,
      });
      setProducts(data.items || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (token) {
      if (activeTab === "orders") {
        loadOrdersData(token);
      } else {
        loadProductsData(token);
      }
    }
  }, [token, activeTab, statusFilter, productCategoryFilter]);

  const handleLogout = () => {
    localStorage.removeItem("rida_admin_token");
    localStorage.removeItem("rida_admin_user");
    router.push("/admin/login");
  };

  // Order Detail
  const handleViewDetail = async (orderId: string | number) => {
    if (!token) return;
    try {
      const detail = await getAdminOrderDetail(token, orderId);
      setSelectedOrderDetail(detail);
    } catch (err: any) {
      alert("Failed to load order details: " + err.message);
    }
  };

  // Order Status Update
  const handleOpenStatusModal = (order: ApiAdminOrderSummary) => {
    setStatusModalOrder(order);
    setNewStatus(order.status || "processing");
    setCourierName(order.courier_name || "TCS Express");
    setTrackingNumber(order.tracking_number || "");
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !statusModalOrder) return;
    setUpdatingStatus(true);
    try {
      await updateOrderStatus(token, statusModalOrder.order_number, {
        status: newStatus,
        courier_name: courierName,
        tracking_number: trackingNumber,
      });
      setStatusModalOrder(null);
      await loadOrdersData(token);
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Product Addition
  const handleAddVariation = () => {
    setProductForm({
      ...productForm,
      variations: [
        ...productForm.variations,
        { color_name: "Silver Metallic", color_hex: "#C0C0C0", price_pkr: productForm.base_price_pkr },
      ],
    });
  };

  const handleRemoveVariation = (idx: number) => {
    setProductForm({
      ...productForm,
      variations: productForm.variations.filter((_, i) => i !== idx),
    });
  };

  const handleVariationChange = (idx: number, field: string, value: any) => {
    const updated = [...productForm.variations];
    updated[idx] = { ...updated[idx], [field]: value };
    setProductForm({ ...productForm, variations: updated });
  };

  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!productForm.title.trim()) {
      alert("Product title is required.");
      return;
    }

    setCreatingProduct(true);
    setProductMessage(null);

    const payload: ApiAdminProductCreatePayload = {
      title: productForm.title.trim(),
      category_slug: productForm.category_slug,
      base_price_pkr: Number(productForm.base_price_pkr),
      sale_price_pkr: productForm.sale_price_pkr ? Number(productForm.sale_price_pkr) : undefined,
      sku: productForm.sku?.trim() || undefined,
      stock_status: productForm.stock_status,
      is_featured: productForm.is_featured,
      has_prescription_support: productForm.has_prescription_support,
      primary_image_url: productForm.primary_image_url.trim(),
      description: productForm.description.trim(),
      short_description: productForm.short_description.trim(),
      variations: productForm.variations.map((v) => ({
        color_name: v.color_name,
        color_hex: v.color_hex,
        price_pkr: v.price_pkr ? Number(v.price_pkr) : Number(productForm.base_price_pkr),
      })),
    };

    try {
      const res = await createAdminProduct(token, payload);
      setProductMessage({ text: res.message || "Product created successfully!", isError: false });
      setTimeout(() => {
        setIsAddProductOpen(false);
        setProductMessage(null);
        // Reset form
        setProductForm({
          title: "",
          category_slug: "eye-glasses",
          base_price_pkr: 2500,
          sale_price_pkr: undefined,
          sku: "",
          stock_status: "instock",
          is_featured: false,
          has_prescription_support: true,
          primary_image_url: "https://ik.imagekit.io/ridaoptical/tr:w-600/default-frame.jpg",
          description: "",
          short_description: "",
          variations: [
            { color_name: "Classic Black", color_hex: "#000000", price_pkr: 2500 },
          ],
        });
        loadProductsData(token);
      }, 1200);
    } catch (err: any) {
      setProductMessage({ text: err.message || "Failed to create product.", isError: true });
    } finally {
      setCreatingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId: number, title: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to permanently delete '${title}'?`)) return;

    try {
      await deleteAdminProduct(token, productId);
      loadProductsData(token);
    } catch (err: any) {
      alert("Failed to delete product: " + err.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "dispatched":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xs text-gray-500 font-bold animate-pulse">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-primary/20 text-brand-primary border border-brand-primary/40 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-wide uppercase">
                  Rida Optical
                </h1>
                <span className="text-[10px] text-slate-400 block -mt-0.5">
                  Admin Control Center
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center gap-2 ml-6 bg-slate-800/80 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === "orders"
                    ? "bg-brand-primary text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Orders Management</span>
                <span className="ml-1 px-1.5 py-0.2 bg-slate-900/60 rounded text-[10px]">
                  {stats?.total_orders ?? orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("products")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === "products"
                    ? "bg-brand-primary text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Glasses className="w-3.5 h-3.5" />
                <span>Products Catalog</span>
                <span className="ml-1 px-1.5 py-0.2 bg-slate-900/60 rounded text-[10px]">
                  {products.length || 17}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-300 hidden lg:inline">
              {adminUser?.email || "ridaoptical@gmail.com"}
            </span>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navbar */}
        <div className="md:hidden flex border-t border-slate-800 px-4 py-2 gap-2 bg-slate-950">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg ${
              activeTab === "orders" ? "bg-brand-primary text-white" : "text-slate-400"
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg ${
              activeTab === "products" ? "bg-brand-primary text-white" : "text-slate-400"
            }`}
          >
            Products ({products.length || 17})
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* =================================================================== */}
        {/* TAB 1: ORDERS MANAGEMENT                                            */}
        {/* =================================================================== */}
        {activeTab === "orders" && (
          <>
            {/* KPI Stats Grid */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <Package className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {stats?.total_orders ?? orders.length}
                </div>
                <p className="text-[11px] text-slate-400">All-time lifetime orders</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-amber-600">
                  <span className="text-xs font-bold uppercase tracking-wider">Pending COD</span>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {stats?.pending_orders ?? orders.filter((o) => o.status === "pending").length}
                </div>
                <p className="text-[11px] text-slate-400">Awaiting optician dispatch</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-purple-600">
                  <span className="text-xs font-bold uppercase tracking-wider">Dispatched</span>
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {stats?.dispatched_orders ?? orders.filter((o) => o.status === "dispatched").length}
                </div>
                <p className="text-[11px] text-slate-400">In courier transit (TCS / Leopards)</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-emerald-600">
                  <span className="text-xs font-bold uppercase tracking-wider">Revenue</span>
                  <span className="text-[11px] font-black uppercase">PKR</span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {stats?.total_revenue_pkr ? formatPricePKR(stats.total_revenue_pkr) : "Rs. 0"}
                </div>
                <p className="text-[11px] text-slate-400">Gross order sales volume</p>
              </div>
            </section>

            {/* Orders Table Container */}
            <section className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {["all", "pending", "processing", "dispatched", "completed", "cancelled"].map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 ${
                          statusFilter === st
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>

                {/* Search Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (token) loadOrdersData(token);
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search order #, customer, city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary w-56 sm:w-64"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => token && loadOrdersData(token)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingOrders ? "animate-spin" : ""}`} />
                  </button>
                </form>
              </div>

              {loadingOrders ? (
                <div className="py-20 text-center space-y-2">
                  <RefreshCw className="w-6 h-6 text-brand-primary animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 font-semibold">
                    Loading orders from Neon PostgreSQL...
                  </p>
                </div>
              ) : orders.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <Package className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-700">No Orders Found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    No orders match your filter criteria.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Order #</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">City</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Courier / Tracking</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {o.order_number}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{o.customer_name}</div>
                            <div className="text-[11px] text-slate-400">{o.customer_phone}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 font-medium">
                            {o.shipping_city}
                          </td>
                          <td className="py-3 px-4 text-slate-600 font-semibold">
                            {o.items_count} {o.items_count === 1 ? "item" : "items"}
                          </td>
                          <td className="py-3 px-4 font-black text-brand-primary">
                            {formatPricePKR(o.total_amount_pkr)}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                                o.status
                              )}`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[11px] text-slate-500">
                            {o.tracking_number ? (
                              <div>
                                <span className="font-semibold text-slate-800">
                                  {o.courier_name || "Courier"}:
                                </span>{" "}
                                <span className="font-mono">{o.tracking_number}</span>
                              </div>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {o.whatsapp_url && (
                                <a
                                  href={o.whatsapp_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="Chat on WhatsApp"
                                  className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => handleViewDetail(o.order_number)}
                                title="View Details"
                                className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleOpenStatusModal(o)}
                                title="Update Status & Tracking"
                                className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {/* =================================================================== */}
        {/* TAB 2: PRODUCTS CATALOG & EASY PRODUCT ADDITION                     */}
        {/* =================================================================== */}
        {activeTab === "products" && (
          <section className="space-y-6">
            {/* Top Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Glasses className="w-5 h-5 text-brand-primary" />
                  <span>Eyewear Catalog Management</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Easily add new optical frames, update prices, manage stock, and color variations.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Category:
                </span>
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="text-xs p-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-brand-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="eye-glasses">Eye Glasses</option>
                  <option value="sunglasses">Sunglasses</option>
                  <option value="reading-glasses">Reading Glasses</option>
                  <option value="computer-glasses">Computer Glasses</option>
                  <option value="contatc-lenses">Contact Lenses</option>
                </select>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (token) loadProductsData(token);
                }}
                className="flex items-center gap-2"
              >
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search title, SKU, or category..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary w-56 sm:w-64"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => token && loadProductsData(token)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingProducts ? "animate-spin" : ""}`} />
                </button>
              </form>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              {loadingProducts ? (
                <div className="py-20 text-center space-y-2">
                  <RefreshCw className="w-6 h-6 text-brand-primary animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 font-semibold">
                    Loading catalog from Neon PostgreSQL...
                  </p>
                </div>
              ) : products.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <Glasses className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-700">No Products Found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Click &quot;Add New Product&quot; to publish optical frames into your store catalog.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Frame</th>
                        <th className="py-3 px-4">Product Title</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price (PKR)</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Variations</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden relative shrink-0">
                              <img
                                src={p.image_url}
                                alt={p.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">{p.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              /product/{p.slug}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-600">
                            {p.sku}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                              {p.primary_category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-black text-brand-primary">
                            {formatPricePKR(p.base_price_pkr)}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                p.stock_status === "instock"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {p.stock_status === "instock" ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 font-semibold">
                            {p.variations_count} {p.variations_count === 1 ? "color" : "colors"}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/product/${p.slug}`}
                                target="_blank"
                                title="View in Storefront"
                                className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.title)}
                                title="Delete Product"
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* =================================================================== */}
      {/* MODAL: ADD NEW PRODUCT                                              */}
      {/* =================================================================== */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Glasses className="w-6 h-6 text-brand-primary" />
                  <span>Add New Optical Product</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Publish a new frame into Neon PostgreSQL & store catalog instantly.
                </p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {productMessage && (
              <div
                className={`p-4 rounded-xl text-xs font-bold ${
                  productMessage.isError
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {productMessage.text}
              </div>
            )}

            <form onSubmit={handleCreateProductSubmit} className="space-y-6">
              {/* Section 1: Basic Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                  1. Product Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Balenciaga Geometric Hexagon Eyeglasses"
                      value={productForm.title}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={productForm.category_slug}
                      onChange={(e) =>
                        setProductForm({ ...productForm, category_slug: e.target.value })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary font-semibold"
                    >
                      <option value="eye-glasses">Eye Glasses</option>
                      <option value="sunglasses">Sunglasses</option>
                      <option value="reading-glasses">Reading Glasses</option>
                      <option value="computer-glasses">Computer Glasses</option>
                      <option value="contatc-lenses">Contact Lenses</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      SKU Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Auto-generated if left empty"
                      value={productForm.sku}
                      onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Base Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={productForm.base_price_pkr}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          base_price_pkr: Number(e.target.value),
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Sale Price (PKR) (Optional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Leave empty if regular price"
                      value={productForm.sale_price_pkr ?? ""}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          sale_price_pkr: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.has_prescription_support}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          has_prescription_support: e.target.checked,
                        })
                      }
                      className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                    />
                    <span>Compatible with Prescription Lenses (Single / Bifocal / Progressive)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.is_featured}
                      onChange={(e) =>
                        setProductForm({ ...productForm, is_featured: e.target.checked })
                      }
                      className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                    />
                    <span>Feature on Store Homepage</span>
                  </label>
                </div>
              </div>

              {/* Section 2: Media & Image */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                  2. Primary Product Image (ImageKit CDN or URL)
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={productForm.primary_image_url}
                    onChange={(e) =>
                      setProductForm({ ...productForm, primary_image_url: e.target.value })
                    }
                    placeholder="https://ik.imagekit.io/ridaoptical/..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary font-mono"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm({
                          ...productForm,
                          primary_image_url:
                            "https://ik.imagekit.io/ridaoptical/tr:w-600/sample-glasses-1.jpg",
                        })
                      }
                      className="text-[10px] px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      Use Sample Glass 1
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm({
                          ...productForm,
                          primary_image_url:
                            "https://ik.imagekit.io/ridaoptical/tr:w-600/sample-glasses-2.jpg",
                        })
                      }
                      className="text-[10px] px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      Use Sample Glass 2
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Color Variations */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    3. Color Variations & Swatches
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddVariation}
                    className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Color</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {productForm.variations.map((v, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80"
                    >
                      <input
                        type="color"
                        value={v.color_hex}
                        onChange={(e) =>
                          handleVariationChange(idx, "color_hex", e.target.value)
                        }
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                      />
                      <input
                        type="text"
                        placeholder="Color Name (e.g. Matte Black)"
                        value={v.color_name}
                        onChange={(e) =>
                          handleVariationChange(idx, "color_name", e.target.value)
                        }
                        className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-primary"
                      />
                      <input
                        type="number"
                        placeholder="Price PKR"
                        value={v.price_pkr ?? productForm.base_price_pkr}
                        onChange={(e) =>
                          handleVariationChange(idx, "price_pkr", Number(e.target.value))
                        }
                        className="w-28 text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-primary"
                      />
                      {productForm.variations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveVariation(idx)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Descriptions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                  4. Description
                </h4>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Enter complete product specifications, frame material (acetate, TR90, titanium), fit, and styling details..."
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({ ...productForm, description: e.target.value })
                    }
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingProduct}
                  className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-hover shadow-md transition-all disabled:opacity-50"
                >
                  {creatingProduct ? "Publishing Product..." : "Publish Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: ORDER DETAIL                                                 */}
      {/* =================================================================== */}
      {selectedOrderDetail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Order Details — {selectedOrderDetail.order_number}
                </h3>
                <span className="text-xs text-slate-400">
                  Placed on {selectedOrderDetail.created_at}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderDetail(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Customer & Shipping Destination
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                <div>
                  <strong>Full Name:</strong> {selectedOrderDetail.customer.full_name}
                </div>
                <div>
                  <strong>Phone:</strong> {selectedOrderDetail.customer.phone}
                </div>
                <div>
                  <strong>City:</strong> {selectedOrderDetail.shipping_city}
                </div>
                <div>
                  <strong>Address:</strong> {selectedOrderDetail.shipping_address}
                </div>
                {selectedOrderDetail.order_notes && (
                  <div className="sm:col-span-2 text-amber-700 bg-amber-50 p-2 rounded-lg">
                    <strong>Customer Notes:</strong> {selectedOrderDetail.order_notes}
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Order Items & Optical Specifications
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden">
                {selectedOrderDetail.items.map((it) => (
                  <div key={it.id} className="p-3.5 flex justify-between items-start gap-4 text-xs">
                    <div>
                      <strong className="text-slate-900">{it.product_title}</strong>
                      {it.variation_title && (
                        <div className="text-[11px] text-slate-500">
                          Color: {it.variation_title} × {it.quantity}
                        </div>
                      )}
                      {it.has_prescription && (
                        <div className="mt-1 text-[11px] text-brand-primary font-semibold">
                          Prescription Lens Included (+{formatPricePKR(it.optical_surcharge)})
                          {it.prescription_text && (
                            <div className="text-slate-600 font-mono text-[10px] mt-0.5">
                              {it.prescription_text}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-slate-900 whitespace-nowrap">
                      {formatPricePKR(it.line_total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold">{formatPricePKR(selectedOrderDetail.subtotal_pkr)}</span>
              </div>
              {selectedOrderDetail.discount_pkr > 0 && (
                <div className="flex justify-between text-green-700 font-bold">
                  <span>Coupon Discount:</span>
                  <span>-{formatPricePKR(selectedOrderDetail.discount_pkr)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span className="font-bold">{formatPricePKR(selectedOrderDetail.shipping_fee_pkr)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount (COD):</span>
                <span className="text-brand-primary">
                  {formatPricePKR(selectedOrderDetail.total_amount_pkr)}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedOrderDetail(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: UPDATE STATUS                                                */}
      {/* =================================================================== */}
      {statusModalOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Update Order #{statusModalOrder.order_number}
              </h3>
              <button
                onClick={() => setStatusModalOrder(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary font-semibold"
                >
                  <option value="pending">Pending (Awaiting fulfillment)</option>
                  <option value="processing">Processing (Optician laboratory edging)</option>
                  <option value="dispatched">Dispatched (Handed to courier)</option>
                  <option value="completed">Completed (Delivered & COD Collected)</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Courier Name
                </label>
                <input
                  type="text"
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  placeholder="e.g. TCS Express, Leopards Courier, Trax"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Tracking / Consignment Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. TCS-7788991122"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-primary font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStatusModalOrder(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingStatus}
                  className="px-5 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-hover transition-colors disabled:opacity-50"
                >
                  {updatingStatus ? "Saving..." : "Save Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
