import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';


const App = () => {
  return (
    <div className="overflow-x-hidden text-stone-300 antialiased">
      {/* Background Wrapper */}
      <div className="absolute inset-0 -z-20 h-full w-full">
        <div className="relative min-h-screen">
        <div className="fixed inset-0 -z-20 w-full h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-8 pt-24 min-h-screen">
        <Navbar />
        <Hero />
        <Technologies />
        <Projects />
<Experience />
<Contact />
      </div>
      
    </div>
  );
}

export default App;

