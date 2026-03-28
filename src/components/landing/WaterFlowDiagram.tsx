import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  CloudRain,
  ArrowDown,
  Ban,
  Waves,
  TreePine,
  Check,
  Droplets,
} from "lucide-react";

const problemSteps = [
  { icon: CloudRain, label: "Heavy rainfall", desc: "Intense precipitation hits the urban surface", color: "text-geo-blue", bg: "bg-geo-blue/10" },
  { icon: Droplets, label: "Surface runoff", desc: "Water has nowhere to go — impervious surfaces everywhere", color: "text-geo-blue", bg: "bg-geo-blue/10" },
  { icon: Ban, label: "Edge blocked", desc: "Natural buffers destroyed — concrete replaces mangroves", color: "text-geo-amber", bg: "bg-geo-amber/10" },
  { icon: Waves, label: "Urban flooding", desc: "Water accumulates. Streets become rivers. Lives disrupted.", color: "text-destructive", bg: "bg-destructive/10" },
];

const solutionSteps = [
  { icon: CloudRain, label: "Heavy rainfall", desc: "Same rain, same intensity", color: "text-geo-blue", bg: "bg-geo-blue/10" },
  { icon: TreePine, label: "Edge absorbs", desc: "Restored mangrove buffers capture and slow water", color: "text-geo-green", bg: "bg-geo-green/10" },
  { icon: Droplets, label: "Distributed flow", desc: "Water disperses through ecological corridors", color: "text-geo-cyan", bg: "bg-geo-cyan/10" },
  { icon: Check, label: "Reduced pressure", desc: "Flooding drops significantly. Communities are safer.", color: "text-primary", bg: "bg-primary/10" },
];

function FlowColumn({
  steps,
  title,
  accent,
  pathColor,
  delayBase,
}: {
  steps: typeof problemSteps;
  title: string;
  accent: string;
  pathColor: string;
  delayBase: number;
}) {
  return (
    <div className="flex-1 min-w-[260px]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delayBase }}
        className={`text-xs font-bold uppercase tracking-wider mb-6 ${accent}`}
      >
        {title}
      </motion.div>

      <div className="relative">
        {/* Vertical flowing line */}
        <motion.div
          className={`absolute left-6 top-8 bottom-8 w-[2px] ${pathColor} origin-top`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delayBase + 0.2, duration: 1.2, ease: "easeOut" }}
        />

        {/* Animated water particles along the line */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`absolute left-[22px] w-2 h-2 rounded-full ${pathColor.replace("bg-", "bg-")}`}
            style={{ top: `${15 + i * 20}%` }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: [0, 0.8, 0], y: [0, 200] }}
            viewport={{ once: true }}
            transition={{
              delay: delayBase + 0.5 + i * 0.3,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          />
        ))}

        <div className="space-y-1">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delayBase + 0.3 + i * 0.2, duration: 0.5 }}
              className="relative flex items-start gap-4 py-4"
            >
              {/* Node circle */}
              <motion.div
                className={`relative z-10 w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center shrink-0 border border-border/30`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <step.icon size={20} className={step.color} />
              </motion.div>

              {/* Content */}
              <div className="pt-1 min-w-0">
                <div className="text-sm font-bold mb-0.5">{step.label}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </div>
              </div>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <motion.div
                  className="absolute left-6 -bottom-1 z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ delay: delayBase + 0.5 + i * 0.2 }}
                >
                  <ArrowDown size={12} className="text-muted-foreground" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WaterFlowStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* Animated water-like bg gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-geo-blue/[0.03] via-transparent to-geo-cyan/[0.03] pointer-events-none"
        style={{ opacity: bgOpacity }}
      />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            How water finds its path
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            The same rain causes flooding or flows safely — depending on
            whether ecological edges exist.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Problem path */}
          <div className="relative p-6 rounded-2xl border border-destructive/15 bg-destructive/[0.02]">
            <FlowColumn
              steps={problemSteps}
              title="Without ecological edges"
              accent="text-destructive"
              pathColor="bg-destructive/20"
              delayBase={0}
            />
          </div>

          {/* Divider */}
          <div className="hidden md:flex items-center">
            <motion.div
              className="w-px h-full bg-gradient-to-b from-transparent via-border to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Solution path */}
          <div className="relative p-6 rounded-2xl border border-primary/15 bg-primary/[0.02]">
            <FlowColumn
              steps={solutionSteps}
              title="With restored edges"
              accent="text-primary"
              pathColor="bg-primary/20"
              delayBase={0.4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
