import { useState } from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Droplets, MapPin, Calendar, Camera, AlertTriangle, ChevronLeft, Send, Upload } from "lucide-react";

const SEVERITY_LEVELS = ["Minor", "Moderate", "Severe", "Critical"];
const IMPACT_TYPES = ["Road blockage", "Property damage", "Health hazard", "Displacement", "Infrastructure damage", "Other"];
const FREQUENCY = ["First time", "Occasional", "Frequent (monthly)", "Very frequent (weekly+)"];

export default function FloodReport() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-lg mx-auto py-20 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
            <Droplets size={28} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Report Submitted</h2>
          <p className="text-sm text-muted-foreground mb-6">Thank you for contributing to flood visibility in Guayaquil. Your report will be reviewed and added to the platform's analysis.</p>
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
          <div className="w-10 h-10 rounded-lg bg-geo-red/15 flex items-center justify-center">
            <Droplets size={20} className="text-geo-red" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Report a Flood</h1>
            <p className="text-xs text-muted-foreground">Help make flooding visible. Every report strengthens the platform's analysis.</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Title</label>
            <input type="text" placeholder="Brief description of the flood event" className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors" />
          </div>

          {/* Location */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Location</label>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} className="text-muted-foreground" />
              <input type="text" placeholder="Search for a place or address" className="flex-1 bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors" />
            </div>
            <div className="h-40 bg-secondary/30 rounded-lg flex items-center justify-center border border-border/30">
              <span className="text-xs text-muted-foreground">Click on the map to set exact point</span>
            </div>
          </div>

          {/* Date & Severity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel-sm p-4">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                <Calendar size={10} className="inline mr-1" />Date
              </label>
              <input type="date" className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors" />
            </div>
            <div className="glass-panel-sm p-4">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                <AlertTriangle size={10} className="inline mr-1" />Severity
              </label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {SEVERITY_LEVELS.map(s => (
                  <button key={s} className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary/50 hover:bg-secondary border border-border/30 hover:border-border transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Water Height & Frequency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel-sm p-4">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Est. Water Height</label>
              <input type="text" placeholder="e.g. 30cm, knee-height" className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors" />
            </div>
            <div className="glass-panel-sm p-4">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Flood Frequency</label>
              <select className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors">
                <option value="">Select...</option>
                {FREQUENCY.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          {/* Impact Type */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Impact Type</label>
            <div className="flex flex-wrap gap-1.5">
              {IMPACT_TYPES.map(t => (
                <button key={t} className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary/50 hover:bg-secondary border border-border/30 hover:border-border transition-colors">
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Description</label>
            <textarea rows={3} placeholder="What happened? Describe what you observed..." className="w-full bg-secondary/50 rounded-lg px-3 py-2 text-sm outline-none border border-border/30 focus:border-primary/50 transition-colors resize-none" />
          </div>

          {/* Image Upload */}
          <div className="glass-panel-sm p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
              <Camera size={10} className="inline mr-1" />Photo Evidence
            </label>
            <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
              <Upload size={20} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Drag & drop or click to upload</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">JPG, PNG up to 10MB</p>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={() => setSubmitted(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Send size={14} />
            Submit Flood Report
          </button>
        </div>
      </div>
    </div>
  );
}
