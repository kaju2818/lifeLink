export const initialUsers = [
  {
    id: "user_recipient_01",
    name: "Sarah Jenkins",
    email: "user@lifelink.org",
    role: "USER",
    phone: "+1 (555) 234-5678",
    location: { lat: 12.975, lng: 77.599, address: "42 Blossom Boulevard, Indiranagar", city: "Metro Central" },
    createdAt: new Date(Date.now() - 30 * 864e5).toISOString()
  },
  {
    id: "user_donor_01",
    name: "Marcus Vance",
    email: "donor@lifelink.org",
    role: "DONOR",
    phone: "+1 (555) 876-5432",
    location: { lat: 12.969, lng: 77.591, address: "18 Richmond Circle, Central Zone", city: "Metro Central" },
    createdAt: new Date(Date.now() - 60 * 864e5).toISOString()
  },
  {
    id: "user_hospital_01",
    name: "Dr. Evelyn Reed (Admin)",
    email: "hospital@lifelink.org",
    role: "HOSPITAL",
    phone: "+1 (555) 345-6789",
    hospitalId: "hosp_01",
    location: { lat: 12.9716, lng: 77.5946, address: "Apex Metro Medical Centre, Sector 4", city: "Metro Central" },
    createdAt: new Date(Date.now() - 90 * 864e5).toISOString()
  },
  {
    id: "user_pharmacy_01",
    name: "Robert Chen (Lead Pharmacist)",
    email: "pharmacy@lifelink.org",
    role: "PHARMACY",
    phone: "+1 (555) 456-7890",
    pharmacyId: "pharm_01",
    location: { lat: 12.973, lng: 77.592, address: "HealthPlus Super Pharmacy, Market Lane", city: "Metro Central" },
    createdAt: new Date(Date.now() - 45 * 864e5).toISOString()
  },
  {
    id: "user_admin_01",
    name: "LifeLink Governance Admin",
    email: "admin@lifelink.org",
    role: "ADMIN",
    phone: "+1 (555) 000-1122",
    location: { lat: 12.9716, lng: 77.5946, address: "LifeLink HQ, Innovation Parkway", city: "Metro Central" },
    createdAt: new Date(Date.now() - 120 * 864e5).toISOString()
  }
];

export const initialDonors = [
  {
    id: "donor_01",
    userId: "user_donor_01",
    name: "Marcus Vance",
    bloodGroup: "O-",
    availability: "AVAILABLE",
    isVerified: true,
    lastDonationDate: new Date(Date.now() - 95 * 864e5).toISOString(),
    totalDonations: 8,
    phone: "+1 (555) 876-5432",
    location: { lat: 12.969, lng: 77.591, address: "Richmond Circle, Central Zone", city: "Metro Central" },
    lastActive: new Date(Date.now() - 12 * 6e4).toISOString(),
    bio: "Universal donor committed to emergency response. Regular blood donor for 4 years."
  },
  {
    id: "donor_02",
    userId: "user_donor_02",
    name: "Priya Sharma",
    bloodGroup: "A+",
    availability: "AVAILABLE",
    isVerified: true,
    lastDonationDate: new Date(Date.now() - 110 * 864e5).toISOString(),
    totalDonations: 5,
    phone: "+1 (555) 912-3456",
    location: { lat: 12.982, lng: 77.605, address: "Cambridge Layout, Halasuru", city: "Metro Central" },
    lastActive: new Date(Date.now() - 25 * 6e4).toISOString(),
    bio: "Platelet and whole blood donor. Available on 30-minute notice."
  },
  {
    id: "donor_03",
    userId: "user_donor_03",
    name: "David Kim",
    bloodGroup: "B+",
    availability: "AVAILABLE",
    isVerified: true,
    lastDonationDate: new Date(Date.now() - 150 * 864e5).toISOString(),
    totalDonations: 12,
    phone: "+1 (555) 321-9870",
    location: { lat: 12.961, lng: 77.585, address: "Wilson Garden, 10th Cross", city: "Metro Central" },
    lastActive: new Date(Date.now() - 4 * 6e4).toISOString(),
    bio: "B+ active donor. Ready to travel within 15km for trauma cases."
  },
  {
    id: "donor_04",
    userId: "user_donor_04",
    name: "Amina El-Sayed",
    bloodGroup: "O+",
    availability: "AVAILABLE",
    isVerified: true,
    lastDonationDate: new Date(Date.now() - 180 * 864e5).toISOString(),
    totalDonations: 6,
    phone: "+1 (555) 654-7891",
    location: { lat: 12.989, lng: 77.592, address: "Vasanth Nagar, High Grounds", city: "Metro Central" },
    lastActive: new Date(Date.now() - 40 * 6e4).toISOString(),
    bio: "Healthcare volunteer and regular O+ donor."
  },
  {
    id: "donor_05",
    userId: "user_donor_05",
    name: "Liam O’Connor",
    bloodGroup: "AB-",
    availability: "RECENTLY_DONATED",
    isVerified: true,
    lastDonationDate: new Date(Date.now() - 20 * 864e5).toISOString(),
    totalDonations: 4,
    phone: "+1 (555) 789-0123",
    location: { lat: 12.955, lng: 77.61, address: "Koramangala 4th Block", city: "Metro Central" },
    lastActive: new Date(Date.now() - 2 * 36e5).toISOString(),
    bio: "Rare AB- blood group. Next eligible donation in 70 days."
  },
  {
    id: "donor_06",
    userId: "user_donor_06",
    name: "Elena Rostova",
    bloodGroup: "A-",
    availability: "AVAILABLE",
    isVerified: false,
    lastDonationDate: new Date(Date.now() - 100 * 864e5).toISOString(),
    totalDonations: 2,
    phone: "+1 (555) 234-8901",
    location: { lat: 12.977, lng: 77.581, address: "Malleshwaram 7th Cross", city: "Metro Central" },
    lastActive: new Date(Date.now() - 50 * 6e4).toISOString(),
    bio: "A Negative donor awaiting administrative verification badge."
  }
];

