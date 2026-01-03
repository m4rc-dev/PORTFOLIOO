
export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  url: string;
  // Added properties to resolve missing field errors in ProjectCard.tsx
  image: string;
  year: string;
  tags: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  status?: 'latest' | 'past';
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}