import project1Img from '../assets/project1.png';
import project2Img from '../assets/project2.png';
import projectWebdevImg from '../assets/project_webdev.jpg';
import projectVideoImg from '../assets/project_video.jpg';
import projectGraphicsImg from '../assets/project_graphics.jpg';
import projectScriptImg from '../assets/project_script.jpg';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Automation & Testing' | 'Web Development' | 'Video Editing' | 'Graphics Designing' | 'Script Writing';
  tag: string;
  problem: string;
  approach: string;
  outcome: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  highlights: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: 'sunbond-whatsapp-automation',
    title: 'Sunbond WhatsApp Platform',
    subtitle: 'Enterprise WhatsApp Automation & Messaging Engine',
    category: 'Automation & Testing',
    tag: 'Flagship Automation',
    problem:
      'Manual verification of bulk WhatsApp campaigns, webhooks, and delivery tracking caused critical release delays and regression bottlenecks.',
    approach:
      'Engineered an end-to-end automated test framework using Selenium (Python + Pytest) with Page Object Model (POM), validated REST APIs via Postman, and configured GitHub Actions CI/CD.',
    outcome:
      'Reduced regression testing effort by 70% and ensured 99.8% test execution reliability in production releases.',
    fullDescription:
      'Sunbond is an enterprise SaaS platform automating WhatsApp business communications and bulk campaigns. Built full test automation architecture covering UI workflows, REST APIs, and delivery pipelines.',
    features: [
      'Selenium (Python + Pytest) UI automation with Page Object Model',
      'Postman REST API testing for authentication, payloads, and webhooks',
      'End-to-end message delivery verification and retry testing',
      'Automated CI/CD test execution with GitHub Actions',
    ],
    techStack: [
      'Selenium',
      'Python',
      'Pytest',
      'POM',
      'Postman',
      'REST APIs',
      'GitHub Actions',
      'JIRA',
    ],
    image: project1Img,
    demoUrl: '#',
    githubUrl: 'https://github.com/navin-19',
    featured: true,
    metrics: [
      { label: 'Effort Saved', value: '70%' },
      { label: 'Regression Time', value: '-65%' },
      { label: 'Reliability', value: '99.8%' },
    ],
    highlights: [
      'POM architecture for clean test maintenance',
      'Automated WhatsApp Webhook & API validation',
      'GitHub Actions CI/CD feedback loop',
    ],
  },
  {
    id: 'nexus-saas-platform',
    title: 'Nexus Cloud Analytics',
    subtitle: 'Modern Full-Stack SaaS Dashboard & API Engine',
    category: 'Web Development',
    tag: 'Full-Stack SaaS',
    problem:
      'Fragmented data analytics and slow dashboard load times hindered real-time decision making for enterprise dev teams.',
    approach:
      'Architected a high-performance web platform using React 19, TypeScript, Tailwind CSS, and Python FastAPI backend with PostgreSQL and WebSocket live streams.',
    outcome:
      'Achieved sub-100ms dashboard queries, 60fps data visualization renders, and 99.9% API uptime under load.',
    fullDescription:
      'Nexus is a next-generation developer telemetry and cloud analytics web application featuring live server metrics, custom dashboards, and automated deployment alerts.',
    features: [
      'Reactive live telemetry streaming with WebSockets',
      'Modular micro-frontend architecture with React 19 & TypeScript',
      'RESTful API gateway built with Python FastAPI & PostgreSQL',
      'Interactive Chart.js data visualizations with dark/light themes',
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Python',
      'FastAPI',
      'Tailwind CSS',
      'PostgreSQL',
      'Docker',
      'WebSockets',
    ],
    image: projectWebdevImg,
    demoUrl: '#',
    githubUrl: 'https://github.com/navin-19',
    featured: true,
    metrics: [
      { label: 'Query Latency', value: '<85ms' },
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Live Uptime', value: '99.9%' },
    ],
    highlights: [
      'Sub-100ms real-time metric updates',
      'Type-safe end-to-end architecture',
      'Responsive glassmorphism dashboard',
    ],
  },
  {
    id: 'cinematic-commercial-edit',
    title: 'Aethel Cinematic Post-Production',
    subtitle: 'Commercial Brand Film, Motion Graphics & Sound Design',
    category: 'Video Editing',
    tag: 'Post-Production',
    problem:
      'Brand needed an emotionally compelling high-energy promotional film with seamless visual rhythm and custom sound design under a tight deadline.',
    approach:
      'Directed multi-camera timeline editing in Premiere Pro, color grading in DaVinci Resolve, dynamic typography in After Effects, and master stereo sound mixing.',
    outcome:
      'Delivered 4K broadcast-ready commercial viewed by 250k+ audience, generating 3.8x higher social engagement.',
    fullDescription:
      'Complete end-to-end commercial post-production project encompassing video editing, cinematic color grading, visual rhythm pacing, motion design overlays, and spatial audio mastering.',
    features: [
      '4K ProRes multi-track timeline editing & pace synchronization',
      'DaVinci Resolve color science with custom film LUT grading',
      'After Effects kinetic typography and 3D camera tracking',
      'Spatial sound design, foley layering, and audio normalization',
    ],
    techStack: [
      'Premiere Pro',
      'DaVinci Resolve',
      'After Effects',
      'Audition',
      'Color Grading',
      'Sound Design',
      'Motion VFX',
    ],
    image: projectVideoImg,
    demoUrl: '#',
    githubUrl: 'https://github.com/navin-19',
    featured: true,
    metrics: [
      { label: 'Social Reach', value: '250k+' },
      { label: 'Engagement Rate', value: '3.8x' },
      { label: 'Turnaround', value: '5 Days' },
    ],
    highlights: [
      'Pacing synchronized to custom orchestral soundtrack',
      'Accurate broadcast-compliant color grading',
      'Smooth motion graphics overlays',
    ],
  },
  {
    id: 'aura-brand-design-system',
    title: 'Aura Luxury Design System',
    subtitle: 'Brand Identity, Packaging Mockups & Digital Guidelines',
    category: 'Graphics Designing',
    tag: 'Brand & Visual',
    problem:
      'New luxury lifestyle brand lacked cohesive visual identity, typography hierarchy, and packaging presentation across digital & print mediums.',
    approach:
      'Crafted an exhaustive brand design system including custom logomark, luxury color palette, typography guidelines, 3D product mockups, and mobile UI kit.',
    outcome:
      'Established a recognizable, award-worthy visual identity adopted across 14 product lines and digital mobile commerce apps.',
    fullDescription:
      'A comprehensive brand and visual design project covering logo construction, editorial typography, vector illustration, 3D luxury packaging renders, and mobile app UI kits in Figma.',
    features: [
      'Vector logo identity and golden-ratio geometric construction',
      'Harmonized color palette with CMYK, RGB, and Pantone values',
      'Photorealistic 3D packaging mockups and editorial layout sheets',
      'Full Figma design system component library with auto-layout',
    ],
    techStack: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Figma',
      'Brand Identity',
      'Typography',
      '3D Mockups',
      'UI/UX Design',
    ],
    image: projectGraphicsImg,
    demoUrl: '#',
    githubUrl: 'https://github.com/navin-19',
    featured: true,
    metrics: [
      { label: 'Assets Created', value: '120+' },
      { label: 'Brand Consistency', value: '100%' },
      { label: 'Product Lines', value: '14' },
    ],
    highlights: [
      'Golden-ratio logomark construction',
      'Complete print & digital asset toolkit',
      'Scalable Figma UI component system',
    ],
  },
  {
    id: 'noir-narrative-screenplay',
    title: 'The Rain Over Neon 42',
    subtitle: 'Film Noir Screenplay, Storyboard Script & Character Arcs',
    category: 'Script Writing',
    tag: 'Narrative & Screenplay',
    problem:
      'Production needed an original neo-noir thriller screenplay with rich character dialogue, atmospheric tension, and scene-by-scene storyboard camera notes.',
    approach:
      'Authored a 3-act structured script using industry-standard Final Draft format, detailing character motivations, beat sheets, dialogue cadences, and director shot lists.',
    outcome:
      'Greenlit for short-film pre-production and commended for visceral scene pacing and authentic atmospheric world-building.',
    fullDescription:
      'Creative screenplay and narrative scriptwriting project focused on cinematic storytelling, dialogue subtext, pacing rhythm, emotional beats, and director storyboard integration.',
    features: [
      'Industry standard 3-act narrative screenplay structure',
      'Character arc maps and psychological motivation beat sheets',
      'Cinematic shot list annotations and lighting cues',
      'Subtext-driven dialogue with rhythmic sentence pacing',
    ],
    techStack: [
      'Screenwriting',
      'Final Draft',
      'Storyboarding',
      'Narrative Design',
      'Dialogue Craft',
      'Beat Sheets',
      'Directing Cues',
    ],
    image: projectScriptImg,
    demoUrl: '#',
    githubUrl: 'https://github.com/navin-19',
    featured: true,
    metrics: [
      { label: 'Script Pages', value: '45' },
      { label: 'Scenes Drafted', value: '28' },
      { label: 'Status', value: 'Greenlit' },
    ],
    highlights: [
      'Tense, immersive atmosphere & visual cues',
      'Layered multi-dimensional character dialogue',
      'Integrated director storyboard breakdown',
    ],
  },
  {
    id: 'troudz-roi-calculator',
    title: 'Troudz Analytics Platform',
    subtitle: 'ROI Calculator & Business Analytics Test Architecture',
    category: 'Automation & Testing',
    tag: 'QA Engineering',
    problem:
      'Complex multi-variable financial calculation formulas had edge-case risks resulting in incorrect business metric forecasts.',
    approach:
      'Built Data-Driven test automation suites with Pytest, Postman, and Selenium to validate formulas across boundary states, UI inputs, and backend pipelines.',
    outcome:
      'Eliminated 100% of high-severity calculation bugs, ensuring absolute accuracy and reliability before launch.',
    fullDescription:
      'Troudz is a web analytics platform computing business ROI metrics. Engineered rigorous test coverage spanning financial calculations, UI reactivity, and database consistency.',
    features: [
      'Automated financial calculation logic & boundary testing',
      'Validated dynamic UI inputs, interactive charts, and error states',
      'REST API test suites for backend calculation precision',
      'Verified complete E2E data pipeline: Frontend → API → Database',
    ],
    techStack: [
      'Python',
      'Pytest',
      'DDT',
      'Postman',
      'Selenium',
      'REST APIs',
      'MySQL',
      'JIRA',
    ],
    image: project2Img,
    demoUrl: '#',
    githubUrl: 'https://github.com/navin-19',
    featured: true,
    metrics: [
      { label: 'Formula Accuracy', value: '100%' },
      { label: 'Defects Resolved', value: '100%' },
      { label: 'QA Velocity', value: '+40%' },
    ],
    highlights: [
      'Zero calculation errors in production',
      'Exhaustive boundary & edge-case testing',
      'End-to-end data validation',
    ],
  },
];
