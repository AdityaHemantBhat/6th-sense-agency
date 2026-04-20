import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Pre-baked gradient blobs — NO blur filter, using radial-gradient opacity instead
const GradientPatches = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(200,240,77,0.4) 0%, rgba(200,240,77,0.1) 30%, transparent 60%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(255,61,46,0.35) 0%, rgba(255,61,46,0.08) 30%, transparent 60%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
      <motion.div
        animate={{
          x: [0, 50, -100, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] left-[40%] w-[35vw] h-[35vw] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(245,240,232,0.3) 0%, rgba(245,240,232,0.05) 30%, transparent 60%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const stairRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const letters = useMemo(() => "6TH SENSE AGENCY".split(""), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stairRef.current) {
        const columns = stairRef.current.querySelectorAll(".stair-column");

        if (columns.length > 0) {
          gsap.fromTo(
            columns,
            { scaleY: 1, transformOrigin: "bottom center" },
            {
              scaleY: 0,
              duration: 1.5,
              ease: "expo.inOut",
              stagger: { amount: 0.6, from: "center" },
              onComplete: () => {
                if (stairRef.current) {
                  stairRef.current.style.display = "none";
                }
              },
            }
          );
        }
      }

      if (canvasContainerRef.current) {
        gsap.fromTo(
          canvasContainerRef.current,
          { scale: 2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.5, ease: "expo.out", delay: 0.8 }
        );
      }
    }, 100);

    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => window.innerWidth < 768 ? "+=200%" : "+=150%",
        scrub: 1.5,
        pin: true,
      },
    });

    tl.to(contentRef.current, {
      scale: 1.1,
      opacity: 0.8,
      ease: "none",
    });

    tl.to(
      ".hero-bottom-glow",
      { opacity: 0.6, scale: 1.2, y: -50, duration: 1 },
      0,
    );

    return () => {
      clearTimeout(timer);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#080808]"
    >
      {/* Glow — soft gradient, NO blur filter */}
      <div
        className="hero-bottom-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[50%] rounded-[100%] opacity-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(200,240,77,0.25) 0%, transparent 60%)" }}
      />

      {/* Staircase entrance columns */}
      <div
        ref={stairRef}
        className="absolute inset-0 z-50 flex w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="stair-column h-full bg-[#080808] border-r border-[#F5F0E8]/5"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              flex: 1,
            }}
          />
        ))}
      </div>

      {/* Gradient Background Patches */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-0" style={{ willChange: "transform", transform: "translateZ(0)" }}>
        <GradientPatches />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center items-center px-4 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <h1 className="overflow-hidden flex flex-wrap justify-center max-w-[90vw]">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: 200, opacity: 0, scale: 0.5, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
              transition={{
                duration: 1.4,
                delay: 1.0 + index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[10vw] md:text-[8vw] lg:text-[7vw] leading-none font-bold text-display text-[#F5F0E8]"
              style={{ display: "inline-block", transformOrigin: "bottom center", willChange: "transform, opacity" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 2.0, ease: "easeOut" }}
          className="mt-6 text-xl md:text-3xl text-body text-[#F5F0E8]/80 text-center max-w-2xl"
        >
          We build the impossible.
          <br />
          <span className="text-sm md:text-base text-mono mt-4 block text-[#C8F04D]">
            Full-service digital agency crafting experiences beyond the
            ordinary.
          </span>
        </motion.p>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-mono uppercase tracking-widest text-[#F5F0E8]/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-[#C8F04D] to-transparent"
        />
      </motion.div>
    </section>
  );
}
