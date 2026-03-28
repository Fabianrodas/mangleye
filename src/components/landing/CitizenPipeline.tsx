import { motion } from "framer-motion";
import { MessageSquare, Map, CheckCircle, BarChart3, Building2, TreePine } from "lucide-react";

const steps = [
  { icon: MessageSquare, label: "Citizen reports flooding", color: "bg-destructive/10 text-destructive" },
  { icon: Map, label: "Report appears on live map", color: "bg-geo-blue/10 text-geo-blue" },
  { icon: CheckCircle, label: "Community validates", color: "bg-primary/10 text-primary" },
  { icon: BarChart3, label: "Priority score generated", color: "bg-geo-amber/10 text-geo-amber" },
  { icon: Building2, label: "Municipality coordination", color: "bg-accent/10 text-accent" },
  { icon: TreePine, label: "Intervention deployed", color: "bg-geo-green/10 text-geo-green" },
];

export default function CitizenPipeline() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">From citizen report to real action</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Your report feeds a system that prioritizes intervention where it matters most.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="text-center"
            >
              <div className="relative mb-3">
                <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center ${step.color.split(" ")[0]}`}>
                  <step.icon size={20} className={step.color.split(" ")[1]} />
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground text-white text-[9px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <p className="text-xs font-medium leading-snug">{step.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
