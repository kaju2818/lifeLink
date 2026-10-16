import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";
import {
  User,
  Droplet,
  Clock,
  MapPin,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Building2
} from "lucide-react";

export default function UserDashboard() {
  const { user } = useAuth();
  const { bloodRequests, emergencyRequests } = useData();

  // Requests created by this user
  const myBloodRequests = bloodRequests.filter(
    (r) => r.requesterId === user?.id || r.requesterName === user?.name
  );
  const myEmergencyRequests = emergencyRequests.filter(
    (r) => r.requesterId === user?.id || r.contactName === user?.name
  );

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white font-black text-xl flex items-center justify-center shadow-md shadow-brand-600/20">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{user?.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[10px] font-bold border border-brand-200">
                Patient / Recipient
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {user?.email} • {user?.location?.address || "Indiranagar, Metro Central"}
            </p>
          </div>
        </div>

        <Link
          to="/blood-finder"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm shadow-rose-600/20 transition-all hover:scale-102"
        >
          <Plus className="w-4 h-4" />
          <span>New Blood Request</span>
        </Link>
      </div>

      {/* Grid: Blood Requests & Emergency SOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* My Blood Transfusion Requests */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h2 className="font-extrabold text-slate-900 text-base">My Blood Requests</h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {myBloodRequests.length} active
            </span>
          </div>

          <div className="space-y-3">
            {myBloodRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-xs">No blood requests filed yet.</p>
                <Link
                  to="/blood-finder"
                  className="text-xs text-brand-600 font-bold hover:underline mt-2 inline-block"
                >
                  Broadcast your first blood request
                </Link>
              </div>
            ) : (
              myBloodRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                        Patient: {req.patientName}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-sm">
                        {req.unitsNeeded} units of {req.bloodGroup} needed
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        req.status === "ACCEPTED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {req.status === "ACCEPTED" ? "Donor Matched" : "Dispatched"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{req.hospitalName}</span>
                  </div>

                  {req.assignedDonorName && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-xs flex items-center justify-between">
                      <span className="text-slate-600">
                        Assigned Donor: <strong className="text-slate-900">{req.assignedDonorName}</strong>
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                        En Route
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(req.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Emergency SOS History */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="font-extrabold text-slate-900 text-base">Emergency SOS Dispatches</h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {myEmergencyRequests.length} recorded
            </span>
          </div>

          <div className="space-y-3">
            {myEmergencyRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-xs">No emergency alerts triggered.</p>
                <Link
                  to="/emergency"
                  className="text-xs text-rose-600 font-bold hover:underline mt-2 inline-block"
                >
                  View Emergency Services Portal
                </Link>
              </div>
            ) : (
              myEmergencyRequests.map((emg) => (
                <div
                  key={emg.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                        Type: {emg.type}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-sm">
                        {emg.details || "Emergency Dispatch"}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {emg.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{emg.location?.address || "Metro Central"}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(emg.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
