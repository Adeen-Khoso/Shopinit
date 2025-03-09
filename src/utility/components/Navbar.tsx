"use client";

import { useState } from "react";
import { useEffect } from "react";
import { cn, useMediaQuery } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import { HashLink } from "react-router-hash-link";
import logoImage from "../../assets/logo.png";
// import { Button } from "@relume_io/relume-ui";
import { CiSearch, CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router";
import SearchBox from "./SearchBox"

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
  buttons: ButtonProps[];
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;
  
export const Navbar2 = (props: Navbar2Props) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [position, setPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  
  const setSearchOpen = ()=>{
    setIsSearchOpen(true)
    setPosition(window.scrollY); 
  }

  useEffect(()=> {
    if( isMobileMenuOpen ) {
      document.body.style.position = 'fixed'; 
    }else { 
      document.body.style.position = ''; 
    }
  },[isMobileMenuOpen]);

  useEffect(() => {
    if(isSearchOpen){
      document.body.style.position = 'fixed'; 
      document.body.classList.add("search-open");
      document.body.style.width = '100%'; 
      document.body.style.overflow = 'hidden';
      document.body.style.top = `-${position}px`;
    }else{
      document.body.style.position = ''; 
      document.body.classList.remove("search-open");
      // document.body.style.top = ``; 
      document.body.style.width = '';
      document.body.style.overflow = ''

      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, position);
      void document.documentElement.offsetWidth;
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }
  },[isSearchOpen]);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      if (scrollDirection === "down" && currentScrollY > 50) {
        setShowNavbar(false);
      } else if (scrollDirection === "up") {
        setShowNavbar(true);
      }

      if (currentScrollY === 0) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollDirection]);

  const { logo, navLinks, buttons } = {
    ...Navbar2Defaults,
    ...props,
  };

  return (
    <>
      <SearchBox isSearchOpen={ isSearchOpen } setIsSearchOpen= {setIsSearchOpen }/>
      
      <nav  
        id="nav"      
        className={cn(
          ` items-center fixed left-0 w-full z-10 transition-all duration-700 ease-in-out ${isSearchOpen?  "navbar-hidden"  : 'flex'}`,
          showNavbar
            ? lastScrollY == 0
              ? "top-10"
              : "top-0"
            : "top-10 -translate-y-[calc(100%+40px)]",
          "border-b border-border-primary bg-primary_bg lg:min-h-18 lg:px-[5%]"
        )}
      >

        <div className="  mx-auto size-full lg:grid lg:grid-cols-[0.375fr_1fr_0.375fr] lg:items-center lg:justify-between lg:gap-4">
          <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
            <a href={logo.url}>
              <img className="w-20" src={logo.src} alt={logo.alt} />
            </a>
            <div className="flex items-center gap-7 lg:hidden">
              <div className="flex gap-3">

                <button onClick={() => setSearchOpen()} >
                  <Link to={'#'}><CiSearch className=" text-primary size-6  hover:text-hov_primary" strokeWidth={0.5} /></Link>
                </button>
                <Link to={"/profile"}><CiUser className=" text-primary size-6 hover:text-hov_primary" strokeWidth={0.5}/></Link>
                <Link to={'/'}><CiShoppingCart className=" text-primary size-6 hover:text-hov_primary" strokeWidth={0.5}/></Link>

              </div>
              <button
                className="-mr-2 flex size-12 flex-col items-center justify-center "
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                <motion.span
                  className="my-[3px] h-0.5 w-6 bg-jett_black"
                  animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                  variants={topLineVariants}
                />
                <motion.span
                  className="my-[3px] h-0.5 w-6 bg-jett_black"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  variants={middleLineVariants}
                />
                <motion.span
                  className="my-[3px] h-0.5 w-6 bg-jett_black"
                  animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                  variants={bottomLineVariants}
                />
              </button>
            </div>
          </div>
          <motion.div
            variants={{
              open: {
                height: "var(--height-open, 100dvh)",
              },
              close: {
                height: "var(--height-closed, 0)",
              },
            }}
            animate={isMobileMenuOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.4 }}
            className="overflow-hidden px-[5%] bg-primary md:bg-primary_bg md:text-jett_black text-white text-start md:text-center lg:flex lg:items-center lg:justify-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
          >
            {navLinks.map((navLink, index) => (
              <div key={index} className="first:pt-4 lg:first:pt-0 ">
                {navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                  <SubMenu navLink={navLink} isMobile={isMobile} />
                ) : (
                  <HashLink
                    onClick={() => setIsMobileMenuOpen(false)}
                    to={navLink.url}
                    className=" md:border-0 border-b border-white border-opacity-10 mb-3 md:mb-0 block py-3 text-md lg:px-4 lg:py-2 lg:text-base md:hover:text-neutral-dark"
                  >
                    {navLink.title}
                  </HashLink>
                )}
              </div>
            ))}
          </motion.div>


          <div className="hidden flex-row justify-self-end lg:flex lg:gap-5">
            <button onClick={() => setSearchOpen()} >
              <Link to={'#'}><CiSearch className=" text-primary size-6  hover:text-hov_primary" strokeWidth={0.5} /></Link>
            </button>

            <Link to={"/profile"}><CiUser className=" text-primary size-6 hover:text-hov_primary" strokeWidth={0.5}/></Link>
            <Link to={'/'}><CiShoppingCart className=" text-primary size-6 hover:text-hov_primary" strokeWidth={0.5}/></Link>
          </div>

        </div>
      </nav>
    </>
  );
};

const SubMenu = ({
  navLink,
  isMobile,
}: {
  navLink: NavLink;
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="hover:text-neutral-dark flex w-full items-center justify-center gap-4 py-3 text-center text-md lg:w-auto lg:flex-none lg:justify-start lg:gap-2 lg:px-4 lg:py-2 lg:text-base"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          animate={isDropdownOpen ? "rotated" : "initial"}
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        > sell
          <RxChevronDown />
        </motion.span>
      </button>
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.nav
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            variants={{
              open: {
                visibility: "visible",
                opacity: "var(--opacity-open, 100%)",
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
              },
            }}
            transition={{ duration: 0.2 }}
            className=" bg-secondary_bg rounded-lg lg:absolute lg:z-50 lg:border lg:border-border-primary lg:p-2 lg:[--y-close:25%]"
          >
            {navLink.subMenuLinks?.map((subMenuLink, index) => (
              <HashLink
                key={index}
                to={subMenuLink.url}
                className="block py-3 text-center lg:px-4 lg:py-2 lg:text-left hover:text-neutral-dark"
              >
                {subMenuLink.title}
              </HashLink> 
            ))}
          </motion.nav>
        </AnimatePresence>
      )}
    </nav>
  );
};

export const Navbar2Defaults: Props = {
  logo: {
    url: "/",
    src: logoImage,
    alt: "logo",
  },
  navLinks: [
    { title: "Shop Now", url: "/products" },
    { title: "Sell Now", url: "/sell" }, // hardcoded for now, later will be based on whether user is logged in or not and then be set to selling page accordingly
    { title: "About Us", url: "/#explore" },
    {
      title: "Contact",
      url: "#footer",
      // subMenuLinks: [
      //   { title: "Contact", url: "/#footer" },
      //   { title: "Reviews", url: "/#reviews" },
      // ],
    },
  ],
  buttons: [
    {
      title: "Cart (0)",
      size: "sm",
    },
  ],
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
