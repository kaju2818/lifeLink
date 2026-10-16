import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { storage, TABLES } from "../../services/storage";
import {
  ShieldAlert,
  Users,
  Building2,
  Pill,
  Droplet,
  CheckCircle2,
  Database,
  Download,
  RotateCcw,
  RefreshCw
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { donors, hospitals, pharmacies, bloodRequests, refreshData } = useData();

  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");

  const handleVerifyDonor = (donorId) => {
    storage.update(TABLES.DONORS, donorId, { isVerified: true });
    refreshData();
    setToast("Donor verified with administrative trust badge.");
    setTimeout(() => setToast(""), 4000);
  };

  const handleFirestoreSync = async () => {
    setSyncing(true);
    try {
      await storage.syncFromFirestore();
      setToast("Synchronized successfully with Cloud Firestore.");
    } catch (err) {
      setToast(`Sync notice: ${err.message}`);
    } finally {
      setSyncing(false);
      setTimeout(() => setToast(""), 5000);
    }
  };

  const handleExportBackup = () => {
    const json = storage.exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lifelink_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast("Database JSON backup downloaded.");
    setTimeout(() => setToast(""), 4000);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all records to initial seed data?")) {
      storage.resetDefaults();
      refreshData();
      setToast("Database reset to verified initial state.");
      setTimeout(() => setToast(""), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Admin Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-brand-600/30">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold">LifeLink Network Governance</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold border border-brand-400/30">
                Superadmin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Global system oversight, trust badges, and Firestore cloud synchronization.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleFirestoreSync}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            <span>Sync Cloud Firestore</span>
          </button>
          <button
            onClick={handleExportBackup}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>
        </div>
      </div>

      {toast && (
        <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center">
          <Droplet className="w-6 h-6 text-rose-600 fill-rose-600 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900">{donors.length}</span>
          <span className="text-[11px] text-slate-400 block uppercase font-bold mt-1">Donors</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center">
          <Building2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900">{hospitals.length}</span>
          <span className="text-[11px] text-slate-400 block uppercase font-bold mt-1">Hospitals</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center">
          <Pill className="w-6 h-6 text-teal-600 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900">{pharmacies.length}</span>
          <span className="text-[11px] text-slate-400 block uppercase font-bold mt-1">Pharmacies</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center">
          <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <span className="text-2xl font-black text-slate-900">{bloodRequests.length}</span>
          <span className="text-[11px] text-slate-400 block uppercase font-bold mt-1">Requests Filed</span>
        </div>
      </div>

      {/* Donor Verification Queue */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            Donor Trust & Verification Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review voluntary blood donors awaiting identity validation badge.
          </p>
        </div>

        <div className="space-y-3">
          {donors.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white font-extrabold text-sm flex items-center justify-center">
                  {d.bloodGroup}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <strong className="text-slate-900 text-xs font-bold">{d.name}</strong>
                    {d.isVerified ? (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-600 font-bold">Pending Review</span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500">{d.location?.address || "Metro Central"} • {d.phone}</span>
                </div>
              </div>

              {!d.isVerified && (
                <button
                  onClick={() => handleVerifyDonor(d.id)}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                >
                  Approve Badge
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-bold text-rose-900">Reset Local State to Seed Defaults</h3>
          <p className="text-[11px] text-rose-700 mt-0.5">
            Clears all locally stored test requests, temporary users, and restores the original demo dataset.
          </p>
        </div>
        <button
          onClick={handleResetDefaults}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Database</span>
        </button>
      </div>
    </div>
  );
}
