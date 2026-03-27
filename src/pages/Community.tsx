import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplets, TreePine, ThumbsUp, MapPin, AlertTriangle, Camera, TrendingUp, Users } from "lucide-react";

const recentReports = [
  { type: "flood", zone: "Estero Salado – Urdesa", text: "Severe flooding blocking Av. Carlos Julio Arosemena", time: "12 min ago", validations: 8 },
  { type: "ecological", zone: "La Puntilla – Samborondón", text: "New mangrove shoots observed along estuary edge", time: "34 min ago", validations: 5 },
  { type: "flood", zone: "Guasmo Sur – Estero Cobina", text: "Drainage overflow near school, knee-height water", time: "1 hr ago", validations: 14 },
  { type: "flood", zone: "Isla Trinitaria – Southern", text: "Tidal flooding in informal settlement area", time: "2 hrs ago", validations: 22 },
  { type: "ecological", zone: "Estero Salado – Urdesa", text: "Water quality noticeably improved after cleanup", time: "3 hrs ago", validations: 3 },
  { type: "flood", zone: "Mapasingue – Canal Edge", text: "Street flooding after 30 min rainfall, no drainage", time: "5 hrs ago", validations: 11 },
];

const topZones = [
  { name: "Estero Salado – Urdesa", reports: 47, trend: "+12 this week" },
  { name: "Isla Trinitaria – Southern", reports: 38, trend: "+8 this week" },
  { name: "Guasmo Sur – Estero Cobina", reports: 29, trend: "+6 this week" },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-5xl mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Community Activity</h1>
            <p className="text-sm text-muted-foreground">Reports, observations, and validations from the Mangleye community</p>
          </div>
          <Link to="/report/flood" className="px-4 py-2 bg-destructive text-white text-sm font-bold rounded-lg hover:bg-destructive/90 transition-colors flex items-center gap-1.5">
            <AlertTriangle size={14} />
            Report Flooding
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Droplets, label: "Flood Reports", value: "2,847", color: "text-geo-blue", bg: "bg-geo-blue/8" },
            { icon: TreePine, label: "Eco Observations", value: "438", color: "text-geo-green", bg: "bg-geo-green/8" },
            { icon: ThumbsUp, label: "Validations", value: "1,230", color: "text-primary", bg: "bg-primary/8" },
            { icon: Users, label: "Active Citizens", value: "892", color: "text-accent", bg: "bg-accent/8" },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-panel p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <m.icon size={14} className={m.color} />
                </div>
              </div>
              <div className="text-xl font-bold font-mono">{m.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent reports */}
          <div className="md:col-span-2">
            <h2 className="text-sm font-semibold mb-3">Recent Reports & Observations</h2>
            <div className="space-y-2">
              {recentReports.map((report, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="glass-panel p-4 flex items-start gap-3"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    report.type === "flood" ? "bg-destructive/8" : "bg-geo-green/8"
                  }`}>
                    {report.type === "flood" ? (
                      <Droplets size={14} className="text-destructive" />
                    ) : (
                      <TreePine size={14} className="text-geo-green" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{report.text}</div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5"><MapPin size={9} /> {report.zone}</span>
                      <span>· {report.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-primary shrink-0">
                    <ThumbsUp size={10} />
                    <span className="font-mono font-bold">{report.validations}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
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
                    <span className="text-[10px] text-geo-green font-medium">{z.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-4">
              <h3 className="text-sm font-semibold mb-3">How To Participate</h3>
              <div className="space-y-2">
                {[
                  { icon: AlertTriangle, text: "Report flooding events", link: "/report/flood" },
                  { icon: Camera, text: "Upload photo evidence", link: "/report/flood" },
                  { icon: TreePine, text: "Submit eco observations", link: "/report/ecological" },
                  { icon: ThumbsUp, text: "Validate nearby reports", link: "/community" },
                ].map((item, i) => (
                  <Link key={i} to={item.link} className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors text-sm">
                    <item.icon size={13} className="text-primary" />
                    <span className="text-muted-foreground">{item.text}</span>
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
