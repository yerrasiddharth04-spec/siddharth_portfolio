import designforgeBanner from '../assets/projects/designforge.jpg';
import interviewiqBanner from '../assets/projects/interviewiq.jpg';
import synthesisBanner from '../assets/projects/synthesis.jpg';
import bitebuddyBanner from '../assets/projects/bitebuddy.jpg';
import welthosBanner from '../assets/projects/welthos.jpg';
import bite_buddy_delivery from '../assets/cases/bite-buddy-delivery.webp';
import bite_buddy_dining from '../assets/cases/bite-buddy-dining.webp';
import bite_buddy_profile from '../assets/cases/bite-buddy-profile.webp';
import bite_buddy_wireframes from '../assets/cases/bite-buddy-wireframes.webp';
import designforge_persona from '../assets/cases/designforge-persona.webp';
import designforge_research from '../assets/cases/designforge-research.webp';
import interviewiq_home from '../assets/cases/interviewiq-home.webp';
import interviewiq_jd_upload from '../assets/cases/interviewiq-jd-upload.webp';
import interviewiq_job_analysis from '../assets/cases/interviewiq-job-analysis.webp';
import interviewiq_wireframes from '../assets/cases/interviewiq-wireframes.webp';
import synthesis_canvas from '../assets/cases/synthesis-canvas.webp';
import synthesis_ingestion from '../assets/cases/synthesis-ingestion.webp';
import synthesis_projects from '../assets/cases/synthesis-projects.webp';
import synthesis_wireframes from '../assets/cases/synthesis-wireframes.webp';
import welthos_account_details from '../assets/cases/welthos-account-details.webp';
import welthos_balances from '../assets/cases/welthos-balances.webp';
import welthos_overview_2 from '../assets/cases/welthos-overview-2.webp';
import welthos_overview from '../assets/cases/welthos-overview.webp';
import welthos_wireframes from '../assets/cases/welthos-wireframes.webp';

