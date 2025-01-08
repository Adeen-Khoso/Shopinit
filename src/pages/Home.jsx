import React from "react";
import Button from "../utility/Button";
import { Navbar2 } from "../utility/Navbar";
import { Testimonial33 } from "../utility/Testimonials";
import { Header78 } from "../utility/Header";
import { Layout416 } from "../utility/Layout";
import { Layout408 } from "../utility/Layout2";
import { Footer4 } from "../utility/Footer";
import { navbarProps } from "../props/navbarProps";

const Home = () => {
  return (
    <>
      <Navbar2 {...navbarProps} />
      <Header78 />
      <Layout408 />
      <Testimonial33 />
      <Layout416 />
      <Footer4 />
    </>
  );
};

export default Home;
