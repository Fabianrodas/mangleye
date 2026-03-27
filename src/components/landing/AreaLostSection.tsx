import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TreePine, Droplets, Shield } from "lucide-react";

function AnimatedCounter({ end, suffix = "%", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref} className="font-mono">{count}{suffix}</span>;
}

function ProgressRing({ progress, color, size = 80 }: { progress: number; color: string; size?: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref, { once: true });
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(45 15% 88%)" strokeWidth={4} />
      <motion.circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={inView ? { strokeDashoffset: circumference * (1 - progress / 100) } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
}

const stats = [
  {
    icon: TreePine,
    value: 60,
    suffix: "%",
    label: "Cobertura de manglar perdida",
    description: "En 20 años, los bordes de manglar que protegían a Guayaquil se han reducido drásticamente.",
    color: "hsl(160 55% 40%)",
    iconColor: "text-geo-green",
  },
  {
    icon: Droplets,
    value: 78,
    suffix: "%",
    label: "Superficie impermeabilizada",
    description: "Las zonas críticas tienen casi el 80% de suelo sellado, eliminando la capacidad natural de infiltración.",
    color: "hsl(200 70% 50%)",
    iconColor: "text-geo-blue",
  },
  {
    icon: Shield,
    value: 85,
    suffix: "%",
    label: "Compresión del borde ecológico",
    description: "El espacio entre la ciudad y el agua se ha comprimido, eliminando la zona de amortiguamiento contra inundaciones.",
    color: "hsl(5 70% 58%)",
    iconColor: "text-geo-red",
  },
];

export default function AreaLostSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Lo que esta zona perdió</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            El costo invisible de la <span className="text-destructive">expansión urbana</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cada porcentaje perdido significa más familias expuestas, más daño económico, más vulnerabilidad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass-panel p-8 rounded-2xl text-center group hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-6 relative">
                <ProgressRing progress={stat.value} color={stat.color} size={100} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <stat.icon size={24} className={stat.iconColor} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-sm font-semibold mb-2">{stat.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
