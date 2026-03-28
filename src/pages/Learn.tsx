import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TreePine, Droplets, Shield, AlertTriangle, CheckCircle, ChevronDown, ArrowRight, Waves, Building2, Target, Leaf, Ban } from "lucide-react";
import { useState } from "react";
import mangroveImg from "@/assets/mangrove-estuary.jpg";
import floodImg from "@/assets/flooding-street.jpg";

const faqs = [
  { q: "Why does Guayaquil flood so often?", a: "Guayaquil sits at the confluence of estuaries and tidal zones. Decades of urbanization have eliminated natural drainage buffers — mangroves, wetlands, and permeable soils — causing water to pool instead of absorb." },
  { q: "What are ecological edges?", a: "The interface between urban areas and natural water systems (estuaries, rivers, canals). When healthy, these edges absorb water, filter pollutants, and protect against tidal surges." },
  { q: "How does Mangleye prioritize zones?", a: "Each zone receives a 0-100 score based on flood vulnerability, population exposure, ecological degradation, restoration suitability, and expected benefit. Higher scores mean more urgent intervention." },
  { q: "Are mangroves always the solution?", a: "No. Some zones need hydrological restoration, hybrid infrastructure, or revegetation with other native species. Mangleye recommends the most suitable intervention for each specific zone." },
  { q: "How do citizen reports help?", a: "Every report adds data that satellite imagery alone cannot capture — street-level flooding evidence, real-time conditions, and community-validated severity assessments." },
  { q: "What happens after a report is submitted?", a: "Reports are geolocated, validated by other citizens, and integrated into the platform's analysis. High-activity zones generate stronger priority scores." },
];

const whenNot = [
  { icon: Building2, text: "Dense urban areas where root systems cannot establish", reason: "Hybrid green-blue infrastructure is more appropriate" },
  { icon: Ban, text: "Heavily polluted waterways with toxic sediment", reason: "Remediation must happen before planting" },
  { icon: Waves, text: "High-energy wave exposure zones", reason: "Hard coastal defense may be needed first" },
  { icon: Target, text: "Areas with uncertain hydrology", reason: "Monitor and validate conditions before intervening" },
];

export default function Learn() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-5xl mx-auto py-8 px-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-2xl font-bold mb-2">Learn</h1>
          <p className="text-sm text-muted-foreground max-w-lg">
            Understand why Guayaquil floods, how ecological edges protect cities, and what Mangleye does about it.
          </p>
        </motion.div>

        {/* Visual intro cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
            <img src={floodImg} alt="Flooding in Guayaquil" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold mb-1">The Problem</h3>
              <p className="text-white/70 text-xs leading-relaxed">Urban expansion destroyed natural flood buffers, leaving communities vulnerable to recurring inundation.</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
            <img src={mangroveImg} alt="Mangrove restoration" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold mb-1">The Opportunity</h3>
              <p className="text-white/70 text-xs leading-relaxed">Restoring ecological edges can reduce flood impact, improve water quality, and create resilient green corridors.</p>
            </div>
          </div>
        </div>

        {/* Why mangroves help */}
        <div className="glass-panel p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-geo-green/10 flex items-center justify-center">
              <TreePine size={18} className="text-geo-green" />
            </div>
            <h2 className="text-lg font-bold">Why mangroves help</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { icon: Shield, label: "Flood buffer", desc: "Root systems absorb wave energy and slow tidal surges" },
              { icon: Droplets, label: "Water filtration", desc: "Natural filtration removes pollutants from runoff" },
              { icon: Leaf, label: "Carbon storage", desc: "Mangroves store up to 10x more carbon than forests" },
              { icon: Waves, label: "Erosion control", desc: "Root networks stabilize shorelines and prevent land loss" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-geo-green/3 border border-geo-green/15 text-center">
                <item.icon size={20} className="text-geo-green mx-auto mb-2" />
                <div className="text-sm font-semibold mb-1">{item.label}</div>
                <div className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* When NOT mangroves */}
        <div className="glass-panel p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-geo-amber/10 flex items-center justify-center">
              <AlertTriangle size={18} className="text-geo-amber" />
            </div>
            <h2 className="text-lg font-bold">When mangroves are NOT the answer</h2>
          </div>
          <div className="space-y-2">
            {whenNot.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-geo-amber/3 border border-geo-amber/10">
                <item.icon size={16} className="text-geo-amber shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">{item.text}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{item.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full text-left glass-panel p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{faq.q}</span>
                  <ChevronDown size={14} className={`text-muted-foreground shrink-0 transition-transform ${expandedFaq === i ? "rotate-180" : ""}`} />
                </div>
                {expandedFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-muted-foreground mt-2 leading-relaxed"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Deep links */}
        <div className="grid md:grid-cols-2 gap-3">
          <Link to="/methodology" className="glass-panel p-5 flex items-center gap-3 hover:shadow-md transition-shadow group">
            <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
              <Target size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold group-hover:text-primary transition-colors">Methodology</div>
              <div className="text-[10px] text-muted-foreground">How Mangleye analyzes and scores priority zones</div>
            </div>
            <ArrowRight size={14} className="text-muted-foreground" />
          </Link>
          <Link to="/about" className="glass-panel p-5 flex items-center gap-3 hover:shadow-md transition-shadow group">
            <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
              <Leaf size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold group-hover:text-primary transition-colors">About Mangleye</div>
              <div className="text-[10px] text-muted-foreground">The platform, its goals, and how citizens participate</div>
            </div>
            <ArrowRight size={14} className="text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
}
