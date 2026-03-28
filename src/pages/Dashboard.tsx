import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { type Zone } from "@/data/zones";
import { motion } from "framer-motion";
import { TrendingUp, Droplets, TreePine, Users, MapPin, AlertTriangle, Zap, Target, ArrowRight, Maximize2, Shield, BarChart3, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import ZoneBadge from "@/components/ZoneBadge";
import DataSourceNote from "@/components/DataSourceNote";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardMetrics, getZones } from "@/api/mock-api";
import realSummary from "@/data/real-data-summary.json";
import floodImg from "@/assets/flooding-street.jpg";
import mangroveImg from "@/assets/mangrove-estuary.jpg";

const getScoreColor = (s: number) =>
  s >= 85 ? "text-destructive" : s >= 75 ? "text-geo-amber" : "text-geo-green";
const getScoreBg = (s: number) =>
  s >= 85 ? "bg-destructive/8" : s >= 75 ? "bg-geo-amber/8" : "bg-geo-green/8";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Awaited<ReturnType<typeof getDashboardMetrics>> | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [m, z] = await Promise.all([getDashboardMetrics(), getZones()]);
      if (!cancelled) {
        setMetrics(m);
        setZones(z);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const sorted = [...zones].sort((a, b) => b.priorityScore - a.priorityScore);

  if (loading || !metrics) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-6xl mx-auto py-8 px-6">
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="text-center py-12">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm text-muted-foreground"
            >
              Analyzing environmental data…
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
          </div>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  const highRisk = metrics.highRiskZones;
  const avgScore = metrics.avgPriorityScore;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Flood risk, ecological opportunity, and priority interventions across Greater Guayaquil</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/report/flood" className="px-4 py-2 bg-destructive text-white text-sm font-bold rounded-lg hover:bg-destructive/90 transition-colors flex items-center gap-1.5">
              <AlertTriangle size={14} />
              Report
            </Link>
            <Link to="/map" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <MapPin size={14} />
              Map
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: AlertTriangle, label: "High-Risk Zones", value: String(highRisk), color: "text-destructive", bg: "bg-destructive/8", border: "border-destructive/15" },
            { icon: Target, label: "Priority Zones", value: String(metrics.priorityZones), color: "text-primary", bg: "bg-primary/8", border: "border-primary/15" },
            { icon: Droplets, label: "Flood Reports", value: String(metrics.report_summary.flood), color: "text-geo-blue", bg: "bg-geo-blue/8", border: "border-geo-blue/15" },
            { icon: TreePine, label: "Eco Observations", value: String(metrics.report_summary.ecological), color: "text-geo-green", bg: "bg-geo-green/8", border: "border-geo-green/15" },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className={`p-4 rounded-xl bg-white border ${m.border}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <m.icon size={16} className={m.color} />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono">{m.value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="glass-panel-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center">
              <BarChart3 size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-primary">{avgScore}</div>
              <div className="text-[10px] text-muted-foreground">Avg. Priority Score</div>
            </div>
          </div>
          <div className="glass-panel-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-geo-amber/8 flex items-center justify-center">
              <Users size={18} className="text-geo-amber" />
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-geo-amber">~{Math.round(metrics.exposedPopulation / 1000)}K</div>
              <div className="text-[10px] text-muted-foreground">Exposed Population</div>
            </div>
          </div>
          <div className="glass-panel-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-geo-green/8 flex items-center justify-center">
              <Leaf size={18} className="text-geo-green" />
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-geo-green">{realSummary.mangrove_area_ha["2022"].toLocaleString()} ha</div>
              <div className="text-[10px] text-muted-foreground">Mangrove Extent 2022</div>
            </div>
          </div>
        </div>

        {/* Visual evidence strip */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="relative rounded-xl overflow-hidden aspect-[2.5/1]">
            <img src={floodImg} alt="Flooding in Guayaquil" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
            <div className="absolute bottom-3 left-4 text-white">
              <div className="text-lg font-bold">{highRisk}</div>
              <div className="text-[11px] opacity-80">Active high-risk flood zones</div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-[2.5/1]">
            <img src={mangroveImg} alt="Mangrove restoration opportunity" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
            <div className="absolute bottom-3 left-4 text-white">
              <div className="text-lg font-bold">{Math.abs(realSummary.net_change_ha["2018_to_2022"]).toLocaleString()} ha</div>
              <div className="text-[11px] opacity-80">Net mangrove loss 2018–2022</div>
            </div>
          </div>
        </div>

        {/* Priority Zones Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              <h2 className="text-lg font-bold">Priority Zones</h2>
              <span className="text-[10px] text-muted-foreground ml-1">Ranked by urgency</span>
            </div>
            <Link to="/map" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
              View on map <ArrowRight size={13} />
            </Link>
          </div>

          {/* Top 3 as cards */}
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            {sorted.slice(0, 3).map((zone, i) => (
              <motion.div key={zone.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to="/map" className="block glass-panel p-4 hover:shadow-md transition-shadow group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-muted-foreground">#{i + 1}</span>
                    <div className={`px-2 py-1 rounded-lg ${getScoreBg(zone.priorityScore)}`}>
                      <span className={`text-lg font-bold font-mono ${getScoreColor(zone.priorityScore)}`}>{zone.priorityScore}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{zone.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
                    <span className="flex items-center gap-0.5"><Droplets size={9} /> {zone.floodLevel}</span>
                    <span>·</span>
                    <span>{zone.area}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {zone.badges.slice(0, 2).map(b => <ZoneBadge key={b} badge={b} />)}
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">{zone.risk}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Remaining as table */}
          {sorted.length > 3 && (
            <div className="glass-panel overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">#</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Zone</th>
                    <th className="text-center px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Score</th>
                    <th className="text-center px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Flood</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Intervention</th>
                    <th className="text-right px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Area</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.slice(3).map((zone, i) => (
                    <tr key={zone.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">{i + 4}</td>
                      <td className="px-4 py-2.5">
                        <Link to="/map" className="text-sm font-medium hover:text-primary transition-colors">{zone.name}</Link>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`font-mono font-bold text-sm ${getScoreColor(zone.priorityScore)}`}>{zone.priorityScore}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          zone.floodLevel === "High" ? "bg-destructive/12 text-destructive" : zone.floodLevel === "Medium" ? "bg-geo-amber/12 text-geo-amber" : "bg-geo-green/12 text-geo-green"
                        }`}>{zone.floodLevel}</span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{zone.recommendedIntervention.primary}</td>
                      <td className="px-4 py-2.5 text-xs font-mono text-right text-muted-foreground">{zone.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Risk vs Opportunity */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-destructive/8 flex items-center justify-center">
                <AlertTriangle size={16} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Highest Risk</h3>
                <p className="text-[10px] text-muted-foreground">Zones with most critical flood exposure</p>
              </div>
            </div>
            {sorted.filter(z => z.floodLevel === "High").map(zone => (
              <Link key={zone.id} to="/map" className="flex items-center justify-between py-2.5 border-b border-border/10 last:border-0 hover:bg-secondary/20 rounded px-2 -mx-2 transition-colors">
                <div>
                  <span className="text-sm font-medium">{zone.name}</span>
                  <div className="text-[10px] text-muted-foreground">{zone.population}</div>
                </div>
                <span className="text-sm font-mono font-bold text-destructive">{zone.priorityScore}</span>
              </Link>
            ))}
          </div>
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-geo-green/8 flex items-center justify-center">
                <Zap size={16} className="text-geo-green" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Highest Opportunity</h3>
                <p className="text-[10px] text-muted-foreground">Best ecological restoration potential</p>
              </div>
            </div>
            {sorted.filter(z => z.viability.ecologicalViability === "High").map(zone => (
              <Link key={zone.id} to="/map" className="flex items-center justify-between py-2.5 border-b border-border/10 last:border-0 hover:bg-secondary/20 rounded px-2 -mx-2 transition-colors">
                <div>
                  <span className="text-sm font-medium">{zone.name}</span>
                  <div className="text-[10px] text-muted-foreground">{zone.recommendedIntervention.primary}</div>
                </div>
                <span className="text-sm font-mono font-bold text-geo-green">{zone.priorityScore}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Data source note */}
        <div className="mt-8 mb-4">
          <DataSourceNote />
        </div>

        {/* Quick actions footer */}
        <div className="p-6 rounded-xl bg-primary/5 border border-primary/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold mb-1">Help improve the analysis</h3>
            <p className="text-xs text-muted-foreground">Every flood report and ecological observation strengthens priority scoring.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/report/flood" className="px-5 py-2.5 bg-destructive text-white text-sm font-bold rounded-lg hover:bg-destructive/90 transition-colors flex items-center gap-1.5">
              <AlertTriangle size={14} /> Report Flooding
            </Link>
            <Link to="/report/ecological" className="px-5 py-2.5 bg-geo-green text-white text-sm font-bold rounded-lg hover:bg-geo-green/90 transition-colors flex items-center gap-1.5">
              <TreePine size={14} /> Observation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
