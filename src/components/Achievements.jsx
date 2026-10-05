import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import uxCertificate from '../assets/certs/google-ux-certificate.pdf';
import uxPreview from '../assets/certs/preview/google-ux-certificate.png';
import designathonCertificate from '../assets/certs/designathon-certificate.jpg';
import designathonPreview from '../assets/certs/preview/designathon-certificate.jpg';

gsap.registerPlugin(ScrollTrigger);

const certificationsData = [
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Coursera (Google)",
    link: uxCertificate,
    preview: uxPreview,
    highlight: true
  },
  {
    title: "2nd Place — Designathon 2026",
    issuer: "GFG VIT-AP Student Chapter",
    link: designathonCertificate,
    preview: designathonPreview
  }
];

const extracurricularAwards = [
  { year: "2026", result: "2nd Place", category: "Team NEUVAY" }
];

const Achievements = () => {
  const sectionRef = useRef(null);
  const certRefs = useRef([]);
  const [activeCert, setActiveCert] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      certRefs.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!activeCert) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeCert]);

  const addToCertRefs = (el) => {
    if (el && !certRefs.current.includes(el)) {
      certRefs.current.push(el);
    }
  };

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative w-full bg-[#0b0b0b] text-white py-24 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Red Ambient Glow */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">

        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">EPISODE 04</span>
            <span className="text-white/40">|</span>
            <span>CERTIFICATIONS & AWARDS</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              ACHIEVEMENTS.
            </span>
          </h2>
        </div>

        {/* Certifications Sub-header */}
        <div className="flex flex-col items-start space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">Certifications</h3>
          <p className="text-white/60 text-sm font-light leading-relaxed max-w-xl">
            Click a certification or award to view the credential.
          </p>
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificationsData.map((cert, index) => {
            const cardClasses = cert.highlight
              ? "group relative flex items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-br from-red-600/20 via-[#141414] to-[#0a0a0a] backdrop-blur-2xl border-2 border-red-600/60 shadow-[0_20px_50px_rgba(229,9,20,0.25)] transition-all duration-500 sm:col-span-2 lg:col-span-1"
              : "group relative flex items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414]/90 backdrop-blur-2xl border border-white/10 shadow-xl transition-all duration-500";
            const content = (
              <>
                <div className="space-y-1 relative z-10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className={`font-bold text-white transition-colors duration-300 ${cert.highlight ? "text-base md:text-lg group-hover:text-red-400" : "text-sm md:text-base group-hover:text-red-500"}`}>
                      {cert.title}
                    </h4>
                    {cert.highlight && (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white px-2 py-0.5 rounded bg-red-600 shadow-[0_0_15px_rgba(229,9,20,0.6)]">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono uppercase tracking-widest text-white/50">{cert.issuer}</p>
                </div>
                <svg viewBox="0 0 24 24" className={`w-5 h-5 shrink-0 relative z-10 ${cert.link ? (cert.highlight ? "text-red-400" : "text-red-500") : "text-white/20"}`} fill="none" stroke="currentColor" strokeWidth="2">
                  {cert.link ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z" />
                  )}
                </svg>
              </>
            );

            // Certs with a preview image:
            // hover peeks the certificate out of the card, click opens it in a full modal.
            if (cert.preview) {
              return (
                <button
                  key={index}
                  ref={addToCertRefs}
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  className={`${cardClasses} ${cert.highlight ? "hover:border-red-500" : "hover:border-red-600/60 hover:bg-red-600/5"} cursor-pointer text-left overflow-visible`}
                >
                  {content}
                  {/* Peeking certificate thumbnail */}
                  <div
                    className="pointer-events-none absolute left-1/2 bottom-full mb-0 w-40 sm:w-48 -translate-x-1/2 translate-y-4 opacity-0 scale-95 rotate-[-2deg] group-hover:translate-y-[-10px] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-30"
                  >
                    <img
                      src={cert.preview}
                      alt={`${cert.title} certificate preview`}
                      className="w-full rounded-lg border-2 border-red-600/60 shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                    />
                    <span className="block text-center text-[10px] font-mono uppercase tracking-widest text-red-400 mt-1.5 bg-black/80 rounded px-2 py-0.5">
                      Click to view
                    </span>
                  </div>
                </button>
              );
            }

            return cert.link ? (
              <a
                key={index}
                ref={addToCertRefs}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClasses} hover:border-red-600/60 hover:bg-red-600/5 cursor-pointer`}
              >
                {content}
              </a>
            ) : (
              <div
                key={index}
                ref={addToCertRefs}
                className={`${cardClasses} opacity-60`}
                title="Certificate not uploaded yet"
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* Extracurricular Activities — compact badge row */}
        <div className="flex flex-col items-start space-y-3 pt-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold">Awards</h3>
          <div className="flex flex-wrap gap-3">
            {extracurricularAwards.map((item, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border ${
                  item.result === "2nd Place"
                    ? "text-red-400 bg-red-600/10 border-red-600/40"
                    : "text-white/60 bg-white/5 border-white/15"
                }`}
              >
                <span className="uppercase tracking-widest font-bold">{item.result}</span>
                <span className="text-white/30">·</span>
                <span>Designathon — GFG VIT-AP {item.year}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/40">{item.category}</span>
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Viewer Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-[#0b0b0b] border border-red-600/40 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <div>
                <h4 className="text-sm md:text-base font-bold text-white">{activeCert.title}</h4>
                <p className="text-xs font-mono uppercase tracking-widest text-white/50">{activeCert.issuer}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 hover:text-white hover:border-red-600 hover:bg-red-600/20 transition-colors shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="overflow-auto p-4 md:p-6 bg-black/40">
              <img
                src={activeCert.preview}
                alt={`${activeCert.title} certificate`}
                className="w-full h-auto rounded-lg border border-white/10"
              />
            </div>
            <div className="px-5 py-3 border-t border-white/10 flex justify-end shrink-0">
              <a
                href={activeCert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
              >
                Open Original PDF ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
