import { motion } from "framer-motion";
import { CloudRain, ArrowDown, Ban, Waves, TreePine, ArrowRight, Check } from "lucide-react";

const problemPath = [
  { icon: CloudRain, label: "Heavy rainfall", color: "text-geo-blue" },
  { icon: ArrowDown, label: "Surface runoff", color: "text-geo-blue" },
  { icon: Ban, label: "Blocked ecological edge", color: "text-geo-amber" },
  { icon: Waves, label: "Urban flooding", color: "text-destructive" },
];

const solutionPath = [
  { icon: CloudRain, label: "Heavy rainfall", color: "text-geo-blue" },
  { icon: TreePine, label: "Restored edge absorbs", color: "text-geo-green" },
  { icon: ArrowRight, label: "Distributed water flow", color: "text-geo-cyan" },
  { icon: Check, label: "Reduced flood pressure", color: "text-primary" },
];

function FlowPath({ items, label, accent }: { items: typeof problemPath; label: string; accent: string }) {
  return (
    <div>
      <div className={`text-xs font-bold uppercase tracking-wider mb-4 ${accent}`}>{label}</div>
      <div className="flex items-center gap-2 flex-wrap">
        {items.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/60 bg-white">
              <step.icon size={16} className={step.color} />
              <span className="text-xs font-medium whitespace-nowrap">{step.label}</span>
            </div>
            {i < items.length - 1 && (
              <ArrowRight size={14} className="text-border shrink-0" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function WaterFlowStory() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">How water finds its path</h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            The same rain causes flooding or flows safely — depending on whether ecological edges exist.
          </p>
        </motion.div>

        <div className="space-y-8">
          <div className="p-6 rounded-2xl border border-destructive/15 bg-destructive/3">
            <FlowPath items={problemPath} label="Without ecological edges" accent="text-destructive" />
          </div>
          <div className="p-6 rounded-2xl border border-primary/15 bg-primary/3">
            <FlowPath items={solutionPath} label="With restored edges" accent="text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
