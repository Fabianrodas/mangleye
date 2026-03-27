import { motion } from "framer-motion";
import { zones } from "@/data/zones";
import { Link } from "react-router-dom";
import { MapPin, Droplets, TreePine, ArrowRight, AlertTriangle } from "lucide-react";
import ZoneBadge from "@/components/ZoneBadge";

const featured = [...zones].sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3);

const getScoreColor = (s: number) =>
  s >= 85 ? "text-destructive" : s >= 75 ? "text-geo-amber" : "text-geo-green";

export default function FeaturedZones() {
  return (
    <section className="py-16 px-6 bg-white border-y border-border/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Featured priority zones</h2>
            <p className="text-sm text-muted-foreground max-w-lg">
              These zones have the highest urgency scores based on flood risk, ecological degradation, and population exposure.
            </p>
          </div>
          <Link to="/zones" className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to="/map" className="glass-panel p-5 block hover:shadow-md transition-shadow group">
                {/* Image placeholder */}
                <div className="aspect-[16/9] rounded-lg mb-4 overflow-hidden relative" style={{
                  background: `linear-gradient(135deg, ${
                    zone.floodLevel === "High" ? "hsl(6 62% 44% / 0.1)" : "hsl(38 80% 48% / 0.1)"
                  }, ${
                    zone.badges.includes("Revegetate") ? "hsl(158 45% 34% / 0.1)" : "hsl(200 42% 38% / 0.1)"
                  })`
                }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={24} className="text-muted-foreground/30 mx-auto mb-1" />
                      <span className="text-[10px] text-muted-foreground/40 font-medium">{zone.area}</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`text-lg font-bold font-mono ${getScoreColor(zone.priorityScore)}`}>
                      {zone.priorityScore}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors leading-tight">{zone.name}</h3>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-3">
                  <span className="flex items-center gap-0.5">
                    <Droplets size={9} />
                    {zone.floodLevel} flood risk
                  </span>
                  <span>·</span>
                  <span>{zone.zoneType}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {zone.badges.slice(0, 2).map(b => <ZoneBadge key={b} badge={b} />)}
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                  {zone.risk}
                </p>

                {/* Mock evidence */}
                <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <AlertTriangle size={9} className="text-destructive" />
                    {12 + i * 8} reports
                  </span>
                  <span className="flex items-center gap-1">
                    <TreePine size={9} className="text-geo-green" />
                    {4 + i * 3} observations
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link to="/zones" className="text-sm font-semibold text-primary hover:underline">
            View all priority zones →
          </Link>
        </div>
      </div>
    </section>
  );
}
