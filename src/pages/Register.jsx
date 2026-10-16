import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, Role } from "../context/AuthContext";
import {
  HeartPulse,
  User,
  Droplet,
  Building2,
  Pill,
  Lock,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState(Role.USER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await register({
      name,
      email,
      password,
      role,
      phone,
      location: {
        lat: 12.9716,
        lng: 77.5946,
        address: address || "Indiranagar, Metro Central",
        city: "Metro Central"
      },
      bloodGroup: role === Role.DONOR ? bloodGroup : null,
      bio: role === Role.DONOR ? bio : null
    });

    setLoading(false);

    if (res.success) {
      switch (role) {
        case Role.DONOR:
          navigate("/donor/dashboard");
          break;
        case Role.HOSPITAL:
          navigate("/hospital/dashboard");
          break;
        case Role.PHARMACY:
          navigate("/pharmacy/dashboard");
          break;
        case Role.USER:
        default:
          navigate("/user/dashboard");
          break;
      }
    } else {
      setError(res.error || "Failed to create account.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-teal-400 flex items-center justify-center text-white mx-auto shadow-md shadow-brand-600/20">
            <HeartPulse className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Your LifeLink Account
          </h2>
          <p className="text-xs text-slate-500">
            Register as a patient, voluntary blood donor, or healthcare facility.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Choose Account Type *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { r: Role.USER, label: "Recipient", icon: User },
                { r: Role.DONOR, label: "Donor", icon: Droplet },
                { r: Role.HOSPITAL, label: "Hospital", icon: Building2 },
                { r: Role.PHARMACY, label: "Pharmacy", icon: Pill }
              ].map((item) => (
                <button
                  key={item.r}
                  type="button"
                  onClick={() => setRole(item.r)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    role === item.r
                      ? "bg-brand-50 border-brand-500 text-brand-900 shadow-xs ring-2 ring-brand-500/20"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-600"
                  }`}
                >
                  <item.icon className="w-4 h-4 text-brand-600" />
                  <span className="text-xs font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name / Organization *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Location address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Address / City Area *
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 42 Blossom Boulevard, Indiranagar"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
            />
          </div>

          {/* Specific fields for DONOR */}
          {role === Role.DONOR && (
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-3">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                Donor Profile Details
              </span>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Blood Group *
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Donor Bio / Availability
                </label>
                <textarea
                  rows="2"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g. Available on 30 minutes notice, regular platelet donor..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs tracking-wide shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? "Registering..." : "Complete Registration"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link to="/login" className="text-brand-600 font-bold hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
