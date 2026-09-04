"use client";

import { useEffect, useRef, useCallback } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  const observe = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    ref.current = node;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    // Observe the element and all its .reveal children
    const reveals = node.querySelectorAll(".reveal");
    reveals.forEach((el) => observer.observe(el));
    if (node.classList.contains("reveal")) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return observe;
}

export function useScrollDirection() {
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return lastScrollY;
}
