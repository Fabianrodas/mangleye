import { Link, useLocation } from "react-router-dom";
import { Leaf, AlertTriangle, Map, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/map", label: "Live Map", icon: Map },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/methodology", label: "Methodology" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-border/50 bg-white/80 backdrop-blur-xl z-50 sticky top-0">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
          <Leaf size={16} className="text-primary" />
        </div>
        <span className="text-sm font-bold tracking-tight text-foreground">Mangleye</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              location.pathname === link.to
                ? "text-primary font-medium bg-primary/8"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Link
          to="/report/flood"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-destructive text-white text-sm font-semibold rounded-lg hover:bg-destructive/90 transition-colors shadow-sm"
        >
          <AlertTriangle size={14} />
          Report Flooding
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-border/50 p-4 md:hidden z-50">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? "text-primary font-medium bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/report/flood"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-destructive text-white text-sm font-semibold rounded-lg"
            >
              <AlertTriangle size={14} />
              Report Flooding
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
