import { motion } from "framer-motion";
import { Database, BrainCircuit, Shield, Droplets, TreePine, Wrench, XCircle } from "lucide-react";

const inputs = [
  { label: "Datos de zona", icon: Database },
];

const outputs = [
  { label: "Proteger", color: "bg-geo-green/10 text-geo-green border-geo-green/20", icon: Shield },
  { label: "Restaurar hidrología", color: "bg-geo-blue/10 text-geo-blue border-geo-blue/20", icon: Droplets },
  { label: "Revegetar", color: "bg-primary/10 text-primary border-primary/20", icon: TreePine },
  { label: "Infraestructura híbrida", color: "bg-geo-amber/10 text-geo-amber border-geo-amber/20", icon: Wrench },
  { label: "No viable", color: "bg-muted text-muted-foreground border-border", icon: XCircle },
];

export default function SystemDecision() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Lógica de decisión</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Cómo <span className="text-gradient">Mangleye decide</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No todas las zonas necesitan lo mismo. El sistema analiza múltiples factores para recomendar la acción correcta.
          </p>
        </motion.div>

        {/* Flow: Input → Analysis → Outputs */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4 justify-center">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 rounded-2xl text-center min-w-[160px]"
          >
            <Database size={28} className="text-muted-foreground mx-auto mb-3" />
            <div className="text-sm font-semibold">Datos de zona</div>
            <div className="text-[10px] text-muted-foreground mt-1">
              Inundación · Ecología · Presión urbana
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block w-12 h-0.5 bg-border"
          />

          {/* Analysis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5">
              <div className="text-center">
                <BrainCircuit size={28} className="text-primary mx-auto mb-1" />
                <div className="text-[10px] font-bold text-primary">Análisis</div>
                <div className="text-[8px] text-muted-foreground">Multi-factor</div>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="hidden md:block w-12 h-0.5 bg-border"
          />

          {/* Outputs */}
          <div className="flex flex-col gap-2">
            {outputs.map((output, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${output.color} min-w-[200px]`}
              >
                <output.icon size={16} />
                <span className="text-sm font-medium">{output.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
