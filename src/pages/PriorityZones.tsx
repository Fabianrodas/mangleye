import Header from "@/components/Header";
import { zones } from "@/data/zones";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Droplets, TreePine, AlertTriangle, ArrowRight, Users, Maximize2 } from "lucide-react";
import ZoneBadge from "@/components/ZoneBadge";

const sorted = [...zones].sort((a, b) => b.priorityScore - a.priorityScore);

const getScoreColor = (s: number) =>
  s >= 85 ? "text-destructive" : s >= 75 ? "text-geo-amber" : "text-geo-green";

const getScoreBg = (s: number) =>
  s >= 85 ? "bg-destructive/8" : s >= 75 ? "bg-geo-amber/8" : "bg-geo-green/8";

export default function PriorityZones() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-5xl mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Priority Zones</h1>
            <p className="text-sm text-muted-foreground">Ranked by urgency based on flood risk, ecological degradation, and population exposure</p>
          </div>
          <Link to="/map" className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5">
            <MapPin size={14} />
            Open Map
          </Link>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="glass-panel p-4 text-center">
            <div className="text-xl font-bold font-mono text-destructive">{zones.filter(z => z.floodLevel === "High").length}</div>
            <div className="text-[10px] text-muted-foreground">High-risk zones</div>
          </div>
          <div className="glass-panel p-4 text-center">
            <div className="text-xl font-bold font-mono text-primary">{Math.round(zones.reduce((s, z) => s + z.priorityScore, 0) / zones.length)}</div>
            <div className="text-[10px] text-muted-foreground">Avg. priority score</div>
          </div>
          <div className="glass-panel p-4 text-center">
            <div className="text-xl font-bold font-mono text-geo-amber">~168K</div>
            <div className="text-[10px] text-muted-foreground">Exposed population</div>
          </div>
        </div>

        {/* Zone cards */}
        <div className="space-y-3">
          {sorted.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to="/map" className="glass-panel p-5 flex items-start gap-4 hover:shadow-md transition-shadow group block">
                {/* Score */}
                <div className={`w-14 h-14 rounded-xl ${getScoreBg(zone.priorityScore)} flex items-center justify-center shrink-0`}>
                  <span className={`text-xl font-bold font-mono ${getScoreColor(zone.priorityScore)}`}>{zone.priorityScore}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{zone.name}</h3>
                    <span className="text-[9px] font-mono text-muted-foreground">#{i + 1}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
                    <span className="flex items-center gap-0.5"><Droplets size={9} /> {zone.floodLevel} flood</span>
                    <span className="flex items-center gap-0.5"><Maximize2 size={9} /> {zone.area}</span>
                    <span className="flex items-center gap-0.5"><Users size={9} /> {zone.population}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {zone.badges.map(b => <ZoneBadge key={b} badge={b} />)}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{zone.risk}</p>

                  {/* Evidence counts */}
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <AlertTriangle size={9} className="text-destructive" /> {12 + i * 7} flood reports
                    </span>
                    <span className="flex items-center gap-1">
                      <TreePine size={9} className="text-geo-green" /> {3 + i * 2} observations
                    </span>
                  </div>
                </div>

                <ArrowRight size={16} className="text-muted-foreground shrink-0 mt-2 group-hover:text-primary transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
