import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use direct DOM manipulation instead of React state for 60fps cursor
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.15);
      currentY = lerp(currentY, mouseY, 0.15);
      cursor.style.transform = `translate3d(${currentX - 8}px, ${currentY - 8}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-target")
      ) {
        cursor.classList.add("hovering");
      } else {
        cursor.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ position: "fixed", top: 0, left: 0, willChange: "transform" }}
    />
  );
}
