import { useState, useEffect } from 'react';
import type { SkillItem } from './data/skills';
import { AnimatedBackground } from './components/AnimatedBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SkillModal } from './components/SkillModal';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Shared Global Animated Background (Site-wide, Fixed Layer) */}
      <AnimatedBackground />

      {/* Custom Mouse Follower */}
      <CustomCursor />

      {/* Translucent Glass Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Layout with Seamless Section Transitions */}
      <main className="relative z-10">
        {/* 1. Hero Section with 3D ID Card & Confetti CTA */}
        <HeroSection
          activeSection={activeSection}
        />

        {/* 2. About Section with Subtle Contrast Wash */}
        <AboutSection />

        {/* 3. Skills Section with Clean Translucent Canvas */}
        <SkillsSection onSelectSkill={(skill) => setSelectedSkill(skill)} />

        {/* 4. Career Experience Timeline with Subtle Accent Wash */}
        <ExperienceSection />

        {/* 5. Projects Section with Problem -> Approach -> Outcome Case Studies */}
        <ProjectsSection />

        {/* 6. Education & Certifications with Subtle Accent Wash */}
        <EducationSection />

        {/* 7. Glossy Contact Section with Direct Channels & Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Skill Detail Modal */}
      <SkillModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </div>
  );
}

export default App;