// Each case study renders on its own page (#/case-study/<slug>).
// Sections with no data are simply not shown.
// wireframes / finalUI: arrays of { src, caption }; wireframesLayout / finalUILayout: 'wide' | 'desktop' | 'phone'.
export const caseStudies = [
  {
    slug: 'designforge-ai',
    title: 'DesignForge AI',
    eyebrow: 'CASE STUDY · MULTI-AGENT SAAS',
    banner: designforgeBanner,
    summary:
      'A multi-agent SaaS platform that transforms a product idea into a validated prototype — handling research, personas, user flows, wireframing, UI generation, accessibility reviews and design critique in one connected workspace.',
    meta: [
      { label: 'Role', value: 'UX / UI Designer' },
      { label: 'Duration', value: '4 weeks' },
      { label: 'Type', value: 'SaaS Web App' },
      { label: 'Tool', value: 'Figma' },
    ],
    figma:
      'https://www.figma.com/proto/POP4cY2CS9HzSMO9CDc4E6/DesignForge-AI?node-id=1-3067&p=f&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A2936&page-id=0%3A1',
    overview: [
      'Most product teams lose weeks moving from an idea to a prototype — juggling Figma, Notion, Miro, ChatGPT and spreadsheets with no connecting layer, and struggling to trust AI output enough to present it to stakeholders.',
      'The goal was a multi-agent workspace that automates the idea-to-prototype pipeline while keeping designers and product managers in full control of every decision that matters.',
    ],
    targetUsers: [
      'UX & product designers in fast-moving teams',
      'Product managers validating ideas without a large team',
      'Startup founders moving from brief to prototype',
      'Agencies & innovation teams running rapid sprints',
    ],
    goalTitle: 'The goal',
    goalText:
      'Automate the pipeline across eight specialist agents — research, persona, feature strategy, UX flow, wireframe, UI, accessibility and design critic — while keeping a human approval gate at every stage.',
    persona: {
      name: 'Riya Sharma',
      sub: '29 · Senior UX Designer, B2B SaaS startup',
      goals: [
        'Go from brief to testable prototype in a week',
        'Back every decision with visible research',
        'Spend more time on high-order design thinking',
      ],
      pains: [
        'Juggles 4–6 disconnected tools',
        'Skips personas under deadline pressure',
        'AI output feels generic and hard to defend',
      ],
    },
    flow: [
      'User enters a product idea or uploads a brief',
      'Research Agent runs competitor, market and gap analysis',
      'User reviews and approves research before moving on',
      'Persona Agent generates personas; user approves or revises',
      'Feature Strategy Agent proposes an MVP and priority roadmap',
      'UX Flow Agent builds information architecture and journeys',
      'Wireframe and UI agents generate low- then high-fidelity screens',
      'Accessibility (WCAG) and Design Critic agents review quality',
      'User reviews the final prototype and exports to Figma',
    ],
    finalUI: [
      { src: designforge_research, caption: 'Research dashboard' },
      { src: designforge_persona, caption: 'Persona workspace' },
    ],
    finalUILayout: 'desktop',
    usabilityIntro:
      "Tested with 4 participants on an interactive Figma prototype. Users couldn't tell which agents had run, the confidence score lacked context, and approve / reject controls felt disconnected from the output they referred to.",
    usabilityTesting: [
      'Added a sequential pipeline view of agent order and stage',
      'Added a tooltip and legend explaining confidence scores',
      'Moved approve / reject directly beneath each output',
      'Added a diff view of original vs. edited AI output',
    ],
    learnings: [
      'Agent transparency is a UX responsibility, not just engineering',
      'Human-in-the-loop controls must appear exactly where needed',
      'Confidence scores need a scale, a source and a next action',
      'Design for failure states as carefully as the ideal flow',
    ],
  },
  {
    slug: 'interviewiq',
    title: 'InterviewIQ',
    eyebrow: 'CASE STUDY · AI INTERVIEW COACH',
    banner: interviewiqBanner,
    summary:
      'An AI-powered app that helps job seekers prepare through personalized mock interviews, role-specific questions, real-time feedback, and progress tracking — like a personal interview coach available on demand.',
    meta: [
      { label: 'Role', value: 'UX/UI Designer' },
      { label: 'Duration', value: '3 weeks' },
      { label: 'Type', value: 'Mobile + Web App' },
      { label: 'Tool', value: 'Figma' },
    ],
    figma:
      'https://www.figma.com/proto/NLs0pdr941FuVCoOC4Sb8n/InterviewIQ-AI?node-id=1-1901&p=f&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A1901&page-id=0%3A1',
    overview: [
      'Most job seekers struggle to prepare for a specific role rather than generic questions, to get honest structured feedback on their actual answers, and to build real confidence through repeated low-pressure practice. Existing tools are limited to question banks, passive in nature, and generic in their feedback.',
      'The goal was an AI interview coach that generates role-specific questions from a job description, conducts realistic mock interviews, and delivers feedback that feels supportive, specific, and genuinely actionable.',
    ],
    targetUsers: [
      'Students & fresh graduates facing first interviews',
      'Career switchers entering a new industry',
      'Professionals returning after a break',
    ],
    designGoals: [
      'Feedback that coaches, not just scores',
      'Realistic practice without real-interview anxiety',
      'Visible, motivating progress over time',
    ],
    persona: {
      name: 'Priya Nair',
      sub: '22 · Final-year engineering student, targeting UX & Product roles',
      goals: [
        'Understand what interviewers look for',
        'Practice until answers feel natural',
        'Perform in real interviews like in practice',
      ],
      pains: [
        'Generic YouTube mocks, not role-specific',
        'No feedback when practicing alone',
        'Freezes under real interview pressure',
      ],
    },
    flow: [
      'User pastes a job description or uploads a posting',
      'AI analyzes the role and identifies key skills and competencies',
      'User selects interview type — behavioral, technical, mixed, or HR',
      'User chooses voice or text mode, difficulty, and duration',
      'AI conducts a live, conversational mock interview',
      'User responds with real-time transcription on screen',
      'AI generates a feedback report across communication, structure, relevance, and confidence',
      'User reviews answer-by-answer analysis with stronger example answers',
      'AI builds a personalized improvement plan',
      'User tracks readiness and skills over time',
    ],
    wireframes: [{ src: interviewiq_wireframes, caption: 'Wireframes' }],
    wireframesLayout: 'wide',
    finalUI: [
      { src: interviewiq_home, caption: 'Home' },
      { src: interviewiq_jd_upload, caption: 'JD upload' },
      { src: interviewiq_job_analysis, caption: 'Job analysis' },
    ],
    finalUILayout: 'phone',
    usabilityTesting: [
      'Tested with 4 participants on an interactive Figma prototype',
      'Added a score changelog explaining what moved the readiness score',
      'Warmed the live-interview screen to reduce anxiety',
      'Added a shortcut from feedback to the lowest-scoring answer',
      "Rewrote the improvement plan to reference the user's actual answers",
    ],
    learnings: [
      'Feedback tone is a design decision — order changes how it lands',
      'Progress visibility keeps users engaged long enough to improve',
      'The detailed answer review was the most valuable screen',
      'Designing for anxiety matters as much as usability',
      'Specific, quoted feedback is trusted; generic advice is ignored',
    ],
  },
  {
    slug: 'synthesis',
    title: 'Synthesis',
    eyebrow: 'CASE STUDY · AI RESEARCH WORKSPACE',
    banner: synthesisBanner,
    summary:
      'An AI-powered research workspace that helps students and researchers upload, organize, and synthesize insights across multiple documents — replacing scattered reading with structured, connected understanding.',
    meta: [
      { label: 'Role', value: 'UX/UI Designer' },
      { label: 'Duration', value: '3 weeks' },
      { label: 'Type', value: 'Web App' },
      { label: 'Tool', value: 'Figma' },
    ],
    figma:
      'https://www.figma.com/proto/L5jQkCox7q0KqDcYPaCER3/Synthesis-AI?node-id=1-753&p=f&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A753&page-id=0%3A1',
    overview: [
      'Students and researchers struggle to connect ideas across multiple papers, retain and organize insights from large volumes of content, and trust AI-generated summaries without knowing how reliable they are. Existing tools work one document at a time, summarize passively with no synthesis layer, and hide how the AI reaches its conclusions.',
      'The goal was an AI-collaborative workspace that synthesizes research across documents while keeping the user in control of what they trust and act on.',
    ],
    targetUsers: [
      'Undergraduate & postgraduate students',
      'Independent researchers with large reading lists',
      'Knowledge workers synthesizing many sources',
    ],
    designGoals: [
      'Synthesis across documents, not single summaries',
      'Transparent AI confidence on every insight',
      'Keep the user in control of what to trust',
    ],
    persona: {
      name: 'Aditya Rao',
      sub: '24 · Postgraduate research student',
      goals: [
        'Synthesize findings across 10–15 papers',
        'Identify patterns and contradictions',
        'Export structured notes for writing',
      ],
      pains: [
        'Reads papers one by one, no connecting layer',
        'Highlights and notes scattered across tools',
        "Can't tell reliable AI output from hallucination",
      ],
    },
    flow: [
      'Upload PDFs, paste URLs, or drop YouTube lecture links',
      'AI processes and chunks the documents',
      'View AI-generated clusters on the Synthesis Canvas',
      'Ask follow-up questions in the Prompt Workspace',
      'Review confidence indicators and citations on each insight',
      'Export synthesized notes as a structured outline',
    ],
    wireframes: [{ src: synthesis_wireframes, caption: 'Wireframes' }],
    wireframesLayout: 'wide',
    finalUI: [
      { src: synthesis_ingestion, caption: 'Ingestion & processing' },
      { src: synthesis_projects, caption: 'My projects' },
      { src: synthesis_canvas, caption: 'Synthesis canvas' },
    ],
    finalUILayout: 'desktop',
    usabilityTesting: [
      'Tested with 3 users on an interactive Figma prototype',
      'Added a legend and tooltip explaining the confidence scale',
      'Introduced a default collapsed view for clusters',
      'Added a document source tag on each cluster card',
      'Made citation links visually distinct with an underline and icon',
    ],
    learnings: [
      'Confidence indicators are a design responsibility, not just engineering',
      'Users need to feel in control of AI outputs, not just receive them',
      'Transparent AI states (processing, chunking, ready) reduce anxiety',
      'Citation linking is essential for high-stakes research tools',
      'Early canvas wireframing prevented major structural rework',
    ],
  },
  {
    slug: 'bite-buddy',
    title: 'Bite Buddy',
    eyebrow: 'CASE STUDY · FOOD DELIVERY APP',
    banner: bitebuddyBanner,
    summary:
      'A food delivery app designed to help users quickly discover, order, and enjoy food from nearby restaurants with minimal effort.',
    meta: [
      { label: 'Role', value: 'UX/UI Designer' },
      { label: 'Duration', value: '2 weeks' },
      { label: 'Type', value: 'Mobile App' },
      { label: 'Tool', value: 'Figma' },
    ],
    figma:
      'https://www.figma.com/proto/USKGx4qyX3w8HcYqpvByDu/Bite-Buddy?node-id=1-882&p=f&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A882&page-id=0%3A1',
    overview: [
      'Ordering food online often means decision fatigue from too many options, complicated navigation, and a lack of personalized recommendations. Existing apps can feel overwhelming, cluttered, and time-consuming.',
      'The goal was a fast, intuitive food-ordering experience that reduces friction and helps users decide quickly.',
    ],
    targetUsers: [
      'Students and young professionals',
      'Busy individuals who prefer quick ordering',
      'People who frequently order food online',
    ],
    goalsTitle: 'Design decisions',
    designGoals: [
      'Search-first layout to speed up decisions',
      'High-quality food imagery to drive engagement',
      'Quick filters like Fast Delivery & Top Rated',
      'Familiar, low-learning-curve UX patterns',
    ],
    persona: {
      name: 'Lishitha',
      sub: '24 · Software Developer',
      goals: ['Order food quickly after work', 'Discover good deals', 'Find reliable restaurants'],
      pains: ['Too many choices — hard to decide', 'Repetitive searching', 'Slow checkout experience'],
    },
    flow: [
      'User opens the app to their location and feed',
      'Searches or browses nearby restaurants',
      'Applies filters like rating and delivery time',
      'Views a restaurant menu and selects dishes',
      'Reviews the cart and checks out quickly',
    ],
    wireframes: [{ src: bite_buddy_wireframes, caption: 'Wireframes' }],
    wireframesLayout: 'wide',
    finalUI: [
      { src: bite_buddy_dining, caption: 'Dining' },
      { src: bite_buddy_delivery, caption: 'Delivery' },
      { src: bite_buddy_profile, caption: 'Profile' },
    ],
    finalUILayout: 'phone',
    usabilityTesting: [
      'Tested with 3 users on an interactive Figma prototype',
      'Simplified the home screen hierarchy to reduce clutter',
      'Made filter options more visible and accessible',
      'Clarified restaurant cards with rating, delivery time, and price',
      'Made the View Cart action prominent and added quick reorder',
    ],
    learnings: [
      'Reducing decision fatigue is crucial in food delivery',
      'Strong visual hierarchy helps users compare and choose',
      'Imagery boosts engagement but must stay balanced with clarity',
      'Familiar navigation patterns build user confidence and speed',
      'Testing revealed how users really use filters, search, and cart',
    ],
  },
  {
    slug: 'welthos',
    title: 'WelthOS',
    eyebrow: 'CASE STUDY · FINANCE DASHBOARD',
    banner: welthosBanner,
    summary:
      'A personal finance dashboard that helps users track expenses, manage accounts, and monitor financial goals in a simple, intuitive way.',
    meta: [
      { label: 'Role', value: 'UX/UI Designer' },
      { label: 'Duration', value: '3 weeks' },
      { label: 'Type', value: 'Web Dashboard' },
      { label: 'Tool', value: 'Figma' },
    ],
    figma:
      'https://www.figma.com/proto/0mdssloyp8eCSXT0xN2CER/WelthOS?node-id=1-1448&p=f&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A1448&page-id=0%3A1',
    overview: [
      'Most people struggle to track where their money goes, understand their spending patterns, and manage multiple accounts in one place. Existing finance tools are often too complex, data-heavy, and not beginner-friendly.',
      'The goal was a clean, user-friendly dashboard that simplifies financial tracking for both first-time and returning users.',
    ],
    targetUsers: [
      'Young professionals (20–35)',
      'Freelancers managing multiple income sources',
      'Beginners in personal finance',
    ],
    designGoals: [
      'Reduce information overload',
      'Make financial data beginner-friendly',
      'Balance aesthetics with readability',
    ],
    persona: {
      name: 'Naga Charan',
      sub: '27 · Marketing Executive',
      goals: ['Track monthly expenses', 'Save more money', 'Understand spending habits'],
      pains: ['Uses spreadsheets — too manual', 'Finance apps feel complicated', 'Hard to visualize where money goes'],
    },
    flow: [
      'User logs in to the dashboard',
      'Views the dashboard overview with key metrics',
      'Checks balances across accounts',
      'Analyzes expenses by category and trend',
      'Sets and tracks financial goals',
    ],
    wireframes: [{ src: welthos_wireframes, caption: 'Wireframes' }],
    wireframesLayout: 'wide',
    finalUI: [
      { src: welthos_overview, caption: 'Overview' },
      { src: welthos_overview_2, caption: 'Overview — detail' },
      { src: welthos_balances, caption: 'Balances' },
      { src: welthos_account_details, caption: 'Account details' },
    ],
    finalUILayout: 'desktop',
    usabilityTesting: [
      'Tested with 3 users on an interactive Figma prototype',
      'Renamed sidebar items to be more intuitive',
      'Reorganized the layout to prioritize key metrics at the top',
      'Added spacing and section dividers for readability',
      'Simplified data cards to reduce cognitive load',
    ],
    learnings: [
      'Prioritizing content matters more than adding features',
      'Simple layouts improve usability more than complex visuals',
      'Early wireframing caught structural issues before UI',
      'Clear navigation and data hierarchy are crucial in dashboards',
    ],
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
