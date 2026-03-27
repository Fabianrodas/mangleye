import { motion } from "framer-motion";
import { MessageSquare, Database, BarChart3, Clipboard, TrendingUp, ArrowRight, AlertTriangle, Map } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { icon: MessageSquare, label: "Citizen report", desc: "Neighbors document flooding and ecological conditions.", color: "text-geo-blue", bg: "bg-geo-blue/8" },
  { icon: Database, label: "Data aggregation", desc: "Reports integrate with geospatial and environmental data.", color: "text-geo-purple", bg: "bg-geo-purple/8" },
  { icon: BarChart3, label: "Prioritization", desc: "A 0-100 score ranks each zone by urgency.", color: "text-geo-amber", bg: "bg-geo-amber/8" },
  { icon: Clipboard, label: "Intervention plan", desc: "Tailored recommendations for local conditions.", color: "text-primary", bg: "bg-primary/8" },
  { icon: TrendingUp, label: "Impact", desc: "Measurable reduction in flood risk and ecological improvement.", color: "text-geo-green", bg: "bg-geo-green/8" },
];

export default function CitizenPipeline() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Your report <span className="text-gradient">creates real impact</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Every citizen observation feeds a system that turns data into concrete action.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-stretch gap-3 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex-1 glass-panel p-5 rounded-xl text-center relative"
            >
              <div className="absolute top-2 right-2 text-[10px] font-mono text-muted-foreground/40 font-bold">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className={`w-11 h-11 rounded-xl ${step.bg} flex items-center justify-center mx-auto mb-3`}>
                <step.icon size={20} className={step.color} />
              </div>
              <h3 className="text-xs font-semibold mb-1">{step.label}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-border">
                  <ArrowRight size={14} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-panel p-8 rounded-2xl max-w-xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to take action?</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Report flooding in your area or explore priority zones on the live map.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/report/flood"
                className="group px-6 py-3 bg-destructive text-white rounded-xl text-sm font-bold hover:bg-destructive/90 transition-all shadow-sm flex items-center gap-2"
              >
                <AlertTriangle size={15} />
                Report Flooding
              </Link>
              <Link
                to="/map"
                className="px-6 py-3 bg-white text-foreground border border-border rounded-xl text-sm font-medium hover:bg-secondary/50 transition-colors shadow-sm flex items-center gap-2"
              >
                <Map size={15} className="text-primary" />
                Open Map
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
