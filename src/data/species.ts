export interface Species {
  commonName: string;
  scientificName: string;
  context: string;
  edgeType: string;
  plantingType: string;
  usageNote: string;
  mistakesToAvoid: string;
  tags: string[];
}

export const guayasSpecies: Species[] = [
  {
    commonName: "Red Mangrove",
    scientificName: "Rhizophora mangle",
    context: "Primary restoration species for intertidal estuary edges. The most widely recognized mangrove species in the Guayas estuary system.",
    edgeType: "Estuary Edge",
    plantingType: "Direct water-edge planting",
    usageNote: "Plant in clusters at mean tide level in areas with confirmed tidal inundation twice daily. Best results when planted adjacent to existing mature stands.",
    mistakesToAvoid: "Do not plant above high-tide line, in fully sealed soils, or in areas with active industrial contamination.",
    tags: ["Intertidal", "Native to Guayas", "Restored Mix"],
  },
  {
    commonName: "Buttonwood Mangrove",
    scientificName: "Conocarpus erectus",
    context: "Transitional species between urban edges and mangrove fringes. Tolerates drier conditions than true mangroves.",
    edgeType: "Urban Edge Support",
    plantingType: "Transitional planting",
    usageNote: "Excellent for urban buffer zones and the landward edge of mangrove restoration areas. Stabilizes soil and provides shade.",
    mistakesToAvoid: "Avoid waterlogged conditions. Needs firmer substrate than intertidal species. Not a substitute for true mangrove in tidal zones.",
    tags: ["Transition Zone", "Urban Edge Support", "Native to Guayas"],
  },
  {
    commonName: "Beach Hibiscus",
    scientificName: "Hibiscus tiliaceus",
    context: "Support vegetation for riparian corridors and transitional zones. Fast-growing native species with erosion control value.",
    edgeType: "Transition Zone",
    plantingType: "Support vegetation",
    usageNote: "Use along boardwalk edges, constructed wetland perimeters, and riparian corridors for shade and erosion control.",
    mistakesToAvoid: "Not a substitute for mangrove species. Use as complementary vegetation only. Can become invasive if not managed.",
    tags: ["Transition Zone", "Native to Guayas", "Support"],
  },
  {
    commonName: "Harrisonii Mangrove",
    scientificName: "Rhizophora harrisonii",
    context: "Specialized restoration species for specific historical edge contexts in the Guayas estuary system.",
    edgeType: "Estuary Edge",
    plantingType: "Direct water-edge planting",
    usageNote: "Use in areas where historical presence is documented. Mix with R. mangle for species diversity. Preferred in certain microhabitat conditions.",
    mistakesToAvoid: "Requires specific salinity conditions (15-25 ppt optimal). Validate site conditions before planting.",
    tags: ["Intertidal", "Estuary Edge", "Native to Guayas", "Restored Mix"],
  },
];
