import React from "react";
import { Navbar2 } from "../utility/components/Navbar";
import { Footer4 } from "../utility/components/Footer";
import { Outlet } from "react-router-dom";
import { Banner14 } from "../utility/components/Banner";

const MainLayout = () => {
  return (
    <>
      <Banner14 />
      <Navbar2 />
      <Outlet />
      <Footer4 />
    </>
  );
};

export default MainLayout;
