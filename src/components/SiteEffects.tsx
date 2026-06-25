"use client";

import { useEffect } from "react";

/**
 * SiteEffects — ambient interaction layer for Green Land.
 *
 * Ported from the SweGBGv2 effect architecture, re-skinned for the farm:
 *  1. Spotlight cursor glow (warm gold) via CSS vars --mx/--my  [desktop pointer only]
 *  2. Scroll progress bar (top of page)
 *  3. Scroll-reveal via IntersectionObserver on [data-reveal]
 *  4. Subtle parallax on [data-parallax]
 *  5. Magnetic CTA buttons on [data-magnetic] — DESKTOP ONLY (buggy on touch)
 *
 * Everything is cleaned up on unmount and respects prefers-reduced-motion.
 */
export default function SiteEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A real pointer (mouse/trackpad) — excludes touch where magnetic feels broken.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const cleanups: Array<() => void> = [];

    // ---- 1. spotlight cursor glow (desktop, fine pointer only) ----
    if (finePointer && !reduce) {
      const root = document.documentElement;
      let raf = 0;
      const onMove = (e: MouseEvent) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          root.style.setProperty("--mx", `${e.clientX}px`);
          root.style.setProperty("--my", `${e.clientY}px`);
          raf = 0;
        });
      };
      document.addEventListener("mousemove", onMove, { passive: true });
      document.body.classList.add("has-spotlight");
      cleanups.push(() => {
        document.removeEventListener("mousemove", onMove);
        document.body.classList.remove("has-spotlight");
        if (raf) cancelAnimationFrame(raf);
      });
    }

    // ---- 2. scroll progress bar ----
    const bar = document.getElementById("scroll-progress");
    if (bar) {
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          const p = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
          bar.style.transform = `scaleX(${p})`;
          raf = 0;
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (raf) cancelAnimationFrame(raf);
      });
    }

    // ---- 3. scroll-reveal ----
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (revealEls.length) {
      if (reduce) {
        revealEls.forEach((el) => el.classList.add("revealed"));
      } else {
        const io = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                const el = en.target as HTMLElement;
                const d = el.dataset.revealDelay;
                if (d) el.style.transitionDelay = `${d}ms`;
                el.classList.add("revealed");
                obs.unobserve(el);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        revealEls.forEach((el) => io.observe(el));
        // failsafe: anything still hidden after 1.8s gets shown
        const failsafe = window.setTimeout(() => {
          revealEls.forEach((el) => el.classList.add("revealed"));
        }, 1800);
        cleanups.push(() => {
          io.disconnect();
          clearTimeout(failsafe);
        });
      }
    }

    // ---- 4. parallax ----
    const parEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    if (parEls.length && !reduce && finePointer) {
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const vh = window.innerHeight;
          parEls.forEach((el) => {
            const speed = parseFloat(el.dataset.parallax || "0.15");
            const rect = el.getBoundingClientRect();
            const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
          });
          raf = 0;
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        if (raf) cancelAnimationFrame(raf);
      });
    }

    // ---- 5. magnetic CTA buttons — DESKTOP ONLY ----
    // Disabled on touch/mobile because the pull-back feels broken without hover.
    if (isDesktop && finePointer && !reduce) {
      const magEls = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnetic]")
      );
      const handlers: Array<() => void> = [];
      magEls.forEach((el) => {
        const strength = parseFloat(el.dataset.magnetic || "0.32");
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
        };
        const onLeave = () => {
          el.style.transform = "translate(0, 0)";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        handlers.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
          el.style.transform = "";
        });
      });
      cleanups.push(() => handlers.forEach((fn) => fn()));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      {/* scroll progress bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-wheat-400 via-barn-400 to-moss-400 transition-transform duration-75 ease-out"
        id="scroll-progress"
      />
      {/* warm spotlight glow that follows the cursor (desktop) */}
      <div aria-hidden="true" className="spotlight-glow" />
    </>
  );
}
