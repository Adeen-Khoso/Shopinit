import React from "react";
import Cursor from "../utility/Cursor";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Cursor />
      <Outlet />
    </>
  );
};

export default AuthLayout;
