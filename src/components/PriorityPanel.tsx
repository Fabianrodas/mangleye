import { zones, type Zone } from "@/data/zones";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Shield, Droplets } from "lucide-react";

interface PriorityPanelProps {
  selectedZone: Zone | null;
  onSelectZone: (zone: Zone) => void;
}

const getScoreColor = (s: number) =>
  s >= 85 ? "text-geo-red" : s >= 75 ? "text-geo-amber" : "text-geo-green";

const getBarColor = (s: number) =>
  s >= 85 ? "bg-geo-red" : s >= 75 ? "bg-geo-amber" : "bg-geo-green";

export default function PriorityPanel({ selectedZone, onSelectZone }: PriorityPanelProps) {
  const sorted = [...zones].sort((a, b) => b.priorityScore - a.priorityScore);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 px-1 mb-2">
        <TrendingUp size={14} className="text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Priority Ranking
        </span>
      </div>
      {sorted.map((zone, i) => (
        <motion.button
          key={zone.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelectZone(zone)}
          className={`w-full text-left p-3 rounded-lg transition-all group ${
            selectedZone?.id === zone.id
              ? "bg-primary/10 border border-primary/30"
              : "hover:bg-secondary/50 border border-transparent"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <MapPin size={11} className="text-muted-foreground shrink-0" />
                <span className="text-sm font-medium truncate">{zone.name}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Droplets size={9} />
                  {zone.floodLevel}
                </span>
                <span>·</span>
                <span>{zone.zoneType}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${getBarColor(zone.priorityScore)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${zone.priorityScore}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                  />
                </div>
              </div>
            </div>
            <span className={`font-mono text-lg font-bold ${getScoreColor(zone.priorityScore)}`}>
              {zone.priorityScore}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
