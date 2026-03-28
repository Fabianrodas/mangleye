import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Droplets, Calendar, Camera, AlertTriangle, ChevronLeft, Send, Upload, CloudRain, Waves, TreePine } from "lucide-react";
import floodImg from "@/assets/flooding-street.jpg";
import { zones } from "@/data/zones";
import { submitCitizenReport } from "@/api/mock-api";
import { toast } from "@/hooks/use-toast";
import ZoneLocationSelector, { getNearestPriorityZone, type LocationMode, type MapPoint } from "@/components/ZoneLocationSelector";

const SEVERITY_LEVELS = [
  { label: "Minor", desc: "Puddles, minor road wetting", color: "border-geo-green/30 hover:border-geo-green bg-geo-green/3" },
  { label: "Moderate", desc: "Ankle-height, road slowdowns", color: "border-geo-amber/30 hover:border-geo-amber bg-geo-amber/3" },
  { label: "Severe", desc: "Knee-height, blocked roads", color: "border-destructive/30 hover:border-destructive bg-destructive/3" },
  { label: "Critical", desc: "Waist+, evacuations needed", color: "border-destructive/50 hover:border-destructive bg-destructive/5" },
];

const IMPACT_TYPES = ["Road blockage", "Property damage", "Health hazard", "Displacement", "Infrastructure damage", "Other"];
const FREQUENCY = ["First time", "Occasional", "Frequent (monthly)", "Very frequent (weekly+)"];

type FloodFormState = {
  title: string;
  zoneId: string;
  severity: string;
  date: string;
  waterHeightCm: string;
  frequency: string;
  impacts: string[];
  details: string;
  photos: File[];
};

type FloodFormErrors = Partial<Record<keyof FloodFormState | "locationChoice", string>>;

const initialState: FloodFormState = {
  title: "",
  zoneId: "",
  severity: "",
  date: new Date().toISOString().slice(0, 10),
  waterHeightCm: "",
  frequency: "",
  impacts: [],
  details: "",
  photos: [],
};

const severityToApi: Record<string, "low" | "medium" | "high" | "critical"> = {
  Minor: "low",
  Moderate: "medium",
  Severe: "high",
  Critical: "critical",
};

