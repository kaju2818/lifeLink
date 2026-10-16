import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { storage, TABLES } from "../services/storage";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [donors, setDonors] = useState(() => storage.getAll(TABLES.DONORS));
  const [hospitals, setHospitals] = useState(() => storage.getAll(TABLES.HOSPITALS));
  const [pharmacies, setPharmacies] = useState(() => storage.getAll(TABLES.PHARMACIES));
  const [medicines, setMedicines] = useState(() => storage.getAll(TABLES.MEDICINES));
  const [bloodRequests, setBloodRequests] = useState(() => storage.getAll(TABLES.BLOOD_REQUESTS));
  const [emergencyRequests, setEmergencyRequests] = useState(() => storage.getAll(TABLES.EMERGENCY_REQUESTS));
  const [notifications, setNotifications] = useState(() => storage.getAll(TABLES.NOTIFICATIONS));

  const refreshData = useCallback(() => {
    setDonors(storage.getAll(TABLES.DONORS));
    setHospitals(storage.getAll(TABLES.HOSPITALS));
    setPharmacies(storage.getAll(TABLES.PHARMACIES));
    setMedicines(storage.getAll(TABLES.MEDICINES));
    setBloodRequests(storage.getAll(TABLES.BLOOD_REQUESTS));
    setEmergencyRequests(storage.getAll(TABLES.EMERGENCY_REQUESTS));
    setNotifications(storage.getAll(TABLES.NOTIFICATIONS));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      refreshData();
    };

    window.addEventListener("lifelink:storage_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("lifelink:storage_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refreshData]);

  // Actions
  const requestBlood = (data) => {
    const newReq = storage.create(TABLES.BLOOD_REQUESTS, {
      ...data,
      status: "REQUEST_SENT"
    });

    // Notify matching donors
    storage.create(TABLES.NOTIFICATIONS, {
      recipientUserId: data.assignedDonorId || "all_donors",
      title: `Emergency ${data.bloodGroup} Blood Request`,
      message: `${data.requesterName} urgently needs ${data.unitsNeeded} units of ${data.bloodGroup} at ${data.hospitalName}.`,
      type: "REQUEST",
      isRead: false,
      relatedId: newReq.id
    });

    return newReq;
  };

  const updateBloodRequestStatus = (id, status, updates = {}) => {
    return storage.update(TABLES.BLOOD_REQUESTS, id, { status, ...updates });
  };

  const updateBedAvailability = (hospitalId, bedUpdates) => {
    const hosp = storage.getById(TABLES.HOSPITALS, hospitalId);
    if (!hosp) return null;
    const updatedBeds = { ...hosp.beds, ...bedUpdates };
    return storage.update(TABLES.HOSPITALS, hospitalId, {
      beds: updatedBeds,
      lastUpdated: new Date().toISOString()
    });
  };

  const updateMedicineStock = (medId, updates) => {
    return storage.update(TABLES.MEDICINES, medId, {
      ...updates,
      lastUpdated: new Date().toISOString()
    });
  };

  const createEmergencySOS = (sosData) => {
    const newSos = storage.create(TABLES.EMERGENCY_REQUESTS, {
      ...sosData,
      status: "ACTIVE"
    });

    storage.create(TABLES.NOTIFICATIONS, {
      recipientUserId: "all_hospitals",
      title: "CRITICAL: Emergency SOS Alert",
      message: `Emergency request for ${sosData.type} dispatched from ${sosData.location?.address || "Nearby"}.`,
      type: "REQUEST",
      isRead: false,
      relatedId: newSos.id
    });

    return newSos;
  };

  const toggleDonorAvailability = (donorId, availability) => {
    return storage.update(TABLES.DONORS, donorId, {
      availability,
      lastActive: new Date().toISOString()
    });
  };

  const markNotificationRead = (notifId) => {
    storage.update(TABLES.NOTIFICATIONS, notifId, { isRead: true });
  };

  const clearAllNotifications = () => {
    const notifs = storage.getAll(TABLES.NOTIFICATIONS).map(n => ({ ...n, isRead: true }));
    localStorage.setItem(TABLES.NOTIFICATIONS, JSON.stringify(notifs));
    refreshData();
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DataContext.Provider
      value={{
        donors,
        hospitals,
        pharmacies,
        medicines,
        bloodRequests,
        emergencyRequests,
        notifications,
        unreadCount,
        requestBlood,
        updateBloodRequestStatus,
        updateBedAvailability,
        updateMedicineStock,
        createEmergencySOS,
        toggleDonorAvailability,
        markNotificationRead,
        clearAllNotifications,
        refreshData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
}
