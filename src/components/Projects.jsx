import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SwipeHint from './SwipeHint';
import designforgeBanner from '../assets/projects/designforge.jpg';
import interviewiqBanner from '../assets/projects/interviewiq.jpg';
import synthesisBanner from '../assets/projects/synthesis.jpg';
import bitebuddyBanner from '../assets/projects/bitebuddy.jpg';
import welthosBanner from '../assets/projects/welthos.jpg';

gsap.registerPlugin(ScrollTrigger);

// UX case studies for Yerra Siddharth's portfolio
const projectsData = [
  {
    title: "DesignForge AI",
    banner: designforgeBanner,
    category: "AI Design Tool • UX Case Study",
    description: "AI-assisted design workflow tested with 4 participants, cutting task time by about 30%.",
    tags: ["Figma", "Usability Testing", "AX"],
    stat: "~30% Faster",
    link: "#/case-study/designforge-ai"
  },
  {
    title: "InterviewIQ",
    banner: interviewiqBanner,
    category: "Career & AI Coaching • UX Case Study",
    description: "An interview-practice experience with clear feedback loops and confidence-building flows.",
    tags: ["User Research", "Prototyping", "Figma"],
    stat: "End-to-End",
    link: "#/case-study/interviewiq"
  },
  {
    title: "Synthesis",
    banner: synthesisBanner,
    category: "Research Tool • UX Case Study",
    description: "Helps teams turn scattered research notes into organised, shareable insights.",
    tags: ["Information Architecture", "Design System", "Figma"],
    stat: "Insights",
    link: "#/case-study/synthesis"
  },
  {
    title: "Bite Buddy",
    banner: bitebuddyBanner,
    category: "Food & Lifestyle • UX Case Study",
    description: "A food-discovery app focused on fewer steps from craving to decision.",
    tags: ["Mobile UI", "User Flows", "Figma"],
    stat: "Fewer Steps",
    link: "#/case-study/bite-buddy"
  },
  {
    title: "WelthOS",
    banner: welthosBanner,
    category: "Personal Finance • UX Case Study",
    description: "A money-management dashboard with clear hierarchy and accessible data visuals.",
    tags: ["Dashboard UI", "Accessibility", "Handoff"],
    stat: "Dev Handoff",
    link: "#/case-study/welthos"
  }
];

