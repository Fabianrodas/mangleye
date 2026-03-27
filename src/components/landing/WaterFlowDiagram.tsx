import { motion } from "framer-motion";
import { MessageSquare, Map, CheckCircle, BarChart3, Building2, TreePine, ArrowRight } from "lucide-react";

const steps = [
  { icon: MessageSquare, label: "Citizen report", desc: "Flooding or ecological observation documented by a community member", color: "text-destructive", bg: "bg-destructive/8" },
  { icon: Map, label: "Map visibility", desc: "Report appears on the live map and integrates with geospatial data", color: "text-geo-blue", bg: "bg-geo-blue/8" },
  { icon: CheckCircle, label: "Community validation", desc: "Neighbors confirm the observation, increasing data confidence", color: "text-primary", bg: "bg-primary/8" },
  { icon: BarChart3, label: "Priority scoring", desc: "Zone receives a 0–100 score based on urgency, exposure, and ecology", color: "text-geo-amber", bg: "bg-geo-amber/8" },
  { icon: Building2, label: "Municipal coordination", desc: "Priority zones surface for institutional planning and budgeting", color: "text-geo-purple", bg: "bg-geo-purple/8" },
  { icon: TreePine, label: "Intervention", desc: "Ecological restoration, hybrid infrastructure, or drainage improvements deployed", color: "text-geo-green", bg: "bg-geo-green/8" },
];

export default function ReportToAction() {
  return (
    <section className="py-16 px-6 bg-white border-y border-border/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2">From report to real action</h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Your report feeds a system that prioritizes intervention where it matters most.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-panel p-4 relative"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${step.bg} flex items-center justify-center shrink-0`}>
                  <step.icon size={16} className={step.color} />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/50 font-bold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-sm font-semibold mb-1">{step.label}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && i % 3 !== 2 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-border">
                  <ArrowRight size={12} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
