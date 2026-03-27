import { useState, useCallback } from "react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import LayerFilters from "@/components/LayerFilters";
import PriorityPanel from "@/components/PriorityPanel";
import ZoneDetail from "@/components/ZoneDetail";
import { type Zone, type LayerType } from "@/data/zones";
import { Layers, ChevronLeft, ChevronRight, AlertTriangle, TreePine } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [activeLayers, setActiveLayers] = useState<LayerType[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          {/* Layer filters overlay */}
          <div className="absolute top-3 left-3 right-3 z-[1000] pointer-events-none">
            <div className="pointer-events-auto inline-block">
              <LayerFilters activeLayers={activeLayers} onToggle={toggleLayer} />
            </div>
          </div>

          {/* Map quick actions */}
          <div className="absolute bottom-4 left-4 z-[1000] flex gap-2">
            <Link
              to="/report/flood"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-destructive text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-destructive/90 transition-colors"
            >
              <AlertTriangle size={14} />
              Report Flood
            </Link>
            <Link
              to="/report/ecological"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-geo-green text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-geo-green/90 transition-colors"
            >
              <TreePine size={14} />
              Observation
            </Link>
          </div>
        </div>

        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(p => !p)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-[1001] bg-card/90 backdrop-blur-lg border border-border/50 rounded-l-lg p-1.5 hover:bg-secondary transition-colors"
          style={{ right: sidebarOpen ? "380px" : 0 }}
        >
          {sidebarOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-[380px] border-l border-border/50 bg-card/60 backdrop-blur-xl overflow-y-auto shrink-0">
            <div className="p-4 space-y-4">
              {selectedZone ? (
                <ZoneDetail zone={selectedZone} onClose={() => setSelectedZone(null)} />
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <Layers size={14} className="text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Analysis Panel
                    </span>
                  </div>
                  <PriorityPanel selectedZone={selectedZone} onSelectZone={setSelectedZone} />
                  <div className="glass-panel-sm p-3 text-center">
                    <p className="text-xs text-muted-foreground">
                      Select a zone on the map or ranking to see detailed analysis
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
