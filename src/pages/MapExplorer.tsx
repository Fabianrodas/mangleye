import { useState, useCallback } from "react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import LayerFilters from "@/components/LayerFilters";
import PriorityPanel from "@/components/PriorityPanel";
import ZoneDetail from "@/components/ZoneDetail";
import { type Zone, type LayerType } from "@/data/zones";
import { Layers, ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function MapExplorer() {
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

          {/* Search bar overlay */}
          <div className="absolute top-3 left-3 z-[1000]">
            <div className="glass-panel px-3 py-2 flex items-center gap-2 w-[280px]">
              <Search size={14} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search zones, sectors..."
                className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Layer filters */}
          <div className="absolute top-14 left-3 z-[1000]">
            <LayerFilters activeLayers={activeLayers} onToggle={toggleLayer} />
          </div>

          {/* Mini metrics */}
          <div className="absolute bottom-4 left-3 z-[1000] flex gap-2">
            {[
              { label: "Zones", value: "6" },
              { label: "Flood Reports", value: "127" },
              { label: "Eco Obs.", value: "43" },
            ].map(m => (
              <div key={m.label} className="glass-panel px-2.5 py-1.5 flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{m.label}</span>
                <span className="text-xs font-mono font-bold text-foreground">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(p => !p)}
          className="absolute top-1/2 -translate-y-1/2 z-[1001] bg-card/90 backdrop-blur-lg border border-border/50 rounded-l-lg p-1.5 hover:bg-secondary transition-colors"
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
                      Select a zone on the map or in the ranking to view detailed analysis
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
