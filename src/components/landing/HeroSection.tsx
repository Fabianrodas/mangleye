import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Map, Droplets, TreePine, Users, Shield } from "lucide-react";
import { useRef } from "react";
import heroImg from "@/assets/hero-aerial.jpg";

const stats = [
  { value: "2,847", label: "Flood reports", icon: Droplets },
  { value: "438", label: "Eco observations", icon: TreePine },
  { value: "14", label: "Priority zones", icon: Shield },
  { value: "1,230", label: "Validations", icon: Users },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.75]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-end overflow-hidden">
      {/* Parallax aerial image */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
        <img
          src={heroImg}
          alt="Aerial view of Guayaquil estuary and urban edge"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Dark cinematic overlay — heavier at top for headline readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(192,18%,6%)/0.85] via-[hsl(192,18%,6%)/0.55] to-[hsl(192,18%,6%)/0.9] pointer-events-none" />
      {/* Left-side fog for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(192,18%,6%)/0.6] via-[hsl(192,18%,6%)/0.25] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full pb-12 pt-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl bg-black/50 backdrop-blur-md rounded-2xl px-8 py-8 border border-white/10 shadow-[0_8px_60px_rgba(0,0,0,0.6)]"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/30 border border-destructive/40 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              <span className="text-[11px] font-semibold text-white">Active flooding season</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.8),0_4px_40px_rgba(0,0,0,0.5)]">
              Guayaquil didn't just flood.
              <br />
              <span className="text-[hsl(188,80%,55%)] [text-shadow:0_0_30px_hsl(188,60%,45%,0.5),0_2px_20px_rgba(0,0,0,0.8)]">It lost its protective edges.</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-lg [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              Urban growth replaced natural buffers. Water now has nowhere to go. Mangleye maps the damage and the path to restoration.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/report/flood"
                className="group px-7 py-3.5 bg-destructive text-white rounded-lg text-sm font-bold hover:bg-destructive/90 transition-all shadow-lg flex items-center gap-2"
              >
                <AlertTriangle size={16} />
                Report Flooding
              </Link>
              <Link
                to="/map"
                className="px-7 py-3.5 bg-white/15 text-white border border-white/25 rounded-lg text-sm font-semibold hover:bg-white/25 transition-colors backdrop-blur-sm flex items-center gap-2"
              >
                <Map size={16} />
                Explore Live Map
              </Link>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/8 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon size={13} className="text-white/50" />
                  <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
                <div className="text-xl md:text-2xl font-bold font-mono text-white">{stat.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
