import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplets, TreePine, ThumbsUp, MapPin, AlertTriangle, Camera, TrendingUp, Eye, ArrowRight, Clock, CheckCircle } from "lucide-react";
import floodImg from "@/assets/flooding-street.jpg";
import mangroveImg from "@/assets/mangrove-estuary.jpg";

const recentReports = [
  { type: "flood", zone: "Estero Salado – Urdesa", text: "Severe flooding blocking Av. Carlos Julio Arosemena", time: "12 min ago", validations: 8, hasPhoto: true },
  { type: "ecological", zone: "La Puntilla – Samborondón", text: "New mangrove shoots observed along estuary edge", time: "34 min ago", validations: 5, hasPhoto: true },
  { type: "flood", zone: "Guasmo Sur – Estero Cobina", text: "Drainage overflow near school, knee-height water", time: "1 hr ago", validations: 14, hasPhoto: false },
  { type: "flood", zone: "Isla Trinitaria – Southern", text: "Tidal flooding in informal settlement area", time: "2 hrs ago", validations: 22, hasPhoto: true },
  { type: "ecological", zone: "Estero Salado – Urdesa", text: "Water quality noticeably improved after cleanup", time: "3 hrs ago", validations: 3, hasPhoto: false },
  { type: "flood", zone: "Mapasingue – Canal Edge", text: "Street flooding after 30 min rainfall, no drainage", time: "5 hrs ago", validations: 11, hasPhoto: true },
];

const topZones = [
  { name: "Estero Salado – Urdesa", reports: 47, trend: "+12 this week" },
  { name: "Isla Trinitaria – Southern", reports: 38, trend: "+8 this week" },
  { name: "Guasmo Sur – Estero Cobina", reports: 29, trend: "+6 this week" },
  { name: "Mapasingue – Canal Edge", reports: 18, trend: "+4 this week" },
];

const recentValidations = [
  { zone: "Estero Salado – Urdesa", text: "Flooding confirmed by 8 citizens", time: "15 min ago" },
  { zone: "Isla Trinitaria", text: "Mangrove degradation validated", time: "1 hr ago" },
  { zone: "Guasmo Sur", text: "Drainage overflow validated by 14 citizens", time: "2 hrs ago" },
];

export default function Community() {
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
            { icon: Droplets, label: "Flood Reports", value: "2,847", color: "text-geo-blue", bg: "bg-geo-blue/8", border: "border-geo-blue/15" },
            { icon: TreePine, label: "Eco Observations", value: "438", color: "text-geo-green", bg: "bg-geo-green/8", border: "border-geo-green/15" },
            { icon: ThumbsUp, label: "Validations", value: "1,230", color: "text-primary", bg: "bg-primary/8", border: "border-primary/15" },
            { icon: Camera, label: "Photo Evidence", value: "614", color: "text-geo-amber", bg: "bg-geo-amber/8", border: "border-geo-amber/15" },
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
            {[floodImg, mangroveImg, floodImg, mangroveImg].map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                <img src={img} alt="Community evidence" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[10px] font-medium">{["Flooding – Urdesa", "Mangrove shoots – Puntilla", "Overflow – Guasmo", "Estuary edge – Cobina"][i]}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold text-white ${i % 2 === 0 ? "bg-destructive/80" : "bg-geo-green/80"}`}>
                    {i % 2 === 0 ? "Flood" : "Ecology"}
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
            {recentReports.map((report, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass-panel p-4 flex items-start gap-3"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  report.type === "flood" ? "bg-destructive/8" : "bg-geo-green/8"
                }`}>
                  {report.type === "flood" ? (
                    <Droplets size={16} className="text-destructive" />
                  ) : (
                    <TreePine size={16} className="text-geo-green" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{report.text}</div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><MapPin size={9} /> {report.zone}</span>
                    <span>· {report.time}</span>
                    {report.hasPhoto && <span className="flex items-center gap-0.5 text-geo-amber"><Camera size={9} /> Photo</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-primary shrink-0">
                  <ThumbsUp size={10} />
                  <span className="font-mono font-bold">{report.validations}</span>
                </div>
              </motion.div>
            ))}
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
