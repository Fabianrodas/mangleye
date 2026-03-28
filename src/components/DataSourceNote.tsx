import { Info } from "lucide-react";

export default function DataSourceNote() {
  return (
    <div className="flex gap-2 p-3 rounded-lg bg-secondary/50 border border-border/40">
      <Info size={14} className="text-muted-foreground shrink-0 mt-0.5" />
      <div className="text-[10px] text-muted-foreground leading-relaxed">
        <span className="font-semibold text-foreground/70">Data sources:</span>
        <br />• Satellite-derived mangrove data (simulated from GMW / SERVIR structure)
        <br />• Modeled flood risk (prototype simulation)
        <br />• Population and urban data (estimated)
        <br />• Citizen reports (user-generated)
      </div>
    </div>
  );
}
