import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { zones, type Zone, type LayerType, LAYER_CONFIG } from "@/data/zones";
import { isGeoLayer, fetchGeoLayer, getGeoLayerStyle, getChangeFeatureStyle } from "@/data/geo-layers";

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

// Seeded pseudo-random for deterministic scatter
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

// ─── SVG Icon Templates ───

const svgWaves = (color: string, intensity: string) => {
  const op = intensity === "High" ? 0.7 : intensity === "Medium" ? 0.5 : 0.35;
  const strokeW = intensity === "High" ? 2 : 1.5;
  return `
<svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 8 C6 4, 10 4, 14 8 S22 12, 26 8 S30 4, 34 8" stroke="${color}" stroke-width="${strokeW}" stroke-opacity="${op}" fill="none"/>
  <path d="M2 14 C6 10, 10 10, 14 14 S22 18, 26 14 S30 10, 34 14" stroke="${color}" stroke-width="${strokeW}" stroke-opacity="${op * 0.7}" fill="none"/>
  <path d="M2 20 C6 16, 10 16, 14 20 S22 24, 26 20 S30 16, 34 20" stroke="${color}" stroke-width="${strokeW * 0.8}" stroke-opacity="${op * 0.45}" fill="none"/>
</svg>`;
};

const svgFloodDrop = (color: string, intensity: string) => {
  const op = intensity === "High" ? 0.75 : intensity === "Medium" ? 0.55 : 0.4;
  return `
<svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 2 C10 2, 2 12, 2 16 C2 20.4 5.6 24 10 24 C14.4 24 18 20.4 18 16 C18 12 10 2 10 2Z" fill="${color}" fill-opacity="${op}" stroke="${color}" stroke-width="1" stroke-opacity="${op * 0.8}"/>
  <ellipse cx="7" cy="15" rx="2" ry="1.5" fill="white" fill-opacity="0.25"/>
</svg>`;
};

const svgEstuary = (color: string) => `
<svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 11 Q8 5, 15 11 T28 11" stroke="${color}" stroke-width="2.5" stroke-opacity="0.6" fill="none"/>
  <path d="M2 16 Q8 10, 15 16 T28 16" stroke="${color}" stroke-width="1.5" stroke-opacity="0.4" fill="none"/>
  <circle cx="8" cy="11" r="2" fill="${color}" fill-opacity="0.3"/>
  <circle cx="22" cy="11" r="2.5" fill="${color}" fill-opacity="0.25"/>
</svg>`;

const svgPopulation = (color: string) => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="7" r="3" fill="${color}" fill-opacity="0.6"/>
  <circle cx="16" cy="7" r="3" fill="${color}" fill-opacity="0.5"/>
  <path d="M2 20 C2 15, 5 13, 8 13 C11 13 12.5 14, 12 15" fill="${color}" fill-opacity="0.3"/>
  <path d="M10 20 C10 15, 13 13, 16 13 C19 13 22 15, 22 20" fill="${color}" fill-opacity="0.25"/>
</svg>`;

const svgUrbanPressure = (color: string) => `
<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="10" width="6" height="14" rx="1" fill="${color}" fill-opacity="0.5"/>
  <rect x="10" y="5" width="6" height="19" rx="1" fill="${color}" fill-opacity="0.6"/>
  <rect x="17" y="8" width="6" height="16" rx="1" fill="${color}" fill-opacity="0.45"/>
  <line x1="0" y1="24" x2="26" y2="24" stroke="${color}" stroke-width="1.5" stroke-opacity="0.4"/>
</svg>`;

const svgPriority = (color: string) => `
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="14,2 17,10 26,10 19,16 21,25 14,20 7,25 9,16 2,10 11,10" fill="${color}" fill-opacity="0.55" stroke="${color}" stroke-width="1.2" stroke-opacity="0.7"/>
</svg>`;

const svgLeaf = (color: string) => `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 20 Q4 8, 16 4 Q20 4, 20 8 Q20 18, 8 20 Z" fill="${color}" fill-opacity="0.45" stroke="${color}" stroke-width="1" stroke-opacity="0.5"/>
  <path d="M4 20 Q10 14, 16 4" stroke="${color}" stroke-width="0.8" stroke-opacity="0.4" fill="none"/>
