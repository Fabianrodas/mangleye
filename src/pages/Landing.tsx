import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Droplets, Users, TreePine, Shield, ArrowRight, Zap, Building2, ChevronRight, Waves, Target, BrainCircuit } from "lucide-react";
import { zones } from "@/data/zones";
import Header from "@/components/Header";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Landing() {
  const topZones = [...zones].sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUp} className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap size={12} className="text-primary" />
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Urban Edge Intelligence Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Borde Vivo AI</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3">
              Urban Edge Intelligence for Flood Resilience
            </p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
              Identify where restoring ecological edges can reduce urban flooding in Guayaquil and Samborondón. 
              Combining citizen reports, ecological analysis, and AI-driven prioritization.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/map" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                Explore Map
              </Link>
              <Link to="/report/flood" className="px-6 py-2.5 bg-geo-red/15 text-geo-red border border-geo-red/25 rounded-lg text-sm font-semibold hover:bg-geo-red/25 transition-colors">
                Report a Flood
              </Link>
              <Link to="/report/ecological" className="px-6 py-2.5 bg-geo-green/15 text-geo-green border border-geo-green/25 rounded-lg text-sm font-semibold hover:bg-geo-green/25 transition-colors">
                Ecological Observation
              </Link>
              <Link to="/dashboard" className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                Priority Zones
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-6 bg-card/40">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">How It Works</h2>
            <p className="text-sm text-muted-foreground">From citizen reports to intelligent intervention plans</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Droplets, title: "Detect Flooding", desc: "Citizens report flooding events with precise location, severity, and photographic evidence." },
              { icon: Target, title: "Analyze Zones", desc: "The platform cross-references flood data, ecological conditions, population exposure, and permeability." },
              { icon: BrainCircuit, title: "AI Prioritization", desc: "An explainable scoring system ranks zones by urgency, opportunity, and intervention viability." },
              { icon: TreePine, title: "Guide Action", desc: "Each zone receives a tailored intervention recommendation — not always planting mangroves." },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-panel p-5 text-center">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mx-auto mb-3">
                  <step.icon size={18} className="text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Flooding Matters */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold mb-3">Why Flooding Matters in Guayaquil</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Guayaquil is one of the most flood-exposed cities in Latin America. Rapid urbanization, estuary degradation, and climate change intensify the problem. 
              Over 500,000 residents live in flood-prone areas, many in informal settlements with zero drainage infrastructure.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The city's natural estuary edges — once protective buffers — have been compressed, filled, or disconnected. 
              Restoring these edges intelligently can reduce flood exposure while creating ecological, social, and economic co-benefits.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "500K+", label: "Flood-exposed residents", color: "text-geo-red" },
              { value: "78%", label: "Surface sealing in critical zones", color: "text-geo-amber" },
              { value: "60%", label: "Mangrove edge loss in 20 years", color: "text-geo-amber" },
              { value: "6", label: "Priority intervention zones identified", color: "text-primary" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-panel-sm p-4 text-center">
                <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Not Every Solution is the Same */}
      <section className="py-16 px-6 bg-card/40">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Not Every Solution is the Same</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">The platform recommends different interventions based on local conditions — planting mangroves is not always the answer.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "Protect", desc: "Where functional mangrove areas exist, the priority is preservation and buffer enforcement.", color: "text-geo-green", bg: "bg-geo-green/10" },
              { icon: Droplets, title: "Restore Hydrology", desc: "Some zones need channel clearing and drainage rehabilitation before any planting can succeed.", color: "text-geo-blue", bg: "bg-geo-blue/10" },
              { icon: Building2, title: "Hybrid Infrastructure", desc: "Dense urban zones may require engineered green-blue solutions like rain gardens and permeable surfaces.", color: "text-geo-amber", bg: "bg-geo-amber/10" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-panel p-5">
                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center mb-3`}>
                  <item.icon size={16} className={item.color} />
                </div>
                <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-primary" />
              <h3 className="text-lg font-semibold">For Citizens</h3>
            </div>
            <ul className="space-y-2">
              {["Report flooding and see patterns emerge", "Understand why your neighborhood floods", "See what interventions could help", "Track municipality response and action", "Contribute to ecological observations"].map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ChevronRight size={12} className="text-primary mt-1 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={16} className="text-geo-amber" />
              <h3 className="text-lg font-semibold">For Municipality Teams</h3>
            </div>
            <ul className="space-y-2">
              {["Prioritize intervention investment with explainable scoring", "Coordinate across environmental, urban, and social agencies", "Access zone-level technical reports", "Monitor citizen reporting patterns", "Generate presentation-ready zone analyses"].map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ChevronRight size={12} className="text-geo-amber mt-1 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Priority Zone Previews */}
      <section className="py-16 px-6 bg-card/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Priority Zones</h2>
            <p className="text-sm text-muted-foreground">Top-ranked zones requiring immediate attention</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {topZones.map((zone, i) => (
              <motion.div key={zone.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to="/map" className="glass-panel p-4 block hover:border-primary/30 transition-colors group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{zone.name}</h3>
                      <span className="text-[10px] text-muted-foreground">{zone.zoneType}</span>
                    </div>
                    <span className={`font-mono text-lg font-bold ${zone.priorityScore >= 85 ? "text-geo-red" : zone.priorityScore >= 75 ? "text-geo-amber" : "text-geo-green"}`}>
                      {zone.priorityScore}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{zone.risk}</p>
                  <div className="flex flex-wrap gap-1">
                    {zone.badges.slice(0, 2).map(b => (
                      <span key={b} className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-primary/10 text-primary">{b}</span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/map" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              View all zones on map <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Story */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Waves size={24} className="text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">From Flooding to Resilience</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              When citizens in Urdesa reported flooding 47 times in a single rainy season, the pattern became impossible to ignore. 
              The Estero Salado's edge — once a thriving mangrove fringe — had been compressed to less than 40% of its original extent. 
              But the data also revealed an opportunity: with hydrological restoration and targeted replanting, 
              this stretch could absorb 60% more stormwater while creating a new public waterfront for 45,000 residents.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is what Borde Vivo AI does: it transforms scattered flood reports and ecological data into 
              actionable, zone-specific intelligence that both citizens and municipality teams can trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-6 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Explore?</h2>
          <p className="text-sm text-muted-foreground mb-6">Discover priority zones, report flooding events, and understand how your city can build resilience at the urban-ecological edge.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/map" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              Open Map Explorer
            </Link>
            <Link to="/methodology" className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
              Learn the Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-[10px] font-mono">BV</span>
            </div>
            <span className="text-sm font-semibold">Borde Vivo AI</span>
            <span className="text-xs text-muted-foreground">· Guayaquil & Samborondón</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/methodology" className="hover:text-foreground transition-colors">Methodology</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
