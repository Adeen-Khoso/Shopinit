export const navbarProps = {
  logo: {
    url: "/",
    src: "../assets/logo.png",
    alt: "logo",
  },
  navLinks: [
    { title: "Shop Now", url: "/home" },
    { title: "About Us", url: "/about" },
    { title: "Profile", url: "/services" },
    {
      title: "More",
      url: "/more",
      subMenuLinks: [
        { title: "Contact", url: "" },
        { title: "Blog", url: "/blog" },
      ],
    },
  ],
  buttons: [
    {
      title: "Cart (0)",
      size: "sm",
    },
  ],
};
