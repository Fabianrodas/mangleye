import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Map, Layers, AlertTriangle } from "lucide-react";

export default function MapPreviewSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">From hidden risk to visible action</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              The interactive map shows flood zones, ecological edges, citizen reports, and priority intervention areas — all in one view.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: Layers, text: "Toggle data layers: flooding, mangroves, urban pressure, restoration zones" },
                { icon: Map, text: "Select any zone for detailed risk, ecology, and intervention analysis" },
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-md"
            >
              <Map size={15} />
              Explore Live Map
            </Link>
          </motion.div>

          {/* Map visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-xl bg-secondary"
          >
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 30% 40%, hsl(var(--geo-blue) / 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, hsl(var(--geo-green) / 0.12) 0%, transparent 40%),
                radial-gradient(circle at 50% 30%, hsl(var(--destructive) / 0.08) 0%, transparent 35%)
              `
            }} />
            {[
              { x: "28%", y: "38%", color: "bg-destructive", size: "w-3 h-3" },
              { x: "52%", y: "32%", color: "bg-geo-amber", size: "w-2.5 h-2.5" },
              { x: "42%", y: "55%", color: "bg-destructive", size: "w-4 h-4" },
              { x: "62%", y: "48%", color: "bg-geo-green", size: "w-2 h-2" },
              { x: "33%", y: "62%", color: "bg-geo-amber", size: "w-2.5 h-2.5" },
              { x: "72%", y: "33%", color: "bg-primary", size: "w-2 h-2" },
            ].map((dot, i) => (
              <motion.div
                key={i}
                className={`absolute ${dot.size} ${dot.color} rounded-full`}
                style={{ left: dot.x, top: dot.y }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.15 }}
              />
            ))}
            <div className="absolute bottom-3 left-3 right-3 flex gap-2">
              {["Flood Zones", "Mangroves", "Reports", "Priority"].map((label, i) => (
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
