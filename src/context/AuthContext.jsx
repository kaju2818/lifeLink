import React, { createContext, useContext, useState, useEffect } from "react";
import { storage, TABLES } from "../services/storage";
import { auth, isConfigured } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const Role = {
  USER: "USER",
  DONOR: "DONOR",
  HOSPITAL: "HOSPITAL",
  PHARMACY: "PHARMACY",
  ADMIN: "ADMIN"
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("lifelink_auth_session");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("lifelink_auth_session", JSON.stringify(user));
    } else {
      localStorage.removeItem("lifelink_auth_session");
    }
  }, [user]);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      // If Firebase Auth is ready, try signing in
      if (isConfigured && auth) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (fbErr) {
          console.warn("Firebase Auth sign-in fallback:", fbErr.message);
        }
      }

      // Check local users database
      const users = storage.getAll(TABLES.USERS);
      let matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!matched) {
        // Create user record if logging in with demo account
        matched = storage.create(TABLES.USERS, {
          name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim() || "LifeLink User",
          email,
          role: role || Role.USER,
          phone: "+1 (555) 000-0000",
          location: { lat: 12.9716, lng: 77.5946, address: "Metro Central Zone", city: "Metro Central" }
        });
      }

      setUser(matched);
      return { success: true, user: matched };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      if (isConfigured && auth) {
        try {
          await createUserWithEmailAndPassword(auth, userData.email, userData.password || "Password123!");
        } catch (fbErr) {
          console.warn("Firebase Auth registration fallback:", fbErr.message);
        }
      }

      const newUser = storage.create(TABLES.USERS, {
        name: userData.name,
        email: userData.email,
        role: userData.role || Role.USER,
        phone: userData.phone || "",
        location: userData.location || { lat: 12.9716, lng: 77.5946, address: "Central Zone", city: "Metro Central" },
        bloodGroup: userData.bloodGroup || null
      });

      // If registered as donor, also create donor record
      if (userData.role === Role.DONOR) {
        storage.create(TABLES.DONORS, {
          userId: newUser.id,
          name: newUser.name,
          bloodGroup: userData.bloodGroup || "O+",
          availability: "AVAILABLE",
          isVerified: false,
          phone: newUser.phone,
          location: newUser.location,
          bio: userData.bio || "Registered voluntary donor on LifeLink.",
          totalDonations: 0
        });
      }

      setUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isConfigured && auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn("Firebase signOut:", err.message);
      }
    }
    setUser(null);
  };

  const switchRole = (newRole) => {
    if (!user) return;
    const updated = storage.update(TABLES.USERS, user.id, { role: newRole });
    setUser(updated);
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updated = storage.update(TABLES.USERS, user.id, updates);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoggedIn: Boolean(user),
        loading,
        login,
        register,
        logout,
        switchRole,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
