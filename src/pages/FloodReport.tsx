import { useState } from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Droplets, MapPin, Calendar, Camera, AlertTriangle, ChevronLeft, Send, Upload, CloudRain, Waves, TreePine } from "lucide-react";
import floodImg from "@/assets/flooding-street.jpg";

const SEVERITY_LEVELS = [
  { label: "Minor", desc: "Puddles, minor road wetting", color: "border-geo-green/30 hover:border-geo-green bg-geo-green/3" },
  { label: "Moderate", desc: "Ankle-height, road slowdowns", color: "border-geo-amber/30 hover:border-geo-amber bg-geo-amber/3" },
  { label: "Severe", desc: "Knee-height, blocked roads", color: "border-destructive/30 hover:border-destructive bg-destructive/3" },
  { label: "Critical", desc: "Waist+, evacuations needed", color: "border-destructive/50 hover:border-destructive bg-destructive/5" },
];

const IMPACT_TYPES = ["Road blockage", "Property damage", "Health hazard", "Displacement", "Infrastructure damage", "Other"];
const FREQUENCY = ["First time", "Occasional", "Frequent (monthly)", "Very frequent (weekly+)"];

export default function FloodReport() {
  const [submitted, setSubmitted] = useState(false);
  const [severity, setSeverity] = useState("");

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-lg mx-auto py-20 px-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Droplets size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Report Submitted</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">Thank you for contributing to flood visibility in Guayaquil. Your report will be reviewed and added to the platform's analysis.</p>
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
          {/* Left: Context panel */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={floodImg} alt="Flooding in Guayaquil" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-xl font-bold text-white mb-1">Report a Flood</h1>
                <p className="text-white/70 text-xs leading-relaxed">Help make flooding visible. Every report strengthens the platform's analysis and priority scoring.</p>
              </div>
            </div>

            <div className="glass-panel p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Why your report matters</h3>
              <div className="space-y-2">
                {[
                  { icon: CloudRain, text: "Feeds real-time flood exposure analysis" },
                  { icon: Waves, text: "Helps identify blocked drainage systems" },
                  { icon: TreePine, text: "Connects flooding to missing ecological buffers" },
                  { icon: AlertTriangle, text: "Strengthens priority scoring for interventions" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <item.icon size={13} className="text-primary shrink-0" />
                    <span className="text-xs text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/report/ecological"
              className="glass-panel p-4 flex items-center gap-3 hover:shadow-md transition-shadow group block"
            >
              <div className="w-10 h-10 rounded-lg bg-geo-green/10 flex items-center justify-center shrink-0">
                <TreePine size={18} className="text-geo-green" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold group-hover:text-geo-green transition-colors">Submit Eco Observation Instead?</div>
                <div className="text-[10px] text-muted-foreground">Document mangroves, vegetation, and edge conditions</div>
              </div>
            </Link>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-3 space-y-5">
            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">What happened?</label>
              <input type="text" placeholder="e.g. Severe flooding after 2 hours of rain on main road..." className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">Where is it?</label>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-muted-foreground" />
                <input type="text" placeholder="Search for a place or address" className="flex-1 bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>
              <div className="h-44 bg-secondary/20 rounded-xl flex items-center justify-center border border-border/40 border-dashed">
                <span className="text-xs text-muted-foreground">Click on the map to set exact point</span>
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">How severe?</label>
              <div className="grid grid-cols-2 gap-2">
                {SEVERITY_LEVELS.map(s => (
                  <button
                    key={s.label}
                    onClick={() => setSeverity(s.label)}
                    className={`p-3 rounded-xl text-left border-2 transition-all ${
                      severity === s.label ? s.color.replace("hover:", "") + " ring-2 ring-primary/15" : "border-border/30 bg-white hover:bg-secondary/30"
                    }`}
                  >
                    <div className="text-sm font-semibold">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Water Height */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">
                  <Calendar size={11} className="inline mr-1" />When?
                </label>
                <input type="date" className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 transition-all" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">Water height</label>
                <input type="text" placeholder="e.g. 30cm, knee-height" className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 transition-all" />
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">How often does this happen?</label>
              <div className="flex flex-wrap gap-2">
                {FREQUENCY.map(f => (
                  <button key={f} className="px-3 py-2 text-xs font-medium rounded-xl bg-white hover:bg-secondary/50 border border-border/40 hover:border-primary/30 transition-all">
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Impact Type */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">What was affected?</label>
              <div className="flex flex-wrap gap-2">
                {IMPACT_TYPES.map(t => (
                  <button key={t} className="px-3 py-2 text-xs font-medium rounded-xl bg-white hover:bg-secondary/50 border border-border/40 hover:border-primary/30 transition-all">
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">Additional details</label>
              <textarea rows={3} placeholder="Describe what you observed — water source, duration, blocked drains, affected buildings..." className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-none" />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">
                <Camera size={11} className="inline mr-1" />Photo evidence
              </label>
              <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer bg-white">
                <Upload size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-medium">Drag & drop or click to upload</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">JPG, PNG up to 10MB · Photos strengthen your report</p>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={() => setSubmitted(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-destructive text-white rounded-xl text-sm font-bold hover:bg-destructive/90 transition-colors shadow-lg"
            >
              <Send size={15} />
              Submit Flood Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
