import { motion } from "framer-motion";
import { CloudRain, ArrowDown, XCircle, AlertTriangle, ArrowRight, CheckCircle, Waves } from "lucide-react";

const problemSteps = [
  { icon: CloudRain, label: "Lluvia", color: "text-geo-blue" },
  { icon: ArrowDown, label: "Escorrentía", color: "text-geo-blue" },
  { icon: XCircle, label: "Borde bloqueado", color: "text-destructive" },
  { icon: AlertTriangle, label: "Inundación", color: "text-destructive" },
];

const solutionSteps = [
  { icon: CloudRain, label: "Lluvia", color: "text-geo-blue" },
  { icon: Waves, label: "Borde restaurado", color: "text-primary" },
  { icon: ArrowRight, label: "Flujo distribuido", color: "text-primary" },
  { icon: CheckCircle, label: "Presión reducida", color: "text-primary" },
];

function FlowPath({ steps, lineColor, label, labelColor, delay = 0 }: {
  steps: typeof problemSteps; lineColor: string; label: string; labelColor: string; delay?: number;
}) {
  return (
    <div className="glass-panel p-8 rounded-2xl">
      <div className={`text-xs font-semibold uppercase tracking-wider mb-6 ${labelColor}`}>{label}</div>
      <div className="flex items-center justify-between relative">
        {/* Connection line */}
        <motion.div
          className="absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2"
          style={{ backgroundColor: lineColor }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        />
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.2, duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center shadow-sm">
              <step.icon size={22} className={step.color} />
            </div>
            <span className="text-xs font-medium text-center max-w-[80px]">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function WaterFlowDiagram() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-geo-cyan uppercase tracking-wider">Diagrama de flujo</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Cómo el agua <span className="text-gradient">encuentra su camino</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dos caminos posibles: la presión que inunda o el borde que distribuye.
          </p>
        </motion.div>

        <div className="space-y-8">
          <FlowPath
            steps={problemSteps}
            lineColor="hsl(5 70% 58% / 0.3)"
            label="⚠ Camino del problema"
            labelColor="text-destructive"
            delay={0}
          />
          <FlowPath
            steps={solutionSteps}
            lineColor="hsl(168 55% 38% / 0.3)"
            label="✓ Camino de la solución"
            labelColor="text-primary"
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
}
