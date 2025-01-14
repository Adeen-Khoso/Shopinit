// import React, { useEffect, useRef } from "react";

// const Cursor = () => {
//   const cursorDotRef = useRef(null);
//   const cursorOutlineRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const posX = e.clientX;
//       const posY = e.clientY;

//       cursorDotRef.current.style.left = `${posX}px`;
//       cursorDotRef.current.style.top = `${posY}px`;

//       cursorOutlineRef.current.animate(
//         {
//           left: `${posX}px`,
//           top: `${posY}px`,
//         },
//         {
//           duration: 2000,
//           fill: "forwards",
//           easing: "ease-out",
//         }
//       );
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <>
//       <div className="cursor-dot" ref={cursorDotRef}></div>
//       <div className="cursor-outline" ref={cursorOutlineRef}></div>
//     </>
//   );
// };

// export default Cursor;

import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const hoverCursorRef = useRef(null);

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

      hoverCursorRef.current.style.left = `${posX}px`;
      hoverCursorRef.current.style.top = `${posY}px`;
    };

    const handleMouseEnter = () => {
      cursorDotRef.current.style.opacity = "0";
      cursorOutlineRef.current.style.opacity = "0";
      hoverCursorRef.current.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursorDotRef.current.style.opacity = "1";
      cursorOutlineRef.current.style.opacity = "1";
      hoverCursorRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interactiveElements = document.querySelectorAll("a, button");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-outline" ref={cursorOutlineRef}></div>
      <div className="cursor-hover" ref={hoverCursorRef}></div>
    </>
  );
};

export default Cursor;
