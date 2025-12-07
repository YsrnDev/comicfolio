import { Project, Skill, Experience, TechGadget } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "The Neon Dashboard",
    description: "A high-performance analytics dashboard built for the cyber-police. React, D3.js, and real-time data streaming.",
    tags: ["React", "D3.js", "WebSockets"],
    imageUrl: "https://picsum.photos/600/400?random=1",
    link: "#"
  },
  {
    id: 2,
    title: "AI Story Generator",
    description: "Harnessing the power of Gemini to generate infinite comic plots. A creative tool for the modern writer.",
    tags: ["Gemini API", "Node.js", "TypeScript"],
    imageUrl: "https://picsum.photos/600/400?random=2",
    link: "#"
  },
  {
    id: 3,
    title: "Pixel Commerce",
    description: "An e-commerce platform with a retro 8-bit aesthetic but modern performance scores.",
    tags: ["Next.js", "Tailwind", "Stripe"],
    imageUrl: "https://picsum.photos/600/400?random=3",
    link: "#"
  }
];

export const SKILLS: Skill[] = [
  { name: "Frontend Engineering", level: 95, color: "bg-comic-secondary" },
  { name: "React / React Native", level: 90, color: "bg-comic-accent" },
  { name: "Node.js Backend", level: 80, color: "bg-comic-alert" },
  { name: "AI Integration", level: 85, color: "bg-green-400" },
];

export const TECH_GADGETS: TechGadget[] = [
  { id: 'vs', name: 'VS Code', icon: '💻', description: 'The main command center.' },
  { id: 'git', name: 'Git', icon: '🌿', description: 'Time travel device.' },
  { id: 'figma', name: 'Figma', icon: '🎨', description: 'Blueprint generator.' },
  { id: 'docker', name: 'Docker', icon: '🐳', description: 'Containment unit.' },
  { id: 'postman', name: 'Postman', icon: '🚀', description: 'Signal tester.' },
  { id: 'npm', name: 'NPM', icon: '📦', description: 'Supply crate.' },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Senior Tech Lead",
    company: "Avengers Tech Division",
    period: "2022 - PRESENT",
    description: "Leading a squad of elite developers to build scalable defense systems using Microservices architecture.",
    side: 'left'
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Stark Industries",
    period: "2020 - 2022",
    description: "Developed the UI for the Mark L suit interface. Optimized React performance by 40%.",
    side: 'right'
  },
  {
    id: 3,
    role: "Junior Web Slinger",
    company: "Daily Bugle Web Team",
    period: "2018 - 2020",
    description: "Maintained the news portal. Squashed bugs faster than a spider catches flies.",
    side: 'left'
  }
];

export const SOCIAL_LINKS = {
  github: "https://github.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com"
};