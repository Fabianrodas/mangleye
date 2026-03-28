import { useState } from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { TreePine, MapPin, ChevronLeft, Send, Upload, Eye, Droplets, AlertTriangle, Leaf, Waves } from "lucide-react";
import mangroveImg from "@/assets/mangrove-estuary.jpg";

const OBS_TYPES = [
  { label: "Mangrove presence", icon: "🌿" },
  { label: "Mangrove degradation", icon: "⚠️" },
  { label: "Suitable but absent", icon: "📍" },
  { label: "Water edge change", icon: "🌊" },
  { label: "Wildlife sighting", icon: "🦀" },
  { label: "Waste/contamination", icon: "🗑️" },
];

const MANGROVE_STATUS = [
  { label: "Present and healthy", color: "border-geo-green/30 bg-geo-green/3" },
  { label: "Present but degraded", color: "border-geo-amber/30 bg-geo-amber/3" },
  { label: "Absent but potentially suitable", color: "border-geo-blue/30 bg-geo-blue/3" },
  { label: "Unknown", color: "border-border/40 bg-white" },
];

export default function EcoObservation() {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-lg mx-auto py-20 px-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-geo-green/10 flex items-center justify-center mx-auto mb-5">
            <TreePine size={32} className="text-geo-green" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Observation Submitted</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">Thank you for your ecological observation. It helps build a clearer picture of edge conditions across the city.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setSubmitted(false)} className="px-5 py-2.5 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors font-medium">Submit Another</button>
            <Link to="/map" className="px-5 py-2.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">View Map</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-5xl mx-auto py-8 px-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ChevronLeft size={14} /> Back
        </Link>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Context */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={mangroveImg} alt="Mangrove estuary" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-xl font-bold text-white mb-1">Ecological Observation</h1>
                <p className="text-white/70 text-xs leading-relaxed">Document mangrove and edge conditions to help prioritize restoration zones.</p>
              </div>
            </div>

            <div className="glass-panel p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">What you can document</h3>
              <div className="space-y-2">
                {[
                  { icon: Leaf, text: "Vegetation presence, density, and health" },
                  { icon: Waves, text: "Water edge conditions and changes" },
                  { icon: Eye, text: "Signs of degradation or recovery" },
                  { icon: Droplets, text: "Relationships between ecology and flooding" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <item.icon size={13} className="text-geo-green shrink-0" />
                    <span className="text-xs text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/report/flood"
              className="glass-panel p-4 flex items-center gap-3 hover:shadow-md transition-shadow group block"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/8 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} className="text-destructive" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold group-hover:text-destructive transition-colors">Report Flooding Instead?</div>
                <div className="text-[10px] text-muted-foreground">Document flooding events with severity and location</div>
              </div>
            </Link>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-3 space-y-5">
            {/* Location */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">Where is this observation?</label>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-muted-foreground" />
                <input type="text" placeholder="Search or describe the location" className="flex-1 bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-geo-green/50 focus:ring-2 focus:ring-geo-green/10 transition-all" />
              </div>
              <div className="h-44 bg-secondary/20 rounded-xl flex items-center justify-center border border-border/40 border-dashed">
                <span className="text-xs text-muted-foreground">Click on map to set observation point</span>
              </div>
            </div>

            {/* Observation Type */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">What did you observe?</label>
              <div className="grid grid-cols-2 gap-2">
                {OBS_TYPES.map(t => (
                  <button key={t.label} className="px-3 py-2.5 text-left rounded-xl bg-white hover:bg-geo-green/3 border border-border/40 hover:border-geo-green/30 transition-all flex items-center gap-2">
                    <span className="text-sm">{t.icon}</span>
                    <span className="text-xs font-medium">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mangrove Status */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">Mangrove condition at this location</label>
              <div className="grid grid-cols-2 gap-2">
                {MANGROVE_STATUS.map(s => (
                  <button
                    key={s.label}
                    onClick={() => setStatus(s.label)}
                    className={`p-3 rounded-xl text-left border-2 transition-all ${
                      status === s.label ? s.color + " ring-2 ring-geo-green/15" : "border-border/30 bg-white hover:bg-secondary/30"
                    }`}
                  >
                    <div className="text-xs font-medium">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Water Body */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">Nearby water body</label>
              <input type="text" placeholder="e.g. Estero Salado, unnamed canal..." className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-geo-green/50 transition-all" />
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">Observation details</label>
              <textarea rows={3} placeholder="Describe what you observed. Any details about vegetation, water, wildlife, or land use..." className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-geo-green/50 focus:ring-2 focus:ring-geo-green/10 transition-all resize-none" />
            </div>

            {/* Restoration Opportunity */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">
                <Eye size={11} className="inline mr-1" />Restoration potential?
              </label>
              <textarea rows={2} placeholder="Do you think this area could benefit from restoration? Why?" className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-geo-green/50 transition-all resize-none" />
            </div>

            {/* Photo */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">Photo evidence</label>
              <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-geo-green/30 transition-colors cursor-pointer bg-white">
                <Upload size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-medium">Drag & drop or click to upload</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">JPG, PNG up to 10MB</p>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-geo-green text-white rounded-xl text-sm font-bold hover:bg-geo-green/90 transition-colors shadow-lg"
            >
              <Send size={15} />
              Submit Observation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