</svg>`;

// ─── Layer icon builder (only for non-geo layers) ───

const getLayerIcon = (layer: LayerType, zone: Zone) => {
  const configs: Record<string, { svg: string; size: [number, number] }> = {
    "flood-zones": { svg: svgWaves("#2E6EB5", zone.floodLevel), size: [36, 24] },
    "flood-reports": { svg: svgFloodDrop("#2E6EB5", zone.floodLevel), size: [20, 26] },
    "estuaries": { svg: svgEstuary("#3A8FA7"), size: [30, 22] },
    "exposed-population": { svg: svgPopulation("#C04040"), size: [24, 24] },
    "urban-pressure": { svg: svgUrbanPressure("#D4A038"), size: [26, 26] },
    "permeability": { svg: svgLeaf("#6B52AE"), size: [24, 24] },
    "restoration-suitability": { svg: svgLeaf("#2A8060"), size: [26, 26] },
    "priority-intervention": { svg: svgPriority("#C04040"), size: [28, 28] },
  };

  const cfg = configs[layer] || { svg: svgLeaf("#666"), size: [24, 24] as [number, number] };

  return L.divIcon({
    className: "layer-icon",
    html: cfg.svg,
    iconSize: cfg.size,
    iconAnchor: [cfg.size[0] / 2, cfg.size[1] / 2],
  });
};

// ─── Zone score marker ───

const getZoneIcon = (zone: Zone, isSelected: boolean) => {
  const color = getScoreColorHex(zone.priorityScore);
  const w = isSelected ? 54 : 44;
  const h = isSelected ? 28 : 24;

  const iconHtml = `<div style="
    display:flex;align-items:center;gap:4px;
    padding:3px 8px;
    background:white;
    border:2px solid ${color};
    border-radius:${isSelected ? '10px' : '8px'};
    box-shadow:0 2px 8px ${color}35${isSelected ? ',0 0 0 3px ' + color + '22' : ''};
    transition:all 0.2s;cursor:pointer;
    white-space:nowrap;
  ">
    <div style="width:8px;height:8px;border-radius:50%;background:${color}"></div>
    <span style="font-family:JetBrains Mono;font-size:11px;font-weight:700;color:${color}">${zone.priorityScore}</span>
  </div>`;

  return L.divIcon({
    className: "custom-marker",
    html: iconHtml,
    iconSize: [w, h],
    iconAnchor: [w / 2, h / 2],
  });
};

// ─── Territorial overlays (for non-geo layers only) ───

const createTerritorialOverlay = (zone: Zone, layer: LayerType, group: L.LayerGroup) => {
  const colorMap: Record<string, string> = {
    "flood-zones": "hsl(220, 65%, 52%)",
    "flood-reports": "hsl(205, 72%, 48%)",
    "estuaries": "hsl(195, 60%, 42%)",
    "exposed-population": "hsl(0, 65%, 52%)",
    "urban-pressure": "hsl(38, 82%, 50%)",
    "permeability": "hsl(260, 40%, 52%)",
    "restoration-suitability": "hsl(158, 50%, 40%)",
    "priority-intervention": "hsl(4, 65%, 46%)",
  };

  const color = colorMap[layer];
  if (!color) return; // geo layers handled separately

  const isFlood = layer === "flood-zones" || layer === "flood-reports";
  const isPriority = layer === "priority-intervention";

  let radius = 600;
  let fillOpacity = 0.12;
  let weight = 1.5;
  let dashArray: string | undefined;

  if (isFlood) {
    const intensity = zone.floodLevel;
    radius = layer === "flood-zones" ? 950 : 650;
    fillOpacity = intensity === "High" ? 0.22 : intensity === "Medium" ? 0.14 : 0.08;
    weight = intensity === "High" ? 2.5 : 2;
    dashArray = intensity === "High" ? undefined : "6 4";
  } else if (layer === "estuaries") {
    radius = 500;
    fillOpacity = 0.15;
    weight = 2.5;
  } else if (isPriority) {
    radius = 850;
    fillOpacity = 0.18;
    weight = 2.5;
    dashArray = "8 4";
  } else {
    radius = 550;
    fillOpacity = 0.1;
    dashArray = "5 4";
  }

  const main = L.circle([zone.lat, zone.lng], {
    radius, color, fillColor: color, fillOpacity, weight, opacity: 0.45, dashArray,
  });
  group.addLayer(main);

  if (isFlood && (zone.floodLevel === "High" || zone.floodLevel === "Medium")) {
    const ringCount = zone.floodLevel === "High" ? 2 : 1;
    for (let i = 1; i <= ringCount; i++) {
      const ring = L.circle([zone.lat, zone.lng], {
        radius: radius * (0.5 + i * 0.2), color, fillColor: "transparent", fillOpacity: 0, weight: 1.5, opacity: 0.25, dashArray: "4 6",
      });
      group.addLayer(ring);
    }
  }

  if (isPriority) {
    const inner = L.circle([zone.lat, zone.lng], {
      radius: radius * 0.3, color, fillColor: color, fillOpacity: 0.3, weight: 1.5, opacity: 0.5,
    });
    group.addLayer(inner);
  }
};

// ─── Scatter layer icons for non-geo layers ───

const scatterLayerIcons = (zone: Zone, layer: LayerType, group: L.LayerGroup) => {
  const seed = zone.lat * 1000 + zone.lng * 1000 + layer.charCodeAt(0);
  const isFlood = layer === "flood-zones" || layer === "flood-reports";

  const count = isFlood
    ? (zone.floodLevel === "High" ? 5 : zone.floodLevel === "Medium" ? 3 : 2)
    : layer === "estuaries" ? 3
    : layer === "priority-intervention" ? 2
    : 2;

  const spread = isFlood ? 0.007 : 0.005;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (seededRandom(seed + i) - 0.5) * 1.2;
    const dist = (0.3 + seededRandom(seed + i + 50) * 0.7) * spread;
    const lat = zone.lat + Math.sin(angle) * dist;
    const lng = zone.lng + Math.cos(angle) * dist;

    const icon = getLayerIcon(layer, zone);
    const marker = L.marker([lat, lng], { icon, interactive: false });
    group.addLayer(marker);
  }
};

export default function MapView({ activeLayers, selectedZone, onSelectZone }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const overlaysRef = useRef<L.LayerGroup | null>(null);
  const geoLayersRef = useRef<L.LayerGroup | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingLayers, setLoadingLayers] = useState<Set<string>>(new Set());

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
    geoLayersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update zone score markers
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

  // Update non-geo overlays (flood, urban, etc.)
  useEffect(() => {
    if (!overlaysRef.current) return;
    overlaysRef.current.clearLayers();

    const nonGeoLayers = activeLayers.filter(l => !isGeoLayer(l));

    zones.forEach(zone => {
      zone.layers.forEach(layer => {
        if (!nonGeoLayers.includes(layer)) return;
        createTerritorialOverlay(zone, layer, overlaysRef.current!);
        scatterLayerIcons(zone, layer, overlaysRef.current!);
      });
    });
  }, [activeLayers]);

  // Load and render real GeoJSON layers
  useEffect(() => {
    if (!geoLayersRef.current) return;
    geoLayersRef.current.clearLayers();

    const geoLayers = activeLayers.filter(l => isGeoLayer(l));
    if (geoLayers.length === 0) return;

    const loading = new Set<string>();
    geoLayers.forEach(l => loading.add(l));
    setLoadingLayers(loading);

    geoLayers.forEach(async (layer) => {
      const data = await fetchGeoLayer(layer);
      if (!data || !geoLayersRef.current) return;

      const isChangeLayer = layer.startsWith("change-");
      const defaultStyle = getGeoLayerStyle(layer);

      const geoJsonLayer = L.geoJSON(data, {
        style: (feature) => {
          if (isChangeLayer && feature?.properties?.change_type) {
            return getChangeFeatureStyle(layer, feature.properties.change_type);
          }
          return defaultStyle;
        },
        onEachFeature: (feature, featureLayer) => {
          const props = feature.properties;
          let tooltip = "";

          if (isChangeLayer) {
            const changeType = props.change_type || "Unknown";
            const areaHa = props.area_ha?.toFixed(2) || "—";
            tooltip = `<b>${changeType}</b><br/>${areaHa} ha`;
          } else {
            const areaHa = props.area_ha?.toFixed(2) || "—";
            tooltip = `<b>Mangrove ${props.year || ""}</b><br/>${areaHa} ha`;
          }

          featureLayer.bindTooltip(tooltip, {
            className: "custom-tooltip",
            sticky: true,
          });
        },
      });

      geoLayersRef.current!.addLayer(geoJsonLayer);

      setLoadingLayers(prev => {
        const next = new Set(prev);
        next.delete(layer);
        return next;
      });
    });
  }, [activeLayers]);

  useEffect(() => {
    if (selectedZone && mapRef.current) {
      mapRef.current.flyTo([selectedZone.lat, selectedZone.lng], 14, { duration: 0.8 });
    }
  }, [selectedZone]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {loadingLayers.size > 0 && (
        <div className="absolute top-3 right-3 z-[1000] glass-panel px-3 py-2 flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-[11px] text-muted-foreground">Loading layers…</span>
        </div>
      )}
    </div>
  );
}
