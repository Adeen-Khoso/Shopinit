"use client";

import { Button, cn, useMediaQuery } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { MotionValue, useMotionValue, motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { RxChevronRight } from "react-icons/rx";
import clsx from "clsx";
import sellerImg from "../../assets/cta_imgs/sellerImg.jpg";
import buyersImg from "../../assets/cta_imgs/buyersImg.png";
import SeamlessImg from "../../assets/cta_imgs/card3Img.jpg";


type ImageProps = {
  src: string;
  alt?: string;
};

type FeatureSectionProps = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  featureSections: FeatureSectionProps[];
};

export type Layout408Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const calculateScales = (totalSections: number, scrollYProgress: MotionValue<number>) => {
  return Array.from({ length: totalSections }, (_, index) => {
    const sectionFraction = 1 / totalSections;
    const start = sectionFraction * index;
    const end = sectionFraction * (index + 1);

    return index < totalSections - 1
      ? useTransform(scrollYProgress, [start, end], [1, 0.8])
      : useMotionValue(1);
  });
};

export const Layout408 = (props: Layout408Props) => {
  const { tagline, heading, description, featureSections } = {
    ...Layout408Defaults,
    ...props,
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 60%"],
  });

  const scales = calculateScales(featureSections.length, scrollYProgress);

  return (
    <section id="explore" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-normal md:mb-4">{tagline}</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h1>
          <p className="md:text-md">{description}</p>
        </div>
        <div ref={containerRef} className="sticky top-0 grid grid-cols-1 gap-6 md:gap-0">
          {featureSections.map((featureSection, index) => (
            <FeatureSection key={index}  {...featureSection} scale={scales[index]} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureSection = ({
  scale,
  index,
  ...featureSection
}: FeatureSectionProps & {
  scale: MotionValue<number>;
  index: number;
}) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isEven = index % 2 === 0;

  return (
    <React.Fragment>
      {isMobile ? (
        <div className="static grid grid-cols-1 content-center overflow-hidden border border-border-primary bg-neutral-white">
          <FeatureSectionContent isEven={isEven} {...featureSection} />
        </div>
      ) : (
        <motion.div
          className="static grid grid-cols-1 content-center overflow-hidden border border-border-primary bg-secondary_bg md:sticky md:top-[10%] md:mb-[10vh] md:h-[75vh] 2xl:h-[60vh] md:grid-cols-2"
          style={{ scale }}
        >
          <FeatureSectionContent isEven={isEven} {...featureSection} />
        </motion.div>
      )}
    </React.Fragment>
  );
};

const FeatureSectionContent = ({
  isEven,
  ...featureSection
}: FeatureSectionProps & { isEven: boolean }) => (
  <React.Fragment >
    <div
      className={clsx(
        "order-first flex flex-col justify-center p-6 md:p-8 lg:p-12 bg-secondary_bg",
        isEven ? "md:order-first" : "md:order-last",
      )}
    >
      <p className="mb-2 font-semibold">{featureSection.tagline}</p>
      <h2 className="rb-5 mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
        {featureSection.heading}
      </h2>
      <p>{featureSection.description}</p>
      <div className="mt-6 flex items-center gap-x-4 md:mt-8">
        {featureSection.buttons.map((button, index) => (
          <Button key={index} className={cn("", button.variant === "secondary" ? " bg-primary text-white hover:bg-hov_primary" : "text-primary hover:text-opacity-80")} {...button}>
            {button.title}
          </Button>
        ))}
      </div>
    </div>
    <div
      className={clsx(
        "order-last  flex flex-col items-center justify-center md:-mr-3",
        isEven ? "md:order-last" : "md:order-first",
      )}
    >
      <img src={featureSection.image.src} alt={featureSection.image.alt}  />
    </div>
  </React.Fragment>
);

export const Layout408Defaults: Props = {
  tagline: "Discover",
  heading: "Empowering your marketplace",
  description: "Seamless transactions for buyers and sellers alike.",
  featureSections: [
    {
      tagline: "Empower",
      heading: "Sell Anything, Anytime From Anywhere",
      description:
        "Break the barriers of traditional selling. List your products, set your terms, and let the world be your marketplace. Total control, endless opportunities.",
      buttons: [
        { title: "Sell", variant: "secondary" },
        {
          title: "Buy",
          variant: "link",
          size: "link",
          iconRight: <RxChevronRight />,
        },
      ],
      image: {
        src: sellerImg,
        alt: "Relume placeholder image 1",
      },
    },
    {
      tagline: "Uncover",
      heading: "Uncover Unique Finds with Ease",
      description:
        "From essentials to the exceptional, find exactly what you’re looking for—or stumble upon something extraordinary. Explore a marketplace tailored to your freedom.",
      buttons: [
        { title: "Buy", variant: "secondary" },
        {
          title: "Sell",
          variant: "link",
          size: "link",
          iconRight: <RxChevronRight />,
        },
      ],
      image: {
        src: buyersImg,
        alt: "Relume placeholder image 2",
      },
    },
    {
      tagline: "Simplify",
      heading: "Freedom to Live, Freedom to Trade",
      description:
        "Say goodbye to the complexities. Enjoy seamless buying and selling with platform designed for your ease. Freedom starts here, it goes for black people too.",
      buttons: [
        { title: "Buy", variant: "secondary" },
        {
          title: "Sell",
          variant: "link",
          size: "link",
          iconRight: <RxChevronRight />,
        },
      ],
      image: {
        src: SeamlessImg,
        alt: "Relume placeholder image 3",
      },
    },
  ],
};
