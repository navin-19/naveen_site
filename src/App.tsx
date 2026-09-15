import { lazy, useState, useEffect } from 'react';
import type { SkillItem } from './data/skills';
import { AnimatedBackground } from './components/AnimatedBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SkillModal } from './components/SkillModal';
import { Footer } from './components/Footer';
import { LazySection } from './components/LazySection';

const AboutSection = lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const SkillsSection = lazy(() =>
  import('./components/SkillsSection').then((m) => ({ default: m.SkillsSection }))
);
const ExperienceSection = lazy(() =>
  import('./components/ExperienceSection').then((m) => ({ default: m.ExperienceSection }))
);
const ProjectsSection = lazy(() =>
  import('./components/ProjectsSection').then((m) => ({ default: m.ProjectsSection }))
);
const EducationSection = lazy(() =>
  import('./components/EducationSection').then((m) => ({ default: m.EducationSection }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  // Re-scan as lazy sections mount so nav highlighting stays accurate
  useEffect(() => {
    const observed = new Set<Element>();
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

    const scan = () => {
      document.querySelectorAll('section[id]').forEach((sec) => {
        if (!observed.has(sec)) {
          observer.observe(sec);
          observed.add(sec);
        }
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    const main = document.querySelector('main');
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <AnimatedBackground />
      <CustomCursor />
      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <HeroSection activeSection={activeSection} />

        <LazySection minHeight={980}>
          <AboutSection />
        </LazySection>

        <LazySection minHeight={1400}>
          <SkillsSection onSelectSkill={(skill) => setSelectedSkill(skill)} />
        </LazySection>

        <LazySection minHeight={880}>
          <ExperienceSection />
        </LazySection>

        <LazySection minHeight={1280}>
          <ProjectsSection />
        </LazySection>

        <LazySection minHeight={1100}>
          <EducationSection />
        </LazySection>

        <LazySection minHeight={980}>
          <ContactSection />
        </LazySection>
      </main>

      <Footer />

      <SkillModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </div>
  );
}

export default App;
