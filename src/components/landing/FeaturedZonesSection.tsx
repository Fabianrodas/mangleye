import { motion } from "framer-motion";
import { zones } from "@/data/zones";
import { Link } from "react-router-dom";
import { Droplets, TreePine, ArrowRight, AlertTriangle } from "lucide-react";
import ZoneBadge from "@/components/ZoneBadge";
import floodImg from "@/assets/flooding-street.jpg";
import mangroveImg from "@/assets/mangrove-estuary.jpg";

const featured = [...zones].sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3);
const images = [floodImg, mangroveImg, floodImg];

const getScoreColor = (s: number) =>
  s >= 85 ? "text-destructive" : s >= 75 ? "text-geo-amber" : "text-geo-green";

export default function FeaturedZonesSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured priority zones</h2>
            <p className="text-sm text-muted-foreground max-w-lg">
              Highest urgency zones based on flood risk, ecological degradation, and population exposure.
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
              <Link to="/map" className="block rounded-2xl overflow-hidden border border-border/50 bg-white shadow-sm hover:shadow-lg transition-shadow group">
                {/* Real image */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={images[i]}
                    alt={zone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={600}
                    height={340}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`text-lg font-bold font-mono ${getScoreColor(zone.priorityScore)} bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg`}>
                      {zone.priorityScore}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{zone.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
                    <Droplets size={9} />
                    <span>{zone.floodLevel} flood risk</span>
                    <span>·</span>
                    <span>{zone.zoneType}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {zone.badges.slice(0, 2).map(b => <ZoneBadge key={b} badge={b} />)}
                  </div>
                  <div className="pt-2 border-t border-border/30 flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <AlertTriangle size={9} className="text-destructive" />
                      {12 + i * 8} reports
                    </span>
                    <span className="flex items-center gap-1">
                      <TreePine size={9} className="text-geo-green" />
                      {4 + i * 3} observations
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