function parseWaterHeight(value: string) {
  const cleaned = value.replace(/[^\d]/g, "");
  if (!cleaned) return null;
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function validateFloodForm(state: FloodFormState, locationMode: LocationMode, selectedPoint: MapPoint | null): FloodFormErrors {
  const nextErrors: FloodFormErrors = {};

  if (state.title.trim().length < 8) {
    nextErrors.title = "Please add a short title (min 8 characters).";
  }
  if (locationMode === "existing" && !state.zoneId) {
    nextErrors.zoneId = "Please select a zone.";
  }
  if (locationMode === "new" && !selectedPoint) {
    nextErrors.locationChoice = "Please select a location on the map.";
  }
  if (!state.severity) {
    nextErrors.severity = "Please choose a severity level.";
  }
  if (!state.date) {
    nextErrors.date = "Please select a date.";
  }
  if (!state.frequency) {
    nextErrors.frequency = "Please indicate how often this happens.";
  }
  if (state.impacts.length === 0) {
    nextErrors.impacts = "Select at least one impact type.";
  }
  if (state.details.trim().length < 12) {
    nextErrors.details = "Please provide more details (min 12 characters).";
  }

  return nextErrors;
}

export default function FloodReport() {
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FloodFormState>(initialState);
  const [errors, setErrors] = useState<FloodFormErrors>({});
  const [locationMode, setLocationMode] = useState<LocationMode>("existing");
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const updateField = <K extends keyof FloodFormState>(field: K, value: FloodFormState[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const toggleImpact = (impact: string) => {
    setForm(prev => {
      const exists = prev.impacts.includes(impact);
      const impacts = exists ? prev.impacts.filter(item => item !== impact) : [...prev.impacts, impact];
      return { ...prev, impacts };
    });
    setErrors(prev => ({ ...prev, impacts: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateFloodForm(form, locationMode, selectedPoint);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      toast({
        title: "Incomplete report",
        description: "Please complete the required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const nearestZone = selectedPoint ? getNearestPriorityZone(selectedPoint) : null;
      const resolvedZoneId = locationMode === "existing" ? form.zoneId : nearestZone?.id;

      if (!resolvedZoneId) {
        setErrors({ locationChoice: "Unable to resolve a zone from map selection." });
        toast({
          title: "Location not resolved",
          description: "Please select a point on the map again.",
          variant: "destructive",
        });
        return;
      }

      const selectedZone = zones.find(zone => zone.id === resolvedZoneId);
      const waterHeight = parseWaterHeight(form.waterHeightCm);
      const locationNote = locationMode === "existing"
        ? `Existing priority zone: ${selectedZone?.name ?? resolvedZoneId}`
        : `New map location: ${selectedPoint?.lat.toFixed(5)}, ${selectedPoint?.lng.toFixed(5)} (nearest priority zone: ${selectedZone?.name ?? resolvedZoneId})`;

      const report = await submitCitizenReport({
        type: "flood",
        zone_id: resolvedZoneId,
        severity: severityToApi[form.severity],
        description: [
          form.title.trim(),
          locationNote,
          `Frequency: ${form.frequency}`,
          `Impacts: ${form.impacts.join(", ")}`,
          form.details.trim(),
        ].join(" · "),
        water_height_cm: waterHeight,
        lat: selectedPoint?.lat,
        lng: selectedPoint?.lng,
        photo_count: form.photos.length,
      });

      setReportId(report.id);
      setSubmitted(true);
      setForm(initialState);
      setErrors({});
      setLocationMode("existing");
      setSelectedPoint(null);
      toast({
        title: "Report submitted",
        description: "Your flood report is now available in the platform data.",
      });
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoSelection = (files: FileList | null) => {
    if (!files) return;
    updateField("photos", Array.from(files));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-lg mx-auto py-20 px-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Droplets size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Report Submitted</h2>
          <p className="text-sm text-muted-foreground mb-2 max-w-sm mx-auto">Thank you for contributing to flood visibility in Guayaquil. Your report is now part of the prototype dataset.</p>
          <p className="text-xs font-mono text-primary mb-8">Tracking ID: {reportId}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setReportId("");
              }}
              className="px-5 py-2.5 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors font-medium"
            >
              Submit Another
            </button>
            <Link to="/community" className="px-5 py-2.5 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors font-medium">Community</Link>
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
          <form className="md:col-span-3 space-y-5" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">What happened?</label>
              <input
                type="text"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="e.g. Severe flooding after 2 hours of rain on main road..."
                className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
              />
              {errors.title && <p className="text-[11px] text-destructive mt-1">{errors.title}</p>}
            </div>

            {/* Location */}
            <div>
              <ZoneLocationSelector
                mode={locationMode}
                selectedZoneId={form.zoneId}
                selectedPoint={selectedPoint}
                onModeChange={(mode) => {
                  setLocationMode(mode);
                  setErrors(prev => ({ ...prev, zoneId: undefined, locationChoice: undefined }));
                }}
                onZoneChange={(zoneId) => updateField("zoneId", zoneId)}
                onPointChange={(point) => {
                  setSelectedPoint(point);
                  setErrors(prev => ({ ...prev, locationChoice: undefined }));
                }}
                error={errors.locationChoice || errors.zoneId}
                accentClassName="border-destructive/40 text-destructive"
              />
            </div>

            {/* Severity */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">How severe?</label>
              <div className="grid grid-cols-2 gap-2">
                {SEVERITY_LEVELS.map(s => (
                  <button
                    type="button"
                    key={s.label}
                    onClick={() => updateField("severity", s.label)}
                    className={`p-3 rounded-xl text-left border-2 transition-all ${form.severity === s.label ? s.color.replace("hover:", "") + " ring-2 ring-primary/15" : "border-border/30 bg-white hover:bg-secondary/30"
                      }`}
                  >
                    <div className="text-sm font-semibold">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.desc}</div>
                  </button>
                ))}
              </div>
              {errors.severity && <p className="text-[11px] text-destructive mt-1">{errors.severity}</p>}
            </div>

            {/* Date & Water Height */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">
                  <Calendar size={11} className="inline mr-1" />When?
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) => updateField("date", event.target.value)}
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 transition-all"
                />
                {errors.date && <p className="text-[11px] text-destructive mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">Water height</label>
                <input
                  type="text"
                  value={form.waterHeightCm}
                  onChange={(event) => updateField("waterHeightCm", event.target.value)}
                  placeholder="e.g. 30cm, knee-height"
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">How often does this happen?</label>
              <div className="flex flex-wrap gap-2">
                {FREQUENCY.map(f => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => updateField("frequency", f)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${form.frequency === f
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "bg-white hover:bg-secondary/50 border-border/40 hover:border-primary/30"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {errors.frequency && <p className="text-[11px] text-destructive mt-1">{errors.frequency}</p>}
            </div>

            {/* Impact Type */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">What was affected?</label>
              <div className="flex flex-wrap gap-2">
                {IMPACT_TYPES.map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleImpact(t)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${form.impacts.includes(t)
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "bg-white hover:bg-secondary/50 border-border/40 hover:border-primary/30"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.impacts && <p className="text-[11px] text-destructive mt-1">{errors.impacts}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">Additional details</label>
              <textarea
                rows={3}
                value={form.details}
                onChange={(event) => updateField("details", event.target.value)}
                placeholder="Describe what you observed — water source, duration, blocked drains, affected buildings..."
                className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-none"
              />
              {errors.details && <p className="text-[11px] text-destructive mt-1">{errors.details}</p>}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="text-xs font-semibold text-foreground mb-2 block">
                <Camera size={11} className="inline mr-1" />Photo evidence
              </label>
              <label className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer bg-white block">
                <Upload size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-medium">Drag & drop or click to upload</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">JPG, PNG up to 10MB · Photos strengthen your report</p>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  multiple
                  className="hidden"
                  onChange={(event) => handlePhotoSelection(event.target.files)}
                />
              </label>
              {form.photos.length > 0 && (
                <p className="text-[11px] text-muted-foreground mt-1">{form.photos.length} photo(s) selected</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-destructive text-white rounded-xl text-sm font-bold hover:bg-destructive/90 transition-colors shadow-lg"
            >
              <Send size={15} />
              {isSubmitting ? "Submitting..." : "Submit Flood Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
