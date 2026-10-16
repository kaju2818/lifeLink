import React from "react";
import { Link } from "react-router-dom";
import { HeartCrack, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
          <HeartCrack className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-3xl font-black text-slate-900 block">404</span>
          <h1 className="text-xl font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The medical resource, portal, or link you navigated to does not exist or has been relocated.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Return to Safety (Home)</span>
        </Link>
      </div>
    </div>
  );
}
