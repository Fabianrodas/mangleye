import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TreePine, Droplets, Shield, AlertTriangle, CheckCircle, ChevronDown, ArrowRight, Waves, Building2, Target, Leaf, Ban, Zap, Eye } from "lucide-react";
import { useState } from "react";
import mangroveImg from "@/assets/mangrove-estuary.jpg";
import floodImg from "@/assets/flooding-street.jpg";
import heroImg from "@/assets/hero-aerial.jpg";

const faqs = [
  { q: "Why does Guayaquil flood so often?", a: "Guayaquil sits at the confluence of estuaries and tidal zones. Decades of urbanization eliminated natural drainage buffers — mangroves, wetlands, and permeable soils — causing water to pool instead of absorb." },
  { q: "What are ecological edges?", a: "The interface between urban areas and natural water systems (estuaries, rivers, canals). Healthy edges absorb water, filter pollutants, and protect against tidal surges." },
  { q: "How does Mangleye prioritize zones?", a: "Each zone receives a 0-100 score based on flood vulnerability, population exposure, ecological degradation, restoration suitability, and expected benefit." },
  { q: "Are mangroves always the solution?", a: "No. Some zones need hydrological restoration, hybrid infrastructure, or revegetation with other native species. Mangleye recommends the most suitable intervention per zone." },
  { q: "How do citizen reports help?", a: "Every report adds data that satellite imagery cannot capture — street-level flooding evidence, real-time conditions, and community-validated severity." },
  { q: "What happens after a report?", a: "Reports are geolocated, validated by nearby citizens, and integrated into the platform's analysis engine. High-activity zones generate stronger priority scores." },
];

