"use client";

import { Button, cn, useMediaQuery } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { BiSolidStar } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";

import a from "../../assets/testimonials_imgs/a.jpg";
import b from "../../assets/testimonials_imgs/b.jpg";
import c from "../../assets/testimonials_imgs/c.jpg";
import d from "../../assets/testimonials_imgs/d.jpg";
import e from "../../assets/testimonials_imgs/e.jpg";
import f from "../../assets/testimonials_imgs/f.jpg";
import j from "../../assets/testimonials_imgs/j.jpg";
import k from "../../assets/testimonials_imgs/k.jpg";
import l from "../../assets/testimonials_imgs/l.jpg";
import m from "../../assets/testimonials_imgs/m.jpg";

type ImageProps = {
  src: string;
  alt?: string;
};

type Testimonial = {
  quote: string;
  avatar: ImageProps;
  name: string;
  position: string;
  companyName: string;
  numberOfStars: number;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  leftTestimonials: Testimonial[];
  rightTestimonials: Testimonial[];
};

export type Testimonial33Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Testimonial33 = (props: Testimonial33Props) => {
  const { heading, description, buttons, leftTestimonials, rightTestimonials } = {
    ...Testimonial33Defaults,
    ...props,
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end start"],
  });

  const isMobile = useMediaQuery("(max-width: 767px)");

  const leftCards = isMobile
    ? useTransform(scrollYProgress, [0, 0.6], ["20vh", "-70vh"])
    : useTransform(scrollYProgress, [0, 0.5], ["-10rem", "5rem"]);
  const rightCards = isMobile
    ? useTransform(scrollYProgress, [0, 0.6], ["20vh", "-70vh"])
    : useTransform(scrollYProgress, [0, 0.5], ["10rem", "-5rem"]);

  return (
    <section
      id="relume"
      ref={sectionRef}
      className="overflow-hidden px-[5%] py-12 md:py-16 lg:py-20"
    >
      <div id="reviews" className=" bg-secondary_bg container grid min-h-svh auto-cols-fr grid-cols-1 overflow-hidden border border-border-primary lg:h-[90vh] lg:min-h-[auto] lg:grid-cols-[0.75fr_1fr] lg:overflow-visible">
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div>
            <h2 className="rb-5 mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button key={index}  className={cn("", button.variant === "secondary" ? " bg-primary text-white hover:bg-hov_primary" : "text-primary hover:text-opacity-80")}{...button}>
                {button.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid h-screen auto-cols-fr grid-cols-1 content-center items-center gap-4 overflow-hidden border-t border-border-primary px-4 md:h-[70vh] md:grid-cols-2 md:px-8 lg:h-auto lg:border-none lg:pl-0 lg:pr-12">
          <motion.div
            className="grid size-full columns-2 auto-cols-fr grid-cols-1 gap-4 self-center"
            style={{ y: leftCards }}
          >
            <div className="grid size-full auto-cols-fr grid-cols-1 content-center gap-x-6 gap-y-4">
              {leftTestimonials.map((leftTestimonial, index) => (
                <div key={index} className="relative w-full">
                  <TestimonialCard key={index} {...leftTestimonial} />
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="grid size-full auto-cols-fr grid-cols-1 gap-4"
            style={{ y: rightCards }}
          >
            <div className="grid size-full auto-cols-fr grid-cols-1 content-center gap-4">
              {rightTestimonials.map((rightTestimonial, index) => (
                <div key={index} className="relative w-full">
                  <TestimonialCard key={index} {...rightTestimonial} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = (testimonial: Testimonial) => (
  <div className=" bg-primary_bg flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
    <div className="rb-5 mb-5 md:mb-6">
      <div className="rb-6 mb-6 flex">
        {Array(testimonial.numberOfStars)
          .fill(null)
          .map((_, starIndex) => (
            <BiSolidStar key={starIndex} className="mr-1 size-6 text-primary" />
          ))}
      </div>
      <blockquote className="md:text-md">{testimonial.quote}</blockquote>
    </div>
    <div className="flex w-full flex-col items-start text-left md:w-fit md:flex-row md:items-center">
      <img
        src={testimonial.avatar.src}
        alt={testimonial.avatar.alt}
        className="mb-4 size-12 min-h-12 min-w-12 rounded-full object-cover md:mb-0 md:mr-4"
      />
      <div>
        <p className=" text-primary font-semibold">{testimonial.name}</p>
        <p>
          <span>{testimonial.position}</span>, <span>{testimonial.companyName}</span>
        </p>
      </div>
    </div>
  </div>
);

export const Testimonial33Defaults: Props = {
  heading: "Customer Testimonials",
  description:
    "Real Stories, Real Impact – Hear from Those Who’ve Experienced the Difference. See How We Redefine Possibilities.",
  buttons: [
    { title: "Shop", variant: "secondary" },
    { title: "Contact", variant: "link", size: "link", iconRight: <RxChevronRight /> },
  ],
  leftTestimonials: [
    {
      quote:
        'Its been so aestheticalyly pleasing to work and do business on Shopinit, they are true example of Quality first company.',
      avatar: {
        src: k,
        alt: "Testimonial avatar 1",
      },
      name: "Sarah Memon",
      position: "Seller",
      companyName: "Shopinit",
      numberOfStars: 5,
    },
    {
      quote:
        'I found everything I needed here, and the process was so simple. This is my go-to platform now!',
      avatar: {
        src:l,
        alt: "Testimonial avatar 2",
      },
      name: "Ahmed Raza",
      position: "Buyer",
      companyName: "Shopinit",
      numberOfStars: 4,
    },
    {
      quote:
        'Selling on this platform has been the best decision. It’s intuitive, and my sales have skyrocketed!',
      avatar: {
        src: m,
        alt: "Testimonial avatar 3",
      },
      name: "Emily Smith",
      position: "Seller",
      companyName: "Shopinit",
      numberOfStars: 5,
    },
    {
      quote:
        'The variety here is unmatched. I love how unique the items are and how easy it is to find what I need.',
      avatar: {
        src: d,
        alt: "Testimonial avatar 4",
      },
      name: "Junaid Khan",
      position: "Buyer",
      companyName: "Shopinit",
      numberOfStars: 5,
    },
    {
      quote:
        'I enjoy selling here because of the freedom it gives me to set my own terms and prices. Great experience so far!',
      avatar: {
        src: e,
        alt: "Testimonial avatar 5",
      },
      name: "Sanjay Choudhary",
      position: "Seller",
      companyName: "Shopinit",
      numberOfStars: 4,
    },
  ],
  rightTestimonials: [
    {
      quote:
        'Shopping here feels different. The quality of items and the customer service make it my favorite platform.',
      avatar: {
        src: f,
        alt: "Testimonial avatar 6",
      },
      name: "Daniel Lee",
      position: "Buyer",
      companyName: "Shopinit",
      numberOfStars: 5,
    },
    {
      quote:
        'As a seller, I feel valued. The tools they provide make it simple to manage my products and communicate with buyers.',
      avatar: {
        src: a,
        alt: "Testimonial avatar 7",
      },
      name: "Ayesha Rizvi",
      position: "Seller",
      companyName: "Shopinit",
      numberOfStars: 5,
    },
    {
      quote:
        'The ease of browsing and purchasing items here is what keeps me coming back. It’s a platform like no other.',
      avatar: {
        src: b,
        alt: "Testimonial avatar 8",
      },
      name: "Ethan Collins",
      position: "Buyer",
      companyName: "Shopinit",
      numberOfStars: 4,
    },
    {
      quote:
        'This platform has empowered me as a seller. It feels great to connect with a community that values creativity.',
      avatar: {
        src: c,
        alt: "Testimonial avatar 9",
      },
      name: "Amara Sheikh",
      position: "Seller",
      companyName: "Shopinit",
      numberOfStars: 5,
    },
    {
      quote:
        'The unique items and the hassle-free process make this my top choice for shopping. Highly recommended!',
      avatar: {
        src: j,
        alt: "Testimonial avatar 10",
      },
      name: "William Green",
      position: "Buyer",
      companyName: "Shopinit",
      numberOfStars: 5,
    },
  ],
};
