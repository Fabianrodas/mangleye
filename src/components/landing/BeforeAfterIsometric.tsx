import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import beforeAfterImg from "@/assets/before-after.jpg";
import floodImg from "@/assets/flooding-street.jpg";

export default function BeforeAfterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const sliderX = useMotionValue(50);
  const clipRight = useTransform(sliderX, (v) => `${v}%`);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    sliderX.set(Math.max(8, Math.min(92, pct)));
  }, [sliderX]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    updatePosition(e.clientX);
  }, [dragging, updatePosition]);

  const onPointerUp = useCallback(() => setDragging(false), []);

  // Animate hint on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(sliderX, [50, 30, 70, 50], { duration: 1.8, ease: "easeInOut" });
    }, 1200);
    return () => clearTimeout(timeout);
  }, [sliderX]);

  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Subtle section transition gradient */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            The edge that protects — or fails
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Drag to reveal: when natural buffers are destroyed, flooding becomes
            inevitable. Restoration changes the equation.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/40 aspect-[16/9] max-w-4xl mx-auto select-none cursor-col-resize"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {/* Bottom layer: "After" (restored) */}
          <img
            src={beforeAfterImg}
            alt="Restored ecological edge"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            width={1920}
            height={960}
          />

          {/* Top layer: "Before" (current), clipped by slider */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ width: clipRight }}
          >
            <img
              src={floodImg}
              alt="Current degraded condition"
              className="w-full h-full object-cover"
              style={{ minWidth: containerRef.current?.offsetWidth || "100%" }}
              draggable={false}
              width={1920}
              height={960}
            />
          </motion.div>

          {/* Slider handle */}
          <motion.div
            className="absolute top-0 bottom-0 z-20 flex items-center"
            style={{ left: clipRight, x: "-50%" }}
          >
            {/* Vertical line */}
            <div className="w-[3px] h-full bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.3)]" />

            {/* Drag handle */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center transition-transform ${dragging ? "scale-110" : "hover:scale-105"}`}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5 3L2 8L5 13M11 3L14 8L11 13"
                  stroke="hsl(172 40% 22%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 z-20">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="px-3 py-1.5 bg-foreground/80 text-white text-xs font-semibold rounded-lg backdrop-blur-sm"
            >
              Current condition
            </motion.span>
          </div>
          <div className="absolute bottom-4 right-4 z-20">
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="px-3 py-1.5 bg-primary/90 text-white text-xs font-semibold rounded-lg backdrop-blur-sm"
            >
              Restored edge
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
