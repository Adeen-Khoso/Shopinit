"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

type Props = {
  headings: string[];
};

export type Banner14Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Banner14 = (props: Banner14Props) => {
  const { headings } = {
    ...Banner14Defaults,
    ...props,
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingTranslate = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <section id="relume" ref={sectionRef} className=" flex items-center justify-center h-10 bg-primary text-white overflow-hidden">
      <div className="flex whitespace-nowrap border-b border-t w-full border-border-primary">
        <div className="flex w-full items-center justify-center overflow-hidden whitespace-nowrap py-4">
          {Array(1)
            .fill(0)
            .map((_, index) => (
              <motion.div
                key={index}
                className=" grid auto-cols-max grid-flow-col grid-cols-[max-content] gap-12 "
                style={{ x: headingTranslate }}
              >
                {headings.map((heading, headingIndex) => {
                  return (
                    <h5 key={headingIndex} className="text-xs md:text-sm">
                      {heading}
                    </h5>
                  );
                })}
              </motion.div>

            ))}
        </div>
      </div>
    </section>
  );
};

export const Banner14Defaults: Props = {
  headings: [
    "Every Purchase Supports Charity, Welfare and Community.",
  ],
};
