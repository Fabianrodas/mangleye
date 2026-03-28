import { motion } from "framer-motion";
import { Shield, Droplets, TreePine, Waves } from "lucide-react";
import mangroveImg from "@/assets/mangrove-estuary.jpg";

const losses = [
  {
    icon: Shield,
    stat: "60%",
    title: "Natural flood buffering lost",
    desc: "Mangrove barriers that absorbed tidal surges replaced by concrete.",
    color: "text-destructive",
    bg: "bg-destructive/5 border-destructive/15",
  },
  {
    icon: Droplets,
    stat: "78%",
    title: "Soil permeability eliminated",
    desc: "Impervious urban surfaces prevent rainfall absorption.",
    color: "text-geo-blue",
    bg: "bg-geo-blue/5 border-geo-blue/15",
  },
  {
    icon: Waves,
    stat: "85%",
    title: "Water absorption gone",
    desc: "The ecological sponge between city and estuary has collapsed.",
    color: "text-geo-amber",
    bg: "bg-geo-amber/5 border-geo-amber/15",
  },
  {
    icon: TreePine,
    stat: "40%",
    title: "Ecological continuity broken",
    desc: "Fragmented corridors no longer support water regulation.",
    color: "text-geo-green",
    bg: "bg-geo-green/5 border-geo-green/15",
  },
];

export default function WhatThisAreaLost() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Section transition */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image with parallax feel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-xl group"
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

          {/* Floating 3D cards */}
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

            <div className="space-y-3" style={{ perspective: "800px" }}>
              {losses.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotateX: 15, y: 30 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{
                    rotateY: 3,
                    rotateX: -2,
                    scale: 1.02,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                  }}
                  className={`flex items-start gap-4 p-4 rounded-xl border ${item.bg} cursor-default transition-colors`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className={`text-3xl font-bold font-mono ${item.color} shrink-0 w-14 text-right`}
                  >
                    {item.stat}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold mb-0.5 flex items-center gap-2">
                      <item.icon size={14} className={item.color} />
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
