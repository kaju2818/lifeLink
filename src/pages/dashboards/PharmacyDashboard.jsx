import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import {
  Pill,
  Plus,
  Minus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Clock,
  X,
  FileText
} from "lucide-react";

export default function PharmacyDashboard() {
  const { user } = useAuth();
  const { medicines, updateMedicineStock, pharmacies } = useData();

  // Find user's pharmacy
  const pharmacy = pharmacies.find((p) => p.providerUserId === user?.id || p.id === "pharm_01") || pharmacies[0];

  const myMedicines = medicines.filter((m) => m.pharmacyId === pharmacy.id || m.pharmacyName === pharmacy.name);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdjustQuantity = (medId, delta) => {
    const med = medicines.find((m) => m.id === medId);
    if (!med) return;
    const newQty = Math.max(0, med.quantity + delta);
    const newStatus = newQty === 0 ? "UNAVAILABLE" : newQty < 15 ? "LOW_STOCK" : "AVAILABLE";
    updateMedicineStock(medId, { quantity: newQty, status: newStatus });
  };

  const filtered = myMedicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.genericName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Pharmacy Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/20">
            <Pill className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{pharmacy.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold border border-teal-200">
                {pharmacy.operatingHours || "24 Hours Open"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {pharmacy.address} • Chief Pharmacist: {user?.name || "Robert Chen"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm shadow-teal-600/20 transition-all hover:scale-102"
        >
          <Plus className="w-4 h-4" />
          <span>Add Medicine Batch</span>
        </button>
      </div>

      {/* Inventory Table Container */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Live Pharmacy Inventory
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Updates made here instantly broadcast to the public Medicine Finder.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stock..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Inventory List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Drug / Salt</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">MRP (₹)</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Stock Units</th>
                <th className="pb-3 text-right">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((med) => (
                <tr key={med.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pr-4">
                    <strong className="text-slate-900 block font-bold">{med.name}</strong>
                    <span className="text-[11px] text-slate-500">{med.genericName} • {med.strength}</span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-600 font-medium">
                    {med.category}
                  </td>
                  <td className="py-3.5 pr-4 font-bold text-slate-900">
                    ₹{med.price}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        med.status === "AVAILABLE"
                          ? "bg-emerald-50 text-emerald-700"
                          : med.status === "LOW_STOCK"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {med.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 font-extrabold text-slate-800">
                    {med.quantity} units
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleAdjustQuantity(med.id, -10)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                        title="Reduce 10"
                      >
                        -10
                      </button>
                      <button
                        onClick={() => handleAdjustQuantity(med.id, 10)}
                        className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold"
                        title="Add 10"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
