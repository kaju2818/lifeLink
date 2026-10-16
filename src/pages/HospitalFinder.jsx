import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import {
  Building2,
  Search,
  Filter,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  Activity,
  Wind,
  ShieldCheck,
  List,
  Map as MapIcon,
  PhoneCall
} from "lucide-react";
import MapView from "../components/MapView";

export default function HospitalFinder() {
  const { hospitals } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOxygen, setFilterOxygen] = useState(false);
  const [filterVentilator, setFilterVentilator] = useState(false);
  const [filterIcuOnly, setFilterIcuOnly] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      const matchSearch =
        searchQuery === "" ||
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.specialties?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchOxygen = !filterOxygen || h.hasOxygen;
      const matchVentilator = !filterVentilator || h.hasVentilators;
      const matchIcu = !filterIcuOnly || (h.beds?.icu?.available || 0) > 0;

      return matchSearch && matchOxygen && matchVentilator && matchIcu;
    });
  }, [hospitals, searchQuery, filterOxygen, filterVentilator, filterIcuOnly]);

  const mapMarkers = useMemo(() => {
    return filteredHospitals.map((h) => ({
      lat: h.location?.lat,
      lng: h.location?.lng,
      title: h.name,
      popupContent: `
        <strong>ICU Beds Available: ${h.beds?.icu?.available || 0}</strong><br/>
        General Beds: ${h.beds?.general?.available || 0}<br/>
        Emergency: ${h.emergencyHotline || h.phone}<br/>
        ${h.address}
      `
    }));
  }, [filteredHospitals]);

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Real-Time Bed & Triage Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Hospital Bed Availability
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Live counts of ICU, Oxygen-supported, and Emergency Trauma beds across verified medical centers.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospital, specialty (Trauma, Cardiac, Burn)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
            />
          </div>

          {/* Quick toggle chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setFilterIcuOnly(!filterIcuOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterIcuOnly
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>ICU Available Only</span>
            </button>

            <button
              onClick={() => setFilterOxygen(!filterOxygen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterOxygen
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Oxygen Ready</span>
            </button>

            <button
              onClick={() => setFilterVentilator(!filterVentilator)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterVentilator
                  ? "bg-cyan-600 text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ventilators</span>
            </button>
          </div>

          {/* View switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center self-end md:self-auto">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "list"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <List className="w-4 h-4" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "map"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "map" ? (
        <MapView markers={mapMarkers} className="h-[550px] w-full rounded-3xl" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
              <Building2 className="w-10 h-10 mx-auto mb-3 stroke-[1.5] text-slate-300" />
              <p className="text-base font-semibold text-slate-700">No hospitals match your filter</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting the filters or modifying your search keywords.</p>
            </div>
          ) : (
            filteredHospitals.map((hosp) => {
              const icuAvail = hosp.beds?.icu?.available || 0;
              const emgAvail = hosp.beds?.emergency?.available || 0;
              const genAvail = hosp.beds?.general?.available || 0;
              const pedAvail = hosp.beds?.pediatric?.available || 0;

              return (
                <div
                  key={hosp.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6 hover:shadow-md transition-shadow"
                >
                  {/* Title & Status */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 text-lg">{hosp.name}</h3>
                        {hosp.isVerified && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" title="Verified Hospital" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{hosp.address}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shrink-0 ${
                        hosp.status === "AVAILABLE"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {hosp.status === "AVAILABLE" ? "Beds Available" : "Limited Capacity"}
                    </span>
                  </div>

                  {/* Bed Capacity Counters Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* ICU */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ICU Beds</span>
                      <span className={`text-xl font-extrabold mt-1 ${icuAvail > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {icuAvail}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">of {hosp.beds?.icu?.total || 0} total</span>
                    </div>

                    {/* Emergency */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Emergency</span>
                      <span className={`text-xl font-extrabold mt-1 ${emgAvail > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {emgAvail}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">of {hosp.beds?.emergency?.total || 0} total</span>
                    </div>

                    {/* General */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">General</span>
                      <span className="text-xl font-extrabold text-slate-800 mt-1">{genAvail}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">of {hosp.beds?.general?.total || 0} total</span>
                    </div>

                    {/* Pediatric */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pediatric</span>
                      <span className="text-xl font-extrabold text-slate-800 mt-1">{pedAvail}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">of {hosp.beds?.pediatric?.total || 0} total</span>
                    </div>
                  </div>

                  {/* Specialties & Facilities */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {hosp.specialties?.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
                      {hosp.hasOxygen && (
                        <span className="flex items-center gap-1 text-teal-700">
                          <Wind className="w-3.5 h-3.5" />
                          <span>Oxygen Support</span>
                        </span>
                      )}
                      {hosp.hasVentilators && (
                        <span className="flex items-center gap-1 text-blue-700">
                          <Activity className="w-3.5 h-3.5" />
                          <span>Ventilators Available</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Strip: Emergency Dial & Last updated */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Updated: {hosp.lastUpdatedBy || "Triage Desk"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {hosp.emergencyHotline && (
                        <a
                          href={`tel:${hosp.emergencyHotline}`}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Emergency Hotline</span>
                        </a>
                      )}
                      <a
                        href={`tel:${hosp.phone}`}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                        title="Call Reception"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
