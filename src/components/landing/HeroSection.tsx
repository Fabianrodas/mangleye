import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Map, ArrowRight, Droplets, TreePine, Users } from "lucide-react";

const proofStats = [
  { value: "2,847", label: "Flood reports", icon: Droplets },
  { value: "14", label: "Priority zones", icon: TreePine },
  { value: "1,230", label: "Active citizens", icon: Users },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-8 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />

      {/* Animated water lines */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {[0, 1, 2, 3].map(i => (
            <motion.path
              key={i}
              d={`M${-200 + i * 50},${300 + i * 60} Q${300 + i * 30},${200 + i * 40} ${600 + i * 20},${350 + i * 50} T${1400 + i * 30},${280 + i * 45}`}
              fill="none"
              stroke="hsl(190 75% 48%)"
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 3 + i * 0.5, delay: i * 0.3, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/8 border border-destructive/15 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-semibold text-destructive tracking-wide">Guayaquil is flooding — help make it visible</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-5">
            <span className="text-foreground">Report flooding.</span>
            <br />
            <span className="text-foreground">Protect your</span>
            <br />
            <span className="text-gradient">neighborhood.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Mangleye maps flood risk, ecological edges, and citizen reports 
            to show where action is needed most — and where it's already happening.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <Link
              to="/report/flood"
              className="group px-8 py-3.5 bg-destructive text-white rounded-xl text-sm font-bold hover:bg-destructive/90 transition-all shadow-lg shadow-destructive/20 flex items-center gap-2"
            >
              <AlertTriangle size={16} />
              Report Flooding
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/map"
              className="group px-8 py-3.5 bg-white text-foreground border border-border rounded-xl text-sm font-semibold hover:bg-secondary/50 transition-colors shadow-sm flex items-center gap-2"
            >
              <Map size={16} className="text-primary" />
              Explore Live Map
            </Link>
          </motion.div>

          {/* Proof of activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="flex items-center justify-center gap-6 md:gap-10"
          >
            {proofStats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <stat.icon size={16} className="text-primary" />
                <div className="text-left">
                  <div className="text-lg font-bold font-mono text-foreground">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
