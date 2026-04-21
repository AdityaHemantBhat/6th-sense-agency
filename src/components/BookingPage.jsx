import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { X, ArrowRight } from "lucide-react";
import Cursor from "./Cursor";

const services = [
  {
    id: 1,
    name: "Brand Identity",
    desc: "Complete brand overhaul, logo, typography, and visual language.",
    img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Web Experience",
    desc: "Next-level 3D websites with GSAP and WebGL alternatives.",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Motion Graphics",
    desc: "High-end animations and visual effects for campaigns.",
    img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Consultancy",
    desc: "Direct access to our creative directors for strategic insights.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function BookingPage({ onClose }) {
  const handleClose = onClose || (() => {
    if (window.navigateTo) window.navigateTo("/");
    else window.location.href = "/";
  });
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const uiRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imagesRef = useRef([]);

  // Initial Entrance Animation
  useEffect(() => {
    if(!uiRef.current) return;
    
    const tl = gsap.timeline();
    // Huge brutalist typography cascade
    tl.fromTo(".booking-title-char", 
      { y: "100%", rotateX: -90, opacity: 0 },
      { y: "0%", rotateX: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "expo.out" }
    );
    
    tl.fromTo(".booking-line", 
      { scaleX: 0, transformOrigin: "left" }, 
      { scaleX: 1, duration: 1, ease: "power3.inOut" }, 
      "-=0.5"
    );
    
    tl.fromTo(".booking-item", 
      { x: 50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 
      "-=0.5"
    );

  }, []);

  // Hover Image GSAP logic
  useEffect(() => {
    if (hoveredService !== null) {
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        if (i === hoveredService - 1) {
          gsap.to(img, { opacity: 1, scale: 1, zIndex: 10, duration: 0.6, ease: "power3.out" });
        } else {
          gsap.to(img, { opacity: 0, scale: 1.1, zIndex: 0, duration: 0.6, ease: "power3.out" });
        }
      });
    } else {
      imagesRef.current.forEach(img => {
        if(img) gsap.to(img, { opacity: 0, scale: 1.1, duration: 0.6, ease: "power3.out" });
      });
    }
  }, [hoveredService]);

  // Confirmation Sequence
  useEffect(() => {
    if (isConfirmed && textRef.current && uiRef.current) {
      const tl = gsap.timeline();

      tl.to(uiRef.current, {
        opacity: 0,
        filter: "blur(20px) contrast(200%)",
        scale: 0.9,
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          uiRef.current.style.display = "none";
        },
      });
      
      tl.fromTo(
        textRef.current,
        {
          opacity: 0,
          scale: 0.5,
          y: 100,
          rotateX: 45,
          filter: "blur(20px)",
          letterSpacing: "-0.2em",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          letterSpacing: "0em",
          duration: 1.5,
          ease: "expo.out",
        },
        "-=0.5",
      );
    }
  }, [isConfirmed]);

  const handleConfirm = async () => {
    if (!selectedService || !email) return;
    
    setIsConfirmed(true);

    try {
      const serviceObj = services.find(s => s.id === selectedService);
      await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          serviceId: selectedService,
          serviceName: serviceObj?.name
        })
      });
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  const titleChars = "START".split("");
  const titleChars2 = "PROJECT".split("");

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100000] bg-[#050505] text-[#F5F0E8] overflow-y-auto overflow-x-hidden flex flex-col pointer-events-auto"
      style={{ touchAction: "pan-y", overscrollBehaviorY: "contain" }}
      ref={containerRef}
      data-lenis-prevent
    >
      <Cursor />

      {/* Abstract GSAP Noise Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" className="opacity-40 w-full h-full">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
        </svg>
      </div>

      <button
        onClick={handleClose}
        className="fixed top-8 right-8 z-50 p-4 bg-transparent text-[#F5F0E8] rounded-full hover:bg-[#C8F04D] hover:text-[#080808] transition-all duration-300 hover-target border border-[#F5F0E8]/20"
      >
        <X size={24} />
      </button>

      {/* Main UI */}
      <div
        ref={uiRef}
        className="relative z-10 w-full flex flex-col xl:flex-row min-h-screen"
      >
        {/* Left Side - Visual & Typography */}
        <div className="w-full xl:w-1/2 min-h-[50vh] xl:h-screen p-8 md:p-16 flex flex-col justify-center relative border-b xl:border-b-0 xl:border-r border-[#F5F0E8]/10 overflow-hidden">
          
          {/* Dynamic Image Container bound to hover */}
          <div ref={imageContainerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[#050505] z-10 opacity-70 transition-opacity duration-500" style={{ opacity: hoveredService ? 0.3 : 1 }}></div>
            {services.map((service, i) => (
              <div 
                key={`img-${service.id}`}
                ref={el => imagesRef.current[i] = el}
                className="absolute inset-0 bg-cover bg-center opacity-0 scale-110 grayscale"
                style={{ backgroundImage: `url(${service.img})` }}
              />
            ))}
          </div>

          <div className="relative z-20 pointer-events-none mb-10 xl:mb-0">
            <div className="overflow-hidden flex">
              {titleChars.map((char, i) => (
                <h1 key={i} className="booking-title-char text-[15vw] md:text-[12vw] xl:text-[10vw] font-display uppercase leading-[0.8] text-[#F5F0E8] mix-blend-difference" style={{ transformOrigin: "bottom" }}>
                  {char}
                </h1>
              ))}
            </div>
            <div className="overflow-hidden flex">
              {titleChars2.map((char, i) => (
                <h1 key={i} className="booking-title-char text-[15vw] md:text-[12vw] xl:text-[10vw] font-display uppercase leading-[0.8] text-[#C8F04D] mix-blend-difference" style={{ transformOrigin: "bottom" }}>
                  {char}
                </h1>
              ))}
            </div>
            
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#F5F0E8]/60 mt-12 mix-blend-difference border-[#F5F0E8]/20 inline-block">
              // Select a core vector
            </p>
          </div>
        </div>

        {/* Right Side - Interactive List */}
        <div className="w-full xl:w-1/2 h-auto xl:h-screen pointer-events-auto relative bg-[#0a0a0a]">
          <div className="pt-10 xl:pt-[20vh] pb-48 px-6 md:px-20 flex flex-col">
            <div className="booking-line w-full h-px bg-[#F5F0E8]/20 mb-8" />
            
            {services.map((service, index) => {
              const isSelected = selectedService === service.id;
              const isHovered = hoveredService === service.id;
              
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="booking-item group border-b border-[#F5F0E8]/10 py-6 sm:py-8 hover-target cursor-pointer relative transition-all duration-500 hover:pl-4 sm:hover:pl-6 bg-transparent"
                >
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`font-mono text-[10px] sm:text-xs md:text-sm transition-colors duration-500 ${isSelected ? "text-[#C8F04D]" : "text-[#F5F0E8]/30"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className={`text-2xl sm:text-3xl md:text-5xl font-display uppercase tracking-tight transition-colors duration-500 ${isSelected || isHovered ? "text-[#C8F04D]" : "text-[#F5F0E8]"}`}>
                        {service.name}
                      </h2>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isSelected ? "max-h-[300px] opacity-100 mt-4 sm:mt-6 sm:ml-[3.5rem]" : "max-h-0 opacity-0 mt-0 sm:ml-[3.5rem]"}`}>
                    <p className="font-mono text-xs sm:text-sm md:text-base text-[#F5F0E8]/60 leading-relaxed border-l border-[#C8F04D] pl-3 sm:pl-4">
                      {service.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <AnimatePresence>
        {selectedService && !isConfirmed && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed bottom-0 right-0 w-full xl:w-1/2 p-6 md:p-12 z-20 pointer-events-none flex justify-center xl:justify-end bg-gradient-to-t from-[#050505] to-transparent"
          >
            <div className="pointer-events-auto flex items-center gap-4 bg-[#0a0a0a] border border-[#F5F0E8]/20 rounded-full p-2 pl-6">
              <input
                type="email"
                placeholder="Enter email to confirm..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-[#F5F0E8] outline-none font-mono text-sm placeholder:text-[#F5F0E8]/30 min-w-[200px]"
                required
              />
              <button
                onClick={handleConfirm}
                disabled={!email}
                className="flex items-center gap-3 px-6 py-3 bg-[#C8F04D] text-[#080808] font-mono text-sm uppercase tracking-widest hover:bg-[#F5F0E8] transition-colors duration-300 rounded-full hover-target shadow-[0_0_20px_rgba(200,240,77,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
                <div className="w-6 h-6 rounded-full bg-[#080808] flex items-center justify-center text-[#F5F0E8]">
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Overlay */}
      <div className={`fixed inset-0 z-30 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${isConfirmed ? "opacity-100 bg-[#050505]" : "opacity-0"}`}>
        <div className="flex flex-col items-center">
          <h2
            ref={textRef}
            className="text-[12vw] md:text-[8vw] font-display uppercase tracking-[-0.02em] text-[#F5F0E8] text-center leading-[1.1] opacity-0"
          >
            REQUEST <br />
            <span className="text-[#C8F04D]">RECEIVED</span>
          </h2>
          {isConfirmed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full border border-[#C8F04D] flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-[#C8F04D] animate-ping" />
              </div>
              <p className="font-mono text-[#F5F0E8]/50 text-sm tracking-[0.3em] uppercase mt-4">
                Our team will contact you shortly.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
