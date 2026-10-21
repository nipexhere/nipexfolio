import { useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';
import { EXPERIENCES } from '../constants';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function Journey() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section className="journey-section page-wrap" id="journey">
      <SectionHeading
        index="03"
        label="Journey"
        title="Learn by"
        accent="making."
        aside="Product work, teaching, and hands-on problem solving have all shaped how I build."
      />

      <Reveal>
        <button
          aria-controls="journey-timeline"
          aria-expanded={open}
          className="journey-toggle"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span className="journey-toggle-copy">
            <strong>{open ? 'Close my journey' : 'Explore my journey'}</strong>
            <span>{String(EXPERIENCES.length).padStart(2, '0')} roles across software, teaching, and hardware</span>
          </span>
          <Motion.span
            animate={{ rotate: open ? 180 : 0 }}
            aria-hidden="true"
            className="journey-toggle-icon"
            transition={{ duration: reduceMotion ? 0 : 0.3, ease }}
          >
            <FaChevronDown />
          </Motion.span>
        </button>
      </Reveal>

      <AnimatePresence initial={false}>
        {open && (
          <Motion.div
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            id="journey-timeline"
            initial={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
          >
            <ol className="timeline">
              {EXPERIENCES.map((experience, index) => (
                <Motion.li
                  animate={{ opacity: 1, y: 0 }}
                  className="timeline-item"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  key={`${experience.company}-${experience.role}`}
                  transition={{ duration: 0.45, delay: 0.1 + index * 0.05, ease }}
                >
                  <p className="timeline-date">
                    {experience.year}
                    {experience.year.includes('Present') && <span className="now-badge">Now</span>}
                  </p>
                  <div className="timeline-heading">
                    <h3>{experience.role}</h3>
                    <p>{experience.company}</p>
                  </div>
                  <div className="timeline-body">
                    <p>{experience.description}</p>
                    <ul className="tag-list" aria-label="Tools and skills">
                      {experience.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                  </div>
                </Motion.li>
              ))}
            </ol>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Journey;
