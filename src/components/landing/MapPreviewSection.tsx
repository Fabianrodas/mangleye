import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Map, Layers, AlertTriangle, Radio, Droplets, TreePine, ShieldAlert } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const mapPoints = [
  { x: 22, y: 32, type: "flood" as const, label: "High flood risk", urgent: true },
  { x: 48, y: 28, type: "warning" as const, label: "Mangrove loss detected", urgent: false },
  { x: 35, y: 52, type: "flood" as const, label: "Critical flooding zone", urgent: true },
  { x: 65, y: 44, type: "ecology" as const, label: "Restoration candidate", urgent: false },
  { x: 28, y: 65, type: "warning" as const, label: "Urban pressure rising", urgent: false },
  { x: 72, y: 30, type: "ecology" as const, label: "Buffer zone intact", urgent: false },
  { x: 55, y: 62, type: "flood" as const, label: "Recurrent flood area", urgent: true },
  { x: 40, y: 38, type: "warning" as const, label: "Estuary edge eroding", urgent: false },
];

const typeConfig = {
  flood: { icon: Droplets, bg: "bg-destructive", ring: "border-destructive/40", glow: "hsl(var(--destructive) / 0.35)", text: "text-destructive-foreground" },
  ecology: { icon: TreePine, bg: "bg-geo-green", ring: "border-geo-green/40", glow: "hsl(var(--geo-green) / 0.35)", text: "text-white" },
  warning: { icon: ShieldAlert, bg: "bg-geo-amber", ring: "border-geo-amber/40", glow: "hsl(var(--geo-amber) / 0.35)", text: "text-white" },
};

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  );
}

function MapPoint({ point, index, isActive }: { point: typeof mapPoints[0]; index: number; isActive: boolean }) {
  const config = typeConfig[point.type];
  const Icon = config.icon;

  return (
    <motion.div
      className="absolute"
      style={{ left: `${point.x}%`, top: `${point.y}%`, transform: "translate(-50%, -50%)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 + index * 0.25, type: "spring", stiffness: 200 }}
    >
      {/* Outer pulse ring */}
      {(point.urgent || isActive) && (
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${config.ring}`}
          style={{ width: 36, height: 36, marginLeft: -10, marginTop: -10 }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
      )}

      {/* Glow effect */}
      {isActive && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 44, height: 44,
            marginLeft: -14, marginTop: -14,
            background: `radial-gradient(circle, ${config.glow}, transparent 70%)`,
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Marker body */}
      <motion.div
        className={`relative w-4 h-4 rounded-full ${config.bg} flex items-center justify-center shadow-lg`}
        animate={isActive ? { scale: [1, 1.25, 1] } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <Icon size={8} className={config.text} strokeWidth={2.5} />
      </motion.div>

      {/* Label */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: 5, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -5, scale: 0.9 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap z-10"
          >
            <div className="px-2.5 py-1.5 bg-foreground/90 backdrop-blur-sm rounded-lg text-[10px] font-semibold text-white shadow-xl border border-white/10">
              <div className="flex items-center gap-1.5">
                {point.urgent && <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />}
                {point.label}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StatusBar() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCount(c => c + Math.floor(Math.random() * 3) + 1), 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5 }}
      className="absolute top-3 left-3 right-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-foreground/80 backdrop-blur-sm rounded-lg text-[9px] text-white font-mono">
        <Radio size={8} className="text-geo-green animate-pulse" />
        LIVE — {count} data points processed
      </div>
      <div className="px-2.5 py-1.5 bg-destructive/90 backdrop-blur-sm rounded-lg text-[9px] text-white font-bold animate-pulse">
        3 ALERTS
      </div>
    </motion.div>
  );
}

export default function MapPreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(i => (i + 1) % mapPoints.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-xs font-bold text-destructive uppercase tracking-wider">Live detection</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Risk is already there.<br />
              <span className="text-muted-foreground">You just can't see it yet.</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Our system continuously maps flood zones, ecological edges, citizen reports, and priority areas — revealing what's invisible to the naked eye.
            </p>
            <p className="text-[10px] text-muted-foreground/70 italic mb-6">
              Simulated environmental analysis based on satellite-derived mangrove datasets and spatial flood risk models.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: Layers, text: "Toggle data layers: flooding, mangroves, urban pressure, restoration zones" },
                { icon: Map, text: "Click any zone for risk, ecology, and intervention analysis" },
                { icon: AlertTriangle, text: "Report flooding or observations directly from the map" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon size={14} className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            <Link
              to="/map"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Map size={15} />
              Explore flood risk in real time
            </Link>
          </motion.div>

          {/* Live map visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-2xl bg-secondary"
          >
            {/* Territorial background */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 30% 40%, hsl(var(--geo-blue) / 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, hsl(var(--geo-green) / 0.12) 0%, transparent 40%),
                radial-gradient(circle at 50% 30%, hsl(var(--destructive) / 0.08) 0%, transparent 35%),
                radial-gradient(circle at 20% 70%, hsl(var(--geo-teal) / 0.1) 0%, transparent 45%)
              `
            }} />

            {/* Grid lines */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />

            <ScanLine />
            <StatusBar />

            {mapPoints.map((point, i) => (
              <MapPoint key={i} point={point} index={i} isActive={hovered ? true : i === activeIndex} />
            ))}

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
                />
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 right-3 flex gap-2">
              {[
                { label: "Flood Risk", color: "bg-destructive" },
                { label: "Ecology", color: "bg-geo-green" },
                { label: "Warning", color: "bg-geo-amber" },
                { label: "Priority", color: "bg-primary" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + i * 0.15 }}
                  className="px-2 py-1 bg-card/90 backdrop-blur-sm rounded-md text-[10px] font-medium text-muted-foreground border border-border/50 flex items-center gap-1.5"
                >
                  <span className={`w-2 h-2 rounded-full ${item.color}`} />
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
