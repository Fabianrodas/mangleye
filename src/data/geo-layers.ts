/**
 * Real GeoJSON layer loader.
 * Fetches actual mangrove/change GeoJSON from public/data/geo/ at runtime.
 */

import type { LayerType } from "./zones";

const GEO_LAYER_FILES: Partial<Record<LayerType, string>> = {
  "mangrove-2022": "/data/geo/guayas_mangrove_2022.geojson",
  "mangrove-2020": "/data/geo/guayas_mangrove_2020.geojson",
  "mangrove-2018": "/data/geo/guayas_mangrove_2018.geojson",
  "change-2018-2020": "/data/geo/guayas_change_2018_2020.geojson",
  "change-2020-2022": "/data/geo/guayas_change_2020_2022.geojson",
  "change-ecuador-coast": "/data/geo/ecuador_coast_change_2018_2022.geojson",
};

const cache = new Map<string, GeoJSON.FeatureCollection>();

export function isGeoLayer(layer: LayerType): boolean {
  return layer in GEO_LAYER_FILES;
}

export async function fetchGeoLayer(layer: LayerType): Promise<GeoJSON.FeatureCollection | null> {
  const file = GEO_LAYER_FILES[layer];
  if (!file) return null;

  if (cache.has(layer)) return cache.get(layer)!;

  try {
    const res = await fetch(file);
    if (!res.ok) return null;
    const data = await res.json();
    cache.set(layer, data);
    return data;
  } catch {
    console.warn(`Failed to load geo layer: ${layer}`);
    return null;
  }
}

export function getGeoLayerStyle(layer: LayerType): {
  color: string;
  fillColor: string;
  fillOpacity: number;
  weight: number;
} {
  switch (layer) {
    case "mangrove-2022":
      return { color: "#2D8B5E", fillColor: "#2D8B5E", fillOpacity: 0.45, weight: 0.8 };
    case "mangrove-2020":
      return { color: "#3A9D6E", fillColor: "#3A9D6E", fillOpacity: 0.35, weight: 0.6 };
    case "mangrove-2018":
      return { color: "#4CAF80", fillColor: "#4CAF80", fillOpacity: 0.25, weight: 0.5 };
    case "change-2018-2020":
      return { color: "#D4A038", fillColor: "#D4A038", fillOpacity: 0.4, weight: 0.8 };
    case "change-2020-2022":
      return { color: "#C07030", fillColor: "#C07030", fillOpacity: 0.4, weight: 0.8 };
    case "change-ecuador-coast":
      return { color: "#8B6914", fillColor: "#8B6914", fillOpacity: 0.3, weight: 0.6 };
    default:
      return { color: "#666", fillColor: "#666", fillOpacity: 0.2, weight: 0.5 };
  }
}

/** For change layers, style gain vs loss differently */
export function getChangeFeatureStyle(
  layer: LayerType,
  changeType: string
): { color: string; fillColor: string; fillOpacity: number; weight: number } {
  const isGain = changeType === "POSSIBLE GAIN" || changeType === "GANANCIA";
  const isLoss = changeType === "POSSIBLE LOSS" || changeType === "LOSS";

  if (isGain) {
    return { color: "#2D8B5E", fillColor: "#2D8B5E", fillOpacity: 0.5, weight: 1 };
  }
  if (isLoss) {
    return { color: "#C04040", fillColor: "#C04040", fillOpacity: 0.5, weight: 1 };
  }
  // NDVI decrease or other
  return { color: "#D4A038", fillColor: "#D4A038", fillOpacity: 0.4, weight: 0.8 };
}
