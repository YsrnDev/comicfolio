import Database from 'better-sqlite3';

export const db = new Database('comicfolio.db');

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Initialize Database Schema
const initDB = () => {
  // User Table (Better Auth)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      emailVerified INTEGER NOT NULL,
      image TEXT,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
    )
  `);

  // Session Table (Better Auth)
  db.exec(`
    CREATE TABLE IF NOT EXISTS session (
      id TEXT PRIMARY KEY,
      expiresAt INTEGER NOT NULL,
      token TEXT NOT NULL,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL,
      ipAddress TEXT,
      userAgent TEXT,
      userId TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    )
  `);

  // Account Table (Better Auth)
  db.exec(`
    CREATE TABLE IF NOT EXISTS account (
      id TEXT PRIMARY KEY,
      accountId TEXT NOT NULL,
      providerId TEXT NOT NULL,
      userId TEXT NOT NULL,
      accessToken TEXT,
      refreshToken TEXT,
      accessTokenExpiresAt INTEGER,
      refreshTokenExpiresAt INTEGER,
      password TEXT,
      scope TEXT,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    )
  `);

  // Verification Table (Better Auth)
  db.exec(`
    CREATE TABLE IF NOT EXISTS verification (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      expiresAt INTEGER NOT NULL,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
    )
  `);

  // Projects Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      tags TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      link TEXT
    )
  `);

  // Experiences Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      period TEXT NOT NULL,
      description TEXT NOT NULL,
      side TEXT NOT NULL
    )
  `);

  // Messages Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      codename TEXT NOT NULL,
      email TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      read INTEGER DEFAULT 0
    )
  `);

  // Skills Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      level INTEGER NOT NULL,
      color TEXT NOT NULL
    )
  `);

  // Gadgets Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS gadgets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `);

  // Seed Data if empty
  const projectCount = db.prepare('SELECT count(*) as count FROM projects').get() as { count: number };
  if (projectCount.count === 0) {
    console.log('Seeding Projects...');
    const insertProject = db.prepare(`
      INSERT INTO projects (title, description, tags, imageUrl, link)
      VALUES (@title, @description, @tags, @imageUrl, @link)
    `);

    const projects = [
      {
        title: "The Neon Dashboard",
        description: "A high-performance analytics dashboard built for the cyber-police. React, D3.js, and real-time data streaming.",
        tags: JSON.stringify(["React", "D3.js", "WebSockets"]),
        imageUrl: "https://picsum.photos/600/400?random=1",
        link: "#"
      },
      {
        title: "AI Story Generator",
        description: "Harnessing the power of Gemini to generate infinite comic plots. A creative tool for the modern writer.",
        tags: JSON.stringify(["Gemini API", "Node.js", "TypeScript"]),
        imageUrl: "https://picsum.photos/600/400?random=2",
        link: "#"
      },
      {
        title: "Pixel Commerce",
        description: "An e-commerce platform with a retro 8-bit aesthetic but modern performance scores.",
        tags: JSON.stringify(["Next.js", "Tailwind", "Stripe"]),
        imageUrl: "https://picsum.photos/600/400?random=3",
        link: "#"
      }
    ];

    projects.forEach(p => insertProject.run(p));
  }

  const expCount = db.prepare('SELECT count(*) as count FROM experiences').get() as { count: number };
  if (expCount.count === 0) {
    console.log('Seeding Experiences...');
    const insertExp = db.prepare(`
      INSERT INTO experiences (role, company, period, description, side)
      VALUES (@role, @company, @period, @description, @side)
    `);

    const experiences = [
      {
        role: "Senior Tech Lead",
        company: "Avengers Tech Division",
        period: "2022 - PRESENT",
        description: "Leading a squad of elite developers to build scalable defense systems using Microservices architecture.",
        side: 'left'
      },
      {
        role: "Full Stack Developer",
        company: "Stark Industries",
        period: "2020 - 2022",
        description: "Developed the UI for the Mark L suit interface. Optimized React performance by 40%.",
        side: 'right'
      },
      {
        role: "Junior Web Slinger",
        company: "Daily Bugle Web Team",
        period: "2018 - 2020",
        description: "Maintained the news portal. Squashed bugs faster than a spider catches flies.",
        side: 'left'
      }
    ];

    experiences.forEach(e => insertExp.run(e));
  }

  const skillCount = db.prepare('SELECT count(*) as count FROM skills').get() as { count: number };
  if (skillCount.count === 0) {
    console.log('Seeding Skills...');
    const insertSkill = db.prepare(`
      INSERT INTO skills (name, level, color)
      VALUES (@name, @level, @color)
    `);

    const skills = [
      { name: "Frontend Engineering", level: 95, color: "bg-comic-secondary" },
      { name: "React / React Native", level: 90, color: "bg-comic-accent" },
      { name: "Node.js Backend", level: 80, color: "bg-comic-alert" },
      { name: "AI Integration", level: 85, color: "bg-green-400" },
    ];

    skills.forEach(s => insertSkill.run(s));
  }

  const gadgetCount = db.prepare('SELECT count(*) as count FROM gadgets').get() as { count: number };
  if (gadgetCount.count === 0) {
    console.log('Seeding Gadgets...');
    const insertGadget = db.prepare(`
      INSERT INTO gadgets (id, name, icon, description)
      VALUES (@id, @name, @icon, @description)
    `);

    const gadgets = [
      { id: 'vs', name: 'VS Code', icon: '💻', description: 'The main command center.' },
      { id: 'git', name: 'Git', icon: '🌿', description: 'Time travel device.' },
      { id: 'figma', name: 'Figma', icon: '🎨', description: 'Blueprint generator.' },
      { id: 'docker', name: 'Docker', icon: '🐳', description: 'Containment unit.' },
      { id: 'postman', name: 'Postman', icon: '🚀', description: 'Signal tester.' },
      { id: 'npm', name: 'NPM', icon: '📦', description: 'Supply crate.' },
    ];

    gadgets.forEach(g => insertGadget.run(g));
  }
};

initDB();
