import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[2000] pointer-events-none transition-all duration-500"
      style={{ padding: scrolled ? "16px 24px" : "28px 36px" }}
    >
      <header
        className="glass-nav pointer-events-auto mx-auto flex items-center justify-between transition-all duration-500"
        style={{
          maxWidth: 1200,
          borderRadius: scrolled ? 999 : 28,
          padding: scrolled ? "12px 28px" : "16px 32px",
        }}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-sage to-moss flex items-center justify-center glow-sage">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M2 22C2 22 8.5 20.5 12 17C15.5 13.5 16 8 16 8"
                stroke="#0e120f"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M16 8C16 8 10.5 8.5 7 12C3.5 15.5 2 22 2 22"
                stroke="#0e120f"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl text-mist tracking-wide">Kaya</span>
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-sage mt-0.5">
              Remedies
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {[
            { to: "/", label: "Home" },
            { to: "/herbs", label: "Herb Library" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="story-link font-sans text-[13px] tracking-wide text-leaf/80 hover:text-mist hover:bg-white/5 px-3.5 py-1.5 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-mist bg-white/10" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/herbs"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sage to-moss text-primary-foreground font-sans text-[12px] font-semibold tracking-wide hover:shadow-[0_8px_28px_-4px_oklch(0.71_0.09_130/0.6)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
        >
          Explore Herbs <span aria-hidden>→</span>
        </Link>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-mist hover:bg-white/5 transition pointer-events-auto cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1">
            <span className={`block w-5 h-0.5 bg-mist transition-all ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block w-5 h-0.5 bg-mist transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-mist transition-all ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </header>

      {mobileOpen && (
        <div className="pointer-events-auto md:hidden mt-3 mx-auto max-w-[1200px] glass-nav rounded-3xl p-6 flex flex-col gap-4">
          <Link to="/" className="font-serif text-xl text-mist hover:text-leaf transition-colors cursor-pointer">Home</Link>
          <Link to="/herbs" className="font-serif text-xl text-mist hover:text-leaf transition-colors cursor-pointer">Herb Library</Link>
          <Link to="/herbs" className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-sage text-primary-foreground font-sans text-sm font-semibold hover:bg-leaf transition-colors cursor-pointer">
            Explore Herbs →
          </Link>
        </div>
      )}
    </div>
  );
}
