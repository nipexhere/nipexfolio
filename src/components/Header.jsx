import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { FaArrowRight, FaBars, FaXmark } from 'react-icons/fa6';
import { CONTACT } from '../constants';

const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];
const SECTION_IDS = ['home', ...NAV_LINKS.map((link) => link.id)];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false);
    const closeOnDesktop = () => window.innerWidth > 760 && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header${scrolled || menuOpen ? ' is-scrolled' : ''}`}>
        <Motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: progress }} />
        <div className="header-inner page-wrap">
          <a className="wordmark" href="#home" aria-label="Nipex, back to top" onClick={() => setMenuOpen(false)}>
            <span className="wordmark-icon">N</span>
            <span className="wordmark-name">Nipex</span>
          </a>

          <nav className="header-nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a aria-current={activeSection === link.id ? 'location' : undefined} href={`#${link.id}`} key={link.id}>
                {link.label}
                {activeSection === link.id && (
                  <Motion.span className="nav-indicator" layoutId="nav-indicator" transition={{ duration: reduceMotion ? 0 : 0.35 }} />
                )}
              </a>
            ))}
          </nav>

          <a className="header-cta" href={`mailto:${CONTACT.email}`}>
            Let’s talk <FaArrowRight aria-hidden="true" />
          </a>

          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </header>

        <AnimatePresence>
          {menuOpen && (
            <Motion.nav
              animate={{ opacity: 1 }}
              aria-label="Mobile navigation"
              className="mobile-menu"
              exit={{ opacity: 0 }}
              id="mobile-menu"
              initial={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
            >
              <div className="page-wrap">
                {NAV_LINKS.map((link, index) => (
                  <Motion.a
                    animate={{ opacity: 1, y: 0 }}
                    href={`#${link.id}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    key={link.id}
                    onClick={() => setMenuOpen(false)}
                    transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span>0{index + 1}</span>{link.label}
                  </Motion.a>
                ))}
                <a className="mobile-menu-email" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </Motion.nav>
          )}
        </AnimatePresence>
    </>
  );
}

export default Header;
