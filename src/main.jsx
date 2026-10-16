import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
