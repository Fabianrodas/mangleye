import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TreePine, Droplets, Building2, MapPin, Users, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto py-10 px-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-2">About Mangleye</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Urban edge intelligence for flood resilience in Guayaquil and Samborondón.
          </p>
        </motion.div>

        <div className="space-y-5">
          <div className="glass-panel p-5">
            <h2 className="text-sm font-bold mb-2">What is Mangleye?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A territorial intelligence platform that identifies where restoring ecological edges 
              can reduce urban flooding. It combines citizen reporting, geospatial analysis, and 
              AI-assisted interpretation for zone-specific intervention recommendations.
            </p>
          </div>

          <div className="glass-panel p-5">
            <h2 className="text-sm font-bold mb-3">Why Guayaquil needs this</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Droplets, label: "Recurring floods", desc: "Affecting hundreds of thousands annually", color: "text-geo-blue" },
                { icon: TreePine, label: "Mangrove loss", desc: "60%+ edge degradation in 20 years", color: "text-geo-green" },
                { icon: Building2, label: "Urban pressure", desc: "Rapid expansion over natural buffers", color: "text-geo-amber" },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-secondary/30 text-center">
                  <item.icon size={18} className={`${item.color} mx-auto mb-2`} />
                  <div className="text-xs font-semibold mb-0.5">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5">
            <h2 className="text-sm font-bold mb-3">How citizens participate</h2>
            <div className="space-y-2">
              {[
                { icon: Droplets, text: "Report flooding events with location, severity, and photos" },
                { icon: TreePine, text: "Submit ecological observations about mangrove and edge conditions" },
                { icon: MapPin, text: "Explore neighborhood risk profiles and recommended interventions" },
                { icon: Users, text: "Validate nearby reports and strengthen community data" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-secondary/20">
                  <item.icon size={14} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center py-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/map" className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
                Open Map <ArrowRight size={14} />
              </Link>
              <Link to="/methodology" className="px-5 py-2.5 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                Read Methodology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
