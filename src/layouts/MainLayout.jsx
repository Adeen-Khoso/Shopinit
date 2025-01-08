import React from "react";
import { Navbar2 } from "../utility/components/Navbar";
import { Footer4 } from "../utility/components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar2 />
      <Outlet />
      <Footer4 />
    </>
  );
};

export default MainLayout;
