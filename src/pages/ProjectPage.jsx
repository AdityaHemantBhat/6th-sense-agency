import { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import Navigation from "../components/Navigation";
import FooterCTA from "../components/FooterCTA";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroMetaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project || !heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Entrance
    tl.fromTo(heroImgRef.current, { scale: 1.15 }, { scale: 1, duration: 2 }, 0);
    tl.fromTo(
      ".hero-tag",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 1 },
      0.3
    );
    tl.fromTo(
      ".hero-title-word",
      { yPercent: 110, rotateX: -60 },
      { yPercent: 0, rotateX: 0, stagger: 0.08, duration: 1.2 },
      0.4
    );
    tl.fromTo(
      heroMetaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      1
    );

    // Subtle parallax on hero image while scrolling
    gsap.to(heroImgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Reveal content sections
    gsap.utils.toArray(".reveal-block").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#F5F0E8]/50 font-mono text-sm tracking-widest uppercase mb-8">Project not found</p>
          <button
            onClick={() => navigate("/")}
            className="font-mono text-xs tracking-widest uppercase text-[#C8F04D] border border-[#C8F04D]/40 px-8 py-4 hover:bg-[#C8F04D] hover:text-[#080808] transition-all duration-300"
          >
            ← Return Home
          </button>
        </div>
      </div>
    );
  }

  const nextProject = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  return (
    <div className="bg-[#080808] min-h-screen text-[#F5F0E8] overflow-x-hidden">
      <div className="noise-overlay" />
      <Navigation />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden flex items-end pb-16 md:pb-24">
        {/* Background image */}
        <div ref={heroImgRef} className="absolute inset-0 z-0 will-change-transform">
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-16">
          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="hero-tag font-mono text-xs tracking-[0.4em] uppercase text-white/50 border border-white/10 px-4 py-2">
              {project.year}
            </span>
            <span
              className="hero-tag font-mono text-xs tracking-[0.4em] uppercase px-4 py-2 border"
              style={{ color: project.accent, borderColor: `${project.accent}40` }}
            >
              {project.domain}
            </span>
          </div>

          {/* Title */}
          <div className="overflow-hidden mb-8" style={{ perspective: "1000px" }}>
            <h1 className="font-display text-[14vw] sm:text-[10vw] leading-[0.82] uppercase flex flex-wrap gap-x-6">
              {[project.name, project.subname].map((word, wi) => (
                <span
                  key={wi}
                  className="hero-title-word inline-block"
                  style={
                    wi === 1
                      ? { WebkitTextStroke: `2px ${project.accent}`, color: "transparent" }
                      : {}
                  }
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>

          {/* Meta row */}
          <div ref={heroMetaRef} className="flex flex-wrap gap-8 md:gap-16">
            {[
              { label: "Client", value: project.client },
              { label: "Role", value: project.role },
              { label: "Duration", value: project.duration },
            ].map((m) => (
              <div key={m.label}>
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 mb-1">{m.label}</div>
                <div className="font-display text-base uppercase tracking-wide text-white/80">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-24 left-6 md:left-16 z-20 flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </div>
          <span className="font-mono text-xs tracking-widest uppercase text-white/50 group-hover:text-white transition-colors duration-300">
            All Work
          </span>
        </Link>
      </section>

      {/* ── CONTENT ── */}
      <div ref={contentRef} className="px-6 md:px-16 max-w-7xl mx-auto">

        {/* Tagline */}
        <div className="reveal-block py-20 md:py-32 border-b border-white/10">
          <p
            className="text-3xl md:text-5xl lg:text-6xl font-display uppercase leading-tight max-w-4xl"
            style={{ WebkitTextStroke: "1px rgba(245,240,232,0.2)", color: "#F5F0E8" }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Overview + Challenge grid */}
        <div className="reveal-block grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 py-20 md:py-32 border-b border-white/10">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px" style={{ backgroundColor: project.accent }} />
              <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: project.accent }}>
                Overview
              </span>
            </div>
            <p className="text-base md:text-lg text-white/70 font-body leading-relaxed">{project.overview}</p>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-[#FF3D2E]" />
              <span className="font-mono text-xs tracking-[0.4em] uppercase text-[#FF3D2E]">Challenge</span>
            </div>
            <p className="text-base md:text-lg text-white/70 font-body leading-relaxed">{project.challenge}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="reveal-block py-20 md:py-32 border-b border-white/10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-px" style={{ backgroundColor: project.accent }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: project.accent }}>
              Impact
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {project.metrics.map((m, i) => (
              <div key={i} className="border-l-2 pl-8" style={{ borderColor: `${project.accent}40` }}>
                <div className="text-5xl md:text-7xl font-display" style={{ color: project.accent }}>
                  {m.value}
                </div>
                <div className="mt-3 font-mono text-xs tracking-widest uppercase text-white/40">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Solution */}
        <div className="reveal-block py-20 md:py-32 border-b border-white/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ backgroundColor: project.accent }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: project.accent }}>
              Our Solution
            </span>
          </div>
          <p className="text-xl md:text-3xl text-white/80 font-body leading-relaxed max-w-3xl">{project.solution}</p>
        </div>

        {/* Gallery */}
        <div className="reveal-block py-20 md:py-32 border-b border-white/10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-px" style={{ backgroundColor: project.accent }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: project.accent }}>
              Gallery
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                  src={img}
                  alt={`${project.name} gallery ${i + 1}`}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="reveal-block py-20 md:py-32 border-b border-white/10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-px" style={{ backgroundColor: project.accent }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: project.accent }}>
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="font-mono text-xs tracking-widest uppercase px-5 py-3 border transition-all duration-300 hover:text-[#080808]"
                style={{
                  borderColor: `${project.accent}40`,
                  color: project.accent,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = project.accent;
                  e.currentTarget.style.borderColor = project.accent;
                  e.currentTarget.style.color = "#080808";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = `${project.accent}40`;
                  e.currentTarget.style.color = project.accent;
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Next Project */}
        <div className="reveal-block py-24 md:py-32">
          <div className="font-mono text-xs tracking-[0.4em] uppercase text-white/40 mb-12">Next Project</div>
          <Link
            to={`/work/${nextProject.slug}`}
            className="group flex items-center justify-between gap-8 hover:gap-12 transition-all duration-500"
          >
            <h2 className="font-display text-[10vw] md:text-[8vw] uppercase leading-none text-white group-hover:text-[#C8F04D] transition-colors duration-500">
              {nextProject.name} {nextProject.subname}
            </h2>
            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#C8F04D] group-hover:border-[#C8F04D] transition-all duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#080808] transition-colors duration-500">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        </div>

      </div>

      <FooterCTA />
    </div>
  );
}
