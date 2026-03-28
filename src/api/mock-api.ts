/**
 * Mock API Layer
 * Simulates real API calls with delays and Promise-based returns.
 * All data is sourced from mock JSON files.
 */

import { zones, type Zone, type LayerType } from "@/data/zones";
import zonesMockData from "@/data/zones.mock.json";
import mangroveData from "@/data/mangroves.mock.json";
import reportsData from "@/data/reports.mock.json";
import layersData from "@/data/layers.mock.json";
import dashboardData from "@/data/dashboard.json";
import realSummary from "@/data/real-data-summary.json";
import {
  computePriorityScore,
  computeRiskIndicators,
  computeOpportunityIndicators,
  computeIntervention,
  type ScoreBreakdown,
  type ComputedRiskIndicator,
  type ComputedIntervention,
} from "./priority-engine";

const LOCAL_REPORTS_KEY = "verdagua.localReports.v1";
const LOCAL_VALIDATIONS_KEY = "verdagua.reportValidations.v1";

const isBrowser = typeof window !== "undefined";

function readFromStorage<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeToStorage<T>(key: string, value: T) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures in prototype mode
  }
}

function severityWeight(severity: string) {
  if (severity === "critical") return 8;
  if (severity === "high") return 5;
  if (severity === "medium") return 3;
  return 1;
}

function baseValidationSeed(report: CitizenReport) {
  return severityWeight(report.severity) + (report.photo_count ?? 0) + (report.verified ? 3 : 0);
}

function getAllReportsSync(): CitizenReport[] {
  const localReports = readFromStorage<CitizenReport[]>(LOCAL_REPORTS_KEY, []);
  const validationMap = readFromStorage<Record<string, number>>(LOCAL_VALIDATIONS_KEY, {});

  const merged = [...localReports, ...(reportsData.reports as CitizenReport[])];

  return merged
    .map((report) => {
      const fallbackCount = report.validation_count ?? baseValidationSeed(report);
      const extraValidations = validationMap[report.id] ?? 0;
      return {
        ...report,
        validation_count: fallbackCount + extraValidations,
      };
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function computeDateRange(reports: CitizenReport[]) {
  if (reports.length === 0) {
    const now = new Date().toISOString().slice(0, 10);
    return { from: now, to: now };
  }

  const timestamps = reports.map((report) => new Date(report.timestamp).getTime()).filter((value) => Number.isFinite(value));
  const minTs = Math.min(...timestamps);
  const maxTs = Math.max(...timestamps);

  return {
    from: new Date(minTs).toISOString().slice(0, 10),
    to: new Date(maxTs).toISOString().slice(0, 10),
  };
}

function generateReportId(existingReports: CitizenReport[]) {
  return `local-${Date.now()}-${existingReports.length + 1}`;
}

function defaultCoordinatesForZone(zoneId: string) {
  const zone = zones.find((item) => item.id === zoneId);
  if (!zone) return { lat: -2.18, lng: -79.92 };

  const latOffset = (Math.random() - 0.5) * 0.01;
  const lngOffset = (Math.random() - 0.5) * 0.01;
  return {
    lat: zone.lat + latOffset,
    lng: zone.lng + lngOffset,
  };
}

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
  validation_count?: number;
}

export interface CreateCitizenReportInput {
  type: "flood" | "ecological";
  zone_id: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  water_height_cm?: number | null;
  lat?: number;
  lng?: number;
  photo_count?: number;
  verified?: boolean;
}

export async function submitCitizenReport(input: CreateCitizenReportInput): Promise<CitizenReport> {
  await delay();

  const allReports = getAllReportsSync();
  const localReports = readFromStorage<CitizenReport[]>(LOCAL_REPORTS_KEY, []);
  const fallbackCoordinates = defaultCoordinatesForZone(input.zone_id);

  const nextReport: CitizenReport = {
    id: generateReportId(allReports),
    type: input.type,
    zone_id: input.zone_id,
    lat: input.lat ?? fallbackCoordinates.lat,
    lng: input.lng ?? fallbackCoordinates.lng,
    severity: input.severity,
    water_height_cm: input.water_height_cm ?? null,
    timestamp: new Date().toISOString(),
    description: input.description.trim(),
    verified: input.verified ?? false,
    photo_count: Math.max(0, input.photo_count ?? 0),
    validation_count: 0,
  };

  writeToStorage(LOCAL_REPORTS_KEY, [nextReport, ...localReports]);
  return nextReport;
}

export async function validateCitizenReport(reportId: string): Promise<number> {
  await delay();

  const currentMap = readFromStorage<Record<string, number>>(LOCAL_VALIDATIONS_KEY, {});
  const nextMap = {
    ...currentMap,
    [reportId]: (currentMap[reportId] ?? 0) + 1,
  };

  writeToStorage(LOCAL_VALIDATIONS_KEY, nextMap);

  const report = getAllReportsSync().find((item) => item.id === reportId);
  return report?.validation_count ?? nextMap[reportId];
}

export async function getReports(): Promise<{
  metadata: {
    total_reports: number;
    flood_reports: number;
    ecological_reports: number;
    date_range: { from: string; to: string };
    source: string;
  };
  reports: CitizenReport[];
}> {
  await delay();

  const allReports = getAllReportsSync();
  const floodReports = allReports.filter((report) => report.type === "flood").length;
  const ecologicalReports = allReports.filter((report) => report.type === "ecological").length;

  return {
    metadata: {
      total_reports: allReports.length,
      flood_reports: floodReports,
      ecological_reports: ecologicalReports,
      date_range: computeDateRange(allReports),
      source: "Citizen reporting system (mock + local prototype)",
    },
    reports: allReports,
  };
}

export async function getReportsByZone(zoneId: string): Promise<CitizenReport[]> {
  await delay();
  return getAllReportsSync().filter(r => r.zone_id === zoneId);
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

  const zoneReports = getAllReportsSync().filter(r => r.zone_id === zoneId);
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

  const allReports = getAllReportsSync();
  const floodCount = allReports.filter(report => report.type === "flood").length;
  const ecologicalCount = allReports.filter(report => report.type === "ecological").length;

  const functional = mangroveData.features.filter(f => f.properties.status === "functional");
  const degraded = mangroveData.features.filter(f => f.properties.status === "degraded");
  const lost = mangroveData.features.filter(f => f.properties.status === "lost");

  const criticalReports = allReports.filter(r => r.severity === "critical");

  return {
    ...dashboardData,
    floodReports: floodCount,
    ecologicalObservations: ecologicalCount,
    mangrove_summary: {
      total_functional_ha: realSummary.mangrove_area_ha["2022"],
      total_degraded_ha: Math.abs(realSummary.net_change_ha["2018_to_2022"]),
      total_lost_ha: realSummary.change_guayas_2018_2020["POSSIBLE LOSS"] + realSummary.change_guayas_2020_2022["POSSIBLE LOSS"],
    },
    report_summary: {
      flood: floodCount,
      ecological: ecologicalCount,
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
