import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Role } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import BloodFinder from "./pages/BloodFinder";
import MedicineFinder from "./pages/MedicineFinder";
import HospitalFinder from "./pages/HospitalFinder";
import Emergency from "./pages/Emergency";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Dashboards
import UserDashboard from "./pages/dashboards/UserDashboard";
import DonorDashboard from "./pages/dashboards/DonorDashboard";
import HospitalDashboard from "./pages/dashboards/HospitalDashboard";
import PharmacyDashboard from "./pages/dashboards/PharmacyDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

export default function App() {
  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blood-finder" element={<BloodFinder />} />
        <Route path="/medicine-finder" element={<MedicineFinder />} />
        <Route path="/hospital-finder" element={<HospitalFinder />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Role-Protected Stakeholder Dashboards */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={[Role.USER]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/dashboard"
          element={
            <ProtectedRoute allowedRoles={[Role.DONOR]}>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital/dashboard"
          element={
            <ProtectedRoute allowedRoles={[Role.HOSPITAL]}>
              <HospitalDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacy/dashboard"
          element={
            <ProtectedRoute allowedRoles={[Role.PHARMACY]}>
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
