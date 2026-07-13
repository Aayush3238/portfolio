import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython,
  FaGit, FaDatabase, FaCode
} from 'react-icons/fa';
import {
  SiTailwindcss, SiExpress, SiMongodb, SiPostgresql,
  SiRedis, SiPostman, SiSocketdotio, SiCplusplus
} from 'react-icons/si';

/* =============================================
   PORTFOLIO DATA — EDIT YOUR INFO HERE
   All personal content is centralized in this
   file. Update values below to personalize
   your portfolio.
   ============================================= */

export const personalInfo = {
  name: 'Aayush Kumar',
  role: 'Full Stack Web Developer',
  tagline: 'Software Engineer',
  email: 'aayushkumar3238@gmail.com',
  phone: '+91-9891157420',
  location: 'India',
  resumePath: '/resume.pdf',
  /* =============================================
     REPLACE: Add your actual URLs below
     ============================================= */
  github: 'https://github.com/Aayush3238',
  linkedin: 'https://www.linkedin.com/in/aayush-kumar-0b17a1316/',
  twitter: '',  /* add if available */
  portfolio: '',
};

export const heroIntro = `I build full-stack applications and scalable backend systems using React, Node.js, Express.js, MongoDB, and PostgreSQL. I'm passionate about backend engineering, REST APIs, performance optimization, and writing clean, maintainable code.`;

export const aboutParagraphs = [
  "I'm a Software Engineering student at Maharaja Agrasen Institute of Technology, pursuing B.Tech in Computer Science Engineering (Expected Graduation: 2028) with a CGPA of 8.28/10.",
  "I have hands-on experience building full-stack applications and scalable backend systems. Currently working as a Software Developer Intern at Nexera, where I contribute to a full-stack learning platform using React.js, Next.js, Node.js, Express.js, and PostgreSQL.",
  "I'm passionate about backend engineering, REST APIs, performance optimization, and writing clean, maintainable code. I enjoy solving complex problems and building products that make a real impact.",
];

export const highlights = [
  {
    icon: 'FaCode',
    title: 'Full Stack Development',
    desc: 'Building end-to-end web applications with React, Node.js, Express.js, and modern databases.',
  },
  {
    icon: 'FaRocket',
    title: 'Performance Optimization',
    desc: 'Designing high-performance pipelines, caching with Redis, and optimizing delivery systems.',
  },
  {
    icon: 'FaDatabase',
    title: 'Backend Engineering',
    desc: 'Building scalable REST APIs, real-time systems with Socket.IO, and secure authentication flows.',
  },
];

export const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'C++', icon: SiCplusplus, color: '#00599C' },
      { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
      { name: 'Python', icon: FaPython, color: '#3776ab' },
      { name: 'SQL', icon: FaDatabase, color: '#4169e1' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', icon: FaReact, color: '#61dafb' },
      { name: 'Next.js', icon: FaReact, color: '#ffffff' },
      { name: 'HTML5', icon: FaHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: FaNodeJs, color: '#68a063' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'REST APIs', icon: FaCode, color: '#6c63ff' },
      { name: 'JWT Auth', icon: FaCode, color: '#e942f5' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
      { name: 'Redis', icon: SiRedis, color: '#dc382d' },
      { name: 'Supabase', icon: FaDatabase, color: '#3ecf8e' },
    ],
  },
  {
    title: 'Libraries',
    skills: [
      { name: 'Socket.IO', icon: SiSocketdotio, color: '#010101' },
      { name: 'Sharp', icon: FaCode, color: '#6c63ff' },
      { name: 'Prisma', icon: FaDatabase, color: '#2d3748' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: FaGit, color: '#f05032' },
      { name: 'GitHub', icon: FaGit, color: '#ffffff' },
      { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
      { name: 'VS Code', icon: FaCode, color: '#007acc' },
    ],
  },
  {
    title: 'Core CS',
    skills: [
      { name: 'DSA', icon: FaCode, color: '#6c63ff' },
      { name: 'OOP', icon: FaCode, color: '#e942f5' },
      { name: 'DBMS', icon: FaDatabase, color: '#00b4d8' },
      { name: 'REST API Design', icon: FaCode, color: '#68a063' },
    ],
  },
];

export const projects = [
  {
    title: 'PixelFlow',
    description: 'An adaptive image delivery platform with real-time optimization through intelligent format negotiation, responsive resizing, and on-demand transformations.',
    tech: ['React.js', 'Express.js', 'Redis', 'Sharp'],
    features: [
      'High-performance delivery pipeline with Sharp, Redis, and object storage for optimized image variants',
      'Secure REST APIs with JWT, Google OAuth 2.0, API key authentication, rate limiting, and input validation',
      'React dashboard with batch uploads, analytics, folder management, image search, and real-time upload progress',
    ],
    github: 'https://github.com/Aayush3238/pixelflow',
    live: 'https://pixel-flow-ashy.vercel.app/dashboard',
    image: null,
  },
  {
    title: 'HomeHive',
    description: 'A full-stack property marketplace supporting secure buyer-owner workflows with role-based access control, Google OAuth 2.0, and real-time encrypted messaging.',
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Socket.IO'],
    features: [
      'Encrypted real-time messaging using Socket.IO with RSA-OAEP encryption',
      'Cloud-based media pipeline using Cloudinary with automatic compression and responsive srcset generation',
      'Custom session store, geospatial search, and buy-request workflows with PostgreSQL and Prisma',
    ],
    github: 'https://github.com/Aayush3238/homehive',
    live: 'https://homehive-w3xm.onrender.com/',
    image: null,
  },
];

export const experience = [
  {
    type: 'work',
    title: 'Software Developer Intern',
    company: 'Nexera',
    date: 'Feb 2026 – Present',
    location: 'Remote',
    description: 'Contributing to the development of a scalable full-stack learning platform using React.js, Next.js, Node.js, Express.js, and PostgreSQL.',
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

export const achievements = [
  {
    title: 'Software Developer Intern at Nexera',
    desc: 'Contributing to a scalable full-stack learning platform with modern web technologies.',
  },
  {
    title: 'Full Stack Project Portfolio',
    desc: 'Built and deployed multiple production-grade projects including PixelFlow and HomeHive.',
  },
  {
    title: 'Strong DSA Foundation',
    desc: 'Proficient in Data Structures & Algorithms, OOP, DBMS, and REST API Design.',
  },
];

export const stats = [
  { label: 'Projects Completed', value: 5, suffix: '+' },
  { label: 'Technologies', value: 20, suffix: '+' },
  { label: 'Months Experience', value: 6, suffix: '+' },
  { label: 'GitHub Contributions', value: 500, suffix: '+' },
];

export const techMarquee = [
  'React.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL',
  'Redis', 'Socket.IO', 'TypeScript', 'Python', 'C++',
  'Tailwind CSS', 'Prisma', 'Git', 'REST APIs', 'JWT',
];

export const certifications = [];
export const codingProfiles = [];
