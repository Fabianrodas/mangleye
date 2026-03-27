import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Map, Droplets, TreePine, Users, Shield, ArrowRight } from "lucide-react";

const stats = [
  { value: "2,847", label: "Flood reports", icon: Droplets, color: "text-geo-blue" },
  { value: "438", label: "Eco observations", icon: TreePine, color: "text-geo-green" },
  { value: "14", label: "Priority zones", icon: Shield, color: "text-geo-amber" },
  { value: "1,230", label: "Validations", icon: Users, color: "text-primary" },
];

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/8 border border-destructive/15 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              <span className="text-[11px] font-semibold text-destructive">Active flooding season — reports needed</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4">
              Greater Guayaquil is flooding.
              <br />
              <span className="text-gradient">Help make it visible.</span>
            </h1>

            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-md">
              Mangleye maps flood risk and ecological edges using citizen reports. 
              Report flooding in your area so action reaches where it's needed most.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/report/flood"
                className="group px-6 py-3 bg-destructive text-white rounded-lg text-sm font-bold hover:bg-destructive/90 transition-all shadow-md flex items-center gap-2"
              >
                <AlertTriangle size={16} />
                Report Flooding
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/map"
                className="px-6 py-3 bg-white text-foreground border border-border rounded-lg text-sm font-semibold hover:bg-secondary/50 transition-colors shadow-sm flex items-center gap-2"
              >
                <Map size={16} className="text-primary" />
                Explore Live Map
              </Link>
            </div>
          </motion.div>

          {/* Right: Stats + activity card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="glass-panel p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon size={14} className={stat.color} />
                    <span className="text-[11px] text-muted-foreground font-medium">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold font-mono">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="mt-3 glass-panel p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Recent Activity</div>
              <div className="space-y-2">
                {[
                  { text: "Flood reported in Estero Salado – Urdesa", time: "12 min ago", color: "bg-destructive" },
                  { text: "Ecological observation validated in Isla Trinitaria", time: "34 min ago", color: "bg-geo-green" },
                  { text: "New flood report in Guasmo Sur", time: "1 hr ago", color: "bg-geo-blue" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color} mt-1.5 shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs truncate">{item.text}</div>
                      <div className="text-[10px] text-muted-foreground">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
