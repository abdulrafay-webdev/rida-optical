import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPricePKR(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString("en-PK")}`;
}

export const STORE_PHONE = "+923212318001";
export const STORE_PHONE_DISPLAY = "+92 321 2318001";
export const FLAT_SHIPPING_PKR = 349;
export const STORE_ADDRESS =
  "Shop No. 2, Fatima Shopping Mall, Main Kasba Colony Bus Stop, Karachi, Sindh (74700)";

export function generateWhatsAppOrderMessage(params: {
  orderId?: string;
  items: Array<{
    title: string;
    variation?: string;
    opticalType?: string;
    coating?: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  customer?: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
  };
}): string {
  let text = `*New Order Request - Rida Optical*\n`;
  if (params.orderId) {
    text += `*Order ID:* ${params.orderId}\n`;
  }
  text += `----------------------------------------\n`;
  params.items.forEach((item, idx) => {
    text += `${idx + 1}. *${item.title}*\n`;
    if (item.variation) text += `   • Color/Option: ${item.variation}\n`;
    if (item.opticalType) text += `   • Lens Usage: ${item.opticalType}\n`;
    if (item.coating) text += `   • Lens Coating: ${item.coating}\n`;
    text += `   • Qty: ${item.quantity} × ${formatPricePKR(item.price)}\n\n`;
  });
  text += `----------------------------------------\n`;
  text += `*Subtotal:* ${formatPricePKR(params.subtotal)}\n`;
  text += `*Delivery Fee:* ${formatPricePKR(params.shipping)}\n`;
  text += `*Total Amount:* ${formatPricePKR(params.total)}\n`;
  text += `*Payment:* Cash on Delivery (COD)\n`;

  if (params.customer) {
    text += `----------------------------------------\n`;
    text += `*Customer Details:*\n`;
    text += `Name: ${params.customer.fullName}\n`;
    text += `Phone: ${params.customer.phone}\n`;
    text += `Address: ${params.customer.address}, ${params.customer.city}\n`;
  }

  return `https://wa.me/923212318001?text=${encodeURIComponent(text)}`;
}
