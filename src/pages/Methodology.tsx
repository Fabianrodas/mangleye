import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Droplets, Users, Waves, TreePine, Target, Layers, BrainCircuit, Shield, ArrowRight, CheckCircle } from "lucide-react";

const STEPS = [
  { icon: Droplets, title: "Analyze Urban Flood Exposure", desc: "Aggregate citizen flood reports and remote sensing data to identify areas with recurrent flooding and high water accumulation." },
  { icon: Users, title: "Evaluate Exposed Population", desc: "Cross-reference flood-prone areas with population density, informal settlement data, and socioeconomic vulnerability indicators." },
  { icon: Waves, title: "Cross-check Estuaries & Water Edges", desc: "Map proximity to estuary channels, canals, and water edges that influence drainage behavior and ecological opportunity." },
  { icon: TreePine, title: "Assess Ecological Edge Condition", desc: "Classify mangrove-related areas as functional, degraded, or candidate for restoration based on vegetation indices and field validation." },
  { icon: Target, title: "Estimate Restoration Suitability", desc: "Evaluate hydrological connectivity, soil conditions, salinity regime, and physical barriers to determine if restoration is viable." },
  { icon: Layers, title: "Estimate Permeability & Urban Sealing", desc: "Use urban cover analysis to estimate surface imperviousness and its impact on infiltration and runoff pressure." },
  { icon: Shield, title: "Prioritize Intervention Opportunity", desc: "Combine all factors into an explainable priority score (0-100) with transparent weight distribution across six dimensions." },
  { icon: BrainCircuit, title: "Generate Explainable Recommendation", desc: "AI interprets the composite analysis to produce zone-specific intervention guidance, community checklists, and municipality notes." },
];

export default function Methodology() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-3xl font-bold mb-3">Methodology</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            How Borde Vivo AI analyzes urban flood exposure, ecological opportunity, and intervention viability 
            to produce transparent, zone-specific recommendations.
          </p>
        </motion.div>

        {/* Flow */}
        <div className="space-y-4 mb-16">
          {STEPS.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <step.icon size={18} className="text-primary" />
                </div>
                {i < STEPS.length - 1 && <div className="w-px flex-1 bg-border/30 mt-2" />}
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground">Step {i + 1}</span>
                </div>
                <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Score Composition */}
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Priority Score Composition</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Each zone's priority score (0–100) is composed of six weighted dimensions. The breakdown is always visible to ensure transparency.
          </p>
          <div className="space-y-3">
            {[
              { label: "Flood Vulnerability", max: 40, desc: "Recurrence, severity, and extent of flooding based on citizen reports and spatial analysis" },
              { label: "Population Exposure", max: 20, desc: "Number and vulnerability of residents within the flood-affected area" },
              { label: "Proximity to Estuary / Water Edge", max: 20, desc: "Distance and connectivity to natural water systems that influence drainage and ecology" },
              { label: "Ecological Degradation / Edge Loss", max: 20, desc: "Extent of mangrove or ecological edge loss compared to historical baselines" },
              { label: "Preliminary Restoration Suitability", max: 15, desc: "Feasibility of ecological or hydrological restoration based on site conditions" },
              { label: "Expected Social Benefit", max: 15, desc: "Projected improvement in flood protection, public space, and community well-being" },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <div className="text-xs font-mono font-bold text-primary w-8 text-right shrink-0 mt-0.5">/{f.max}</div>
                <div>
                  <div className="text-sm font-medium">{f.label}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why not always mangroves */}
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-lg font-bold mb-3">Why the Intervention Is Not Always Planting Mangroves</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            A key design principle of Borde Vivo AI is intervention specificity. The platform evaluates each zone's conditions 
            to determine the most appropriate response, which may include:
          </p>
          <div className="space-y-2">
            {[
              "Protect existing mangrove areas where they're still functional",
              "Restore hydrology where channels are obstructed or buried",
              "Revegetate with native species where conditions are suitable",
              "Deploy hybrid green-blue infrastructure in dense urban zones",
              "Monitor and validate before acting in uncertain conditions",
              "Recommend alternative urban solutions where ecological intervention isn't viable",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Public reports */}
        <div className="glass-panel p-6 mb-8">
          <h2 className="text-lg font-bold mb-3">How Public Reports Contribute</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Citizen flood reports and ecological observations are core data inputs, not supplementary. 
            They provide temporal resolution that satellite imagery alone cannot capture, and they ground-truth 
            modeled flood zones with real-world experience.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-geo-blue/5 border border-geo-blue/15">
              <div className="text-xs font-semibold text-geo-blue mb-1">Flood Reports Feed Into</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Flood vulnerability scoring</li>
                <li>• Recurrence pattern analysis</li>
                <li>• Drainage obstruction identification</li>
                <li>• Priority zone validation</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-geo-green/5 border border-geo-green/15">
              <div className="text-xs font-semibold text-geo-green mb-1">Ecological Observations Feed Into</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Edge condition classification</li>
                <li>• Restoration suitability assessment</li>
                <li>• Biodiversity baseline data</li>
                <li>• Community engagement metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI framing */}
        <div className="glass-panel p-6">
          <h2 className="text-lg font-bold mb-3">How AI Recommendations Are Framed</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            The AI Action Copilot does not make autonomous decisions. It interprets the composite analysis 
            to generate structured guidance that is always tied to measurable inputs. Every recommendation includes:
          </p>
          <div className="space-y-2">
            {[
              "A plain-language summary explaining why the zone matters",
              "A score breakdown showing which factors drive the priority",
              "A structured intervention recommendation (primary, secondary, conditional)",
              "A community action checklist for citizen engagement",
              "A municipality planning note for institutional coordination",
              "Preconditions that must be validated before acting",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <ArrowRight size={12} className="text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
