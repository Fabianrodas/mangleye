import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Map, Layers, Eye, AlertTriangle } from "lucide-react";

export default function MapPreview() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-3">Explore the live map</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              The interactive map shows flood zones, ecological edges, citizen reports, and priority intervention areas — all in one view.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: Layers, text: "Toggle 12 data layers: flooding, mangroves, urban pressure, restoration zones" },
                { icon: Eye, text: "Select any zone for detailed risk, ecology, and intervention analysis" },
                { icon: AlertTriangle, text: "Report flooding or add observations directly from the map" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon size={14} className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Map size={15} />
              Open Live Map
            </Link>
          </motion.div>

          {/* Map visual placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-geo-green/5" />
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 30% 40%, hsl(205 60% 45% / 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, hsl(158 45% 34% / 0.12) 0%, transparent 40%),
                radial-gradient(circle at 50% 30%, hsl(6 62% 44% / 0.08) 0%, transparent 35%)
              `
            }} />
            {/* Simulated zone dots */}
            {[
              { x: "30%", y: "40%", color: "bg-destructive", size: "w-3 h-3" },
              { x: "55%", y: "35%", color: "bg-geo-amber", size: "w-2.5 h-2.5" },
              { x: "45%", y: "55%", color: "bg-destructive", size: "w-3.5 h-3.5" },
              { x: "65%", y: "50%", color: "bg-geo-green", size: "w-2 h-2" },
              { x: "35%", y: "65%", color: "bg-geo-amber", size: "w-2.5 h-2.5" },
              { x: "70%", y: "35%", color: "bg-primary", size: "w-2 h-2" },
            ].map((dot, i) => (
              <motion.div
                key={i}
                className={`absolute ${dot.size} ${dot.color} rounded-full`}
                style={{ left: dot.x, top: dot.y }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2 }}
              />
            ))}
            <div className="absolute bottom-3 left-3 right-3 flex gap-2">
              {["Flood Zones", "Mangroves", "Reports"].map((label, i) => (
                <div key={i} className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-medium text-muted-foreground border border-border/50">
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
