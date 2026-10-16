import {
  initialUsers,
  initialDonors,
  initialHospitals,
  initialPharmacies,
  initialMedicines,
  initialBloodRequests,
  initialEmergencyRequests,
  initialNotifications
} from "../data/mockData";
import { db, isConfigured } from "./firebase";
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";

export const TABLES = {
  USERS: "lifelink_users",
  DONORS: "lifelink_donors",
  HOSPITALS: "lifelink_hospitals",
  PHARMACIES: "lifelink_pharmacies",
  MEDICINES: "lifelink_medicines",
  BLOOD_REQUESTS: "lifelink_blood_requests",
  EMERGENCY_REQUESTS: "lifelink_emergency_requests",
  NOTIFICATIONS: "lifelink_notifications"
};

const FIRESTORE_MAP = {
  [TABLES.USERS]: "users",
  [TABLES.DONORS]: "donors",
  [TABLES.HOSPITALS]: "hospitals",
  [TABLES.PHARMACIES]: "pharmacies",
  [TABLES.MEDICINES]: "medicines",
  [TABLES.BLOOD_REQUESTS]: "bloodRequests",
  [TABLES.EMERGENCY_REQUESTS]: "emergencyRequests",
  [TABLES.NOTIFICATIONS]: "notifications"
};

export function initStorage() {
  if (typeof window === "undefined") return;

  const initTable = (key, defaultData) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(defaultData));
    }
  };

  initTable(TABLES.USERS, initialUsers);
  initTable(TABLES.DONORS, initialDonors);
  initTable(TABLES.HOSPITALS, initialHospitals);
  initTable(TABLES.PHARMACIES, initialPharmacies);
  initTable(TABLES.MEDICINES, initialMedicines);
  initTable(TABLES.BLOOD_REQUESTS, initialBloodRequests);
  initTable(TABLES.EMERGENCY_REQUESTS, initialEmergencyRequests);
  initTable(TABLES.NOTIFICATIONS, initialNotifications);
}

// Automatically initialize on import
initStorage();

function notifyStorageChange(table) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("lifelink:storage_updated", { detail: { table } }));
  }
}

async function syncToFirestore(action, table, id, data) {
  if (!isConfigured || !db) return;
  const colName = FIRESTORE_MAP[table];
  if (!colName) return;

  try {
    const docRef = doc(db, colName, String(id));
    if (action === "set") {
      await setDoc(docRef, { ...data, syncedAt: new Date().toISOString() }, { merge: true });
    } else if (action === "delete") {
      await deleteDoc(docRef);
    }
  } catch (err) {
    console.warn(`Firestore sync note (${action} ${colName}/${id}):`, err.message);
  }
}

export const storage = {
  TABLES,

  getAll(table) {
    try {
      const data = localStorage.getItem(table);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getById(table, id) {
    return this.getAll(table).find(item => item.id === id) || null;
  },

  create(table, item) {
    const list = this.getAll(table);
    const prefix = table.split("_")[1] || "rec";
    const newItem = {
      id: item.id || `${prefix}_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...item
    };
    list.unshift(newItem);
    localStorage.setItem(table, JSON.stringify(list));
    notifyStorageChange(table);
    syncToFirestore("set", table, newItem.id, newItem);
    return newItem;
  },

  update(table, id, updates) {
    const list = this.getAll(table);
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(table, JSON.stringify(list));
    notifyStorageChange(table);
    syncToFirestore("set", table, id, list[idx]);
    return list[idx];
  },

  remove(table, id) {
    const list = this.getAll(table).filter(item => item.id !== id);
    localStorage.setItem(table, JSON.stringify(list));
    notifyStorageChange(table);
    syncToFirestore("delete", table, id);
    return true;
  },

  async syncFromFirestore() {
    if (!isConfigured || !db) {
      throw new Error("Cloud Firestore is not configured yet.");
    }
    const result = {};
    for (const [tableKey, colName] of Object.entries(FIRESTORE_MAP)) {
      try {
        const snap = await getDocs(collection(db, colName));
        if (!snap.empty) {
          const docs = [];
          snap.forEach(d => docs.push(d.data()));
          localStorage.setItem(tableKey, JSON.stringify(docs));
          result[colName] = docs.length;
        }
      } catch (err) {
        console.warn(`Could not sync collection ${colName}:`, err.message);
      }
    }
    notifyStorageChange("all");
    return result;
  },

  exportData() {
    const backup = {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      data: {
        users: this.getAll(TABLES.USERS),
        donors: this.getAll(TABLES.DONORS),
        hospitals: this.getAll(TABLES.HOSPITALS),
        pharmacies: this.getAll(TABLES.PHARMACIES),
        medicines: this.getAll(TABLES.MEDICINES),
        bloodRequests: this.getAll(TABLES.BLOOD_REQUESTS),
        emergencyRequests: this.getAll(TABLES.EMERGENCY_REQUESTS),
        notifications: this.getAll(TABLES.NOTIFICATIONS)
      }
    };
    return JSON.stringify(backup, null, 2);
  },

  importData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      const data = parsed.data || parsed;
      if (data.users) localStorage.setItem(TABLES.USERS, JSON.stringify(data.users));
      if (data.donors) localStorage.setItem(TABLES.DONORS, JSON.stringify(data.donors));
      if (data.hospitals) localStorage.setItem(TABLES.HOSPITALS, JSON.stringify(data.hospitals));
      if (data.pharmacies) localStorage.setItem(TABLES.PHARMACIES, JSON.stringify(data.pharmacies));
      if (data.medicines) localStorage.setItem(TABLES.MEDICINES, JSON.stringify(data.medicines));
      if (data.bloodRequests) localStorage.setItem(TABLES.BLOOD_REQUESTS, JSON.stringify(data.bloodRequests));
      if (data.emergencyRequests) localStorage.setItem(TABLES.EMERGENCY_REQUESTS, JSON.stringify(data.emergencyRequests));
      if (data.notifications) localStorage.setItem(TABLES.NOTIFICATIONS, JSON.stringify(data.notifications));
      notifyStorageChange("all");
      return true;
    } catch (err) {
      throw new Error(`Failed to import database backup: ${err.message}`);
    }
  },

  resetDefaults() {
    localStorage.setItem(TABLES.USERS, JSON.stringify(initialUsers));
    localStorage.setItem(TABLES.DONORS, JSON.stringify(initialDonors));
    localStorage.setItem(TABLES.HOSPITALS, JSON.stringify(initialHospitals));
    localStorage.setItem(TABLES.PHARMACIES, JSON.stringify(initialPharmacies));
    localStorage.setItem(TABLES.MEDICINES, JSON.stringify(initialMedicines));
    localStorage.setItem(TABLES.BLOOD_REQUESTS, JSON.stringify(initialBloodRequests));
    localStorage.setItem(TABLES.EMERGENCY_REQUESTS, JSON.stringify(initialEmergencyRequests));
    localStorage.setItem(TABLES.NOTIFICATIONS, JSON.stringify(initialNotifications));
    notifyStorageChange("all");
  }
};
