import Header from "@/components/Header";
import { zones, type Zone } from "@/data/zones";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, MapPin, Droplets, Users, Mountain, Maximize2, AlertTriangle, Sprout, Wrench, Zap, Shield, TreePine, Eye, BrainCircuit, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ZoneBadge from "@/components/ZoneBadge";
import type { RiskLevel } from "@/data/zones";

const LevelPill = ({ level }: { level: RiskLevel }) => {
  const cls = level === "High" ? "bg-geo-red/15 text-geo-red" : level === "Medium" ? "bg-geo-amber/15 text-geo-amber" : "bg-geo-green/15 text-geo-green";
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${cls}`}>{level}</span>;
};

export default function TechnicalReport() {
  const [selectedId, setSelectedId] = useState(zones[0].id);
  const zone = zones.find(z => z.id === selectedId)!;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-6">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ChevronLeft size={14} /> Dashboard
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <FileText size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Technical Zone Report</h1>
              <p className="text-xs text-muted-foreground">Presentation-ready analysis for planning and review</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary/15 text-primary rounded-lg hover:bg-primary/25 transition-colors">
            <Download size={14} />
            Export PDF
          </button>
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

        {/* Report content */}
        <motion.div key={zone.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 print:space-y-6">
          {/* Report header */}
          <div className="glass-panel p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Zone Report</div>
                <h2 className="text-2xl font-bold">{zone.name}</h2>
                <div className="flex items-center gap-1 mt-1">
                  <span className="px-2 py-0.5 rounded bg-secondary text-[10px] font-semibold uppercase">{zone.zoneType}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold font-mono ${zone.priorityScore >= 85 ? "text-geo-red" : zone.priorityScore >= 75 ? "text-geo-amber" : "text-geo-green"}`}>
                  {zone.priorityScore}
                </div>
                <div className="text-[10px] text-muted-foreground">Priority Score</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="text-center p-2 rounded bg-secondary/30">
                <Maximize2 size={12} className="mx-auto mb-1 text-muted-foreground" />
                <div className="text-xs font-mono font-bold">{zone.area}</div>
                <div className="text-[9px] text-muted-foreground">Area</div>
              </div>
              <div className="text-center p-2 rounded bg-secondary/30">
                <Users size={12} className="mx-auto mb-1 text-muted-foreground" />
                <div className="text-xs font-mono font-bold">{zone.population}</div>
                <div className="text-[9px] text-muted-foreground">Population</div>
              </div>
              <div className="text-center p-2 rounded bg-secondary/30">
                <Mountain size={12} className="mx-auto mb-1 text-muted-foreground" />
                <div className="text-xs font-mono font-bold">{zone.elevation}</div>
                <div className="text-[9px] text-muted-foreground">Elevation</div>
              </div>
              <div className="text-center p-2 rounded bg-secondary/30">
                <Droplets size={12} className="mx-auto mb-1 text-muted-foreground" />
                <LevelPill level={zone.floodLevel} />
                <div className="text-[9px] text-muted-foreground mt-1">Flood Level</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {zone.badges.map(b => <ZoneBadge key={b} badge={b} />)}
            </div>
          </div>

          {/* Score Factors */}
          <div className="glass-panel p-6">
            <h3 className="text-sm font-bold mb-3">Score Factor Breakdown</h3>
            <div className="space-y-2">
              {zone.scoreFactors.map(f => (
                <div key={f.label} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-[200px] shrink-0">{f.label}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(f.value / f.max) * 100}%` }} />
                  </div>
                  <span className="text-xs font-mono w-10 text-right">{f.value}/{f.max}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk & Opportunity */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-panel p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle size={14} className="text-geo-red" />
                <h3 className="text-sm font-bold text-geo-red">Risk Diagnosis</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{zone.risk}</p>
              <div className="space-y-1">
                {zone.riskIndicators.map(ind => (
                  <div key={ind.label} className="flex items-center justify-between p-1.5 rounded bg-secondary/30">
                    <span className="text-[10px] text-muted-foreground">{ind.label}</span>
                    <LevelPill level={ind.level} />
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <Sprout size={14} className="text-geo-green" />
                <h3 className="text-sm font-bold text-geo-green">Opportunity Diagnosis</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{zone.opportunity}</p>
              <div className="space-y-1">
                {zone.opportunityIndicators.map(ind => (
                  <div key={ind.label} className="flex items-center justify-between p-1.5 rounded bg-secondary/30">
                    <span className="text-[10px] text-muted-foreground">{ind.label}</span>
                    <LevelPill level={ind.level} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Permeability */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-bold mb-2">Permeability & Surface Analysis</h3>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {[
                { label: "Permeability", level: zone.permeability.permeabilityLevel },
                { label: "Sealing", level: zone.permeability.sealingLevel },
                { label: "Urban Cover", level: zone.permeability.urbanCoverIntensity },
                { label: "Edge Compression", level: zone.permeability.edgeCompression },
              ].map(m => (
                <div key={m.label} className="text-center p-2 rounded bg-secondary/30">
                  <span className="text-[9px] text-muted-foreground block mb-1">{m.label}</span>
                  <LevelPill level={m.level} />
                </div>
              ))}
              <div className="text-center p-2 rounded bg-secondary/30">
                <span className="text-[9px] text-muted-foreground block mb-1">Imperviousness</span>
                <span className="text-xs font-mono font-bold">{zone.permeability.imperviousnessEstimate}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{zone.permeability.description}</p>
          </div>

          {/* Intervention */}
          <div className="glass-panel p-5">
            <div className="flex items-center gap-1.5 mb-3">
              <Wrench size={14} className="text-geo-amber" />
              <h3 className="text-sm font-bold">Recommended Intervention</h3>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded bg-primary/5 border border-primary/15">
                <span className="text-[9px] font-bold uppercase text-primary">Primary: </span>
                <span className="text-sm">{zone.recommendedIntervention.primary}</span>
              </div>
              <div className="p-3 rounded bg-secondary/30">
                <span className="text-[9px] font-bold uppercase text-muted-foreground">Secondary: </span>
                <span className="text-sm text-muted-foreground">{zone.recommendedIntervention.secondary}</span>
              </div>
              <div className="p-2 rounded bg-secondary/20">
                <span className="text-[9px] font-bold uppercase text-muted-foreground">Conditional: </span>
                <span className="text-xs text-muted-foreground">{zone.recommendedIntervention.conditional}</span>
              </div>
            </div>
          </div>

          {/* Why Prioritized */}
          <div className="glass-panel p-5">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={14} className="text-primary" />
              <h3 className="text-sm font-bold">Why This Zone Was Prioritized</h3>
            </div>
            <div className="space-y-1">
              {zone.whyPrioritized.map((reason, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-primary shrink-0">•</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preconditions */}
          <div className="glass-panel p-5">
            <div className="flex items-center gap-1.5 mb-2">
              <Shield size={14} className="text-geo-cyan" />
              <h3 className="text-sm font-bold">Preconditions for Action</h3>
            </div>
            <div className="space-y-1">
              {zone.preconditions.map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Eye size={10} className="mt-0.5 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Viability */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-bold mb-3">Viability Traffic Light</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Urban Urgency", level: zone.viability.urbanUrgency },
                { label: "Ecological Viability", level: zone.viability.ecologicalViability },
                { label: "Social Complexity", level: zone.viability.socialComplexity },
                { label: "Implementation", level: zone.viability.implementationFeasibility },
              ].map(v => (
                <div key={v.label} className="p-3 rounded bg-secondary/30 text-center">
                  <div className={`w-5 h-5 rounded-full mx-auto mb-2 ${v.level === "High" ? "bg-geo-green" : v.level === "Medium" ? "bg-geo-amber" : "bg-geo-red"}`} />
                  <div className="text-[10px] text-muted-foreground">{v.label}</div>
                  <div className="text-xs font-bold mt-0.5">{v.level}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Species */}
          {!zone.speciesDeferred && zone.speciesRecommendations.length > 0 && (
            <div className="glass-panel p-5">
              <div className="flex items-center gap-1.5 mb-3">
                <TreePine size={14} className="text-geo-green" />
                <h3 className="text-sm font-bold">Native Species Recommendation</h3>
              </div>
              <div className="space-y-3">
                {zone.speciesRecommendations.map((sp, i) => (
                  <div key={i} className="p-3 rounded bg-secondary/30">
                    <div className="text-sm font-semibold">{sp.commonName} <span className="text-xs text-muted-foreground italic font-normal">({sp.scientificName})</span></div>
                    <div className="flex gap-1 mt-1 mb-2">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-geo-green/10 text-geo-green">{sp.edgeType}</span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-geo-blue/10 text-geo-blue">{sp.plantingType}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{sp.usageNote}</p>
                    <p className="text-[10px] text-geo-amber"><AlertTriangle size={9} className="inline mr-1" />{sp.mistakesToAvoid}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Summary */}
          <div className="glass-panel p-5">
            <div className="flex items-center gap-1.5 mb-2">
              <BrainCircuit size={14} className="text-primary" />
              <h3 className="text-sm font-bold">AI Intelligence Summary</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{zone.aiSummary}</p>
          </div>

          {/* Action checklist */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-bold mb-2">Action Checklist</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Intervention Steps</div>
                <div className="space-y-1">
                  {zone.aiSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="font-mono text-primary shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Community Actions</div>
                <div className="space-y-1">
                  {zone.communityChecklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-primary shrink-0">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Municipality note */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-bold mb-2">Municipality Planning Note</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{zone.municipalityNote}</p>
          </div>

          <div className="text-center text-[10px] text-muted-foreground py-4">
            Borde Vivo AI · Technical Zone Report · Generated for planning and review purposes
          </div>
        </motion.div>
      </div>
    </div>
  );
}
