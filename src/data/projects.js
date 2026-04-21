export const projects = [
  {
    id: "01",
    slug: "elite-portfolio",
    name: "ELITE",
    subname: "PORTFOLIO",
    domain: "PERSONAL / REACT",
    accent: "#C8F04D",
    image: "/Images/Personal_Portfolio.png",
    heroImage: "/Images/Personal_Portfolio.png",
    year: "2026",
    client: "Personal Brand Client",
    role: "Creative Development / GSAP / React",
    duration: "3 Days",
    tagline: "A cinematic digital experience for the modern creator.",
    overview:
      "The Elite Portfolio is a bespoke digital platform designed to showcase the work of a high-end creative director. It leverages React and GSAP to create a seamless, cinematic experience that feels more like an immersive gallery than a traditional website.",
    challenge:
      "The challenge was to maintain ultra-smooth 60FPS performance while using complex SVG filters and large, high-resolution imagery across multiple scroll-pinned sections.",
    solution:
      "We implemented a custom GPU-accelerated animation pipeline using GSAP and Lenis for smooth scrolling, combined with lazy-loading techniques and dynamic asset management to ensure a premium feel on all devices.",
    metrics: [
      { value: "60 FPS", label: "Render Performance" },
      { value: "100", label: "Aesthetics Score" },
      { value: "0.2s", label: "Page Transition" },
    ],
    tech: ["REACT", "GSAP", "LENIS", "VANILLA CSS", "VITE"],
    gallery: [
      "/Images/Personal_Portfolio.png",
      "/Images/Personal_Portfolio_Contact.png",
    ],
    liveLink: "https://adityahemantbhat.vercel.app/",
  },
  {
    id: "02",
    slug: "dribbble-clone",
    name: "DRIBBBLE",
    subname: "HOME",
    domain: "UI/UX / CLONE",
    accent: "#EA4C89",
    image: "/Images/Dribble_clone.png",
    heroImage: "/Images/Dribble_clone.png",
    year: "2024",
    client: "Design Portfolio",
    role: "Front-End Development",
    duration: "2 Days",
    tagline: "A precision-built clone of the world's premier design showcase.",
    overview:
      "A pixel-perfect recreation of the Dribbble homepage, developed purely with HTML, CSS, and Vanilla JavaScript. This project focuses on mastering layout precision, responsive grids, and subtle GSAP micro-interactions that mirror the original experience while adding a touch of agency-grade polish.",
    challenge:
      "The goal was to replicate a complex, content-heavy grid system while maintaining absolute performance and responsiveness without relying on heavy frameworks.",
    solution:
      "Leveraged CSS Grid for the layout architecture and GSAP for light-weight header and card hover animations. I implemented a robust search and filter simulation using pure JS to demonstrate functional fidelity.",
    metrics: [
      { value: "PX", label: "Perfect Precision" },
      { value: "100", label: "Accessibility" },
      { value: "0", label: "Dependencies" },
    ],
    tech: ["HTML5", "CSS3", "JAVASCRIPT", "GSAP"],
    gallery: [
      "/Images/Dribble_clone.png",
      "/Images/Dribble_clone_projects.png",
    ],
    liveLink: "https://adityahemantbhat.github.io/cohort-2.0/Assignment%20-%2006/",
  },
  {
    id: "03",
    slug: "burgery-ecommerce",
    name: "BURGERY",
    subname: "E-COMMERCE",
    domain: "ECOMMERCE / FOOD",
    accent: "#FFB200",
    image: "/Images/Burgery_Website.png",
    heroImage: "/Images/Burgery_Website.png",
    year: "2024",
    client: "The Burger Lab",
    role: "Lead Agency / Full-Stack",
    duration: "2 Days",
    tagline: "The ultimate digital bite.",
    overview:
      "Burgery is a high-performance e-commerce website for a premium burger chain. We transformed the standard ordering flow into a visceral, cinematic experience. Featuring real-time cart updates, an immersive menu transition system, and a checkout process designed for maximum conversion.",
    challenge:
      "The fast food industry suffers from clunky, cookie-cutter ordering apps. The client wanted something that felt as fresh and handmade as their burgers.",
    solution:
      "We implemented a custom React-based ordering system with GSAP-driven menu transitions. Every item interaction triggers a micro-animation, making the selection process feel tactile and satisfying. The backend is optimized for sub-second database queries and real-time inventory updates.",
    metrics: [
      { value: "45%", label: "CR Increase" },
      { value: "< 2s", label: "Load Time" },
      { value: "100", label: "UX Score" },
    ],
    tech: ["REACT", "REDUX", "GSAP", "TAILWIND CSS", "NODE.JS"],
    gallery: [
      "/Images/Burgery_Website.png",
      "/Images/Burgery_Website_1.png",
    ],
    liveLink: "https://adityahemantbhat.github.io/cohort-2.0/Burgry/",
  },
  
];
