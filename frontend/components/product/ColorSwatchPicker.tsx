"use client";

import React from "react";
import { ProductVariation } from "@/types";
import { Check } from "lucide-react";

interface ColorSwatchPickerProps {
  variations: ProductVariation[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function ColorSwatchPicker({
  variations,
  selectedIndex,
  onSelect,
}: ColorSwatchPickerProps) {
  if (!variations || variations.length === 0) return null;

  const activeVariation = variations[selectedIndex];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
          <span>Frame Color:</span>
          <span className="text-brand-primary font-extrabold normal-case">
            {activeVariation?.color?.name || "Standard"}
          </span>
        </label>
        {activeVariation && (
          <span className="text-[11px] text-gray-500 font-mono">
            SKU: {activeVariation.sku}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {variations.map((v, idx) => {
          const isSelected = selectedIndex === idx;
          const hex = v.color.hex_code || "#333333";

          return (
            <button
              key={v.variation_id}
              type="button"
              onClick={() => onSelect(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                isSelected
                  ? "border-brand-primary bg-brand-primary/5 text-brand-primary ring-2 ring-brand-primary/20 shadow-xs"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0"
                style={{ backgroundColor: hex }}
              />
              <span>{v.color.name}</span>
              {isSelected && <Check className="w-3.5 h-3.5 text-brand-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
