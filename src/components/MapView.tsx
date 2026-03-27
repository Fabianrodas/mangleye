import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { zones, type Zone, type LayerType, LAYER_CONFIG } from "@/data/zones";

interface MapViewProps {
  activeLayers: LayerType[];
  selectedZone: Zone | null;
  onSelectZone: (zone: Zone) => void;
}

const LAYER_COLORS: Record<LayerType, string> = {
  "flood-zones": "#3B8DD6",
  "flood-reports": "#4A6CF7",
  "estuaries": "#2A9D8F",
  "functional-mangrove": "#2DB87A",
  "degraded-mangrove": "#E8A838",
  "candidate-restoration": "#2DD4BF",
  "ecological-opportunity": "#4ADE80",
  "exposed-population": "#D94848",
  "urban-pressure": "#E8A838",
  "permeability": "#A855F7",
  "restoration-suitability": "#2DB87A",
  "priority-intervention": "#D94848",
};

const getScoreColor = (score: number) => {
  if (score >= 85) return "#D94848";
  if (score >= 75) return "#E8A838";
  return "#2DB87A";
};

export default function MapView({ activeLayers, selectedZone, onSelectZone }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const overlaysRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [-2.18, -79.92],
      zoom: 12,
      zoomControl: false,
      attributionControl: true,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    overlaysRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!markersRef.current) return;
    markersRef.current.clearLayers();

    const filteredZones = zones.filter(z =>
      activeLayers.length === 0 || z.layers.some(l => activeLayers.includes(l))
    );

    filteredZones.forEach(zone => {
      const color = getScoreColor(zone.priorityScore);
      const isSelected = selectedZone?.id === zone.id;
      const size = isSelected ? 20 : 14;

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: ${size}px; height: ${size}px;
          background: ${color};
          border: 2px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.4)'};
          border-radius: 50%;
          box-shadow: 0 0 ${isSelected ? 24 : 12}px ${color}80;
          transition: all 0.2s;
          cursor: pointer;
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([zone.lat, zone.lng], { icon })
        .on("click", () => onSelectZone(zone));

      marker.bindTooltip(
        `<div style="font-family:Inter;font-size:12px;font-weight:600;margin-bottom:2px">${zone.name}</div>
         <div style="font-family:JetBrains Mono;font-size:11px;color:${color}">Score: ${zone.priorityScore}</div>
         <div style="font-size:10px;color:#888;margin-top:1px">${zone.zoneType} · ${zone.floodLevel} flood risk</div>`,
        {
          className: "custom-tooltip",
          direction: "top",
          offset: [0, -12],
        }
      );

      markersRef.current!.addLayer(marker);
    });
  }, [activeLayers, selectedZone, onSelectZone]);

  useEffect(() => {
    if (!overlaysRef.current) return;
    overlaysRef.current.clearLayers();

    zones.forEach(zone => {
      zone.layers.forEach(layer => {
        if (!activeLayers.includes(layer)) return;
        const color = LAYER_COLORS[layer];
        const radius = layer === "functional-mangrove" ? 900 : layer === "flood-zones" ? 700 : layer === "exposed-population" ? 500 : 450;
        const circle = L.circle([zone.lat, zone.lng], {
          radius,
          color,
          fillColor: color,
          fillOpacity: 0.1,
          weight: 1,
          opacity: 0.25,
        });
        overlaysRef.current!.addLayer(circle);
      });
    });
  }, [activeLayers]);

  useEffect(() => {
    if (selectedZone && mapRef.current) {
      mapRef.current.flyTo([selectedZone.lat, selectedZone.lng], 14, { duration: 0.8 });
    }
  }, [selectedZone]);

  return <div ref={containerRef} className="w-full h-full" />;
}
