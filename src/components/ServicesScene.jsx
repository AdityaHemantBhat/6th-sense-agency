import { useRef, useEffect, useMemo, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "WEB\nDEVELOPMENT",
    desc: "Immersive websites & web apps built with cutting-edge frameworks. Performance-first, pixel-perfect.",
    tags: ["React", "Next.js", "Node.js", "Three.js"],
    color: "#C8F04D",
  },
  {
    id: "02",
    title: "APP\nDEVELOPMENT",
    desc: "Native & cross-platform mobile experiences that feel alive. From concept to App Store, we deliver.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    color: "#FF3D2E",
  },
  {
    id: "03",
    title: "VIDEO\nEDITING",
    desc: "Cinematic storytelling that captures attention. Every frame is intentional, every cut is purposeful.",
    tags: ["After Effects", "Premiere", "DaVinci", "Cinema 4D"],
    color: "#C8F04D",
  },
  {
    id: "04",
    title: "MOTION\nGRAPHICS",
    desc: "Animations that breathe life into brands. Dynamic visuals that communicate, captivate, and convert.",
    tags: ["2D Animation", "3D Animation", "VFX", "Lottie"],
    color: "#FF3D2E",
  },
  {
    id: "05",
    title: "UI / UX\nDESIGN",
    desc: "User-centered design that balances beauty with usability. Every interaction crafted with instinct.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    color: "#C8F04D",
  },
  {
    id: "06",
    title: "BRAND\nIDENTITY",
    desc: "Visual identities that speak louder than words. Logos, systems, and guidelines that define you.",
    tags: ["Logo Design", "Style Guides", "Typography", "Strategy"],
    color: "#FF3D2E",
  },
];

