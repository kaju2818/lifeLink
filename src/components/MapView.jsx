import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView({
  center = [12.9716, 77.5946],
  zoom = 13,
  markers = [],
  className = "h-[450px] w-full rounded-2xl"
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    layerGroupRef.current.clearLayers();

    markers.forEach((m) => {
      if (!m.lat || !m.lng) return;

      const marker = L.marker([m.lat, m.lng]);
      if (m.title || m.popupContent) {
        marker.bindPopup(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
            <strong style="font-size: 13px; color: #0f172a; display: block; margin-bottom: 2px;">${m.title || "Location"}</strong>
            <div style="font-size: 11px; color: #64748b; line-height: 1.4;">${m.popupContent || ""}</div>
          </div>
        `);
      }
      layerGroupRef.current.addLayer(marker);
    });

    if (markers.length > 0 && mapInstanceRef.current) {
      const group = L.featureGroup(layerGroupRef.current.getLayers());
      if (group.getBounds().isValid()) {
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.2));
      }
    }
  }, [markers]);

  return (
    <div className={`overflow-hidden border border-slate-200/80 shadow-xs relative ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full z-10" />
    </div>
  );
}
