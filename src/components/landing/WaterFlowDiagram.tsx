import { motion } from "framer-motion";
import {
  CloudRain,
  ArrowDown,
  Ban,
  Waves,
  TreePine,
  ArrowRight,
  Check,
} from "lucide-react";

const problemPath = [
  { icon: CloudRain, label: "Heavy rainfall", color: "text-geo-blue" },
  { icon: ArrowDown, label: "Surface runoff", color: "text-geo-blue" },
  { icon: Ban, label: "Blocked edge", color: "text-geo-amber" },
  { icon: Waves, label: "Urban flooding", color: "text-destructive" },
];

const solutionPath = [
  { icon: CloudRain, label: "Heavy rainfall", color: "text-geo-blue" },
  { icon: TreePine, label: "Edge absorbs", color: "text-geo-green" },
  { icon: ArrowRight, label: "Distributed flow", color: "text-geo-cyan" },
  { icon: Check, label: "Reduced pressure", color: "text-primary" },
];

function AnimatedFlowPath({
  items,
  label,
  accent,
  borderColor,
  bgColor,
  delayBase,
}: {
  items: typeof problemPath;
  label: string;
  accent: string;
  borderColor: string;
  bgColor: string;
  delayBase: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delayBase }}
      className={`p-6 rounded-2xl border ${borderColor} ${bgColor}`}
    >
      <div className={`text-xs font-bold uppercase tracking-wider mb-5 ${accent}`}>
        {label}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {items.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delayBase + 0.15 + i * 0.15, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <motion.div
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/60 bg-white shadow-sm"
              whileHover={{ y: -2 }}
            >
              <step.icon size={16} className={step.color} />
              <span className="text-xs font-medium whitespace-nowrap">
                {step.label}
              </span>
            </motion.div>
            {i < items.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delayBase + 0.3 + i * 0.15 }}
              >
                <ArrowRight size={14} className="text-border" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function WaterFlowStory() {
  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            How water finds its path
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            The same rain causes flooding or flows safely — depending on
            whether ecological edges exist.
          </p>
        </motion.div>

        <div className="space-y-6">
          <AnimatedFlowPath
            items={problemPath}
            label="Without ecological edges"
            accent="text-destructive"
            borderColor="border-destructive/15"
            bgColor="bg-destructive/[0.03]"
            delayBase={0}
          />
          <AnimatedFlowPath
            items={solutionPath}
            label="With restored edges"
            accent="text-primary"
            borderColor="border-primary/15"
            bgColor="bg-primary/[0.03]"
            delayBase={0.3}
          />
        </div>
      </div>
    </section>
  );
}
