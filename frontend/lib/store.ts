"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product, ProductVariation, OpticalSelection } from "@/types";
import { FLAT_SHIPPING_PKR } from "@/lib/utils";

export interface AppliedCoupon {
  code: string;
  discountPercent: number;
  discountAmount: number;
}

interface CartStore {
  items: CartItem[];
  appliedCoupon: AppliedCoupon | null;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (params: {
    product: Product;
    selectedVariation?: ProductVariation;
    opticalSelection?: OpticalSelection;
    quantity?: number;
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  applyCoupon: (coupon: AppliedCoupon | null) => void;
  removeCoupon: () => void;

  getSubtotal: () => number;
  getItemCount: () => number;
  getDiscount: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: ({
        product,
        selectedVariation,
        opticalSelection,
        quantity = 1,
      }) => {
        const framePrice = selectedVariation?.price_pkr ?? product.base_price_pkr;
        const opticalSurcharge = opticalSelection?.totalOpticalSurcharge ?? 0;
        const unitPrice = framePrice + opticalSurcharge;

        // Generate consistent signature for matching identical items
        const variationKey = selectedVariation?.variation_id ?? "base";
        const opticalKey = opticalSelection
          ? `${opticalSelection.type}-${opticalSelection.usage?.id ?? "none"}-${opticalSelection.coating?.id ?? "none"}`
          : "none";
        const itemKey = `${product.id}-${variationKey}-${opticalKey}`;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemKey);

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            const existing = updatedItems[existingIndex];
            const newQty = existing.quantity + quantity;
            updatedItems[existingIndex] = {
              ...existing,
              quantity: newQty,
              totalPrice: unitPrice * newQty,
            };
            return { items: updatedItems, isCartOpen: true };
          } else {
            const newItem: CartItem = {
              id: itemKey,
              product,
              selectedVariation,
              opticalSelection,
              quantity,
              unitPrice,
              totalPrice: unitPrice * quantity,
            };
            return { items: [...state.items, newItem], isCartOpen: true };
          }
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  quantity,
                  totalPrice: item.unitPrice * quantity,
                };
              }
              return item;
            }),
          };
        }),

      clearCart: () => set({ items: [], appliedCoupon: null }),

      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getDiscount: () => {
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        const subtotal = get().getSubtotal();
        return Math.round((subtotal * coupon.discountPercent) / 100);
      },

      getShippingFee: () => {
        return get().items.length > 0 ? FLAT_SHIPPING_PKR : 0;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount) + shipping;
      },
    }),
    {
      name: "rida_optical_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
      }),
    }
  )
);
