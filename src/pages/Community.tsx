import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Droplets, TreePine, ThumbsUp, MapPin, AlertTriangle, Camera, TrendingUp, Eye, ArrowRight, Clock, CheckCircle } from "lucide-react";
import floodImg from "@/assets/flooding-street.jpg";
import mangroveImg from "@/assets/mangrove-estuary.jpg";
import { getReports, type CitizenReport, validateCitizenReport } from "@/api/mock-api";
import { zones } from "@/data/zones";
import { toast } from "@/hooks/use-toast";

function formatRelativeTime(timestamp: string) {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.max(1, Math.floor(diffMs / 60000));

  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}

export default function Community() {
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [validatingId, setValidatingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getReports()
      .then(result => {
        if (!cancelled) {
          setReports(result.reports);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
          toast({
            title: "Unable to load reports",
            description: "Please refresh the page.",
            variant: "destructive",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const zoneNameById = useMemo(() => {
    const entries = zones.map(zone => [zone.id, zone.name]);
    return Object.fromEntries(entries) as Record<string, string>;
  }, []);

  const summary = useMemo(() => {
    const floodCount = reports.filter(report => report.type === "flood").length;
    const ecologicalCount = reports.filter(report => report.type === "ecological").length;
    const photoEvidence = reports.reduce((sum, report) => sum + (report.photo_count ?? 0), 0);
    const validations = reports.reduce((sum, report) => sum + (report.validation_count ?? 0), 0);
    return { floodCount, ecologicalCount, photoEvidence, validations };
  }, [reports]);

  const latestReports = useMemo(() => reports.slice(0, 8), [reports]);

  const evidenceReports = useMemo(() => {
    const withPhotos = reports.filter(report => (report.photo_count ?? 0) > 0).slice(0, 4);
    if (withPhotos.length > 0) return withPhotos;
    return reports.slice(0, 4);
  }, [reports]);

  const topZones = useMemo(() => {
    const zoneCounter = new Map<string, number>();
    reports.forEach(report => {
      zoneCounter.set(report.zone_id, (zoneCounter.get(report.zone_id) ?? 0) + 1);
    });

    const values = Array.from(zoneCounter.entries())
      .map(([zoneId, count]) => ({
        name: zoneNameById[zoneId] ?? zoneId,
        reports: count,
      }))
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 4)
      .map((entry, index) => ({
        ...entry,
        trend: `Top ${index + 1}`,
      }));

    return values;
  }, [reports, zoneNameById]);

  const recentValidations = useMemo(() => {
    return reports
      .filter(report => (report.validation_count ?? 0) > 0)
      .sort((a, b) => (b.validation_count ?? 0) - (a.validation_count ?? 0))
      .slice(0, 3)
      .map(report => ({
        id: report.id,
        zone: zoneNameById[report.zone_id] ?? report.zone_id,
        text: `${report.type === "flood" ? "Flooding" : "Ecological condition"} confirmed by ${report.validation_count ?? 0} citizens`,
        time: formatRelativeTime(report.timestamp),
      }));
  }, [reports, zoneNameById]);

  const handleValidate = async (reportId: string) => {
    setValidatingId(reportId);
    try {
      const nextCount = await validateCitizenReport(reportId);
      setReports(prev => prev.map(report => report.id === reportId ? { ...report, validation_count: nextCount } : report));
    } catch {
      toast({
        title: "Validation failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setValidatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Awareness & Evidence</h1>
            <p className="text-sm text-muted-foreground">Public reports, observations, and validated evidence from the Mangleye community</p>
          </div>
          <Link to="/report/flood" className="px-4 py-2 bg-destructive text-white text-sm font-bold rounded-lg hover:bg-destructive/90 transition-colors flex items-center gap-1.5">
            <AlertTriangle size={14} />
            Report Flooding
          </Link>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Droplets, label: "Flood Reports", value: loading ? "..." : String(summary.floodCount), color: "text-geo-blue", bg: "bg-geo-blue/8", border: "border-geo-blue/15" },
            { icon: TreePine, label: "Eco Observations", value: loading ? "..." : String(summary.ecologicalCount), color: "text-geo-green", bg: "bg-geo-green/8", border: "border-geo-green/15" },
            { icon: ThumbsUp, label: "Validations", value: loading ? "..." : String(summary.validations), color: "text-primary", bg: "bg-primary/8", border: "border-primary/15" },
            { icon: Camera, label: "Photo Evidence", value: loading ? "..." : String(summary.photoEvidence), color: "text-geo-amber", bg: "bg-geo-amber/8", border: "border-geo-amber/15" },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`p-4 rounded-xl bg-white border ${m.border}`}>
              <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center mb-3`}>
                <m.icon size={16} className={m.color} />
              </div>
              <div className="text-xl font-bold font-mono">{m.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Evidence gallery */}
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Camera size={14} className="text-geo-amber" />
            Recent Evidence
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(evidenceReports.length > 0 ? evidenceReports : []).map((report, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                <img src={report.type === "flood" ? floodImg : mangroveImg} alt="Community evidence" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[10px] font-medium">{zoneNameById[report.zone_id] ?? report.zone_id}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold text-white ${report.type === "flood" ? "bg-destructive/80" : "bg-geo-green/80"}`}>
                    {report.type === "flood" ? "Flood" : "Ecology"}
                  </span>
                </div>
              </motion.div>
            ))}
            {evidenceReports.length === 0 && [floodImg, mangroveImg, floodImg, mangroveImg].map((img, i) => (
              <motion.div key={`placeholder-${i}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                <img src={img} alt="Community evidence" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[10px] font-medium">No evidence uploaded yet</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold text-white ${i % 2 === 0 ? "bg-destructive/80" : "bg-geo-green/80"}`}>
                    Placeholder
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent reports */}
          <div className="md:col-span-2 space-y-2">
            <h2 className="text-sm font-bold mb-2 flex items-center gap-2">
              <Clock size={14} className="text-muted-foreground" />
              Latest Reports & Observations
            </h2>
            {loading && [1, 2, 3].map((item) => (
              <div key={`loading-${item}`} className="glass-panel p-4 animate-pulse">
                <div className="h-3 bg-secondary rounded w-4/5 mb-2" />
                <div className="h-2 bg-secondary rounded w-2/3" />
              </div>
            ))}
            {!loading && latestReports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass-panel p-4 flex items-start gap-3"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${report.type === "flood" ? "bg-destructive/8" : "bg-geo-green/8"
                  }`}>
                  {report.type === "flood" ? (
                    <Droplets size={16} className="text-destructive" />
                  ) : (
                    <TreePine size={16} className="text-geo-green" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{report.description}</div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><MapPin size={9} /> {zoneNameById[report.zone_id] ?? report.zone_id}</span>
                    <span>· {formatRelativeTime(report.timestamp)}</span>
                    {(report.photo_count ?? 0) > 0 && <span className="flex items-center gap-0.5 text-geo-amber"><Camera size={9} /> Photo</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-primary shrink-0">
                  <button
                    onClick={() => handleValidate(report.id)}
                    disabled={validatingId === report.id}
                    className="px-2 py-1 rounded border border-primary/30 hover:bg-primary/10 transition-colors disabled:opacity-60"
                  >
                    {validatingId === report.id ? "..." : "Validate"}
                  </button>
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={10} />
                    <span className="font-mono font-bold">{report.validation_count ?? 0}</span>
                  </span>
                </div>
              </motion.div>
            ))}
            {!loading && latestReports.length === 0 && (
              <div className="glass-panel p-4 text-sm text-muted-foreground">No reports yet. Submit the first one from the report forms.</div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Most active zones */}
            <div className="glass-panel p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                <TrendingUp size={13} className="text-geo-amber" />
                Most Active Zones
              </h3>
              <div className="space-y-2">
                {topZones.map((z, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                    <div>
                      <div className="text-xs font-medium">{z.name}</div>
                      <div className="text-[10px] text-muted-foreground">{z.reports} reports</div>
                    </div>
                    <span className="text-[10px] text-geo-green font-semibold">{z.trend}</span>
                  </div>
                ))}
                {!loading && topZones.length === 0 && (
                  <div className="text-[11px] text-muted-foreground">No active zones yet.</div>
                )}
              </div>
            </div>

            {/* Recent validations */}
            <div className="glass-panel p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                <CheckCircle size={13} className="text-primary" />
                Recent Validations
              </h3>
              <div className="space-y-2">
                {recentValidations.map((v, i) => (
                  <div key={i} className="p-2 rounded-lg bg-primary/3 border border-primary/10">
                    <div className="text-xs font-medium">{v.text}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{v.zone} · {v.time}</div>
                  </div>
                ))}
                {!loading && recentValidations.length === 0 && (
                  <div className="text-[11px] text-muted-foreground">Validations will appear after users confirm reports.</div>
                )}
              </div>
            </div>

            {/* How to participate */}
            <div className="glass-panel p-4">
              <h3 className="text-sm font-semibold mb-3">How You Can Help</h3>
              <div className="space-y-1.5">
                {[
                  { icon: AlertTriangle, text: "Report flooding events", link: "/report/flood", color: "text-destructive" },
                  { icon: Camera, text: "Upload photo evidence", link: "/report/flood", color: "text-geo-amber" },
                  { icon: TreePine, text: "Submit eco observations", link: "/report/ecological", color: "text-geo-green" },
                  { icon: ThumbsUp, text: "Validate nearby reports", link: "/community", color: "text-primary" },
                ].map((item, i) => (
                  <Link key={i} to={item.link} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-secondary/40 transition-colors group">
                    <item.icon size={14} className={item.color} />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.text}</span>
                    <ArrowRight size={11} className="text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
