import { useState } from "react";
import { type Zone } from "@/data/zones";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Sprout, Users, Maximize2, X, Droplets, BrainCircuit, TreePine, CheckCircle2, ArrowRight, Shield, Eye, Wrench, Zap, MessageSquare, Camera, ThumbsUp, MapPin } from "lucide-react";
import ZoneBadge from "./ZoneBadge";
import type { RiskLevel } from "@/data/zones";
import { Link } from "react-router-dom";

interface ZoneDetailProps {
  zone: Zone | null;
  onClose: () => void;
}

const LevelPill = ({ level }: { level: RiskLevel }) => {
  const cls = level === "High" ? "bg-destructive/12 text-destructive" : level === "Medium" ? "bg-geo-amber/12 text-geo-amber" : "bg-geo-green/12 text-geo-green";
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${cls}`}>{level}</span>;
};

const ScoreBar = ({ label, value, max }: { label: string; value: number; max: number }) => {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-muted-foreground w-[120px] shrink-0 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground w-[36px] text-right">{value}/{max}</span>
    </div>
  );
};

type TabId = "overview" | "risk" | "ecology" | "community";
const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "risk", label: "Risk" },
  { id: "ecology", label: "Ecology" },
  { id: "community", label: "Community" },
];

export default function ZoneDetail({ zone, onClose }: ZoneDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <AnimatePresence mode="wait">
      {zone && (
        <motion.div
          key={zone.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-bold leading-tight">{zone.name}</h2>
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

          {/* Priority Score */}
          <div className="p-3 rounded-lg bg-secondary/40 flex items-center gap-3">
            <div className="relative w-11 h-11 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(200 12% 88%)" strokeWidth="3" />
                <motion.path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"
                  stroke={zone.priorityScore >= 85 ? "hsl(6,62%,44%)" : zone.priorityScore >= 75 ? "hsl(38,80%,48%)" : "hsl(172,40%,28%)"}
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
              <div className="flex items-center gap-1.5 mt-0.5">
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
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-destructive text-white text-xs font-bold rounded-lg hover:bg-destructive/90 transition-colors"
            >
              <AlertTriangle size={12} />
              Report Here
            </Link>
            <Link
              to="/report/ecological"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-geo-green/10 text-geo-green text-xs font-bold rounded-lg hover:bg-geo-green/15 transition-colors"
            >
              <TreePine size={12} />
              Add Observation
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
      <div className="p-3 rounded-lg border border-border/40 bg-white">
        <div className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Score Factors</div>
        <div className="space-y-1.5">
          {zone.scoreFactors.map(f => <ScoreBar key={f.label} {...f} />)}
        </div>
      </div>
      <div className="p-3 rounded-lg border border-border/40 bg-white">
        <div className="flex items-center gap-1.5 mb-2">
          <Zap size={11} className="text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Why This Zone?</span>
        </div>
        <div className="space-y-1">
          {zone.whyPrioritized.map((reason, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px]">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              <span className="text-muted-foreground">{reason}</span>
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
      <div className="p-3 rounded-lg border border-destructive/15 bg-destructive/3">
        <div className="flex items-center gap-1.5 mb-2">
          <AlertTriangle size={11} className="text-destructive" />
          <span className="text-[10px] font-semibold uppercase text-destructive">Risk Assessment</span>
          <div className="ml-auto"><LevelPill level={zone.floodLevel} /></div>
        </div>
        <p className="text-[12px] leading-relaxed text-muted-foreground mb-2">{zone.risk}</p>
        <div className="grid grid-cols-2 gap-1.5">
          {zone.riskIndicators.map(ind => (
            <div key={ind.label} className="flex items-center justify-between p-1.5 rounded bg-white/80">
              <span className="text-[10px] text-muted-foreground">{ind.label}</span>
              <LevelPill level={ind.level} />
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 rounded-lg border border-border/40 bg-white">
        <div className="text-[10px] font-semibold uppercase text-muted-foreground mb-2">Permeability</div>
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {[
            { label: "Permeability", level: zone.permeability.permeabilityLevel },
            { label: "Sealing", level: zone.permeability.sealingLevel },
            { label: "Urban Cover", level: zone.permeability.urbanCoverIntensity },
          ].map(m => (
            <div key={m.label} className="flex items-center justify-between p-1.5 rounded bg-secondary/40">
              <span className="text-[10px] text-muted-foreground">{m.label}</span>
              <LevelPill level={m.level} />
            </div>
          ))}
          <div className="flex items-center justify-between p-1.5 rounded bg-secondary/40">
            <span className="text-[10px] text-muted-foreground">Imperviousness</span>
            <span className="text-[10px] font-mono font-bold">{zone.permeability.imperviousnessEstimate}</span>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{zone.permeability.description}</p>
      </div>
    </div>
  );
}

function EcologyTab({ zone }: { zone: Zone }) {
  return (
    <div className="space-y-3">
      <div className="p-3 rounded-lg border border-geo-green/15 bg-geo-green/3">
        <div className="flex items-center gap-1.5 mb-2">
          <Sprout size={11} className="text-geo-green" />
          <span className="text-[10px] font-semibold uppercase text-geo-green">Ecological Opportunity</span>
        </div>
        <p className="text-[12px] leading-relaxed text-muted-foreground mb-2">{zone.opportunity}</p>
        <div className="grid grid-cols-2 gap-1.5">
          {zone.opportunityIndicators.map(ind => (
            <div key={ind.label} className="flex items-center justify-between p-1.5 rounded bg-white/80">
              <span className="text-[10px] text-muted-foreground">{ind.label}</span>
              <LevelPill level={ind.level} />
            </div>
          ))}
        </div>
      </div>
      {zone.speciesDeferred ? (
        <div className="p-3 rounded-lg border border-border/40 bg-white">
          <p className="text-[11px] text-muted-foreground italic">
            Species recommendation deferred until hydrological conditions are validated.
          </p>
        </div>
      ) : zone.speciesRecommendations.length > 0 && (
        <div className="p-3 rounded-lg border border-border/40 bg-white">
          <div className="flex items-center gap-1.5 mb-2">
            <TreePine size={11} className="text-geo-green" />
            <span className="text-[10px] font-semibold uppercase text-geo-green">Native Species</span>
          </div>
          <div className="space-y-2">
            {zone.speciesRecommendations.map((sp, i) => (
              <div key={i} className="p-2 rounded bg-secondary/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-semibold">{sp.commonName}</span>
                  <span className="text-[10px] text-muted-foreground italic">{sp.scientificName}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-geo-green/10 text-geo-green">{sp.edgeType}</span>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-geo-blue/10 text-geo-blue">{sp.plantingType}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{sp.usageNote}</p>
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
      <div className="p-3 rounded-lg border border-border/40 bg-white">
        <div className="flex items-center gap-1.5 mb-2">
          <Wrench size={11} className="text-geo-amber" />
          <span className="text-[10px] font-semibold uppercase text-geo-amber">Intervention</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 p-2 rounded bg-primary/5 border border-primary/15">
            <span className="text-[9px] font-bold uppercase text-primary mt-0.5 w-14 shrink-0">Primary</span>
            <span className="text-[12px] font-medium">{zone.recommendedIntervention.primary}</span>
          </div>
          <div className="flex items-start gap-2 p-2 rounded bg-secondary/40">
            <span className="text-[9px] font-bold uppercase text-muted-foreground mt-0.5 w-14 shrink-0">Secondary</span>
            <span className="text-[12px] text-muted-foreground">{zone.recommendedIntervention.secondary}</span>
          </div>
        </div>
      </div>
      <div className="p-3 rounded-lg border border-border/40 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <BrainCircuit size={11} className="text-primary" />
          <span className="text-[10px] font-semibold uppercase text-primary">Action Steps</span>
          <div className="ml-auto px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-mono font-bold">
            {completed.size}/{zone.aiSteps.length}
          </div>
        </div>
        <div className="space-y-1">
          {zone.aiSteps.map((step, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`w-full text-left flex items-start gap-2 p-2 rounded transition-colors ${
                completed.has(i) ? "bg-primary/5" : "bg-secondary/20 hover:bg-secondary/40"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                completed.has(i) ? "border-primary bg-primary" : "border-muted-foreground/25"
              }`}>
                {completed.has(i) && <CheckCircle2 size={10} className="text-white" />}
              </div>
              <span className={`text-[11px] ${completed.has(i) ? "text-primary line-through" : "text-muted-foreground"}`}>{step}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityTab({ zone }: { zone: Zone }) {
  const recentReports = [
    { type: "flood", text: "Severe flooding on main road", date: "2 days ago", user: "Anonymous", validated: 5 },
    { type: "flood", text: "Drainage overflow near school", date: "4 days ago", user: "Citizen", validated: 12 },
    { type: "ecological", text: "Mangrove regrowth spotted", date: "1 week ago", user: "Volunteer", validated: 8 },
  ];

  return (
    <div className="space-y-3">
      {/* Community Actions */}
      <div className="p-3 rounded-lg border border-primary/15 bg-primary/3">
        <div className="text-[10px] font-semibold uppercase text-primary mb-2">Community Actions</div>
        <div className="space-y-1.5">
          {[
            { icon: AlertTriangle, label: "Report flooding here", link: "/report/flood", color: "text-destructive" },
            { icon: Camera, label: "Add photo evidence", link: "/report/flood", color: "text-geo-blue" },
            { icon: TreePine, label: "Add ecological observation", link: "/report/ecological", color: "text-geo-green" },
            { icon: ThumbsUp, label: "Confirm this flooding happens here", link: "#", color: "text-primary" },
          ].map((action, i) => (
            <Link
              key={i}
              to={action.link}
              className="flex items-center gap-2.5 p-2 rounded-lg bg-white hover:bg-secondary/30 transition-colors"
            >
              <action.icon size={13} className={action.color} />
              <span className="text-[12px] font-medium">{action.label}</span>
              <ArrowRight size={10} className="text-muted-foreground ml-auto" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="p-3 rounded-lg border border-border/40 bg-white">
        <div className="flex items-center gap-1.5 mb-2">
          <MessageSquare size={11} className="text-geo-blue" />
          <span className="text-[10px] font-semibold uppercase text-geo-blue">Recent Reports</span>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground">{recentReports.length}</span>
        </div>
        <div className="space-y-1.5">
          {recentReports.map((report, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded bg-secondary/30">
              {report.type === "flood" ? (
                <Droplets size={11} className="text-geo-blue shrink-0 mt-0.5" />
              ) : (
                <TreePine size={11} className="text-geo-green shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium">{report.text}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground">{report.date}</span>
                  <span className="flex items-center gap-0.5 text-[10px] text-primary">
                    <ThumbsUp size={8} /> {report.validated} validated
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Checklist */}
      <div className="p-3 rounded-lg border border-border/40 bg-white">
        <div className="text-[10px] font-semibold uppercase text-muted-foreground mb-2">How You Can Help</div>
        <div className="space-y-1">
          {zone.communityChecklist.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
              <span className="text-primary shrink-0 mt-0.5">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeforeAfterSection({ zone }: { zone: Zone }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <div className="p-3 rounded-lg border border-border/40 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold uppercase text-muted-foreground">Current vs. Intervention</span>
        <div className="flex items-center bg-secondary rounded-md p-0.5">
          <button onClick={() => setShowAfter(false)} className={`px-2.5 py-1 text-[10px] font-medium rounded transition-all ${!showAfter ? 'bg-destructive/10 text-destructive' : 'text-muted-foreground'}`}>Before</button>
          <button onClick={() => setShowAfter(true)} className={`px-2.5 py-1 text-[10px] font-medium rounded transition-all ${showAfter ? 'bg-geo-green/12 text-geo-green' : 'text-muted-foreground'}`}>After</button>
        </div>
      </div>
      <motion.div key={showAfter ? "a" : "b"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-2.5 rounded border ${showAfter ? "bg-geo-green/3 border-geo-green/15" : "bg-destructive/3 border-destructive/15"}`}>
        <div className="flex items-start gap-2">
          <ArrowRight size={11} className={`mt-0.5 shrink-0 ${showAfter ? "text-geo-green" : "text-destructive"}`} />
          <p className="text-[12px] leading-relaxed text-muted-foreground">{showAfter ? zone.afterDescription : zone.beforeDescription}</p>
        </div>
      </motion.div>
    </div>
  );
}
