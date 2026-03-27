import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TreePine, Droplets, Users, Building2, MapPin, Waves, BrainCircuit, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-3">About Borde Vivo AI</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Urban Edge Intelligence for Flood Resilience in Guayaquil and Samborondón
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* What is it */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold mb-3">What Is Borde Vivo AI?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Borde Vivo AI is a territorial intelligence platform that identifies where restoring ecological edges 
              can reduce urban flooding in Guayaquil and Samborondón. It combines citizen reporting, geospatial analysis, 
              ecological opportunity assessment, and AI-assisted interpretation to produce explainable, 
              zone-specific intervention recommendations.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The platform is designed for everyday citizens, municipality teams, urban planners, environmental agencies, 
              community organizations, and academic teams — making complex territorial data accessible and actionable.
            </p>
          </div>

          {/* Why Guayaquil */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold mb-3">Why Guayaquil Needs This</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Guayaquil is one of the most flood-exposed cities in Latin America. The city sits at the confluence 
              of the Guayas River and the Pacific, surrounded by estuaries and mangrove systems that historically 
              provided natural flood protection. Decades of rapid urbanization have compressed, filled, or 
              disconnected these ecological edges, dramatically increasing flood vulnerability.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <Droplets size={20} className="text-geo-blue mx-auto mb-2" />
                <div className="text-xs font-semibold">Recurring Floods</div>
                <div className="text-[10px] text-muted-foreground mt-1">Affecting hundreds of thousands annually</div>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <TreePine size={20} className="text-geo-green mx-auto mb-2" />
                <div className="text-xs font-semibold">Mangrove Loss</div>
                <div className="text-[10px] text-muted-foreground mt-1">60%+ edge degradation in 20 years</div>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 text-center">
                <Building2 size={20} className="text-geo-amber mx-auto mb-2" />
                <div className="text-xs font-semibold">Urban Pressure</div>
                <div className="text-[10px] text-muted-foreground mt-1">Rapid expansion over natural buffers</div>
              </div>
            </div>
          </div>

          {/* Citizen participation */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold mb-3">How Citizens Can Participate</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-geo-red/10 flex items-center justify-center shrink-0">
                  <Droplets size={14} className="text-geo-red" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Report Flooding Events</div>
                  <div className="text-xs text-muted-foreground">Document flooding with location, severity, and photos. Every report strengthens the platform's analysis.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-geo-green/10 flex items-center justify-center shrink-0">
                  <TreePine size={14} className="text-geo-green" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Submit Ecological Observations</div>
                  <div className="text-xs text-muted-foreground">Document mangrove conditions, water edge changes, and restoration opportunities in your area.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Explore the Map</div>
                  <div className="text-xs text-muted-foreground">Learn about your neighborhood's risk profile, ecological opportunities, and recommended interventions.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Municipality collaboration */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold mb-3">Municipality Collaboration</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Borde Vivo AI is designed to support municipal decision-making, not replace it. The platform provides 
              zone-level technical reports, priority rankings, and AI-generated planning notes that can inform 
              inter-institutional coordination between environmental, urban planning, and social agencies.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every recommendation includes preconditions that must be validated in the field, ensuring that 
              the platform supports realistic, phased intervention planning rather than simplistic solutions.
            </p>
          </div>

          {/* What the prototype demonstrates */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold mb-3">What This Prototype Demonstrates</h2>
            <div className="space-y-2">
              {[
                "Map-first territorial intelligence with intuitive layer controls",
                "Explainable priority scoring with transparent factor breakdown",
                "Nuanced intervention logic — not always planting mangroves",
                "Native species guidance contextualized to Guayas ecology",
                "Permeability and surface sealing analysis for urban ground conditions",
                "Viability traffic light for strategic decision support",
                "Public participation flows for flood and ecological reporting",
                "AI-assisted interpretation of composite territorial analysis",
                "Municipality-ready zone reports and comparison views",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <ArrowRight size={12} className="text-primary mt-1 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <h2 className="text-xl font-bold mb-3">Start Exploring</h2>
            <p className="text-sm text-muted-foreground mb-6">Discover how urban edge intelligence can transform flood resilience in your city.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/map" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                Open Map Explorer
              </Link>
              <Link to="/methodology" className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                Read Methodology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
