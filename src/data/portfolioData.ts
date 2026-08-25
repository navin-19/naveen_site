import profileImg from '../assets/profile.png';
import project1Img from '../assets/project1.png';
import project2Img from '../assets/project2.png';
import gallery1Img from '../assets/gallery1.jpg';
import gallery2Img from '../assets/gallery2.jpg';
import gallery3Img from '../assets/gallery3.jpg';
import gallery4Img from '../assets/gallery4.jpg';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Automation' | 'DevOps & Cloud';
  icon: string; // Lucide icon identifier or text code
  level: number; // Percentage 0-100
  yearsOfExp: number;
  description: string;
  color: string;
  borderColor: string;
  orbitRadius: number; // Distance for orbital layout
  orbitAngle: number; // Starting angle in degrees
  orbitSpeed: number; // Rotation speed relative
  relatedProjects: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'All' | 'Full-Stack' | 'Automation' | 'Cloud/DevOps' | 'AI/ML';
  shortDescription: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
  caption: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
  current?: boolean;
}

export interface PortfolioData {
  user: {
    name: string;
    greeting: string;
    title: string;
    shortBio: string;
    longBio: string;
    location: string;
    email: string;
    availability: string;
    resumeUrl: string;
    profileImage: string;
    socials: {
      github: string;
      linkedin: string;
      instagram: string;
      email: string;
    };
  };
  stats: {
    yearsExp: string;
    projectsCompleted: string;
    automationRate: string;
    techStackCount: string;
  };
  skills: SkillItem[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  gallery: GalleryItem[];
}

export const portfolioData: PortfolioData = {
  user: {
    greeting: "Hello, I'm",
    name: "Naveen Kumar",
    title: "Senior Full-Stack & Test Automation Architect",
    shortBio: "Crafting bulletproof, high-performance web applications and autonomous AI-driven automation frameworks with sleek Apple-inspired UI and glassmorphism design.",
    longBio: "With over 6+ years of expertise in software architecture, enterprise web development, and end-to-end quality engineering, I bridge the gap between pixel-perfect frontend interfaces and resilient, scalable microservices. Driven by futuristic design and clean code practices.",
    location: "Bengaluru, India / Remote Worldwide",
    email: "naveen.boomi019@gmail.com",
    availability: "Available for High-Impact Projects & Consulting",
    resumeUrl: "#resume",
    profileImage: profileImg,
    socials: {
      github: "https://github.com/navin-19",
      linkedin: "https://www.linkedin.com/in/naveen-boomi019?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://instagram.com",
      email: "naveen.boomi019@gmail.com",
    },
  },
  stats: {
    yearsExp: "2+",
    projectsCompleted: "45+",
    automationRate: "99.8%",
    techStackCount: "16+",
  },
  skills: [
    {
      id: "react",
      name: "React",
      category: "Frontend",
      icon: "Code2",
      level: 95,
      yearsOfExp: 3,
      description: "Mastery of modern React 19 architecture, custom hooks, Server Components, Concurrent Mode, State Management (Zustand, Redux Toolkit), and Framer Motion visual choreography.",
      color: "from-cyan-500 to-blue-500",
      borderColor: "#06B6D4",
      orbitRadius: 180,
      orbitAngle: 0,
      orbitSpeed: 35,
      relatedProjects: ["AI Automated Test Suite", "Cloud Sentinel Dashboard"],
    },
    {
      id: "python",
      name: "Python",
      category: "Backend",
      icon: "Terminal",
      level: 92,
      yearsOfExp: 3,
      description: "Expert in Python backend architecture, async asyncio workflows, FastAPI microservices, automated testing frameworks, and AI data processing pipelines.",
      color: "from-blue-500 to-yellow-500",
      borderColor: "#3B82F6",
      orbitRadius: 210,
      orbitAngle: 36,
      orbitSpeed: 42,
      relatedProjects: ["AI Automated Test Suite", "HyperScale Data Pipeline"],
    },
    {
      id: "selenium",
      name: "Selenium",
      category: "Automation",
      icon: "Bot",
      level: 90,
      yearsOfExp: 3,
      description: "Building scalable distributed Selenium Grid infrastructure, custom Page Object Models, parallel cross-browser execution engines, and automated visual regression checking.",
      color: "from-green-500 to-cyan-500",
      borderColor: "#10B981",
      orbitRadius: 190,
      orbitAngle: 72,
      orbitSpeed: 38,
      relatedProjects: ["AI Automated Test Suite"],
    },
    {
      id: "playwright",
      name: "Playwright",
      category: "Automation",
      icon: "Cpu",
      level: 94,
      yearsOfExp: 2,
      description: "Modern E2E automation with Microsoft Playwright TypeScript & Python bindings, auto-waiting reliability, API request mocking, trace viewer diagnostics, and CI execution.",
      color: "from-red-500 to-orange-500",
      borderColor: "#F97316",
      orbitRadius: 230,
      orbitAngle: 108,
      orbitSpeed: 45,
      relatedProjects: ["AI Automated Test Suite", "Real-time Quality Monitor"],
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Frontend",
      icon: "FileCode",
      level: 96,
      yearsOfExp: 3,
      description: "Core JavaScript ESNext expert, event loops, DOM performance optimization, custom web APIs, Canvas rendering engines, and asynchronous control flow.",
      color: "from-yellow-400 to-amber-600",
      borderColor: "#F59E0B",
      orbitRadius: 175,
      orbitAngle: 144,
      orbitSpeed: 32,
      relatedProjects: ["Cloud Sentinel Dashboard", "NextGen Glassmorphism Portfolio"],
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "Frontend",
      icon: "ShieldCheck",
      level: 94,
      yearsOfExp: 2,
      description: "Strict static typing architect, advanced generic utilities, type-safe API contracts with Zod/tRPC, strict linting, and compile-time defect elimination.",
      color: "from-blue-600 to-indigo-600",
      borderColor: "#2563EB",
      orbitRadius: 215,
      orbitAngle: 180,
      orbitSpeed: 40,
      relatedProjects: ["NextGen Glassmorphism Portfolio", "AI Automated Test Suite"],
    },
    {
      id: "fastapi",
      name: "FastAPI",
      category: "Backend",
      icon: "Zap",
      level: 88,
      yearsOfExp: 3,
      description: "High-performance async RESTful and WebSocket API development with Python Pydantic models, automatic OpenAPI documentation, JWT authentication, and dependency injection.",
      color: "from-teal-400 to-emerald-600",
      borderColor: "#14B8A6",
      orbitRadius: 200,
      orbitAngle: 216,
      orbitSpeed: 36,
      relatedProjects: ["AI Automated Test Suite"],
    },
    {
      id: "docker",
      name: "Docker",
      category: "DevOps & Cloud",
      icon: "Container",
      level: 86,
      yearsOfExp: 2,
      description: "Containerization mastery, multi-stage Docker builds, docker-compose local dev orchestration, security hardening, and image size optimization for microservices.",
      color: "from-cyan-600 to-blue-700",
      borderColor: "#0284C7",
      orbitRadius: 225,
      orbitAngle: 252,
      orbitSpeed: 44,
      relatedProjects: ["Cloud Sentinel Dashboard"],
    },
    {
      id: "github",
      name: "GitHub Actions",
      category: "DevOps & Cloud",
      icon: "GitBranch",
      level: 90,
      yearsOfExp: 5,
      description: "Designing automated CI/CD matrix build pipelines, GitHub Actions workflows, automated PR gatekeeping checks, artifact reporting, and deployment environments.",
      color: "from-purple-500 to-slate-700",
      borderColor: "#A855F7",
      orbitRadius: 185,
      orbitAngle: 288,
      orbitSpeed: 34,
      relatedProjects: ["AI Automated Test Suite", "Cloud Sentinel Dashboard"],
    },
    {
      id: "aws",
      name: "AWS",
      category: "DevOps & Cloud",
      icon: "Cloud",
      level: 84,
      yearsOfExp: 2,
      description: "Cloud infrastructure provisioning including EC2, ECS, Lambda serverless, S3 storage, CloudFront CDN, IAM security policies, and CloudWatch metrics monitoring.",
      color: "from-amber-500 to-orange-600",
      borderColor: "#FF9900",
      orbitRadius: 220,
      orbitAngle: 324,
      orbitSpeed: 41,
      relatedProjects: ["Cloud Sentinel Dashboard"],
    },
  ],
  projects: [
    {
      id: "ai-test-suite",
      title: "OmniTest AI - Autonomous QA Platform",
      category: "Automation",
      shortDescription: "Self-healing test automation framework powered by AI diagnostics, Playwright & Python FastAPI.",
      fullDescription: "OmniTest AI is an enterprise-grade test automation platform engineered to execute tens of thousands of parallel test cases across Chrome, Firefox, Safari, and Mobile viewports. Featuring automatic DOM selector self-healing, visual AI anomaly detection, real-time live video recording, and instant Slack/Jira notification integrations.",
      features: [
        "Self-healing Playwright & Selenium DOM element selectors",
        "Parallel distributed grid execution cutting CI run times by 75%",
        "Interactive HTML5 report portal with video playback & traces",
        "Automated visual regression checking via computer vision algorithms"
      ],
      techStack: ["Python", "Playwright", "FastAPI", "Docker", "React", "Tailwind CSS", "GitHub Actions"],
      image: project1Img,
      demoUrl: "https://example.com/omnitest-demo",
      githubUrl: "https://github.com",
      featured: true,
      metrics: [
        { label: "Execution Speed", value: "+400%" },
        { label: "Flaky Tests Fixed", value: "98.5%" },
        { label: "Test Cases", value: "25,000+" }
      ]
    },
    {
      id: "cloud-sentinel",
      title: "Cloud Sentinel Infrastructure Hub",
      category: "Cloud/DevOps",
      shortDescription: "Real-time microservice health dashboard with dark glass visual aesthetics and instant metrics.",
      fullDescription: "A futuristic monitoring console designed for DevOps and Site Reliability teams. Cloud Sentinel tracks container health, AWS ECS task metrics, CPU/memory spikes, and API latency spikes with sub-second WebSocket updates and glowing Apple-inspired micro-charts.",
      features: [
        "Real-time WebSocket telemetry with sub-50ms push updates",
        "Custom glassmorphism node graph displaying cluster topologies",
        "Automated alert routing via Webhooks, PagerDuty, and Email",
        "Interactive log inspector with regex search and severity filtering"
      ],
      techStack: ["React 19", "TypeScript", "Tailwind CSS", "AWS Lambda", "Docker", "Framer Motion"],
      image: project2Img,
      demoUrl: "https://example.com/cloudsentinel-demo",
      githubUrl: "https://github.com",
      featured: true,
      metrics: [
        { label: "Latency", value: "< 15ms" },
        { label: "Monitored Nodes", value: "1,200+" },
        { label: "Uptime SLA", value: "99.99%" }
      ]
    },
    {
      id: "futuristic-portfolio",
      title: "Futuristic Glassmorphism Portfolio",
      category: "Full-Stack",
      shortDescription: "Luxury Apple-inspired dark theme developer portfolio with interactive 3D skill orbit ring.",
      fullDescription: "A state-of-the-art interactive web landing page created with React, Vite, Framer Motion, and Tailwind CSS. Built to captivate tech recruiters and clients with smooth orbital animations, modal card popups, ambient light particle background, and responsive glass UI.",
      features: [
        "Interactive 3D-like floating skill orbit ring with mouse parallax",
        "Interactive modals for skill breakdowns and project details",
        "Custom Canvas particle background with ambient light nodes",
        "100% lighthouse performance score and dark mode luxury feel"
      ],
      techStack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas"],
      image: project1Img,
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      metrics: [
        { label: "Lighthouse Score", value: "100" },
        { label: "Frame Rate", value: "60 FPS" },
        { label: "User Delight", value: "10/10" }
      ]
    }
  ],
  experiences: [
    {
      id: "exp-1",
      company: "Apex Tech Innovations",
      role: "Lead Full-Stack & Automation Architect",
      period: "2023 - Present",
      location: "Bengaluru, India",
      description: [
        "Architected scalable enterprise React applications and microservices serving 500k+ monthly active users.",
        "Built automated end-to-end Playwright & Python framework reducing release regression cycle from 4 days to 45 minutes.",
        "Mentored a engineering team of 12 developers across frontend engineering, automation practices, and CI/CD pipelines."
      ],
      techStack: ["React", "TypeScript", "Python", "Playwright", "Docker", "AWS"],
      current: true
    },
    {
      id: "exp-2",
      company: "Quantum Systems Corp",
      role: "Senior Software & QA Automation Engineer",
      period: "2020 - 2023",
      location: "Hybrid",
      description: [
        "Engineered custom Selenium Grid infrastructure handling 15,000+ daily parallel browser test runs.",
        "Developed responsive FastAPI backends and interactive analytical dashboards with sleek dark theme aesthetics.",
        "Integrated automated quality checks into GitHub Actions CI pipelines preventing critical bugs in production."
      ],
      techStack: ["Python", "Selenium", "FastAPI", "React", "GitHub Actions", "Tailwind CSS"]
    },
    {
      id: "exp-3",
      company: "NextGen Software Labs",
      role: "Full Stack Engineer",
      period: "2018 - 2020",
      location: "Bengaluru, India",
      description: [
        "Developed modern user interfaces using React and JavaScript for fintech client dashboards.",
        "Optimized web application bundle sizes and critical rendering path, improving LCP performance by 40%.",
        "Created unit test suites achieving 92% code coverage across core modules."
      ],
      techStack: ["JavaScript", "React", "Python", "CSS3/HTML5", "REST APIs"]
    }
  ],
  gallery: [
    {
      id: "gallery-1",
      title: "Aether Analytics Dashboard",
      image: gallery1Img,
      category: "Data Visualization",
      caption: "Real-time global traffic monitoring dashboard with WebSocket telemetry, predictive analytics, and holographic cluster topology maps.",
    },
    {
      id: "gallery-2",
      title: "Aether Mobile Finance App",
      image: gallery2Img,
      category: "Mobile UI Design",
      caption: "Glassmorphism-first fintech app with portfolio tracking, live crypto data, and an Apple-inspired dark theme with frosted glass cards.",
    },
    {
      id: "gallery-3",
      title: "Neural OS — Dev Environment",
      image: gallery3Img,
      category: "Developer Tooling",
      caption: "AI-powered code editor with neural syntax analysis, live terminal, holographic circuit-board overlays, and integrated system metrics.",
    },
    {
      id: "gallery-4",
      title: "Astria — Luxury E-Commerce",
      image: gallery4Img,
      category: "E-Commerce",
      caption: "Premium product showcase built with 3D render integration, frosted glass cards, immersive ambient lighting, and a smooth purchase flow.",
    },
    {
      id: "gallery-5",
      title: "OmniTest QA Platform",
      image: project1Img,
      category: "Automation",
      caption: "Self-healing E2E test orchestration platform — parallel Playwright grid, visual AI regression, and interactive HTML5 report portal.",
    },
    {
      id: "gallery-6",
      title: "Cloud Sentinel Hub",
      image: project2Img,
      category: "Cloud / DevOps",
      caption: "Futuristic microservice monitoring console with sub-50ms WebSocket push, glassmorphism node graphs, and automated alert routing.",
    },
  ],
};
