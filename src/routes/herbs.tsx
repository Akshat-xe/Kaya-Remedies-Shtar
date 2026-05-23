import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HerbCard } from "@/components/HerbCard";
import { HerbModal } from "@/components/HerbModal";
import { herbs, categories } from "@/data/herbs";
import sectionForest from "@/assets/section-forest.jpg";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/herbs")({
  head: () => ({
    meta: [
      { title: "The Botanical Compendium · Kaya Remedies" },
      { name: "description", content: "Explore the full compendium of sacred herbs. Filter by tradition, search by use, study each plant in depth — all freely shared." },
      { property: "og:title", content: "The Botanical Compendium · Kaya Remedies" },
      { property: "og:description", content: "A living, free archive of botanical wisdom. Sacred remedies, traditional and modern use." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    cat: (s.cat as string) ?? undefined,
    search: (s.search as string) ?? undefined,
    sort: (s.sort as string) ?? undefined,
    id: (s.id as string) ?? undefined,
  }),
  component: HerbLibrary,
});

function HerbLibrary() {
  const navigate = useNavigate({ from: "/herbs" });
  const search = Route.useSearch();

  const [activeCat, setActiveCat] = useState(search.cat ?? "all");
  const [query, setQuery] = useState(search.search ?? "");
  const [sortBy, setSortBy] = useState(search.sort ?? "default");
  const [openId, setOpenId] = useState<string | null>(search.id ?? null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  // Sync URL
  useEffect(() => {
    navigate({
      search: {
        cat: activeCat !== "all" ? activeCat : undefined,
        search: query.trim() || undefined,
        sort: sortBy !== "default" ? sortBy : undefined,
        id: openId ?? undefined,
      } as any,
      replace: true,
    });
  }, [activeCat, query, sortBy, openId, navigate]);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      if (scrollProgressRef.current) scrollProgressRef.current.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP intro
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".comp-hero > *", { y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.2 });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const filtered = useMemo(() => {
    let list = herbs;
    if (activeCat !== "all") list = list.filter((h) => h.categories.includes(activeCat));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((h) =>
        [h.name, h.latin, h.benefit, h.description].some((t) => t.toLowerCase().includes(q))
      );
    }
    const sorted = [...list];
    if (sortBy === "alpha") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "category") sorted.sort((a, b) => a.categories[0].localeCompare(b.categories[0]));
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
    return sorted;
  }, [activeCat, query, sortBy]);

  const openHerb = herbs.find((h) => h.id === openId) ?? null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grain-overlay" />
      <div ref={scrollProgressRef} className="scroll-progress" />
      <Header />

      {/* Hero Banner Section */}
      <section className="relative h-[55vh] md:h-[60vh] overflow-hidden mb-12 rounded-[2.5rem] mx-6 lg:mx-12 mt-32 border border-sage/15">
        <img
          src={sectionForest}
          alt="Mossy forest floor backdrop"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/40 to-background/90" />
        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto w-full">
          <div className="comp-hero">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-sage mb-4">
              <Link to="/" className="hover:text-mist transition cursor-pointer">Home</Link> · The Compendium
            </p>
            <h1 className="font-angel-wish text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-mist mb-6 tracking-wide drop-shadow-md">
              The Botanical <span className="italic text-gradient-sage">Compendium</span>
            </h1>
            <p className="font-serif text-lg md:text-xl text-leaf/90 max-w-3xl leading-relaxed drop-shadow-sm">
              Sacred plants. Their lineage, identification, therapeutic actions, and the traditional way each is prepared — all open, searchable, and free.
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="px-6 lg:px-12 mb-12">
        <div className="max-w-7xl mx-auto glass-card-premium rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sage">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search herbs by use or benefit…"
                className="w-full pl-12 pr-5 py-4 rounded-full neuro-input font-sans text-sm text-mist placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            <div className="relative">
              <select
                value={activeCat}
                onChange={(e) => setActiveCat(e.target.value)}
                className="w-full pl-5 pr-10 py-4 rounded-full neuro-input font-sans text-sm text-mist focus:outline-none cursor-pointer appearance-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sage pointer-events-none">▼</span>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-5 pr-10 py-4 rounded-full neuro-input font-sans text-sm text-mist focus:outline-none cursor-pointer appearance-none"
              >
                <option value="default">Sort: Featured</option>
                <option value="alpha">Alphabetical</option>
                <option value="category">By Category</option>
              </select>
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sage pointer-events-none">▼</span>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-moss-dark/30 flex items-center justify-between">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-moss">
              {filtered.length} {filtered.length === 1 ? "herb" : "herbs"} found
            </span>
            {(activeCat !== "all" || query || sortBy !== "default") && (
              <button
                onClick={() => { setActiveCat("all"); setQuery(""); setSortBy("default"); }}
                className="story-link font-sans text-xs text-sage hover:text-mist"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-32">
              <div className="font-serif text-3xl text-mist mb-3">No herbs match this search.</div>
              <p className="font-sans text-sm text-leaf/60">Try adjusting your filters or query.</p>
            </div>
          ) : (
            <div className="reveal-stagger grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((h) => (
                <HerbCard key={h.id} herb={h} onOpen={setOpenId} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <HerbModal herb={openHerb} onClose={() => setOpenId(null)} />
    </div>
  );
}