const whenNot = [
  { icon: Building2, title: "Dense urban cores", desc: "Root systems can't establish. Hybrid green-blue infrastructure works better." },
  { icon: Ban, title: "Toxic waterways", desc: "Remediation must happen before any planting can succeed." },
  { icon: Waves, title: "High-energy wave zones", desc: "Hard coastal defense may be needed before ecological solutions." },
  { icon: Target, title: "Uncertain hydrology", desc: "Monitoring and validation must precede any intervention." },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Learn() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero editorial banner */}
      <div className="relative h-[280px] md:h-[340px] overflow-hidden">
        <img src={heroImg} alt="Guayaquil aerial" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-3">
                <Eye size={14} className="text-white/60" />
                <span className="text-[11px] font-mono text-white/60 uppercase tracking-widest">Understanding the Problem</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 max-w-lg leading-tight">
                Why Guayaquil floods — and what we can do
              </h1>
              <p className="text-sm text-white/70 max-w-md leading-relaxed">
                Decades of urban expansion destroyed natural flood buffers. Mangleye maps where ecological restoration can reduce risk.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-10 px-6">

        {/* Two-column editorial intro */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6 mb-14">
          <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
            <img src={floodImg} alt="Flooding in Guayaquil streets" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <Droplets size={13} className="text-geo-blue" />
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">The Problem</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Lost natural buffers</h3>
              <p className="text-xs text-white/60 leading-relaxed">Urban growth replaced mangroves, wetlands, and permeable soils — leaving communities exposed to recurring floods.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
            <img src={mangroveImg} alt="Mangrove restoration potential" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <TreePine size={13} className="text-geo-green" />
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">The Opportunity</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Restorable ecological edges</h3>
              <p className="text-xs text-white/60 leading-relaxed">Restoring ecological edges can reduce flood impact, improve water quality, and build climate-resilient corridors.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Why mangroves help — visual grid */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-geo-green/10 flex items-center justify-center">
              <TreePine size={20} className="text-geo-green" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Why mangroves help</h2>
              <p className="text-xs text-muted-foreground">Nature's most effective coastal defense system</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Shield, label: "Flood buffer", desc: "Root systems absorb wave energy and slow tidal surges before they reach urban areas", stat: "66%", unit: "wave reduction" },
              { icon: Droplets, label: "Water filtration", desc: "Natural filtration removes pollutants, sediment, and nitrogen from urban runoff", stat: "80%", unit: "sediment capture" },
              { icon: Leaf, label: "Carbon storage", desc: "Mangroves store up to 10x more carbon per hectare than terrestrial forests", stat: "10×", unit: "vs forests" },
              { icon: Waves, label: "Erosion control", desc: "Root networks stabilize shorelines and prevent irreversible coastal land loss", stat: "70%", unit: "erosion reduction" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="p-5 rounded-xl bg-gradient-to-b from-geo-green/5 to-geo-green/[0.02] border border-geo-green/15 hover:border-geo-green/30 transition-colors group">
                <item.icon size={22} className="text-geo-green mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-extrabold text-geo-green mb-0.5">{item.stat}</div>
                <div className="text-[10px] font-mono text-muted-foreground mb-2">{item.unit}</div>
                <div className="text-sm font-semibold mb-1">{item.label}</div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* When NOT mangroves — editorial warning block */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
          <div className="rounded-2xl border-2 border-geo-amber/20 bg-gradient-to-br from-geo-amber/[0.04] to-transparent p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-geo-amber/10 flex items-center justify-center">
                <AlertTriangle size={20} className="text-geo-amber" />
              </div>
              <div>
                <h2 className="text-xl font-bold">When mangroves are NOT the answer</h2>
                <p className="text-xs text-muted-foreground">Not every zone benefits from planting — context determines the intervention</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {whenNot.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-start gap-3 p-4 rounded-xl bg-white/80 border border-geo-amber/10">
                  <div className="w-9 h-9 rounded-lg bg-geo-amber/10 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-geo-amber" />
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-0.5">{item.title}</div>
                    <div className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* How the system works — visual pipeline */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Zap size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">How Mangleye works</h2>
              <p className="text-xs text-muted-foreground">From citizen report to priority intervention</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "01", title: "Report", desc: "Citizens report flooding events and ecological conditions with photos and geolocation", icon: Droplets, color: "geo-blue" },
              { step: "02", title: "Analyze", desc: "Platform combines citizen data, satellite imagery, and environmental models to assess risk", icon: Target, color: "primary" },
              { step: "03", title: "Recommend", desc: "AI generates zone-specific intervention plans with transparent scoring and evidence", icon: Zap, color: "geo-green" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="relative p-5 rounded-xl border border-border/60 bg-card hover:shadow-md transition-shadow">
                <span className="text-3xl font-extrabold text-muted/20 absolute top-3 right-4">{item.step}</span>
                <item.icon size={22} className={`text-${item.color} mb-3`} />
                <div className="text-base font-bold mb-1">{item.title}</div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ — cleaner accordion */}
        <div className="mb-14">
          <h2 className="text-xl font-bold mb-5">Frequently Asked Questions</h2>
          <div className="space-y-1.5">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full text-left rounded-xl border border-border/50 bg-card p-4 hover:border-border transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{faq.q}</span>
                  <ChevronDown size={14} className={`text-muted-foreground shrink-0 transition-transform duration-200 ${expandedFaq === i ? "rotate-180" : ""}`} />
                </div>
                {expandedFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-muted-foreground mt-3 leading-relaxed border-t border-border/30 pt-3"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Deep links */}
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          <Link to="/methodology" className="p-5 rounded-xl border border-border/50 bg-card flex items-center gap-4 hover:shadow-md hover:border-primary/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors">
              <Target size={22} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold group-hover:text-primary transition-colors">Methodology</div>
              <div className="text-[11px] text-muted-foreground">How Mangleye analyzes and scores priority zones</div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <Link to="/about" className="p-5 rounded-xl border border-border/50 bg-card flex items-center gap-4 hover:shadow-md hover:border-primary/20 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors">
              <Leaf size={22} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold group-hover:text-primary transition-colors">About Mangleye</div>
              <div className="text-[11px] text-muted-foreground">The platform, its goals, and how citizens participate</div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
