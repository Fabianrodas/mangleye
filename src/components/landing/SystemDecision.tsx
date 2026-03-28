import { motion } from "framer-motion";
import { Database, BarChart3, GitBranch, TreePine } from "lucide-react";

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
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">How Mangleye decides</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Each zone is analyzed through multiple dimensions. The system recommends the
            most effective intervention — not always mangroves.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            {inputs.map((input, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-border/60 bg-white shadow-sm"
              >
                <input.icon size={15} className="text-muted-foreground" />
                <span className="text-xs font-medium">{input.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Connectors + Processing node */}
          <div className="flex items-center gap-3">
            {/* Animated data flow lines */}
            <div className="hidden md:flex flex-col gap-4 items-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-8 h-[2px] bg-primary/30 rounded-full"
                  animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.3 }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
                animate={{ boxShadow: ["0 0 0 0 hsl(172 40% 22% / 0)", "0 0 0 8px hsl(172 40% 22% / 0.06)", "0 0 0 0 hsl(172 40% 22% / 0)"] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                <GitBranch size={22} className="text-primary" />
              </motion.div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-primary whitespace-nowrap">
                Analysis
              </span>
            </motion.div>

            {/* Animated output lines */}
            <div className="hidden md:flex flex-col gap-3 items-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-8 h-[2px] bg-primary/20 rounded-full"
                  animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.6 + i * 0.2 }}
                />
              ))}
            </div>
          </div>

          {/* Outputs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center md:justify-start max-w-xs"
          >
            {outputs.map((output, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${output.color} ${output.textColor} shadow-sm cursor-default`}
              >
                {output.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
