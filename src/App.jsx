import { createElement, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  FaArrowDown,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaChevronDown,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa6';
import { ABOUT_TEXT, CONTACT, EXPERIENCES, HERO_CONTENT, PROJECTS } from './constants';
import portrait from './assets/Adebayo.png';
import AmbientBackground from './components/AmbientBackground';
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

const tickerSkills = skillGroups.flatMap(({ skills: groupSkills }) => groupSkills.map(({ name }) => name));

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return createElement(motion.div, {
    className,
    initial: { opacity: 0, y: reduceMotion ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-72px' },
    transition: { duration: reduceMotion ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }, children);
}

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="section-label-line" />
      <span>{children}</span>
    </div>
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
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="skills-stage"
          exit={{ opacity: 0, y: -8 * movement }}
          initial={{ opacity: 0, y: 12 * movement }}
          key={activeGroup.label}
          transition={{ duration: 0.28 }}
        >
          <p className="skill-group-description">{activeGroup.description}</p>
          <motion.div
            animate="visible"
            className="skill-list"
            initial="hidden"
            variants={{ visible: { transition: { staggerChildren: 0.045 * movement } } }}
          >
            {activeGroup.skills.map((skill, index) => (
              <motion.button
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
              </motion.button>
            ))}
          </motion.div>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              aria-live="polite"
              className="skill-detail"
              exit={{ opacity: 0, y: -5 * movement }}
              initial={{ opacity: 0, y: 7 * movement }}
              key={activeSkill.name}
              transition={{ duration: 0.2 }}
            >
              <span className="skill-detail-label">SELECTED TOOL</span>
              <strong>{activeSkill.name}</strong>
              <p>{activeSkill.detail}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState(null);
  const reduceMotion = useReducedMotion();
  const accordionDuration = reduceMotion ? 0 : 0.42;
  const toggleDuration = reduceMotion ? 0 : 0.3;
  const detailDuration = reduceMotion ? 0 : 0.3;

  return (
    <div className="site-shell">
      <AmbientBackground />
      <header className="site-header page-wrap">
        <a className="wordmark" href="#home" aria-label="Nipex, back to top">
          <span className="wordmark-icon">N.</span>
          <span className="wordmark-name">NIPEX<span>®</span></span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Journey</a>
          <a href="#contact">Contact <FaArrowUpRightFromSquare aria-hidden="true" /></a>
        </nav>
        <a className="availability" href={`mailto:${CONTACT.email}`}>
          <span className="availability-dot" />
          <span>Available for select projects</span>
        </a>
      </header>

      <main>
        <section className="hero page-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span>INDEPENDENT DEVELOPER</span><span className="eyebrow-dot">/</span><span>LAGOS, NG</span></div>
            <h1>Adebayo<br /><span>Oseni.</span></h1>
            <p className="hero-role">Frontend developer <span>+</span> creative technologist</p>
            <p className="hero-intro">I build thoughtful web products, from React platforms and online stores to interactive Three.js experiments. Curious by nature, practical by default.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore my work <FaArrowDown aria-hidden="true" /></a>
              <a className="text-link" href={`mailto:${CONTACT.email}`}>Let's talk <FaArrowUpRightFromSquare aria-hidden="true" /></a>
            </div>
            <div className="hero-socials" aria-label="Social links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  {createElement(Icon, { 'aria-hidden': true })}
                </a>
              ))}
              <span className="social-note">Find me around the web</span>
            </div>
          </div>

          <div className="hero-art-wrap">
            <div className="hero-art" aria-label="Portrait of Adebayo Oseni with an interactive 3D orbital sculpture">
              <OrbitalScene />
              <img className="hero-portrait" src={portrait} alt="Adebayo Oseni, frontend developer" />
              <div className="art-index">FIG. 01 <span>THE BUILDER</span></div>
              <div className="art-caption"><span className="art-caption-mark">N</span><span>Curiosity,<br />made tangible.</span></div>
              <div className="art-coordinate">06° 27' N<br />03° 23' E</div>
            </div>
            <div className="art-side-note"><span /> DESIGNING FROM LAGOS, BUILDING FOR EVERYWHERE</div>
          </div>
          <div className="hero-bottom-note"><span>SCROLL TO EXPLORE</span><span className="hero-bottom-line" /></div>
        </section>

        <div className="ticker" aria-label="Tools and technologies">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
                {tickerSkills.map((skill) => <span className="ticker-item" key={`${copy}-${skill}`}>{skill}<i>✳</i></span>)}
              </div>
            ))}
          </div>
        </div>

        <section className="about-section page-wrap" id="about">
          <SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel>
          <div className="about-grid">
            <Reveal>
              <h2>Good code is<br />felt, <span>not just seen.</span></h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="about-copy">{ABOUT_TEXT}</p>
              <a className="resume-link" href={HERO_CONTENT.resumeLink} target="_blank" rel="noreferrer">
                A little more about my journey <FaArrowUpRightFromSquare aria-hidden="true" />
              </a>
            </Reveal>
          </div>
          <div className="skills-row">
            <div className="skills-intro">
              <span className="skills-heading">MY EVERYDAY TOOLKIT</span>
              <p>From pixels and products to Python and physical builds.</p>
            </div>
            <SkillsShowcase />
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="page-wrap">
            <SectionLabel number="02">SELECTED WORK</SectionLabel>
            <div className="section-heading-row">
              <Reveal><h2>Ideas, meet<br /><span>the internet.</span></h2></Reveal>
              <p className="section-aside">Independent ideas, client builds, and product work, from e-commerce and event tech to legal platforms and interactive 3D.</p>
            </div>
            <div className="project-grid">
              {PROJECTS.map((project, index) => (
                <Reveal key={project.title} delay={(index % 2) * 0.1} className={`project-reveal project-reveal-${index + 1}`}>
                  <a className={`project-card project-card-${index + 1}`} href={project.link} target="_blank" rel="noreferrer">
                    <div className="project-visual">
                      <span className="project-number">0{index + 1} / 0{PROJECTS.length}</span>
                      <span className={`project-poster project-poster-${project.visual}`} aria-hidden="true">
                        <span className="poster-mark">{project.mark}</span>
                        <span className="poster-title">{project.title}</span>
                        <span className="poster-type">{project.type}</span>
                      </span>
                      <span className="project-open" aria-label={`Open ${project.title}`}><FaArrowUpRightFromSquare aria-hidden="true" /></span>
                      <span className="project-visual-caption">LIVE PROJECT <i>↗</i></span>
                    </div>
                    <div className="project-details">
                      <div><h3>{project.title.trim()}</h3><p>{project.description}</p></div>
                      <div className="project-meta"><span>{project.technologies.join(' · ')}</span><FaArrowRight aria-hidden="true" /></div>
                    </div>
                  </a>
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
          <SectionLabel number="03">THE JOURNEY SO FAR</SectionLabel>
          <div className="experience-heading">
            <Reveal><h2>Learning by<br /><span>making.</span></h2></Reveal>
            <p>Good work comes from good people. Here are a few chapters along the way.</p>
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
            <motion.span animate={{ rotate: experienceOpen ? 180 : 0 }} aria-hidden="true" className="experience-disclosure-icon" transition={{ duration: toggleDuration, ease: [0.22, 1, 0.36, 1] }}>
              <FaChevronDown />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {experienceOpen && (
              <motion.div
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
                          <span className="experience-index">{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <button
                              aria-controls={detailsId}
                              aria-expanded={isExpanded}
                              className="experience-toggle"
                              onClick={() => setExpandedExperience((current) => current === index ? null : index)}
                              type="button"
                            >
                              <span>{experience.role}</span>
                              <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} aria-hidden="true" className="experience-toggle-icon" transition={{ duration: reduceMotion ? 0 : 0.24 }}>
                                <FaChevronDown />
                              </motion.span>
                            </button>
                            <p className="experience-company">{experience.company}</p>
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
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
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner page-wrap">
            <SectionLabel number="04">YOUR MOVE</SectionLabel>
            <Reveal>
              <h2>Have a good<br /><span>one in mind?</span></h2>
              <p>Have a project, a big idea, or just want to talk good design? My inbox is open.</p>
              <a className="button button-light" href={`mailto:${CONTACT.email}`}>Start a conversation <FaArrowUpRightFromSquare aria-hidden="true" /></a>
            </Reveal>
            <span className="contact-stamp" aria-hidden="true">LET'S<br />MAKE<br />SOMETHING<br />MATTER.</span>
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

