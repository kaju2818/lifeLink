import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { useLocation } from "../context/LocationContext";
import { useAuth } from "../context/AuthContext";
import {
  Droplet,
  Search,
  Filter,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  Send,
  X,
  AlertCircle,
  Map as MapIcon,
  List
} from "lucide-react";
import MapView from "../components/MapView";

const BLOOD_GROUPS = ["ALL", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BloodFinder() {
  const { donors, requestBlood } = useData();
  const { coords } = useLocation();
  const { user } = useAuth();

  const [selectedGroup, setSelectedGroup] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  // Request form state
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "O-",
    unitsNeeded: 1,
    hospitalName: "",
    urgency: "CRITICAL",
    contactPhone: user?.phone || "",
    notes: ""
  });

  const filteredDonors = useMemo(() => {
    return donors.filter((d) => {
      const matchGroup = selectedGroup === "ALL" || d.bloodGroup === selectedGroup;
      const matchSearch =
        searchQuery === "" ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location?.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location?.city?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGroup && matchSearch;
    });
  }, [donors, selectedGroup, searchQuery]);

  const mapMarkers = useMemo(() => {
    return filteredDonors.map((d) => ({
      lat: d.location?.lat,
      lng: d.location?.lng,
      title: `${d.name} (${d.bloodGroup})`,
      popupContent: `
        <strong>${d.availability === "AVAILABLE" ? "Available Now" : "Recently Donated"}</strong><br/>
        ${d.location?.address || ""}<br/>
        Phone: ${d.phone || "Contact via App"}
      `
    }));
  }, [filteredDonors]);

  const handleOpenRequest = (donor) => {
    setSelectedDonor(donor);
    setFormData((prev) => ({
      ...prev,
      bloodGroup: donor ? donor.bloodGroup : "O-",
      assignedDonorId: donor?.userId || null,
      assignedDonorName: donor?.name || null
    }));
    setModalOpen(true);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    requestBlood({
      requesterId: user?.id || "guest_recipient",
      requesterName: user?.name || "Emergency Requester",
      patientName: formData.patientName,
      bloodGroup: formData.bloodGroup,
      unitsNeeded: Number(formData.unitsNeeded),
      hospitalName: formData.hospitalName,
      location: coords || { lat: 12.9716, lng: 77.5946, address: "Central Zone" },
      urgency: formData.urgency,
      contactPhone: formData.contactPhone,
      notes: formData.notes,
      assignedDonorId: selectedDonor?.userId || null,
      assignedDonorName: selectedDonor?.name || null
    });

    setModalOpen(false);
    setSuccessToast(
      `Emergency blood request dispatched! Donors with group ${formData.bloodGroup} have been alerted.`
    );
    setTimeout(() => setSuccessToast(""), 6000);
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
            <Droplet className="w-3.5 h-3.5 fill-rose-600" />
            <span>Voluntary Donor Network</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Blood Donors
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Search nearby verified voluntary donors or submit an emergency transfusion request.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenRequest(null)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-sm shadow-rose-600/20 transition-all hover:scale-102"
          >
            <Droplet className="w-4 h-4 fill-white" />
            <span>Broadcast Blood Request</span>
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-3 shadow-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        {/* Blood Groups Selector */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Select Blood Group
          </span>
          <div className="flex flex-wrap gap-2">
            {BLOOD_GROUPS.map((group) => {
              const isSelected = selectedGroup === group;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-rose-600 text-white shadow-xs scale-105"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60"
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search donor name, city, or neighborhood..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center">
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
            <span className="text-xs text-slate-400 font-medium">
              Showing <strong>{filteredDonors.length}</strong> donors
            </span>
          </div>
        </div>
      </div>

      {/* Content: List or Map View */}
      {viewMode === "map" ? (
        <MapView markers={mapMarkers} className="h-[550px] w-full rounded-3xl" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
              <Droplet className="w-10 h-10 mx-auto mb-3 stroke-[1.5] text-slate-300" />
              <p className="text-base font-semibold text-slate-700">No matching donors found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting "ALL" blood groups or broaden your location search.
              </p>
            </div>
          ) : (
            filteredDonors.map((donor) => {
              const isAvailable = donor.availability === "AVAILABLE";
              return (
                <div
                  key={donor.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    {/* Top Row: Blood badge & status */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white font-extrabold text-lg flex items-center justify-center shadow-sm shadow-rose-600/30">
                          {donor.bloodGroup}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-slate-900 text-sm">{donor.name}</h3>
                            {donor.isVerified && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" title="Verified Donor" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {donor.totalDonations} previous donation{donor.totalDonations === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          isAvailable
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {isAvailable ? "Available" : "Recently Donated"}
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {donor.bio || "Universal voluntary donor on LifeLink."}
                    </p>

                    {/* Location & Time */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{donor.location?.address || "Indiranagar, Metro Central"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Active recently</span>
                      </div>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenRequest(donor)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Blood</span>
                    </button>
                    {donor.phone && (
                      <a
                        href={`tel:${donor.phone}`}
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                        title="Call Donor"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Emergency Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {selectedDonor ? `Request Blood from ${selectedDonor.name}` : "Broadcast Emergency Blood Request"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Immediate alert dispatched to voluntary donor network.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Blood Group *
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    {BLOOD_GROUPS.filter((g) => g !== "ALL").map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Units Needed *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={formData.unitsNeeded}
                    onChange={(e) => setFormData({ ...formData, unitsNeeded: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Urgency Level *
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    <option value="CRITICAL">Critical (Immediate - Within 1 hr)</option>
                    <option value="URGENT">Urgent (Within 6 hrs)</option>
                    <option value="STANDARD">Standard (Within 24 hrs)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hospital / Medical Center Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                  placeholder="e.g. Apex Metro Medical Centre, ICU 3"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Clinical Notes / Reason
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Cross-matching ready, scheduled emergency surgery..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20"
                >
                  Dispatch Request Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
