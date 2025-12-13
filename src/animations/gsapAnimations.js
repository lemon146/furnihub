import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================
   BASIC FADE UP (CONTEXT SAFE)
========================= */
export const fadeUp = (ctx, element, delay = 0) => {
  if (!element) return;

  ctx.add(() => {
    gsap.from(element, {
      opacity: 0,
      y: 40,
      duration: 1,
      delay,
      ease: "power3.out",
    });
  });
};

/* =========================
   STAGGER FADE UP
========================= */
export const staggerFadeUp = (ctx, elements, delay = 0) => {
  if (!elements?.length) return;

  ctx.add(() => {
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.9,
      delay,
      ease: "power3.out",
    });
  });
};

/* =========================
   SCROLL FADE UP
========================= */
export const scrollFadeUp = (ctx, element) => {
  if (!element) return;

  ctx.add(() => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  });
};

/* =========================
   ICON HOVER (CLEANUP SAFE)
========================= */
export const iconHover = (ctx, element) => {
  if (!element) return;

  ctx.add(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out",
    });

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);

    // cleanup when component unmounts
    return () => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  });
};
