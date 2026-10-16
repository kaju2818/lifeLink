import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Access Restricted</span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Unauthorized Portal Access
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your current account role does not have administrative permission to view this specialized healthcare portal.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}
