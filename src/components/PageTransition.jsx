import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function PageTransition() {
  const overlayRef = useRef(null);
  const pathRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Expose transition trigger globally
    window.triggerPageTransition = (callback) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        }
      });

      // Show overlay
      gsap.set(overlayRef.current, { zIndex: 1000000, pointerEvents: "all" });

      const startPath = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
      const midPath = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
      const fullPath = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

      const exitMidPath = "M 0 0 V 0 Q 50 50 100 0 V 0 z";
      const exitEndPath = "M 0 0 V 0 Q 50 0 100 0 V 0 z";

      gsap.set(pathRef.current, { attr: { d: startPath } });

      // Enter Animation
      tl.to(pathRef.current, {
        attr: { d: midPath },
        duration: 0.4,
        ease: "power3.in"
      })
        .to(pathRef.current, {
          attr: { d: fullPath },
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            // Fire the route change while screen is completely covered
            if (callback) callback();
          }
        })
        // Small pause fully covered
        .to(pathRef.current, {
          attr: { d: fullPath },
          duration: 0.1
        })
        // Exit Animation (pulls up)
        .to(pathRef.current, {
          attr: { d: exitMidPath },
          duration: 0.4,
          ease: "power3.in"
        })
        .to(pathRef.current, {
          attr: { d: exitEndPath },
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(overlayRef.current, { pointerEvents: "none", zIndex: -1 });
          }
        });
    };

    return () => {
      delete window.triggerPageTransition;
    };
  }, [isAnimating]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none flex items-center justify-center -z-10"
      style={{ isolation: "isolate" }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
          fill="#C8F04D"
        />
      </svg>
      {/* Optional: We can add an agency logo scale-up in the center if we want, but clean sweeping works better */}
    </div>
  );
}
