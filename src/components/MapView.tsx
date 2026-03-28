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

// Tree cluster SVGs for mangrove markers
const createMangroveCluster = (density: "high" | "medium" | "low", color: string) => {
  const trees = density === "high" ? 5 : density === "medium" ? 3 : 2;
  const positions = [
    [12, 8], [6, 14], [18, 14], [10, 18], [16, 20],
  ].slice(0, trees);

  const treePaths = positions.map(([x, y]) =>
    `<g transform="translate(${x},${y})">
      <path d="M0,-6 L-4,0 L-2,0 L-5,5 L5,5 L2,0 L4,0 Z" fill="${color}" opacity="0.85"/>
      <rect x="-0.7" y="5" width="1.4" height="3" fill="#5D4037" opacity="0.6"/>
    </g>`
  ).join("");

  return `<svg viewBox="0 0 24 28" width="36" height="42">${treePaths}</svg>`;
};

// Wave pattern for flood markers
const createWaveMarker = (intensity: "High" | "Medium" | "Low", color: string) => {
  const opacity = intensity === "High" ? "0.9" : intensity === "Medium" ? "0.7" : "0.5";
  const waves = intensity === "High" ? 3 : intensity === "Medium" ? 2 : 1;
  const wavePaths = [];
  for (let i = 0; i < waves; i++) {
    const y = 10 + i * 6;
    wavePaths.push(
      `<path d="M2,${y} Q8,${y - 4} 12,${y} Q16,${y + 4} 22,${y}" fill="none" stroke="${color}" stroke-width="${intensity === "High" ? 2.5 : 2}" stroke-linecap="round" opacity="${opacity}"/>`
    );
  }
  return `<svg viewBox="0 0 24 28" width="32" height="36">${wavePaths.join("")}</svg>`;
};

const getZoneIcon = (zone: Zone, isSelected: boolean) => {
  const color = getScoreColor(zone.priorityScore);
  const size = isSelected ? 52 : 40;
  const hasMangrove = zone.layers.some(l => l.includes("mangrove"));
  const hasFlood = zone.floodLevel === "High" || zone.floodLevel === "Medium";

  let iconHtml: string;

  if (hasMangrove) {
    const density = zone.layers.includes("functional-mangrove") ? "high"
      : zone.layers.includes("degraded-mangrove") ? "medium" : "low";
    const treeColor = zone.layers.includes("degraded-mangrove") ? "#D4A038" : "#2DB87A";
    iconHtml = `<div style="
      width:${size}px;height:${size}px;
      background:hsl(158 45% 96%);
      border:2px solid ${treeColor};
      border-radius:${isSelected ? '14px' : '12px'};
      box-shadow:0 3px 12px ${treeColor}30${isSelected ? ',0 0 0 4px ' + treeColor + '18' : ''};
      display:flex;align-items:center;justify-content:center;
      transition:all 0.2s;cursor:pointer;
    ">${createMangroveCluster(density, treeColor)}</div>`;
  } else if (hasFlood) {
    iconHtml = `<div style="
      width:${size}px;height:${size}px;
      background:hsl(205 70% 96%);
      border:2px solid ${color};
      border-radius:${isSelected ? '14px' : '12px'};
      box-shadow:0 3px 12px ${color}30${isSelected ? ',0 0 0 4px ' + color + '18' : ''};
      display:flex;align-items:center;justify-content:center;
      transition:all 0.2s;cursor:pointer;
    ">${createWaveMarker(zone.floodLevel, color)}</div>`;
  } else {
    iconHtml = `<div style="
      width:${size}px;height:${size}px;
      background:white;
      border:2.5px solid ${color};
      border-radius:${isSelected ? '14px' : '50%'};
      box-shadow:0 3px 12px ${color}25${isSelected ? ',0 0 0 4px ' + color + '18' : ''};
      display:flex;align-items:center;justify-content:center;
      transition:all 0.2s;cursor:pointer;
    ">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="${color}" opacity="0.8"><circle cx="12" cy="12" r="6"/></svg>
    </div>`;
  }

  return L.divIcon({
    className: "custom-marker",
    html: iconHtml,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Create overlay patterns
const createFloodOverlay = (zone: Zone, layer: LayerType) => {
  const color = LAYER_COLORS[layer];
  const intensity = zone.floodLevel;
  const fillOpacity = intensity === "High" ? 0.18 : intensity === "Medium" ? 0.12 : 0.06;
  const weight = intensity === "High" ? 2.5 : intensity === "Medium" ? 2 : 1.5;
  const radius = layer === "flood-zones" ? 900 : 650;

  return L.circle([zone.lat, zone.lng], {
    radius,
    color,
    fillColor: color,
    fillOpacity,
    weight,
    opacity: intensity === "High" ? 0.6 : 0.4,
    dashArray: intensity === "High" ? undefined : "6 4",
  });
};

const createMangroveOverlay = (zone: Zone, layer: LayerType) => {
  const isFunctional = layer === "functional-mangrove";
  const color = isFunctional ? "#2DB87A" : layer === "degraded-mangrove" ? "#D4A038" : "#2DD4BF";
  const radius = isFunctional ? 1100 : 800;
  const fillOpacity = isFunctional ? 0.12 : 0.08;

  return L.circle([zone.lat, zone.lng], {
    radius,
    color,
    fillColor: color,
    fillOpacity,
    weight: isFunctional ? 2.5 : 2,
    opacity: isFunctional ? 0.5 : 0.4,
    dashArray: isFunctional ? undefined : "4 4",
  });
};

const createGenericOverlay = (zone: Zone, layer: LayerType) => {
  const color = LAYER_COLORS[layer];
  const isPriority = layer === "priority-intervention";
  const radius = isPriority ? 750 : layer === "exposed-population" ? 600 : 500;

  return L.circle([zone.lat, zone.lng], {
    radius,
    color,
    fillColor: color,
    fillOpacity: isPriority ? 0.16 : 0.08,
    weight: isPriority ? 2.5 : 1.5,
    opacity: isPriority ? 0.6 : 0.3,
    dashArray: isPriority ? "8 4" : undefined,
  });
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

    // Light Voyager with labels — readable, professional
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
          offset: [0, -20],
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

        let overlay: L.Circle;
        if (layer === "flood-zones" || layer === "flood-reports") {
          overlay = createFloodOverlay(zone, layer);
        } else if (layer.includes("mangrove") || layer === "candidate-restoration" || layer === "ecological-opportunity") {
          overlay = createMangroveOverlay(zone, layer);
        } else {
          overlay = createGenericOverlay(zone, layer);
        }
        overlaysRef.current!.addLayer(overlay);
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
