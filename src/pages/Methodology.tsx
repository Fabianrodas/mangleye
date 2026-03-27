import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Droplets, Users, Waves, TreePine, Target, Layers, BrainCircuit, Shield, CheckCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const STEPS = [
  { icon: Droplets, title: "Analyze flood exposure", desc: "Aggregate citizen reports and remote sensing data to identify recurrent flooding." },
  { icon: Users, title: "Evaluate population exposure", desc: "Cross-reference flood zones with population density and vulnerability indicators." },
  { icon: Waves, title: "Map water edges", desc: "Identify estuaries, canals, and water edges that influence drainage and ecology." },
  { icon: TreePine, title: "Assess ecological edges", desc: "Classify mangrove areas as functional, degraded, or candidate for restoration." },
  { icon: Target, title: "Estimate restoration suitability", desc: "Evaluate hydrology, soil, salinity, and barriers for intervention viability." },
  { icon: Layers, title: "Analyze surface permeability", desc: "Estimate imperviousness and its impact on infiltration and runoff." },
  { icon: Shield, title: "Score priority zones", desc: "Combine all factors into a 0–100 priority score with transparent weights." },
  { icon: BrainCircuit, title: "Generate recommendation", desc: "AI produces zone-specific intervention guidance with community checklists." },
];

const scoreFactors = [
  { label: "Flood Vulnerability", max: 40 },
  { label: "Population Exposure", max: 20 },
  { label: "Proximity to Water Edge", max: 20 },
  { label: "Ecological Degradation", max: 20 },
  { label: "Restoration Suitability", max: 15 },
  { label: "Expected Social Benefit", max: 15 },
];

export default function Methodology() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto py-10 px-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-2xl font-bold mb-2">Methodology</h1>
          <p className="text-sm text-muted-foreground max-w-lg">
            How Mangleye analyzes urban flood exposure and ecological opportunity to produce transparent, zone-specific recommendations.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="space-y-2 mb-10">
          {STEPS.map((step, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setExpandedStep(expandedStep === i ? null : i)}
              className="w-full text-left glass-panel p-4 flex items-center gap-3 hover:shadow-sm transition-shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                <step.icon size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">{i + 1}</span>
                  <span className="text-sm font-semibold">{step.title}</span>
                </div>
                {expandedStep === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-muted-foreground mt-1 leading-relaxed"
                  >
                    {step.desc}
                  </motion.p>
                )}
              </div>
              <ChevronDown size={14} className={`text-muted-foreground transition-transform ${expandedStep === i ? "rotate-180" : ""}`} />
            </motion.button>
          ))}
        </div>

        {/* Score composition */}
        <div className="glass-panel p-5 mb-8">
          <h2 className="text-sm font-bold mb-3">Priority Score Composition (0–100)</h2>
          <div className="space-y-2">
            {scoreFactors.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground flex-1">{f.label}</span>
                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(f.max / 40) * 100}%` }} />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">/{f.max}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why not always mangroves */}
        <div className="glass-panel p-5">
          <h2 className="text-sm font-bold mb-3">Why the answer is not always planting mangroves</h2>
          <div className="space-y-1.5">
            {[
              "Protect existing functional mangrove areas",
              "Restore hydrology where channels are obstructed",
              "Revegetate with native species where suitable",
              "Deploy hybrid green-blue infrastructure in dense urban zones",
              "Monitor and validate before acting in uncertain conditions",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle size={13} className="text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
