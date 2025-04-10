import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const hoverRef = useRef(null);

  useEffect(() => {
    if (!dotRef.current || !outlineRef.current || !hoverRef.current) return;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      dotRef.current.style.left = `${x}px`;
      dotRef.current.style.top = `${y}px`;
      outlineRef.current.animate(
        { left: `${x}px`, top: `${y}px` },
        { duration: 500, fill: "forwards", easing: "ease-out" }
      );
      hoverRef.current.style.left = `${x}px`;
      hoverRef.current.style.top = `${y}px`;
    };

    const handleEnter = () => {
      dotRef.current.style.opacity = "0";
      outlineRef.current.style.opacity = "0";
      hoverRef.current.style.opacity = "1";
    };

    const handleLeave = () => {
      dotRef.current.style.opacity = "1";
      outlineRef.current.style.opacity = "1";
      hoverRef.current.style.opacity = "0";
    };

    // 1) mousemove
    window.addEventListener("mousemove", handleMouseMove);

    // 2) delegated hover in/out for any interactive selector
    const selectors = "a, button, input, textarea, select, [data-cursor-hover]";
    const handleOver = (e) => {
      if (e.target.matches(selectors)) handleEnter();
    };
    const handleOut = (e) => {
      if (e.target.matches(selectors)) handleLeave();
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot fixed pointer-events-none" />
      <div
        ref={outlineRef}
        className="cursor-outline fixed pointer-events-none"
      />
      <div
        ref={hoverRef}
        className="cursor-hover fixed pointer-events-none opacity-0"
      />
    </>
  );
};

export default Cursor;
