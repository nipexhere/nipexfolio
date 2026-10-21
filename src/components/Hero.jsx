import { createElement, lazy, Suspense, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { FaArrowDown, FaArrowRight, FaBolt } from 'react-icons/fa6';
import { CONTACT, EXPERIENCES, HERO_CONTENT, SOCIAL_LINKS } from '../constants';

// three.js is the heaviest dependency, so the sculpture loads after the text.
const OrbitalScene = lazy(() => import('./OrbitalScene'));

const recentLead = EXPERIENCES.find((experience) => experience.company === 'Lexort');

const NOW_ITEMS = [
  { label: 'Now', value: 'Teaching coding & electronics' },
  { label: 'Recently', value: `${recentLead.role}, ${recentLead.company}` },
  { label: 'Based in', value: `${CONTACT.address} · GMT+1` },
];

function Hero() {
  const [scenePulse, setScenePulse] = useState(0);
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];
  const enter = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section className="hero" id="home">
      <div className="hero-visual">
        <Suspense fallback={null}>
          <OrbitalScene pulseKey={scenePulse} />
        </Suspense>
      </div>

      <div className="hero-inner page-wrap">
        <div className="hero-copy">
          <Motion.p className="hero-status" {...enter(0)}>
            <span className="status-dot" aria-hidden="true" />
            Available for select projects
          </Motion.p>
          <h1 aria-label="Adebayo Oseni">
            {['Adebayo', 'Oseni'].map((word, index) => (
              <span aria-hidden="true" className="hero-line" key={word}>
                <Motion.span
                  animate={{ y: '0%' }}
                  initial={reduceMotion ? false : { y: '105%' }}
                  transition={{ duration: 1, delay: 0.1 + index * 0.12, ease }}
                >
                  {word}{index === 1 && <span className="hero-period">.</span>}
                </Motion.span>
              </span>
            ))}
          </h1>
          <Motion.p className="hero-role" {...enter(0.35)}>Software engineer &amp; creative technologist</Motion.p>
          <Motion.p className="hero-intro" {...enter(0.45)}>
            From role-aware legal workflows to private file transfer and hands-on electronics, I turn complex ideas into experiences that feel simple.
          </Motion.p>
          <Motion.div className="hero-actions" {...enter(0.55)}>
            <a className="button button-primary" href="#work">See selected work <FaArrowRight aria-hidden="true" /></a>
            <a className="button button-ghost" href={HERO_CONTENT.resumeLink} target="_blank" rel="noreferrer">
              Résumé <FaArrowDown aria-hidden="true" />
            </a>
          </Motion.div>
          <Motion.div className="hero-socials" {...enter(0.65)}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                {createElement(icon, { 'aria-hidden': true })}
              </a>
            ))}
          </Motion.div>
        </div>
      </div>

      <div className="hero-footer page-wrap">
        <dl className="hero-now">
          {NOW_ITEMS.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
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
    </section>
  );
}

export default Hero;
