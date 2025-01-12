"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";

type Props = {
  headings: string[];
};

export type Banner13Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Banner13 = (props: Banner13Props) => {
  const { headings } = {
    ...Banner13Defaults,
    ...props,
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const xPartOne = useTransform(scrollYProgress, [0, 0.7], ["-45%", "-5%"]);
  const xPartTwo = useTransform(scrollYProgress, [0, 1.2], ["40%", "-0%"]);

  return (
    <section
      id="relume"
      ref={sectionRef}
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="flex flex-col whitespace-nowrap">
        {headings.map((heading, index) => (
          <motion.h1
            key={index}
            style={index % 2 === 0 ? { x: xPartOne } : { x: xPartTwo }}
            className={clsx(" text-10xl md:text-[4.5rem] xl:text-[5rem] font-bold leading-[1.2]", {
              "self-end": index % 2 !== 0,
            })}
          >
            {heading}
          </motion.h1>
        ))}
      </div>
    </section>
  );
};

export const Banner13Defaults: Props = {
  headings: [" Unseen, Unlimited, Unbound.", "Live, Breathe, Be."],
};
