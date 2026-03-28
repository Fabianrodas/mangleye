import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Droplets, Users, Waves, TreePine, Target, Layers, BrainCircuit, Shield, CheckCircle, ChevronDown, ArrowRight, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-aerial.jpg";

const STEPS = [
  { icon: Droplets, title: "Analyze flood exposure", desc: "Aggregate citizen reports and remote sensing data to identify recurrent flooding patterns and at-risk corridors.", color: "geo-blue" },
  { icon: Users, title: "Evaluate population exposure", desc: "Cross-reference flood zones with population density, vulnerability indicators, and infrastructure proximity.", color: "destructive" },
  { icon: Waves, title: "Map water edges", desc: "Identify estuaries, canals, and tidal edges that influence drainage, ecology, and intervention suitability.", color: "geo-cyan" },
  { icon: TreePine, title: "Assess ecological edges", desc: "Classify mangrove areas as functional, degraded, or candidate for restoration based on coverage and health metrics.", color: "geo-green" },
  { icon: Target, title: "Estimate restoration suitability", desc: "Evaluate hydrology, soil conditions, salinity, elevation, and physical barriers for each intervention zone.", color: "primary" },
  { icon: Layers, title: "Analyze surface permeability", desc: "Estimate surface sealing, imperviousness, and its impact on infiltration capacity and runoff generation.", color: "geo-purple" },
  { icon: Shield, title: "Score priority zones", desc: "Combine all factors into a transparent 0–100 priority score with weighted, explainable components.", color: "geo-amber" },
  { icon: BrainCircuit, title: "Generate recommendation", desc: "AI produces zone-specific intervention guidance with community checklists and municipality notes.", color: "primary" },
];

const scoreFactors = [
  { label: "Flood Vulnerability", max: 40, fill: "bg-geo-blue" },
  { label: "Population Exposure", max: 20, fill: "bg-destructive" },
  { label: "Proximity to Water Edge", max: 20, fill: "bg-geo-cyan" },
  { label: "Ecological Degradation", max: 20, fill: "bg-geo-green" },
  { label: "Restoration Suitability", max: 15, fill: "bg-primary" },
  { label: "Expected Social Benefit", max: 15, fill: "bg-geo-amber" },
];

const interventions = [
  { label: "Protect", desc: "Preserve existing functional mangrove areas", color: "geo-green" },
  { label: "Restore Hydrology", desc: "Reopen obstructed channels and reconnect water flow", color: "geo-blue" },
  { label: "Revegetate", desc: "Plant native species where conditions are suitable", color: "geo-teal" },
  { label: "Hybrid Infrastructure", desc: "Combine ecological + engineered solutions", color: "geo-amber" },
  { label: "Monitor First", desc: "Validate conditions before intervening", color: "geo-purple" },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Methodology() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Editorial hero */}
      <div className="relative h-[220px] md:h-[280px] overflow-hidden">
        <img src={heroImg} alt="Methodology" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-6 w-full">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-2">
                <Eye size={14} className="text-white/50" />
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Technical Overview</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Methodology</h1>
              <p className="text-sm text-white/60 max-w-md">How Mangleye analyzes urban flood exposure and ecological opportunity to produce transparent, zone-specific recommendations.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-10 px-6">

        {/* Analysis pipeline — numbered steps */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.05 } } }} className="mb-14">
          <h2 className="text-lg font-bold mb-5">Analysis Pipeline</h2>
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-px bg-border/60" />
            <div className="space-y-1">
              {STEPS.map((step, i) => (
                <motion.button
                  key={i}
                  variants={fadeUp}
                  onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                  className="w-full text-left flex items-start gap-4 p-3 rounded-xl hover:bg-secondary/40 transition-colors relative"
                >
                  <div className={`w-[46px] h-[46px] rounded-xl bg-${step.color}/10 flex items-center justify-center shrink-0 relative z-10`}>
                    <step.icon size={20} className={`text-${step.color}`} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-bold">{step.title}</span>
                    </div>
                    {expandedStep === i && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground leading-relaxed mt-1">
                        {step.desc}
                      </motion.p>
                    )}
                  </div>
                  <ChevronDown size={14} className={`text-muted-foreground mt-3 shrink-0 transition-transform duration-200 ${expandedStep === i ? "rotate-180" : ""}`} />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Score composition — visual bars */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
          <h2 className="text-lg font-bold mb-1">Priority Score Composition</h2>
          <p className="text-xs text-muted-foreground mb-5">Each zone receives a 0–100 score from weighted factors</p>
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="space-y-3">
              {scoreFactors.map((f, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{f.label}</span>
                    <span className="text-[11px] font-mono text-muted-foreground">max {f.max} pts</span>
                  </div>
                  <div className="w-full h-2.5 bg-secondary/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(f.max / 40) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.08 }}
                      className={`h-full rounded-full ${f.fill}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total possible</span>
              <span className="text-sm font-bold font-mono">130 points → normalized to 100</span>
            </div>
          </div>
        </motion.div>

        {/* Intervention types */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.06 } } }} className="mb-14">
          <h2 className="text-lg font-bold mb-1">Possible Interventions</h2>
          <p className="text-xs text-muted-foreground mb-5">The system recommends context-appropriate actions — mangroves are not always the answer</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {interventions.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className={`p-4 rounded-xl border border-${item.color}/15 bg-${item.color}/[0.03] hover:bg-${item.color}/[0.06] transition-colors`}>
                <div className={`w-2 h-2 rounded-full bg-${item.color} mb-3`} />
                <div className="text-sm font-bold mb-1">{item.label}</div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link to="/map" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
            Explore the Map <ArrowRight size={14} />
          </Link>
          <Link to="/learn" className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
            Back to Learn
          </Link>
        </div>
      </div>
    </div>
  );
}
