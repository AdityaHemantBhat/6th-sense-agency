import { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ServicesScene from "./components/ServicesScene";
import Philosophy from "./components/Philosophy";
import AiConsultancyPage from "./components/AiConsultancyPage";
import ProjectDetailPage from "./components/ProjectDetailPage";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import BookingPage from "./components/BookingPage";
import PageTransition from "./components/PageTransition";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ 
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" 
});
ScrollTrigger.normalizeScroll(true);

function HomePage({ isLoading, setIsLoading }) {
  useEffect(() => {
    if (!isLoading) {
      const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener("load", onLoad);
      };
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <Navigation />
          <main>
            <Hero />
            <ServicesScene />
            <Philosophy />
          </main>
        </>
      )}
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const handlePop = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);

    window.navigateTo = (path) => {
      const [pathname, hash] = path.split("#");

      const performNav = () => {
        if (pathname !== window.location.pathname) {
          window.history.pushState(null, "", path);
          setCurrentPath(pathname);
        }

        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash === "projects" ? "about" : hash);
            if (el && lenisRef.current) {
              // If going to projects, we need to scroll deep into the pinned section
              const offset = hash === "projects" ? window.innerHeight * 22 : 0;
              lenisRef.current.scrollTo(el, { offset: offset, duration: 1.5 });
            }
          }, 500);
        } else {
          window.scrollTo(0, 0);
        }
      };

      if (window.triggerPageTransition) {
        window.triggerPageTransition(performNav);
      } else {
        performNav();
      }
    };

    const handleLinkClick = (e) => {
      const target = e.target.closest("a");
      if (target && target.href && target.href.startsWith(window.location.origin)) {
        const url = new URL(target.href);
        const path = url.pathname + url.search + url.hash;
        e.preventDefault();
        window.navigateTo(path);
      }
    };
    window.addEventListener("click", handleLinkClick);

    return () => {
      lenis.destroy();
      window.removeEventListener("popstate", handlePop);
      window.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    <div className="bg-[#080808] min-h-screen text-[#F5F0E8] overflow-x-hidden">
      <PageTransition />
      <div className="noise-overlay" />
      <Cursor />
      {currentPath === "/business-consultancy" ? (
        <AiConsultancyPage />
      ) : currentPath === "/contact" ? (
        <ContactPage />
      ) : currentPath === "/about" ? (
        <AboutPage />
      ) : currentPath === "/booking" ? (
        <BookingPage />
      ) : currentPath.startsWith("/project/") ? (
        <ProjectDetailPage id={currentPath.split("/").pop()} />
      ) : (
        <HomePage isLoading={isLoading} setIsLoading={setIsLoading} />
      )}
    </div>
  );
}
