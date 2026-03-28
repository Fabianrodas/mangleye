import { useState, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import LayerFilters from "@/components/LayerFilters";
import PriorityPanel from "@/components/PriorityPanel";
import ZoneDetail, { ActionsTab } from "@/components/ZoneDetail";
import { AnimatePresence, motion } from "framer-motion";
import { type Zone, type LayerType } from "@/data/zones";
import { getDashboardMetrics } from "@/api/mock-api";
import DataSourceNote from "@/components/DataSourceNote";
import { Layers, ChevronLeft, ChevronRight, Search, AlertTriangle, TreePine, Droplets, Wrench, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function MapExplorer() {
  const [activeLayers, setActiveLayers] = useState<LayerType[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [metrics, setMetrics] = useState<{ floodReports: number; ecologicalObservations: number } | null>(null);

  useEffect(() => {
    getDashboardMetrics().then(m => setMetrics(m));
  }, []);

  const toggleLayer = useCallback((layer: LayerType) => {
    setActiveLayers(prev =>
      prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]
    );
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Map */}
        <div className="flex-1 relative">
          <MapView
            activeLayers={activeLayers}
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
          />

          {/* Search + Layers + Actions */}
          <div className="absolute top-3 left-3 z-[1000] space-y-2 max-h-[calc(100%-80px)] flex flex-col">
            <div className="glass-panel px-3 py-2 flex items-center gap-2 w-[260px]">
              <Search size={13} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search zones, areas..."
                className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground/50"
              />
            </div>
            <LayerFilters activeLayers={activeLayers} onToggle={toggleLayer} />

            {/* Actions panel - collapsible, below layers */}
            <AnimatePresence>
              {selectedZone && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-[300px]"
                >
                  <button
                    onClick={() => setActionsOpen(p => !p)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-white/95 backdrop-blur-lg border border-border/60 rounded-lg shadow-sm hover:bg-secondary/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Wrench size={12} className="text-geo-amber" />
                      <span className="text-xs font-semibold">Actions · {selectedZone.name}</span>
                    </span>
                    {actionsOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                  <AnimatePresence>
                    {actionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 bg-white/95 backdrop-blur-lg border border-border/60 rounded-lg shadow-sm p-3 max-h-[320px] overflow-y-auto">
                          <ActionsTab zone={selectedZone} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick actions */}
          <div className="absolute bottom-4 left-3 z-[1000] flex gap-2">
            <Link
              to="/report/flood"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-destructive text-white text-[13px] font-bold rounded-lg shadow-lg hover:bg-destructive/90 transition-colors"
            >
              <AlertTriangle size={14} />
              Report Flood
            </Link>
            <Link
              to="/report/ecological"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-geo-green text-white text-[13px] font-bold rounded-lg shadow-lg hover:bg-geo-green/90 transition-colors"
            >
              <TreePine size={14} />
              Observation
            </Link>
          </div>

          {/* Bottom stats */}
          <div className="absolute bottom-4 right-[calc(380px+16px)] z-[1000] flex gap-2" style={{ right: sidebarOpen ? "396px" : "16px" }}>
            {[
              { icon: Droplets, label: "Reports", value: String(dashboardData.floodReports), color: "text-geo-blue" },
              { icon: TreePine, label: "Observations", value: String(dashboardData.ecologicalObservations), color: "text-geo-green" },
            ].map(m => (
              <div key={m.label} className="glass-panel px-2.5 py-1.5 flex items-center gap-2">
                <m.icon size={11} className={m.color} />
                <span className="text-xs font-mono font-bold">{m.value}</span>
                <span className="text-[10px] text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(p => !p)}
          className="absolute top-1/2 -translate-y-1/2 z-[1001] bg-white border border-border rounded-l-lg p-1.5 hover:bg-secondary transition-colors shadow-sm"
          style={{ right: sidebarOpen ? "380px" : 0 }}
        >
          {sidebarOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-[380px] border-l border-border/60 bg-white overflow-y-auto shrink-0">
            <div className="p-4 space-y-3">
              {selectedZone ? (
                <ZoneDetail zone={selectedZone} onClose={() => setSelectedZone(null)} />
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <Layers size={13} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">Zone Analysis</span>
                  </div>
                  <PriorityPanel selectedZone={selectedZone} onSelectZone={setSelectedZone} />
                  <div className="p-3 rounded-lg bg-secondary/40 text-center">
                    <p className="text-xs text-muted-foreground">
                      Select a zone on the map or ranking above
                    </p>
                  </div>
                </>
              )}
            </div>
          </aside>
        )}
      </div>

    </div>
  );
}
