import React from "react";
import Cursor from "../utility/Cursor";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <>
      <Toaster position="top-right" />
      {/* <Cursor /> */}
      <Outlet />
    </>
  );
};

export default AuthLayout;
