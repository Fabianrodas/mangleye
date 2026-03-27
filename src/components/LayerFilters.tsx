import { Droplets, Waves, TreePine, Building2, Target, AlertTriangle, Sprout, Users, Layers, CheckCircle, Zap, MessageSquare } from "lucide-react";
import { type LayerType, LAYER_CONFIG } from "@/data/zones";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ICONS: Record<LayerType, React.ElementType> = {
  "flood-zones": Droplets,
  "flood-reports": MessageSquare,
  "estuaries": Waves,
  "functional-mangrove": TreePine,
  "degraded-mangrove": AlertTriangle,
  "candidate-restoration": Target,
  "ecological-opportunity": Sprout,
  "exposed-population": Users,
  "urban-pressure": Building2,
  "permeability": Layers,
  "restoration-suitability": CheckCircle,
  "priority-intervention": Zap,
};

const LAYER_GROUPS = [
  { label: "Flooding", keys: ["flood-zones", "flood-reports"] as LayerType[] },
  { label: "Water & Edges", keys: ["estuaries"] as LayerType[] },
  { label: "Ecological", keys: ["functional-mangrove", "degraded-mangrove", "candidate-restoration", "ecological-opportunity"] as LayerType[] },
  { label: "Urban", keys: ["exposed-population", "urban-pressure", "permeability"] as LayerType[] },
  { label: "Analysis", keys: ["restoration-suitability", "priority-intervention"] as LayerType[] },
];

interface LayerFiltersProps {
  activeLayers: LayerType[];
  onToggle: (layer: LayerType) => void;
}

export default function LayerFilters({ activeLayers, onToggle }: LayerFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleGroups = expanded ? LAYER_GROUPS : LAYER_GROUPS.slice(0, 2);

  return (
    <div className="glass-panel p-3 max-w-[520px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Map Layers</span>
        <button
          onClick={() => setExpanded(p => !p)}
          className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? "Less" : "More"}
          {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </button>
      </div>
      <div className="space-y-2">
        {visibleGroups.map(group => (
          <div key={group.label}>
            <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1">{group.label}</div>
            <div className="flex flex-wrap gap-1.5">
              {group.keys.map(key => {
                const cfg = LAYER_CONFIG[key];
                const Icon = ICONS[key];
                const active = activeLayers.includes(key);
                return (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggle(key)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                      active
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-secondary/50 text-muted-foreground border border-transparent hover:border-border/50"
                    }`}
                  >
                    <Icon size={11} style={active ? { color: cfg.color } : undefined} />
                    <span>{cfg.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {activeLayers.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border/30 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">{activeLayers.length} active</span>
          <button
            onClick={() => activeLayers.forEach(l => onToggle(l))}
            className="text-[10px] text-primary hover:text-primary/80 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
