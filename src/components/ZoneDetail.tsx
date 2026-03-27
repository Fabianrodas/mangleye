import { useState } from "react";
import { type Zone } from "@/data/zones";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Sprout, Users, Mountain, Maximize2, X, Droplets, MapPin, BrainCircuit, TreePine, CheckCircle2, Circle, ArrowRight, Shield, Eye, Wrench, Zap } from "lucide-react";
import ZoneBadge from "./ZoneBadge";
import type { RiskLevel } from "@/data/zones";

interface ZoneDetailProps {
  zone: Zone | null;
  onClose: () => void;
}

const LevelPill = ({ level }: { level: RiskLevel }) => {
  const cls = level === "High" ? "bg-geo-red/15 text-geo-red" : level === "Medium" ? "bg-geo-amber/15 text-geo-amber" : "bg-geo-green/15 text-geo-green";
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${cls}`}>{level}</span>;
};

const ScoreBar = ({ label, value, max }: { label: string; value: number; max: number }) => {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-muted-foreground w-[140px] shrink-0 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground w-[36px] text-right">{value}/{max}</span>
    </div>
  );
};

export default function ZoneDetail({ zone, onClose }: ZoneDetailProps) {
  return (
    <AnimatePresence mode="wait">
      {zone && (
        <motion.div
          key={zone.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-bold leading-tight">{zone.name}</h2>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                <span className="px-1.5 py-0.5 rounded bg-secondary text-[9px] font-semibold uppercase">{zone.zoneType}</span>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5"><Maximize2 size={9} />{zone.area}</span>
                <span className="flex items-center gap-0.5"><Users size={9} />{zone.population}</span>
                <span className="flex items-center gap-0.5"><Mountain size={9} />{zone.elevation}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[10px]">
                <span className="flex items-center gap-0.5 text-muted-foreground"><Droplets size={9} />Flood Level:</span>
                <LevelPill level={zone.floodLevel} />
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-secondary transition-colors">
              <X size={14} className="text-muted-foreground" />
            </button>
          </div>

          {/* Priority Score */}
          <div className="glass-panel-sm p-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-14 h-14 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(200,15%,20%)" strokeWidth="3" />
                  <motion.path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"
                    stroke={zone.priorityScore >= 85 ? "hsl(0,70%,55%)" : zone.priorityScore >= 75 ? "hsl(38,90%,55%)" : "hsl(168,60%,45%)"}
                    strokeWidth="3" strokeLinecap="round"
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${zone.priorityScore}, 100` }}
                    transition={{ duration: 0.8 }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold">{zone.priorityScore}</span>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Priority Score</div>
                <div className="flex flex-wrap gap-1">
                  {zone.badges.map(b => <ZoneBadge key={b} badge={b} />)}
                </div>
              </div>
            </div>
            {/* Score Factors */}
            <div className="space-y-1.5 mt-3 pt-3 border-t border-border/30">
              <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Factors Behind the Score</div>
              {zone.scoreFactors.map(f => <ScoreBar key={f.label} {...f} />)}
            </div>
          </div>

          {/* Risk Card */}
          <div className="glass-panel-sm p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle size={12} className="text-geo-red" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-red">Risk</span>
              <div className="ml-auto"><LevelPill level={zone.floodLevel} /></div>
            </div>
            <p className="text-[12px] leading-relaxed text-secondary-foreground mb-2">{zone.risk}</p>
            <div className="grid grid-cols-2 gap-1.5">
              {zone.riskIndicators.map(ind => (
                <div key={ind.label} className="flex items-center justify-between p-1.5 rounded bg-secondary/40">
                  <span className="text-[10px] text-muted-foreground">{ind.label}</span>
                  <LevelPill level={ind.level} />
                </div>
              ))}
            </div>
          </div>

          {/* Opportunity Card */}
          <div className="glass-panel-sm p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Sprout size={12} className="text-geo-green" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-green">Opportunity</span>
            </div>
            <p className="text-[12px] leading-relaxed text-secondary-foreground mb-2">{zone.opportunity}</p>
            <div className="grid grid-cols-2 gap-1.5">
              {zone.opportunityIndicators.map(ind => (
                <div key={ind.label} className="flex items-center justify-between p-1.5 rounded bg-secondary/40">
                  <span className="text-[10px] text-muted-foreground">{ind.label}</span>
                  <LevelPill level={ind.level} />
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Intervention */}
          <div className="glass-panel-sm p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Wrench size={12} className="text-geo-amber" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-amber">Recommended Intervention</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2 p-2 rounded bg-primary/5 border border-primary/15">
                <span className="text-[9px] font-bold uppercase text-primary mt-0.5 w-16 shrink-0">Primary</span>
                <span className="text-[12px] font-medium">{zone.recommendedIntervention.primary}</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded bg-secondary/50">
                <span className="text-[9px] font-bold uppercase text-muted-foreground mt-0.5 w-16 shrink-0">Secondary</span>
                <span className="text-[12px]">{zone.recommendedIntervention.secondary}</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded bg-secondary/30">
                <span className="text-[9px] font-bold uppercase text-muted-foreground mt-0.5 w-16 shrink-0">Conditional</span>
                <span className="text-[11px] text-muted-foreground">{zone.recommendedIntervention.conditional}</span>
              </div>
            </div>
          </div>

          {/* Why Prioritized */}
          <div className="glass-panel-sm p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={12} className="text-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Why This Zone?</span>
            </div>
            <div className="space-y-1">
              {zone.whyPrioritized.map((reason, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px]">
                  <span className="text-primary mt-0.5 shrink-0">•</span>
                  <span className="text-secondary-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Viability Traffic Light */}
          <div className="glass-panel-sm p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Viability Assessment</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Urban Urgency", level: zone.viability.urbanUrgency },
                { label: "Ecological Viability", level: zone.viability.ecologicalViability },
                { label: "Social Complexity", level: zone.viability.socialComplexity },
                { label: "Implementation", level: zone.viability.implementationFeasibility },
              ].map(v => (
                <div key={v.label} className="p-2 rounded bg-secondary/40 flex flex-col items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${v.level === "High" ? "bg-geo-green" : v.level === "Medium" ? "bg-geo-amber" : "bg-geo-red"}`} />
                  <span className="text-[9px] text-center text-muted-foreground leading-tight">{v.label}</span>
                  <span className="text-[9px] font-bold uppercase">{v.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preconditions */}
          <div className="glass-panel-sm p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Shield size={12} className="text-geo-cyan" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-cyan">Preconditions</span>
            </div>
            <div className="space-y-1">
              {zone.preconditions.map((p, i) => (
                <div key={i} className="flex items-start gap-2 p-1.5 rounded bg-secondary/30 text-[11px]">
                  <Eye size={10} className="text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Permeability */}
          <div className="glass-panel-sm p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Permeability & Surface Sealing</div>
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <div className="flex items-center justify-between p-1.5 rounded bg-secondary/40">
                <span className="text-[10px] text-muted-foreground">Permeability</span>
                <LevelPill level={zone.permeability.permeabilityLevel} />
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-secondary/40">
                <span className="text-[10px] text-muted-foreground">Sealing</span>
                <LevelPill level={zone.permeability.sealingLevel} />
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-secondary/40">
                <span className="text-[10px] text-muted-foreground">Urban Cover</span>
                <LevelPill level={zone.permeability.urbanCoverIntensity} />
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-secondary/40">
                <span className="text-[10px] text-muted-foreground">Imperviousness</span>
                <span className="text-[10px] font-mono font-bold">{zone.permeability.imperviousnessEstimate}</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{zone.permeability.description}</p>
          </div>

          {/* Native Species (conditional) */}
          {zone.speciesDeferred ? (
            <div className="glass-panel-sm p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <TreePine size={12} className="text-geo-green" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-green">Native Species Guide</span>
              </div>
              <p className="text-[11px] text-muted-foreground italic">
                Species recommendation deferred until hydrological and soil conditions are validated.
              </p>
            </div>
          ) : zone.speciesRecommendations.length > 0 && (
            <div className="glass-panel-sm p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <TreePine size={12} className="text-geo-green" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-green">Native Species Guide – Guayas</span>
              </div>
              <div className="space-y-2">
                {zone.speciesRecommendations.map((sp, i) => (
                  <div key={i} className="p-2 rounded bg-secondary/40 border border-border/30">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-[12px] font-semibold">{sp.commonName}</span>
                        <span className="text-[10px] text-muted-foreground italic ml-1.5">{sp.scientificName}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-geo-green/10 text-geo-green border border-geo-green/20">{sp.edgeType}</span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-geo-blue/10 text-geo-blue border border-geo-blue/20">{sp.plantingType}</span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-geo-teal/10 text-geo-teal border border-geo-teal/20">Native to Guayas</span>
                    </div>
                    <p className="text-[10px] text-secondary-foreground mb-1">{sp.usageNote}</p>
                    <p className="text-[10px] text-geo-amber"><AlertTriangle size={9} className="inline mr-1" />{sp.mistakesToAvoid}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Before/After */}
          <BeforeAfterSection zone={zone} />

          {/* AI Copilot */}
          <AICopilotSection zone={zone} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BeforeAfterSection({ zone }: { zone: Zone }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <div className="glass-panel-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current vs. Intervention</span>
        <div className="flex items-center bg-secondary rounded-md p-0.5">
          <button onClick={() => setShowAfter(false)} className={`px-2.5 py-1 text-[10px] font-medium rounded transition-all ${!showAfter ? "bg-geo-red/15 text-geo-red" : "text-muted-foreground"}`}>Before</button>
          <button onClick={() => setShowAfter(true)} className={`px-2.5 py-1 text-[10px] font-medium rounded transition-all ${showAfter ? "bg-geo-green/15 text-geo-green" : "text-muted-foreground"}`}>After</button>
        </div>
      </div>
      <motion.div key={showAfter ? "a" : "b"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-2.5 rounded border ${showAfter ? "bg-geo-green/5 border-geo-green/15" : "bg-geo-red/5 border-geo-red/15"}`}>
        <div className="flex items-start gap-2">
          <ArrowRight size={12} className={`mt-0.5 shrink-0 ${showAfter ? "text-geo-green" : "text-geo-red"}`} />
          <p className="text-[12px] leading-relaxed">{showAfter ? zone.afterDescription : zone.beforeDescription}</p>
        </div>
      </motion.div>
    </div>
  );
}


function AICopilotSection({ zone }: { zone: Zone }) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [showFull, setShowFull] = useState(false);

  const toggle = (i: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <div className="glass-panel-sm p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center">
          <BrainCircuit size={12} className="text-primary" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">AI Action Copilot</span>
        <div className="ml-auto px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-mono font-medium">
          {completed.size}/{zone.aiSteps.length}
        </div>
      </div>

      {/* AI Summary */}
      <div className="p-2 rounded bg-primary/5 border border-primary/10 mb-2">
        <p className="text-[11px] leading-relaxed text-secondary-foreground">
          {showFull ? zone.aiSummary : zone.aiSummary.slice(0, 200) + "..."}
        </p>
        <button onClick={() => setShowFull(p => !p)} className="text-[10px] text-primary mt-1">{showFull ? "Less" : "Read more"}</button>
      </div>

      {/* Steps */}
      <div className="space-y-1 mb-2">
        {zone.aiSteps.map((step, i) => (
          <button key={i} onClick={() => toggle(i)} className={`w-full text-left flex items-start gap-2 p-1.5 rounded transition-all ${completed.has(i) ? "bg-primary/5" : "hover:bg-secondary/40"}`}>
            <div className="mt-0.5 shrink-0">
              {completed.has(i) ? <CheckCircle2 size={13} className="text-primary" /> : <Circle size={13} className="text-muted-foreground/40" />}
            </div>
            <div>
              <span className="text-[9px] font-mono text-muted-foreground mr-1">{String(i + 1).padStart(2, "0")}</span>
              <span className={`text-[11px] ${completed.has(i) ? "line-through text-muted-foreground" : ""}`}>{step}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Community Checklist */}
      <div className="pt-2 border-t border-border/30">
        <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Community Checklist</div>
        <div className="space-y-0.5">
          {zone.communityChecklist.map((item, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
              <span className="text-primary shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Municipality Note */}
      <div className="mt-2 pt-2 border-t border-border/30">
        <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Municipality Planning Note</div>
        <p className="text-[10px] text-muted-foreground leading-relaxed">{zone.municipalityNote}</p>
      </div>
    </div>
  );
}
