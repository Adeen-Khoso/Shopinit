import { Button, cn } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import HeroImage1 from "../../assets/hero_section_imgs/4e77946d-d778-451e-ac17-f8df0af58e4b 1.png";
import HeroImage2 from "../../assets/hero_section_imgs/THE_FOOTBALL_CORE_Product_picture_to_sell_in_website_with_pastel_col_370e9744-15c3-440b-8e5b-abce511a98a6.png";
import HeroImage3 from "../../assets/hero_section_imgs/THE_FOOTBALL_CORE_Product_picture_to_sell_in_website_with_pastel_col_556a89f4-6f5c-4edd-a665-c444051cc9db.png";
import HeroImage4 from "../../assets/hero_section_imgs/THE_FOOTBALL_CORE_Product_picture_to_sell_in_website_with_pastel_col_64473192-5bab-47ee-83ed-2addc5c5e654.png";
import HeroImage5 from "../../assets/hero_section_imgs/THE_FOOTBALL_CORE_Product_picture_to_sell_in_website_with_pastel_col_b3043141-866e-472e-9b09-a66e8f37de85.png";
import HeroImage6 from "../../assets/hero_section_imgs/THE_FOOTBALL_CORE_Product_picture_to_sell_in_website_with_pastel_col_f3c0f130-84d7-4b5e-bd88-f25e95dc9a9d.png";
import HeroImage7 from "../../assets/hero_section_imgs/freepik__candid-image-photography-natural-textures-highly-r__13749.jpeg";
import HeroImage8 from "../../assets/hero_section_imgs/freepik__candid-image-photography-natural-textures-highly-r__13750.jpeg";
import HeroImage9 from "../../assets/hero_section_imgs/freepik__candid-image-photography-natural-textures-highly-r__13752.jpeg";
import HeroImage10 from "../../assets/hero_section_imgs/freepik__candid-image-photography-natural-textures-highly-r__13753.jpeg";
import HeroImage11 from "../../assets/hero_section_imgs/freepik__candid-image-photography-natural-textures-highly-r__13754.jpeg";
import { Link } from "react-router";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  images: ImageProps[];
};

export type Header78Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header78 = (props: Header78Props) => {
  const { heading, description, buttons, images } = {
    ...Header78Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 pt-32 md:pt-36  md:pb-24 lg:pb-28">
      <div className="container flex flex-col items-center">
        <div className="rb-12 mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">{heading}</h1>
          <p className="md:text-md">{description}</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button className={cn("", button.title === "Sell" ? " bg-secondary_bg hover:bg-white" : "bg-primary text-white hover:bg-hov_primary")} key={index} {...button} 
              onClick={(e) => {
                e.preventDefault();
                const linkElement = e.currentTarget.firstChild as HTMLElement;
                linkElement?.click();
              }}>
                <Link className="" to={button.title== "Shop" ? '/products' : '/sell'}>
                  {button.title }
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex w-screen justify-start overflow-hidden">
          <div className="grid shrink-0 grid-cols-1 gap-y-4">
            <div className="grid w-full animate-marquee-top auto-cols-fr grid-cols-2 gap-4 self-center">
              {[...new Array(2)].map((e, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <img
                        className="absolute inset-0 size-full object-cover"
                        src={image.src}
                        alt={image.alt}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="grid w-full animate-marquee-bottom grid-cols-2 gap-4 self-center">
              {[...new Array(2)].map((e, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <img
                        className="absolute inset-0 size-full object-cover"
                        src={image.src}
                        alt={image.alt}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header78Defaults: Props = {
  heading: "The Marketplace of Uncharted Dreams",
  description:
    "Where possibilities are infinite, and the ordinary becomes extraordinary. Buy, sell, and thrive in a space that’s uniquely yours; Redefine how you live.",
  buttons: [{ title: "Shop" }, { title: "Sell", variant: "secondary" }],
  images: [
    {
      src: HeroImage8,
      alt: "placeholder image 1",
    },

    {
      src: HeroImage2,
      alt: "Relume placeholder image 2",
    },

    {
      src: HeroImage3,
      alt: "Relume placeholder image 3",
    },

    {
      src: HeroImage4,
      alt: "Relume placeholder image 4",
    },

    {
      src: HeroImage5,
      alt: "Relume placeholder image 5",
    },

    {
      src: HeroImage6,
      alt: "Relume placeholder image 6",
    },
  ],
};

