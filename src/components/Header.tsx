import { Globe, Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-border/50 bg-white/60 backdrop-blur-xl z-50">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
          <Leaf size={15} className="text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">
            <span className="text-gradient">Mangleye</span>
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Globe size={12} />
        <span className="font-mono">Guayaquil · Samborondón</span>
      </div>
    </header>
  );
}
