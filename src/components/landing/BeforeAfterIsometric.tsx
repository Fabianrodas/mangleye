import { motion } from "framer-motion";
import { useState } from "react";

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
      <polygon
        points={`${x},${y - height} ${x + 40},${y - height - 20} ${x + 80},${y - height} ${x + 40},${y - height + 20}`}
        fill={color} opacity={0.9}
      />
      <polygon
        points={`${x + 40},${y - height + 20} ${x + 80},${y - height} ${x + 80},${y} ${x + 40},${y + 20}`}
        fill={color} opacity={0.6}
      />
      <polygon
        points={`${x},${y - height} ${x + 40},${y - height + 20} ${x + 40},${y + 20} ${x},${y}`}
        fill={color} opacity={0.75}
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
    <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            The edge that <span className="text-gradient">can be restored</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Hard urban edges trap floodwater. Restored ecological edges distribute it naturally.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAfter(!showAfter)}
            className="flex items-center bg-white border border-border rounded-full p-1 shadow-sm"
          >
            <span className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!showAfter ? 'bg-destructive/10 text-destructive' : 'text-muted-foreground'}`}>
              Current problem
            </span>
            <span className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${showAfter ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
              Restored edge
            </span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className={`transition-all duration-500 ${showAfter ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="glass-panel p-6 rounded-2xl">
              <div className="text-xs font-semibold text-destructive uppercase tracking-wider mb-3">Hard urban edge</div>
              <svg viewBox="0 0 400 280" className="w-full">
                <polygon points="0,200 200,120 400,200 200,280" fill="hsl(45 15% 88%)" />
                <IsometricBlock color="hsl(200 10% 65%)" height={60} x={60} y={180} label="Concrete" delay={0.1} />
                <IsometricBlock color="hsl(200 10% 55%)" height={80} x={140} y={170} label="Building" delay={0.2} />
                <IsometricBlock color="hsl(200 10% 60%)" height={45} x={220} y={185} label="Road" delay={0.3} />
                <motion.ellipse
                  cx={170} cy={230} rx={60} ry={15}
                  fill="hsl(5 70% 58%)" opacity={0.3}
                  animate={{ opacity: [0.2, 0.4, 0.2], rx: [55, 65, 55] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <text x={170} y={260} textAnchor="middle" className="text-[10px] fill-destructive font-semibold">
                  Water pooling
                </text>
              </svg>
            </div>
          </div>

          <div className={`transition-all duration-500 ${!showAfter ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="glass-panel p-6 rounded-2xl border-primary/20">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Restored ecological edge</div>
              <svg viewBox="0 0 400 280" className="w-full">
                <polygon points="0,200 200,120 400,200 200,280" fill="hsl(160 40% 88%)" />
                {[80, 150, 240, 300].map((tx, i) => (
                  <motion.g key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
                    <polygon points={`${tx},${145 - i * 5} ${tx - 15},${175 - i * 5} ${tx + 15},${175 - i * 5}`} fill="hsl(160 55% 40%)" opacity={0.8} />
                    <rect x={tx - 2} y={175 - i * 5} width={4} height={12} fill="hsl(30 40% 45%)" />
                  </motion.g>
                ))}
                <IsometricBlock color="hsl(168 55% 42%)" height={20} x={100} y={195} label="Mangrove" delay={0.3} />
                <IsometricBlock color="hsl(160 50% 50%)" height={15} x={200} y={190} label="Vegetation" delay={0.4} />
                <motion.path
                  d="M60,210 Q130,200 200,215 T340,205"
                  fill="none" stroke="hsl(190 75% 48%)" strokeWidth={2} strokeDasharray="8 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <text x={200} y={260} textAnchor="middle" className="text-[10px] fill-primary font-semibold">
                  Distributed flow
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
