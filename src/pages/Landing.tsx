import Header from "@/components/Header";
import HeroSection from "@/components/landing/HeroSection";
import BeforeAfterSection from "@/components/landing/BeforeAfterIsometric";
import WhatThisAreaLost from "@/components/landing/AreaLostSection";
import WaterFlowStory from "@/components/landing/WaterFlowDiagram";
import SystemDecision from "@/components/landing/SystemDecision";
import CitizenPipeline from "@/components/landing/CitizenPipeline";
import MapPreviewSection from "@/components/landing/MapPreviewSection";
import FeaturedZonesSection from "@/components/landing/FeaturedZonesSection";
import { Link } from "react-router-dom";
import { Leaf, AlertTriangle, Map } from "lucide-react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <BeforeAfterSection />
      </motion.div>
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <WhatThisAreaLost />
      </motion.div>
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <WaterFlowStory />
      </motion.div>
      <SystemDecision />
      <CitizenPipeline />
      <MapPreviewSection />
      <FeaturedZonesSection />

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">From hidden risk to visible action</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Every flood report strengthens the platform. Every observation makes the invisible visible.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/report/flood"
              className="px-8 py-3.5 bg-destructive text-white rounded-lg text-sm font-bold hover:bg-destructive/90 transition-all shadow-lg flex items-center gap-2"
            >
              <AlertTriangle size={16} />
              Report Flooding
            </Link>
            <Link
              to="/map"
              className="px-8 py-3.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg flex items-center gap-2"
            >
              <Map size={16} />
              Explore Live Map
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-border/40 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <Leaf size={10} className="text-white" />
            </div>
            <span className="text-sm font-bold">Mangleye</span>
            <span className="text-xs text-muted-foreground">· Guayaquil & Samborondón</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/methodology" className="hover:text-foreground transition-colors">Methodology</Link>
            <Link to="/community" className="hover:text-foreground transition-colors">Community</Link>
            <Link to="/zones" className="hover:text-foreground transition-colors">Priority Zones</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
