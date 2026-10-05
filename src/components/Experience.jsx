import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const professionalData = [
  {
    role: "B.Tech — Electronics & Communication Engineering",
    org: "VIT-AP University, Amaravati, Andhra Pradesh",
    duration: "Expected 2027",
    description: "Final-year engineering student building a parallel practice in UX/UI design, human–AI interaction, and Agent Experience through self-initiated projects and the Google UX certificate.",
    tag: "EDUCATION"
  }
];

const extracurricularData = [
  {
    role: "Self-Initiated UX Case Studies",
    org: "DesignForge AI • InterviewIQ • Synthesis • Bite Buddy • WelthOS",
    duration: "5 Projects",
    description: "End-to-end case studies covering research, flows, Figma prototypes, usability testing, and developer handoff.",
    tag: "PRACTICE"
  },
  {
    role: "Designathon — Team NEUVAY",
    org: "GFG VIT-AP Student Chapter",
    duration: "Jan 2026",
    description: "Placed 2nd at the Designathon, designing and pitching a complete solution under a tight time limit as part of Team NEUVAY.",
    tag: "AWARD"
  }
];

const Experience = () => {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const smallRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      rowRefs.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(
      smallRefs.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !rowRefs.current.includes(el)) {
      rowRefs.current.push(el);
    }
  };

  const addToSmallRefs = (el) => {
    if (el && !smallRefs.current.includes(el)) {
      smallRefs.current.push(el);
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-24 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Red Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">

        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">EPISODE 03</span>
            <span className="text-white/40">|</span>
            <span>EDUCATION & PRACTICE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              BACKGROUND.
            </span>
          </h2>
        </div>

        {/* Education — highlighted */}
        <div className="flex flex-col gap-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">Education</h3>

          {professionalData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-7 md:p-9 bg-gradient-to-br from-red-600/20 via-[#141414] to-[#0a0a0a] backdrop-blur-2xl border-2 border-red-600/60 rounded-[1.75rem] shadow-[0_20px_50px_rgba(229,9,20,0.25)] hover:border-red-500 transition-all duration-500 overflow-hidden"
            >
              {/* Duration Badge */}
              <div className="shrink-0 md:w-40 relative z-10">
                <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-red-400 bg-red-600/20 border border-red-500/40 px-3 py-1 rounded">
                  {item.duration}
                </span>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-white/10 relative z-10"></div>

              {/* Content */}
              <div className="flex-1 space-y-1.5 relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    {item.role}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white px-2.5 py-1 rounded bg-red-600 shadow-[0_0_20px_rgba(229,9,20,0.6)]">
                    {item.tag}
                  </span>
                </div>
                <p className="text-sm text-white/70 font-mono uppercase tracking-wide">{item.org}</p>
                <p className="text-sm text-white/70 font-light leading-relaxed max-w-2xl pt-1">
                  {item.description}
                </p>
              </div>

              {/* Red Corner Dot */}
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_10px_#E50914] transition-all"></div>
            </div>
          ))}
        </div>

        {/* Design Practice — smaller boxes */}
        <div className="flex flex-col gap-4 pt-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold">Design Practice</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {extracurricularData.map((item, index) => (
              <div
                key={index}
                ref={addToSmallRefs}
                className="group relative flex flex-col gap-2 p-5 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl hover:border-red-600/50 transition-all duration-500"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm md:text-base font-bold text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                      {item.role}
                    </h4>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 border border-white/15 px-1.5 py-0.5 rounded shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 bg-red-600/10 border border-red-600/25 px-2 py-0.5 rounded shrink-0">
                    {item.duration}
                  </span>
                </div>
                <p className="text-xs text-white/50 font-mono uppercase tracking-wide">{item.org}</p>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
