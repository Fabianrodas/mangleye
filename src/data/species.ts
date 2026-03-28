import speciesData from "./species.json";

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

export const guayasSpecies: Species[] = speciesData as Species[];
