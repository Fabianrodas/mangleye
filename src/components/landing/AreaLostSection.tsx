import { motion, useInView } from "framer-motion";
import { Shield, Droplets, TreePine, Waves } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import mangroveImg from "@/assets/mangrove-estuary.jpg";

const metrics = [
  {
    icon: Shield,
    value: 60,
    suffix: "%",
    title: "Natural flood buffering lost",
    desc: "Mangrove barriers replaced by concrete",
    color: "text-destructive",
    glow: "hsl(var(--destructive))",
    x: "8%", y: "18%",
  },
  {
    icon: Droplets,
    value: 78,
    suffix: "%",
    title: "Soil permeability eliminated",
    desc: "Impervious surfaces prevent absorption",
    color: "text-geo-blue",
    glow: "hsl(var(--geo-blue))",
    x: "62%", y: "12%",
  },
  {
    icon: Waves,
    value: 85,
    suffix: "%",
    title: "Water absorption gone",
    desc: "Ecological sponge has collapsed",
    color: "text-geo-amber",
    glow: "hsl(var(--geo-amber))",
    x: "6%", y: "62%",
  },
  {
    icon: TreePine,
    value: 40,
    suffix: "%",
    title: "Ecological continuity broken",
    desc: "Fragmented corridors can't regulate water",
    color: "text-geo-green",
    glow: "hsl(var(--geo-green))",
    x: "58%", y: "65%",
  },
];

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1800;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

export default function WhatThisAreaLost() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">What this area lost</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Two decades of unchecked urbanization stripped Guayaquil's natural defenses.
          </p>
        </motion.div>

        {/* Full-width image with floating metrics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={mangroveImg}
            alt="Mangrove estuary system in Guayaquil"
            className="w-full aspect-[16/9] md:aspect-[21/9] object-cover"
            loading="lazy"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-foreground/10" />

          {/* Floating metrics */}
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.6, type: "spring" }}
              className="absolute"
              style={{ left: m.x, top: m.y }}
            >
              <div
                className="relative p-3 md:p-4 rounded-xl backdrop-blur-md border border-white/15 shadow-xl"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                {/* Glow */}
                <div
                  className="absolute -inset-1 rounded-xl opacity-20 blur-md -z-10"
                  style={{ background: m.glow }}
                />

                <div className="flex items-center gap-2 mb-1">
                  <m.icon size={14} className={m.color} />
                  <span className={`text-2xl md:text-3xl font-extrabold font-mono ${m.color}`}>
                    <CountUp target={m.value} suffix={m.suffix} inView={isInView} />
                  </span>
                </div>
                <p className="text-[11px] md:text-xs font-semibold text-white/90 leading-tight">{m.title}</p>
                <p className="text-[9px] md:text-[10px] text-white/50 mt-0.5 hidden md:block">{m.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Bottom caption */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <p className="text-white/70 text-xs font-medium">
              Mangrove estuary — Guayaquil's natural flood defense
            </p>
            <div className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-[9px] text-white/60 font-mono">
              Source: Satellite analysis 2004–2024
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