export const initialHospitals = [
  {
    id: "hosp_01",
    name: "Apex Metro Medical Centre",
    providerUserId: "user_hospital_01",
    address: "88 Healthcare Boulevard, Central Medical Zone",
    city: "Metro Central",
    location: { lat: 12.9716, lng: 77.5946 },
    phone: "+1 (555) 345-6789",
    emergencyHotline: "+1 (555) 999-0112",
    isVerified: true,
    status: "AVAILABLE",
    beds: {
      general: { total: 80, available: 14, status: "AVAILABLE" },
      icu: { total: 20, available: 3, status: "LIMITED" },
      emergency: { total: 15, available: 4, status: "AVAILABLE" },
      pediatric: { total: 25, available: 7, status: "AVAILABLE" }
    },
    specialties: ["Trauma & Emergency", "Cardiology", "Pulmonology", "Critical Care", "Pediatrics"],
    hasOxygen: true,
    hasVentilators: true,
    lastUpdated: new Date(Date.now() - 4 * 6e4).toISOString(),
    lastUpdatedBy: "Dr. Evelyn Reed (Chief of Operations)"
  },
  {
    id: "hosp_02",
    name: "St. Jude Memorial Hospital",
    providerUserId: "user_hospital_02",
    address: "14 Trinity Avenue, Residency Road",
    city: "Metro Central",
    location: { lat: 12.964, lng: 77.603 },
    phone: "+1 (555) 234-9988",
    emergencyHotline: "+1 (555) 999-0108",
    isVerified: true,
    status: "LIMITED",
    beds: {
      general: { total: 60, available: 5, status: "LIMITED" },
      icu: { total: 16, available: 1, status: "LIMITED" },
      emergency: { total: 12, available: 2, status: "LIMITED" },
      pediatric: { total: 15, available: 0, status: "FULL" }
    },
    specialties: ["Neurology", "Oncology", "Emergency Surgery", "Intensive Care"],
    hasOxygen: true,
    hasVentilators: true,
    lastUpdated: new Date(Date.now() - 14 * 6e4).toISOString(),
    lastUpdatedBy: "Nursing Administration Dept"
  },
  {
    id: "hosp_03",
    name: "Metro City Trauma & Multispecialty Hospital",
    providerUserId: "user_hospital_03",
    address: "210 Ring Road, Koramangala Outer Ring",
    city: "Metro Central",
    location: { lat: 12.935, lng: 77.615 },
    phone: "+1 (555) 777-4411",
    emergencyHotline: "+1 (555) 999-0199",
    isVerified: true,
    status: "AVAILABLE",
    beds: {
      general: { total: 120, available: 28, status: "AVAILABLE" },
      icu: { total: 30, available: 6, status: "AVAILABLE" },
      emergency: { total: 20, available: 8, status: "AVAILABLE" },
      pediatric: { total: 30, available: 11, status: "AVAILABLE" }
    },
    specialties: ["Level 1 Trauma", "Cardiac Surgery", "Nephrology", "Burn Unit"],
    hasOxygen: true,
    hasVentilators: true,
    lastUpdated: new Date(Date.now() - 2 * 6e4).toISOString(),
    lastUpdatedBy: "Trauma Triage Desk"
  },
  {
    id: "hosp_04",
    name: "Children & Neonatal Care Institute",
    providerUserId: "user_hospital_04",
    address: "5 West End Park, Malleshwaram",
    city: "Metro Central",
    location: { lat: 12.991, lng: 77.571 },
    phone: "+1 (555) 888-2233",
    emergencyHotline: "+1 (555) 999-0102",
    isVerified: true,
    status: "AVAILABLE",
    beds: {
      general: { total: 40, available: 12, status: "AVAILABLE" },
      icu: { total: 12, available: 4, status: "AVAILABLE" },
      emergency: { total: 8, available: 3, status: "AVAILABLE" },
      pediatric: { total: 50, available: 18, status: "AVAILABLE" }
    },
    specialties: ["Pediatric Intensive Care", "Neonatal Care", "Pediatric Surgery"],
    hasOxygen: true,
    hasVentilators: true,
    lastUpdated: new Date(Date.now() - 35 * 6e4).toISOString(),
    lastUpdatedBy: "NICU Coordinator"
  }
];

