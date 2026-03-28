/**
 * Mock API Layer
 * Simulates real API calls with delays and Promise-based returns.
 * All data is sourced from mock JSON files.
 */

import { zones, type Zone, type LayerType } from "@/data/zones";
import zonesMockData from "@/data/zones.mock.json";
import mangroveData from "@/data/mangroves.mock.geojson";
import reportsData from "@/data/reports.mock.json";
import layersData from "@/data/layers.mock.json";
import dashboardData from "@/data/dashboard.json";
import {
  computePriorityScore,
  computeRiskIndicators,
  computeOpportunityIndicators,
  computeIntervention,
  type ScoreBreakdown,
  type ComputedRiskIndicator,
  type ComputedIntervention,
} from "./priority-engine";

// Simulate network delay (300–800ms)
const delay = () => new Promise<void>(resolve => {
  setTimeout(resolve, 300 + Math.random() * 500);
});

// ─── Zone APIs ───

export async function getZones(): Promise<Zone[]> {
  await delay();
  return zones;
}

export async function getZoneById(id: string): Promise<Zone | null> {
  await delay();
  return zones.find(z => z.id === id) || null;
}

// ─── Mangrove Layer ───

export interface MangroveFeature {
  id: string;
  zone_id: string;
  status: "functional" | "degraded" | "lost";
  year: number;
  area_hectares: number;
  change_type: "gain" | "loss" | "stable";
  original_area_hectares: number;
  canopy_height_m: number;
  biomass_tons_ha: number;
  species_dominant: string;
  threat: string | null;
  geometry: GeoJSON.Polygon;
}

export async function getMangroveLayer(): Promise<{
  features: MangroveFeature[];
  summary: {
    total_functional_ha: number;
    total_degraded_ha: number;
    total_lost_ha: number;
    net_change_ha: number;
  };
}> {
  await delay();

  const features = mangroveData.features.map(f => ({
    id: f.properties.id,
    zone_id: f.properties.zone_id,
    status: f.properties.status as "functional" | "degraded" | "lost",
    year: f.properties.year,
    area_hectares: f.properties.area_hectares,
    change_type: f.properties.change_type as "gain" | "loss" | "stable",
    original_area_hectares: f.properties.original_area_hectares,
    canopy_height_m: f.properties.canopy_height_m,
    biomass_tons_ha: f.properties.biomass_tons_ha,
    species_dominant: f.properties.species_dominant,
    threat: f.properties.threat,
    geometry: f.geometry as GeoJSON.Polygon,
  }));

  const functional = features.filter(f => f.status === "functional");
  const degraded = features.filter(f => f.status === "degraded");
  const lost = features.filter(f => f.status === "lost");

  return {
    features,
    summary: {
      total_functional_ha: functional.reduce((s, f) => s + f.area_hectares, 0),
      total_degraded_ha: degraded.reduce((s, f) => s + f.area_hectares, 0),
      total_lost_ha: lost.reduce((s, f) => s + f.original_area_hectares, 0),
      net_change_ha: functional.reduce((s, f) => s + f.area_hectares, 0) - 
        features.reduce((s, f) => s + f.original_area_hectares, 0),
    },
  };
}

// ─── Flood Layer ───

export interface FloodZoneData {
  zone_id: string;
  risk_level: string;
  depth_5yr_m: number;
  depth_100yr_m: number;
  affected_area_pct: number;
}

export async function getFloodLayer(): Promise<{
  source: string;
  resolution_m: number;
  zones: FloodZoneData[];
}> {
  await delay();
  const floodLayer = layersData.layers["flood-zones"];
  return {
    source: floodLayer.source,
    resolution_m: floodLayer.resolution_m,
    zones: floodLayer.zones,
  };
}

// ─── Reports ───

export interface CitizenReport {
  id: string;
  type: "flood" | "ecological";
  zone_id: string;
  lat: number;
  lng: number;
  severity: string;
  water_height_cm: number | null;
  timestamp: string;
  description: string;
  verified: boolean;
  photo_count: number;
}

