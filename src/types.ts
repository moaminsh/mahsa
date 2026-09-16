export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  link?: string;
  status: 'Completed' | 'In Progress' | 'Concept';
}

export interface SkillItem {
  name: string;
  category: string;
  level: number;
}

export interface NoteItem {
  id: string;
  title: string;
  date: string;
  snippet: string;
  category: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