export const initialPharmacies = [
  {
    id: "pharm_01",
    name: "HealthPlus Super Pharmacy",
    providerUserId: "user_pharmacy_01",
    address: "24 Market Lane, Commercial Street",
    city: "Metro Central",
    location: { lat: 12.973, lng: 77.592 },
    phone: "+1 (555) 456-7890",
    isVerified: true,
    operatingHours: "24 Hours Open",
    lastUpdated: new Date(Date.now() - 5 * 6e4).toISOString()
  },
  {
    id: "pharm_02",
    name: "Apollo Lifeline Chemist",
    providerUserId: "user_pharmacy_02",
    address: "112 Brigade Road Junction",
    city: "Metro Central",
    location: { lat: 12.971, lng: 77.608 },
    phone: "+1 (555) 678-1234",
    isVerified: true,
    operatingHours: "7:00 AM - 11:30 PM",
    lastUpdated: new Date(Date.now() - 18 * 6e4).toISOString()
  },
  {
    id: "pharm_03",
    name: "MedCare 24/7 Community Drugs",
    providerUserId: "user_pharmacy_03",
    address: "77 100ft Road, Indiranagar",
    city: "Metro Central",
    location: { lat: 12.978, lng: 77.64 },
    phone: "+1 (555) 890-5678",
    isVerified: true,
    operatingHours: "24 Hours Open",
    lastUpdated: new Date(Date.now() - 45 * 6e4).toISOString()
  }
];

