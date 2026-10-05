import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MinimalPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (preloaderRef.current) {
        preloaderRef.current.style.opacity = '0';
        preloaderRef.current.style.pointerEvents = 'none';
      }
      if (onComplete) onComplete();
    };

    const tl = gsap.timeline({
      onComplete: finish
    });

    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .fromTo(
        contentRef.current,
        { scale: 0.95, opacity: 0, filter: "blur(8px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      )
      .to(contentRef.current, {
        scale: 1.05,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power2.in",
        delay: 0.6
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });

    // Safety net: some hosting/preview environments throttle or block the
    // GSAP/requestAnimationFrame ticker, which would otherwise leave this
    // fixed full-screen overlay stuck forever. Force it away if that happens.
    const fallback = setTimeout(finish, 2200);

    return () => {
      clearTimeout(fallback);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center select-none overflow-hidden transition-opacity duration-500"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-4">
        {/* Minimal Red Indicator Dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></div>

        {/* Minimal Typography */}
        <h1
          className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-white text-center px-6"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          YERRA SIDDHARTH
        </h1>
      </div>
    </div>
  );
};

export default MinimalPreloader;
