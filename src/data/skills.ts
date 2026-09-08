export interface SkillItem {
  id: string;
  name: string;
  category:
    | 'Programming'
    | 'Automation & Testing'
    | 'Full Stack Development'
    | 'Cloud & DevOps'
    | 'Video Editing'
    | 'Graphics Design'
    | string;
  icon: string;
  level: number;
  yearsOfExp: number;
  description: string;
  color: string;
  borderColor: string;
  badge?: string;
  relatedProjects: string[];
}

export interface OrbitSkill {
  id: string;
  name: string;
  icon: string;
  level: number;
  borderColor: string;
  category: string;
}

export const orbitalSkills: OrbitSkill[] = [
  { id: 'python', name: 'Python', icon: 'FileCode', level: 94, borderColor: '#3B82F6', category: 'Programming' },
  { id: 'selenium', name: 'Selenium WebDriver', icon: 'Bot', level: 95, borderColor: '#10B981', category: 'Automation' },
  { id: 'fullstack', name: 'Full Stack Dev', icon: 'Code2', level: 92, borderColor: '#8B5CF6', category: 'Full Stack' },
  { id: 'aws', name: 'AWS Cloud', icon: 'Cloud', level: 88, borderColor: '#F59E0B', category: 'Cloud & DevOps' },
  { id: 'video-editing', name: 'Video Editing', icon: 'Film', level: 90, borderColor: '#EC4899', category: 'Creative' },
  { id: 'graphics-design', name: 'Graphics Design', icon: 'Palette', level: 88, borderColor: '#06B6D4', category: 'Design' },
];

export const skillsData: SkillItem[] = [
  // Top Row:
  // 1. Python
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    icon: 'Terminal',
    level: 94,
    yearsOfExp: 2,
    description: 'Python programming for backend development, automated scripting, and REST APIs.',
    color: 'from-blue-500 to-cyan-500',
    borderColor: '#3B82F6',
    badge: 'Popular',
    relatedProjects: ['Sunbond WhatsApp Automation', 'Python Third-Party Integration'],
  },
  // 2. Selenium Automation Testing
  {
    id: 'selenium-automation-testing',
    name: 'Selenium Automation Testing',
    category: 'Automation & Testing',
    icon: 'Bot',
    level: 95,
    yearsOfExp: 2,
    description: 'UI automation test suites using Selenium WebDriver with Python, POM architecture, and CI/CD integration.',
    color: 'from-emerald-500 to-green-500',
    borderColor: '#10B981',
    badge: 'Testing',
    relatedProjects: ['Sunbond WhatsApp Automation', 'Troudz ROI Calculator'],
  },
  // 3. Full Stack Developer
  {
    id: 'full-stack-developer',
    name: 'Full Stack Developer',
    category: 'Full Stack Development',
    icon: 'Code2',
    level: 92,
    yearsOfExp: 2,
    description: 'Full-stack web apps with modern React frontends, Python backends (Django/Flask), and MySQL databases.',
    color: 'from-purple-500 to-indigo-500',
    borderColor: '#8B5CF6',
    badge: 'Full Stack',
    relatedProjects: ['NextGen Glassmorphism Portfolio', 'Cloud Sentinel Dashboard'],
  },

  // Bottom Row:
  // 4. AWS
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud & DevOps',
    icon: 'Cloud',
    level: 88,
    yearsOfExp: 2,
    description: 'Cloud infrastructure management with AWS EC2, S3, Lambda, and CloudWatch monitoring.',
    color: 'from-amber-500 to-orange-500',
    borderColor: '#F59E0B',
    badge: 'Cloud',
    relatedProjects: ['Cloud Sentinel Infrastructure', 'CI/CD Cloud Deployments'],
  },
  // 5. Video Editing
  {
    id: 'video-editing',
    name: 'Video Editing',
    category: 'Video Editing',
    icon: 'Film',
    level: 90,
    yearsOfExp: 2,
    description: 'Video production, motion graphics, and visual storytelling using modern editing suites.',
    color: 'from-pink-500 to-rose-500',
    borderColor: '#EC4899',
    badge: 'Creative',
    relatedProjects: ['Promotional Showcases', 'Product Demo Videos'],
  },
  // 6. Graphics Design
  {
    id: 'graphics-design',
    name: 'Graphics Design',
    category: 'Graphics Design',
    icon: 'Palette',
    level: 88,
    yearsOfExp: 2,
    description: 'Visual identity design, digital UI/UX assets, and modern creative graphics.',
    color: 'from-cyan-400 to-teal-500',
    borderColor: '#06B6D4',
    badge: 'Design',
    relatedProjects: ['Brand Identity Systems', 'UI/UX Interface Designs'],
  },
];
