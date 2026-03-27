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

export const LAYER_CONFIG: Record<LayerType, { label: string; color: string; icon: string }> = {
  "flood-zones": { label: "Flood Zones", color: "hsl(205, 75%, 50%)", icon: "Droplets" },
  "flood-reports": { label: "Public Flood Reports", color: "hsl(220, 70%, 55%)", icon: "MessageSquare" },
  "estuaries": { label: "Estuaries & Water Edges", color: "hsl(195, 70%, 42%)", icon: "Waves" },
  "functional-mangrove": { label: "Functional Mangrove Areas", color: "hsl(150, 60%, 40%)", icon: "TreePine" },
  "degraded-mangrove": { label: "Sensitive / Degraded Mangrove", color: "hsl(30, 80%, 50%)", icon: "AlertTriangle" },
  "candidate-restoration": { label: "Candidate Restoration Zones", color: "hsl(180, 60%, 45%)", icon: "Target" },
  "ecological-opportunity": { label: "Ecological Opportunity Areas", color: "hsl(140, 50%, 45%)", icon: "Sprout" },
  "exposed-population": { label: "Exposed Population", color: "hsl(0, 65%, 55%)", icon: "Users" },
  "urban-pressure": { label: "Urban Pressure", color: "hsl(38, 90%, 55%)", icon: "Building2" },
  "permeability": { label: "Permeability / Surface Sealing", color: "hsl(270, 50%, 55%)", icon: "Layers" },
  "restoration-suitability": { label: "Restoration Suitability", color: "hsl(168, 60%, 45%)", icon: "CheckCircle" },
  "priority-intervention": { label: "Priority Intervention Areas", color: "hsl(0, 70%, 55%)", icon: "Zap" },
};

