import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import {
  Droplet,
  Building2,
  Pill,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Activity,
  Heart,
  Clock,
  PhoneCall,
  Users
} from "lucide-react";

export default function Home() {
  const { donors, hospitals, medicines } = useData();

  const availableDonorsCount = donors.filter(d => d.availability === "AVAILABLE").length;
  const availableBedsCount = hospitals.reduce((acc, h) => {
    return acc + (h.beds?.icu?.available || 0) + (h.beds?.emergency?.available || 0) + (h.beds?.general?.available || 0);
  }, 0);
  const availableMedsCount = medicines.filter(m => m.status === "AVAILABLE").length;

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold shadow-xs">
            <Activity className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span>Live Healthcare Availability & Emergency Triage</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Instant Access to <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-teal-600 to-cyan-600">
              Life-Saving Medical
            </span>{" "}
            Resources
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Find verified voluntary blood donors, locate available ICU & emergency beds, and search real-time pharmacy medicine inventories in your city.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/blood-finder"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 transition-all hover:scale-102"
            >
              <Droplet className="w-4 h-4 fill-white" />
              <span>Find Blood Donors</span>
            </Link>

            <Link
              to="/hospital-finder"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm shadow-xs transition-all hover:scale-102"
            >
              <Building2 className="w-4 h-4 text-brand-600" />
              <span>Hospital Beds</span>
            </Link>

            <Link
              to="/medicine-finder"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm shadow-xs transition-all hover:scale-102"
            >
              <Pill className="w-4 h-4 text-teal-600" />
              <span>Medicine Stock</span>
            </Link>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Droplet className="w-6 h-6 fill-rose-600" />
            </div>
            <span className="text-3xl font-extrabold text-slate-900">{availableDonorsCount}</span>
            <span className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Active Donors
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-slate-900">{hospitals.length}</span>
            <span className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Hospitals Connected
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-slate-900">{availableBedsCount}</span>
            <span className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Available Beds
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <Pill className="w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold text-slate-900">{availableMedsCount}</span>
            <span className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Medicines In Stock
            </span>
          </div>
        </div>
      </section>

      {/* Emergency SOS Banner */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 text-white p-6 sm:p-10 shadow-lg shadow-rose-600/10">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Life-Threatening Emergency</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Require Immediate Trauma, Blood or ICU Support?
              </h2>
              <p className="text-rose-100 text-sm max-w-xl">
                One-tap priority emergency dispatch alerts all nearby verified voluntary donors and trauma centers within a 15km radius.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/emergency"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-bold text-sm shadow-md transition-all hover:scale-102"
              >
                <AlertTriangle className="w-4 h-4 fill-rose-600 text-white" />
                <span>Trigger Emergency SOS</span>
              </Link>
              <a
                href="tel:108"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-rose-900/40 hover:bg-rose-900/60 border border-white/20 text-white font-semibold text-sm transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 108 Ambulance</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How LifeLink Protects Your City
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Real-time synchronization bridges the critical information gap during medical emergencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Blood */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Droplet className="w-6 h-6 fill-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Voluntary Blood Matching</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Filter donors by rare blood groups (O-, AB-, A-), proximity, and verification status. Request emergency donation with verified instant notifications.
              </p>
            </div>
            <Link
              to="/blood-finder"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 mt-6 pt-4 border-t border-slate-100"
            >
              <span>Explore Blood Finder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Beds */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Hospital Bed Availability</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Real-time tracking of General, ICU, Emergency Trauma, and Pediatric beds across regional medical facilities with verified oxygen and ventilator readiness.
              </p>
            </div>
            <Link
              to="/hospital-finder"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 mt-6 pt-4 border-t border-slate-100"
            >
              <span>View Hospital Beds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Medicine */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">24/7 Pharmacy Stock</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Locate life-saving drugs, emergency inhalers, insulins, and antibiotics across round-the-clock pharmacies. Avoid running between stores during crises.
              </p>
            </div>
            <Link
              to="/medicine-finder"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 mt-6 pt-4 border-t border-slate-100"
            >
              <span>Search Medicines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stakeholder Registration Callout */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Join the LifeLink Network</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Are you a Healthcare Provider or Voluntary Donor?
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Register as a donor to save lives, or connect your hospital or pharmacy to keep your community informed during emergency situations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md transition-colors"
            >
              Register on LifeLink
            </Link>
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
            >
              Sign In to Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
