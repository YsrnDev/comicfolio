export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export interface Skill {
  id?: number; // Optional for creation, required for fetch
  name: string;
  level: number; // 0 to 100
  color: string;
}

export interface TechGadget {
  id: string;
  name: string;
  icon: string; // Emoji or short text for now
  description: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  side: 'left' | 'right';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Message {
  id: string;
  codename: string;
  email: string;
  content: string;
  timestamp: number;
  read: boolean;
}

export type ViewState = 'home' | 'login' | 'dashboard';
