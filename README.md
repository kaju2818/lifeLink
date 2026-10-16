# LifeLink — Healthcare Availability & Emergency Assistance

LifeLink is a decentralized, rapid healthcare availability platform connecting voluntary blood donors, hospital ICU/trauma beds, and live pharmacy medicine stocks in real-time.

## Features
- **Blood Donor Matching:** Filter donors by rare blood groups (O-, A-, AB-, etc.), distance, and verification status with 1-click broadcast alerts.
- **Hospital Bed Availability:** Live counts of General, ICU, Emergency Trauma, and Pediatric beds, with Oxygen and Ventilator readiness indicators.
- **24/7 Pharmacy Stock:** Search medicines by generic salt, therapeutic category, prescription requirements, and live pharmacy open hours.
- **Emergency Triage SOS:** 1-tap emergency dispatch broadcasting to all nearby healthcare teams, plus direct click-to-call national helplines (108, 102, 1075, 112).
- **Stakeholder Dashboards:** Dedicated role-based portals for Patients, Voluntary Donors, Hospital Admins, Pharmacists, and Network Governance.

## Quick Start
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production (e.g. Netlify / Vercel)
npm run build
```

## Backend Configuration
The app runs seamlessly in **Zero-Config Reactive Local State Mode** right out of the box, with full support for **Firebase Cloud Firestore & Authentication** configured in `src/services/firebase.js`.
