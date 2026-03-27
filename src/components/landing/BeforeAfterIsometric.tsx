import { motion } from "framer-motion";
import { Droplets, TreePine, Building2 } from "lucide-react";

const reasons = [
  {
    icon: TreePine,
    title: "Mangrove edges destroyed",
    stat: "60%",
    desc: "of Guayaquil's natural mangrove barrier has been lost in 20 years. Without this buffer, flood water has nowhere to go.",
    color: "text-geo-green",
    bg: "bg-geo-green/8",
    border: "border-geo-green/15",
  },
  {
    icon: Building2,
    title: "Ground sealed by urbanization",
    stat: "78%",
    desc: "of critical flood zones have impervious surfaces. Rain can't absorb — it runs directly into streets and homes.",
    color: "text-geo-amber",
    bg: "bg-geo-amber/8",
    border: "border-geo-amber/15",
  },
  {
    icon: Droplets,
    title: "Ecological edges compressed",
    stat: "85%",
    desc: "of the natural buffer between city and water has collapsed. No space is left to absorb, slow, or redirect floodwater.",
    color: "text-destructive",
    bg: "bg-destructive/8",
    border: "border-destructive/15",
  },
];

export default function WhyItMatters() {
  return (
    <section className="py-16 px-6 bg-white border-y border-border/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2">Why Greater Guayaquil floods</h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            It's not just rainfall. The city has lost the ecological infrastructure that used to protect it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-5 rounded-xl border ${item.border} ${item.bg}`}
            >
              <item.icon size={20} className={`${item.color} mb-3`} />
              <div className={`text-3xl font-bold font-mono ${item.color} mb-1`}>{item.stat}</div>
              <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
