import { useState } from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { TreePine, MapPin, ChevronLeft, Send, Upload, Eye } from "lucide-react";

const OBS_TYPES = ["Mangrove presence", "Mangrove degradation", "Mangrove absence but suitable", "Water edge change", "Wildlife sighting", "Waste/contamination", "Other"];
const MANGROVE_STATUS = ["Present and healthy", "Present but degraded", "Absent but potentially suitable", "Unknown"];

export default function EcoObservation() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-lg mx-auto py-20 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-geo-green/15 flex items-center justify-center mx-auto mb-4">
            <TreePine size={28} className="text-geo-green" />
          </div>
          <h2 className="text-xl font-bold mb-2">Observation Submitted</h2>
          <p className="text-sm text-muted-foreground mb-6">Thank you for your ecological observation. It helps build a clearer picture of edge conditions across the city.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setSubmitted(false)} className="px-4 py-2 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">Submit Another</button>
            <Link to="/map" className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">View Map</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto py-8 px-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ChevronLeft size={14} /> Back
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-geo-green/15 flex items-center justify-center">
            <TreePine size={20} className="text-geo-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Ecological Observation</h1>
            <p className="text-xs text-muted-foreground">Document mangrove and edge conditions to help prioritize restoration zones.</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Location */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Location</label>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} className="text-muted-foreground" />
              <input type="text" placeholder="Search or describe the location" className="flex-1 bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors" />
            </div>
            <div className="h-40 bg-secondary/30 rounded-lg flex items-center justify-center border border-border/30">
              <span className="text-xs text-muted-foreground">Click on map to set observation point</span>
            </div>
          </div>

          {/* Observation Type */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Observation Type</label>
            <div className="flex flex-wrap gap-1.5">
              {OBS_TYPES.map(t => (
                <button key={t} className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary/50 hover:bg-secondary border border-border/30 hover:border-border transition-colors">
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Mangrove Status */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Mangrove Status</label>
            <div className="flex flex-wrap gap-1.5">
              {MANGROVE_STATUS.map(s => (
                <button key={s} className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary/50 hover:bg-secondary border border-border/30 hover:border-border transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Water Body */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Nearby Estuary or Water Body</label>
            <input type="text" placeholder="e.g. Estero Salado, unnamed canal..." className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors" />
          </div>

          {/* Notes */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Notes</label>
            <textarea rows={3} placeholder="Describe what you observed. Any details about vegetation, water, wildlife, or land use..." className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors resize-none" />
          </div>

          {/* Restoration Opportunity */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              <Eye size={10} className="inline mr-1" />Perceived Restoration Opportunity
            </label>
            <textarea rows={2} placeholder="Do you think this area could benefit from restoration? Why?" className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors resize-none" />
          </div>

          {/* Photo */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Photo</label>
            <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
              <Upload size={20} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Drag & drop or click to upload</p>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-geo-green text-primary-foreground rounded-lg text-sm font-semibold hover:bg-geo-green/90 transition-colors"
          >
            <Send size={14} />
            Submit Observation
          </button>
        </div>
      </div>
    </div>
  );
}
