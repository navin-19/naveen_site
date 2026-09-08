import { personalInfo } from './personalInfo';
import { skillsData, orbitalSkills } from './skills';
import type { SkillItem } from './skills';
import { projectsData } from './projects';
import type { ProjectItem } from './projects';
import { experiencesData } from './experience';
import type { ExperienceItem } from './experience';
import { educationData, certificationsData } from './education';
import type { EducationItem, CertificationItem } from './education';

export type {
  SkillItem,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  CertificationItem
};

export const portfolioData = {
  user: {
    greeting: "Hello, I'm",
    name: personalInfo.displayName,
    fullName: personalInfo.name,
    title: personalInfo.displayTitles[0] + " & " + personalInfo.displayTitles[1],
    realTitles: personalInfo.realTitles,
    shortBio: personalInfo.shortBio,
    longBio: personalInfo.longBio,
    summary: personalInfo.summary,
    location: personalInfo.location,
    email: personalInfo.email,
    phone: personalInfo.phone,
    availability: personalInfo.availability,
    resumeUrl: personalInfo.resumeUrl,
    profileImage: personalInfo.profileImage,
    socials: personalInfo.socials,
  },
  stats: {
    yearsExp: personalInfo.stats.yearsExp,
    projectsCompleted: personalInfo.stats.projectsCount,
    automationRate: personalInfo.stats.testAutomationPassRate,
    techStackCount: personalInfo.stats.techStackCount,
  },
  skills: skillsData,
  orbitalSkills: orbitalSkills,
  projects: projectsData,
  experiences: experiencesData,
  education: educationData,
  certifications: certificationsData,
};

export default portfolioData;
