import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shield, Droplets, TreePine, Waves } from "lucide-react";
import { useRef, MouseEvent } from "react";
import mangroveImg from "@/assets/mangrove-estuary.jpg";

const losses = [
  {
    icon: Shield,
    stat: "60%",
    title: "Natural flood buffering lost",
    desc: "Mangrove barriers that absorbed tidal surges replaced by concrete.",
    color: "text-destructive",
    bg: "bg-destructive/5",
    border: "border-destructive/15",
  },
  {
    icon: Droplets,
    stat: "78%",
    title: "Soil permeability eliminated",
    desc: "Impervious urban surfaces prevent rainfall absorption.",
    color: "text-geo-blue",
    bg: "bg-geo-blue/5",
    border: "border-geo-blue/15",
  },
  {
    icon: Waves,
    stat: "85%",
    title: "Water absorption gone",
    desc: "The ecological sponge between city and estuary has collapsed.",
    color: "text-geo-amber",
    bg: "bg-geo-amber/5",
    border: "border-geo-amber/15",
  },
  {
    icon: TreePine,
    stat: "40%",
    title: "Ecological continuity broken",
    desc: "Fragmented corridors no longer support water regulation.",
    color: "text-geo-green",
    bg: "bg-geo-green/5",
    border: "border-geo-green/15",
  },
];

function TiltCard({
  item,
  index,
}: {
  item: (typeof losses)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  const shadowX = useTransform(springY, [-15, 15], [10, -10]);
  const shadowY = useTransform(springX, [-15, 15], [-10, 10]);

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -12);
    rotateY.set(((x - centerX) / centerX) * 12);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        boxShadow: useTransform(
          [shadowX, shadowY],
          ([sx, sy]) => `${sx}px ${sy}px 30px rgba(0,0,0,0.08)`
        ),
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`relative p-5 rounded-2xl border ${item.border} ${item.bg} cursor-default overflow-hidden`}
    >
      {/* Floating stat with translateZ effect */}
      <motion.div
        className={`text-4xl font-extrabold font-mono ${item.color} mb-2`}
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
      >
        {item.stat}
      </motion.div>

      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        <h3 className="text-sm font-bold mb-1 flex items-center gap-2">
          <item.icon size={15} className={item.color} />
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {item.desc}
        </p>
      </div>

      {/* Subtle shine overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: useTransform(
            springY,
            [-15, 15],
            [
              "linear-gradient(105deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
              "linear-gradient(255deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
            ]
          ),
        }}
      />
    </motion.div>
  );
}

export default function WhatThisAreaLost() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-xl group sticky top-24"
          >
            <motion.img
              src={mangroveImg}
              alt="Mangrove estuary system in Guayaquil"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
              width={1200}
              height={800}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-xs font-medium">
                Mangrove estuary — the city's natural flood defense
              </p>
            </div>
          </motion.div>

          {/* 3D tilt cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                What this area lost
              </h2>
              <p className="text-sm text-muted-foreground">
                Two decades of unchecked urbanization stripped Guayaquil's
                natural defenses.
              </p>
            </motion.div>

            <div className="space-y-4" style={{ perspective: "1000px" }}>
              {losses.map((item, i) => (
                <TiltCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
