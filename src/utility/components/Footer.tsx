import { FaThreads, FaXTwitter } from "react-icons/fa6";
import {
  BiLogoDiscord,
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import logoImage from "../../assets/logo.png";
import { Link } from "react-router";


type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
};

type ColumnLinks = {
  links: Links[];
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type FooterLink = {
  title: string;
  url: string;
};

type Props = {
  logo: ImageProps;
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLinks[];
  footerText: string;
  footerLinks: FooterLink[];
};

export type Footer4Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Footer4 = (props: Footer4Props) => {
  const { logo, footerText, columnLinks, footerLinks, socialMediaLinks } = {
    ...Footer4Defaults,
    ...props,
  };
  return (
    <footer id="footer" className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center justify-items-center gap-x-[4vw] gap-y-12 pb-12 md:pb-18 lg:grid-cols-[0.25fr_1fr_0.25fr] lg:justify-between lg:gap-y-4 lg:pb-20">
          <a href={logo.url} className="lg:justify-self-start ">
            <img src={logo.src} alt={logo.alt} className="inline-block h-9" />
          </a>
          {columnLinks.map((column, index) => (
            <ul
              key={index}
              className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start"
            >
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex} className="font-semibold">
                  <Link to={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          
          ))}
          <div className="flex items-start justify-start justify-items-center gap-x-3 lg:justify-self-end">
            {socialMediaLinks.map((link, index) => (
              <Link key={index} to={link.url}>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-jett_black" />
        <div className="flex flex-col-reverse items-center justify-center justify-items-center pb-4 pt-6 text-sm md:flex-row md:gap-x-6 md:pb-0 md:pt-8">
          <p className="mt-8 md:mt-0">{footerText}</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-center justify-items-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks.map((link, index) => (
              <li key={index} className="underline decoration-black underline-offset-1 ">
                <Link to={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export const Footer4Defaults: Props = {
  logo: {
    url: "/",
    src: logoImage,
    alt: "Logo image",
  },
  columnLinks: [
    {
      links: [
        { title: "Shop", url: "#" },
        { title: "Sell", url: "#" },
        { title: "Cart", url: "#" },
        { title: "Contact Us", url: "#" },
        { title: "Explore", url: "#" },
      ],
    },
  ],
  socialMediaLinks: [
    { url: "https://discordapp.com/users/894871903796363286", icon: <BiLogoDiscord className="size-6 text-primary" /> },
    { url: "https://www.instagram.com/adeenn.khoso", icon: <BiLogoInstagram className="size-6 text-primary" /> },
    { url: "https://www.linkedin.com/in/adeen-khoso/", icon: <BiLogoLinkedinSquare className="size-6 text-primary" /> },
    { url: "#", icon: <FaThreads className="size-6 p-0.5 text-primary" /> },
    { url: "#", icon: <BiLogoYoutube className="size-6 text-primary" /> },
  ],
  footerText: "© 2025. All rights reserved. Dev. by Adeen K.",
  footerLinks: [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
    { title: "Developer", url:"https://www.instagram.com/adeenn.khoso" },
  ],
};
