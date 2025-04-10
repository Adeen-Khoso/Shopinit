// version two of the cursor component
import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const hoverRef = useRef(null);

  useEffect(() => {
    if (!dotRef.current || !outlineRef.current || !hoverRef.current) return;

    const selector = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "[role='button']",
      "[data-cursor-hover]",
    ].join(",");

    const showDot = () => {
      dotRef.current.style.opacity = "1";
      outlineRef.current.style.opacity = "1";
      hoverRef.current.style.opacity = "0";
    };

    const showHover = () => {
      dotRef.current.style.opacity = "0";
      outlineRef.current.style.opacity = "0";
      hoverRef.current.style.opacity = "1";
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // 1) Reposition
      dotRef.current.style.left = `${x}px`;
      dotRef.current.style.top = `${y}px`;
      outlineRef.current.animate(
        { left: `${x}px`, top: `${y}px` },
        { duration: 500, fill: "forwards", easing: "ease-out" }
      );
      hoverRef.current.style.left = `${x}px`;
      hoverRef.current.style.top = `${y}px`;

      // 2) Check interactive
      if (e.target.closest(selector)) {
        showHover();
      } else {
        showDot();
      }
    };

    // Initialize to visible dot
    showDot();

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed w-2 h-2 bg-black rounded-full pointer-events-none transition-opacity"
      />
      <div
        ref={outlineRef}
        className="cursor-outline fixed w-8 h-8 border-2 border-black rounded-full pointer-events-none transition-opacity"
      />
      <div
        ref={hoverRef}
        className="cursor-hover fixed w-8 h-8 bg-black/20 rounded-full pointer-events-none transition-opacity opacity-0"
      />
    </>
  );
};

export default Cursor;
