import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth, Role } from "../context/AuthContext";
import {
  HeartPulse,
  LayoutDashboard,
  Droplet,
  Building2,
  Pill,
  ShieldAlert,
  ArrowLeft,
  LogOut,
  Bell,
  User,
  Settings
} from "lucide-react";

export default function DashboardLayout() {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getRoleTitle = () => {
    switch (role) {
      case Role.DONOR:
        return "Voluntary Donor Portal";
      case Role.HOSPITAL:
        return "Hospital Bed & Triage Center";
      case Role.PHARMACY:
        return "Pharmacy Medicine Management";
      case Role.ADMIN:
        return "Governance & Network Administration";
      case Role.USER:
      default:
        return "Patient & Recipient Portal";
    }
  };

  const navLinks = [
    { name: "Recipient Dashboard", path: "/user/dashboard", role: Role.USER, icon: LayoutDashboard },
    { name: "Donor Dashboard", path: "/donor/dashboard", role: Role.DONOR, icon: Droplet },
    { name: "Hospital Bed Manager", path: "/hospital/dashboard", role: Role.HOSPITAL, icon: Building2 },
    { name: "Pharmacy Dashboard", path: "/pharmacy/dashboard", role: Role.PHARMACY, icon: Pill },
    { name: "Admin Dashboard", path: "/admin/dashboard", role: Role.ADMIN, icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-700 to-teal-400 flex items-center justify-center text-white shadow-xs">
              <HeartPulse className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 hidden sm:inline">
              Life<span className="text-brand-600">Link</span>
            </span>
          </Link>
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">{getRoleTitle()}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60">
              {role}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Public Site</span>
          </Link>
          <div className="h-4 w-px bg-slate-200" />
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1536px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