const isExternal = (link) => /^https?:/.test(link);

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  const handleMobileScroll = (e) => {
    if (window.innerWidth >= 768) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let activeIdx = 0;
    let minDiff = Infinity;

    mobileCardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    mobileCardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.to(card, {
        scale: i === activeIdx ? 1 : 0.92,
        opacity: i === activeIdx ? 1 : 0.5,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  };

  // Manual horizontal-swipe handling: lets a vertical drag that starts on a card
  // fall through to normal page scroll, while a horizontal drag still moves the carousel.
  useEffect(() => {
    const container = mobileCarouselRef.current;
    if (!container) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let isHorizontal = null;

    const onTouchStart = (e) => {
      if (window.innerWidth >= 768) return;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      lastX = startX;
      isHorizontal = null;
    };

    const onTouchMove = (e) => {
      if (window.innerWidth >= 768) return;
      const t = e.touches[0];
      const totalDX = t.clientX - startX;
      const totalDY = t.clientY - startY;

      if (isHorizontal === null && (Math.abs(totalDX) > 6 || Math.abs(totalDY) > 6)) {
        isHorizontal = Math.abs(totalDX) > Math.abs(totalDY);
      }

      if (isHorizontal) {
        e.preventDefault();
        container.scrollLeft -= (t.clientX - lastX);
      }
      lastX = t.clientX;
    };

    const onTouchEnd = () => {
      if (window.innerWidth >= 768 || !isHorizontal) return;
      const center = container.scrollLeft + container.offsetWidth / 2;
      let nearest = null;
      let minDiff = Infinity;
      mobileCardsRef.current.forEach((card) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(cardCenter - center);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = card;
        }
      });
      if (nearest) {
        const target = nearest.offsetLeft + nearest.offsetWidth / 2 - container.offsetWidth / 2;
        container.scrollTo({ left: target, behavior: 'smooth' });
      }
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], { 
        xPercent: -50, 
        yPercent: -50 
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      
      const getGridPos = (index) => {
        // 2-column grid; a lone last card is centered
        const row = Math.floor(index / 2);
        const col = index % 2;
        const rows = Math.ceil(projectsData.length / 2);
        const alone = index === projectsData.length - 1 && projectsData.length % 2 === 1;
        return { row, col, rows, alone };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%", 
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Folder opens with smooth rotation
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively
          tl.to(cardsRef.current, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards magically spread out into an ultra-clean blockbuster grid layout
          tl.to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 360;
              const gap = 40;
              const { col, alone } = getGridPos(i);
              return alone ? 0 : (col - 0.5) * (w + gap);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 240;
              const gap = 28;
              const { row, rows } = getGridPos(i);
              return (row - (rows - 1) / 2) * (h + gap);
            },
            rotation: () => gsap.utils.random(-3, 3),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          const cardW = window.innerWidth * 0.8;
          const gap = 20;
          
          mobileCardsRef.current.forEach((card, i) => {
            gsap.set(card, {
              x: -(i * (cardW + gap)), 
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const settleFinal = () => {
            gsap.set(folderFrontRef.current, { rotationX: -130 });
            gsap.set(mobileCardsRef.current, {
              x: 0,
              y: 0,
              rotation: 0,
              scale: (i) => i === 0 ? 1 : 0.92,
              opacity: (i) => i === 0 ? 1 : 0.5
            });
          };

          // Safety net: if ScrollTrigger never fires (or this environment throttles
          // the GSAP ticker), force the cards into their final, fully-scrollable
          // layout anyway so the carousel can never get stuck showing just one card.
          const fallback = setTimeout(settleFinal, 1500);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            },
            onComplete: () => clearTimeout(fallback)
          });

          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tl.to(mobileCardsRef.current, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          tl.to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out"
          }, "-=0.2");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none">
      
      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>

      {/* Ambient Crimson Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        
        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div 
            ref={folderBackRef}
            className="hidden md:flex absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />
            <div className="relative z-10 text-red-600 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              PROJECTS
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/12] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <a
                href={project.link}
                {...(isExternal(project.link) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-7 flex flex-col justify-between isolate"
              >
                {/* Project banner (cover art) */}
                <div className="absolute top-0 left-0 w-full h-[42%] overflow-hidden -z-10 pointer-events-none">
                  <img src={project.banner} alt="" aria-hidden="true" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#141414]" />
                </div>

                {/* Reserve space for banner */}
                <div className="shrink-0 h-[98px]" />

                {/* Top Card Header */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold bg-red-600/10 px-2 py-0.5 rounded">{project.stat}</span>
                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70 bg-black/60">HD</span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-1.5 my-auto">
                  <h3 className="text-xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-red-600/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Red Glowing Corner Accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
              </a>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div 
        ref={mobileCarouselRef}
        onScroll={handleMobileScroll}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-auto z-[100] overflow-x-auto hide-scrollbar"
        style={{ touchAction: 'pan-y' }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectsData.map((project, i) => (
          <div 
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[78vw] aspect-[6/5] snap-center will-change-transform relative z-10"
          >
            <a
              href={project.link}
              {...(isExternal(project.link) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)] relative isolate"
            >
              <div className="absolute top-0 left-0 w-full h-[40%] overflow-hidden -z-10 pointer-events-none">
                <img src={project.banner} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#141414]" />
              </div>
              <div className="shrink-0 h-[64px]" />
              <div className="flex items-center justify-end">
                <span className="text-xs font-mono text-red-400 font-bold bg-red-600/10 px-2 py-0.5 rounded">{project.stat}</span>
              </div>
              <div className="space-y-1.5 mt-auto mb-2">
                <h3 className="text-xl font-black text-white">{project.title}</h3>
                <p className="text-xs text-white/70 font-light line-clamp-2">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </div>
        ))}
      </div>

      <SwipeHint scrollTargetRef={mobileCarouselRef} label="Swipe for more" />

    </section>
  );
};

export default Projects;