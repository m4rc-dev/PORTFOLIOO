
import { Project, Experience, SkillGroup, Certification } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Authentiq',
    description: 'Digital asset verification with AI',
    link: 'https://authentiqq.vercel.app/',
    url: 'https://authentiqq.vercel.app/',

    year: '2025',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'SkillPath',
    description: 'Personalized learning and roadmap tracker.',
    link: 'https://skill-pathh.vercel.app/',
    url: 'https://skill-pathh.vercel.app/',

    year: '2025',
    tags: ['React', 'TypeScript', 'Capacitor']
  },
  {
    id: '3',
    title: 'HabitWork',
    description: 'Habit tracker with visual analytics.',
    link: 'https://habit-work.vercel.app/',
    url: 'https://habit-work.vercel.app/',

    year: '2025',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Recharts']
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Real-time interactive weather dashboard.',
    link: 'https://weather-dashboarddd.vercel.app/',
    url: 'https://weather-dashboarddd.vercel.app/',

    year: '2025',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Recharts', 'Radix UI']
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
    role: 'IT Intern',
    company: 'Ongoing Internship',
    period: '2026',
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
    role: 'Open Source Contributor',
    company: 'GitHub',
    period: '2023 - Present'
  },
  {
    role: 'Personal Projects',
    company: 'Self-driven Lab',
    period: '2024 - Present'
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
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
];
