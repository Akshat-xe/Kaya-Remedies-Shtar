import { useEffect, useState } from "react";
import type { Herb } from "@/data/herbs";

interface Props {
  herb: Herb | null;
  onClose: () => void;
}

export function HerbModal({ herb, onClose }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    setActiveImg(0);
    setLightbox(false);
  }, [herb]);

  useEffect(() => {
    if (!herb) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(false);
        else onClose();
      }
      if (lightbox && herb.images.length > 1) {
        if (e.key === "ArrowRight") setActiveImg((i) => (i + 1) % herb.images.length);
        if (e.key === "ArrowLeft") setActiveImg((i) => (i - 1 + herb.images.length) % herb.images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [herb, lightbox, onClose]);

  if (!herb) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[3000] overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-4 py-8 md:items-center animate-fade-in-up"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="glass-card relative w-full max-w-6xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.2fr] my-auto"
          style={{ background: "linear-gradient(160deg, oklch(0.14 0.02 130), oklch(0.18 0.025 130))" }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-moss-dark/40 border border-sage/30 text-mist hover:bg-sage hover:text-primary-foreground transition flex items-center justify-center"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Image gallery */}
          <div className="bg-black/60 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-sage/15">
            <div className="w-full aspect-square md:aspect-auto md:h-[65%] min-h-[300px] md:min-h-[380px] relative rounded-2xl overflow-hidden bg-black/40 border border-sage/10">
              <img src={herb.images[activeImg]} alt={herb.name} className="w-full h-full object-cover" />
            </div>
            {herb.images.length > 1 && (
              <div className="flex gap-3 mt-5 overflow-x-auto max-w-full pb-2 scrollbar-thin">
                {herb.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden transition flex-shrink-0 ${
                      i === activeImg ? "border-2 border-sage opacity-100" : "border border-sage/30 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-sage mb-3">
              {herb.categories[0].replace("-", " ")}
            </p>
            <div className="flex flex-col gap-2.5 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wider border ${
                  herb.verified
                    ? "bg-sage/10 text-leaf border-sage/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                {herb.verified ? "✓ Verified" : "⚠️ not Verified"}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-mist leading-[1.1] tracking-wide">{herb.name}</h2>
            </div>
            <p className="font-sans italic text-sage text-sm mb-6">{herb.latin}</p>

            <p className="font-sans text-sm leading-relaxed text-leaf/85 mb-8">{herb.description}</p>

            <div className="space-y-5 mb-8">
              {[
                { t: "Botanical Appearance", c: herb.appearance },
                { t: "Therapeutic Actions", c: herb.uses },
                { t: "Preparation & Intake", c: herb.consume },
              ].map((b) => (
                <div key={b.t} className="p-5 rounded-2xl bg-sage/[0.06] border border-sage/15">
                  <h4 className="font-serif text-lg text-sage mb-2 font-semibold">{b.t}</h4>
                  <p className="font-sans text-[13px] leading-[1.7] text-mist/75">{b.c}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { l: "Part Used", v: herb.partUsed },
                { l: "Form", v: herb.form },
              ].map((s) => (
                <div key={s.l} className="p-3 rounded-xl bg-sage/10 border border-sage/20">
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-sage mb-1">{s.l}</div>
                  <div className="font-sans text-sm text-mist font-medium">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-[4000] flex flex-col items-center justify-center"
          style={{ background: "oklch(0.05 0.005 130 / 0.96)", backdropFilter: "blur(24px)" }}
        >
          <div className="absolute top-8 left-8 font-serif text-2xl text-mist">
            Kaya{" "}
            <span className="font-sans text-sm text-sage ml-3">
              {activeImg + 1} / {herb.images.length}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white text-xl flex items-center justify-center"
          >
            ✕
          </button>

          <div className="flex items-center w-full justify-between px-6 md:px-12 flex-1" onClick={(e) => e.stopPropagation()}>
            {herb.images.length > 1 && (
              <button
                onClick={() => setActiveImg((i) => (i - 1 + herb.images.length) % herb.images.length)}
                className="w-14 h-14 rounded-full bg-sage/15 border border-sage/30 text-mist text-2xl"
              >
                ‹
              </button>
            )}
            <img
              src={herb.images[activeImg]}
              alt=""
              className="max-w-[75vw] max-h-[72vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
            {herb.images.length > 1 && (
              <button
                onClick={() => setActiveImg((i) => (i + 1) % herb.images.length)}
                className="w-14 h-14 rounded-full bg-sage/15 border border-sage/30 text-mist text-2xl"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
