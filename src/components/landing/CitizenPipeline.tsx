import { motion } from "framer-motion";
import {
  MessageSquare,
  Map,
  CheckCircle,
  BarChart3,
  Building2,
  TreePine,
} from "lucide-react";

const steps = [
  { icon: MessageSquare, label: "Citizen reports flooding", color: "bg-destructive/10 text-destructive", accent: "border-destructive/20" },
  { icon: Map, label: "Report appears on live map", color: "bg-geo-blue/10 text-geo-blue", accent: "border-geo-blue/20" },
  { icon: CheckCircle, label: "Community validates", color: "bg-primary/10 text-primary", accent: "border-primary/20" },
  { icon: BarChart3, label: "Priority score generated", color: "bg-geo-amber/10 text-geo-amber", accent: "border-geo-amber/20" },
  { icon: Building2, label: "Municipality coordination", color: "bg-accent/10 text-accent", accent: "border-accent/20" },
  { icon: TreePine, label: "Intervention deployed", color: "bg-geo-green/10 text-geo-green", accent: "border-geo-green/20" },
];

export default function CitizenPipeline() {
  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            From citizen report to real action
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Citizen reports complement satellite data by capturing localized flooding patterns not always visible in remote sensing.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-[2px] bg-border/40 z-0" />
          <motion.div
            className="hidden lg:block absolute top-10 left-0 right-0 h-[2px] bg-primary/30 z-0 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5, type: "spring", stiffness: 150 }}
                className="text-center relative z-10"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="relative mb-3 inline-block"
                >
                  <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center border ${step.accent} ${step.color.split(" ")[0]} shadow-sm`}>
                    <step.icon size={22} className={step.color.split(" ")[1]} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                </motion.div>
                <p className="text-xs font-medium leading-snug px-1">{step.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
