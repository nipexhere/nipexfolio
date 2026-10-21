import casebookShot from "../assets/projects/shots/casebook.jpg";
import crownBabiesShot from "../assets/projects/shots/crownbabies.jpg";
import lawDinnerShot from "../assets/projects/shots/lawdinner.jpg";
import lexortShot from "../assets/projects/shots/lexort.jpg";
import monocheShot from "../assets/projects/shots/monoche.jpg";
import nipexShot from "../assets/projects/shots/nipex.jpg";
import northstarShot from "../assets/projects/shots/northstar.jpg";
import pexyDropShot from "../assets/projects/shots/pexydrop.jpg";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

export const HERO_CONTENT = {
  introduction:
    "I’m Nipex (Adebayo Oseni), a software engineer and creative technologist building thoughtful web experiences, useful products, and playful experiments.",
  description:
    "From React products and e-commerce to Python tools and Arduino experiments, I turn ideas into things people can use.",
  resumeLinkText: "Download Resume",
  resumeLink: "/AdebayoResume.pdf",
};

export const ABOUT_TEXT = [
  "I’m Adebayo Oseni, known as Nipex, a Lagos-based software engineer who enjoys taking ideas from first sketch to complete, working software. I build across the whole stack, from React interfaces and APIs to databases, deployment, e-commerce, and interactive 3D, and I use AI tools to move from idea to shipped product faster.",
  "I also teach coding and electronics across the board, from programming fundamentals and web development to microcontrollers and circuit building, bringing a practical hardware-repair mindset to solving technical problems. I’ve led and mentored learners, worked with clients, and built products with teams. I care about clear interfaces, reliable details, and making technology feel approachable.",
];

export const EXPERIENCES = [
  {
    year: "Jan 2026 - Present",
    role: "Coding & Electronics Instructor",
    company: "Independent",
    description: "Teaching coding and electronics across the board, from programming fundamentals and web development to app building, microcontrollers, and circuits, making technical concepts practical through hands-on projects.",
    technologies: ["Programming", "Web development", "Python", "Arduino", "Electronics"],
  },
  {
    year: "2026",
    role: "Lead Frontend Engineer",
    company: "Lexort",
    description: "Led development of a React-based legal case-filing platform, translating Figma designs into responsive interfaces and building role-aware workflows for admins, judges, and clerks on top of backend APIs. The project has since wound down, but the platform is still live.",
    technologies: ["React", "Vite", "REST APIs", "Figma"],
  },
  {
    year: "Dec 2025",
    role: "Frontend Developer",
    company: "Monoche",
    description: "Designed and built a landing page for a friend's picturebook and photobook startup idea.",
    technologies: ["React", "Responsive UI"],
  },
  {
    year: "Oct 2025",
    role: "Developer",
    company: "Law Dinner Ticketing Platform",
    description: "Built a React ticketing application with Supabase-backed ticket generation and an admin dashboard for managing the event.",
    technologies: ["React", "Supabase", "Vite"],
  },
  {
    year: "Aug 2025 - Nov 2025",
    role: "Team Lead, Coding Mentorship",
    company: "YE Network",
    description: "Volunteered as a team lead in a mentorship program, coaching participants through coding exercises and professional development.",
    technologies: ["Mentoring", "HTML", "CSS", "React"],
  },
  {
    year: "May 2025 - 2026",
    role: "Frontend / Web Developer",
    company: "Crown Babies",
    description: "Built and maintained a maternity, baby, and fashion e-commerce storefront. Customized WordPress pages with Elementor and configured WooCommerce products, categories, shipping, payments, and WhatsApp customer support.",
    technologies: ["WordPress", "WooCommerce", "Elementor", "Cloudflare"],
  },
  {
    year: "2024 - 2025",
    role: "Intern, Frontend Developer",
    company: "Skye Studio",
    description: "Developed and maintained responsive web and mobile applications with modern JavaScript frameworks, collaborating with senior developers.",
    technologies: ["React", "React Native", "NativeWind"],
  },
  {
    year: "May 2020 - Present",
    role: "Mobile Hardware Engineer",
    company: "Freelance",
    description: "Diagnose and repair hardware issues in smartphones and tablets, bringing hands-on troubleshooting experience to my software work.",
    technologies: ["Hardware diagnostics", "Repair"],
  },
];

