import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, Role } from "../context/AuthContext";
import {
  HeartPulse,
  User,
  Droplet,
  Building2,
  Pill,
  ShieldAlert,
  ArrowRight,
  Lock,
  Mail,
  Zap,
  CheckCircle2
} from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(Role.USER);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    { role: Role.USER, label: "Recipient Demo", email: "user@lifelink.org", name: "Sarah Jenkins", icon: User, path: "/user/dashboard" },
    { role: Role.DONOR, label: "Donor Demo", email: "donor@lifelink.org", name: "Marcus Vance", icon: Droplet, path: "/donor/dashboard" },
    { role: Role.HOSPITAL, label: "Hospital Demo", email: "hospital@lifelink.org", name: "Dr. Evelyn Reed", icon: Building2, path: "/hospital/dashboard" },
    { role: Role.PHARMACY, label: "Pharmacy Demo", email: "pharmacy@lifelink.org", name: "Robert Chen", icon: Pill, path: "/pharmacy/dashboard" },
    { role: Role.ADMIN, label: "Admin Demo", email: "admin@lifelink.org", name: "LifeLink Governance", icon: ShieldAlert, path: "/admin/dashboard" }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await login(email, password, role);
    setLoading(false);

    if (res.success) {
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else {
        switch (res.user.role) {
          case Role.DONOR:
            navigate("/donor/dashboard");
            break;
          case Role.HOSPITAL:
            navigate("/hospital/dashboard");
            break;
          case Role.PHARMACY:
            navigate("/pharmacy/dashboard");
            break;
          case Role.ADMIN:
            navigate("/admin/dashboard");
            break;
          case Role.USER:
          default:
            navigate("/user/dashboard");
            break;
        }
      }
    } else {
      setError(res.error || "Failed to sign in. Please check credentials.");
    }
  };

  const handleQuickDemoLogin = async (demo) => {
    setLoading(true);
    setError("");
    const res = await login(demo.email, "demo123", demo.role);
    setLoading(false);
    if (res.success) {
      navigate(demo.path);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
        {/* Logo & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-teal-400 flex items-center justify-center text-white mx-auto shadow-md shadow-brand-600/20">
            <HeartPulse className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign in to LifeLink
          </h2>
          <p className="text-xs text-slate-500">
            Access your patient records, donor dashboard, or hospital triage center.
          </p>
        </div>

        {/* Demo Quick Logins Strip */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>1-Click Instant Demo Portals</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {demoAccounts.map((demo) => (
              <button
                key={demo.role}
                type="button"
                onClick={() => handleQuickDemoLogin(demo)}
                className="p-2 rounded-xl bg-white hover:bg-brand-50 border border-slate-200/80 hover:border-brand-200 text-left transition-all text-[11px] font-semibold text-slate-700 flex items-center gap-1.5"
              >
                <demo.icon className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="truncate">{demo.label.replace(" Demo", "")}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Standard Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[Role.USER, Role.DONOR, Role.HOSPITAL, Role.PHARMACY, Role.ADMIN].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all ${
                    role === r
                      ? "bg-brand-600 text-white shadow-xs"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@lifelink.org"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? "Signing In..." : "Sign In to Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don't have an account yet?{" "}
          <Link to="/register" className="text-brand-600 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
