import Header from "@/components/Header";
import HeroSection from "@/components/landing/HeroSection";
import BeforeAfterIsometric from "@/components/landing/BeforeAfterIsometric";
import AreaLostSection from "@/components/landing/AreaLostSection";
import WaterFlowDiagram from "@/components/landing/WaterFlowDiagram";
import SystemDecision from "@/components/landing/SystemDecision";
import CitizenPipeline from "@/components/landing/CitizenPipeline";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BeforeAfterIsometric />
      <AreaLostSection />
      <WaterFlowDiagram />
      <SystemDecision />
      <CitizenPipeline />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
              <Leaf size={12} className="text-primary" />
            </div>
            <span className="text-sm font-semibold">Mangleye</span>
            <span className="text-xs text-muted-foreground">· Guayaquil & Samborondón</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">Acerca de</Link>
            <Link to="/methodology" className="hover:text-foreground transition-colors">Metodología</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
