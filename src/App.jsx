import { FaArrowUp } from 'react-icons/fa6';
import { CONTACT } from './constants';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Work from './components/Work';

const DISCIPLINES = ['Digital products', 'Software engineering', 'Teaching and mentorship', 'Code and circuits', 'Interactive 3D'];

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#work">Skip to content</a>
      <Header />

      <main>
        <Hero />

        <div className="discipline-marquee" role="group" aria-label="Areas of work">
          <div className="discipline-track">
            {[0, 1].map((copy) => (
              <div aria-hidden={copy === 1} className="discipline-group" key={copy}>
                {DISCIPLINES.map((discipline) => <span key={discipline}>{discipline}</span>)}
              </div>
            ))}
          </div>
        </div>

        <Work />
        <About />
        <Journey />
        <Contact />
      </main>

      <footer className="site-footer page-wrap">
        <a className="footer-brand" href="#home">NIPEX<span>®</span></a>
        <p>Independent by nature. Collaborative by design.</p>
        <p className="footer-meta">© {new Date().getFullYear()} Adebayo Oseni · {CONTACT.address}</p>
        <a className="back-to-top" href="#home">Back to top <FaArrowUp aria-hidden="true" /></a>
      </footer>
    </div>
  );
}

export default App;
