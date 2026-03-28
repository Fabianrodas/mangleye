/**
 * Priority Score Engine
 * Computes zone priority scores dynamically from mock environmental data.
 * 
 * Priority Score (0–100) =
 *   Flood Vulnerability  (0–40)
 *   Population Exposure   (0–20)
 *   Proximity to Estuary  (0–20)
 *   Ecological Degradation(0–20)
 */

import type { RiskLevel } from "@/data/zones";

export interface ScoreBreakdown {
  total: number;
  factors: {
    label: string;
    value: number;
    max: number;
    qualitative: "high" | "medium" | "low";
  }[];
}

export interface ComputedRiskIndicator {
  label: string;
  level: RiskLevel;
}

export interface ComputedIntervention {
  primary: string;
  secondary: string;
  conditional: string;
  whyPrioritized: string[];
}

// Zone mock data shape (from zones.mock.json)
interface ZoneMockData {
  id: string;
  flood_vulnerability: { score: number; max: number; factors: Record<string, unknown> };
  population_exposure: { score: number; max: number; factors: Record<string, unknown> };
  estuary_proximity: { score: number; max: number; factors: Record<string, unknown> };
  ecological_degradation: { score: number; max: number; factors: Record<string, unknown> };
  restoration_suitability: number;
  social_benefit_potential: number;
  land_use: string;
  zoneType: string;
  area_ha: number;
  population_adjacent: number;
}

const qualitative = (value: number, max: number): "high" | "medium" | "low" => {
  const pct = value / max;
  if (pct >= 0.75) return "high";
  if (pct >= 0.45) return "medium";
  return "low";
};

const riskFromQualitative = (q: "high" | "medium" | "low"): RiskLevel =>
  q === "high" ? "High" : q === "medium" ? "Medium" : "Low";

export function computePriorityScore(zone: ZoneMockData): ScoreBreakdown {
  const factors = [
    { label: "Flood Vulnerability", value: zone.flood_vulnerability.score, max: zone.flood_vulnerability.max },
    { label: "Population Exposure", value: zone.population_exposure.score, max: zone.population_exposure.max },
    { label: "Proximity to Estuary", value: zone.estuary_proximity.score, max: zone.estuary_proximity.max },
    { label: "Ecological Degradation", value: zone.ecological_degradation.score, max: zone.ecological_degradation.max },
  ];

  const total = factors.reduce((sum, f) => sum + f.value, 0);

  return {
    total,
    factors: factors.map(f => ({
      ...f,
      qualitative: qualitative(f.value, f.max),
    })),
  };
}

export function computeRiskIndicators(zone: ZoneMockData, reportCount: number): ComputedRiskIndicator[] {
  const floodFactors = zone.flood_vulnerability.factors as {
    drainage_obstruction: boolean;
    historical_events_last_decade: number;
    elevation_deficit_m: number;
  };

  const indicators: ComputedRiskIndicator[] = [
    {
      label: "Repeated Flooding",
      level: riskFromQualitative(qualitative(zone.flood_vulnerability.score, zone.flood_vulnerability.max)),
    },
    {
      label: "Drainage Obstruction",
      level: floodFactors.drainage_obstruction ? "High" : "Low",
    },
    {
      label: "Urban Pressure",
      level: riskFromQualitative(qualitative(zone.population_exposure.score, zone.population_exposure.max)),
    },
    {
      label: "Natural Edge Loss",
      level: riskFromQualitative(qualitative(zone.ecological_degradation.score, zone.ecological_degradation.max)),
    },
  ];

  // Citizen reports boost risk
  if (reportCount >= 5) {
    indicators.push({ label: "Citizen Report Density", level: "High" });
  } else if (reportCount >= 2) {
    indicators.push({ label: "Citizen Report Density", level: "Medium" });
  }

  return indicators;
}

export function computeOpportunityIndicators(zone: ZoneMockData): ComputedRiskIndicator[] {
  return [
    {
      label: "Edge Connectivity",
      level: riskFromQualitative(qualitative(zone.estuary_proximity.score, zone.estuary_proximity.max)),
    },
    {
      label: "Restoration Potential",
      level: zone.restoration_suitability >= 0.7 ? "High" : zone.restoration_suitability >= 0.45 ? "Medium" : "Low",
    },
    {
      label: "Expected Urban Benefit",
      level: zone.social_benefit_potential >= 0.7 ? "High" : zone.social_benefit_potential >= 0.45 ? "Medium" : "Low",
    },
    {
      label: "Hybrid Intervention Potential",
      level: zone.restoration_suitability >= 0.6 && zone.social_benefit_potential >= 0.5 ? "High" : "Medium",
    },
  ];
}

export function computeIntervention(zone: ZoneMockData, score: ScoreBreakdown): ComputedIntervention {
  const floodQ = score.factors[0].qualitative;
  const ecoQ = score.factors[3].qualitative;
  const popQ = score.factors[1].qualitative;

  let primary = "";
  let secondary = "";
  let conditional = "";
  const whyPrioritized: string[] = [];

  // Logic based on environmental data relationships
  if (ecoQ === "high" && zone.restoration_suitability >= 0.7) {
    primary = "Ecological restoration with native mangrove species along degraded edge";
    whyPrioritized.push("Severe ecological degradation with high restoration suitability");
  } else if (floodQ === "high") {
    primary = "Hybrid flood infrastructure combining engineered drainage with green buffers";
    whyPrioritized.push("Critical flood vulnerability requiring immediate intervention");
  } else {
    primary = "Monitoring and preventive maintenance of existing ecological buffers";
    whyPrioritized.push("Moderate risk levels suitable for preventive approach");
  }

  if (popQ === "high") {
    secondary = "Community resilience program with early warning systems and evacuation routes";
    whyPrioritized.push(`High population exposure: ~${(zone.population_adjacent / 1000).toFixed(0)}K adjacent residents`);
  } else {
    secondary = "Environmental education and community stewardship program";
  }

  if (zone.land_use.includes("informal")) {
    conditional = "Conditional on land tenure regularization and community relocation planning";
    whyPrioritized.push("Informal settlement patterns require social coordination");
  } else if (zone.land_use.includes("industrial")) {
    conditional = "Conditional on industrial runoff mitigation and contamination assessment";
    whyPrioritized.push("Industrial land use creates contamination risk for restoration");
  } else {
    conditional = "Standard environmental impact assessment required before construction";
  }

  if (score.total >= 85) {
    whyPrioritized.push(`Priority score ${score.total}/100 places this zone in critical intervention tier`);
  }

  return { primary, secondary, conditional, whyPrioritized };
}
