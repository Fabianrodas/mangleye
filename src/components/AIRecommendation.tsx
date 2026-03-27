import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

interface AIRecommendationProps {
  steps: string[];
}

export default function AIRecommendation({ steps }: AIRecommendationProps) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="glass-panel-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
          <BrainCircuit size={14} className="text-primary" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Recomendación IA
        </span>
        <div className="ml-auto px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-medium">
          {completed.size}/{steps.length}
        </div>
      </div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => toggle(i)}
            className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg transition-all ${
              completed.has(i) ? "bg-primary/5" : "hover:bg-secondary/40"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {completed.has(i) ? (
                <CheckCircle2 size={15} className="text-primary" />
              ) : (
                <Circle size={15} className="text-muted-foreground/50" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted-foreground mr-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`text-sm ${completed.has(i) ? "line-through text-muted-foreground" : ""}`}>
                {step}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
