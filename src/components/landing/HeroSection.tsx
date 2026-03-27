import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/5" />
      
      {/* Animated water lines SVG */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.path
              key={i}
              d={`M${-200 + i * 50},${300 + i * 60} Q${300 + i * 30},${200 + i * 40} ${600 + i * 20},${350 + i * 50} T${1400 + i * 30},${280 + i * 45}`}
              fill="none"
              stroke="hsl(190 75% 48%)"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 3 + i * 0.5, delay: i * 0.3, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>

      {/* Stylized map silhouette */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <svg viewBox="0 0 400 500" className="w-[500px] h-[600px]">
          <path
            d="M120,50 C150,30 200,20 250,45 C300,70 340,120 350,180 C360,240 330,300 310,340 C290,380 250,420 200,450 C150,420 100,380 80,340 C60,300 50,240 60,180 C70,120 90,70 120,50 Z"
            fill="hsl(168 55% 38%)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary tracking-wide">Inteligencia Geoespacial Urbana</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            <span className="text-foreground">Guayaquil no solo</span>
            <br />
            <span className="text-foreground">se inundó.</span>
            <br />
            <span className="text-gradient">Perdió sus bordes</span>
            <br />
            <span className="text-gradient">protectores.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Mangleye revela dónde el riesgo de inundación es mayor, dónde falta la protección del manglar, 
            y dónde la restauración ecológica puede reducir el impacto urbano.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/map"
              className="group px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              Explorar el mapa
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/methodology"
              className="px-8 py-3.5 bg-white/80 text-foreground border border-border rounded-xl text-sm font-medium hover:bg-white transition-colors shadow-sm"
            >
              Conocer la metodología
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
