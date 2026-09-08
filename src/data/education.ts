export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  subInstitution: string;
  location: string;
  period: string;
  score: string;
  coursework: string;
  achievementBadge: string;
  icon: string;
  color: string;
  borderColor: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  location: string;
  year: string;
  skillsLearned: string[];
  credentialStatus: string;
  color: string;
  borderColor: string;
  link?: string;
}

export const educationData: EducationItem[] = [
  {
    id: 'bca-degree',
    degree: 'BCA (Bachelor of Computer Application)',
    institution: 'Bharathidasan University',
    subInstitution: '(Annai College of Arts & Science)',
    location: 'Tamil Nadu, India',
    period: 'Aug 2018 – Mar 2021',
    score: 'CGPA: 81% (Distinction)',
    coursework:
      'Object-Oriented Programming, Database Management Systems (DBMS), Data Structures & Algorithms, Software Engineering, Web Technologies, and Computer Networks.',
    achievementBadge: 'Graduated with 81% Distinction',
    icon: 'GraduationCap',
    color: 'from-blue-500 to-indigo-600',
    borderColor: '#3B82F6',
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-python-fullstack',
    title: 'Python Full Stack Development',
    issuer: 'Qtree Technologies',
    location: 'Chennai / Coimbatore, India',
    year: '2023',
    skillsLearned: [
      'Python OOP & Advanced Concepts',
      'Django & Flask Web Frameworks',
      'RESTful API Architecture',
      'MySQL Database Engineering',
      'Frontend HTML5/CSS3/JavaScript',
      'Real-world Projects & Deployment',
    ],
    credentialStatus: 'Verified Certificate',
    color: 'from-purple-500 to-indigo-600',
    borderColor: '#8B5CF6',
    link: '#',
  },
  {
    id: 'cert-python-fundamentals',
    title: 'Python Fundamentals',
    issuer: 'Besant Technologies',
    location: 'Chennai, India',
    year: '2022',
    skillsLearned: [
      'Python Syntax & Data Structures',
      'Functions, Modules & File I/O',
      'Exception Handling & Debugging',
      'Automated Scripting & Testing Basics',
      'Problem Solving & Logic Building',
      'Hands-on Practice Projects',
    ],
    credentialStatus: 'Verified Certificate',
    color: 'from-blue-500 to-cyan-600',
    borderColor: '#3B82F6',
    link: '#',
  },
];
