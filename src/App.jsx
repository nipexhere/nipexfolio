import { createElement, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaBolt,
  FaChevronDown,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa6';
import { ABOUT_TEXT, CONTACT, EXPERIENCES, HERO_CONTENT, PROJECTS } from './constants';
import OrbitalScene from './components/OrbitalScene';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/nipexhere', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adebayo-oseni', icon: FaLinkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/nipexfvr', icon: FaInstagram },
];

const skillGroups = [
  {
    label: 'Web & product',
    description: 'Interfaces, experiences, and products for the web.',
    skills: [
      { name: 'React', detail: 'Building responsive interfaces and product workflows.' },
      { name: 'JavaScript', detail: 'Bringing application behavior and browser interactions to life.' },
      { name: 'TypeScript', detail: 'Adding stronger types to make application code easier to maintain.' },
      { name: 'React Native', detail: 'Creating cross-platform mobile application interfaces.' },
      { name: 'Tailwind CSS', detail: 'Developing consistent, responsive interface styling.' },
      { name: 'Framer Motion', detail: 'Adding purposeful transitions and scroll-triggered movement.' },
      { name: 'Three.js', detail: 'Creating the interactive 3D orbital sculpture on this portfolio.' },
      { name: 'WordPress', detail: 'Building and maintaining client websites and storefronts.' },
      { name: 'WooCommerce', detail: 'Setting up products, categories, shipping, and payments for online stores.' },
      { name: 'Elementor', detail: 'Customizing responsive WordPress pages for client needs.' },
    ],
  },
  {
    label: 'Data & delivery',
    description: 'The services and tools that help products work end to end.',
    skills: [
      { name: 'Python', detail: 'Writing Python programs and teaching practical programming.' },
      { name: 'Streamlit', detail: 'Building interactive apps and dashboards with Python.' },
      { name: 'Neon', detail: 'Using hosted Postgres as the data layer for Northstar Capital.' },
      { name: 'Supabase', detail: 'Powering ticket generation and admin workflows for Law Dinner.' },
      { name: 'Resend', detail: 'Integrating email delivery into web application workflows.' },
      { name: 'Cloudflare', detail: 'Using Cloudflare services alongside client web projects.' },
      { name: 'Render', detail: 'Deploying Northstar Capital.' },
    ],
  },
  {
    label: 'Hardware & teaching',
    description: 'Hands-on programming lessons that connect code to physical builds.',
    skills: [
      { name: 'Arduino programming', detail: 'Teaching Arduino programming and microcontroller fundamentals.' },
      { name: 'Small circuit building', detail: 'Guiding learners through small circuits, components, and practical builds.' },
      { name: 'Python & Streamlit teaching', detail: 'Teaching Python fundamentals and building interactive apps with Streamlit.' },
      { name: 'Scratch', detail: 'Using visual projects to introduce programming concepts.' },
      { name: 'Hardware diagnostics', detail: 'Troubleshooting and repairing phones and tablets.' },
    ],
  },
];

