import { useEffect, useRef, useState } from 'react';

const SwipeHint = ({ scrollTargetRef, label = 'Swipe for more' }) => {
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    const el = scrollTargetRef?.current;
    if (!el) return;

    const hide = () => setVisible(false);

    const show = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      setVisible(true);
      hideTimerRef.current = setTimeout(hide, 4500);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            show();
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );
    observer.observe(el);

    el.addEventListener('scroll', hide, { passive: true, once: true });

    return () => {
      observer.disconnect();
      clearTimeout(hideTimerRef.current);
      el.removeEventListener('scroll', hide);
    };
  }, [scrollTargetRef]);

  return (
    <>
      <style>{`
        @keyframes swipeHintHand {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(7px); }
        }
        .swipe-hint-hand { animation: swipeHintHand 1.1s ease-in-out infinite; }

        @keyframes swipeHintArrow {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(7px); opacity: 1; }
        }
        .swipe-hint-arrow { animation: swipeHintArrow 1.1s ease-in-out infinite; animation-delay: 0.15s; }
      `}</style>
      <div
        className={`md:hidden absolute bottom-5 left-1/2 -translate-x-1/2 z-[110] pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-red-600/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <svg className="w-4 h-4 text-red-500 swipe-hint-hand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12m0-8.5a1.5 1.5 0 0 1 3 0V12m0-7a1.5 1.5 0 0 1 3 0v9m0-5.5a1.5 1.5 0 0 1 3 0V15c0 3.5-2.5 6-6 6h-1c-2 0-3-.6-4.2-2L6 17.5C5 16 5.3 14.8 6.5 14.2c1-.5 2 0 2.5 1" />
        </svg>
        <span className="text-[10px] font-mono uppercase tracking-widest text-white whitespace-nowrap">{label}</span>
        <svg className="w-3.5 h-3.5 text-red-500 swipe-hint-arrow shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </>
  );
};

export default SwipeHint;
