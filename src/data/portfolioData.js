/* =============================================
   PORTFOLIO DATA — EDIT YOUR INFO HERE
   All personal content is centralized in this
   file. Update values below to personalize
   your portfolio.

   Project copy must stay factual: describe only
   what is shipped, and mark anything else as
   concept / in development.
   ============================================= */

export const personalInfo = {
  name: 'Aayush Kumar',
  initials: 'AK',
  role: 'Full Stack Software Engineer',
  email: 'aayushkumar3238@gmail.com',
  phone: '+91-9891157420',
  location: 'India',
  resumePath: '/resume.pdf',
  github: 'https://github.com/Aayush3238',
  githubUsername: 'Aayush3238',
  leetcode: 'https://leetcode.com/u/kumar_aayussh/',
  leetcodeUsername: 'kumar_aayussh',
  linkedin: 'https://www.linkedin.com/in/aayush-kumar-0b17a1316/',
  twitter: '',
};

export const heroHeadline = {
  line1: 'I build software.',
  line2: 'Then make it smarter.',
};

export const heroIntro = `Full stack engineer focused on clean architecture, fast interfaces, and systems that hold up under real usage. Currently exploring how LLMs and agents fit into everyday developer tools.`;

export const projects = [
  {
    slug: 'devpilot',
    title: 'DevPilot',
    tagline:
      'AI development workspace for repository understanding and coding-solution improvement.',
    status: 'In development',
    year: '2026',
    featured: true,
    theme: 'dark',
    visual: 'repo',
    problem:
      'Context in a large repository is spread across files, history and conventions. Rebuilding that context by hand is the slow part of making a change.',
    approach:
      'DevPilot is being designed as a workspace that maps a repository, retrieves the parts a task actually touches, and keeps them beside the code being edited. Architecture and model choices are still open — nothing below is shipped yet.',
    outcome: 'In development. No production usage, metrics or benchmarks to report yet.',
    notes: [
      'Positioning and scope come from the product brief; every capability listed here is a design target, not a released feature.',
      'No public repository or live demo yet — links are added once the first working build exists.',
    ],
    features: [
      { text: 'Repository map — browse a codebase as a connected structure', status: 'planned' },
      { text: 'Context retrieval — surface the files a task actually touches', status: 'planned' },
      { text: 'Solution review — check a proposed change against existing conventions', status: 'planned' },
    ],
    tech: [],
    github: '',
    live: '',
  },
  {
    slug: 'codelens',
    title: 'CodeLens',
    tagline:
      'AI coaching platform for competitive programming: code analysis, chat guidance and revision plans over your own solving history.',
    status: 'Built',
    year: '2026',
    featured: false,
    theme: 'dark',
    visual: 'coach',
    problem:
      'Practice is fragmented — submissions, weak topics and revision plans live in different places, so progress is hard to act on.',
    approach:
      'Built a full-stack coach: LeetCode history is synced and stored through Prisma on PostgreSQL, cached in Redis, and analysed with the OpenAI API. The client is React 18 with Zustand and TanStack Query so sync state stays predictable.',
    outcome:
      'Shipped as a documented application: AI analysis and chat, dashboards, revision plans and OAuth login, with a 13-model schema and Swagger API documentation.',
    notes: [
      'Refresh-token auth, rate limiting and audit logging are part of the backend contract.',
      'Charts and mastery tracking run on data the app itself records — no external analytics.',
    ],
    features: [
      { text: 'Code analysis with complexity, pattern and optimisation feedback', status: 'working' },
      { text: 'AI chat coach with stored conversations and generated revision plans', status: 'working' },
      { text: 'LeetCode sync, GitHub stats and Google/GitHub OAuth login', status: 'working' },
      { text: 'Dashboards for topic mastery, difficulty progression and submissions', status: 'working' },
      { text: 'PostgreSQL + Prisma schema, Redis cache, Zod validation, Swagger docs', status: 'working' },
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis', 'OpenAI API', 'Tailwind CSS'],
    github: 'https://github.com/Aayush3238/CodeLens',
    live: '',
  },
  {
    slug: 'homehive',
    title: 'HomeHive',
    tagline:
      'A secure property marketplace built around real-time communication, role-based workflows, and a smooth experience for buyers, owners, and admins.',
    status: 'Live',
    year: '2025',
    featured: false,
    theme: 'light',
    visual: 'marketplace',
    problem:
      'Property platforms need strong trust, fast communication, and role-aware workflows across different user types.',
    approach:
      'Created a full marketplace experience with encrypted chat, location-aware search, and streamlined request flows.',
    outcome:
      'Deployed production marketplace handling real-time messaging, media pipelines, and geospatial search.',
    notes: [
      'Session state lives in a custom store so authentication survives reconnects.',
      'Media is processed once on upload and served as responsive variants.',
    ],
    features: [
      {
        text: 'Encrypted real-time messaging using Socket.IO with RSA-OAEP encryption',
        status: 'working',
      },
      {
        text: 'Cloud media pipeline using Cloudinary with compression and responsive srcset generation',
        status: 'working',
      },
      {
        text: 'Custom session store, geospatial search and buy-request workflows with PostgreSQL and Prisma',
        status: 'working',
      },
    ],
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Socket.IO', 'Cloudinary'],
    github: 'https://github.com/Aayush3238/homehive',
    live: 'https://homehive-w3xm.onrender.com/',
  },
  {
    slug: 'pixelflow',
    title: 'PixelFlow',
    tagline:
      'A performance-focused image delivery platform that makes media-heavy apps feel faster through smart resizing, format negotiation, and on-demand transformations.',
    status: 'Live',
    year: '2025',
    featured: false,
    theme: 'light',
    visual: 'media',
    problem: 'Media-heavy products need fast delivery without sacrificing quality or developer control.',
    approach:
      'Built a high-throughput image pipeline that improves delivery efficiency and simplifies content handling for scale.',
    outcome: 'Production image platform with authenticated APIs and a full management dashboard.',
    notes: [
      'Variants are generated once and reused — the hot path is a cache lookup.',
      'Three authentication layers: session JWT, Google OAuth and scoped API keys.',
    ],
    features: [
      {
        text: 'Delivery pipeline with Sharp, Redis and object storage for optimized image variants',
        status: 'working',
      },
      {
        text: 'REST APIs with JWT, Google OAuth 2.0, API keys, rate limiting and input validation',
        status: 'working',
      },
      {
        text: 'React dashboard with batch uploads, analytics, folders, search and upload progress',
        status: 'working',
      },
    ],
    tech: ['React.js', 'Express.js', 'Redis', 'Sharp'],
    github: 'https://github.com/Aayush3238/pixelflow',
    live: 'https://pixel-flow-ashy.vercel.app/dashboard',
  },
  {
    slug: 'aicsvimporter',
    title: 'AiCSVImporter',
    tagline:
      'AI-powered CSV importer that maps messy lead spreadsheets into a fixed CRM schema using Gemini structured output.',
    status: 'Built',
    year: '2026',
    featured: false,
    theme: 'light',
    visual: 'csv',
    problem:
      'Leads arrive as arbitrary CSV columns that never match the CRM schema, and manual cleanup does not scale.',
    approach:
      'The browser previews and validates the file locally, then an Express backend splits rows into batches and asks Gemini for JSON against an explicit schema — validating and sanitising every response, and skipping rows it cannot map instead of guessing.',
    outcome:
      'Feature-complete, stateless import flow: batched processing, imported/skipped reporting, and CSV plus Excel export. No database, auth or background jobs.',
    notes: [
      'Prompt contract is explicit: do not invent values, keep the original row index, skip only rows with neither email nor mobile.',
      'Shared constants keep frontend and backend agreed on the same CRM fields and enums.',
    ],
    features: [
      { text: 'Local preview and validation before any backend call', status: 'working' },
      { text: 'Batched Gemini mapping with retry, validation and sanitisation', status: 'working' },
      { text: 'Imported/skipped report with CSV and Excel download', status: 'working' },
    ],
    tech: ['Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Gemini API', 'Papa Parse'],
    github: 'https://github.com/Aayush3238/AiCSVImporter',
    live: '',
  },
];

export const experience = [
  {
    type: 'work',
    title: 'Software Developer Intern',
    company: 'Nexera',
    date: 'Feb 2026 – Present',
    location: 'Remote',
    description:
      'Contributing to the development of a scalable full-stack learning platform using React.js, Next.js, Node.js, Express.js, and PostgreSQL.',
    bullets: [
      'Implemented secure Google OAuth authentication and session management for seamless user login and access control.',
      'Developed backend APIs and frontend workflows for the course doubt management system, enabling efficient student-mentor interaction.',
      'Integrated Redis to implement a real-time course like counter, improving responsiveness and reducing repeated database operations.',
      'Built responsive UI components and developed admin functionalities for managing platform content and user operations.',
    ],
  },
];

export const education = [
  {
    degree: 'B.Tech in Computer Science Engineering',
    school: 'Maharaja Agrasen Institute of Technology',
    date: 'Expected Graduation: 2028',
    detail: 'Current CGPA: 8.28/10',
  },
];

export const skillGroups = [
  {
    id: 'languages',
    title: 'Languages & fundamentals',
    items: ['C++', 'JavaScript', 'Python', 'SQL', 'Data Structures & Algorithms', 'OOP', 'DBMS'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    id: 'backend',
    title: 'Backend & data',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT Auth',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Prisma',
      'Socket.IO',
    ],
  },
  {
    id: 'ai',
    title: 'AI integration',
    note: 'Growing area — driven by shipped AI features and DevPilot.',
    items: [
      'OpenAI API',
      'Gemini API',
      'Structured LLM output',
      'Agentic workflows (exploring)',
      'Retrieval over codebases (exploring)',
    ],
  },
];

export const principles = [
  {
    title: 'Backend clarity first',
    desc: 'Strong systems begin with clean data handling, reliable contracts, and predictable behavior.',
  },
  {
    title: 'Keep the experience smooth',
    desc: 'A polished interface is only valuable when the underlying flow is fast, resilient, and intuitive.',
  },
  {
    title: 'Ship with purpose',
    desc: 'Features should solve real friction and improve the user journey, not add surface-level complexity.',
  },
  {
    title: 'Measure, then optimize',
    desc: 'Profiling beats guesswork. I find the actual bottleneck before touching performance.',
  },
];

/* Interactive workflow sketch shown in the Lab section.
   These are design targets for DevPilot — not a running system. */
export const workflowStages = [
  {
    id: 'map',
    index: '01',
    label: 'Map',
    title: 'Read the repository',
    desc: 'Parse structure, entry points and dependencies into a navigable graph of the codebase.',
    logs: ['$ devpilot map ./repo', '→ indexing files', '→ graph built', '→ conventions detected'],
  },
  {
    id: 'retrieve',
    index: '02',
    label: 'Retrieve',
    title: 'Pull only what matters',
    desc: 'For a given task, retrieve the files, symbols and prior decisions it actually touches.',
    logs: ['$ devpilot ctx "fix auth refresh"', '→ 9 files matched', '→ 3 symbols in scope', '→ context packed: 6.2k tokens'],
  },
  {
    id: 'plan',
    index: '03',
    label: 'Plan',
    title: 'Draft against conventions',
    desc: 'Propose an approach measured against the repository’s existing patterns instead of generic advice.',
    logs: ['$ devpilot plan', '→ reading session/store.js', '→ 2 similar changes found', '→ plan drafted (concept)'],
  },
  {
    id: 'review',
    index: '04',
    label: 'Review',
    title: 'Check before it lands',
    desc: 'Compare the proposed change against tests, contracts and review rules before anything is merged.',
    logs: ['$ devpilot review', '→ contract check: pending', '→ tests: not run', '→ status: concept only'],
  },
];

export const socials = [
  { label: 'GitHub', url: personalInfo.github, key: 'github' },
  { label: 'LinkedIn', url: personalInfo.linkedin, key: 'linkedin' },
  { label: 'LeetCode', url: personalInfo.leetcode, key: 'leetcode' },
];
