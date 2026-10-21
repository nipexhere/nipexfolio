import { createElement, useEffect, useState } from 'react';
import { FaArrowUpRightFromSquare, FaCheck, FaRegCopy } from 'react-icons/fa6';
import { CONTACT, HERO_CONTENT, SOCIAL_LINKS } from '../constants';
import Reveal from './Reveal';

const lagosTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' });

function useLagosTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return lagosTime.format(now);
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const time = useLagosTime();

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner page-wrap">
        <p className="section-label"><span>04</span>Contact</p>
        <Reveal as="h2">What are you<br /><span>working on?</span></Reveal>
        <Reveal as="p" className="contact-intro" delay={0.08}>
          Have a product to shape, a problem to solve, or a practical idea worth testing? Tell me about it.
        </Reveal>

        <Reveal className="contact-email" delay={0.14}>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <button aria-label={copied ? 'Email address copied' : 'Copy email address'} onClick={copyEmail} type="button">
            {copied ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </Reveal>

        <Reveal className="contact-meta" delay={0.2}>
          <ul className="contact-links">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer">
                  {createElement(icon, { 'aria-hidden': true })} {label}
                </a>
              </li>
            ))}
            <li>
              <a href={HERO_CONTENT.resumeLink} target="_blank" rel="noreferrer">
                Résumé <FaArrowUpRightFromSquare aria-hidden="true" />
              </a>
            </li>
          </ul>
          <p className="contact-clock">
            <span className="status-dot" aria-hidden="true" />
            {time} in Lagos
          </p>
        </Reveal>
        <span className="contact-stamp" aria-hidden="true">N.</span>
      </div>
    </section>
  );
}

export default Contact;
