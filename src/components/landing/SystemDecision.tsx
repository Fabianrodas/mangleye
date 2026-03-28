import { motion } from "framer-motion";
import { Database, BarChart3, GitBranch, Shield, TreePine, Droplets, Building2, Ban } from "lucide-react";

const inputs = [
  { icon: Database, label: "Zone data" },
  { icon: BarChart3, label: "Flood exposure" },
  { icon: TreePine, label: "Ecology condition" },
];

const outputs = [
  { label: "Protect mangrove", color: "bg-geo-green", textColor: "text-white" },
  { label: "Restore hydrology", color: "bg-geo-blue", textColor: "text-white" },
  { label: "Revegetate", color: "bg-primary", textColor: "text-white" },
  { label: "Hybrid infrastructure", color: "bg-geo-amber", textColor: "text-white" },
  { label: "Not suitable", color: "bg-muted", textColor: "text-muted-foreground" },
];

export default function SystemDecision() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">How Mangleye decides</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Each zone is analyzed through multiple dimensions. The system recommends the most effective intervention — not always mangroves.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            {inputs.map((input, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/60 bg-white">
                <input.icon size={15} className="text-muted-foreground" />
                <span className="text-xs font-medium">{input.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
              <GitBranch size={20} className="text-primary" />
            </div>
          </motion.div>

          {/* Outputs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center md:justify-start max-w-xs"
          >
            {outputs.map((output, i) => (
              <span
                key={i}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${output.color} ${output.textColor}`}
              >
                {output.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
