import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function IsometricBlock({ color, height, x, y, label, delay = 0 }: {
  color: string; height: number; x: number; y: number; label?: string; delay?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Top face */}
      <polygon
        points={`${x},${y - height} ${x + 40},${y - height - 20} ${x + 80},${y - height} ${x + 40},${y - height + 20}`}
        fill={color}
        opacity={0.9}
      />
      {/* Right face */}
      <polygon
        points={`${x + 40},${y - height + 20} ${x + 80},${y - height} ${x + 80},${y} ${x + 40},${y + 20}`}
        fill={color}
        opacity={0.6}
      />
      {/* Left face */}
      <polygon
        points={`${x},${y - height} ${x + 40},${y - height + 20} ${x + 40},${y + 20} ${x},${y}`}
        fill={color}
        opacity={0.75}
      />
      {label && (
        <text x={x + 40} y={y + 38} textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">
          {label}
        </text>
      )}
    </motion.g>
  );
}

export default function BeforeAfterIsometric() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto w-full"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">Antes vs Después</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            El borde urbano que <span className="text-gradient">puede renacer</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Una comparación conceptual: el borde duro actual vs. un borde ecológico restaurado.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div variants={itemVariants} className="flex justify-center mb-10">
          <button
            onClick={() => setShowAfter(!showAfter)}
            className="relative flex items-center bg-white border border-border rounded-full p-1 shadow-sm"
          >
            <span className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!showAfter ? 'bg-destructive/10 text-destructive' : 'text-muted-foreground'}`}>
              Problema actual
            </span>
            <span className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${showAfter ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
              Borde restaurado
            </span>
          </button>
        </motion.div>

        {/* Isometric scenes */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <div className={`relative transition-all duration-500 ${showAfter ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="glass-panel p-8 rounded-2xl">
              <div className="text-xs font-semibold text-destructive uppercase tracking-wider mb-4">Borde duro actual</div>
              <svg viewBox="0 0 400 280" className="w-full">
                {/* Ground */}
                <polygon points="0,200 200,120 400,200 200,280" fill="hsl(45 15% 88%)" />
                {/* Concrete blocks */}
                <IsometricBlock color="hsl(200 10% 65%)" height={60} x={60} y={180} label="Concreto" delay={0.1} />
                <IsometricBlock color="hsl(200 10% 55%)" height={80} x={140} y={170} label="Edificio" delay={0.2} />
                <IsometricBlock color="hsl(200 10% 60%)" height={45} x={220} y={185} label="Vía" delay={0.3} />
                {/* Water pooling */}
                <motion.ellipse
                  cx={170} cy={230} rx={60} ry={15}
                  fill="hsl(5 70% 58%)"
                  opacity={0.3}
                  animate={{ opacity: [0.2, 0.4, 0.2], rx: [55, 65, 55] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <text x={170} y={260} textAnchor="middle" className="text-[10px] fill-destructive font-semibold">
                  Agua acumulada
                </text>
              </svg>
            </div>
          </div>

          {/* After */}
          <div className={`relative transition-all duration-500 ${!showAfter ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="glass-panel p-8 rounded-2xl border-primary/20">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Borde ecológico restaurado</div>
              <svg viewBox="0 0 400 280" className="w-full">
                {/* Ground - green */}
                <polygon points="0,200 200,120 400,200 200,280" fill="hsl(160 40% 88%)" />
                {/* Trees (simple isometric) */}
                {[80, 150, 240, 300].map((tx, i) => (
                  <motion.g key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
                    <polygon points={`${tx},${145 - i * 5} ${tx - 15},${175 - i * 5} ${tx + 15},${175 - i * 5}`} fill="hsl(160 55% 40%)" opacity={0.8} />
                    <rect x={tx - 2} y={175 - i * 5} width={4} height={12} fill="hsl(30 40% 45%)" />
                  </motion.g>
                ))}
                {/* Vegetation strip */}
                <IsometricBlock color="hsl(168 55% 42%)" height={20} x={100} y={195} label="Manglar" delay={0.3} />
                <IsometricBlock color="hsl(160 50% 50%)" height={15} x={200} y={190} label="Vegetación" delay={0.4} />
                {/* Water flow arrows */}
                <motion.path
                  d="M60,210 Q130,200 200,215 T340,205"
                  fill="none"
                  stroke="hsl(190 75% 48%)"
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <text x={200} y={260} textAnchor="middle" className="text-[10px] fill-primary font-semibold">
                  Flujo distribuido
                </text>
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
