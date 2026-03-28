import zonesData from "./zones.json";
import layerConfigData from "./layer-config.json";

export type Badge = "Protect" | "Restore Hydrology" | "Revegetate" | "Hybrid Infrastructure" | "Monitor First" | "Alternative Solution";
export type LayerType = "flood-zones" | "flood-reports" | "estuaries" | "functional-mangrove" | "degraded-mangrove" | "candidate-restoration" | "ecological-opportunity" | "exposed-population" | "urban-pressure" | "permeability" | "restoration-suitability" | "priority-intervention";
export type RiskLevel = "Low" | "Medium" | "High";
export type ZoneType = "Estuary Edge" | "Canal Edge" | "Urban Lowland" | "Degraded Ecological Edge" | "Hybrid Opportunity Area" | "Functional Ecological Buffer";

export interface ScoreFactor {
  label: string;
  value: number;
  max: number;
}

export interface Indicator {
  label: string;
  level: RiskLevel;
}

export interface Permeability {
  permeabilityLevel: RiskLevel;
  sealingLevel: RiskLevel;
  urbanCoverIntensity: RiskLevel;
  imperviousnessEstimate: string;
  edgeCompression: RiskLevel;
  description: string;
}

export interface Viability {
  urbanUrgency: RiskLevel;
  ecologicalViability: RiskLevel;
  socialComplexity: RiskLevel;
  implementationFeasibility: RiskLevel;
}

export interface RecommendedIntervention {
  primary: string;
  secondary: string;
  conditional: string;
}

export interface SpeciesRecommendation {
  commonName: string;
  scientificName: string;
  context: string;
  edgeType: string;
  plantingType: string;
  usageNote: string;
  mistakesToAvoid: string;
}

export interface Zone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  priorityScore: number;
  zoneType: ZoneType;
  floodLevel: RiskLevel;
  risk: string;
  opportunity: string;
  badges: Badge[];
  layers: LayerType[];
  beforeDescription: string;
  afterDescription: string;
  aiSteps: string[];
  area: string;
  population: string;
  elevation: string;
  scoreFactors: ScoreFactor[];
  riskIndicators: Indicator[];
  opportunityIndicators: Indicator[];
  preconditions: string[];
  permeability: Permeability;
  viability: Viability;
  recommendedIntervention: RecommendedIntervention;
  whyPrioritized: string[];
  speciesRecommendations: SpeciesRecommendation[];
  speciesDeferred: boolean;
  aiSummary: string;
  communityChecklist: string[];
  municipalityNote: string;
}

export const LAYER_CONFIG: Record<LayerType, { label: string; color: string; icon: string }> = layerConfigData as Record<LayerType, { label: string; color: string; icon: string }>;

export const zones: Zone[] = zonesData as Zone[];
