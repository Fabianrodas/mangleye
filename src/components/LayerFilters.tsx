import { Droplets, Waves, TreePine, Building2, Target, AlertTriangle, Sprout, Users, Layers, CheckCircle, Zap, MessageSquare } from "lucide-react";
import { type LayerType, LAYER_CONFIG } from "@/data/zones";
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

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
  { label: "Water & Ecology", keys: ["estuaries", "functional-mangrove", "degraded-mangrove", "candidate-restoration", "ecological-opportunity"] as LayerType[] },
  { label: "Urban & Analysis", keys: ["exposed-population", "urban-pressure", "permeability", "restoration-suitability", "priority-intervention"] as LayerType[] },
];

interface LayerFiltersProps {
  activeLayers: LayerType[];
  onToggle: (layer: LayerType) => void;
}

export default function LayerFilters({ activeLayers, onToggle }: LayerFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleGroups = expanded ? LAYER_GROUPS : LAYER_GROUPS.slice(0, 1);

  return (
    <div className="glass-panel p-3 max-w-[480px]">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Layers size={13} className="text-primary" />
          <span className="text-[11px] font-semibold text-foreground">Layers</span>
          {activeLayers.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold">
              {activeLayers.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {activeLayers.length > 0 && (
            <button
              onClick={() => activeLayers.forEach(l => onToggle(l))}
              className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors"
            >
              <X size={10} /> Clear
            </button>
          )}
          <button
            onClick={() => setExpanded(p => !p)}
            className="flex items-center gap-0.5 text-[10px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {expanded ? "Less" : "All layers"}
            {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        {visibleGroups.map(group => (
          <div key={group.label}>
            <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-1.5">{group.label}</div>
            <div className="flex flex-wrap gap-1.5">
              {group.keys.map(key => {
                const cfg = LAYER_CONFIG[key];
                const Icon = ICONS[key];
                const active = activeLayers.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() => onToggle(key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all border ${
                      active
                        ? "bg-white text-foreground border-primary/40 shadow-sm"
                        : "bg-secondary/40 text-muted-foreground border-transparent hover:border-border/50 hover:bg-secondary/60"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${active ? '' : 'opacity-40'}`}
                      style={{ backgroundColor: cfg.color }}
                    />
                    <span className="truncate max-w-[120px]">{cfg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
