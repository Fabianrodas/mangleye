import { motion } from "framer-motion";
import { useState } from "react";
import beforeAfterImg from "@/assets/before-after.jpg";

export default function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">The edge that protects — or fails</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            When natural buffers are destroyed, flooding becomes inevitable. Restoration changes the equation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl border border-border/50 aspect-[16/9] max-w-4xl mx-auto select-none"
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setSliderPos(Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100)));
          }}
        >
          {/* Full image as background */}
          <img
            src={beforeAfterImg}
            alt="Before and after ecological restoration"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1920}
            height={960}
          />

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="hsl(192 18% 14%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 z-20">
            <span className="px-3 py-1.5 bg-foreground/80 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
              Current condition
            </span>
          </div>
          <div className="absolute bottom-4 right-4 z-20">
            <span className="px-3 py-1.5 bg-primary/90 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
              Restored edge
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
