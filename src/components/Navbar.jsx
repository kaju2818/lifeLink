import React, { useState } from "react";
import { Link, useLocation as useRouterLocation } from "react-router-dom";
import { useAuth, Role } from "../context/AuthContext";
import { useLocation } from "../context/LocationContext";
import { useData } from "../context/DataContext";
import {
  HeartPulse,
  Droplet,
  Pill,
  Building2,
  AlertTriangle,
  MapPin,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard
} from "lucide-react";
import NotificationsDrawer from "./NotificationsDrawer";

export default function Navbar() {
  const routerLocation = useRouterLocation();
  const { user, role, isLoggedIn, logout } = useAuth();
  const { coords, isLocating, isGpsActive, requestGpsLocation } = useLocation();
  const { unreadCount } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const getDashboardPath = () => {
    switch (role) {
      case Role.DONOR:
        return "/donor/dashboard";
      case Role.HOSPITAL:
        return "/hospital/dashboard";
      case Role.PHARMACY:
        return "/pharmacy/dashboard";
      case Role.ADMIN:
        return "/admin/dashboard";
      case Role.USER:
      default:
        return "/user/dashboard";
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Blood Finder", path: "/blood-finder", icon: Droplet },
    { name: "Medicine Finder", path: "/medicine-finder", icon: Pill },
    { name: "Hospital & Beds", path: "/hospital-finder", icon: Building2 }
  ];

  const isActive = (path) => routerLocation.pathname === path;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform duration-200">
                <HeartPulse className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight flex items-center gap-1">
                  Life<span className="text-brand-600">Link</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Healthcare Availability
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                      active
                        ? "bg-brand-50/80 text-brand-700 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {Icon && (
                      <Icon className={`w-4 h-4 ${active ? "text-brand-600" : "text-slate-400"}`} />
                    )}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {/* GPS Location Pill */}
            <button
              onClick={requestGpsLocation}
              disabled={isLocating}
              title="Click to detect current GPS location"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-medium text-slate-700 transition-colors"
            >
              <MapPin className={`w-3.5 h-3.5 ${isGpsActive ? "text-emerald-500" : "text-slate-400"}`} />
              <span className="truncate max-w-[130px]">
                {isLocating ? "Detecting..." : coords?.city || "Metro Central"}
              </span>
              {isGpsActive ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <NotificationsDrawer
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
              />
            </div>

            {/* Emergency SOS Button */}
            <Link
              to="/emergency"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs tracking-wide shadow-sm shadow-rose-600/20 transition-all hover:scale-102"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>EMERGENCY SOS</span>
            </Link>

            {/* User Profile or Sign In */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-slate-50 border border-slate-200/80 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-600 text-white font-bold flex items-center justify-center text-xs">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-medium text-brand-600 capitalize">
                      {role?.toLowerCase()}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-600" />
                      <span>My Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs tracking-wide transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-slate-600 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 rounded-full" />
              )}
            </button>
            <NotificationsDrawer
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive(item.path) ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 mt-2 rounded-xl bg-rose-600 text-white font-semibold text-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>EMERGENCY SOS</span>
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <LayoutDashboard className="w-4 h-4 text-brand-600" />
                  <span>My Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 mt-1 rounded-xl bg-slate-900 text-white font-medium text-sm"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
