import React from "react";
import { Link } from "react-router";

const Button = ({
  variant = "light",
  url = "/",
  size = "default",
  children,
}) => {
  const theme =
    variant === "primary"
      ? "bg-black text-white border-white"
      : "bg-white text-black border-black";

  const width = size === "big" ? "w-42" : "w-32";

  return (
    <Link url={url} className={`${theme} ${width}`}>
      {children}
    </Link>
  );
};

export default Button;