export const initialMedicines = [
  {
    id: "med_01",
    pharmacyId: "pharm_01",
    pharmacyName: "HealthPlus Super Pharmacy",
    name: "Dolo 650",
    genericName: "Paracetamol",
    strength: "650mg",
    dosageForm: "Tablet",
    packSize: "Strip of 15 Tablets",
    category: "Analgesics",
    manufacturer: "Micro Labs Ltd",
    batchNumber: "ML-650A",
    expiryDate: "2027-05",
    isRxRequired: false,
    quantity: 450,
    status: "AVAILABLE",
    price: 34,
    lastUpdated: new Date(Date.now() - 5 * 6e4).toISOString()
  },
  {
    id: "med_02",
    pharmacyId: "pharm_01",
    pharmacyName: "HealthPlus Super Pharmacy",
    name: "Augmentin 625 Duo",
    genericName: "Amoxicillin + Potassium Clavulanate",
    strength: "625mg",
    dosageForm: "Tablet",
    packSize: "Strip of 10 Tablets",
    category: "Antibiotics",
    manufacturer: "GlaxoSmithKline (GSK)",
    batchNumber: "GSK-2401",
    expiryDate: "2026-11",
    isRxRequired: true,
    quantity: 85,
    status: "AVAILABLE",
    price: 172.5,
    lastUpdated: new Date(Date.now() - 15 * 6e4).toISOString()
  },
  {
    id: "med_03",
    pharmacyId: "pharm_01",
    pharmacyName: "HealthPlus Super Pharmacy",
    name: "Asthalin Inhaler",
    genericName: "Salbutamol / Albuterol Sulfate",
    strength: "100mcg (200 MDI)",
    dosageForm: "Inhaler",
    packSize: "1 Inhaler Canister",
    category: "Respiratory",
    manufacturer: "Cipla Ltd",
    batchNumber: "CIP-8812",
    expiryDate: "2027-02",
    isRxRequired: true,
    quantity: 12,
    status: "LOW_STOCK",
    price: 165,
    lastUpdated: new Date(Date.now() - 25 * 6e4).toISOString()
  },
  {
    id: "med_04",
    pharmacyId: "pharm_01",
    pharmacyName: "HealthPlus Super Pharmacy",
    name: "Lantus SoloStar Pen",
    genericName: "Insulin Glargine",
    strength: "100 IU/ml (3ml)",
    dosageForm: "Injection",
    packSize: "1 Pre-filled Pen",
    category: "Diabetes",
    manufacturer: "Sanofi India",
    batchNumber: "SNF-9021",
    expiryDate: "2026-08",
    isRxRequired: true,
    quantity: 6,
    status: "LOW_STOCK",
    price: 645,
    lastUpdated: new Date(Date.now() - 30 * 6e4).toISOString()
  },
  {
    id: "med_05",
    pharmacyId: "pharm_02",
    pharmacyName: "Apollo Lifeline Chemist",
    name: "Telmikind Beta 50",
    genericName: "Telmisartan 40mg + Metoprolol Succinate 50mg",
    strength: "40mg / 50mg",
    dosageForm: "Tablet",
    packSize: "Strip of 10 Tablets",
    category: "Cardiovascular",
    manufacturer: "Mankind Pharma",
    batchNumber: "MK-7410",
    expiryDate: "2027-04",
    isRxRequired: true,
    quantity: 120,
    status: "AVAILABLE",
    price: 138,
    lastUpdated: new Date(Date.now() - 10 * 6e4).toISOString()
  },
  {
    id: "med_06",
    pharmacyId: "pharm_02",
    pharmacyName: "Apollo Lifeline Chemist",
    name: "Azithral 500",
    genericName: "Azithromycin",
    strength: "500mg",
    dosageForm: "Tablet",
    packSize: "Strip of 5 Tablets",
    category: "Antibiotics",
    manufacturer: "Alembic Pharmaceuticals",
    batchNumber: "ALM-3320",
    expiryDate: "2026-12",
    isRxRequired: true,
    quantity: 60,
    status: "AVAILABLE",
    price: 121,
    lastUpdated: new Date(Date.now() - 22 * 6e4).toISOString()
  },
  {
    id: "med_07",
    pharmacyId: "pharm_02",
    pharmacyName: "Apollo Lifeline Chemist",
    name: "Atorva 20",
    genericName: "Atorvastatin",
    strength: "20mg",
    dosageForm: "Tablet",
    packSize: "Strip of 15 Tablets",
    category: "Cardiovascular",
    manufacturer: "Zydus Lifesciences",
    batchNumber: "ZYD-5502",
    expiryDate: "2027-01",
    isRxRequired: true,
    quantity: 0,
    status: "UNAVAILABLE",
    price: 185,
    lastUpdated: new Date(Date.now() - 60 * 6e4).toISOString()
  },
  {
    id: "med_08",
    pharmacyId: "pharm_03",
    pharmacyName: "MedCare 24/7 Community Drugs",
    name: "Pan-D Capsule",
    genericName: "Pantoprazole 40mg + Domperidone 30mg SR",
    strength: "40mg / 30mg",
    dosageForm: "Capsule",
    packSize: "Strip of 15 Capsules",
    category: "Gastrointestinal",
    manufacturer: "Alkem Laboratories",
    batchNumber: "ALK-1044",
    expiryDate: "2027-07",
    isRxRequired: true,
    quantity: 90,
    status: "AVAILABLE",
    price: 215,
    lastUpdated: new Date(Date.now() - 45 * 6e4).toISOString()
  }
];

