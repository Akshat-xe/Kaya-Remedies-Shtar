import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-32 pt-24 pb-12 overflow-hidden border-t border-moss-dark/40">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.78 0.08 130) 0%, transparent 35%), radial-gradient(circle at 80% 70%, oklch(0.68 0.09 130) 0%, transparent 40%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage to-moss flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M2 22C2 22 8.5 20.5 12 17C15.5 13.5 16 8 16 8" stroke="#0e120f" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M16 8C16 8 10.5 8.5 7 12C3.5 15.5 2 22 2 22" stroke="#0e120f" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="font-serif text-2xl text-mist leading-none">Kaya</div>
                <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-sage mt-1">Remedies</div>
              </div>
            </div>
            <p className="font-serif italic text-xl text-leaf/80 leading-relaxed max-w-md">
              "Nature has given everything — if we know how to use it, we know all."
            </p>
            <p className="font-sans text-sm text-muted-foreground mt-6 max-w-md leading-relaxed">
              A modern digital Charaka Samhita. A living, freely shared library of botanical wisdom for the curious and the healing.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-sage mb-5">Explore</div>
            <ul className="space-y-3">
              <li><Link to="/" className="font-sans text-sm text-leaf/70 hover:text-mist hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer">Home</Link></li>
              <li><Link to="/herbs" className="font-sans text-sm text-leaf/70 hover:text-mist hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer">Herb Library</Link></li>
              <li><Link to="/herbs" search={{ cat: "featured" } as any} className="font-sans text-sm text-leaf/70 hover:text-mist hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer">Featured</Link></li>
              <li><Link to="/herbs" search={{ cat: "rare" } as any} className="font-sans text-sm text-leaf/70 hover:text-mist hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer">Rare Herbs</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-sage mb-5">Wisdom</div>
            <ul className="space-y-3">
              <li><Link to="/herbs" search={{ cat: "immunity" } as any} className="font-sans text-sm text-leaf/70 hover:text-mist hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer">Immunity</Link></li>
              <li><Link to="/herbs" search={{ cat: "calming" } as any} className="font-sans text-sm text-leaf/70 hover:text-mist hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer">Calming</Link></li>
              <li><Link to="/herbs" search={{ cat: "digestion" } as any} className="font-sans text-sm text-leaf/70 hover:text-mist hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer">Digestion</Link></li>
              <li><Link to="/herbs" search={{ cat: "daily-wellness" } as any} className="font-sans text-sm text-leaf/70 hover:text-mist hover:translate-x-1 transition-all duration-300 inline-block cursor-pointer">Daily Wellness</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-moss-dark/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-sans text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kaya Remedies · A free botanical library
          </div>
          <div className="font-serif italic text-sm">
            <span className="text-muted-foreground">Crafted with reverence by </span>
            <span className="text-gradient-sage font-medium">Akshat Kumar</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" className="text-xs hover:text-mist hover:translate-x-0.5 transition-all duration-300 cursor-pointer">Privacy</a>
            <a href="#" className="text-xs hover:text-mist hover:translate-x-0.5 transition-all duration-300 cursor-pointer">Sources</a>
            <a href="#" className="text-xs hover:text-mist hover:translate-x-0.5 transition-all duration-300 cursor-pointer">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
