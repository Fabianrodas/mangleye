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
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref} className="font-mono">{count}{suffix}</span>;
}

const stats = [
  {
    icon: TreePine,
    value: 60,
    label: "Mangrove coverage lost",
    description: "Guayaquil's protective mangrove edges have shrunk dramatically in 20 years.",
    color: "text-geo-green",
    bg: "bg-geo-green/10",
  },
  {
    icon: Droplets,
    value: 78,
    label: "Impervious surface",
    description: "Critical zones have nearly 80% sealed ground, blocking natural water absorption.",
    color: "text-geo-blue",
    bg: "bg-geo-blue/10",
  },
  {
    icon: Shield,
    value: 85,
    label: "Buffer zone compressed",
    description: "The natural space between city and water has collapsed, removing flood protection.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
];

export default function AreaLostSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            The invisible cost of <span className="text-destructive">urban sprawl</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Every percentage lost means more families exposed, more economic damage, more vulnerability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel p-6 rounded-2xl text-center"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon size={22} className={stat.color} />
              </div>
              <div className={`text-4xl font-bold mb-1 ${stat.color}`}>
                <AnimatedCounter end={stat.value} />
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
