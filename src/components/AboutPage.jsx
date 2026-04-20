import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./Navigation";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    id: "01",
    title: "Obsessive Craft",
    desc: "We don't ship 'good enough.' Every pixel, every interaction, every line of code is scrutinized until it feels inevitable. Our obsession with quality is what separates us from the noise.",
  },
  {
    id: "02",
    title: "Strategic Thinking",
    desc: "Beautiful design without strategy is just decoration. We start with the 'why' — understanding your market, your users, your goals — then engineer creative solutions that actually move the needle.",
  },
  {
    id: "03",
    title: "Relentless Innovation",
    desc: "We refuse to repeat ourselves. Every project is an opportunity to push boundaries, explore new technologies, and challenge what's possible in digital experiences.",
  },
  {
    id: "04",
    title: "Partnership Mindset",
    desc: "We don't disappear after launch. We become an extension of your team — invested in your growth, available for pivots, and committed to long-term impact over quick deliverables.",
  },
];

const capabilities = [
  "Web Development", "App Development", "Brand Identity", "UI/UX Design",
  "Motion Graphics", "AI Integration", "Creative Direction", "Digital Strategy",
  "E-Commerce", "CMS Development", "API Architecture", "Performance Optimization"
];

const timeline = [
  { year: "2024", event: "Founded in Gujarat with a vision to redefine digital experiences." },
  { year: "2025", event: "Expanded to a full-service team. First international client onboarded." },
  { year: "2026", event: "Has successfully served 50+ clients, delivering impactful solutions that drive real results. We have consistently helped businesses boost their sales and achieve higher growth through effective strategies and execution." },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const valuesRef = useRef(null);
  const valueCardsRef = useRef([]);
  const capRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Hero entrance
    const heroTl = gsap.timeline({ delay: 0.4 });
    heroTl.fromTo(heroTextRef.current?.children || [],
      { y: 100, opacity: 0, rotateX: -40 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }
    );

    // Values scroll reveal
    valueCardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" }
        }
      );
    });

    // Capabilities reveal
    if (capRef.current) {
      const capItems = capRef.current.querySelectorAll(".cap-item");
      gsap.fromTo(capItems,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out",
          scrollTrigger: { trigger: capRef.current, start: "top 80%", toggleActions: "play none none none" }
        }
      );
    }

    // Timeline reveal
    timelineItemsRef.current.forEach((item) => {
      if (!item) return;
      gsap.fromTo(item,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" }
        }
      );
    });

    // CTA reveal
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%", toggleActions: "play none none none" }
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <div className="relative z-50">
        <Navigation />
      </div>

      <main className="bg-[#080808] text-[#F5F0E8] min-h-screen w-full overflow-hidden">

        {/* === HERO === */}
        <section ref={heroRef} className="min-h-[80vh] sm:min-h-screen flex flex-col justify-end relative px-4 sm:px-6 md:px-12 pb-16 sm:pb-24 pt-32">
          {/* Ambient */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10" style={{ background: "radial-gradient(circle, rgba(200,240,77,0.4) 0%, transparent 60%)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10" style={{ background: "radial-gradient(circle, rgba(255,61,46,0.3) 0%, transparent 60%)" }} />

          <div ref={heroTextRef} className="max-w-7xl mx-auto w-full relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C8F04D]" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8F04D]">About Us</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9vw] font-display uppercase leading-[0.9] tracking-tight mb-8">
              <span className="block">We Are</span>
              <span className="block text-[#C8F04D]">6th Sense</span>
              <span className="block text-transparent" style={{ WebkitTextStroke: "1px #F5F0E8" }}>Agency</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl font-body text-[#F5F0E8]/60 max-w-3xl leading-relaxed border-l-2 border-[#C8F04D] pl-4 sm:pl-6">
              A collective of designers, developers, and strategists building digital experiences that don't just look extraordinary — they perform. We exist at the intersection of art and engineering.
            </p>
          </div>
        </section>

        {/* Divider line */}
        <div className="w-full border-t border-[#F5F0E8]/10" />

        {/* === OUR VALUES === */}
        <section ref={valuesRef} className="py-20 sm:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#FF3D2E]" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#FF3D2E]">What Drives Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase mb-16 sm:mb-24 leading-none">
              Our <span className="text-[#C8F04D]">Values</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {values.map((value, i) => (
                <div
                  key={value.id}
                  ref={el => valueCardsRef.current[i] = el}
                  className="p-6 sm:p-10 rounded-xl sm:rounded-2xl border border-[#F5F0E8]/10 bg-[#0c0c0c] group hover:border-[#C8F04D]/40 transition-colors relative overflow-hidden"
                >
                  <div className="absolute top-4 right-6 text-7xl sm:text-8xl font-display text-[#F5F0E8]/5 leading-none pointer-events-none">{value.id}</div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#C8F04D] font-mono text-sm">{value.id} //</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display uppercase mb-4 group-hover:text-[#C8F04D] transition-colors">{value.title}</h3>
                    <p className="text-sm sm:text-base font-body text-[#F5F0E8]/50 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === CAPABILITIES === */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C8F04D]" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8F04D]">What We Do</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase mb-16 sm:mb-24 leading-none">
              Capabilities
            </h2>

            <div ref={capRef} className="flex flex-wrap gap-3 sm:gap-4">
              {capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="cap-item px-5 sm:px-8 py-3 sm:py-4 rounded-full border border-[#F5F0E8]/10 text-sm sm:text-base font-mono uppercase tracking-wider text-[#F5F0E8]/60 hover:border-[#C8F04D] hover:text-[#C8F04D] transition-colors hover-target"
                >
                  {cap}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === TIMELINE === */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#FF3D2E]" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#FF3D2E]">Our Journey</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase mb-16 sm:mb-24 leading-none">
              The <span className="text-transparent" style={{ WebkitTextStroke: "1px #F5F0E8" }}>Story</span>
            </h2>

            <div ref={timelineRef} className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-[#F5F0E8]/10" />

              <div className="space-y-12 sm:space-y-16">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    ref={el => timelineItemsRef.current[i] = el}
                    className="relative pl-12 sm:pl-20"
                  >
                    {/* Dot */}
                    <div className="absolute left-2.5 sm:left-6 top-2 w-3 h-3 rounded-full border-2 border-[#C8F04D] bg-[#080808]" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-display text-[#C8F04D] flex-shrink-0">{item.year}</span>
                      <p className="text-base sm:text-lg font-body text-[#F5F0E8]/60 leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* === CTA === */}
        <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#0a0a0a]">
          <div ref={ctaRef} className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase mb-8 leading-none">
              Ready to <span className="text-[#C8F04D]">create</span> something?
            </h2>
            <p className="text-base sm:text-lg font-body text-[#F5F0E8]/50 max-w-2xl mx-auto mb-12">
              Whether you're launching a brand, scaling a product, or reimagining your digital presence — we're ready when you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="group px-10 py-5 rounded-full bg-[#C8F04D] text-[#080808] font-mono text-sm uppercase tracking-[0.2em] font-bold hover:shadow-[0_0_40px_rgba(200,240,77,0.2)] transition-all hover-target inline-flex items-center justify-center gap-3"
              >
                Start a Project
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a
                href="/business-consultancy"
                className="px-10 py-5 rounded-full border border-[#F5F0E8]/20 text-[#F5F0E8] font-mono text-sm uppercase tracking-[0.2em] hover:border-[#C8F04D] hover:text-[#C8F04D] transition-colors hover-target inline-flex items-center justify-center"
              >
                Explore Consulting
              </a>
            </div>
          </div>
        </section>

        {/* Footer marquee */}
        <div className="w-full py-12 sm:py-16 border-t border-[#F5F0E8]/5 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content gap-12 sm:gap-16 text-[8vw] sm:text-[6vw] font-display uppercase text-[#F5F0E8]/5 tracking-tight whitespace-nowrap">
              <span>6TH SENSE AGENCY //</span>
              <span>DESIGN × DEVELOP × DELIVER //</span>
              <span>6TH SENSE AGENCY //</span>
              <span>DESIGN × DEVELOP × DELIVER //</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