export const initialBloodRequests = [
  {
    id: "req_b_01",
    requesterId: "user_recipient_01",
    requesterName: "Sarah Jenkins",
    patientName: "Arthur Jenkins",
    bloodGroup: "O-",
    unitsNeeded: 2,
    hospitalName: "Apex Metro Medical Centre",
    location: { lat: 12.9716, lng: 77.5946, address: "Central Medical Zone", city: "Metro Central" },
    urgency: "CRITICAL",
    status: "REQUEST_SENT",
    assignedDonorId: "donor_01",
    assignedDonorName: "Marcus Vance",
    notes: "Urgent cardiovascular bypass surgery scheduled tomorrow at 8:00 AM. Crossmatch ready.",
    contactPhone: "+1 (555) 234-5678",
    createdAt: new Date(Date.now() - 25 * 6e4).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 6e4).toISOString()
  },
  {
    id: "req_b_02",
    requesterId: "user_recipient_02",
    requesterName: "Michael Chang",
    patientName: "Claire Chang",
    bloodGroup: "B+",
    unitsNeeded: 1,
    hospitalName: "St. Jude Memorial Hospital",
    location: { lat: 12.964, lng: 77.603, address: "Residency Road", city: "Metro Central" },
    urgency: "URGENT",
    status: "ACCEPTED",
    assignedDonorId: "donor_03",
    assignedDonorName: "David Kim",
    notes: "Severe anemia transfusion required in Ward 4B.",
    contactPhone: "+1 (555) 888-9900",
    createdAt: new Date(Date.now() - 120 * 6e4).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 6e4).toISOString()
  }
];

export const initialEmergencyRequests = [
  {
    id: "emg_01",
    requesterId: "user_recipient_01",
    type: "ICU_BED",
    urgency: "CRITICAL",
    location: { lat: 12.9716, lng: 77.5946, address: "Outer Ring Road, Junction 4" },
    contactName: "Sarah Jenkins",
    contactPhone: "+1 (555) 234-5678",
    details: "Acute respiratory distress in elderly patient requiring immediate ventilator support.",
    status: "ACCEPTED",
    assignedProviderName: "Apex Metro Medical Centre",
    createdAt: new Date(Date.now() - 35 * 6e4).toISOString(),
    resolvedAt: null
  }
];

export const initialNotifications = [
  {
    id: "notif_01",
    recipientUserId: "user_donor_01",
    title: "Urgent Blood Request Nearby",
    message: "Sarah Jenkins requested 2 units of O- at Apex Metro Medical Centre (1.2 km away).",
    type: "REQUEST",
    isRead: false,
    relatedId: "req_b_01",
    createdAt: new Date(Date.now() - 15 * 6e4).toISOString()
  },
  {
    id: "notif_02",
    recipientUserId: "user_recipient_01",
    title: "Donor Matched & Alerted",
    message: "Your emergency blood request was dispatched to nearby verified donor Marcus Vance.",
    type: "UPDATE",
    isRead: true,
    relatedId: "req_b_01",
    createdAt: new Date(Date.now() - 24 * 6e4).toISOString()
  },
  {
    id: "notif_03",
    recipientUserId: "user_hospital_01",
    title: "ICU Availability Updated",
    message: "Bed status successfully broadcasted. 3 ICU beds currently reported available.",
    type: "UPDATE",
    isRead: true,
    relatedId: null,
    createdAt: new Date(Date.now() - 4 * 6e4).toISOString()
  }
];

export const emergencyHelplines = [
  { id: "108", name: "National Emergency Ambulance", number: "108", description: "24/7 Immediate Trauma & Medical Emergency", category: "Ambulance", isPrimary: true },
  { id: "102", name: "Maternal & Child Free Ambulance", number: "102", description: "Pregnancy, infant & neo-natal urgent transfer", category: "Maternal", isPrimary: false },
  { id: "1075", name: "National Health Authority Helpline", number: "1075", description: "Hospital bed coordination & epidemic alerts", category: "Hospital", isPrimary: false },
  { id: "112", name: "All-in-One Unified National Helpline", number: "112", description: "Police, Fire, Ambulance & Disaster Response", category: "Unified", isPrimary: true },
  { id: "blood_helpline", name: "National Blood Transfusion Council", number: "104", description: "Centralized blood component locator", category: "Blood", isPrimary: false }
];
