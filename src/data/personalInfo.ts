import profileImg from '../assets/profile.png';

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
}

export interface PersonalInfo {
  name: string;
  displayName: string;
  realTitles: string[];
  displayTitles: string[];
  summary: string;
  shortBio: string;
  longBio: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  resumeUrl: string;
  profileImage: string;
  socials: SocialLinks;
  stats: {
    yearsExp: string;
    projectsCount: string;
    testAutomationPassRate: string;
    techStackCount: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "Naveenkumar Boominathan",
  displayName: "Naveen Kumar",
  realTitles: ["QA Automation Engineer / SDET", "Python Developer"],
  displayTitles: [
    "Senior Full-Stack Developer",
    "Test Automation Architect",
    "QA Automation Engineer",
    "Python Developer"
  ],
  summary:
    "QA Automation Engineer & Python Developer with 1+ year of experience building test automation frameworks (Selenium, Pytest, Postman) and scalable Python web apps (Django/Flask, MySQL). Skilled in POM, API testing, and CI/CD pipelines.",
  shortBio:
    "Building robust test automation frameworks and scalable Python web applications.",
  longBio:
    "QA Automation Engineer & Python Developer with 1+ year of experience building test automation frameworks (Selenium, Pytest, Postman) and scalable Python web apps (Django/Flask, MySQL). Skilled in POM, API testing, and CI/CD pipelines.",
  email: "naveen.boomi019@gmail.com",
  phone: "+91-9344009866",
  location: "Chennai, Tamil Nadu, India",
  availability: "Available for Hire",
  resumeUrl: "/resume.pdf",
  profileImage: profileImg,
  socials: {
    github: "https://github.com/navin-19",
    linkedin: "https://linkedin.com/in/Naveenkumar-Boominathan",
    email: "mailto:naveen.boomi019@gmail.com",
    phone: "tel:+919344009866",
  },
  stats: {
    yearsExp: "1+",
    projectsCount: "10+",
    testAutomationPassRate: "99.8%",
    techStackCount: "25+",
  },
};