export const zones: Zone[] = [
  {
    id: "z1",
    name: "Estero Salado – Urdesa Stretch",
    lat: -2.1700,
    lng: -79.9200,
    priorityScore: 92,
    zoneType: "Estuary Edge",
    floodLevel: "High",
    risk: "High flooding risk due to natural channel obstruction and mangrove cover loss. Untreated wastewater discharge directly into the estuary. Significant urban encroachment along the waterfront.",
    opportunity: "Restoration of the estuary edge with green infrastructure. High potential for a linear park combining phytodepuration, public access, and ecological recovery.",
    badges: ["Restore Hydrology", "Revegetate", "Hybrid Infrastructure"],
    layers: ["flood-zones", "estuaries", "degraded-mangrove", "candidate-restoration", "priority-intervention"],
    beforeDescription: "Obstructed channel, illegal landfills, degraded mangrove fringe, visible contamination, no public access to waterfront",
    afterDescription: "Restored edge with recovered mangrove fringe, constructed wetland for water treatment, elevated pedestrian boardwalk, community gathering spaces",
    aiSteps: [
      "Remove landfills and debris from estuary channel (0–3 months)",
      "Install sediment traps and floating waste barriers (1–2 months)",
      "Plant Rhizophora mangle and Avicennia germinans in 15m strips (3–6 months)",
      "Build constructed wetland for greywater treatment (6–12 months)",
      "Design elevated boardwalk on low-impact pilings with solar lighting (12–18 months)",
      "Establish quarterly water quality and vegetation coverage monitoring"
    ],
    area: "12.4 ha",
    population: "~45,000 adjacent residents",
    elevation: "1.2 – 3.5 masl",
    scoreFactors: [
      { label: "Flood Vulnerability", value: 36, max: 40 },
      { label: "Population Exposure", value: 17, max: 20 },
      { label: "Proximity to Estuary", value: 18, max: 20 },
      { label: "Ecological Degradation", value: 14, max: 20 },
      { label: "Restoration Suitability", value: 12, max: 15 },
      { label: "Expected Social Benefit", value: 11, max: 15 },
    ],
    riskIndicators: [
      { label: "Repeated Flooding", level: "High" },
      { label: "Drainage Obstruction", level: "High" },
      { label: "Urban Pressure", level: "High" },
      { label: "Natural Edge Loss", level: "High" },
    ],
    opportunityIndicators: [
      { label: "Edge Connectivity", level: "High" },
      { label: "Restoration Potential", level: "High" },
      { label: "Expected Urban Benefit", level: "High" },
      { label: "Hybrid Intervention Potential", level: "High" },
    ],
    preconditions: [
      "Verify hydrological connectivity to main estuary channel",
      "Assess water quality for heavy metals and organic pollutants",
      "Confirm soil suitability for mangrove root establishment",
      "Check salinity and moisture regime compatibility",
      "Identify and resolve illegal occupancy or physical barriers",
      "Field validation of current edge conditions required",
      "Confirm elevation and tidal regime for planting zones"
    ],
    permeability: {
      permeabilityLevel: "Low",
      sealingLevel: "High",
      urbanCoverIntensity: "High",
      imperviousnessEstimate: "~78%",
      edgeCompression: "High",
      description: "This sector has high surface sealing due to dense urbanization on both banks, reducing infiltration and increasing runoff pressure on the estuary channel."
    },
    viability: {
      urbanUrgency: "High",
      ecologicalViability: "High",
      socialComplexity: "Medium",
      implementationFeasibility: "Medium",
    },
    recommendedIntervention: {
      primary: "Restore Hydrology",
      secondary: "Revegetate with Native Species",
      conditional: "Hybrid Green-Blue Infrastructure (if public access demand confirmed)",
    },
    whyPrioritized: [
      "Highest citizen-reported flooding frequency in the city",
      "Large exposed population within 200m of estuary edge",
      "Direct estuarine edge with measurable degradation",
      "Ecological edge loss exceeding 60% over 20 years",
      "Strong community demand for waterfront restoration",
    ],
    speciesRecommendations: [
      {
        commonName: "Red Mangrove",
        scientificName: "Rhizophora mangle",
        context: "Intertidal zone restoration along estuary edges",
        edgeType: "Estuary Edge",
        plantingType: "Direct water-edge planting",
        usageNote: "Plant in clusters at mean tide level. Requires tidal inundation twice daily.",
        mistakesToAvoid: "Do not plant above high-tide line or in fully sealed soils",
      },
      {
        commonName: "Buttonwood Mangrove",
        scientificName: "Conocarpus erectus",
        context: "Transitional zone between urban edge and mangrove fringe",
        edgeType: "Urban Edge Support",
        plantingType: "Transitional planting",
        usageNote: "Excellent for urban buffer zones. Tolerates drier conditions than Rhizophora.",
        mistakesToAvoid: "Avoid waterlogged conditions; needs firmer substrate",
      },
      {
        commonName: "Beach Hibiscus",
        scientificName: "Hibiscus tiliaceus",
        context: "Support vegetation for riparian and transitional corridors",
        edgeType: "Transition Zone",
        plantingType: "Support vegetation",
        usageNote: "Use along boardwalk edges and constructed wetland perimeters for shade and erosion control.",
        mistakesToAvoid: "Not a substitute for mangrove; use as complementary only",
      },
    ],
    speciesDeferred: false,
    aiSummary: "This stretch of the Estero Salado in Urdesa represents the highest-priority intervention zone in the platform. The combination of severe flooding recurrence, high population exposure, and significant ecological degradation creates an urgent but also highly opportunistic scenario. Hydrological restoration should precede any planting, with debris and landfill removal as the first step. The site is well-suited for a phased approach combining wetland construction, native mangrove planting, and public access infrastructure.",
    communityChecklist: [
      "Report any active flooding or debris accumulation via the platform",
      "Avoid dumping waste near estuary edges",
      "Participate in community monitoring of water quality",
      "Support local restoration planting events",
      "Advocate for protected waterfront buffer zone designation"
    ],
    municipalityNote: "This zone requires coordinated action between the Dirección de Medio Ambiente, EMAPAG (water utility), and urban planning. A phased restoration strategy beginning with channel clearing and water quality improvement is recommended before any vegetative restoration. Public-private partnership opportunities exist for the boardwalk component.",
  },
  {
    id: "z2",
    name: "Isla Trinitaria – Southern Sector",
    lat: -2.2350,
    lng: -79.9150,
    priorityScore: 88,
    zoneType: "Degraded Ecological Edge",
    floodLevel: "High",
    risk: "Informal settlement built on filled mangrove areas. Extreme vulnerability to high tides and heavy rainfall. Zero drainage infrastructure in most sectors.",
    opportunity: "Partial relocation program with mangrove regeneration. Natural coastal buffer against tidal flooding. Community-led monitoring potential.",
    badges: ["Protect", "Restore Hydrology", "Revegetate"],
    layers: ["flood-zones", "degraded-mangrove", "urban-pressure", "priority-intervention", "exposed-population"],
    beforeDescription: "Precarious housing on filled mangrove substrate, recurrent flooding, zero drainage, contaminated waterways",
    afterDescription: "Regenerated mangrove buffer, relocated housing to safe zones, sustainable drainage, community monitoring stations",
    aiSteps: [
      "Map and census critical-risk housing units (0–2 months)",
      "Design consensual relocation plan with community leaders (2–6 months)",
      "Remove fill material and restore natural mangrove topography (6–12 months)",
      "Reforest 8 hectares with native mangrove species (12–24 months)",
      "Install sustainable drainage in relocated housing areas (12–18 months)",
      "Establish community-led ecosystem monitoring program"
    ],
    area: "28.7 ha",
    population: "~12,000 at-risk residents",
    elevation: "0.5 – 2.1 masl",
    scoreFactors: [
      { label: "Flood Vulnerability", value: 34, max: 40 },
      { label: "Population Exposure", value: 18, max: 20 },
      { label: "Proximity to Estuary", value: 16, max: 20 },
      { label: "Ecological Degradation", value: 16, max: 20 },
      { label: "Restoration Suitability", value: 10, max: 15 },
      { label: "Expected Social Benefit", value: 12, max: 15 },
    ],
    riskIndicators: [
      { label: "Repeated Flooding", level: "High" },
      { label: "Drainage Obstruction", level: "High" },
      { label: "Urban Pressure", level: "High" },
      { label: "Natural Edge Loss", level: "High" },
    ],
    opportunityIndicators: [
      { label: "Edge Connectivity", level: "Medium" },
      { label: "Restoration Potential", level: "High" },
      { label: "Expected Urban Benefit", level: "High" },
      { label: "Hybrid Intervention Potential", level: "Medium" },
    ],
    preconditions: [
      "Complete community census and relocation feasibility study",
      "Assess underlying substrate after fill removal",
      "Verify tidal connectivity can be restored",
      "Water quality testing for industrial contaminants",
      "Confirm no subsurface infrastructure conflicts",
      "Social agreement on relocation timeline and conditions",
      "Elevation and tidal regime baseline measurements"
    ],
    permeability: {
      permeabilityLevel: "Low",
      sealingLevel: "High",
      urbanCoverIntensity: "High",
      imperviousnessEstimate: "~82%",
      edgeCompression: "High",
      description: "Dense informal construction on compacted fill material creates extremely low permeability. Rainwater has no natural absorption path, leading to immediate surface flooding."
    },
    viability: {
      urbanUrgency: "High",
      ecologicalViability: "Medium",
      socialComplexity: "High",
      implementationFeasibility: "Low",
    },
    recommendedIntervention: {
      primary: "Protect Existing Mangrove Area",
      secondary: "Restore Hydrology",
      conditional: "Revegetate with Native Species (after relocation and fill removal)",
    },
    whyPrioritized: [
      "Extremely high population exposure in flood-prone area",
      "Settlement directly on former mangrove substrate",
      "Zero existing drainage infrastructure",
      "High potential for mangrove buffer restoration after intervention",
      "Strong community networks available for monitoring",
    ],
    speciesRecommendations: [
      {
        commonName: "Red Mangrove",
        scientificName: "Rhizophora mangle",
        context: "Primary restoration species for intertidal zone recovery",
        edgeType: "Estuary Edge",
        plantingType: "Direct water-edge planting",
        usageNote: "Deploy after fill removal and topography restoration. Plant in dense clusters for maximum buffer effect.",
        mistakesToAvoid: "Do not plant until fill material is fully removed and tidal connectivity restored",
      },
      {
        commonName: "Harrisonii Mangrove",
        scientificName: "Rhizophora harrisonii",
        context: "Historical edge restoration in specific microhabitats",
        edgeType: "Estuary Edge",
        plantingType: "Direct water-edge planting",
        usageNote: "Use in areas where historical presence is documented. Mix with R. mangle for diversity.",
        mistakesToAvoid: "Requires specific salinity conditions; validate before planting",
      },
    ],
    speciesDeferred: false,
    aiSummary: "Isla Trinitaria's southern sector is a complex intervention zone where social vulnerability and ecological degradation are deeply intertwined. The informal settlement built on filled mangrove areas creates a dual crisis of flood risk and ecosystem loss. A phased approach beginning with community engagement and consensual relocation is essential before any ecological restoration can proceed. The social complexity score is the highest of any zone in the platform.",
    communityChecklist: [
      "Participate in community census for relocation planning",
      "Document and report flooding events with photos and dates",
      "Engage with community leaders on restoration planning",
      "Support waste reduction near waterway edges",
      "Join community ecosystem monitoring training"
    ],
    municipalityNote: "This zone requires an inter-institutional approach involving MIDUVI (housing), the Municipio, and environmental agencies. The relocation component is the critical path dependency. No ecological restoration should begin until relocation agreements are in place. Budget allocation should prioritize social infrastructure alongside ecological investment.",
  },
  {
    id: "z3",
    name: "La Puntilla – Samborondón Edge",
    lat: -2.1450,
    lng: -79.8700,
    priorityScore: 75,
    zoneType: "Hybrid Opportunity Area",
    floodLevel: "Medium",
    risk: "High-income urban expansion over wetlands and rice paddies. Massive soil impermeabilization. Fragmentation of ecological corridors between estuaries.",
    opportunity: "Integrate green infrastructure into new developments. Preserve remaining wetlands as retention parks. Establish mandatory ecological setbacks.",
    badges: ["Protect", "Hybrid Infrastructure"],
    layers: ["urban-pressure", "estuaries", "candidate-restoration", "permeability"],
    beforeDescription: "Gated communities replacing wetlands, uncontrolled runoff, channelized estuaries, fragmented ecological corridors",
    afterDescription: "Integrated retention parks, green corridors connecting estuaries, low-impact development standards, permeable surfaces",
    aiSteps: [
      "Legally identify and protect remaining wetland areas (0–3 months)",
      "Design mandatory 50m ecological setback ordinance for estuaries (3–6 months)",
      "Create stormwater retention parks at 3 key drainage points (6–18 months)",
      "Mandate permeable pavements in all new developments (ongoing)",
      "Restore riparian vegetation along 5km of estuary edges (12–24 months)",
      "Deploy real-time hydrological monitoring network"
    ],
    area: "45.2 ha",
    population: "~30,000 residents",
    elevation: "3.0 – 8.5 masl",
    scoreFactors: [
      { label: "Flood Vulnerability", value: 24, max: 40 },
      { label: "Population Exposure", value: 14, max: 20 },
      { label: "Proximity to Estuary", value: 16, max: 20 },
      { label: "Ecological Degradation", value: 12, max: 20 },
      { label: "Restoration Suitability", value: 8, max: 15 },
      { label: "Expected Social Benefit", value: 9, max: 15 },
    ],
    riskIndicators: [
      { label: "Repeated Flooding", level: "Medium" },
      { label: "Drainage Obstruction", level: "Medium" },
      { label: "Urban Pressure", level: "High" },
      { label: "Natural Edge Loss", level: "High" },
    ],
    opportunityIndicators: [
      { label: "Edge Connectivity", level: "Medium" },
      { label: "Restoration Potential", level: "Medium" },
      { label: "Expected Urban Benefit", level: "High" },
      { label: "Hybrid Intervention Potential", level: "High" },
    ],
    preconditions: [
      "Legal protection status for remaining wetlands",
      "Water quality baseline in estuary channels",
      "Soil analysis for permeable pavement suitability",
      "Developer engagement on setback compliance",
      "Hydrological connectivity assessment between wetlands",
      "Field validation of ecological corridor viability"
    ],
    permeability: {
      permeabilityLevel: "Low",
      sealingLevel: "High",
      urbanCoverIntensity: "High",
      imperviousnessEstimate: "~71%",
      edgeCompression: "Medium",
      description: "Rapid high-end urbanization has replaced permeable wetland and agricultural surfaces with sealed roads, parking, and buildings. Remaining permeable areas are fragmented and under development pressure."
    },
    viability: {
      urbanUrgency: "Medium",
      ecologicalViability: "Medium",
      socialComplexity: "Low",
      implementationFeasibility: "High",
    },
    recommendedIntervention: {
      primary: "Hybrid Green-Blue Infrastructure",
      secondary: "Protect Existing Mangrove Area",
      conditional: "Monitoring and Containment (for areas already developed)",
    },
    whyPrioritized: [
      "Fastest-growing urban edge in the metropolitan area",
      "Critical ecological corridor fragmentation risk",
      "High impermeabilization rate threatening downstream areas",
      "Strong regulatory opportunity with new development controls",
      "High expected benefit from retention infrastructure",
    ],
    speciesRecommendations: [],
    speciesDeferred: true,
    aiSummary: "La Puntilla represents a preventive opportunity rather than a reactive intervention. The area is not yet in crisis but is on a trajectory toward significant flood risk and ecological disconnection. The primary strategy should focus on policy tools (setback ordinances, development standards) combined with retention infrastructure. Direct mangrove planting is not the primary recommendation; instead, hybrid green-blue infrastructure and corridor preservation take precedence.",
    communityChecklist: [
      "Report any new construction encroaching on wetland areas",
      "Advocate for green infrastructure in your residential community",
      "Support retention park initiatives in your sector",
      "Monitor water levels in nearby estuary channels",
      "Participate in public consultations on development planning"
    ],
    municipalityNote: "Samborondón's planning authority should implement mandatory ecological setbacks before further development approvals. This is a regulatory intervention more than a physical one. Coordination with the GAD Samborondón and developers is key. Cost-sharing mechanisms for retention parks should be explored through development impact fees.",
  },
  {
    id: "z4",
    name: "Puerto Hondo – Mangrove Reserve Edge",
    lat: -2.1900,
    lng: -80.0100,
    priorityScore: 85,
    zoneType: "Functional Ecological Buffer",
    floodLevel: "Low",
    risk: "Urban and industrial expansion pressure on protected mangrove area. Industrial discharge contamination from nearby facilities. Buffer zone encroachment.",
    opportunity: "Strengthen buffer zone perimeter. Community ecotourism as productive conservation model. Mangrove area expansion into degraded adjacent land.",
    badges: ["Protect", "Revegetate"],
    layers: ["functional-mangrove", "urban-pressure", "candidate-restoration", "ecological-opportunity"],
    beforeDescription: "Mangrove under pressure from advancing urban-industrial edge, contamination discharge points, narrowing buffer zone",
    afterDescription: "Established 200m buffer zone, active ecotourism, mangrove expanded by 15 ha, community-led surveillance program",
    aiSteps: [
      "Demarcate and sign 200m buffer zone perimeter (0–2 months)",
      "Install water quality monitoring at 6 strategic points (1–3 months)",
      "Reforest 15 hectares of degraded mangrove fringe (3–18 months)",
      "Train 50 local families in sustainable ecotourism (6–12 months)",
      "Build low-impact trails and observation platforms (12–24 months)",
      "Establish community-led mangrove surveillance and reporting"
    ],
    area: "156.3 ha",
    population: "~3,500 community residents",
    elevation: "0.2 – 2.8 masl",
    scoreFactors: [
      { label: "Flood Vulnerability", value: 18, max: 40 },
      { label: "Population Exposure", value: 8, max: 20 },
      { label: "Proximity to Estuary", value: 20, max: 20 },
      { label: "Ecological Degradation", value: 14, max: 20 },
      { label: "Restoration Suitability", value: 14, max: 15 },
      { label: "Expected Social Benefit", value: 13, max: 15 },
    ],
    riskIndicators: [
      { label: "Repeated Flooding", level: "Low" },
      { label: "Drainage Obstruction", level: "Low" },
      { label: "Urban Pressure", level: "High" },
      { label: "Natural Edge Loss", level: "Medium" },
    ],
    opportunityIndicators: [
      { label: "Edge Connectivity", level: "High" },
      { label: "Restoration Potential", level: "High" },
      { label: "Expected Urban Benefit", level: "Medium" },
      { label: "Hybrid Intervention Potential", level: "Low" },
    ],
    preconditions: [
      "Buffer zone legal designation confirmed",
      "Industrial discharge sources identified and regulated",
      "Baseline mangrove health and coverage assessment",
      "Community capacity for ecotourism validated",
      "No infrastructure conflicts in expansion areas",
      "Tidal and salinity conditions verified for new planting"
    ],
    permeability: {
      permeabilityLevel: "High",
      sealingLevel: "Low",
      urbanCoverIntensity: "Low",
      imperviousnessEstimate: "~18%",
      edgeCompression: "Medium",
      description: "The mangrove reserve area retains high natural permeability with healthy soil and root systems. The primary concern is the advancing urban-industrial edge that threatens to compress this permeable zone."
    },
    viability: {
      urbanUrgency: "Medium",
      ecologicalViability: "High",
      socialComplexity: "Low",
      implementationFeasibility: "High",
    },
    recommendedIntervention: {
      primary: "Protect Existing Mangrove Area",
      secondary: "Revegetate with Native Species",
      conditional: "Monitoring and Containment (for industrial discharge)",
    },
    whyPrioritized: [
      "Largest remaining functional mangrove area near the city",
      "High ecological viability for expansion",
      "Community already engaged in conservation activities",
      "Buffer zone protection prevents future flood vulnerability",
      "Ecotourism potential creates sustainable funding pathway",
    ],
    speciesRecommendations: [
      {
        commonName: "Red Mangrove",
        scientificName: "Rhizophora mangle",
        context: "Expansion of existing mangrove fringe into adjacent degraded areas",
        edgeType: "Intertidal",
        plantingType: "Direct water-edge planting",
        usageNote: "Plant adjacent to existing mature stands for natural propagule support. Focus on areas where tidal flow is unobstructed.",
        mistakesToAvoid: "Do not plant in areas with active industrial discharge until contamination is remediated",
      },
      {
        commonName: "Buttonwood Mangrove",
        scientificName: "Conocarpus erectus",
        context: "Buffer zone edge stabilization and transition area",
        edgeType: "Urban Edge Support",
        plantingType: "Transitional planting",
        usageNote: "Use along the landward edge of the buffer zone to create a natural transition and stabilize the boundary.",
        mistakesToAvoid: "Not suitable for intertidal planting; keep above regular tide line",
      },
    ],
    speciesDeferred: false,
    aiSummary: "Puerto Hondo is the strongest ecological asset in the Guayaquil metropolitan area. The strategy here is primarily defensive: protect what exists and expand where conditions allow. Unlike other zones that require complex urban interventions, this area benefits from relatively straightforward ecological restoration combined with community engagement. The main risk is external pressure from industrial and urban expansion.",
    communityChecklist: [
      "Report any unauthorized construction in the buffer zone",
      "Participate in mangrove reforestation events",
      "Document wildlife sightings and mangrove health changes",
      "Support ecotourism training and cooperative formation",
      "Report any unusual water discoloration or industrial activity"
    ],
    municipalityNote: "Puerto Hondo should be prioritized as a municipal conservation flagship. The combination of ecological integrity, community engagement potential, and ecotourism viability makes it the most implementation-ready zone. Coordination with MAE (environmental ministry) and local cooperatives is recommended.",
  },
  {
    id: "z5",
    name: "Bastión Popular – Northern Drainage",
    lat: -2.1350,
    lng: -79.9600,
    priorityScore: 80,
    zoneType: "Urban Lowland",
    floodLevel: "High",
    risk: "Dense unplanned urbanization with zero drainage design. Frequent flooding during rainy season. Natural channels buried or filled. No green retention areas.",
    opportunity: "Rehabilitate natural channels as urban green infrastructure. Rain gardens in public spaces. Community-based early warning system.",
    badges: ["Restore Hydrology", "Hybrid Infrastructure"],
    layers: ["flood-zones", "urban-pressure", "flood-reports", "permeability"],
    beforeDescription: "Flooded streets, collapsed buried channels, zero green retention areas, high runoff velocity",
    afterDescription: "Opened and restored natural channels, rain gardens in parks, functional natural drainage, community early warning system",
    aiSteps: [
      "Map original drainage network using historical data and LiDAR (0–3 months)",
      "Identify 8 critical recurring flood points (1–2 months)",
      "Design rain gardens in 5 existing public parks (3–6 months)",
      "Rehabilitate 2.5 km of currently buried natural channel (6–18 months)",
      "Install permeable pavements in 12 pilot blocks (12–24 months)",
      "Create community-based flood early warning system"
    ],
    area: "18.9 ha",
    population: "~65,000 residents",
    elevation: "2.0 – 6.0 masl",
    scoreFactors: [
      { label: "Flood Vulnerability", value: 30, max: 40 },
      { label: "Population Exposure", value: 16, max: 20 },
      { label: "Proximity to Estuary", value: 10, max: 20 },
      { label: "Ecological Degradation", value: 10, max: 20 },
      { label: "Restoration Suitability", value: 8, max: 15 },
      { label: "Expected Social Benefit", value: 10, max: 15 },
    ],
    riskIndicators: [
      { label: "Repeated Flooding", level: "High" },
      { label: "Drainage Obstruction", level: "High" },
      { label: "Urban Pressure", level: "High" },
      { label: "Natural Edge Loss", level: "Medium" },
    ],
    opportunityIndicators: [
      { label: "Edge Connectivity", level: "Low" },
      { label: "Restoration Potential", level: "Medium" },
      { label: "Expected Urban Benefit", level: "High" },
      { label: "Hybrid Intervention Potential", level: "High" },
    ],
    preconditions: [
      "Historical drainage network mapping completed",
      "Subsurface utility conflict assessment",
      "Soil permeability testing at rain garden sites",
      "Community engagement on channel reopening",
      "Traffic and access impact assessment for permeable pavement zones",
      "Flood modeling to validate intervention effectiveness"
    ],
    permeability: {
      permeabilityLevel: "Low",
      sealingLevel: "High",
      urbanCoverIntensity: "High",
      imperviousnessEstimate: "~85%",
      edgeCompression: "High",
      description: "One of the most impermeabilized sectors in the city. Dense informal urbanization has sealed virtually all natural drainage surfaces. Rainwater has no absorption path, creating rapid surface flooding during any significant rainfall event."
    },
    viability: {
      urbanUrgency: "High",
      ecologicalViability: "Low",
      socialComplexity: "Medium",
      implementationFeasibility: "Medium",
    },
    recommendedIntervention: {
      primary: "Restore Hydrology",
      secondary: "Hybrid Green-Blue Infrastructure",
      conditional: "Not Suitable for Mangrove Intervention; Prioritize Urban Drainage Solution",
    },
    whyPrioritized: [
      "Highest population density among priority zones",
      "Most frequent citizen flood reports in the platform",
      "Critical buried channel infrastructure requires rehabilitation",
      "High expected benefit from rain garden network",
      "Better candidate for urban drainage than ecological restoration",
    ],
    speciesRecommendations: [],
    speciesDeferred: true,
    aiSummary: "Bastión Popular is a clear example of a zone where mangrove planting is NOT the appropriate intervention. This is an urban drainage problem requiring engineered green-blue infrastructure: channel rehabilitation, rain gardens, and permeable surfaces. The ecological opportunity here is urban, not coastal. The platform correctly identifies this distinction and recommends hydrological restoration and hybrid infrastructure rather than ecological planting.",
    communityChecklist: [
      "Report flooding events with precise location and water height",
      "Avoid dumping solid waste in drainage channels",
      "Support rain garden maintenance in your neighborhood park",
      "Participate in flood early warning volunteer network",
      "Advocate for permeable surface requirements in new construction"
    ],
    municipalityNote: "This is primarily an urban infrastructure challenge. The Dirección de Obras Públicas should lead with support from environmental planning. Investment in channel rehabilitation will yield the highest return in flood reduction. Rain gardens should be piloted in partnership with community organizations for maintenance sustainability.",
  },
  {
    id: "z6",
    name: "Entre Ríos – Estuarine Urban Edge",
    lat: -2.1550,
    lng: -79.8950,
    priorityScore: 78,
    zoneType: "Estuary Edge",
    floodLevel: "Medium",
    risk: "Urban development advancing toward the confluence zone of estuary channels. Ecological corridors at risk of permanent disconnection. Moderate flooding in lower sectors.",
    opportunity: "Create a green corridor connecting two estuary systems. Retention infrastructure at the urban-ecological interface. Community education programs.",
    badges: ["Protect", "Hybrid Infrastructure", "Monitor First"],
    layers: ["estuaries", "urban-pressure", "ecological-opportunity", "candidate-restoration"],
    beforeDescription: "Urban edge pressing against estuary confluence, ecological corridors narrowing, moderate flooding in low areas, no buffer zone",
    afterDescription: "Green corridor established between estuaries, retention basins at urban edge, educational signage and community monitoring",
    aiSteps: [
      "Complete ecological corridor connectivity assessment (0–3 months)",
      "Establish protected green corridor designation (3–6 months)",
      "Design and build retention basins at 2 key interface points (6–12 months)",
      "Install ecological monitoring stations along corridor (3–6 months)",
      "Launch community education program on estuary health (6–12 months)",
      "Implement quarterly ecological connectivity monitoring"
    ],
    area: "22.1 ha",
    population: "~18,000 adjacent residents",
    elevation: "1.5 – 4.2 masl",
    scoreFactors: [
      { label: "Flood Vulnerability", value: 26, max: 40 },
      { label: "Population Exposure", value: 12, max: 20 },
      { label: "Proximity to Estuary", value: 18, max: 20 },
      { label: "Ecological Degradation", value: 10, max: 20 },
      { label: "Restoration Suitability", value: 10, max: 15 },
      { label: "Expected Social Benefit", value: 8, max: 15 },
    ],
    riskIndicators: [
      { label: "Repeated Flooding", level: "Medium" },
      { label: "Drainage Obstruction", level: "Medium" },
      { label: "Urban Pressure", level: "High" },
      { label: "Natural Edge Loss", level: "Medium" },
    ],
    opportunityIndicators: [
      { label: "Edge Connectivity", level: "High" },
      { label: "Restoration Potential", level: "Medium" },
      { label: "Expected Urban Benefit", level: "Medium" },
      { label: "Hybrid Intervention Potential", level: "High" },
    ],
    preconditions: [
      "Ecological corridor viability confirmed through field surveys",
      "Legal protection pathway identified for corridor land",
      "Water flow connectivity between estuary systems verified",
      "Community support for corridor designation assessed",
      "No conflicting development permits in corridor zone",
      "Baseline biodiversity survey completed"
    ],
    permeability: {
      permeabilityLevel: "Medium",
      sealingLevel: "Medium",
      urbanCoverIntensity: "Medium",
      imperviousnessEstimate: "~52%",
      edgeCompression: "Medium",
      description: "The urban-ecological interface here shows moderate permeability with some remaining open and semi-natural spaces. The key concern is the trajectory of urbanization which threatens to seal the remaining permeable corridor."
    },
    viability: {
      urbanUrgency: "Medium",
      ecologicalViability: "Medium",
      socialComplexity: "Low",
      implementationFeasibility: "High",
    },
    recommendedIntervention: {
      primary: "Monitoring and Containment",
      secondary: "Hybrid Green-Blue Infrastructure",
      conditional: "Revegetate with Native Species (if corridor protection secured)",
    },
    whyPrioritized: [
      "Strategic location at estuary confluence zone",
      "Critical ecological corridor at risk of disconnection",
      "Preventive intervention more cost-effective than reactive",
      "Community engagement opportunity with education programs",
      "Moderate complexity with high implementation feasibility",
    ],
    speciesRecommendations: [],
    speciesDeferred: true,
    aiSummary: "Entre Ríos represents a monitoring-first zone where the primary action is to prevent ecological disconnection before it becomes irreversible. The intervention logic here is preventive rather than restorative. Securing corridor protection and installing retention infrastructure at the urban edge are more important than immediate planting. Species recommendations are deferred until hydrological and corridor conditions are validated through field surveys.",
    communityChecklist: [
      "Report any new construction activity near estuary edges",
      "Monitor water levels and flow in nearby channels",
      "Participate in community education events on estuary health",
      "Advocate for green corridor protection in local government",
      "Document wildlife and vegetation changes in the area"
    ],
    municipalityNote: "This zone requires a preventive policy approach. The planning department should issue a moratorium on development permits within the identified corridor zone until ecological connectivity assessment is complete. Cost of prevention is estimated at 15-20% of reactive intervention costs.",
  },
];
