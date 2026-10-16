import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import {
  Droplet,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Building2,
  Phone,
  Activity,
  Award,
  AlertCircle
} from "lucide-react";

export default function DonorDashboard() {
  const { user } = useAuth();
  const { donors, bloodRequests, updateBloodRequestStatus, toggleDonorAvailability } = useData();

  // Find donor record
  const currentDonor = donors.find((d) => d.userId === user?.id || d.name === user?.name) || {
    id: "donor_01",
    name: user?.name || "Marcus Vance",
    bloodGroup: "O-",
    availability: "AVAILABLE",
    totalDonations: 8,
    isVerified: true
  };

  const isAvailable = currentDonor.availability === "AVAILABLE";

  const handleToggle = () => {
    const next = isAvailable ? "RECENTLY_DONATED" : "AVAILABLE";
    toggleDonorAvailability(currentDonor.id, next);
  };

  // Requests matching donor blood group or assigned
  const relevantRequests = bloodRequests.filter(
    (r) => r.assignedDonorId === currentDonor.id || r.bloodGroup === currentDonor.bloodGroup
  );

  const handleAcceptRequest = (reqId) => {
    updateBloodRequestStatus(reqId, "ACCEPTED", {
      assignedDonorId: currentDonor.id,
      assignedDonorName: currentDonor.name
    });
  };

  return (
    <div className="space-y-8">
      {/* Donor Banner & Live Toggle */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-600 to-red-500 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-rose-600/30">
            {currentDonor.bloodGroup}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{currentDonor.name}</h1>
              {currentDonor.isVerified && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Donor</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Universal Donor Registry • {currentDonor.totalDonations} Lifetime Donations Recorded
            </p>
          </div>
        </div>

        {/* Availability Switch */}
        <div className="flex items-center gap-3 self-stretch md:self-auto bg-slate-50 p-2 rounded-2xl border border-slate-200/60">
          <div className="px-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Emergency Status
            </span>
            <span className={`text-xs font-bold ${isAvailable ? "text-emerald-600" : "text-amber-600"}`}>
              {isAvailable ? "Available to Donate" : "Recently Donated / Resting"}
            </span>
          </div>
          <button
            onClick={handleToggle}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isAvailable
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            }`}
          >
            {isAvailable ? "Set to Resting" : "Set to Available"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Droplet className="w-6 h-6 fill-rose-600" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900">{currentDonor.totalDonations}</span>
            <span className="text-xs text-slate-500 block">Total Donations</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900">
              {currentDonor.totalDonations * 3}
            </span>
            <span className="text-xs text-slate-500 block">Estimated Lives Impacted</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900">Eligible</span>
            <span className="text-xs text-slate-500 block">Next Whole Blood Transfusion</span>
          </div>
        </div>
      </div>

      {/* Incoming Requests */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Emergency Requests for Group {currentDonor.bloodGroup}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Patients and hospitals actively requesting blood matching your group.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {relevantRequests.length} incoming
          </span>
        </div>

        <div className="space-y-4">
          {relevantRequests.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No urgent requests right now</p>
              <p className="text-xs text-slate-500 mt-1">You will receive a notification as soon as a hospital broadcasts an alert.</p>
            </div>
          ) : (
            relevantRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50 space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-extrabold text-xs">
                      {req.bloodGroup}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {req.unitsNeeded} Units Required for {req.patientName}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        req.urgency === "CRITICAL"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {req.urgency}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{req.hospitalName} ({req.location?.address})</span>
                  </div>

                  {req.notes && (
                    <p className="text-xs text-slate-500 italic">"{req.notes}"</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {req.status === "ACCEPTED" ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>You Accepted This Request</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAcceptRequest(req.id)}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Accept & Dispatch
                    </button>
                  )}
                  {req.contactPhone && (
                    <a
                      href={`tel:${req.contactPhone}`}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700"
                      title="Call Hospital Triage"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
