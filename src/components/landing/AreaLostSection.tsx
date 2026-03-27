import { motion } from "framer-motion";
import { AlertTriangle, Camera, TreePine, CheckCircle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: AlertTriangle,
    title: "Report flooding",
    desc: "Document flooding with location, severity, and photos. Every report strengthens the analysis.",
    color: "text-destructive",
    bg: "bg-destructive/8",
    link: "/report/flood",
    cta: "Report now",
  },
  {
    icon: Camera,
    title: "Upload evidence",
    desc: "Add photo documentation to existing reports or new observations. Visual proof accelerates response.",
    color: "text-geo-blue",
    bg: "bg-geo-blue/8",
    link: "/report/flood",
    cta: "Add photos",
  },
  {
    icon: TreePine,
    title: "Add ecological observation",
    desc: "Document mangrove conditions, water edges, and wildlife sightings to build the ecological baseline.",
    color: "text-geo-green",
    bg: "bg-geo-green/8",
    link: "/report/ecological",
    cta: "Submit observation",
  },
  {
    icon: CheckCircle,
    title: "Validate nearby reports",
    desc: "Confirm reports in your neighborhood. Community-validated data gets prioritized for action.",
    color: "text-primary",
    bg: "bg-primary/8",
    link: "/community",
    cta: "Validate reports",
  },
  {
    icon: MapPin,
    title: "Explore your area",
    desc: "Check your neighborhood's flood risk, ecological status, and what interventions are being planned.",
    color: "text-accent",
    bg: "bg-accent/8",
    link: "/map",
    cta: "Open map",
  },
];

export default function HowToParticipate() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2">How you can participate</h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Mangleye turns citizen observations into prioritized action. Here's how you help.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-panel p-5 flex flex-col"
            >
              <div className={`w-9 h-9 rounded-lg ${action.bg} flex items-center justify-center mb-3`}>
                <action.icon size={18} className={action.color} />
              </div>
              <h3 className="text-sm font-semibold mb-1">{action.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{action.desc}</p>
              <Link
                to={action.link}
                className={`text-xs font-semibold ${action.color} hover:underline`}
              >
                {action.cta} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
