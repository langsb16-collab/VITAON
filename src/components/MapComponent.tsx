import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

// Required for leaflet icons to show up correctly
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    center?: [number, number];
    zoom?: number;
    hospitals?: Array<{ name: string; position: [number, number]; address: string }>;
}

export const MapComponent = ({ center = [37.5665, 126.9780], zoom = 13, hospitals = [] }: MapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView(center, zoom);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance.current);
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (mapInstance.current) {
            // Clear existing markers
            mapInstance.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    mapInstance.current?.removeLayer(layer);
                }
            });

            // Add new markers
            hospitals.forEach(h => {
                L.marker(h.position)
                    .addTo(mapInstance.current!)
                    .bindPopup(`<b>${h.name}</b><br>${h.address}`);
            });

            if (hospitals.length > 0) {
              const bounds = L.latLngBounds(hospitals.map(h => h.position));
              mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }, [hospitals]);

    return (
        <div className="w-full h-full min-h-[400px] border border-slate-200" ref={mapRef} id="map" />
    );
};
