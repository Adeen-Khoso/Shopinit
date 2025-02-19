"use client";

import { useRef } from "react";
import { Button, cn, useMediaQuery } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { MotionStyle, MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { PiSpeedometerFill } from "react-icons/pi";
import { GiRoyalLove } from "react-icons/gi";
import { RiMoneyEuroCircleFill } from "react-icons/ri";

type ImageProps = {
  src: string;
  alt?: string;
};

type FeatureSectionProps = {
  icon: ImageProps;
  title: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  featureSections: FeatureSectionProps[];
};

export type Layout416Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout416 = (props: Layout416Props) => {
  const { tagline, heading, description, buttons, featureSections } = {
    ...Layout416Defaults,
    ...props,
  };

  const isMobile = useMediaQuery("(max-width: 767px)");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ["20% start", "end end"] : ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="px-[5%]">
      <div className="container">
        <div className="relative h-[300svh] lg:h-[300vh]">
          <div className="static grid h-full grid-cols-1 content-start items-center gap-x-20 gap-y-16 py-16 md:sticky md:top-0 md:h-[100svh] md:grid-cols-2 md:content-normal md:py-0 lg:h-screen">
            <div>
              <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {heading}
              </h2>
              <p className="md:text-md">{description}</p>
              <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                {buttons.map((button, index) => (
                  <Button key={index} className={cn("", button.variant === "secondary" ? " bg-primary text-white hover:bg-hov_primary" : " hidden ")} {...button}>
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="sticky top-[25%] flex min-h-[24.5rem] flex-col items-center justify-center md:relative md:top-0 md:min-h-[auto]">
              {featureSections.map((section, index) => (
                <FeatureSection
                  key={index}
                  section={section}
                  index={index}
                  totalSections={featureSections.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 mt-[100vh]" />
    </section>
  );
};

const FeatureSection = ({
  section,
  index,
  totalSections,
  scrollYProgress,
}: {
  section: FeatureSectionProps;
  index: number;
  totalSections: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const sectionScrollStart = index / totalSections;
  const sectionScrollEnd = (index + 1) / totalSections;

  const rotate = useTransform(
    scrollYProgress,
    [sectionScrollStart, sectionScrollEnd],
    [0 + index * 3, -30],
  );
  const translateY = useTransform(
    scrollYProgress,
    [sectionScrollStart, sectionScrollEnd],
    ["0vh", "-100vh"],
  );

  const translateX = useTransform(
    scrollYProgress,
    [sectionScrollStart, sectionScrollEnd],
    ["0vw", "-10vw"],
  );

  return (
    <motion.div
      className="absolute mx-6 flex flex-col justify-between border border-border-primary bg-secondary_bg p-8 md:ml-0"
      style={
        {
          rotate: index === totalSections - 1 ? "6deg" : rotate,
          translateY: index === totalSections - 1 ? undefined : translateY,
          translateX: index === totalSections - 1 ? undefined : translateX,
          zIndex: totalSections - index,
        } as MotionStyle
      }
    >
      <div className="rb-6 mb-6 md:mb-8">
        { section.title == "Join the Club" ? <GiRoyalLove className="size-12 text-primary" /> : section.title == "Snap, Price, List" ? <PiSpeedometerFill className="size-12 text-primary"/> :<RiMoneyEuroCircleFill className="size-12 text-primary"/> } 
      </div>
      <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">{section.title}</h3>
      <p>{section.description}</p>
    </motion.div>
  );
};

export const Layout416Defaults: Props = {
  tagline: "Effortless",
  heading: "How It All Works ?",
  description:
    "Like Magic, Seamlessly buy or sell in just a few clicks. No hoops, no hassle—just an intuitive platform designed for speed and simplicity. Start earning, start growing.",
  buttons: [
    { title: "Sell Now", variant: "secondary" },
    {
      title: "Button",
      variant: "link",
      size: "link",
      iconRight: <RxChevronRight />,
    },
  ],
  featureSections: [
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Relume logo 1",
      },
      title: "Join the Club",
      description:
        "Sign up in seconds and unlock a premium selling experience. Set up your profile, and you’re ready to roll—no delays, no confusion. ",
    },
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Relume logo 2",
      },
      title: "Snap, Price, List",
      description:
        "Got a product? Snap some photos, name your price, and let us handle the rest. Listing here feels faster than texting your bestie!",
    },
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Relume logo 3",
      },
      title: "Sell, Earn, Repeat",
      description:
        "Your products go live in an instant, connecting you to eager buyers. Sales roll in, and earnings are just a click away. It's selling made sensational.",
    },
  ],
};
