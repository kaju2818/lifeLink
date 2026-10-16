import React, { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_COORDS = {
  lat: 12.9716,
  lng: 77.5946,
  city: "Metro Central",
  address: "Central Healthcare Zone, MG Road"
};

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [coords, setCoords] = useState(() => {
    try {
      const saved = localStorage.getItem("lifelink_user_location");
      return saved ? JSON.parse(saved) : DEFAULT_COORDS;
    } catch {
      return DEFAULT_COORDS;
    }
  });

  const [isLocating, setIsLocating] = useState(false);
  const [isGpsActive, setIsGpsActive] = useState(false);

  useEffect(() => {
    if (coords) {
      localStorage.setItem("lifelink_user_location", JSON.stringify(coords));
    }
  }, [coords]);

  const requestGpsLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        let city = "Local Area";
        let address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`
          );
          if (res.ok) {
            const data = await res.json();
            city = data.address?.city || data.address?.town || data.address?.suburb || "Detected Location";
            address = data.display_name?.split(",").slice(0, 2).join(",") || address;
          }
        } catch {
          // Keep fallback coordinates
        }

        const newLoc = { lat, lng, city, address };
        setCoords(newLoc);
        setIsGpsActive(true);
        setIsLocating(false);
      },
      (err) => {
        console.warn("GPS detection note:", err.message);
        setIsLocating(false);
        setIsGpsActive(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const setManualLocation = (newLoc) => {
    setCoords(prev => ({ ...prev, ...newLoc }));
    setIsGpsActive(false);
  };

  return (
    <LocationContext.Provider
      value={{
        coords,
        isLocating,
        isGpsActive,
        requestGpsLocation,
        setManualLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocation must be used within LocationProvider");
  return context;
}
