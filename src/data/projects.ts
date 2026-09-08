import project1Img from '../assets/project1.png';
import project2Img from '../assets/project2.png';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Automation' | 'Full-Stack' | 'API Testing';
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
    title: 'Sunbond',
    subtitle: 'WhatsApp Automation & Customer Engagement Platform',
    category: 'Automation',
    tag: 'Flagship Project',
    problem:
      'Manual verification of bulk WhatsApp campaigns, webhooks, and delivery tracking caused release delays.',
    approach:
      'Engineered an end-to-end automated test framework using Selenium (Python + Pytest) with POM, validated REST APIs via Postman, and set up GitHub Actions CI/CD.',
    outcome:
      'Reduced regression testing effort by 70% and ensured zero delivery failures in production.',
    fullDescription:
      'Sunbond is an enterprise SaaS platform automating WhatsApp business communications and bulk campaigns. Built full test automation across UI workflows and REST APIs.',
    features: [
      'Selenium (Python + Pytest) UI automation with Page Object Model',
      'Postman REST API testing for authentication, payloads, and webhooks',
      'End-to-end message delivery verification and retry testing',
      'Automated CI/CD test execution with GitHub Actions'
    ],
    techStack: [
      'Selenium',
      'Python',
      'Pytest',
      'POM',
      'Postman',
      'REST APIs',
      'GitHub Actions',
      'JIRA'
    ],
    image: project1Img,
    demoUrl: '#',
    githubUrl: 'https://github.com/navin-19',
    featured: true,
    metrics: [
      { label: 'Manual Effort Saved', value: '70%' },
      { label: 'Regression Time', value: '-65%' },
      { label: 'Test Reliability', value: '99.8%' }
    ],
    highlights: [
      'POM architecture for clean test maintenance',
      'Automated WhatsApp Webhook & API validation',
      'GitHub Actions CI/CD feedback loop'
    ]
  },
  {
    id: 'troudz-roi-calculator',
    title: 'Troudz ROI Platform',
    subtitle: 'ROI Calculator & Business Analytics Platform',
    category: 'Full-Stack',
    tag: 'Analytics & Quality',
    problem:
      'Complex multi-variable financial calculation formulas had boundary bugs risking incorrect metrics.',
    approach:
      'Created Data-Driven test suites with Pytest and Postman to validate formulas across edge cases, UI inputs, and backend data flows.',
    outcome:
      'Eliminated high-severity calculation bugs, ensuring 100% formula accuracy before production release.',
    fullDescription:
      'Troudz is a web analytics platform computing business ROI metrics. Validated calculation formulas, UI responsiveness, and frontend-to-backend data flow.',
    features: [
      'Tested financial calculation logic and boundary conditions',
      'Validated dynamic UI inputs, charts, and error states',
      'Conducted REST API testing for backend calculation accuracy',
      'Verified complete E2E data flow: Frontend → API → Database'
    ],
    techStack: [
      'Python',
      'Pytest',
      'DDT',
      'Postman',
      'Selenium',
      'REST APIs',
      'MySQL',
      'JIRA'
    ],
    image: project2Img,
    demoUrl: '#',
    githubUrl: 'https://github.com/navin-19',
    featured: true,
    metrics: [
      { label: 'Calculation Accuracy', value: '100%' },
      { label: 'Bugs Resolved', value: '100%' },
      { label: 'Turnaround Speed', value: '+40%' }
    ],
    highlights: [
      'Zero financial formula bugs in production',
      'Exhaustive boundary value testing',
      'Frontend-to-backend data integrity'
    ]
  }
];
