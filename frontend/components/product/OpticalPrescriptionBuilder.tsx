"use client";

import React, { useState } from "react";
import {
  OpticalSelection,
  LensUsageOption,
  LensCoatingOption,
  PrescriptionDetails,
} from "@/types";
import { LENS_USAGE_OPTIONS, LENS_COATING_OPTIONS } from "@/lib/data";
import { formatPricePKR } from "@/lib/utils";
import { Check, Upload, Sparkles, Eye, Shield } from "lucide-react";

interface OpticalPrescriptionBuilderProps {
  selection: OpticalSelection;
  onChange: (selection: OpticalSelection) => void;
}

export default function OpticalPrescriptionBuilder({
  selection,
  onChange,
}: OpticalPrescriptionBuilderProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [fileName, setFileName] = useState<string>("");

  const handleTypeChange = (type: "frame_only" | "prescription") => {
    if (type === "frame_only") {
      onChange({
        type: "frame_only",
        totalOpticalSurcharge: 0,
      });
    } else {
      // Default to Single Vision and Clear Standard if not selected
      const defaultUsage = selection.usage || LENS_USAGE_OPTIONS[0];
      const defaultCoating = selection.coating || LENS_COATING_OPTIONS[0];
      onChange({
        type: "prescription",
        usage: defaultUsage,
        coating: defaultCoating,
        prescriptionDetails: selection.prescriptionDetails || {},
        totalOpticalSurcharge: defaultCoating.price_pkr,
      });
    }
  };

  const handleUsageChange = (usage: LensUsageOption) => {
    const surcharge = selection.coating?.price_pkr || 0;
    onChange({
      ...selection,
      usage,
      totalOpticalSurcharge: surcharge + usage.price_pkr,
    });
  };

  const handleCoatingChange = (coating: LensCoatingOption) => {
    const usageSurcharge = selection.usage?.price_pkr || 0;
    onChange({
      ...selection,
      coating,
      totalOpticalSurcharge: coating.price_pkr + usageSurcharge,
    });
  };

  const handlePrescriptionTextChange = (text: string) => {
    onChange({
      ...selection,
      prescriptionDetails: {
        ...selection.prescriptionDetails,
        prescriptionText: text,
      },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange({
        ...selection,
        prescriptionDetails: {
          ...selection.prescriptionDetails,
          prescriptionFileName: file.name,
        },
      });
    }
  };

  // Filter coatings by category tab
  const filteredCoatings =
    activeTab === "all"
      ? LENS_COATING_OPTIONS
      : LENS_COATING_OPTIONS.filter((c) => c.category === activeTab);

  return (
    <div className="space-y-6 pt-4 border-t border-gray-200">
      {/* Step 1: Type Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] flex items-center justify-center font-bold">
              1
            </span>
            <span>Select Optical Option:</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleTypeChange("prescription")}
            className={`p-3.5 rounded-xl border text-left transition-all relative ${
              selection.type === "prescription"
                ? "border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/20 shadow-xs"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="block text-xs font-bold text-gray-900">
                  Prescription Lenses
                </span>
                <span className="block text-[11px] text-gray-500 mt-0.5">
                  Single vision, bifocal or progressive fitted to your prescription
                </span>
              </div>
              {selection.type === "prescription" && (
                <Check className="w-4 h-4 text-brand-primary shrink-0" />
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleTypeChange("frame_only")}
            className={`p-3.5 rounded-xl border text-left transition-all relative ${
              selection.type === "frame_only"
                ? "border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/20 shadow-xs"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="block text-xs font-bold text-gray-900">
                  Frame Only (No Lenses)
                </span>
                <span className="block text-[11px] text-gray-500 mt-0.5">
                  Shipped with dummy factory lenses (+Rs. 0)
                </span>
              </div>
              {selection.type === "frame_only" && (
                <Check className="w-4 h-4 text-brand-primary shrink-0" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Steps 2-4: Only visible if Prescription Lenses selected */}
      {selection.type === "prescription" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Step 2: Vision Usage Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] flex items-center justify-center font-bold">
                2
              </span>
              <span>Vision Usage:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LENS_USAGE_OPTIONS.map((u) => {
                const isSelected = selection.usage?.id === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleUsageChange(u)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? "border-brand-primary bg-blue-50/50 text-brand-primary font-semibold ring-1 ring-brand-primary"
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span>{u.label}</span>
                      <span className="text-[11px] text-gray-500">
                        {u.price_pkr > 0 ? `+${formatPricePKR(u.price_pkr)}` : "+Rs. 0"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Lens Coating & Treatment */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
                <span>Lens Coating & Feature:</span>
              </label>

              {selection.coating && (
                <span className="text-xs font-bold text-brand-primary">
                  +{formatPricePKR(selection.coating.price_pkr)}
                </span>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs scrollbar-none">
              {[
                { label: "All", id: "all" },
                { label: "Clear", id: "clear" },
                { label: "Blue-Cut Screen", id: "screen" },
                { label: "Transition (Photochromic)", id: "transition" },
                { label: "Drive Digital", id: "drive" },
                { label: "Tinted Sun", id: "tinted" },
                { label: "Unbreakable", id: "unbreakable" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap text-[11px] font-semibold transition-colors ${
                    activeTab === tab.id
                      ? "bg-brand-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Coating Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {filteredCoatings.map((c) => {
                const isSelected = selection.coating?.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCoatingChange(c)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary/5 text-gray-900 ring-2 ring-brand-primary/20 shadow-xs"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">{c.label}</span>
                      <span className="text-xs font-black text-brand-primary">
                        +{formatPricePKR(c.price_pkr)}
                      </span>
                    </div>
                    {c.description && (
                      <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">
                        {c.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Prescription Details */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] flex items-center justify-center font-bold">
                4
              </span>
              <span>Prescription Input:</span>
            </label>

            <div className="space-y-2">
              <textarea
                rows={2}
                placeholder="Enter SPH / CYL / AXIS for OD & OS (e.g. OD: -1.75, OS: -2.00, PD: 62mm)"
                value={selection.prescriptionDetails?.prescriptionText || ""}
                onChange={(e) => handlePrescriptionTextChange(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />

              {/* Doctor Slip Upload */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-300 hover:border-brand-primary bg-gray-50 hover:bg-gray-100 cursor-pointer text-xs font-medium text-gray-700 transition-colors">
                  <Upload className="w-4 h-4 text-brand-primary" />
                  <span>{fileName ? fileName : "Upload Doctor's Slip (.jpg / .png / .pdf)"}</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {fileName && (
                  <button
                    type="button"
                    onClick={() => {
                      setFileName("");
                      onChange({
                        ...selection,
                        prescriptionDetails: {
                          ...selection.prescriptionDetails,
                          prescriptionFileName: undefined,
                        },
                      });
                    }}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
