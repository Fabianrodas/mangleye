import { motion } from "framer-motion";
import { Shield, Droplets, TreePine, Waves } from "lucide-react";
import mangroveImg from "@/assets/mangrove-estuary.jpg";

const losses = [
  {
    icon: Shield,
    stat: "60%",
    title: "Natural flood buffering lost",
    desc: "Mangrove barriers that absorbed tidal surges have been replaced by concrete walls.",
    color: "text-destructive",
  },
  {
    icon: Droplets,
    stat: "78%",
    title: "Soil permeability eliminated",
    desc: "Impervious urban surfaces prevent rainfall from being absorbed into the ground.",
    color: "text-geo-blue",
  },
  {
    icon: Waves,
    stat: "85%",
    title: "Water absorption capacity gone",
    desc: "The ecological sponge between city and estuary has collapsed.",
    color: "text-geo-amber",
  },
  {
    icon: TreePine,
    stat: "40%",
    title: "Ecological continuity broken",
    desc: "Fragmented vegetation corridors can no longer support species or water regulation.",
    color: "text-geo-green",
  },
];

export default function WhatThisAreaLost() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={mangroveImg}
              alt="Mangrove estuary system in Guayaquil"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-xs font-medium">Mangrove estuary buffer — the city's natural defense system</p>
            </div>
          </motion.div>

          {/* Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">What this area lost</h2>
              <p className="text-sm text-muted-foreground">
                Two decades of unchecked urbanization have stripped Guayaquil's natural defenses.
              </p>
            </motion.div>

            <div className="space-y-3">
              {losses.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-white"
                >
                  <div className={`text-3xl font-bold font-mono ${item.color} shrink-0 w-14 text-right`}>
                    {item.stat}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold mb-0.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
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
