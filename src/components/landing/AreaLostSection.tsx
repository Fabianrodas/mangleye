import { motion, useInView } from "framer-motion";
import { Waves, Wind, DollarSign, Users } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const metrics = [
  {
    icon: Waves,
    value: 27.6,
    suffix: "%",
    title: "Mangrove loss in Ecuador",
    desc: "Ecuador lost 27.6% of its mangrove forests between 1970 and 1990 due to shrimp farming and urban expansion.",
    color: "text-destructive",
    glow: "hsl(var(--destructive))",
    x: "6%", y: "12%",
  },
  {
    icon: Wind,
    value: 66,
    suffix: "%",
    title: "Wave energy reduction",
    desc: "Mangrove ecosystems can reduce wave energy by up to 66%, helping buffer coastal flooding.",
    color: "text-geo-blue",
    glow: "hsl(var(--geo-blue))",
    x: "56%", y: "10%",
  },
  {
    icon: DollarSign,
    value: 9,
    suffix: "%",
    title: "Increased economic damage",
    desc: "Without mangroves, global flood-related damage to property would increase by around 9% annually.",
    color: "text-geo-amber",
    glow: "hsl(var(--geo-amber))",
    x: "6%", y: "55%",
  },
  {
    icon: Users,
    value: 28,
    suffix: "%",
    title: "Population exposure",
    desc: "Without mangroves, up to 28% more people would be exposed to flooding each year.",
    color: "text-geo-green",
    glow: "hsl(var(--geo-green))",
    x: "56%", y: "55%",
  },
];

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1800;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = eased * target;
      setCount(isDecimal ? Math.round(val * 10) / 10 : Math.round(val));
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
          className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[500px] md:min-h-[60vh]"
        >
          {/* Background image — absolute fill */}
          <img
            src="https://images.unsplash.com/photo-1596587048750-e2af27fded49?w=1600&q=80"
            alt="Mangrove estuary system in Guayaquil"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Subtle overlay — low opacity so image stays visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />

          {/* Floating metric cards */}
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.6, type: "spring" }}
              className="absolute z-10"
              style={{ left: m.x, top: m.y }}
            >
              <div
                className="relative p-3 md:p-4 rounded-xl backdrop-blur-md border border-white/15 shadow-xl max-w-[220px]"
                style={{ background: "rgba(0,0,0,0.48)" }}
              >
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
                <p className="text-[9px] md:text-[10px] text-white/50 mt-0.5 hidden md:block leading-snug">{m.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Bottom caption */}
          <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between">
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
