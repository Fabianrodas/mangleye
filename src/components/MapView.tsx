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
  "flood-zones": "#3B82D6",
  "flood-reports": "#4A6CF7",
  "estuaries": "#2A9D8F",
  "functional-mangrove": "#2DB87A",
  "degraded-mangrove": "#D4A038",
  "candidate-restoration": "#2DD4BF",
  "ecological-opportunity": "#4ADE80",
  "exposed-population": "#C04040",
  "urban-pressure": "#D4A038",
  "permeability": "#9055D0",
  "restoration-suitability": "#2DB87A",
  "priority-intervention": "#C04040",
};

const getScoreColor = (score: number) => {
  if (score >= 85) return "#C04040";
  if (score >= 75) return "#D4A038";
  return "#2A8060";
};

const getZoneIcon = (zone: Zone, isSelected: boolean) => {
  const color = getScoreColor(zone.priorityScore);
  const size = isSelected ? 28 : 20;
  const hasMangrove = zone.layers.some(l => l.includes("mangrove"));
  const isFlood = zone.floodLevel === "High";

  // SVG icon based on zone type
  let iconSvg: string;
  if (hasMangrove) {
    iconSvg = `<svg viewBox="0 0 24 24" width="${size * 0.6}" height="${size * 0.6}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"><path d="M12 3v18"/><path d="M8 7l4-4 4 4"/><path d="M6 11l6-4 6 4"/><path d="M4 15l8-4 8 4"/></svg>`;
  } else if (isFlood) {
    iconSvg = `<svg viewBox="0 0 24 24" width="${size * 0.55}" height="${size * 0.55}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"><path d="M12 2v6"/><path d="M12 12a4 4 0 0 1 0 8"/><path d="M12 12a4 4 0 0 0 0 8"/><path d="M4 18c0-2 1.5-3 3-3s3 1 3 3"/><path d="M14 18c0-2 1.5-3 3-3s3 1 3 3"/></svg>`;
  } else {
    iconSvg = `<svg viewBox="0 0 24 24" width="${size * 0.5}" height="${size * 0.5}" fill="${color}" opacity="0.8"><circle cx="12" cy="12" r="6"/></svg>`;
  }

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: white;
      border: 2.5px solid ${color};
      border-radius: ${isSelected ? '10px' : '50%'};
      box-shadow: 0 2px 8px ${color}40${isSelected ? ', 0 0 0 4px ' + color + '20' : ''};
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      cursor: pointer;
    ">${iconSvg}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const getOverlayStyle = (layer: LayerType) => {
  const color = LAYER_COLORS[layer];
  if (layer === "flood-zones" || layer === "flood-reports") {
    return { color, fillColor: color, fillOpacity: 0.12, weight: 1.5, opacity: 0.4, dashArray: "4 3" as string | undefined };
  }
  if (layer.includes("mangrove") || layer === "ecological-opportunity") {
    return { color, fillColor: color, fillOpacity: 0.08, weight: 2, opacity: 0.5, dashArray: undefined };
  }
  if (layer === "priority-intervention") {
    return { color, fillColor: color, fillOpacity: 0.15, weight: 2, opacity: 0.6, dashArray: "6 3" as string | undefined };
  }
  return { color, fillColor: color, fillOpacity: 0.08, weight: 1, opacity: 0.3, dashArray: undefined };
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

    // Light Voyager tiles — readable, professional
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
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
      const isSelected = selectedZone?.id === zone.id;
      const icon = getZoneIcon(zone, isSelected);
      const color = getScoreColor(zone.priorityScore);

      const marker = L.marker([zone.lat, zone.lng], { icon })
        .on("click", () => onSelectZone(zone));

      marker.bindTooltip(
        `<div style="font-family:Inter;font-size:12px;font-weight:600;margin-bottom:2px">${zone.name}</div>
         <div style="font-family:JetBrains Mono;font-size:11px;color:${color}">Score: ${zone.priorityScore}</div>
         <div style="font-size:10px;color:#666;margin-top:1px">${zone.zoneType} · ${zone.floodLevel} flood risk</div>`,
        {
          className: "custom-tooltip",
          direction: "top",
          offset: [0, -14],
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
        const style = getOverlayStyle(layer);
        const radius = layer === "functional-mangrove" ? 1000
          : layer === "flood-zones" ? 800
          : layer === "exposed-population" ? 600
          : layer === "priority-intervention" ? 700
          : 500;

        const circle = L.circle([zone.lat, zone.lng], {
          radius,
          ...style,
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
