import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion as Motion, useReducedMotion } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import { PROJECT_CATEGORIES, PROJECTS } from '../constants';
import SectionHeading from './SectionHeading';

const FILTERS = [
  { label: 'Everything', value: 'all' },
  ...Object.entries(PROJECT_CATEGORIES).map(([value, label]) => ({ label, value })),
];

const countFor = (value) => PROJECTS.filter((project) => value === 'all' || project.category === value).length;

function ProjectCard({ project, featured }) {
  const reduceMotion = useReducedMotion();
  const title = project.title.trim();
  const number = String(PROJECTS.indexOf(project) + 1).padStart(2, '0');
  const host = new URL(project.link).host.replace(/^www\./, '');

  return (
    <Motion.article
      animate={{ opacity: 1, y: 0 }}
      className={`project-card${featured ? ' is-featured' : ''}`}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12, transition: { duration: 0.2 } }}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      layout={!reduceMotion}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="project-media" href={project.link} target="_blank" rel="noreferrer" aria-label={`Open the ${title} live site`}>
        <span className="browser-bar" aria-hidden="true">
          <span className="browser-dots"><i /><i /><i /></span>
          <span className="browser-url">{host}</span>
        </span>
        <span className="project-shot">
          <img alt="" decoding="async" height="800" loading="lazy" src={project.image} width="1280" />
        </span>
        <span className="project-media-cta" aria-hidden="true">Visit live site <FaArrowUpRightFromSquare /></span>
      </a>

      <div className="project-body">
        <p className="project-kicker"><span>{number}</span>{PROJECT_CATEGORIES[project.category]}</p>
        <h3>{title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="tag-list" aria-label="Built with">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div className="project-links">
          <a href={project.link} target="_blank" rel="noreferrer">Live site <FaArrowUpRightFromSquare aria-hidden="true" /></a>
          {project.sourceLink && (
            <a href={project.sourceLink} target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> Source code</a>
          )}
        </div>
      </div>
    </Motion.article>
  );
}

function Work() {
  const [activeFilter, setActiveFilter] = useState('all');
  const reduceMotion = useReducedMotion();
  const visibleProjects = PROJECTS.filter((project) => activeFilter === 'all' || project.category === activeFilter);

  return (
    <section className="work-section" id="work">
      <div className="page-wrap">
        <SectionHeading
          index="01"
          label="Selected work"
          title="Useful things,"
          accent="made real."
          aside="Products, client builds, and experiments across commerce, legal tech, education, and event tools."
        />

        <LayoutGroup>
          <div className="project-filters" role="group" aria-label="Filter projects">
            {FILTERS.map((filter) => (
              <button
                aria-pressed={activeFilter === filter.value}
                className="project-filter"
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
              >
                {activeFilter === filter.value && (
                  <Motion.span className="project-filter-pill" layoutId="project-filter-pill" transition={{ duration: reduceMotion ? 0 : 0.35 }} />
                )}
                <span>{filter.label}</span>
                <span className="project-filter-count">{countFor(filter.value)}</span>
              </button>
            ))}
          </div>

          <Motion.div className="project-grid" layout={!reduceMotion}>
            <AnimatePresence initial={false} mode="popLayout">
              {visibleProjects.map((project, index) => (
                <ProjectCard featured={index === 0} key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </Motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}

export default Work;