export const PROJECTS = [
  {
    title: "Casebook Studio",
    image: casebookShot,
    category: "product",
    description: "A focused Nigerian Law School study workspace for organizing searchable case briefs by course, practicing active recall, and tracking weekly study time. Casebooks and study logs can be backed up as JSON and CSV.",
    technologies: ["Python", "Streamlit", "JSON / CSV"],
    link: "https://casebookstudio.streamlit.app/",
    sourceLink: "https://github.com/nipexhere/lawschoolstudy",
  },
  {
    title: "PexyDrop",
    image: pexyDropShot,
    category: "product",
    description: "A private, passphrase-protected file relay for moving files between paired devices. Includes QR-based pairing, support for large files, and a session-based transfer workflow.",
    technologies: ["React", "TypeScript", "Vite", "Node.js", "Express", "Multer", "Archiver", "qrcode.react", "Lucide React"],
    link: "https://pexydrop.onrender.com/",
  },
  {
    title: "Northstar Capital",
    image: northstarShot,
    category: "product",
    description: "An independent finance-focused web project built with React, backed by Neon, and deployed on Render.",
    technologies: ["React", "Neon", "Render"],
    link: "https://northstar-capital.onrender.com/",
  },
  {
    title: "Crown Babies",
    image: crownBabiesShot,
    category: "client",
    description: "A client e-commerce storefront for maternity, baby, and fashion products, with a tailored WooCommerce catalog and WhatsApp support.",
    technologies: ["WordPress", "WooCommerce", "Elementor", "Cloudflare"],
    link: "https://crownbabies.com",
  },
  {
    title: "Law Dinner",
    image: lawDinnerShot,
    category: "client",
    description: "A dinner-event ticketing platform with ticket generation and an admin dashboard for event management.",
    technologies: ["React", "Supabase", "Admin dashboard"],
    link: "https://lawdinner.vercel.app",
  },
  {
    title: "Monoche",
    image: monocheShot,
    category: "experiment",
    description: "A landing page for a friend's picturebook and photobook startup idea, designed to introduce the concept with a clear, responsive web presence.",
    technologies: ["React", "Responsive UI"],
    link: "https://monoche.vercel.app",
  },
  {
    title: "Nipex Portfolio",
    image: nipexShot,
    category: "experiment",
    description: "My evolving portfolio: an expressive React experience with an interactive Three.js sculpture and motion-led storytelling.",
    technologies: ["React", "Three.js", "Framer Motion"],
    link: "https://nipexfolio.vercel.app",
  },
  {
    title: "Lexort",
    image: lexortShot,
    category: "client",
    description: "A legal case-filing platform with responsive interfaces and role-aware workflows for admins, judges, and clerks. I led its frontend; the project has wound down, but the platform is still live to explore.",
    technologies: ["React", "Vite", "REST APIs"],
    link: "https://lexort-admin.vercel.app",
  },
];

export const CONTACT = {
  address: "Lagos, Nigeria",
  phoneNo: "+234 802 918 6949",
  email: "hadebayorhusseini@gmail.com",
};

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/nipexhere", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adebayo-oseni", icon: FaLinkedin },
  { label: "Instagram", href: "https://www.instagram.com/nipexfvr", icon: FaInstagram },
];

export const PROJECT_CATEGORIES = {
  product: "Product",
  client: "Client work",
  experiment: "Experiment",
};

export const SKILL_GROUPS = [
  {
    label: "Web & product",
    description: "Interfaces, experiences, and products for the web.",
    skills: [
      { name: "React", detail: "Building responsive interfaces and product workflows." },
      { name: "JavaScript", detail: "Bringing application behavior and browser interactions to life." },
      { name: "TypeScript", detail: "Adding stronger types to make application code easier to maintain." },
      { name: "React Native", detail: "Creating cross-platform mobile application interfaces." },
      { name: "Tailwind CSS", detail: "Developing consistent, responsive interface styling." },
      { name: "Framer Motion", detail: "Adding purposeful transitions and scroll-triggered movement." },
      { name: "Three.js", detail: "Creating the interactive 3D orbital sculpture on this portfolio." },
      { name: "WordPress", detail: "Building and maintaining client websites and storefronts." },
      { name: "WooCommerce", detail: "Setting up products, categories, shipping, and payments for online stores." },
      { name: "Elementor", detail: "Customizing responsive WordPress pages for client needs." },
    ],
  },
  {
    label: "Data & delivery",
    description: "The services and tools that help products work end to end.",
    skills: [
      { name: "Python", detail: "Writing Python programs and tools." },
      { name: "Streamlit", detail: "Building interactive apps and dashboards with Python." },
      { name: "Node.js", detail: "Running the Express server behind PexyDrop’s file relay." },
      { name: "Neon", detail: "Using hosted Postgres as the data layer for Northstar Capital." },
      { name: "Supabase", detail: "Powering ticket generation and admin workflows for Law Dinner." },
      { name: "Resend", detail: "Integrating email delivery into web application workflows." },
      { name: "Cloudflare", detail: "Using Cloudflare services alongside client web projects." },
      { name: "Render", detail: "Deploying Northstar Capital and PexyDrop." },
    ],
  },
  {
    label: "Hardware & teaching",
    description: "Hands-on programming lessons that connect code to physical builds.",
    skills: [
      { name: "Arduino programming", detail: "Teaching Arduino programming and microcontroller fundamentals." },
      { name: "Small circuit building", detail: "Guiding learners through small circuits, components, and practical builds." },
      { name: "Coding instruction", detail: "Teaching programming and web development across languages and tools, from fundamentals to full builds." },
      { name: "Scratch", detail: "Using visual projects to introduce programming concepts." },
      { name: "Hardware diagnostics", detail: "Troubleshooting and repairing phones and tablets." },
    ],
  },
];
