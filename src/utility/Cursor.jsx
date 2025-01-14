import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDotRef.current.style.left = `${posX}px`;
      cursorDotRef.current.style.top = `${posY}px`;

      cursorOutlineRef.current.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        {
          duration: 500,
          fill: "forwards",
          easing: "ease-out",
        }
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-outline" ref={cursorOutlineRef}></div>
    </>
  );
};

export default Cursor;
