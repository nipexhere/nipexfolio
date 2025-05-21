import project1 from "../assets/projects/Gamifylogo.png";
import project2 from "../assets/projects/transpaylogo.png";
import project3 from "../assets/projects/nipportlogo.png";
import project4 from "../assets/projects/choplogo.png";

export const HERO_CONTENT = {
  greeting: "Hi Fam! 🖐️",
  introduction:
    "I’m Nipex (Adebayo Oseni), a creative frontend developer, crafting immersive and intuitive web and mobile experiences.",
  description:
    "I’m currently helping businesses and organizations bring their visions to life through interactive digital solutions.",
  resumeLinkText: "Download Resume",
  resumeLink: "/AdebayoResume.pdf",
};

export const ABOUT_TEXT = `I am a dedicated and versatile front end developer with a passion for creating efficient and user-friendly web applications. With years of professional experience, I have worked with a variety of technologies, including React, JavaScript, TailwindCss, and React Native. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "Nov 2024 - Present",
    role: "FrontEnd Developer",
    company: "YE Network.",
    description: `Led a team of Mentees in learning about web applications including HTML, CSS and React.js. consuming RESTful APIs and integrating with databases.`,
    technologies: ["HTML", "CSS" , "Javascript", "React.js"],
  },
  {
    year: "March 2025 - Present",
    role: "FrontEnd Developer intern",
    company: "Skye Studio",
    description: `Designed and developed user interfaces for web applications using React.JS and React Native. Worked closely with Senior developers. Implemented responsive designs and optimized frontend performance.`,
    technologies: ["React JS", "React Native", "NativeWind"],
  },
  
];

export const PROJECTS = [
  {
    title: "Gamify Hub",
    image: project1,
    description:
      "A Landing Page for a Gaming platform that connects Gamers from all around the World on thier favorite Games .",
    technologies: ["React", "TailwindCss, Framer-Motion"],
    link: "https://gameefy.vercel.app",
  },
  {
    title: "TransPay Finance Hub",
    image: project2,
    description:
      "A FinTech Landing Page website showcasing the Organizations Services and Products.",
    technologies: ["HTML", "CSS", "Javascript"],
    link: "https://transpayfinance.netlify.app",
  },
  {
    title: " Nipex Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information and Animated using Framer Motion.",
    technologies: ["React", "TailwindCss", "FramerMotion"],
    link: "https://nipexfolio.vercel.app",
  },
  {
    title: "CHOP n CHAW Kitchens",
    image: project4,
    description:
      "A Food Restaurant Kitchen Platform which showcases the Business and thier services. Allowing users to order food and drinks online",
    technologies: ["HTML", "CSS", "Javascript"],
    link: "https://chopnchaw.vercel.app",
  },
];

export const CONTACT = {
  address: "lagos, Lagos, Nigeria. ",
  phoneNo: "+234 802 918 6949 ",
  email: "hadebayorhusseini@gmail.com",
};
