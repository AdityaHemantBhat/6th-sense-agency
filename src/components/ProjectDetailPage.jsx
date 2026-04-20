import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./Navigation";

gsap.registerPlugin(ScrollTrigger);

import { projects as projectsData } from "../data/projects";

export default function ProjectDetailPage({ id }) {
  // Pad the id to match "01", "02", etc.
  const paddedId = String(id).padStart(2, '0');
  const projectRaw = projectsData.find(p => p.id === paddedId) || projectsData[0];
  
  // Map data to component fields
  const project = {
    ...projectRaw,
    title: `${projectRaw.name} ${projectRaw.subname}`,
    category: projectRaw.domain,
    color: projectRaw.accent,
    img: projectRaw.heroImage || projectRaw.image,
    desc: projectRaw.overview
  };
  
  const containerRef = useRef(null);
  const heroImageRef = useRef(null);
  const titleCharsRef = useRef([]);
  const infoRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    titleCharsRef.current = titleCharsRef.current.filter(Boolean);

    const tl = gsap.timeline();

    // 1. Image Zoom Entrance — NO filter animation, just scale + opacity
    tl.fromTo(heroImageRef.current, 
      { scale: 1.4, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
    );

    // 2. Titles Cascade Down — transform-only, no filter
    if (titleCharsRef.current.length > 0) {
      tl.fromTo(titleCharsRef.current,
        { y: -100, opacity: 0, rotateX: 90 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.05, duration: 1, ease: "back.out(1.5)" },
        "-=1.5"
      );
    }

    // 3. Info Fade In
    tl.fromTo(infoRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=1.0"
    );

    // 4. Infinite Marquee Animation — GPU-accelerated
    if (marqueeRef.current) {
       gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
          force3D: true,
       });
    }

    // Scroll Parallax — transform only
    gsap.to(heroImageRef.current, {
      yPercent: 30,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [id]);

  return (
    <div ref={containerRef} className="bg-[#080808] min-h-screen w-full relative text-[#F5F0E8] overflow-hidden">
      
      {/* Nav */}
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-auto">
        <Navigation />
      </div>

      <button 
        onClick={() => window.navigateTo ? window.navigateTo("/#projects") : window.location.href = "/#projects"}
        className="fixed top-6 left-6 md:top-12 md:left-12 z-[100] px-4 py-2 sm:px-6 rounded-full border border-white/20 bg-black/50 text-[10px] sm:text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-colors hover-target hidden md:block"
      >
        Back to Work
      </button>

      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] sm:h-[80vh] md:h-screen flex flex-col justify-end overflow-hidden pb-8 sm:pb-12 md:pb-24">
         <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <div 
               ref={heroImageRef}
               className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center"
               style={{ 
                 backgroundImage: `url(${project.img})`,
                 filter: "brightness(0.6)",
                 willChange: "transform",
                 transform: "translateZ(0)",
               }}
            />
         </div>
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent z-10" />
         
          <div className="relative z-20 px-4 sm:px-6 md:px-12 w-full flex flex-col">
            <div className="flex flex-wrap gap-x-1 sm:gap-x-2 md:gap-x-3 mb-6 overflow-hidden">
               {project.title.split("").map((char, i) => (
                  <h1 
                    key={i} 
                    ref={el => titleCharsRef.current[i] = el}
                    className={`${project.title.length > 14 ? 'text-[8vw] sm:text-[9vw] md:text-[8.5vw]' : 'text-[10vw] sm:text-[12vw] md:text-[12vw]'} font-display uppercase leading-none tracking-tighter`}
                    style={{ 
                      display: "inline-block", 
                      color: i % 2 === 0 ? "#F5F0E8" : project.color, 
                    }}
                  >
                     {char === " " ? "\u00A0" : char}
                  </h1>
               ))}
            </div>
         </div>
      </section>

      {/* METADATA & DESCRIPTION SECTION */}
      <section ref={infoRef} className="relative z-20 w-full bg-[#080808] border-t border-white/10 pt-12 sm:pt-20 pb-16 sm:pb-32">
         <div className="container mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 max-w-7xl">
            
            {/* Meta Details */}
            <div className="lg:col-span-4 flex flex-col gap-10">
               <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-3 hover-target">Client / Subject</h4>
                  <p className="text-2xl font-display uppercase tracking-wider">{project.title}</p>
               </div>
               <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-3 hover-target">Category</h4>
                  <div className="inline-block px-4 py-1 rounded-full border text-sm font-mono tracking-widest" style={{ borderColor: project.color, color: project.color }}>
                     {project.category}
                  </div>
               </div>
               <div className="flex gap-16">
                 <div>
                    <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-3 hover-target">Role</h4>
                    <p className="text-lg font-mono text-white/80">{project.role}</p>
                 </div>
                 <div>
                    <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-3 hover-target">Year</h4>
                    <p className="text-lg font-mono text-white/80">{project.year}</p>
                 </div>
               </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-8 flex flex-col justify-end">
               <h3 className="text-2xl sm:text-3xl md:text-5xl font-display uppercase leading-snug mb-6 sm:mb-8 text-white/90">
                  Concept & Execution
               </h3>
               <div className="space-y-8">
                  <p className="text-lg md:text-2xl font-display uppercase text-white/40 tracking-wider">
                     {project.tagline}
                  </p>
                  <p className="text-base sm:text-lg md:text-2xl font-body text-white/60 leading-relaxed max-w-3xl border-l-[3px] pl-4 sm:pl-6" style={{ borderColor: project.color }}>
                     {project.desc}
                  </p>
                  
                  {projectRaw.challenge && (
                    <div>
                      <h5 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">// The Challenge</h5>
                      <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">{projectRaw.challenge}</p>
                    </div>
                  )}

                  {projectRaw.solution && (
                    <div>
                      <h5 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">// Our Solution</h5>
                      <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">{projectRaw.solution}</p>
                    </div>
                  )}
               </div>
               
               <a 
                 href={projectRaw.liveLink || "/"} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="mt-10 sm:mt-16 inline-flex items-center gap-4 w-fit px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors font-mono text-xs sm:text-sm uppercase tracking-[0.2em] group hover-target"
               >
                 View Live Project 
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                 </svg>
               </a>
            </div>
         </div>
      </section>

      {/* METRICS SECTION */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="relative z-20 w-full bg-[#080808] py-16 border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-12 hover-target">Impact // Metrics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {project.metrics.map((m, i) => (
                <div key={i} className="border-l-2 pl-8 transition-all hover:border-white/40" style={{ borderColor: `${project.color}40` }}>
                  <div className="text-5xl md:text-7xl font-display" style={{ color: project.color }}>{m.value}</div>
                  <div className="mt-3 font-mono text-xs tracking-widest uppercase text-white/60">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY SECTION */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="relative z-20 w-full bg-[#080808] py-16 border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-12 hover-target">Visuals // Documentation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((img, i) => (
                <div key={i} className="group overflow-hidden rounded-2xl aspect-[16/9] border border-white/5">
                  <img 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TECH STACK SECTION */}
      {project.tech && project.tech.length > 0 && (
        <section className="relative z-20 w-full bg-[#080808] py-16 border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-12 hover-target">Engine // Technologies</h4>
            <div className="flex flex-wrap gap-4">
              {project.tech.map((t, i) => (
                <span 
                  key={i} 
                  className="px-6 py-3 rounded-full border border-white/10 text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MARQUEE SECTION */}
      <section className="w-full py-20 bg-[#C8F04D] overflow-hidden rotate-[-2deg] scale-110 z-30 relative" style={{ backgroundColor: project.color }}>
         <div className="w-[200vw] flex flex-nowrap items-center font-display text-[8vw] uppercase leading-none tracking-tight text-[#080808] opacity-90">
            <div ref={marqueeRef} className="flex gap-16 whitespace-nowrap" style={{ willChange: "transform", transform: "translateZ(0)" }}>
               <span>PUSHING BOUNDARIES //</span>
               <span className="text-transparent" style={{ WebkitTextStroke: "2px #080808" }}>CREATIVE ENGINEERING //</span>
               <span>DIGITAL EXCELLENCE //</span>
               <span className="text-transparent" style={{ WebkitTextStroke: "2px #080808" }}>BRUTALIST ARCHITECTURE //</span>
               <span>PUSHING BOUNDARIES //</span>
               <span className="text-transparent" style={{ WebkitTextStroke: "2px #080808" }}>CREATIVE ENGINEERING //</span>
               <span>DIGITAL EXCELLENCE //</span>
               <span className="text-transparent" style={{ WebkitTextStroke: "2px #080808" }}>BRUTALIST ARCHITECTURE //</span>
            </div>
         </div>
      </section>
      
      <section className="h-[20vh] bg-[#080808] w-full relative z-20"></section>
    </div>
  );
}
