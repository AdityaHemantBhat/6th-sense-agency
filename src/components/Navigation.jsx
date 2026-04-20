import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Business Consulting", href: "/business-consultancy" },
    { name: "Get in Touch", href: "/contact" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 pointer-events-none ${
          isScrolled ? "py-4 sm:py-6" : "py-6 sm:py-10"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else if (window.navigateTo) {
                window.navigateTo("/");
              }
            }}
            className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-wider hover-target group pointer-events-auto flex items-baseline relative"
          >
            <motion.div
              initial={{ y: -60, x: 20, rotate: 25, scale: 0.5, opacity: 0 }}
              animate={{ y: 0, x: 0, rotate: 0, scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 6,
                mass: 1,
                delay: 2.0
              }}
              className="text-[#C8F04D] z-10 origin-bottom"
              style={{ textShadow: "0px 10px 20px rgba(0,0,0,0.5)" }}
            >
              6th
            </motion.div>
            
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
              className="mx-1.5 transition-colors duration-300"
            >
              Sense
            </motion.span>
            
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
              className="group-hover:opacity-100 transition-opacity duration-300"
            >
              Agency
            </motion.span>
          </a>

          {/* Desktop Nav - Floating Pill */}
          <div className="hidden md:flex items-center gap-2 pointer-events-auto">
            <div className="flex items-center gap-8 px-8 py-3 rounded-full border border-white/20 bg-black/30 mr-4">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-xs font-mono uppercase tracking-[0.2em] opacity-80 hover:opacity-100 transition-all hover-target relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <a
              href="/booking"
              className="px-8 py-3 bg-white text-black rounded-full font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#C8F04D] transition-all hover-target"
            >
              Start Project
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden pointer-events-auto hover-target z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-1.5 mix-blend-difference">
              <span
                className={`block w-8 h-[2px] bg-white transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}
              ></span>
              <span
                className={`block w-8 h-[2px] bg-white transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block w-8 h-[2px] bg-white transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
              ></span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#080808] flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-5xl md:text-6xl font-light font-display uppercase text-[#F5F0E8] hover:text-[#C8F04D] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="/booking"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.2 + navLinks.length * 0.1,
                  duration: 0.5,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 px-8 py-4 bg-[#C8F04D] text-[#080808] rounded-full font-display text-2xl uppercase tracking-widest font-bold hover:shadow-[0_0_20px_rgba(200,240,77,0.3)] transition-all text-center"
              >
                Start Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
