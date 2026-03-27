import { motion } from "framer-motion";
import { MessageSquare, Database, BarChart3, Clipboard, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    label: "Reporte ciudadano",
    desc: "Los vecinos documentan inundaciones y observaciones ecológicas.",
    color: "text-geo-blue",
    bg: "bg-geo-blue/8",
  },
  {
    icon: Database,
    label: "Agregación de datos",
    desc: "Los reportes se integran con datos geoespaciales y ambientales.",
    color: "text-geo-purple",
    bg: "bg-geo-purple/8",
  },
  {
    icon: BarChart3,
    label: "Priorización",
    desc: "Un score explícito de 0-100 clasifica cada zona por urgencia.",
    color: "text-geo-amber",
    bg: "bg-geo-amber/8",
  },
  {
    icon: Clipboard,
    label: "Plan de intervención",
    desc: "Recomendaciones específicas adaptadas a las condiciones locales.",
    color: "text-primary",
    bg: "bg-primary/8",
  },
  {
    icon: TrendingUp,
    label: "Impacto",
    desc: "Reducción medible del riesgo de inundación y mejora ecológica.",
    color: "text-geo-green",
    bg: "bg-geo-green/8",
  },
];

export default function CitizenPipeline() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-geo-purple uppercase tracking-wider">De ciudadano a acción</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Tu reporte <span className="text-gradient">genera impacto real</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cada observación ciudadana alimenta un sistema que transforma datos en acciones concretas.
          </p>
        </motion.div>

        {/* Pipeline steps */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex-1 glass-panel p-6 rounded-2xl text-center relative group hover:shadow-lg transition-shadow"
            >
              {/* Step number */}
              <div className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground/50 font-bold">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mx-auto mb-4`}>
                <step.icon size={24} className={step.color} />
              </div>
              <h3 className="text-sm font-semibold mb-2">{step.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              {/* Arrow connector (hidden on mobile, visible on md+) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-border">
                  <ArrowRight size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-panel p-10 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Explora las zonas prioritarias
            </h3>
            <p className="text-muted-foreground mb-6">
              Descubre dónde la acción puede generar el mayor impacto en la resiliencia urbana de Guayaquil.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/map"
                className="group px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
              >
                Abrir el mapa
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-3.5 bg-white/80 text-foreground border border-border rounded-xl text-sm font-medium hover:bg-white transition-colors shadow-sm"
              >
                Conocer más
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
