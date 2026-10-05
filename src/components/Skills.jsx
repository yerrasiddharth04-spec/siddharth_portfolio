import { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SwipeHint from './SwipeHint';

gsap.registerPlugin(ScrollTrigger);

const certificateLinks = {};

const skillCategories = [
  {
    title: 'UX & Product Design',
    desc: 'Turning user needs into structured problems and flows, from research synthesis to information architecture.',
    tag: 'DISCOVERY',
    skills: ['User Research', 'Personas', 'Journey Mapping', 'User Flows', 'Information Architecture', 'Competitive Analysis']
  },
  {
    title: 'Interaction & UI Design',
    desc: 'Wireframes through high-fidelity, interactive prototypes with clear hierarchy and consistent components.',
    tag: 'INTERFACE',
    skills: ['Wireframing', 'Prototyping', 'Interaction Design', 'Responsive Design', 'Design Systems', 'Microinteractions']
  },
  {
    title: 'Tools',
    desc: 'Day-to-day tooling for designing, documenting, and handing off work to developers.',
    tag: 'TOOLKIT',
    skills: ['Figma', 'Auto-Layout', 'Components & Variants', 'FigJam', 'HTML/CSS']
  },
  {
    title: 'Visual & Accessibility',
    desc: 'Visual craft that stays readable and inclusive: type, colour, spacing, and contrast that works for everyone.',
    tag: 'CRAFT',
    skills: ['Typography', 'Colour Theory', 'Layout & Spacing', 'WCAG Contrast', 'Inclusive Design']
  },
  {
    title: 'AI & Agent Experience',
    desc: 'Designing trustworthy human–AI interaction: delegation, transparency, oversight, and recovery.',
    tag: 'AX',
    skills: ['Agent Experience (AX)', 'Human–AI Interaction', 'Conversational UI', 'Trust & Transparency', 'Error Recovery']
  },
  {
    title: 'Collaboration & Validation',
    desc: 'Testing ideas early and communicating design decisions clearly with teammates and stakeholders.',
    tag: 'PRACTICE',
    skills: ['Usability Testing', 'Design Critique', 'Developer Handoff', 'Storytelling', 'Team Collaboration']
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);
  const carouselRef = useRef(null);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let activeIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
  };

  // Manual horizontal-swipe handling: lets a vertical drag that starts on a card
  // fall through to normal page scroll, while a horizontal drag still moves the carousel.
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let isHorizontal = null;

    const onTouchStart = (e) => {
      if (window.innerWidth >= 769) return;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      lastX = startX;
      isHorizontal = null;
    };

    const onTouchMove = (e) => {
      if (window.innerWidth >= 769) return;
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
      if (window.innerWidth >= 769 || !isHorizontal) return;
      const center = container.scrollLeft + container.offsetWidth / 2;
      let nearest = null;
      let minDiff = Infinity;
      cardsRef.current.forEach((card) => {
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

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            
            const radius = 1800; 
            const angleSpread = 18; 
            
            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;
            
            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius); 
            const z = -Math.abs(offset) * 50; 
            
            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle; 
            
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0, 
              opacity: opacity,
              zIndex: zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: itemOpacity });
              
              if (textRefs.current[i]) {
                  gsap.set(textRefs.current[i], { opacity: itemOpacity });
              }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", 
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (skillCategories.length - 1);
            updateCards(p);
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
           if (card) {
             gsap.set(card, { clearProps: "x,y,z,rotation,scale,opacity,position" });
             gsap.set(card, { scale: i === 0 ? 1 : 0.9 });
           }
        });
        
        bgRefs.current.forEach((bg, i) => {
           if (bg) gsap.set(bg, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
        
        textRefs.current.forEach((txt, i) => {
           if (txt) gsap.set(txt, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills"
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#0b0b0b] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none"
    >
      {/* Dynamic Netflix Dark Background Vignettes */}
      {skillCategories.map((_, i) => (
        <div 
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-[#140203] to-black"
        />
      ))}

      {/* Massive Background Typography (Netflix Red & White Outline) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skillCategories.map((_, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{ 
               WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.15)'}`,
               opacity: 0 
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative w-full h-[500px] md:h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible md:snap-x md:snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0"
        style={{ touchAction: 'pan-y' }}
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-red-600/80 transition-colors duration-500"
          >
            {/* Inner Red Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            
            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/20">
                {category.tag}
              </span>
              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 0{skillCategories.length} ]
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, sIdx) => (
                certificateLinks[skill] ? (
                  <a
                    key={sIdx}
                    href={certificateLinks[skill]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-mono text-white/80 bg-white/5 border border-red-600/40 px-3 py-1 rounded hover:bg-red-600/20 hover:border-red-600/80 hover:text-white transition-colors cursor-pointer underline decoration-red-600/50 underline-offset-2"
                  >
                    {skill}
                  </a>
                ) : (
                  <span
                    key={sIdx}
                    className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-red-600/30 transition-colors"
                  >
                    {skill}
                  </span>
                )
              ))}
            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
          </div>
        ))}
      </div>

      <SwipeHint scrollTargetRef={carouselRef} label="Swipe for more" />

    </section>
  );
};

export default Skills;