function Reveal({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

function SectionLabel({ children }) {
  return (
    <p className="section-label">{children}</p>
  );
}

function SkillsShowcase() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeSkill, setActiveSkill] = useState(skillGroups[0].skills[0]);
  const reduceMotion = useReducedMotion();
  const activeGroup = skillGroups[activeGroupIndex];
  const movement = reduceMotion ? 0 : 1;

  function selectGroup(index) {
    setActiveGroupIndex(index);
    setActiveSkill(skillGroups[index].skills[0]);
  }

  return (
    <div className="skills-workbench">
      <div className="skill-tabs" role="group" aria-label="Filter skills by discipline">
        {skillGroups.map((group, index) => (
          <button
            aria-pressed={activeGroupIndex === index}
            className="skill-tab"
            key={group.label}
            onClick={() => selectGroup(index)}
            type="button"
          >
            <span>{group.label}</span>
            <span className="skill-tab-count">{String(group.skills.length).padStart(2, '0')}</span>
          </button>
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait">
        <Motion.div
          animate={{ opacity: 1, y: 0 }}
          className="skills-stage"
          exit={{ opacity: 0, y: -8 * movement }}
          initial={{ opacity: 0, y: 12 * movement }}
          key={activeGroup.label}
          transition={{ duration: 0.28 }}
        >
          <p className="skill-group-description">{activeGroup.description}</p>
          <Motion.div
            animate="visible"
            className="skill-list"
            initial="hidden"
            variants={{ visible: { transition: { staggerChildren: 0.045 * movement } } }}
          >
            {activeGroup.skills.map((skill, index) => (
              <Motion.button
                animate="visible"
                aria-pressed={activeSkill.name === skill.name}
                className="skill-chip"
                key={skill.name}
                onClick={() => setActiveSkill(skill)}
                transition={{ duration: 0.32 }}
                variants={{
                  hidden: { opacity: 0, y: 10 * movement, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={reduceMotion ? undefined : { y: -4, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                type="button"
              >
                {skill.name}
              </Motion.button>
            ))}
          </Motion.div>
          <AnimatePresence initial={false} mode="wait">
            <Motion.div
              animate={{ opacity: 1, y: 0 }}
              aria-live="polite"
              className="skill-detail"
              exit={{ opacity: 0, y: -5 * movement }}
              initial={{ opacity: 0, y: 7 * movement }}
              key={activeSkill.name}
              transition={{ duration: 0.2 }}
            >
              <span className="skill-detail-label">Selected tool</span>
              <strong>{activeSkill.name}</strong>
              <p>{activeSkill.detail}</p>
            </Motion.div>
          </AnimatePresence>
        </Motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [activeProjectFilter, setActiveProjectFilter] = useState('all');
  const [scenePulse, setScenePulse] = useState(0);
  const reduceMotion = useReducedMotion();
  const accordionDuration = reduceMotion ? 0 : 0.42;
  const toggleDuration = reduceMotion ? 0 : 0.3;
  const detailDuration = reduceMotion ? 0 : 0.3;
  const visibleProjects = PROJECTS.filter((project) => activeProjectFilter === 'all' || project.category === activeProjectFilter);

  return (
    <div className="site-shell">
      <header className="site-header page-wrap">
        <a className="wordmark" href="#home" aria-label="Nipex, back to top">
          <span className="wordmark-icon">N</span>
          <span className="wordmark-name">Nipex</span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Journey</a>
          <a href="#contact">Contact <FaArrowUpRightFromSquare aria-hidden="true" /></a>
        </nav>
        <a className="availability" href={`mailto:${CONTACT.email}`}>
          <span className="availability-dot" />
          <span>Open to select projects</span>
        </a>
      </header>

      <main>
          <section className="hero" id="home">
            <div className="hero-visual">
              <OrbitalScene pulseKey={scenePulse} />
            </div>
            <div className="hero-inner page-wrap">
              <div className="hero-copy">
                <p className="eyebrow">Digital products, made with intent</p>
                <h1>Adebayo<br />Oseni<span className="hero-period">.</span></h1>
                <p className="hero-role">Frontend engineer &amp; creative technologist</p>
                <p className="hero-intro">From role-aware legal workflows to private file transfer and hands-on electronics, I turn complex ideas into experiences that feel simple.</p>
                <div className="hero-actions">
                  <a className="button button-dark" href="#work">See what I build <FaArrowRight aria-hidden="true" /></a>
                  <a className="text-link" href={`mailto:${CONTACT.email}`}>Start a conversation <FaArrowUpRightFromSquare aria-hidden="true" /></a>
                </div>
                <div className="hero-socials" aria-label="Social links">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                      {createElement(Icon, { 'aria-hidden': true })}
                    </a>
                  ))}
                  <span className="social-note">Lagos, Nigeria</span>
                </div>
              </div>
              <div className="hero-location">
                <span>06° 27' N</span>
                <span>03° 23' E</span>
              </div>
              <button
                aria-label="Pulse the circuit sculpture"
                className="scene-pulse"
                onClick={() => setScenePulse((current) => current + 1)}
                title="Send a pulse through the circuit"
                type="button"
              >
                <FaBolt aria-hidden="true" />
                <span>Pulse signal</span>
              </button>
            </div>
            <div className="hero-bottom-note"><span>Selected work follows</span><span className="hero-bottom-line" /></div>
          </section>

        <div className="discipline-marquee" role="group" aria-label="Areas of work">
          <div className="discipline-track">
            {[0, 1].map((copy) => (
              <div aria-hidden={copy === 1} className="discipline-group" key={copy}>
                <span>Digital products</span>
                <span>Teaching and mentorship</span>
                <span>Code and circuits</span>
              </div>
            ))}
          </div>
        </div>

        <section className="about-section page-wrap" id="about">
          <SectionLabel>A little about me</SectionLabel>
          <div className="about-grid">
            <Reveal>
              <h2>Make it clear.<br />Make it <span>work.</span></h2>
            </Reveal>
            <Reveal>
              <p className="about-copy">{ABOUT_TEXT}</p>
              <a className="resume-link" href={HERO_CONTENT.resumeLink} target="_blank" rel="noreferrer">
                A little more about my journey <FaArrowUpRightFromSquare aria-hidden="true" />
              </a>
            </Reveal>
          </div>
          <div className="skills-row">
            <div className="skills-intro">
              <span className="skills-heading">What I work with</span>
              <p>From pixels and products to Python and physical builds.</p>
            </div>
            <SkillsShowcase />
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="page-wrap">
            <SectionLabel>Selected work</SectionLabel>
            <div className="section-heading-row">
              <Reveal><h2>Useful things,<br /><span>made real.</span></h2></Reveal>
              <p className="section-aside">A selection of products, client builds, and experiments across commerce, legal tech, education, and event tools.</p>
            </div>
            <div className="project-filter-row">
              <div className="project-filters" role="group" aria-label="Filter projects">
                {[
                  { label: 'Everything', value: 'all' },
                  { label: 'Products', value: 'product' },
                  { label: 'Client work', value: 'client' },
                  { label: 'Experiments', value: 'experiment' },
                ].map((filter) => (
                  <button
                    aria-pressed={activeProjectFilter === filter.value}
                    className="project-filter"
                    key={filter.value}
                    onClick={() => setActiveProjectFilter(filter.value)}
                    type="button"
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <span className="project-count">{visibleProjects.length} projects</span>
            </div>
            <div className="project-grid">
              {visibleProjects.map((project, index) => (
                <Reveal key={project.title} className={`project-reveal project-reveal-${index + 1}`}>
                  <article className={`project-card project-card-${index + 1}`}>
                    <div className="project-preview">
                      <iframe
                        className="project-iframe"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        src={project.link}
                        title={`${project.title.trim()} live website preview`}
                      />
                      <a className="project-preview-link" href={project.link} target="_blank" rel="noreferrer">
                        <span>Visit live site</span>
                        <FaArrowUpRightFromSquare aria-hidden="true" />
                      </a>
                    </div>
                    <div className="project-details">
                      <div><h3>{project.title.trim()}</h3><p>{project.description}</p></div>
                      <div className="project-meta"><span>{project.technologies.join(', ')}</span><FaArrowRight aria-hidden="true" /></div>
                    </div>
                  </article>
                  {project.sourceLink && (
                    <a className="project-source" href={project.sourceLink} target="_blank" rel="noreferrer">
                      <FaGithub aria-hidden="true" /> View source code <FaArrowUpRightFromSquare aria-hidden="true" />
                    </a>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section page-wrap" id="experience">
          <SectionLabel>A few chapters</SectionLabel>
          <div className="experience-heading">
            <Reveal><h2>Learn by<br /><span>making.</span></h2></Reveal>
            <p>Product work, teaching, and hands-on problem solving have all shaped how I build.</p>
          </div>
          <button
            aria-controls="experience-list"
            aria-expanded={experienceOpen}
            className="experience-disclosure"
            onClick={() => {
              setExperienceOpen((open) => !open);
              setExpandedExperience(null);
            }}
            type="button"
          >
            <span className="experience-disclosure-copy">
              <strong>{experienceOpen ? 'Close experience' : 'Explore experience'}</strong>
              <span>{String(EXPERIENCES.length).padStart(2, '0')} roles across product development, teaching, and hardware</span>
            </span>
            <Motion.span animate={{ rotate: experienceOpen ? 180 : 0 }} aria-hidden="true" className="experience-disclosure-icon" transition={{ duration: toggleDuration, ease: [0.22, 1, 0.36, 1] }}>
              <FaChevronDown />
            </Motion.span>
          </button>
          <AnimatePresence initial={false}>
            {experienceOpen && (
              <Motion.div
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                className="experience-list"
                exit={{ height: 0, opacity: 0, y: -10 }}
                initial={{ height: 0, opacity: 0, y: -10 }}
                id="experience-list"
                style={{ overflow: 'hidden' }}
                transition={{ duration: accordionDuration, ease: [0.22, 1, 0.36, 1] }}
              >
                {EXPERIENCES.map((experience, index) => {
                  const isExpanded = expandedExperience === index;
                  const detailsId = `experience-details-${index}`;

                  return (
                    <article className="experience-reveal" key={`${experience.company}-${experience.role}`}>
                      <div className="experience-entry">
                        <p className="experience-date">{experience.year}</p>
                        <div className="experience-detail">
                          <div>
                            <button
                              aria-controls={detailsId}
                              aria-expanded={isExpanded}
                              className="experience-toggle"
                              onClick={() => setExpandedExperience((current) => current === index ? null : index)}
                              type="button"
                            >
                              <span>{experience.role}</span>
                              <Motion.span animate={{ rotate: isExpanded ? 180 : 0 }} aria-hidden="true" className="experience-toggle-icon" transition={{ duration: reduceMotion ? 0 : 0.24 }}>
                                <FaChevronDown />
                              </Motion.span>
                            </button>
                            <p className="experience-company">{experience.company}</p>
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <Motion.div
                                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                                  className="experience-more"
                                  exit={{ height: 0, opacity: 0, y: -6 }}
                                  id={detailsId}
                                  initial={{ height: 0, opacity: 0, y: -6 }}
                                  style={{ overflow: 'hidden' }}
                                  transition={{ duration: detailDuration, ease: [0.22, 1, 0.36, 1] }}
                                >
                                  <p className="experience-description">{experience.description}</p>
                                  <div className="experience-tags">{experience.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                                </Motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </Motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner page-wrap">
            <SectionLabel>Start a conversation</SectionLabel>
            <Reveal>
              <h2>What are you<br /><span>working on?</span></h2>
              <p>Have a product to shape, a problem to solve, or a practical idea worth testing? Let’s talk.</p>
              <a className="button button-light" href={`mailto:${CONTACT.email}`}>Email Adebayo <FaArrowUpRightFromSquare aria-hidden="true" /></a>
            </Reveal>
            <span className="contact-stamp" aria-hidden="true">N.</span>
          </div>
        </section>
      </main>

      <footer className="site-footer page-wrap">
        <a className="footer-brand" href="#home">NIPEX<span>®</span></a>
        <p>Independent by nature. Collaborative by design.</p>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email} <FaArrowUpRightFromSquare aria-hidden="true" /></a>
        <span className="footer-location">{CONTACT.address.trim()}</span>
      </footer>
    </div>
  );
}

export default App;

