import { useState } from "react";
import { type Zone } from "@/data/zones";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Sprout, Users, Mountain, Maximize2, X, Droplets, MapPin, BrainCircuit, TreePine, CheckCircle2, Circle, ArrowRight, Shield, Eye, Wrench, Zap, MessageSquare } from "lucide-react";
import ZoneBadge from "./ZoneBadge";
import type { RiskLevel } from "@/data/zones";
import { Link } from "react-router-dom";

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
      <span className="text-[11px] text-muted-foreground w-[130px] shrink-0 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground w-[36px] text-right">{value}/{max}</span>
    </div>
  );
};

type TabId = "overview" | "risk" | "ecology" | "actions" | "community";
const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "risk", label: "Risk" },
  { id: "ecology", label: "Ecology" },
  { id: "actions", label: "Actions" },
  { id: "community", label: "Community" },
];

export default function ZoneDetail({ zone, onClose }: ZoneDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

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
              <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                <span className="px-1.5 py-0.5 rounded bg-secondary text-[9px] font-semibold uppercase">{zone.zoneType}</span>
                <span className="flex items-center gap-0.5"><Maximize2 size={9} />{zone.area}</span>
                <span className="flex items-center gap-0.5"><Users size={9} />{zone.population}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {zone.badges.map(b => <ZoneBadge key={b} badge={b} />)}
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-secondary transition-colors">
              <X size={14} className="text-muted-foreground" />
            </button>
          </div>

          {/* Priority Score - always visible */}
          <div className="glass-panel-sm p-3 flex items-center gap-3">
            <div className="relative w-12 h-12 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(45 15% 88%)" strokeWidth="3" />
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
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Priority Score</div>
              <div className="flex items-center gap-1 mt-0.5">
                <Droplets size={10} className="text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Flood:</span>
                <LevelPill level={zone.floodLevel} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Link
              to="/report/flood"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-destructive/10 text-destructive text-xs font-semibold rounded-lg hover:bg-destructive/15 transition-colors"
            >
              <AlertTriangle size={12} />
              Report Flood
            </Link>
            <Link
              to="/report/ecological"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-geo-green/10 text-geo-green text-xs font-semibold rounded-lg hover:bg-geo-green/15 transition-colors"
            >
              <TreePine size={12} />
              Observation
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-0.5 bg-secondary/50 rounded-lg p-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 text-[10px] font-semibold rounded-md transition-all ${
                  activeTab === tab.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {activeTab === "overview" && <OverviewTab zone={zone} />}
              {activeTab === "risk" && <RiskTab zone={zone} />}
              {activeTab === "ecology" && <EcologyTab zone={zone} />}
              {activeTab === "actions" && <ActionsTab zone={zone} />}
              {activeTab === "community" && <CommunityTab zone={zone} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OverviewTab({ zone }: { zone: Zone }) {
  return (
    <div className="space-y-3">
      <div className="glass-panel-sm p-3">
        <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Score Factors</div>
        <div className="space-y-1.5">
          {zone.scoreFactors.map(f => <ScoreBar key={f.label} {...f} />)}
        </div>
      </div>
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
      <BeforeAfterSection zone={zone} />
    </div>
  );
}

function RiskTab({ zone }: { zone: Zone }) {
  return (
    <div className="space-y-3">
      <div className="glass-panel-sm p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <AlertTriangle size={12} className="text-geo-red" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-red">Risk Assessment</span>
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
      <div className="glass-panel-sm p-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Permeability & Surface</div>
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
    </div>
  );
}

function EcologyTab({ zone }: { zone: Zone }) {
  return (
    <div className="space-y-3">
      <div className="glass-panel-sm p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Sprout size={12} className="text-geo-green" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-green">Ecological Opportunity</span>
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
      {zone.speciesDeferred ? (
        <div className="glass-panel-sm p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <TreePine size={12} className="text-geo-green" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-green">Native Species</span>
          </div>
          <p className="text-[11px] text-muted-foreground italic">
            Species recommendation deferred until hydrological and soil conditions are validated.
          </p>
        </div>
      ) : zone.speciesRecommendations.length > 0 && (
        <div className="glass-panel-sm p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <TreePine size={12} className="text-geo-green" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-green">Native Species Guide</span>
          </div>
          <div className="space-y-2">
            {zone.speciesRecommendations.map((sp, i) => (
              <div key={i} className="p-2 rounded bg-secondary/40 border border-border/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-semibold">{sp.commonName}</span>
                  <span className="text-[10px] text-muted-foreground italic">{sp.scientificName}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-geo-green/10 text-geo-green border border-geo-green/20">{sp.edgeType}</span>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-geo-blue/10 text-geo-blue border border-geo-blue/20">{sp.plantingType}</span>
                </div>
                <p className="text-[10px] text-secondary-foreground">{sp.usageNote}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ActionsTab({ zone }: { zone: Zone }) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <div className="glass-panel-sm p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Wrench size={12} className="text-geo-amber" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-amber">Recommended Intervention</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 p-2 rounded bg-primary/5 border border-primary/15">
            <span className="text-[9px] font-bold uppercase text-primary mt-0.5 w-14 shrink-0">Primary</span>
            <span className="text-[12px] font-medium">{zone.recommendedIntervention.primary}</span>
          </div>
          <div className="flex items-start gap-2 p-2 rounded bg-secondary/50">
            <span className="text-[9px] font-bold uppercase text-muted-foreground mt-0.5 w-14 shrink-0">Secondary</span>
            <span className="text-[12px]">{zone.recommendedIntervention.secondary}</span>
          </div>
        </div>
      </div>
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
      <div className="glass-panel-sm p-3">
        <div className="flex items-center gap-2 mb-2">
          <BrainCircuit size={12} className="text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">AI Action Steps</span>
          <div className="ml-auto px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-mono font-medium">
            {completed.size}/{zone.aiSteps.length}
          </div>
        </div>
        <div className="space-y-1">
          {zone.aiSteps.map((step, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`w-full text-left flex items-start gap-2 p-2 rounded transition-colors ${
                completed.has(i) ? "bg-primary/5 border border-primary/15" : "bg-secondary/30 hover:bg-secondary/50"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                completed.has(i) ? "border-primary bg-primary" : "border-muted-foreground/30"
              }`}>
                {completed.has(i) && <CheckCircle2 size={10} className="text-white" />}
              </div>
              <span className={`text-[11px] ${completed.has(i) ? "text-primary line-through" : "text-secondary-foreground"}`}>{step}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityTab({ zone }: { zone: Zone }) {
  // Mock community data
  const recentReports = [
    { type: "flood", date: "2 days ago", user: "Anonymous citizen" },
    { type: "ecological", date: "5 days ago", user: "Community volunteer" },
    { type: "flood", date: "1 week ago", user: "Anonymous citizen" },
  ];

  return (
    <div className="space-y-3">
      <div className="glass-panel-sm p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <MessageSquare size={12} className="text-geo-blue" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-geo-blue">Recent Reports</span>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground">{recentReports.length} total</span>
        </div>
        <div className="space-y-1.5">
          {recentReports.map((report, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded bg-secondary/30">
              {report.type === "flood" ? (
                <Droplets size={11} className="text-geo-blue shrink-0" />
              ) : (
                <TreePine size={11} className="text-geo-green shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-medium capitalize">{report.type} report</span>
                <span className="text-[10px] text-muted-foreground ml-1.5">· {report.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          to="/report/flood"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-destructive text-white text-xs font-semibold rounded-lg hover:bg-destructive/90 transition-colors"
        >
          <AlertTriangle size={12} />
          Report Flood
        </Link>
        <Link
          to="/report/ecological"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-geo-green text-white text-xs font-semibold rounded-lg hover:bg-geo-green/90 transition-colors"
        >
          <TreePine size={12} />
          Observation
        </Link>
      </div>

      <div className="glass-panel-sm p-3 text-center">
        <p className="text-[11px] text-muted-foreground">
          Validate reports by visiting zones and confirming observations.
        </p>
        <button className="mt-2 px-4 py-1.5 bg-secondary text-xs font-medium rounded-lg hover:bg-secondary/80 transition-colors">
          Validate nearby reports
        </button>
      </div>
    </div>
  );
}

function BeforeAfterSection({ zone }: { zone: Zone }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <div className="glass-panel-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current vs. Intervention</span>
        <div className="flex items-center bg-secondary rounded-md p-0.5">
          <button onClick={() => setShowAfter(false)} className={`px-2.5 py-1 text-[10px] font-medium rounded transition-all ${!showAfter ? 'bg-destructive/10 text-destructive' : 'text-muted-foreground'}`}>Before</button>
          <button onClick={() => setShowAfter(true)} className={`px-2.5 py-1 text-[10px] font-medium rounded transition-all ${showAfter ? 'bg-geo-green/15 text-geo-green' : 'text-muted-foreground'}`}>After</button>
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
