import React from "react";
import Button from "../utility/Button";
import { Navbar2 } from "../utility/Navbar";
import { Testimonial33 } from "../utility/Testimonials";
import { Header78 } from "../utility/Header";
import { Layout416 } from "../utility/Layout";

const Home = () => {
  return (
    <>
      <Navbar2 />
      <Header78 />
      <Layout416 />
      <Testimonial33 />
      <Button variant="primary" url="/">
        Join
      </Button>
    </>
  );
};

export default Home;
