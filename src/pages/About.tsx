import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TreePine, Droplets, Building2, MapPin, Users, ArrowRight, Leaf, Eye, Target, Waves, Shield } from "lucide-react";
import mangroveImg from "@/assets/mangrove-estuary.jpg";
import floodImg from "@/assets/flooding-street.jpg";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Editorial hero */}
      <div className="relative h-[220px] md:h-[280px] overflow-hidden">
        <img src={mangroveImg} alt="Mangrove ecosystem" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-6 w-full">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-2">
                <Eye size={14} className="text-white/50" />
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">About the Platform</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Mangleye</h1>
              <p className="text-sm text-white/60 max-w-md">Urban edge intelligence for flood resilience in Guayaquil and Samborondón.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-10 px-6">

        {/* What is Mangleye — editorial block */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              <h2 className="text-xl font-bold mb-3">What is Mangleye?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                A territorial intelligence platform that identifies where restoring ecological edges
                can reduce urban flooding. It combines citizen reporting, geospatial analysis, and
                AI-assisted interpretation for zone-specific intervention recommendations.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The platform serves municipal planners, environmental agencies, and engaged citizens
                by making flood risk and ecological opportunity visible, measurable, and actionable.
              </p>
            </div>
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={floodImg} alt="Urban flooding context" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Why Guayaquil needs this — large visual stats */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="mb-12">
          <h2 className="text-xl font-bold mb-5">Why Guayaquil needs this</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Droplets, label: "Recurring Floods", stat: "350K+", unit: "people affected annually", desc: "Low-lying neighborhoods suffer repeated inundation every rainy season", color: "geo-blue" },
              { icon: TreePine, label: "Mangrove Loss", stat: "60%+", unit: "edge degradation", desc: "Decades of urbanization have eliminated natural flood buffers", color: "geo-green" },
              { icon: Building2, label: "Urban Pressure", stat: "78%", unit: "surface sealing", desc: "Rapid expansion replaces permeable soils with impervious surfaces", color: "geo-amber" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className={`p-5 rounded-2xl border border-${item.color}/15 bg-gradient-to-b from-${item.color}/[0.04] to-transparent`}>
                <item.icon size={22} className={`text-${item.color} mb-3`} />
                <div className={`text-3xl font-extrabold text-${item.color} mb-0.5`}>{item.stat}</div>
                <div className="text-[10px] font-mono text-muted-foreground mb-2">{item.unit}</div>
                <div className="text-sm font-bold mb-1">{item.label}</div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How citizens participate — visual flow */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="mb-12">
          <h2 className="text-xl font-bold mb-5">How citizens participate</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: Droplets, title: "Report flooding", desc: "Submit flood events with location, severity, and photos to build the evidence base", step: "01" },
              { icon: TreePine, title: "Ecological observations", desc: "Document mangrove conditions, species presence, and edge degradation", step: "02" },
              { icon: MapPin, title: "Explore risk profiles", desc: "Navigate the map to understand neighborhood-level flood risk and opportunity", step: "03" },
              { icon: Users, title: "Validate reports", desc: "Confirm nearby reports to strengthen community data and priority scores", step: "04" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="relative p-5 rounded-xl border border-border/50 bg-card hover:shadow-md transition-shadow">
                <span className="text-2xl font-extrabold text-muted/15 absolute top-3 right-4">{item.step}</span>
                <item.icon size={20} className="text-primary mb-3" />
                <div className="text-sm font-bold mb-1">{item.title}</div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/map" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
            Open Map <ArrowRight size={14} />
          </Link>
          <Link to="/methodology" className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
            Read Methodology
          </Link>
        </div>
      </div>
    </div>
  );
}
