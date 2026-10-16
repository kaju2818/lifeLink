import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import {
  Building2,
  Activity,
  CheckCircle2,
  Plus,
  Minus,
  Save,
  Wind,
  PhoneCall,
  Clock,
  ShieldCheck
} from "lucide-react";

export default function HospitalDashboard() {
  const { user } = useAuth();
  const { hospitals, updateBedAvailability } = useData();

  // Find this hospital record
  const hospital = hospitals.find((h) => h.providerUserId === user?.id || h.id === "hosp_01") || hospitals[0];

  const [beds, setBeds] = useState(
    hospital?.beds || {
      icu: { total: 20, available: 3 },
      emergency: { total: 15, available: 4 },
      general: { total: 80, available: 14 },
      pediatric: { total: 25, available: 7 }
    }
  );

  const [savedToast, setSavedToast] = useState(false);

  const handleAdjustBed = (type, delta) => {
    setBeds((prev) => {
      const current = prev[type];
      const newAvail = Math.max(0, Math.min(current.total, current.available + delta));
      return {
        ...prev,
        [type]: { ...current, available: newAvail }
      };
    });
  };

  const handleSaveBedStatus = () => {
    updateBedAvailability(hospital.id, beds);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Hospital Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{hospital.name}</h1>
              {hospital.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" title="Verified Medical Facility" />
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {hospital.address} • Triage Desk: {user?.name || "Dr. Evelyn Reed"}
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveBedStatus}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all hover:scale-102"
        >
          <Save className="w-4 h-4" />
          <span>Broadcast Bed Updates</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Bed status broadcasted! Public finders and emergency dispatchers updated.</span>
        </div>
      )}

      {/* Live Interactive Bed Control Station */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            Live Bed Inventory Control Station
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Use the (+ / -) controls to instantly reflect bed discharges and emergency triage admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* ICU Bed Controller */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">ICU Beds</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                Critical Care
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl font-black text-slate-900">{beds.icu.available}</span>
              <span className="text-xs text-slate-400 block mt-1">of {beds.icu.total} total beds</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleAdjustBed("icu", -1)}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold shadow-xs"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAdjustBed("icu", 1)}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white font-bold shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Emergency Trauma Bed Controller */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Emergency Beds</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Trauma Triage
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl font-black text-slate-900">{beds.emergency.available}</span>
              <span className="text-xs text-slate-400 block mt-1">of {beds.emergency.total} total beds</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleAdjustBed("emergency", -1)}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold shadow-xs"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAdjustBed("emergency", 1)}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white font-bold shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* General Ward Bed Controller */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">General Wards</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                Inpatient
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl font-black text-slate-900">{beds.general.available}</span>
              <span className="text-xs text-slate-400 block mt-1">of {beds.general.total} total beds</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleAdjustBed("general", -1)}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold shadow-xs"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAdjustBed("general", 1)}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white font-bold shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pediatric Bed Controller */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Pediatric Beds</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                Children / NICU
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl font-black text-slate-900">{beds.pediatric.available}</span>
              <span className="text-xs text-slate-400 block mt-1">of {beds.pediatric.total} total beds</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleAdjustBed("pediatric", -1)}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold shadow-xs"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAdjustBed("pediatric", 1)}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white font-bold shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
