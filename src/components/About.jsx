import { useState } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import portrait from '../assets/adebayo-portrait.webp';
import { ABOUT_TEXT, CONTACT, EXPERIENCES, HERO_CONTENT, SKILL_GROUPS } from '../constants';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const repairSince = EXPERIENCES.find((experience) => experience.company === 'Freelance').year.match(/\d{4}/)[0];

const FACTS = [
  { label: 'Based in', value: CONTACT.address },
  { label: 'Focus', value: 'Full software products, from interface to backend' },
  { label: 'Teaching', value: 'Coding & electronics, fundamentals to full builds' },
  { label: 'Off-screen', value: `Repairing phones and tablets since ${repairSince}` },
];

function SkillGroup({ group, index }) {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <Reveal className="skill-card" delay={index * 0.08}>
      <div className="skill-card-head">
        <span>0{index + 1}</span>
        <h3>{group.label}</h3>
      </div>
      <p className="skill-card-description">{group.description}</p>
      <ul className="skill-chips">
        {group.skills.map((skill) => (
          <li key={skill.name}>
            <button
              aria-pressed={activeSkill?.name === skill.name}
              onClick={() => setActiveSkill(skill)}
              onFocus={() => setActiveSkill(skill)}
              onMouseEnter={() => setActiveSkill(skill)}
              type="button"
            >
              {skill.name}
            </button>
          </li>
        ))}
      </ul>
      <p aria-live="polite" className="skill-note">
        {activeSkill
          ? <><strong>{activeSkill.name}</strong>{activeSkill.detail}</>
          : <span>Hover or tap a tool to see how I use it.</span>}
      </p>
    </Reveal>
  );
}

function About() {
  return (
    <section className="about-section page-wrap" id="about">
      <SectionHeading index="02" label="About" title="Make it clear." accent="Make it work." />

      <div className="about-grid">
        <Reveal className="portrait">
          <img alt="Portrait of Adebayo Oseni" height="900" loading="lazy" src={portrait} width="720" />
          <span className="portrait-tag">Adebayo “Nipex” Oseni</span>
        </Reveal>

        <div className="about-body">
          {ABOUT_TEXT.map((paragraph, index) => (
            <Reveal as="p" className={index === 0 ? 'about-lead' : 'about-copy'} delay={index * 0.08} key={paragraph}>
              {paragraph}
            </Reveal>
          ))}
          <Reveal as="dl" className="about-facts" delay={0.16}>
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.2}>
            <a className="text-link" href={HERO_CONTENT.resumeLink} target="_blank" rel="noreferrer">
              Read my résumé <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>

      <div className="skills">
        <Reveal className="skills-intro">
          <h3>What I work with</h3>
          <p>From pixels and products to Python and physical builds.</p>
        </Reveal>
        <div className="skill-grid">
          {SKILL_GROUPS.map((group, index) => <SkillGroup group={group} index={index} key={group.label} />)}
        </div>
      </div>
    </section>
  );
}

export default About;
