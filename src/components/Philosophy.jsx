import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "ELITE PORTFOLIO",
    category: "Creative Portfolio / React",
    color: "#C8F04D",
    img: "/Images/Personal_Portfolio.png",
  },
  {
    id: 2,
    title: "DRIBBBLE HOME",
    category: "UI/UX / CLONE",
    color: "#EA4C89",
    img: "/Images/Dribble_clone.png",
  },
  {
    id: 3,
    title: "BURGERY E-COMMERCE",
    category: "E-Commerce / Food",
    color: "#FFB200",
    img: "/Images/Burgery_Website.png",
  },
];

const team = [
  {
    name: "DHIRAJ NAIR",
    role: "Founder",
    img: "/Images/Dhiraj_Nair.jpeg",
  },
  {
    name: "SAUBHAGYA BAG",
    role: "Co-Founder",
    img: "/Images/Saubhagya_bag.jpeg",
  },
  {
    name: "ADITYA BHAT",
    role: "TECH LEAD",
    img: "/Images/Aditya_Bhat.jpeg",
  },
  {
    name: "PRITHEISH SARDAR",
    role: "CREATIVE LEAD",
    img: "/Images/Pritheish_Sardar.jpeg",
  },
];

export default function Philosophy() {
  const containerRef = useRef(null);

  // Transition Reel Refs
  const transitionReelRef = useRef(null);
  const textContainerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const svgRef = useRef(null);

  // Philosophy Refs
  const philosophyContainerRef = useRef(null);
  const philText1Ref = useRef(null);
  const philText2Ref = useRef(null);
  const philText3Ref = useRef(null);
  const aboutPreviewRef = useRef(null);

  // New Sections Refs
  const sloganRef = useRef(null);
  const sloganText1Ref = useRef(null);
  const sloganText2Ref = useRef(null);

  const projectsContainerRef = useRef(null);
  const panelsRef = useRef([]);

  const teamRef = useRef(null);
  const teamHeadingRef = useRef(null);
  const teamMembersRef = useRef([]);

  const processRef = useRef(null);
  const processCardsRef = useRef([]);

  const testimonialsRef = useRef(null);
  const testimonialCardsRef = useRef([]);

  const footerRef = useRef(null);
  const footerTextRef = useRef(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const initGSAP = () => {
      // Set initial project states out of screen (bottom)
      panelsRef.current.forEach((panel) => {
        if (panel) gsap.set(panel, { yPercent: 100 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          scrub: 1.5,
          pin: true,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlap: true
        },
      });

      // ==========================================
      // PHASE 1: TRANSITION REEL
      // ==========================================
      tl.to(
        svgRef.current,
        { scale: 100, opacity: 0, duration: 4, ease: "power2.inOut" },
        0,
      );
      tl.to(text1Ref.current, { x: "-15vw", duration: 5 }, 0);
      tl.to(text2Ref.current, { x: "15vw", duration: 5 }, 0);
      tl.to(
        textContainerRef.current,
        { scale: 100, opacity: 0, duration: 3, ease: "power2.in" },
        2,
      );

      // ==========================================
      // PHASE 2: PHILOSOPHY PORTAL REVEAL
      // ==========================================
      tl.fromTo(
        philosophyContainerRef.current,
        { scale: 0.05, opacity: 0, borderRadius: "100%" },
        {
          scale: 1,
          opacity: 1,
          borderRadius: "0%",
          duration: 3,
          ease: "power2.inOut",
        },
        4,
      );
      tl.set(transitionReelRef.current, { autoAlpha: 0 }, 6);
      tl.set(containerRef.current, { backgroundColor: "#080808" }, 6);

      // ==========================================
      // PHASE 3: THE CORE NARRATIVE
      // ==========================================
      tl.to(
        philText1Ref.current,
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        6,
      );
      tl.to(
        philText1Ref.current,
        { opacity: 0, scale: 1.2, duration: 0.8, ease: "power2.in" },
        7,
      );

      tl.to(
        philText2Ref.current,
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        8,
      );
      tl.to(
        philText2Ref.current,
        { opacity: 0, scale: 1.2, duration: 0.8, ease: "power2.in" },
        9,
      );

      tl.to(
        philText3Ref.current,
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        10,
      );
      tl.to(
        philText3Ref.current,
        { scale: 20, opacity: 0, duration: 0.8, ease: "power2.in" },
        10.8,
      );

      tl.fromTo(
        aboutPreviewRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        11.2,
      );
      tl.to(aboutPreviewRef.current, { opacity: 1, duration: 1.5 }, 12.0);
      tl.to(
        aboutPreviewRef.current,
        { opacity: 0, y: -20, duration: 0.6, ease: "power2.inOut" },
        13.5,
      );

      // ==========================================
      // PHASE 4: SLOGAN SECTION
      // ==========================================
      tl.fromTo(
        sloganRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.2, ease: "expo.out" },
        14,
      );
      tl.to(sloganText1Ref.current, { x: "10vw", duration: 3 }, 14);
      tl.to(sloganText2Ref.current, { x: "-10vw", duration: 3 }, 14);
      tl.to(
        sloganRef.current,
        { scale: 1.2, opacity: 0, duration: 1, ease: "power2.in" },
        17,
      );

      // ==========================================
      // PHASE 5: PROJECTS STACK
      // ==========================================
      let projectTime = 18;
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        tl.to(
          panel,
          { yPercent: 0, ease: "power2.out", duration: 1.5 },
          projectTime,
        );

        // Scale down previous panel inner
        if (i > 0) {
          const prevInner =
            panelsRef.current[i - 1]?.querySelector(".panel-inner");
          if (prevInner) {
            tl.to(
              prevInner,
              {
                scale: 0.85,
                opacity: 0.3,
                yPercent: -15,
                ease: "power2.out",
                duration: 1.5,
              },
              projectTime,
            );
          }
        }
        projectTime += 2.5; // Space them out on scroll
      });

      // Pause on last project slightly
      projectTime += 1;

      // ==========================================
      // PHASE 6: TEAM SECTION
      // ==========================================
      tl.fromTo(
        teamRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.5, ease: "expo.inOut" },
        projectTime,
      );
      tl.fromTo(
        teamHeadingRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" },
        projectTime + 1,
      );

      // Team member stagger
      teamMembersRef.current.forEach((member, i) => {
        if (!member) return;
        tl.fromTo(
          member,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          projectTime + 1.2 + i * 0.2,
        );
      });

      projectTime += 4;

      // ==========================================
      // PHASE 7: HOW WE WORK / PROCESS
      // ==========================================
      tl.fromTo(
        processRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.5, ease: "expo.inOut" },
        projectTime,
      );
      processCardsRef.current.forEach((card, i) => {
        if (!card) return;
        tl.fromTo(
          card,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          projectTime + 1 + i * 0.3,
        );
      });
      projectTime += 5;

      // ==========================================
      // PHASE 8: TESTIMONIALS
      // ==========================================
      tl.fromTo(
        testimonialsRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.5, ease: "expo.inOut" },
        projectTime,
      );
      testimonialCardsRef.current.forEach((card, i) => {
        if (!card) return;
        tl.fromTo(
          card,
          { x: i % 2 === 0 ? -80 : 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
          projectTime + 1 + i * 0.4,
        );
      });
      projectTime += 5;

      // ==========================================
      // PHASE 10: FOOTER
      // ==========================================
      tl.fromTo(
        footerRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.5, ease: "expo.out" },
        projectTime,
      );

      const chars = footerTextRef.current?.querySelectorAll(".footer-char");
      if (chars && chars.length > 0) {
        tl.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          projectTime + 0.8,
        );
      }

      // Use a larger multiplier to make the scroll very slow and deliberate
      if (tl.scrollTrigger) {
        tl.scrollTrigger.vars.end = `+=${tl.duration() * 1200}`;
        tl.scrollTrigger.refresh();
      }

      ScrollTrigger.refresh();

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        ScrollTrigger.refresh();
      };
    };

    // Delay initialization to avoid race conditions with layout/images
    const timeout = setTimeout(initGSAP, 200);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);


  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full h-screen bg-[#F5F0E8] overflow-hidden"
      style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
    >
      {/* =========================================
          LAYER 1: MAIN MEGA SEQUENCE WRAPPER 
          ========================================= */}
      <div
        ref={philosophyContainerRef}
        className="absolute inset-0 z-0 bg-[#080808] overflow-hidden flex items-center justify-center opacity-0 scale-50"
      >
        {/* === A. NARRATIVE TEXT === */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none mix-blend-difference text-[#F5F0E8]">
          <h2
            ref={philText1Ref}
            className="absolute text-[12vw] md:text-[10vw] font-display uppercase tracking-tighter opacity-0 scale-90 text-center leading-none"
          >
            Beyond
            <br />
            Logic
          </h2>
          <h2
            ref={philText2Ref}
            className="absolute text-[12vw] md:text-[10vw] font-display uppercase tracking-tighter opacity-0 scale-90 text-center leading-none"
          >
            Into
            <br />
            Instinct
          </h2>
          <h2
            ref={philText3Ref}
            className="absolute text-[12vw] md:text-[10vw] font-display uppercase tracking-tighter opacity-0 scale-90 text-center leading-none text-[#C8F04D]"
          >
            Pure Creative
            <br />
            Energy
          </h2>
        </div>

        {/* === B. ABOUT PREVIEW === */}
        <div
          ref={aboutPreviewRef}
          className="absolute inset-0 z-30 flex items-center justify-center opacity-0 scale-95 px-6 md:px-12 pointer-events-none"
          style={{ transformOrigin: "center center" }}
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center max-w-7xl">
            <div className="md:col-span-7">
              <div className="mb-8">
                <h2 className="text-xs text-mono uppercase tracking-widest text-[#C8F04D] mb-4">
                  Who We Are
                </h2>
                <div className="h-1 w-12 bg-gradient-to-r from-[#C8F04D] to-transparent rounded-full"></div>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-display leading-tight text-[#F5F0E8]">
                We believe in creating digital experiences that transcend
                expectations. Every project is a journey of discovery, where
                innovation meets strategy and design becomes art.
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-8">
              <div className="border-l-2 border-[#C8F04D]/30 pl-6">
                <div className="text-4xl md:text-6xl font-display text-[#C8F04D] flex items-baseline">
                  <span>30</span>
                  <span className="text-[#FF3D2E] text-4xl">+</span>
                </div>
                <div className="text-xs text-mono uppercase tracking-wider mt-2 text-[#F5F0E8]/70">
                  Projects Delivered
                </div>
              </div>
              <div className="border-l-2 border-[#C8F04D]/30 pl-6">
                <div className="text-5xl md:text-6xl font-display text-[#C8F04D] flex items-baseline">
                  <span>6</span>
                  <span className="text-[#FF3D2E] text-4xl">+</span>
                </div>
                <div className="text-xs text-mono uppercase tracking-wider mt-2 text-[#F5F0E8]/70">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === C. SLOGAN === */}
        <div
          id="projects"
          ref={sloganRef}
          className="absolute inset-0 z-40 bg-[#080808] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
        >
          <div className="text-[#FF3D2E] text-sm font-mono tracking-widest mb-10 overflow-hidden relative border border-[#FF3D2E]/20 px-8 py-2 rounded-full">
            <span className="relative z-10">TECH // DESIGN // FUTURE</span>
            <div className="absolute inset-0 bg-[#FF3D2E]/10"></div>
          </div>
          <div className="relative w-full text-center">
            <h1
              ref={sloganText1Ref}
              className="text-[14vw] font-display uppercase leading-[0.8] text-[#F5F0E8] whitespace-nowrap -ml-[5vw]"
            >
              OUR
            </h1>
            <h1
              ref={sloganText2Ref}
              className="text-[14vw] font-display uppercase leading-[0.8] text-[#C8F04D] whitespace-nowrap ml-[5vw]"
            >
              PROJECTS
            </h1>
          </div>
        </div>

        {/* === D. PROJECTS STACK === */}
        <div
          ref={projectsContainerRef}
          className="absolute inset-0 z-50 pointer-events-none"
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (panelsRef.current[i] = el)}
              className="project-panel absolute top-0 left-0 w-full h-full flex items-center justify-center p-4 md:p-8 pointer-events-auto"
              style={{ zIndex: i + 1 }}
            >
              <a
                href={`/project/${project.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (window.navigateTo)
                    window.navigateTo(`/project/${project.id}`);
                }}
                className="panel-inner relative w-full h-full max-w-7xl max-h-[85vh] rounded-xl sm:rounded-[2rem] overflow-hidden flex flex-col justify-end p-5 sm:p-8 md:p-12 block hover-target pointer-events-auto"
                style={{
                  backgroundColor: "#111",
                  transformOrigin: "bottom center",
                  cursor: "pointer",
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80"
                  style={{
                    backgroundImage: `url(${project.img})`,
                    filter: "brightness(0.7) contrast(1.2)",
                  }}
                />
                <div
                  className="absolute inset-0 h-full w-full opacity-90 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                  }}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-[#F5F0E8]">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                      <span
                        className="text-sm font-mono uppercase px-4 py-1 rounded-full border pointer-events-none"
                        style={{
                          borderColor: `${project.color}50`,
                          color: project.color,
                          backgroundColor: `${project.color}15`,
                        }}
                      >
                        {project.category}
                      </span>
                      <span className="text-sm font-mono text-[#F5F0E8]/60 pointer-events-none">
                        202{6 - i}
                      </span>
                    </div>
                    <h3 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight leading-none mb-2 hover:text-[#C8F04D] transition-colors cursor-none">
                      {project.title}
                    </h3>
                  </div>

                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border border-[#F5F0E8]/30 flex items-center justify-center group hover:bg-[#C8F04D] transition-colors duration-300 cursor-none flex-shrink-0 pointer-events-none">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 -rotate-45 group-hover:text-[#080808] group-hover:rotate-0 transition-all duration-300"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* === E. TEAM SECTION === */}
        <div
          ref={teamRef}
          className="absolute inset-0 z-60 bg-[#080808] px-6 md:px-12 flex flex-col justify-center items-center pointer-events-none"
        >
          <div className="max-w-7xl w-full mx-auto pointer-events-auto">
            <div
              ref={teamHeadingRef}
              className="flex flex-col items-center mb-8 sm:mb-16 text-center"
            >
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8F04D] mb-4">
                The Minds Behind
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase text-[#F5F0E8] leading-none">
                Our{" "}
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px #F5F0E8" }}
                >
                  Team
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {team.map((member, i) => (
                <div
                  key={i}
                  ref={(el) => (teamMembersRef.current[i] = el)}
                  className="group relative w-full aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden cursor-none"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${member.img})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base sm:text-2xl font-display uppercase text-[#F5F0E8] mb-1 group-hover:text-[#C8F04D] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-[#F5F0E8]/60 tracking-wider mix-blend-difference">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === F. HOW WE WORK === */}
        <div
          ref={processRef}
          className="absolute inset-0 z-[65] bg-[#080808] flex flex-col justify-center items-center px-6 md:px-12 pointer-events-none"
        >
          <div className="max-w-7xl w-full mx-auto pointer-events-auto">
            <div className="flex flex-col items-center mb-8 sm:mb-16 text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8F04D] mb-4">
                Our Method
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-display uppercase text-[#F5F0E8] leading-none">
                How We <span className="text-[#C8F04D]">Work</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  desc: "We dive deep into your vision, audience, and objectives. Every great project starts with understanding the why.",
                },
                {
                  step: "02",
                  title: "Strategy",
                  desc: "We architect the technical blueprint and creative direction. No guesswork — only data-backed, intentional decisions.",
                },
                {
                  step: "03",
                  title: "Execution",
                  desc: "Our team builds at velocity. Agile sprints, daily syncs, and relentless iteration until every pixel is perfect.",
                },
                {
                  step: "04",
                  title: "Launch & Scale",
                  desc: "We don't disappear after delivery. Ongoing optimization, analytics, and scaling support to maximize impact.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (processCardsRef.current[i] = el)}
                  className="relative p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-[#F5F0E8]/10 bg-[#0c0c0c] group hover:border-[#C8F04D]/50 transition-colors"
                >
                  <div className="text-4xl sm:text-6xl font-display text-[#C8F04D]/20 mb-3 sm:mb-4 leading-none">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-display uppercase mb-3 text-[#F5F0E8] group-hover:text-[#C8F04D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-body text-[#F5F0E8]/50 leading-relaxed">
                    {item.desc}
                  </p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-[#C8F04D]/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === H. TESTIMONIALS === */}
        <div
          ref={testimonialsRef}
          className="absolute inset-0 z-[67] bg-[#080808] flex flex-col justify-center items-center px-6 md:px-12 pointer-events-none"
        >
          <div className="max-w-6xl w-full mx-auto pointer-events-auto">
            <div className="flex flex-col items-center mb-8 sm:mb-16 text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#FF3D2E] mb-4">
                What They Say
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-display uppercase text-[#F5F0E8] leading-none">
                Client <span className="text-[#C8F04D]">Voices</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {[
                {
                  quote:
                    "6th Sense didn't just build our platform — they reimagined what our brand could become. The result was beyond anything we envisioned.",
                  name: "DAVID CHEN",
                  role: "CEO, Aurora Tech",
                  accent: "#C8F04D",
                },
                {
                  quote:
                    "They operate like a tier-1 consultancy with the speed of a startup. Our revenue increased 340% within six months of launch.",
                  name: "SARAH MITCHELL",
                  role: "Founder, Nexus Digital",
                  accent: "#FF3D2E",
                },
                {
                  quote:
                    "Working with them felt like having a creative partner, not a vendor. They challenged every assumption and delivered excellence.",
                  name: "MARCUS REED",
                  role: "CTO, Prism Labs",
                  accent: "#FF3D2E",
                },
                {
                  quote:
                    "The attention to detail is obsessive. Every micro-interaction, every animation, every pixel — they treat it like art.",
                  name: "ELENA VOSS",
                  role: "Head of Brand, Vertex",
                  accent: "#C8F04D",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  ref={(el) => (testimonialCardsRef.current[i] = el)}
                  className="p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-[#F5F0E8]/10 bg-[#0c0c0c] relative overflow-hidden group hover:border-[#C8F04D]/30 transition-colors"
                >
                  <div
                    className="absolute top-6 right-8 text-8xl font-display leading-none pointer-events-none"
                    style={{ color: `${testimonial.accent}10` }}
                  >
                    &ldquo;
                  </div>
                  <p className="text-sm sm:text-lg md:text-xl font-body text-[#F5F0E8]/70 leading-relaxed mb-4 sm:mb-8 relative z-10 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: `${testimonial.accent}30` }}
                    />
                    <div>
                      <h4
                        className="text-sm font-display uppercase tracking-wider"
                        style={{ color: testimonial.accent }}
                      >
                        {testimonial.name}
                      </h4>
                      <p className="text-xs font-mono text-[#F5F0E8]/40">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === I. EXTRAORDINARY FOOTER SECTION === */}
        <div
          ref={footerRef}
          className="absolute inset-0 z-[70] bg-[#080808] text-[#F5F0E8] flex flex-col justify-between pt-20 md:pt-32 pb-4 pointer-events-auto overflow-hidden"
          style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
        >
          {/* Background Grid Accent */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#F5F0E8 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

          <div className="container mx-auto px-6 md:px-12 flex-1 flex flex-col relative z-10">
            {/* Top Row: System Status */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
              <div className="md:col-span-4 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#C8F04D] animate-ping"></div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8F04D]">System Online // Core_v1.0</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display leading-[0.9] uppercase">
                  Aesthetic <br /> <span className="text-transparent" style={{ WebkitTextStroke: "1px #F5F0E8" }}>Intelligence</span>
                </h2>
                <div className="pt-8 border-t border-[#F5F0E8]/10 space-y-2 font-mono text-[9px] uppercase tracking-widest opacity-40">
                  <div>Loc: 23.0225° N, 72.5714° E</div>
                  <div>Network: 6SA_GLOBAL_TRANSIT</div>
                  <div>Sync: {time || "00:00:00"} LMT</div>
                </div>
              </div>

              {/* Center: The Core Icon */}
              <div className="md:col-span-4 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full border border-[#C8F04D]/20 flex items-center justify-center relative group cursor-none">
                  <div className="absolute inset-0 rounded-full bg-[#C8F04D] opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"></div>
                  <div className="text-9xl font-display text-[#C8F04D] group-hover:scale-110 transition-transform duration-500 select-none">6</div>
                  {/* Orbitals */}
                  <div className="absolute inset-0 border border-dashed border-[#F5F0E8]/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute -inset-4 border border-dotted border-[#F5F0E8]/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
                </div>
              </div>

              {/* Right: Mechanical Navigation */}
              <div className="md:col-span-4 flex flex-col justify-between items-end text-right">
                <div className="space-y-12 w-full">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-30 block mb-6">// Directory</span>
                    <nav className="flex flex-col gap-3 text-2xl font-display uppercase tracking-tighter">
                      <a href="/" className="hover:text-[#C8F04D] transition-colors inline-block">Origins</a>
                      <a href="/about" className="hover:text-[#C8F04D] transition-colors inline-block">Intelligence</a>
                      <a href="/projects" className="hover:text-[#C8F04D] transition-colors inline-block">Archive</a>
                      <a href="/contact" className="hover:text-[#C8F04D] transition-colors inline-block">Terminal</a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Info Bar */}
            <div className="mt-auto flex flex-col md:flex-row justify-between items-end border-t border-[#F5F0E8]/10 pt-8 pb-12 gap-8">
              <div className="flex gap-12 font-mono text-[10px] uppercase tracking-widest opacity-50">
                <a href="#" className="hover:text-[#C8F04D] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#C8F04D] transition-colors">Twitter (X)</a>
                <a href="#" className="hover:text-[#C8F04D] transition-colors">LinkedIn</a>
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-30">
                © 2026 6th Sense Agency. Designed for the Avant-Garde.
              </div>
            </div>

            {/* Massive Footer Text */}
            <div
              ref={footerTextRef}
              className="absolute bottom-0 left-0 w-full text-center overflow-hidden flex justify-center flex-wrap -mb-6 md:-mb-10 px-2 pointer-events-none select-none"
            >
              {"6TH SENSE AGENCY".split("").map((char, i) => (
                <span
                  key={i}
                  className="footer-char text-[10vw] leading-none font-display font-bold text-[#F5F0E8]/5"
                  style={{
                    display: "inline-block",
                    transformOrigin: "bottom center",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          LAYER 2: TRANSITION REEL MASK (STAYS ON TOP INITIALLY)
          ========================================= */}
      <div
        ref={transitionReelRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      >
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 w-full h-full"
          style={{ transformOrigin: "center center" }}
        >
          <div
            ref={text1Ref}
            className="text-[12vw] font-display text-[#080808] whitespace-nowrap leading-none translate-x-[20vw]"
          >
            DIGITAL AGENCY
          </div>
          <div
            ref={text2Ref}
            className="text-[12vw] font-display text-[#FF3D2E] whitespace-nowrap leading-none -translate-x-[20vw]"
          >
            CREATIVE VISION
          </div>
        </div>

        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          className="absolute inset-0 w-full h-full overflow-visible z-20"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id="text-mask">
              <rect
                x="-5000"
                y="-5000"
                width="11000"
                height="11000"
                fill="white"
              />
              <text
                x="500"
                y="500"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="180"
                fontFamily="Anton, sans-serif"
                fill="black"
                letterSpacing="0.02em"
              >
                6TH SENSE AGENCY
              </text>
            </mask>
          </defs>
          <rect
            x="-5000"
            y="-5000"
            width="11000"
            height="11000"
            fill="#080808"
            mask="url(#text-mask)"
          />
        </svg>
      </div>
    </section>
  );
}
