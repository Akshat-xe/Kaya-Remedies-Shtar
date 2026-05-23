import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HerbCard } from "@/components/HerbCard";
import { HerbModal } from "@/components/HerbModal";
import { herbs, reviews } from "@/data/herbs";
import heroLandmass from "@/assets/photo2.webp";
import storyBotanical from "@/assets/photo.webp";
import sectionForest from "@/assets/section-forest.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaya Remedies · A Modern Botanical Library" },
      { name: "description", content: "A free, modern Charaka Samhita. Explore over a dozen sacred herbs and their traditional, science-backed wisdom — beautifully presented." },
      { property: "og:title", content: "Kaya Remedies · Botanical Wisdom, Freely Shared" },
      { property: "og:description", content: "Ancient botanical knowledge refined for the modern world. A living, freely shared library of herbs." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeTest, setActiveTest] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  // Feedback Form States
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const response = await fetch("https://formspree.io/f/xredkgak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: feedbackName,
          email: feedbackEmail,
          rating: feedbackRating,
          message: feedbackMessage,
        }),
      });
      if (response.ok) {
        setFormStatus("success");
        setFeedbackName("");
        setFeedbackEmail("");
        setFeedbackRating(5);
        setFeedbackMessage("");
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

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

  // GSAP master animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Hero entrance
      const tl = gsap.timeline();
      tl.fromTo(".hero-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-headline > *", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power3.out" }, "-=0.5")
        .fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.7")
        .fromTo(".hero-ctas > *", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }, "-=0.6")
        .fromTo(".hero-stat", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" }, "-=0.4")
        .fromTo(".hero-image", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }, 0.3);

      // Hero parallax
      gsap.to(".hero-image", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-glow", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      // Floating hero
      gsap.to(".hero-image", { y: -25, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // Section reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-stagger").forEach((container) => {
        gsap.from(container.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 80%" },
        });
      });

      // Pinned banner zoom
      gsap.to(".banner-image", {
        scale: 1.2,
        ease: "none",
        scrollTrigger: { trigger: ".banner-section", start: "top bottom", end: "bottom top", scrub: 1 },
      });

      // Marquee scroll
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const id = setInterval(() => setActiveTest((a) => (a + 1) % reviews.length), 5500);
    return () => clearInterval(id);
  }, []);

  const featured = herbs.filter((h) => h.featured).slice(0, 4);
  const openHerb = herbs.find((h) => h.id === openId) ?? null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grain-overlay" />
      <div ref={scrollProgressRef} className="scroll-progress" />
      <Header />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-20 px-6 lg:px-12">
        <div
          className="hero-glow absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, oklch(0.5 0.07 130), transparent 60%)" }}
        />
        <div
          className="hero-glow absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.08 130), transparent 60%)" }}
        />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="hero-eyebrow inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-8">
              <span className="w-2 h-2 rounded-full bg-sage animate-glow-pulse" />
              <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-leaf">
                A Modern Charaka Samhita · Free Forever
              </span>
            </div>

            <h1 className="hero-headline font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-mist mb-6">
              <span className="block">Botanical wisdom,</span>
              <span className="block italic text-gradient-sage">freely shared.</span>
              <span className="block text-[0.5em] font-sans font-light uppercase tracking-[0.4em] text-sage mt-6">
                Kaya · Remedies
              </span>
            </h1>

            <p className="hero-sub font-serif text-xl text-leaf/80 leading-relaxed mb-10 max-w-xl">
              Ancient herbal knowledge — distilled, refined, and presented in the visual language of today. Nature has given everything. We simply remember how to use it.
            </p>

            <div className="hero-ctas w-full max-w-lg p-4 rounded-[2rem] glass-card border border-sage/15 flex flex-col sm:flex-row items-center justify-center gap-6 mb-14 text-center mx-auto lg:mx-0">
              <Link
                to="/herbs"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-sage to-leaf text-primary-foreground font-sans text-sm font-semibold tracking-wide shadow-[0_12px_40px_-8px_oklch(0.68_0.09_130/0.6)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                Open Herb Library
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/herbs"
                search={{ cat: "featured" } as any}
                className="story-link font-sans text-sm text-mist/85 hover:text-mist hover:scale-105 transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                Or explore featured herbs
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "16+", l: "Sacred herbs" },
                { n: "8", l: "Traditions" },
                { n: "∞", l: "Free knowledge" },
              ].map((s) => (
                <div key={s.l} className="hero-stat">
                  <div className="font-serif text-3xl text-mist">{s.n}</div>
                  <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-moss mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl animate-glow-pulse"
              style={{ background: "radial-gradient(circle, oklch(0.68 0.09 130 / 0.4), transparent 70%)" }}
            />
            <img
              src={heroLandmass}
              alt="Floating botanical landmass with sacred herbs"
              className="hero-image relative z-10 w-full max-w-2xl mx-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
            />
            {/* Floating accent badges */}
            <div className="absolute top-12 -left-4 glass-card rounded-2xl p-3 px-4 animate-float-slow z-20 hidden md:block">
              <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">Adaptogen</div>
              <div className="font-serif text-lg text-mist">Ashwagandha</div>
            </div>
            <div className="absolute bottom-16 -right-4 glass-card rounded-2xl p-3 px-4 animate-float z-20 hidden md:block">
              <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">Anti-inflammatory</div>
              <div className="font-serif text-lg text-mist">Turmeric</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee overflow-hidden py-12 border-y border-moss-dark/40 bg-card/30">
        <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
          {[...Array(2)].flatMap((_, i) =>
            ["Ashwagandha", "Turmeric", "Tulsi", "Reishi", "Moringa", "Lavender", "Ginger", "Lion's Mane", "Astragalus", "Chamomile"].map((n) => (
              <span key={i + n} className="font-serif italic text-3xl md:text-5xl text-moss/40">
                {n} <span className="text-sage/30 mx-4">✦</span>
              </span>
            ))
          )}
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="relative py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative reveal">
            <img
              src={storyBotanical}
              alt="Macro botanical close-up"
              className="rounded-3xl w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 max-w-[240px] hidden md:block">
              <div className="font-serif italic text-leaf text-sm leading-relaxed">
                "The body knows. The plant remembers. We listen."
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <p className="reveal font-sans text-[11px] uppercase tracking-[0.32em] text-sage">Our philosophy</p>
            <h2 className="reveal font-serif text-5xl md:text-6xl leading-[1.05] text-mist">
              A living archive of <span className="italic text-gradient-sage">remedies</span> the earth already wrote.
            </h2>
            <div className="reveal-stagger space-y-6 font-serif text-lg text-leaf/80 leading-relaxed">
              <p>
                Long before modern medicine had a name, the rishis catalogued thousands of plants — their part, form, season, and use. The Charaka Samhita was a love letter to the body, written in roots, leaves, and flowers.
              </p>
              <p>
                Kaya is that same letter, rewritten for the modern eye. No subscriptions. No fine print. Just the knowledge — clean, sourced, and beautifully arranged.
              </p>
            </div>
            <div className="reveal pt-6">
              <Link
                to="/herbs"
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-sage/40 bg-sage/10 text-mist font-sans text-xs font-semibold tracking-widest uppercase hover:bg-sage hover:text-primary-foreground hover:shadow-[0_10px_30px_oklch(0.71_0.09_130/0.4)] transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                Explore the library
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PINNED BANNER */}
      <section className="banner-section relative h-[80vh] overflow-hidden my-20">
        <img
          src={sectionForest}
          alt="Mossy forest floor"
          className="banner-image absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="max-w-4xl text-center reveal">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-sage mb-6">From the field</p>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] text-mist">
              <span className="italic">"Where the body asks a question,</span>
              <br />
              <span>the earth has already written the reply."</span>
            </h2>
            <p className="font-sans text-sm text-leaf/70 mt-8 tracking-wide">— Ancient Ayurvedic Aphorism</p>
          </div>
        </div>
      </section>

      {/* FEATURED HERBS */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 gap-8 flex-wrap reveal">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-sage mb-4">Featured remedies</p>
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] text-mist max-w-2xl">
                Foundational <span className="italic text-gradient-sage">Botanicals</span>
              </h2>
            </div>
          </div>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((h, index) => {
              const isLarge = index === 0 || index === 3;
              return (
                <div
                  key={h.id}
                  className={`${
                    isLarge
                      ? "lg:col-span-2 md:col-span-2 col-span-1"
                      : "col-span-1"
                  }`}
                >
                  <HerbCard herb={h} onOpen={setOpenId} large={isLarge} />
                </div>
              );
            })}
          </div>

          {/* Centered Large "View All Herbs" Button */}
          <div className="flex justify-center mt-16 reveal">
            <Link 
              to="/herbs" 
              className="group relative px-12 py-5 rounded-full border border-sage/45 bg-sage/10 text-mist font-sans text-sm tracking-widest uppercase hover:bg-sage hover:text-primary-foreground hover:shadow-[0_0_35px_oklch(0.71_0.09_130/0.55)] transition-all duration-500 scale-105 hover:scale-110 flex items-center gap-4 font-semibold"
            >
              View All Herbs
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </section>
      {/* TESTIMONIALS */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="reveal font-sans text-[11px] uppercase tracking-[0.32em] text-sage mb-4">From the community</p>
          <h2 className="reveal font-serif text-5xl md:text-6xl leading-[1.05] text-mist mb-12">
            Living wisdom, <span className="italic text-gradient-sage">in their words</span>.
          </h2>

          <div className="reveal glass-card rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div
              className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-20 blur-3xl"
              style={{ background: "oklch(0.68 0.09 130)" }}
            />
            <div key={activeTest} className="animate-fade-in-up">
              <div className="flex justify-center gap-1 mb-6 text-sage text-xl">
                {Array.from({ length: reviews[activeTest].rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="font-serif italic text-2xl md:text-3xl text-mist leading-relaxed mb-10">
                "{reviews[activeTest].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center text-2xl">
                  {reviews[activeTest].avatar}
                </div>
                <div className="text-left">
                  <div className="font-serif text-lg text-mist">{reviews[activeTest].name}</div>
                  <div className="font-sans text-xs text-moss">{reviews[activeTest].role}</div>
                  <div className="font-sans italic text-[11px] text-sage mt-1">
                    On: {reviews[activeTest].herb}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-10">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTest(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeTest ? 32 : 8,
                    background: i === activeTest ? "oklch(0.68 0.09 130)" : "oklch(0.68 0.09 130 / 0.25)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12">
        <div className="reveal max-w-5xl mx-auto glass-card rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at 30% 20%, oklch(0.68 0.09 130 / 0.4), transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.5 0.07 130 / 0.4), transparent 50%)",
            }}
          />
          <div className="relative">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-sage mb-6">The full archive awaits</p>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.02] text-mist mb-8">
              Open the <span className="italic text-gradient-sage">library</span>.
            </h2>
            <p className="font-serif text-xl text-leaf/80 max-w-2xl mx-auto mb-10">
              Sacred remedies. Their appearance, therapeutic actions, and the traditional way to prepare each one — searchable, filterable, free.
            </p>
            <Link
              to="/herbs"
              className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-gradient-to-r from-sage to-leaf text-primary-foreground font-sans text-sm font-semibold tracking-wider hover:shadow-[0_20px_50px_oklch(0.71_0.09_130/0.5)] hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              Explore the library
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section className="relative py-16 px-6 lg:px-12 bg-background/50">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent mb-12" />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-sage mb-4 font-semibold">Share your wisdom</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] text-mist">
              Stay <span className="italic text-gradient-sage">connected</span>
            </h2>
            <p className="font-sans text-sm text-leaf/70 mt-4 max-w-xl mx-auto leading-relaxed">
              Have you tried these remedies or have feedback? Share your experiences and thoughts with us.
            </p>
          </div>

          <div className="reveal glass-card-premium rounded-[2.5rem] p-8 md:p-14 border border-sage/20 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            {formStatus === "success" ? (
              <div className="text-center py-12 flex flex-col items-center justify-center animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-sage/20 border border-sage/50 flex items-center justify-center text-4xl mb-6 leaf-sway text-sage">
                  🌿
                </div>
                <h3 className="font-serif text-3xl text-mist mb-3">Wisdom Received</h3>
                <p className="font-sans text-sm text-leaf/80 max-w-md mx-auto leading-relaxed">
                  Thank you for sharing your thoughts. Your feedback helps us grow this digital library responsibly.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-8 px-6 py-2.5 rounded-full bg-sage/10 border border-sage/35 text-sage font-sans text-xs tracking-wider uppercase hover:bg-sage hover:text-primary-foreground transition-all duration-300"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-sans text-xs uppercase tracking-wider text-moss">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      placeholder="e.g. Akshat Kumar"
                      className="w-full px-5 py-4 rounded-2xl neuro-input font-sans text-sm text-mist placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-sans text-xs uppercase tracking-wider text-moss">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={feedbackEmail}
                      onChange={(e) => setFeedbackEmail(e.target.value)}
                      placeholder="e.g. you@example.com"
                      className="w-full px-5 py-4 rounded-2xl neuro-input font-sans text-sm text-mist placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-sans text-xs uppercase tracking-wider text-moss">
                    Rate your Herbal Experience
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className={`text-2xl transition-all ${
                          star <= feedbackRating
                            ? "text-sage scale-110 drop-shadow-[0_0_8px_oklch(0.68_0.09_130/0.6)]"
                            : "text-moss-dark/40 hover:text-sage/60"
                        }`}
                      >
                        🌿
                      </button>
                    ))}
                    <span className="font-sans text-xs text-moss ml-2 uppercase tracking-widest">
                      {feedbackRating === 5 ? "Life Changing" : feedbackRating === 4 ? "Very Good" : feedbackRating === 3 ? "Beneficial" : feedbackRating === 2 ? "Mild" : "None"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block font-sans text-xs uppercase tracking-wider text-moss">
                    Your Message / Review
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Tell us about your connection to these remedies..."
                    className="w-full px-5 py-4 rounded-2xl neuro-input font-sans text-sm text-mist placeholder:text-muted-foreground focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  {formStatus === "error" && (
                    <p className="font-sans text-xs text-red-400">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <div className="flex-1" />
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="px-8 py-4 rounded-full neuro-btn-premium text-mist font-sans text-xs font-semibold tracking-widest uppercase disabled:opacity-50"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Submit Feedback"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent mt-12" />
      </section>

      <Footer />

      <HerbModal herb={openHerb} onClose={() => setOpenId(null)} />
    </div>
  );
}
