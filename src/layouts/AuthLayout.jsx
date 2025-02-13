import React from "react";
import Cursor from "../utility/Cursor";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AuthLayout = () => {
  return (
    <>
      <ToastContainer
        draggable
        toastStyle={{
          backgroundColor: "FFF5F5",
          color: "#333",
          borderRadius: "0px",
          cursor: "pointer",
          color: "#2F3C7E",
        }}
      />
      <Cursor />
      <Outlet />
    </>
  );
};

export default AuthLayout;
