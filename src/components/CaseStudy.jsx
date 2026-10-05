import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { caseStudies, getCaseStudy } from '../data/caseStudies';
import Footer from './Footer';

const Reveal = ({ children, className = '', style }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const Label = ({ children }) => (
  <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">{children}</h3>
);

const SectionTitle = ({ index, children }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs font-mono font-bold text-red-500 px-2 py-0.5 rounded bg-red-600/10 border border-red-600/25">
      {index}
    </span>
    <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white">{children}</h2>
  </div>
);

const Bullets = ({ items, tone = 'red' }) => (
  <ul className="space-y-3 text-sm md:text-base text-white/80 font-light leading-relaxed">
    {items.map((t, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${tone === 'red' ? 'bg-red-600' : 'bg-white/40'}`}></span>
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

const Card = ({ children, className = '' }) => (
  <div className={`p-6 md:p-8 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-xl ${className}`}>
    {children}
  </div>
);

const layouts = {
  wide: 'grid-cols-1',
  desktop: 'grid-cols-1 md:grid-cols-2',
  phone: 'grid-cols-1 sm:grid-cols-3 justify-items-center',
};

const Gallery = ({ items, layout = 'desktop' }) => (
  <div className={`grid gap-6 ${layouts[layout]}`}>
    {items.map((img, i) => (
      <figure key={i} className={`space-y-2 w-full ${layout === 'phone' ? 'max-w-[300px]' : ''}`}>
        <img src={img.src} alt={img.caption || ''} loading="lazy" className="w-full rounded-2xl border border-white/10 bg-white/5" />
        {img.caption && <figcaption className="text-xs font-mono text-white/50 uppercase tracking-wider">{img.caption}</figcaption>}
      </figure>
    ))}
  </div>
);

const CaseStudy = ({ slug }) => {
  const study = getCaseStudy(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (study) document.title = `${study.title} — Case Study | Yerra Siddharth`;
    return () => { document.title = 'Yerra Siddharth — UX/UI Designer Portfolio'; };
  }, [slug, study]);

  if (!study) return null;

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  let n = 0;
  const num = () => String(++n).padStart(2, '0');

  return (
    <div className="bg-[#050505] text-white min-h-screen relative overflow-x-clip select-text">
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Top bar */}
      <header className="relative z-20 max-w-6xl mx-auto px-6 md:px-12 pt-6 pb-2 flex items-center justify-between pr-20">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-red-500 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" /></svg>
          All projects
        </a>
        <span className="hidden sm:block text-sm font-black tracking-tighter text-red-600">YERRA SIDDHARTH</span>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-24 space-y-20 md:space-y-28">
        {/* Hero */}
        <section className="pt-10 md:pt-16 space-y-8">
          <Reveal className="space-y-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-red-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              {study.eyebrow}
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.95]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700">
                {study.title}
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">{study.summary}</p>
          </Reveal>

          <Reveal className="grid grid-cols-2 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))] gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden" style={{ '--n': study.meta.length }}>
            {study.meta.map((m, i) => (
              <div key={m.label} className={`bg-[#0b0b0b] p-5 space-y-1 ${study.meta.length % 2 === 1 && i === study.meta.length - 1 ? 'col-span-2 md:col-span-1' : ''}`}>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">{m.label}</div>
                <div className="text-sm md:text-base font-bold text-white">{m.value}</div>
              </div>
            ))}
          </Reveal>

          {study.figma && (
            <Reveal>
              <a
                href={study.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95"
              >
                View Figma prototype
                <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          )}

          <Reveal>
            <img src={study.banner} alt={`${study.title} cover`} className="w-full rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]" />
          </Reveal>
        </section>

        {/* Overview & problem */}
        {study.overview && (
          <Reveal className="space-y-6">
            <SectionTitle index={num()}>Overview &amp; problem</SectionTitle>
            <div className="space-y-4 max-w-3xl text-sm md:text-base text-white/80 font-light leading-relaxed">
              {study.overview.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>
        )}

        {/* Users & goals */}
        {(study.targetUsers || study.designGoals || study.goalText) && (
          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {study.targetUsers && (
              <Card className="space-y-4"><Label>Target users</Label><Bullets items={study.targetUsers} /></Card>
            )}
            {study.designGoals && (
              <Card className="space-y-4"><Label>{study.goalsTitle || 'Design goal'}</Label><Bullets items={study.designGoals} /></Card>
            )}
            {study.goalText && (
              <Card className="space-y-4">
                <Label>{study.goalTitle || 'The goal'}</Label>
                <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">{study.goalText}</p>
              </Card>
            )}
          </Reveal>
        )}

        {/* Persona */}
        {study.persona && (
          <Reveal className="space-y-6">
            <SectionTitle index={num()}>User persona</SectionTitle>
            <Card className="space-y-6">
              <div>
                <div className="text-2xl font-black text-white">{study.persona.name}</div>
                <div className="text-sm text-white/60 font-light">{study.persona.sub}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><Label>Goals</Label><Bullets items={study.persona.goals} /></div>
                <div className="space-y-3"><Label>Pain points</Label><Bullets items={study.persona.pains} tone="muted" /></div>
              </div>
            </Card>
          </Reveal>
        )}

        {/* User flow */}
        {study.flow && (
          <Reveal className="space-y-8">
            <SectionTitle index={num()}>User flow</SectionTitle>
            <ol className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
              {study.flow.map((step, i) => (
                <li key={i} className="flex items-start gap-4 p-5 bg-[#141414]/90 border border-white/10 rounded-2xl hover:border-red-600/50 transition-colors">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-red-600/10 border border-red-600/40 text-red-500 font-mono font-black text-sm flex items-center justify-center">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm md:text-base text-white/80 font-light leading-relaxed pt-1.5">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        )}

        {/* Wireframes */}
        {study.wireframes && study.wireframes.length > 0 && (
          <Reveal className="space-y-6">
            <SectionTitle index={num()}>Wireframes</SectionTitle>
            <Gallery items={study.wireframes} layout={study.wireframesLayout} />
          </Reveal>
        )}

        {/* Final UI */}
        {study.finalUI && study.finalUI.length > 0 && (
          <Reveal className="space-y-6">
            <SectionTitle index={num()}>Final UI</SectionTitle>
            <Gallery items={study.finalUI} layout={study.finalUILayout} />
          </Reveal>
        )}

        {/* Usability testing */}
        {study.usabilityTesting && (
          <Reveal className="space-y-6">
            <SectionTitle index={num()}>Usability testing</SectionTitle>
            <Card className="space-y-5">
              {study.usabilityIntro && <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">{study.usabilityIntro}</p>}
              <Bullets items={study.usabilityTesting} />
            </Card>
          </Reveal>
        )}

        {/* Key learnings */}
        {study.learnings && (
          <Reveal className="space-y-6">
            <SectionTitle index={num()}>Key learnings</SectionTitle>
            <Card><Bullets items={study.learnings} /></Card>
          </Reveal>
        )}

        {/* Next case study */}
        <Reveal>
          <a
            href={`#/case-study/${next.slug}`}
            className="group block p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-red-600/15 via-[#141414] to-[#0a0a0a] hover:border-red-600/60 transition-all"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-white/50">Next case study</div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-3xl md:text-5xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors">{next.title}</span>
              <span className="text-2xl text-red-500 group-hover:translate-x-2 transition-transform" aria-hidden="true">→</span>
            </div>
          </a>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudy;
