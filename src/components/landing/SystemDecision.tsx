import { motion } from "framer-motion";
import { Database, BrainCircuit, Shield, Droplets, TreePine, Wrench, XCircle } from "lucide-react";

const outputs = [
  { label: "Protect", color: "bg-geo-green/10 text-geo-green border-geo-green/20", icon: Shield },
  { label: "Restore hydrology", color: "bg-geo-blue/10 text-geo-blue border-geo-blue/20", icon: Droplets },
  { label: "Revegetate", color: "bg-primary/10 text-primary border-primary/20", icon: TreePine },
  { label: "Hybrid infrastructure", color: "bg-geo-amber/10 text-geo-amber border-geo-amber/20", icon: Wrench },
  { label: "Not viable", color: "bg-muted text-muted-foreground border-border", icon: XCircle },
];

export default function SystemDecision() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            How <span className="text-gradient">Mangleye decides</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Not every zone needs the same action. The system analyzes multiple factors to recommend the right one.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-5 rounded-2xl text-center min-w-[150px]"
          >
            <Database size={24} className="text-muted-foreground mx-auto mb-2" />
            <div className="text-sm font-semibold">Zone data</div>
            <div className="text-[10px] text-muted-foreground mt-1">Flood · Ecology · Urban pressure</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block w-10 h-0.5 bg-border"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5"
          >
            <div className="text-center">
              <BrainCircuit size={24} className="text-primary mx-auto mb-1" />
              <div className="text-[10px] font-bold text-primary">Analysis</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="hidden md:block w-10 h-0.5 bg-border"
          />

          <div className="flex flex-col gap-2">
            {outputs.map((output, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border ${output.color} min-w-[180px]`}
              >
                <output.icon size={15} />
                <span className="text-sm font-medium">{output.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