export async function getReports(): Promise<{
  metadata: typeof reportsData.metadata;
  reports: CitizenReport[];
}> {
  await delay();
  return {
    metadata: reportsData.metadata,
    reports: reportsData.reports as CitizenReport[],
  };
}

export async function getReportsByZone(zoneId: string): Promise<CitizenReport[]> {
  await delay();
  return (reportsData.reports as CitizenReport[]).filter(r => r.zone_id === zoneId);
}

// ─── Priority Score ───

export async function getPriorityScore(zoneId: string): Promise<ScoreBreakdown | null> {
  await delay();
  const mockZone = zonesMockData.find(z => z.id === zoneId);
  if (!mockZone) return null;
  return computePriorityScore(mockZone as any);
}

// ─── Zone Detail (computed dynamically) ───

export interface ZoneAnalysis {
  score: ScoreBreakdown;
  riskIndicators: ComputedRiskIndicator[];
  opportunityIndicators: ComputedRiskIndicator[];
  intervention: ComputedIntervention;
  reportCount: number;
  mangroveStats: {
    functional_ha: number;
    degraded_ha: number;
    lost_original_ha: number;
  };
}

export async function getZoneAnalysis(zoneId: string): Promise<ZoneAnalysis | null> {
  await delay();

  const mockZone = zonesMockData.find(z => z.id === zoneId);
  if (!mockZone) return null;

  const zoneReports = reportsData.reports.filter(r => r.zone_id === zoneId);
  const zoneMangroves = mangroveData.features.filter(f => f.properties.zone_id === zoneId);

  const score = computePriorityScore(mockZone as any);
  const riskIndicators = computeRiskIndicators(mockZone as any, zoneReports.length);
  const opportunityIndicators = computeOpportunityIndicators(mockZone as any);
  const intervention = computeIntervention(mockZone as any, score);

  const functional = zoneMangroves.filter(f => f.properties.status === "functional");
  const degraded = zoneMangroves.filter(f => f.properties.status === "degraded");
  const lost = zoneMangroves.filter(f => f.properties.status === "lost");

  return {
    score,
    riskIndicators,
    opportunityIndicators,
    intervention,
    reportCount: zoneReports.length,
    mangroveStats: {
      functional_ha: functional.reduce((s, f) => s + f.properties.area_hectares, 0),
      degraded_ha: degraded.reduce((s, f) => s + f.properties.area_hectares, 0),
      lost_original_ha: lost.reduce((s, f) => s + f.properties.original_area_hectares, 0),
    },
  };
}

// ─── Dashboard Metrics ───

export async function getDashboardMetrics(): Promise<typeof dashboardData & {
  mangrove_summary: {
    total_functional_ha: number;
    total_degraded_ha: number;
    total_lost_ha: number;
  };
  report_summary: {
    flood: number;
    ecological: number;
    critical: number;
  };
}> {
  await delay();

  const functional = mangroveData.features.filter(f => f.properties.status === "functional");
  const degraded = mangroveData.features.filter(f => f.properties.status === "degraded");
  const lost = mangroveData.features.filter(f => f.properties.status === "lost");

  const criticalReports = reportsData.reports.filter(r => r.severity === "critical");

  return {
    ...dashboardData,
    mangrove_summary: {
      total_functional_ha: functional.reduce((s, f) => s + f.properties.area_hectares, 0),
      total_degraded_ha: degraded.reduce((s, f) => s + f.properties.area_hectares, 0),
      total_lost_ha: lost.reduce((s, f) => s + f.properties.original_area_hectares, 0),
    },
    report_summary: {
      flood: reportsData.metadata.flood_reports,
      ecological: reportsData.metadata.ecological_reports,
      critical: criticalReports.length,
    },
  };
}

// ─── Layer Data ───

export async function getLayerData(layerType: LayerType): Promise<Record<string, unknown> | null> {
  await delay();
  const layer = (layersData.layers as Record<string, unknown>)[layerType];
  return layer ? (layer as Record<string, unknown>) : null;
}

// ─── All Layers metadata ───

export async function getAllLayers(): Promise<typeof layersData> {
  await delay();
  return layersData;
}
