import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, PhoneCall, ShieldCheck, Heart, ExternalLink } from "lucide-react";
import { emergencyHelplines } from "../data/mockData";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* 24/7 Helplines Strip */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                24/7 Toll-Free Emergency Health Helplines
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {emergencyHelplines.slice(0, 4).map((h) => (
                <a
                  key={h.id}
                  href={`tel:${h.number}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-white transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                  <span className="font-bold text-rose-400">{h.number}</span>
                  <span className="text-slate-400">({h.category})</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-teal-400 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Life<span className="text-brand-400">Link</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decentralized, rapid healthcare availability platform connecting voluntary blood donors, available hospital ICU beds, and live pharmacy inventories in real-time.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Health Network</span>
            </div>
          </div>

          {/* Quick Finders */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Emergency Finders
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/blood-finder" className="hover:text-white transition-colors">
                  Blood Donor Registry
                </Link>
              </li>
              <li>
                <Link to="/medicine-finder" className="hover:text-white transition-colors">
                  Pharmacy Medicine Stock
                </Link>
              </li>
              <li>
                <Link to="/hospital-finder" className="hover:text-white transition-colors">
                  Hospital Bed Availability
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-rose-400 font-semibold hover:text-rose-300 transition-colors flex items-center gap-1">
                  <span>Emergency SOS Dispatch</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Stakeholder Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/donor/dashboard" className="hover:text-white transition-colors">
                  Voluntary Donor Registry
                </Link>
              </li>
              <li>
                <Link to="/hospital/dashboard" className="hover:text-white transition-colors">
                  Hospital Bed Manager
                </Link>
              </li>
              <li>
                <Link to="/pharmacy/dashboard" className="hover:text-white transition-colors">
                  Pharmacy Stock Controller
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-white transition-colors">
                  Governance Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Standards */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Mission & Verification
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              LifeLink operates on voluntary participation standards. All registered blood donors undergo phone verification before emergency triage dispatch.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-300">
              Emergency blood donation response target: <strong className="text-white">within 30 mins</strong>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LifeLink Healthcare Availability Network. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built for emergency medical assistance</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
