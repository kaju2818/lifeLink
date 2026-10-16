import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useLocation } from "../context/LocationContext";
import { useAuth } from "../context/AuthContext";
import { emergencyHelplines } from "../data/mockData";
import {
  AlertTriangle,
  PhoneCall,
  Activity,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Send,
  Droplet,
  Building2,
  Wind
} from "lucide-react";

export default function Emergency() {
  const { createEmergencySOS, emergencyRequests } = useData();
  const { coords, isLocating, requestGpsLocation } = useLocation();
  const { user } = useAuth();

  const [emergencyType, setEmergencyType] = useState("ICU_BED");
  const [urgency, setUrgency] = useState("CRITICAL");
  const [contactName, setContactName] = useState(user?.name || "");
  const [contactPhone, setContactPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(coords?.address || "");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleTriggerSOS = (e) => {
    e.preventDefault();
    createEmergencySOS({
      requesterId: user?.id || "guest_emergency",
      type: emergencyType,
      urgency,
      contactName,
      contactPhone,
      location: {
        lat: coords?.lat || 12.9716,
        lng: coords?.lng || 77.5946,
        address: address || coords?.address || "Current GPS Location"
      },
      details,
      assignedProviderName: "Regional Emergency Response Dispatch"
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white p-8 sm:p-10 shadow-lg shadow-rose-600/20">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>24/7 Priority Emergency Dispatch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Emergency Health Assistance & SOS
          </h1>
          <p className="text-rose-100 text-sm leading-relaxed">
            Directly broadcast trauma triage alerts, dispatch ambulance calls, and reserve emergency ICU beds in real-time.
          </p>
        </div>
      </div>

      {/* Grid: Dispatch Form & Hotlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: SOS Dispatch Trigger Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Trigger Emergency Triage Broadcast
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Transmits high-priority notifications to nearby participating medical teams.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span>SOS Active</span>
            </span>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-emerald-900">
                  Emergency Alert Dispatched Successfully
                </h3>
                <p className="text-xs text-emerald-700 mt-1 max-w-md mx-auto">
                  Nearby hospitals, trauma units, and registered ambulances have been notified with your patient details and contact info.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Send Another Alert
              </button>
            </div>
          ) : (
            <form onSubmit={handleTriggerSOS} className="space-y-6">
              {/* Emergency Category */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Emergency Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "ICU_BED", label: "ICU / Trauma Bed", icon: Building2 },
                    { id: "BLOOD_URGENT", label: "Trauma Blood", icon: Droplet },
                    { id: "VENTILATOR", label: "Ventilator / O2", icon: Wind },
                    { id: "AMBULANCE", label: "Ambulance SOS", icon: Activity }
                  ].map((type) => {
                    const isSelected = emergencyType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setEmergencyType(type.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? "bg-rose-50 border-rose-500 text-rose-900 shadow-xs ring-2 ring-rose-500/20"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-700"
                        }`}
                      >
                        <type.icon
                          className={`w-5 h-5 mb-2 ${isSelected ? "text-rose-600" : "text-slate-400"}`}
                        />
                        <span className="text-xs font-bold">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Patient & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact / Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter caller or patient name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Emergency Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Patient Current Location / Landmark *
                  </label>
                  <button
                    type="button"
                    onClick={requestGpsLocation}
                    disabled={isLocating}
                    className="text-[11px] text-rose-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{isLocating ? "Detecting GPS..." : "Auto-Detect My GPS"}</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, nearest junction, landmark..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Clinical Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Clinical Summary & Immediate Needs *
                </label>
                <textarea
                  rows="3"
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe patient condition: e.g. severe trauma, cardiac arrest, respiratory failure, blood group needed..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all hover:scale-101"
              >
                <AlertTriangle className="w-5 h-5 fill-white text-rose-600" />
                <span>Transmit Priority Emergency SOS</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Instant Dial Toll-Free Helplines */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <h3 className="font-extrabold text-slate-900 text-sm">Direct National Helplines</h3>
            </div>
            <div className="space-y-3">
              {emergencyHelplines.map((item) => (
                <a
                  key={item.id}
                  href={`tel:${item.number}`}
                  className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between group block"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">{item.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-rose-600 font-extrabold text-sm shadow-xs group-hover:bg-rose-600 group-hover:text-white transition-all">
                    {item.number}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Hospital Protocols</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When an SOS broadcast is triggered, all participating hospitals receive an acoustic triage alert on their nurse station dashboards with one-click bed reservation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
