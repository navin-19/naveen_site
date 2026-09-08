export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  type: string;
  summary: string;
  description: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: 'troudz-qa-automation',
    role: 'QA Automation Engineer',
    company: 'Troudz AI Labs',
    location: 'Bangalore, India',
    period: '2025 – Present',
    current: true,
    type: 'Full-time',
    summary:
      'Designing test automation frameworks with Selenium, Pytest, and Postman, integrated into GitHub Actions CI/CD.',
    description: [
      'Built Selenium + Pytest UI test automation using Page Object Model (POM) for scalable test coverage.',
      'Conducted REST API testing in Postman with schema validation, auth tokens, and negative test cases.',
      'Integrated automated test suites into GitHub Actions CI/CD pipelines to run on every pull request.',
      'Logged and tracked defects in JIRA with reproduction steps and logs, speeding up bug fixes.'
    ],
    techStack: [
      'Selenium',
      'Python',
      'Pytest',
      'Postman',
      'POM',
      'GitHub Actions',
      'JIRA',
      'REST APIs'
    ],
    metrics: [
      { label: 'Manual Effort Saved', value: '70%' },
      { label: 'Regression Speed', value: '4x' },
      { label: 'Defect Turnaround', value: '+40%' }
    ]
  },
  {
    id: 'python-developer',
    role: 'Python Developer',
    company: 'Software Engineering',
    location: 'Chennai / Hybrid, India',
    period: '2024 – 2025',
    current: false,
    type: 'Full-time',
    summary:
      'Developed Python backend applications, integrated third-party REST APIs, and managed MySQL databases.',
    description: [
      'Built Python apps with third-party API integrations, improving data accuracy by 25%.',
      'Developed backend features with Django & Flask, increasing user engagement by 15%.',
      'Designed and optimized MySQL database queries, boosting storage efficiency by 20%.'
    ],
    techStack: [
      'Python',
      'Django',
      'Flask',
      'MySQL',
      'REST APIs',
      'Postman',
      'Git'
    ],
    metrics: [
      { label: 'Data Accuracy', value: '+25%' },
      { label: 'Storage Efficiency', value: '+20%' },
      { label: 'User Engagement', value: '+15%' }
    ]
  }
];
