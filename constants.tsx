
import { Project, Experience, SkillGroup, Certification } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'CodeCred',
    description: 'Online certifications for programmers',
    link: 'codecred.dev',
    url: '#',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    year: '2024',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind']
  },
  {
    id: '2',
    title: 'BASE404',
    description: 'Online coding bootcamp',
    link: 'base-404.com',
    url: '#',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
    year: '2023',
    tags: ['React', 'Node.js', 'AWS']
  },
  {
    id: '3',
    title: 'DIIN.PH',
    description: 'AI-powered wardrobe assistant',
    link: 'diin.ph',
    url: '#',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    year: '2024',
    tags: ['Python', 'PyTorch', 'Vue']
  },
  {
    id: '4',
    title: 'DYNAMIS Workout Tracker',
    description: 'AI-powered workout tracker',
    link: 'dynamis-app.online',
    url: '#',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    year: '2023',
    tags: ['React Native', 'Firebase']
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'BS Information Technology',
    company: 'University of Cebu',
    period: '2022 - 2026',
    status: 'latest'
  },
  {
    role: 'Freelance Developer',
    company: 'Small Projects',
    period: '2025 - Present'
  },
  {
    role: 'Tech Community Member',
    company: 'Local IT Groups & Orgs',
    period: '2025 - Present'
  },
  {
    role: 'Hello World! 👋',
    company: 'University of Cebu',
    period: '2022'
  }
];

export const SKILLS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'SCSS', 'Styled Components', 'Vite', 'Webpack', 'ESLint', 'Prettier']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Python', 'Java', 'PHP', 'Express.js', 'NestJS', 'FastAPI', 'Laravel', 'PostgreSQL', 'MySQL', 'MongoDB', 'OAuth', 'JWT', 'REST',]
  },
  {
    category: 'DevOps & Cloud',
    skills: ['GitHub Actions', 'GitLab CI', 'Docker']
  },
  {
    category: 'AI & Machine Learning',
    skills: ['PyTorch', 'LangChain', 'OpenAI', 'Anthropic', 'Hugging Face', 'AutoGPT']
  },

  {
    category: 'Developer Tools',
    skills: ['Git', 'GitHub', 'GitLab', 'VS Code', 'JetBrains IntelliJ', 'PyCharm']
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: 'Huawei Developer Expert', issuer: 'Huawei' },
  { title: 'Generative AI Leader', issuer: 'Google' },
  { title: 'Google Analytics', issuer: 'Google' },
  { title: 'Digital Marketing', issuer: 'Google' },
  { title: 'Software Engineering', issuer: 'TestDome' },
  { title: 'JavaScript', issuer: 'TestDome' },
  { title: 'PHP', issuer: 'TestDome' },
  { title: 'Python', issuer: 'TestDome' },
  { title: 'SQL', issuer: 'TestDome' },
  { title: 'Scrum Master', issuer: 'TestDome' },
  { title: 'Lean Six Sigma White Belt', issuer: 'Management & Strategy Institute' },
  { title: 'Project Management Certified', issuer: 'Management & Strategy Institute' },
  { title: 'Certified Kanban Associate', issuer: 'International Scrum Institute™' },
  { title: 'Scrum Associate', issuer: 'International Scrum Institute™' },
  { title: 'Diploma in Project Management', issuer: 'Alison' },
  { title: 'Cybersecurity Certificate', issuer: 'Trend Micro' },
  { title: 'Monitoring Kubernetes', issuer: 'Datadog' },
  { title: 'Certified Cloud Practitioner', issuer: 'Amazon Web Services (AWS)' },
  { title: 'Generative AI Certified Professional', issuer: 'Oracle' }
];

export const MEMBERSHIPS = [
  { name: 'Analytics & Artificial Intelligence Association of the Philippines (AAP)', link: '#' },
  { name: 'Philippine Software Industry Association', link: '#' }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540317580114-ed684c054c9d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524178232327-1fcb16223a63?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80'
];
