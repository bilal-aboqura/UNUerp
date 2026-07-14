"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.getElementById("navbar");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    root.classList.add("motion-ready");
    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const revealItems = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    let observer: IntersectionObserver | undefined;
    if (!reduced && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.visible = "true";
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.08 },
      );
      revealItems.forEach((item) => observer?.observe(item));
    } else {
      revealItems.forEach((item) => (item.dataset.visible = "true"));
    }

    const stage = document.querySelector<HTMLElement>(".command-stage");
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (!stage || reduced || !finePointer) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        stage.style.setProperty("--pointer-x", x.toFixed(3));
        stage.style.setProperty("--pointer-y", y.toFixed(3));
      });
    };
    if (stage && finePointer && !reduced) window.addEventListener("pointermove", move, { passive: true });

    return () => {
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("pointermove", move);
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
