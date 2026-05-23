import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step = Math.ceil((100 - current) / 8) || 1;
      current += step;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);

        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });
        tl.to(".preloader-logo", { scale: 0.8, opacity: 0, duration: 0.5, ease: "power2.inOut" })
          .to(".preloader-progress", { opacity: 0, duration: 0.3 }, "-=0.3")
          .to(containerRef.current, {
            yPercent: -100,
            duration: 0.7,
            ease: "power4.inOut",
          });
      }
      setPercent(current);
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-background z-[99999] flex flex-col items-center justify-center select-none"
    >
      <div className="relative flex flex-col items-center max-w-xs text-center px-6">
        <div className="preloader-logo w-16 h-16 mb-8 text-sage drop-shadow-[0_0_20px_oklch(0.68_0.09_130/0.45)] animate-pulse">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M2 22C2 22 8.5 20.5 12 17C15.5 13.5 16 8 16 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 8C16 8 10.5 8.5 7 12C3.5 15.5 2 22 2 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className="font-serif text-3xl text-mist tracking-wide mb-2 preloader-logo">
          Kaya Remedies
        </h2>
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-moss mb-12 preloader-logo">
          Staying Rooted
        </p>

        <div className="preloader-progress font-azonix text-xs text-leaf/80 tracking-widest">
          {percent}%
        </div>

        <div className="preloader-progress w-40 h-[1px] bg-moss-dark/20 mt-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sage to-leaf transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function LeafParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ["oklch(0.68 0.09 130 / 0.15)", "oklch(0.78 0.08 130 / 0.1)", "oklch(0.5 0.07 130 / 0.15)"];
    const leaves: HTMLDivElement[] = [];

    for (let i = 0; i < 15; i++) {
      const leaf = document.createElement("div");
      leaf.className = "absolute pointer-events-none";
      const size = Math.random() * 20 + 10;
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.top = `${Math.random() * 100}%`;
      leaf.style.color = colors[Math.floor(Math.random() * colors.length)];
      leaf.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" class="w-full h-full">
          <path d="M2 22C2 22 8.5 20.5 12 17C15.5 13.5 16 8 16 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M16 8C16 8 10.5 8.5 7 12C3.5 15.5 2 22 2 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      `;
      container.appendChild(leaf);
      leaves.push(leaf);

      gsap.to(leaf, {
        x: `+=${Math.random() * 120 - 60}`,
        y: `+=${Math.random() * 160 - 80}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 12 + 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      leaves.forEach((l) => l.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-[5]" />;
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouch) return;

    setEnabled(true);

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (dotRef.current) {
        gsap.to(dotRef.current, { x, y, duration: 0.1, ease: "power2.out" });
      }
      if (ringRef.current) {
        gsap.to(ringRef.current, { x, y, duration: 0.25, ease: "power2.out" });
      }
    };

    const handleHoverStart = () => {
      dotRef.current?.classList.add("hovered");
      ringRef.current?.classList.add("hovered");
    };

    const handleHoverEnd = () => {
      dotRef.current?.classList.remove("hovered");
      ringRef.current?.classList.remove("hovered");
    };

    window.addEventListener("mousemove", moveCursor);

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll("a, button, input, select, textarea, [role='button'], .herb-card, .herb-featured-card");
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor" style={{ left: 0, top: 0 }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ left: 0, top: 0 }} />
    </>
  );
}

function RootComponent() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && loading && <Preloader onComplete={() => setLoading(false)} />}
      {mounted && <LeafParticles />}
      {mounted && <CustomCursor />}
      <div className={mounted && loading ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
        <Outlet />
      </div>
    </>
  );
}
