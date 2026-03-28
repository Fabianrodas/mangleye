import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { zones, type Zone, type LayerType, LAYER_CONFIG } from "@/data/zones";

interface MapViewProps {
  activeLayers: LayerType[];
  selectedZone: Zone | null;
  onSelectZone: (zone: Zone) => void;
}

const getScoreColor = (score: number) => {
  if (score >= 85) return "hsl(4, 65%, 46%)";
  if (score >= 75) return "hsl(38, 82%, 46%)";
  return "hsl(158, 48%, 32%)";
};

const getScoreColorHex = (score: number) => {
  if (score >= 85) return "#C04040";
  if (score >= 75) return "#D4A038";
  return "#2A8060";
};

// Compact zone label marker
const getZoneIcon = (zone: Zone, isSelected: boolean) => {
  const color = getScoreColorHex(zone.priorityScore);
  const size = isSelected ? 10 : 7;

  const iconHtml = `<div style="
    width:${size}px;height:${size}px;
    background:${color};
    border:2px solid white;
    border-radius:50%;
    box-shadow:0 1px 4px ${color}50${isSelected ? ',0 0 0 3px ' + color + '30' : ''};
    transition:all 0.2s;cursor:pointer;
  "></div>`;

  return L.divIcon({
    className: "custom-marker",
    html: iconHtml,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Create territorial mangrove vegetation pattern as many small scattered circles
const createMangroveTerritory = (zone: Zone, layer: LayerType, group: L.LayerGroup) => {
  const isFunctional = layer === "functional-mangrove";
  const isDegraded = layer === "degraded-mangrove";
  const isCandidate = layer === "candidate-restoration";
  const isEco = layer === "ecological-opportunity";

  const color = isFunctional ? "hsl(150, 55%, 38%)"
    : isDegraded ? "hsl(38, 70%, 48%)"
    : isCandidate ? "hsl(172, 50%, 42%)"
    : "hsl(140, 45%, 45%)";

  const fillOpacity = isFunctional ? 0.22 : isDegraded ? 0.16 : 0.12;
  const baseRadius = isFunctional ? 1000 : isDegraded ? 800 : isCandidate ? 700 : 600;
  const weight = isFunctional ? 2.5 : 2;

  // Main coverage area — soft filled polygon-like circle
  const mainArea = L.circle([zone.lat, zone.lng], {
    radius: baseRadius,
    color,
    fillColor: color,
    fillOpacity,
    weight,
    opacity: 0.4,
    dashArray: isFunctional ? undefined : "5 3",
  });
  group.addLayer(mainArea);

  // Scatter small vegetation dots to create texture
  const dotCount = isFunctional ? 18 : isDegraded ? 10 : 7;
  const spread = baseRadius * 0.0000085; // approx degrees for scatter

  for (let i = 0; i < dotCount; i++) {
    const angle = (Math.PI * 2 * i) / dotCount + (Math.random() - 0.5) * 0.8;
    const dist = (0.3 + Math.random() * 0.7) * spread;
    const lat = zone.lat + Math.sin(angle) * dist;
    const lng = zone.lng + Math.cos(angle) * dist;
    const r = 30 + Math.random() * (isFunctional ? 80 : 50);

    const dot = L.circle([lat, lng], {
      radius: r,
      color,
      fillColor: color,
      fillOpacity: isFunctional ? 0.45 : isDegraded ? 0.3 : 0.25,
      weight: 0.5,
      opacity: 0.3,
    });
    group.addLayer(dot);
  }

  // For degraded zones: add scattered "gap" indicators
  if (isDegraded) {
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI * 2 * i) / 4 + Math.random() * 0.5;
      const dist = spread * 0.5;
      const lat = zone.lat + Math.sin(angle) * dist;
      const lng = zone.lng + Math.cos(angle) * dist;

      const gap = L.circle([lat, lng], {
        radius: 60,
        color: "hsl(38, 70%, 48%)",
        fillColor: "hsl(38, 80%, 60%)",
        fillOpacity: 0.15,
        weight: 1.5,
        opacity: 0.5,
        dashArray: "3 3",
      });
      group.addLayer(gap);
    }
  }
};

// Create flood water overlay with wave-like concentric rings
const createFloodTerritory = (zone: Zone, layer: LayerType, group: L.LayerGroup) => {
  const isReports = layer === "flood-reports";
  const intensity = zone.floodLevel;
  const color = isReports ? "hsl(220, 65%, 52%)" : "hsl(205, 72%, 48%)";

  const baseRadius = layer === "flood-zones" ? 900 : 600;
  const fillOpacity = intensity === "High" ? 0.2 : intensity === "Medium" ? 0.12 : 0.06;
  const weight = intensity === "High" ? 2.5 : intensity === "Medium" ? 2 : 1.5;

  // Main flood area
  const main = L.circle([zone.lat, zone.lng], {
    radius: baseRadius,
    color,
    fillColor: color,
    fillOpacity,
    weight,
    opacity: intensity === "High" ? 0.6 : 0.35,
    dashArray: intensity === "High" ? undefined : "6 4",
  });
  group.addLayer(main);

  // Concentric wave rings for high/medium intensity
  const ringCount = intensity === "High" ? 3 : intensity === "Medium" ? 2 : 1;
  for (let i = 1; i <= ringCount; i++) {
    const ring = L.circle([zone.lat, zone.lng], {
      radius: baseRadius * (0.4 + i * 0.25),
      color,
      fillColor: "transparent",
      fillOpacity: 0,
      weight: intensity === "High" ? 1.5 : 1,
      opacity: 0.2 + (ringCount - i) * 0.1,
      dashArray: "4 6",
    });
    group.addLayer(ring);
  }

  // For high intensity — add gradient edge effect
  if (intensity === "High") {
    const edge = L.circle([zone.lat, zone.lng], {
      radius: baseRadius * 1.15,
      color: "hsl(4, 60%, 50%)",
      fillColor: "hsl(4, 60%, 50%)",
      fillOpacity: 0.04,
      weight: 1,
      opacity: 0.2,
      dashArray: "8 4",
    });
    group.addLayer(edge);
  }
};

// Estuary overlay — elongated water channel feel
const createEstuaryOverlay = (zone: Zone, group: L.LayerGroup) => {
  const color = "hsl(195, 60%, 42%)";

  // Main channel representation
  const main = L.circle([zone.lat, zone.lng], {
    radius: 500,
    color,
    fillColor: color,
    fillOpacity: 0.1,
    weight: 2.5,
    opacity: 0.5,
  });
  group.addLayer(main);

  // Water flow indicators — small offset shapes
  for (let i = 0; i < 3; i++) {
    const offset = (i - 1) * 0.003;
    const flow = L.circle([zone.lat + offset, zone.lng + offset * 0.5], {
      radius: 200 + i * 80,
      color,
      fillColor: color,
      fillOpacity: 0.06,
      weight: 1,
      opacity: 0.3,
      dashArray: "3 5",
    });
    group.addLayer(flow);
  }
};

// Generic analysis overlays (population, pressure, permeability, priority, suitability)
const createAnalysisOverlay = (zone: Zone, layer: LayerType, group: L.LayerGroup) => {
  const colorMap: Record<string, string> = {
    "exposed-population": "hsl(0, 65%, 52%)",
    "urban-pressure": "hsl(38, 82%, 50%)",
    "permeability": "hsl(260, 40%, 52%)",
    "restoration-suitability": "hsl(158, 50%, 40%)",
    "priority-intervention": "hsl(4, 65%, 46%)",
  };

  const color = colorMap[layer] || "hsl(200, 30%, 50%)";
  const isPriority = layer === "priority-intervention";
  const isPopulation = layer === "exposed-population";
  const radius = isPriority ? 750 : isPopulation ? 650 : 500;

  const main = L.circle([zone.lat, zone.lng], {
    radius,
    color,
    fillColor: color,
    fillOpacity: isPriority ? 0.18 : 0.1,
    weight: isPriority ? 2.5 : 1.5,
    opacity: isPriority ? 0.6 : 0.35,
    dashArray: isPriority ? "8 4" : layer === "permeability" ? "4 4" : undefined,
  });
  group.addLayer(main);

  // Priority zones get a pulsing inner marker
  if (isPriority) {
    const inner = L.circle([zone.lat, zone.lng], {
      radius: radius * 0.3,
      color,
      fillColor: color,
      fillOpacity: 0.25,
      weight: 1,
      opacity: 0.4,
    });
    group.addLayer(inner);
  }
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

  // Update markers
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
          offset: [0, -8],
        }
      );

      markersRef.current!.addLayer(marker);
    });
  }, [activeLayers, selectedZone, onSelectZone]);

  // Update territorial overlays
  useEffect(() => {
    if (!overlaysRef.current) return;
    overlaysRef.current.clearLayers();

    zones.forEach(zone => {
      zone.layers.forEach(layer => {
        if (!activeLayers.includes(layer)) return;

        if (layer === "flood-zones" || layer === "flood-reports") {
          createFloodTerritory(zone, layer, overlaysRef.current!);
        } else if (layer === "estuaries") {
          createEstuaryOverlay(zone, overlaysRef.current!);
        } else if (
          layer === "functional-mangrove" ||
          layer === "degraded-mangrove" ||
          layer === "candidate-restoration" ||
          layer === "ecological-opportunity"
        ) {
          createMangroveTerritory(zone, layer, overlaysRef.current!);
        } else {
          createAnalysisOverlay(zone, layer, overlaysRef.current!);
        }
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
