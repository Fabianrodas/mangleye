import { motion } from "framer-motion";
import { CloudRain, ArrowDown, XCircle, AlertTriangle, ArrowRight, CheckCircle, Waves } from "lucide-react";

const problemSteps = [
  { icon: CloudRain, label: "Rain", color: "text-geo-blue" },
  { icon: ArrowDown, label: "Runoff", color: "text-geo-blue" },
  { icon: XCircle, label: "Blocked edge", color: "text-destructive" },
  { icon: AlertTriangle, label: "Flooding", color: "text-destructive" },
];

const solutionSteps = [
  { icon: CloudRain, label: "Rain", color: "text-geo-blue" },
  { icon: Waves, label: "Restored edge", color: "text-primary" },
  { icon: ArrowRight, label: "Distributed flow", color: "text-primary" },
  { icon: CheckCircle, label: "Reduced pressure", color: "text-primary" },
];

function FlowPath({ steps, lineColor, label, labelColor, delay = 0 }: {
  steps: typeof problemSteps; lineColor: string; label: string; labelColor: string; delay?: number;
}) {
  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className={`text-xs font-semibold uppercase tracking-wider mb-5 ${labelColor}`}>{label}</div>
      <div className="flex items-center justify-between relative">
        <motion.div
          className="absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2"
          style={{ backgroundColor: lineColor }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.15, duration: 0.3 }}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm">
              <step.icon size={20} className={step.color} />
            </div>
            <span className="text-[11px] font-medium text-center max-w-[70px]">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function WaterFlowDiagram() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            How water <span className="text-gradient">finds its path</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Two possible outcomes: pressure that floods, or edges that distribute.
          </p>
        </motion.div>

        <div className="space-y-6">
          <FlowPath steps={problemSteps} lineColor="hsl(5 70% 58% / 0.3)" label="⚠ Problem path" labelColor="text-destructive" delay={0} />
          <FlowPath steps={solutionSteps} lineColor="hsl(168 55% 38% / 0.3)" label="✓ Solution path" labelColor="text-primary" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
