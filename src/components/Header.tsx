import { Link, useLocation } from "react-router-dom";
import { Leaf, AlertTriangle, Map, Menu, X, FileText, Users, BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";

const mainNav = [
  { to: "/", label: "Home" },
  { to: "/map", label: "Live Map", icon: Map },
  { to: "/report/flood", label: "Report", highlight: true },
  { to: "/zones", label: "Priority Zones" },
  { to: "/community", label: "Community" },
];

const secondaryNav = [
  { to: "/methodology", label: "Methodology" },
  { to: "/about", label: "About" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-border/60 bg-white sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
          <Leaf size={14} className="text-white" />
        </div>
        <span className="text-sm font-bold tracking-tight text-foreground">Mangleye</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-0.5">
        {mainNav.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-1.5 text-[13px] rounded-lg transition-colors ${
              isActive(link.to)
                ? "text-primary font-semibold bg-primary/8"
                : "text-muted-foreground font-medium hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            {link.label}
          </Link>
        ))}

        {/* Learn dropdown */}
        <div className="relative">
          <button
            onClick={() => setLearnOpen(!learnOpen)}
            onBlur={() => setTimeout(() => setLearnOpen(false), 150)}
            className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            Learn
            <ChevronDown size={12} />
          </button>
          {learnOpen && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-border rounded-lg shadow-lg py-1 min-w-[160px] z-50">
              {secondaryNav.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setLearnOpen(false)}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="flex items-center gap-2">
        <Link
          to="/report/flood"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-destructive text-white text-[13px] font-bold rounded-lg hover:bg-destructive/90 transition-colors shadow-sm"
        >
          <AlertTriangle size={14} />
          Report Flooding
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-border/60 p-4 md:hidden z-50 shadow-lg">
          <nav className="flex flex-col gap-0.5">
            {mainNav.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  isActive(link.to)
                    ? "text-primary font-semibold bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border/30 my-2" />
            {secondaryNav.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/report/flood"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-destructive text-white text-sm font-bold rounded-lg"
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
