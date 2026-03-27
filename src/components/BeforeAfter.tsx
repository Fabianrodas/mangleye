import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Zone } from "@/data/zones";

export default function BeforeAfter({ zone }: { zone: Zone }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="glass-panel-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Comparador
        </span>
        <div className="flex items-center bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              !showAfter ? "bg-geo-red/20 text-geo-red" : "text-muted-foreground"
            }`}
          >
            Antes
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              showAfter ? "bg-geo-green/20 text-geo-green" : "text-muted-foreground"
            }`}
          >
            Después
          </button>
        </div>
      </div>
      <motion.div
        key={showAfter ? "after" : "before"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`p-3 rounded-lg border ${
          showAfter
            ? "bg-geo-green/5 border-geo-green/20"
            : "bg-geo-red/5 border-geo-red/20"
        }`}
      >
        <div className="flex items-start gap-2">
          <ArrowRight size={14} className={`mt-0.5 shrink-0 ${showAfter ? "text-geo-green" : "text-geo-red"}`} />
          <p className="text-sm leading-relaxed">
            {showAfter ? zone.afterDescription : zone.beforeDescription}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
