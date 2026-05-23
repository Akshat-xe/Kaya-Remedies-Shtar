import type { Herb } from "@/data/herbs";

interface Props {
  herb: Herb;
  onOpen: (id: string) => void;
  large?: boolean;
}

export function HerbCard({ herb, onOpen, large }: Props) {
  if (large) {
    return (
      <button
        onClick={() => onOpen(herb.id)}
        className="herb-featured-card group relative grid grid-cols-1 md:grid-cols-2 rounded-[2rem] overflow-hidden text-left w-full glass-card-premium hover:border-sage/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
        style={{ minHeight: 480 }}
      >
        <div className="relative overflow-hidden bg-black h-72 md:h-auto">
          <img
            src={herb.image}
            alt={herb.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/85" />
          <div
            className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full backdrop-blur-md font-sans text-[11px] font-semibold border border-sage/30 z-10"
            style={{ background: "oklch(0.12 0.015 130 / 0.85)", color: herb.tagColor }}
          >
            {herb.tag}
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-between bg-card/20">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-moss mb-3">
              {herb.categories[0].replace("-", " ")}
            </p>
            <h3 className="font-angel-wish text-3xl md:text-4xl text-mist leading-[1.05] mb-2 tracking-wide group-hover:text-leaf transition-colors">{herb.name}</h3>
            <p className="font-sans italic text-xs text-moss-dark mb-5">{herb.latin}</p>
            <p className="font-sans text-sm leading-[1.7] text-leaf/75 mb-7 line-clamp-3">{herb.description}</p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-moss-dark/20">
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-moss">
              Library Reference
            </span>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage text-primary-foreground font-sans text-xs font-bold uppercase tracking-wider group-hover:bg-leaf group-hover:gap-3 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
              Study Herb <span>→</span>
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => onOpen(herb.id)}
      className="herb-card group block text-left w-full rounded-[2rem] overflow-hidden glass-card-premium hover:border-sage/40 hover:-translate-y-1.5 transition-all duration-500 hover:shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
    >
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-black">
        <img
          src={herb.image}
          alt={herb.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-md font-sans text-[10px] font-semibold border border-sage/25 z-10"
          style={{ background: "oklch(0.12 0.015 130 / 0.85)", color: herb.tagColor }}
        >
          {herb.tag}
        </div>
      </div>
      
      <div className="p-4 md:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] md:min-h-[280px] bg-card/10">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-moss mb-2">
            {herb.categories[0].replace("-", " ")}
          </p>
          <h3 className="font-angel-wish text-xl md:text-2xl text-mist leading-[1.05] mb-1 tracking-wide group-hover:text-leaf transition-colors animate-pulse-subtle">
            {herb.name}
          </h3>
          <p className="font-sans italic text-[11px] text-moss-dark mb-3">{herb.latin}</p>
          <p className="font-sans text-xs leading-[1.6] text-leaf/75 mb-4 line-clamp-2">{herb.benefit}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-moss-dark/20 mt-2">
          <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-moss">
            Library Reference
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sage text-primary-foreground font-sans text-[10px] font-bold uppercase tracking-wider group-hover:bg-leaf group-hover:gap-2 transition-all duration-300 shadow-[0_6px_15px_rgba(0,0,0,0.25)]">
            Study Herb <span>→</span>
          </span>
        </div>
      </div>
    </button>
  );
}
