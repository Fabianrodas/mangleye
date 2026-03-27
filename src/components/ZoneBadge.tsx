import { Shield, Droplets, Sprout, Wrench, Eye, AlertTriangle } from "lucide-react";
import type { Badge } from "@/data/zones";

const BADGE_MAP: Record<Badge, { icon: React.ElementType; className: string }> = {
  "Protect": { icon: Shield, className: "bg-geo-green/15 text-geo-green border-geo-green/25" },
  "Restore Hydrology": { icon: Droplets, className: "bg-geo-blue/15 text-geo-blue border-geo-blue/25" },
  "Revegetate": { icon: Sprout, className: "bg-geo-teal/15 text-geo-teal border-geo-teal/25" },
  "Hybrid Infrastructure": { icon: Wrench, className: "bg-geo-amber/15 text-geo-amber border-geo-amber/25" },
  "Monitor First": { icon: Eye, className: "bg-geo-purple/15 text-geo-purple border-geo-purple/25" },
  "Alternative Solution": { icon: AlertTriangle, className: "bg-geo-red/15 text-geo-red border-geo-red/25" },
};

export default function ZoneBadge({ badge }: { badge: Badge }) {
  const cfg = BADGE_MAP[badge];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${cfg.className}`}>
      <Icon size={10} />
      {badge}
    </span>
  );
}
