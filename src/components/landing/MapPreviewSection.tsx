import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Map, Layers, AlertTriangle, Radio } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const mapPoints = [
  { x: 22, y: 32, color: "bg-destructive", label: "High flood risk", urgent: true, size: 14 },
  { x: 48, y: 28, color: "bg-geo-amber", label: "Mangrove loss detected", urgent: false, size: 11 },
  { x: 35, y: 52, color: "bg-destructive", label: "Critical flooding zone", urgent: true, size: 16 },
  { x: 65, y: 44, color: "bg-geo-green", label: "Restoration candidate", urgent: false, size: 10 },
  { x: 28, y: 65, color: "bg-geo-amber", label: "Urban pressure rising", urgent: false, size: 12 },
  { x: 72, y: 30, color: "bg-primary", label: "Buffer zone intact", urgent: false, size: 9 },
  { x: 55, y: 62, color: "bg-destructive", label: "Recurrent flood area", urgent: true, size: 13 },
  { x: 40, y: 38, color: "bg-geo-blue", label: "Estuary edge eroding", urgent: false, size: 11 },
];

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
  return (
    <motion.div
      className="absolute"
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 + index * 0.25, type: "spring", stiffness: 200 }}
    >
      {/* Pulse ring for urgent */}
      {point.urgent && (
        <motion.div
          className="absolute inset-0 rounded-full bg-destructive/30"
          style={{ width: point.size * 2.5, height: point.size * 2.5, marginLeft: -(point.size * 2.5 - point.size) / 2, marginTop: -(point.size * 2.5 - point.size) / 2 }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
      )}

      {/* Glow for active */}
      {isActive && (
        <motion.div
          className={`absolute rounded-full ${point.color}/20`}
          style={{ width: point.size * 3, height: point.size * 3, marginLeft: -(point.size * 3 - point.size) / 2, marginTop: -(point.size * 3 - point.size) / 2 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: point.size * 3,
            height: point.size * 3,
            marginLeft: -(point.size * 3 - point.size) / 2,
            marginTop: -(point.size * 3 - point.size) / 2,
            background: point.urgent ? "hsl(var(--destructive) / 0.25)" : "hsl(var(--primary) / 0.25)",
            filter: "blur(6px)",
          }}
        />
      )}

      {/* Dot */}
      <motion.div
        className={`rounded-full ${point.color}`}
        style={{ width: point.size, height: point.size }}
        animate={isActive ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
      />

      {/* Label */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: 5, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -5, scale: 0.9 }}
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap z-10"
          >
            <div className="px-2.5 py-1 bg-foreground/90 backdrop-blur-sm rounded-md text-[10px] font-semibold text-white shadow-lg border border-white/10">
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
      <div className="flex items-center gap-1.5 px-2 py-1 bg-foreground/80 backdrop-blur-sm rounded text-[9px] text-white font-mono">
        <Radio size={8} className="text-geo-green animate-pulse" />
        LIVE — {count} data points processed
      </div>
      <div className="px-2 py-1 bg-destructive/90 backdrop-blur-sm rounded text-[9px] text-white font-bold animate-pulse">
        3 ALERTS
      </div>
    </motion.div>
  );
}

export default function MapPreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Our system continuously maps flood zones, ecological edges, citizen reports, and priority areas — revealing what's invisible to the naked eye.
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
            ref={containerRef}
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

            {/* Grid lines for map feel */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />

            {/* Scan line */}
            <ScanLine />

            {/* Status bar */}
            <StatusBar />

            {/* Map points */}
            {mapPoints.map((point, i) => (
              <MapPoint key={i} point={point} index={i} isActive={hovered ? true : i === activeIndex} />
            ))}

            {/* Hover flash effect */}
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

            {/* Bottom layer tags */}
            <div className="absolute bottom-3 left-3 right-3 flex gap-2">
              {["Flood Zones", "Mangroves", "Reports", "Priority"].map((label, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + i * 0.15 }}
                  className="px-2 py-1 bg-card/90 backdrop-blur-sm rounded text-[10px] font-medium text-muted-foreground border border-border/50"
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
