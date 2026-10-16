import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import {
  Pill,
  Search,
  Filter,
  MapPin,
  Clock,
  Phone,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileText
} from "lucide-react";

const CATEGORIES = [
  "ALL",
  "Analgesics",
  "Antibiotics",
  "Respiratory",
  "Diabetes",
  "Cardiovascular",
  "Gastrointestinal"
];

export default function MedicineFinder() {
  const { medicines, pharmacies } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filter24Hours, setFilter24Hours] = useState(false);
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);

  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const matchCategory = selectedCategory === "ALL" || med.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.pharmacyName?.toLowerCase().includes(searchQuery.toLowerCase());

      const pharm = pharmacies.find((p) => p.id === med.pharmacyId);
      const match24H = !filter24Hours || (pharm && pharm.operatingHours?.includes("24 Hours"));
      const matchAvail = !filterAvailableOnly || med.status === "AVAILABLE";

      return matchCategory && matchSearch && match24H && matchAvail;
    });
  }, [medicines, pharmacies, selectedCategory, searchQuery, filter24Hours, filterAvailableOnly]);

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
            <Pill className="w-3.5 h-3.5 text-teal-600" />
            <span>24/7 Pharmacy Network</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Medicine Stock Locator
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Search live prescription and emergency medicine stock across regional pharmacies.
          </p>
        </div>
      </div>

      {/* Toolbar & Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        {/* Category Pills */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Therapeutic Category
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-teal-600 text-white shadow-xs scale-105"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Toggles */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicine brand, generic salt, or pharmacy..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setFilter24Hours(!filter24Hours)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter24Hours
                  ? "bg-teal-700 text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>24/7 Open Pharmacies</span>
            </button>

            <button
              onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterAvailableOnly
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>In Stock Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
            <Pill className="w-10 h-10 mx-auto mb-3 stroke-[1.5] text-slate-300" />
            <p className="text-base font-semibold text-slate-700">No medicines found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or selecting "ALL" categories.
            </p>
          </div>
        ) : (
          filteredMedicines.map((med) => {
            const pharm = pharmacies.find((p) => p.id === med.pharmacyId);
            const isAvail = med.status === "AVAILABLE";
            const isLow = med.status === "LOW_STOCK";

            return (
              <div
                key={med.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  {/* Top: Name & Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                        {med.category}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                        {med.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {med.genericName}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        isAvail
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : isLow
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {isAvail ? "In Stock" : isLow ? "Low Stock" : "Unavailable"}
                    </span>
                  </div>

                  {/* Details Pill Strip */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-slate-600">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100">{med.strength}</span>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100">{med.dosageForm}</span>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100">{med.packSize}</span>
                    {med.isRxRequired && (
                      <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 font-semibold flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>Rx Required</span>
                      </span>
                    )}
                  </div>

                  {/* Pricing & Stock Count */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Unit MRP</span>
                      <span className="text-base font-extrabold text-slate-900">₹{med.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Stock Units</span>
                      <span className="text-xs font-bold text-slate-700">{med.quantity} available</span>
                    </div>
                  </div>

                  {/* Pharmacy location & timings */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <strong className="text-slate-800 truncate">{med.pharmacyName}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{pharm?.address || "Commercial Street, Metro Central"}</span>
                    </div>
                    {pharm?.operatingHours && (
                      <div className="flex items-center gap-2 text-[11px] text-teal-700 font-medium">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{pharm.operatingHours}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Call Pharmacy CTA */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  {pharm?.phone ? (
                    <a
                      href={`tel:${pharm.phone}`}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Pharmacy ({pharm.phone})</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold"
                    >
                      Store Walk-in Only
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
