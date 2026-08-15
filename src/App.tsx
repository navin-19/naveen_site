import { useState, useEffect } from 'react';
import type { SkillItem } from './data/portfolioData';
import { ParticleBackground } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SkillModal } from './components/SkillModal';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
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
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Dynamic Canvas Background & Custom Glow Follower */}
      <ParticleBackground />
      <CustomCursor />

      {/* Glass Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Hero Section with Skill Orbit Ring */}
        <HeroSection
          onSelectSkill={(skill) => setSelectedSkill(skill)}
          activeSection={activeSection}
        />

        {/* About Section with Metrics */}
        <AboutSection />

        {/* Skills Section with Category Filters */}
        <SkillsSection onSelectSkill={(skill) => setSelectedSkill(skill)} />

        {/* Projects Section with Detail Modals */}
        <ProjectsSection />

        {/* Career Experience Timeline */}
        <ExperienceSection />

        {/* Glossy Contact Section */}
        <ContactSection />
      </main>

      {/* Minimal Sleek Footer */}
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