// Memoized floating dots — computed once, never re-rendered
const FloatingDots = memo(function FloatingDots() {
  const dots = useMemo(() => {
    const particleCount = 6;
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-[#C8F04D]/10"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: dot.size,
            height: dot.size,
            transform: "translateZ(0)",
            animation: `floatDot ${dot.duration}s ease-in-out ${dot.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
});

// Memoize service cards to prevent re-renders when activeIndex changes for OTHER cards
const ServiceCard = memo(function ServiceCard({ service, index, isActive }) {
  return (
    <div className="flex-shrink-0 w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw] h-full flex items-center px-2 md:px-4">
      <div
        className={`relative w-full h-[50vh] sm:h-[55vh] rounded-2xl overflow-hidden transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-40"
          }`}
        style={{
          background: `linear-gradient(135deg, rgba(${service.color === "#C8F04D" ? "200,240,77" : "255,61,46"
            }, ${isActive ? "0.15" : "0.08"}) 0%, rgba(8,8,8,0.95) 60%)`,
          border: `1px solid ${isActive ? service.color : "rgba(245,240,232,0.05)"}`,
          boxShadow: "none",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Big number watermark */}
        <div
          className="absolute -right-4 -top-8 text-[25vw] md:text-[18vw] font-display leading-none pointer-events-none select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: `1px ${service.color}15`,
          }}
        >
          {service.id}
        </div>

        {/* Removed glowing orb - was GPU expensive */}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 lg:p-10">
          {/* Top */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: service.color,
                  boxShadow: `0 0 12px ${service.color}`,
                }}
              />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F5F0E8]/50">
                Service {service.id}
              </span>
            </div>
            <span
              className="text-6xl md:text-8xl font-display"
              style={{ color: service.color + "20" }}
            >
              {service.id}
            </span>
          </div>

          {/* Center: Title */}
          <div className="flex-1 flex items-center">
            <h3
              className="text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] font-display uppercase leading-[1.1] tracking-tight"
              style={{ color: "#F5F0E8" }}
            >
              {service.title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span style={{ color: service.color }}>{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h3>
          </div>

          {/* Bottom */}
          <div className="space-y-6">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#F5F0E8]/60 max-w-md leading-relaxed font-body">
              {service.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-mono uppercase tracking-wider border rounded-full"
                  style={{
                    borderColor: service.color + "30",
                    color: service.color + "90",
                    background: service.color + "08",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="h-px w-full relative overflow-hidden">
              <div
                className="h-full absolute left-0 top-0 transition-all duration-700"
                style={{
                  width: isActive ? "100%" : "0%",
                  background: `linear-gradient(90deg, ${service.color}, transparent)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function ServicesScene() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const cards = track.querySelectorAll("[data-service-card]");

    const timer = setTimeout(() => {
      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(".services-grid", {
        opacity: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "top top",
          scrub: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => window.innerWidth < 768 ? "+=8000" : "+=4000",
          scrub: window.innerWidth < 768 ? 2.5 : 1,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const cardWidth = totalScrollWidth / services.length;
            const currentScroll = progress * totalScrollWidth;
            let idx = Math.floor(currentScroll / cardWidth);
            idx = Math.max(0, Math.min(idx, services.length - 1));

            // Direct DOM updates instead of React state
            if (counterRef.current) {
              counterRef.current.textContent = String(idx + 1).padStart(2, "0");
            }
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${((idx + 1) / services.length) * 100}%`;
            }

            // Toggle active class on cards directly
            cards.forEach((card, i) => {
              if (i === idx) {
                card.style.transform = "scale(1) translateZ(0)";
                card.style.opacity = "1";
              } else {
                card.style.transform = "scale(0.95) translateZ(0)";
                card.style.opacity = "0.4";
              }
            });
          },
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        force3D: true,
      });

      // Update container height to match pin duration + viewport
      containerRef.current.style.height = `${(window.innerWidth < 768 ? 8000 : 4000) + window.innerHeight}px`;

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === containerRef.current)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full bg-[#080808]"
    >
      {/* Subtle grid background */}
      <div
        className="services-grid absolute inset-0 pointer-events-none opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,240,77,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,240,77,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, transparent, black 20%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)",
        }}
      />

      <FloatingDots />

      {/* Sticky container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Header */}
        <div className="relative z-20 pt-8 pb-4 px-6 md:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px bg-[#C8F04D]" />
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8F04D]">
                    What We Do
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase text-[#F5F0E8] leading-none">
                  OUR
                  <br />
                  <span className="text-[#C8F04D]">SERVICES</span>
                </h2>
              </div>

              {/* Counter — updated via DOM, not React state */}
              <div className="flex items-baseline gap-2">
                <span
                  ref={counterRef}
                  className="text-4xl md:text-5xl font-display text-[#C8F04D]"
                >
                  01
                </span>
                <span className="text-2xl font-display text-[#F5F0E8]/20">
                  /
                </span>
                <span className="text-2xl font-display text-[#F5F0E8]/20">
                  {String(services.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Progress bar — updated via DOM */}
            <div className="mt-3 h-px w-full bg-[#F5F0E8]/10 relative overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-[#C8F04D]"
                style={{ width: "16.67%", transition: "width 0.2s ease" }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal scrolling track */}
        <div className="relative w-full" style={{ height: "calc(100vh - 200px)" }}>
          <div
            ref={trackRef}
            className="absolute top-0 left-0 flex items-center h-full"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          >
            <div className="flex-shrink-0 w-[2vw] sm:w-[5vw]" />

            {services.map((service, i) => (
              <div
                key={service.id}
                data-service-card
                className="flex-shrink-0 w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw] h-full flex items-center px-2 md:px-4"
                style={{
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform: i === 0 ? "scale(1) translateZ(0)" : "scale(0.95) translateZ(0)",
                  opacity: i === 0 ? 1 : 0.4,
                }}
              >
                <div
                  className="relative w-full h-[50vh] sm:h-[55vh] rounded-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(${service.color === "#C8F04D" ? "200,240,77" : "255,61,46"
                      }, 0.12) 0%, rgba(8,8,8,0.95) 60%)`,
                    border: `1px solid ${service.color}30`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div
                    className="absolute -right-4 -top-8 text-[25vw] md:text-[18vw] font-display leading-none pointer-events-none select-none"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: `1px ${service.color}15`,
                    }}
                  >
                    {service.id}
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 lg:p-10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: service.color,
                            boxShadow: `0 0 12px ${service.color}`,
                          }}
                        />
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F5F0E8]/50">
                          Service {service.id}
                        </span>
                      </div>
                      <span
                        className="text-6xl md:text-8xl font-display"
                        style={{ color: service.color + "20" }}
                      >
                        {service.id}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center">
                      <h3 className="text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] font-display uppercase leading-[1.1] tracking-tight text-[#F5F0E8]">
                        {service.title.split("\n").map((line, li) => (
                          <span key={li} className="block">
                            {li === 1 ? (
                              <span style={{ color: service.color }}>{line}</span>
                            ) : (
                              line
                            )}
                          </span>
                        ))}
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#F5F0E8]/60 max-w-md leading-relaxed font-body">
                        {service.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, ti) => (
                          <span
                            key={ti}
                            className="px-3 py-1 text-xs font-mono uppercase tracking-wider border rounded-full"
                            style={{
                              borderColor: service.color + "30",
                              color: service.color + "90",
                              background: service.color + "08",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="h-px w-full relative overflow-hidden">
                        <div
                          className="h-full absolute left-0 top-0"
                          style={{
                            width: "100%",
                            background: `linear-gradient(90deg, ${service.color}, transparent)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex-shrink-0 w-[2vw]" />
          </div>
        </div>
      </div>
    </section>
  );
}
