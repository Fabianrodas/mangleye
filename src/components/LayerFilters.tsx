import { Droplets, Waves, TreePine, Building2, Target, AlertTriangle, Sprout, Users, Layers, CheckCircle, Zap, MessageSquare } from "lucide-react";
import { type LayerType, LAYER_CONFIG } from "@/data/zones";
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ICONS: Record<string, React.ElementType> = {
  "flood-zones": Droplets,
  "flood-reports": MessageSquare,
  "estuaries": Waves,
  "mangrove-2022": TreePine,
  "mangrove-2020": TreePine,
  "mangrove-2018": TreePine,
  "change-2018-2020": AlertTriangle,
  "change-2020-2022": AlertTriangle,
  "change-ecuador-coast": Target,
  "exposed-population": Users,
  "urban-pressure": Building2,
  "permeability": Layers,
  "restoration-suitability": CheckCircle,
  "priority-intervention": Zap,
};

const LAYER_GROUPS = [
  { label: "Mangrove Extent", keys: ["mangrove-2022", "mangrove-2020", "mangrove-2018"] as LayerType[], color: "text-geo-green" },
  { label: "Mangrove Change", keys: ["change-2018-2020", "change-2020-2022", "change-ecuador-coast"] as LayerType[], color: "text-geo-amber" },
  { label: "Flooding", keys: ["flood-zones", "flood-reports"] as LayerType[], color: "text-geo-blue" },
  { label: "Urban & Analysis", keys: ["estuaries", "exposed-population", "urban-pressure", "permeability", "restoration-suitability", "priority-intervention"] as LayerType[], color: "text-muted-foreground" },
];

interface LayerFiltersProps {
  activeLayers: LayerType[];
  onToggle: (layer: LayerType) => void;
}

export default function LayerFilters({ activeLayers, onToggle }: LayerFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header only when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="glass-panel px-4 py-2.5 flex items-center justify-between w-full hover:bg-secondary/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers size={13} className="text-primary" />
            <span className="text-[11px] font-bold text-foreground">Layers</span>
            {activeLayers.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-mono font-bold">
                {activeLayers.length}
              </span>
            )}
          </div>
          <ChevronDown size={12} className="text-primary" />
        </button>
      )}

      {/* Full dropdown when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="glass-panel"
          >
            <div className="p-3 max-w-[500px]">
              {/* Close header */}
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/30">
                <div className="flex items-center gap-2">
                  <Layers size={13} className="text-primary" />
                  <span className="text-[11px] font-bold text-foreground">Layers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {activeLayers.length > 0 && (
                    <button
                      onClick={() => activeLayers.forEach(l => onToggle(l))}
                      className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors px-1.5 py-0.5 rounded hover:bg-secondary"
                    >
                      <X size={10} /> Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-primary hover:text-primary/80 transition-colors p-1"
                  >
                    <ChevronUp size={14} />
                  </button>
                </div>
              </div>

              {/* Layer groups */}
              <div className="space-y-3">
                {LAYER_GROUPS.map(group => (
                  <div key={group.label}>
                    <div className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 ${group.color}`}>{group.label}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.keys.map(key => {
                        const cfg = LAYER_CONFIG[key];
                        if (!cfg) return null;
                        const Icon = ICONS[key] || Layers;
                        const active = activeLayers.includes(key);
                        return (
                          <button
                            key={key}
                            onClick={() => onToggle(key)}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all border whitespace-nowrap ${active
                                ? "bg-white text-foreground border-primary/40 shadow-sm ring-1 ring-primary/10"
                                : "bg-secondary/30 text-muted-foreground border-transparent hover:border-border/50 hover:bg-secondary/60"
                              }`}
                          >
                            <Icon size={11} className={active ? "text-primary" : "text-muted-foreground/50"} />
                            <span>{cfg.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend when layers active */}
              {activeLayers.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-border/30">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Active Legend</div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {activeLayers.map(key => {
                      const cfg = LAYER_CONFIG[key];
                      if (!cfg) return null;
                      return (
                        <div key={key} className="flex items-center gap-1.5">
                          <span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                          <span className="text-[10px] text-muted-foreground">{cfg.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Change legend */}
                  {activeLayers.some(l => l.startsWith("change-")) && (
                    <div className="flex gap-3 mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: "#2D8B5E" }} />
                        <span className="text-[10px] text-muted-foreground">Gain</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: "#C04040" }} />
                        <span className="text-[10px] text-muted-foreground">Loss</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
