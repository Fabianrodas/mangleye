import Header from "@/components/Header";
import { zones } from "@/data/zones";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeftRight, Droplets, TreePine, Users, Shield } from "lucide-react";

export default function Comparison() {
  const [selectedId, setSelectedId] = useState(zones[0].id);
  const zone = zones.find(z => z.id === selectedId)!;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Comparison View</h1>
          <p className="text-sm text-muted-foreground">Current State vs. Suggested Intervention — conceptual analysis for planning</p>
        </div>

        {/* Zone selector */}
        <div className="glass-panel-sm p-3 mb-6 flex flex-wrap gap-2">
          {zones.map(z => (
            <button
              key={z.id}
              onClick={() => setSelectedId(z.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedId === z.id ? "bg-primary/15 text-primary border border-primary/30" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {z.name}
            </button>
          ))}
        </div>

        {/* Side by Side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current State */}
          <motion.div key={`before-${zone.id}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-geo-red" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-geo-red">Current State</h3>
            </div>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-4">{zone.beforeDescription}</p>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-geo-red/5 border border-geo-red/15">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-geo-red mb-2">Current Risk Profile</div>
                <div className="space-y-1.5">
                  {zone.riskIndicators.map(ind => (
                    <div key={ind.label} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{ind.label}</span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        ind.level === "High" ? "bg-geo-red/15 text-geo-red" : ind.level === "Medium" ? "bg-geo-amber/15 text-geo-amber" : "bg-geo-green/15 text-geo-green"
                      }`}>{ind.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded bg-secondary/40 text-center">
                  <Droplets size={14} className="text-geo-red mx-auto mb-1" />
                  <div className="text-xs font-mono font-bold text-geo-red">{zone.floodLevel}</div>
                  <div className="text-[9px] text-muted-foreground">Flood Level</div>
                </div>
                <div className="p-2.5 rounded bg-secondary/40 text-center">
                  <Users size={14} className="text-geo-amber mx-auto mb-1" />
                  <div className="text-xs font-mono font-bold">{zone.population}</div>
                  <div className="text-[9px] text-muted-foreground">Exposed</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/30">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Permeability</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Imperviousness:</span>
                  <span className="font-mono font-bold">{zone.permeability.imperviousnessEstimate}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Suggested Intervention */}
          <motion.div key={`after-${zone.id}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-geo-green" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-geo-green">Suggested Intervention</h3>
            </div>
            <p className="text-sm text-secondary-foreground leading-relaxed mb-4">{zone.afterDescription}</p>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-geo-green/5 border border-geo-green/15">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-geo-green mb-2">Recommended Actions</div>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[9px] font-bold uppercase text-primary mt-0.5 w-16 shrink-0">Primary</span>
                    <span className="text-xs">{zone.recommendedIntervention.primary}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[9px] font-bold uppercase text-muted-foreground mt-0.5 w-16 shrink-0">Secondary</span>
                    <span className="text-xs text-muted-foreground">{zone.recommendedIntervention.secondary}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-geo-green/5 border border-geo-green/15">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-geo-green mb-2">Expected Outcomes</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-secondary/30 text-center">
                    <div className="text-xs font-bold text-geo-green">Reduced</div>
                    <div className="text-[9px] text-muted-foreground">Flood Exposure</div>
                  </div>
                  <div className="p-2 rounded bg-secondary/30 text-center">
                    <div className="text-xs font-bold text-geo-green">Improved</div>
                    <div className="text-[9px] text-muted-foreground">Edge Connectivity</div>
                  </div>
                  <div className="p-2 rounded bg-secondary/30 text-center">
                    <div className="text-xs font-bold text-geo-green">Increased</div>
                    <div className="text-[9px] text-muted-foreground">Permeability</div>
                  </div>
                  <div className="p-2 rounded bg-secondary/30 text-center">
                    <div className="text-xs font-bold text-geo-green">Enhanced</div>
                    <div className="text-[9px] text-muted-foreground">Social Benefit</div>
                  </div>
                </div>
              </div>

              {!zone.speciesDeferred && zone.speciesRecommendations.length > 0 && (
                <div className="p-3 rounded-lg bg-secondary/30">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Species Mix</div>
                  <div className="flex flex-wrap gap-1">
                    {zone.speciesRecommendations.map((sp, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-geo-green/10 text-geo-green">{sp.commonName}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom comparison strip */}
        <div className="glass-panel p-4 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight size={14} className="text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Comparison Summary</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-[10px] text-muted-foreground mb-1">Ecological Edge</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-mono text-geo-red">Degraded</span>
                <ArrowRight size={12} className="text-muted-foreground" />
                <span className="text-xs font-mono text-geo-green">Recoverable</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-muted-foreground mb-1">Flood Exposure</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-mono text-geo-red">{zone.floodLevel}</span>
                <ArrowRight size={12} className="text-muted-foreground" />
                <span className="text-xs font-mono text-geo-green">Reduced</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-muted-foreground mb-1">Surface Sealing</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-mono text-geo-red">{zone.permeability.imperviousnessEstimate}</span>
                <ArrowRight size={12} className="text-muted-foreground" />
                <span className="text-xs font-mono text-geo-green">Improved</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-muted-foreground mb-1">Social Benefit</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-mono text-geo-amber">Potential</span>
                <ArrowRight size={12} className="text-muted-foreground" />
                <span className="text-xs font-mono text-geo-green">Realized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
