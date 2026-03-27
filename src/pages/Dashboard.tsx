import Header from "@/components/Header";
import { zones } from "@/data/zones";
import { motion } from "framer-motion";
import { TrendingUp, Droplets, TreePine, Users, MapPin, AlertTriangle, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const sorted = [...zones].sort((a, b) => b.priorityScore - a.priorityScore);
  const highRisk = zones.filter(z => z.floodLevel === "High").length;
  const avgScore = Math.round(zones.reduce((s, z) => s + z.priorityScore, 0) / zones.length);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Priority & Analysis Dashboard</h1>
            <p className="text-sm text-muted-foreground">Strategic overview of urban edge intelligence across Guayaquil and Samborondón</p>
          </div>
          <Link to="/map" className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Open Map
          </Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Droplets, label: "Flood Reports", value: "127", color: "text-geo-blue", bg: "bg-geo-blue/10" },
            { icon: TreePine, label: "Ecological Observations", value: "43", color: "text-geo-green", bg: "bg-geo-green/10" },
            { icon: Target, label: "Priority Zones", value: String(zones.length), color: "text-primary", bg: "bg-primary/10" },
            { icon: AlertTriangle, label: "High-Risk Zones", value: String(highRisk), color: "text-geo-red", bg: "bg-geo-red/10" },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-panel p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <m.icon size={14} className={m.color} />
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{m.label}</span>
              </div>
              <div className="text-2xl font-bold font-mono">{m.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Secondary metrics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-panel-sm p-4 text-center">
            <div className="text-lg font-bold font-mono text-primary">{avgScore}</div>
            <div className="text-[10px] text-muted-foreground">Avg. Priority Score</div>
          </div>
          <div className="glass-panel-sm p-4 text-center">
            <div className="text-lg font-bold font-mono text-geo-amber">~168K</div>
            <div className="text-[10px] text-muted-foreground">Total Exposed Population</div>
          </div>
          <div className="glass-panel-sm p-4 text-center">
            <div className="text-lg font-bold font-mono text-geo-green">283.6 ha</div>
            <div className="text-[10px] text-muted-foreground">Total Priority Area</div>
          </div>
        </div>

        {/* Zone table */}
        <div className="glass-panel overflow-hidden">
          <div className="p-4 border-b border-border/30">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-primary" />
              <span className="text-sm font-semibold">Priority Zone Ranking</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">#</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Zone</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Score</th>
                  <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Flood</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Primary Intervention</th>
                  <th className="text-right px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Area</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((zone, i) => (
                  <motion.tr key={zone.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="border-b border-border/10 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link to="/map" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5">
                        <MapPin size={11} className="text-muted-foreground" />
                        {zone.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{zone.zoneType}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-mono font-bold text-sm ${zone.priorityScore >= 85 ? "text-geo-red" : zone.priorityScore >= 75 ? "text-geo-amber" : "text-geo-green"}`}>
                        {zone.priorityScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                        zone.floodLevel === "High" ? "bg-geo-red/15 text-geo-red" : zone.floodLevel === "Medium" ? "bg-geo-amber/15 text-geo-amber" : "bg-geo-green/15 text-geo-green"
                      }`}>{zone.floodLevel}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{zone.recommendedIntervention.primary}</td>
                    <td className="px-4 py-3 text-xs font-mono text-right text-muted-foreground">{zone.area}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top reported / highest opportunity */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-geo-red" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Highest Risk</span>
            </div>
            {sorted.filter(z => z.floodLevel === "High").map(zone => (
              <div key={zone.id} className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
                <span className="text-sm">{zone.name}</span>
                <span className="text-xs font-mono text-geo-red">{zone.priorityScore}</span>
              </div>
            ))}
          </div>
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-geo-green" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Highest Opportunity</span>
            </div>
            {sorted.filter(z => z.viability.ecologicalViability === "High").map(zone => (
              <div key={zone.id} className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
                <span className="text-sm">{zone.name}</span>
                <span className="text-xs font-mono text-geo-green">{zone.priorityScore}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
