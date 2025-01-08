import React from "react";
import { Link } from "react-router";
import { cn } from "./utils";

export const Button = ({
  variant = "light",
  url = "/",
  size = "default",
  children,
}) => {
  const theme =
    variant === "primary"
      ? "flex justify-center items-center h-10 border border-white capitalize text-white bg-primary hover:bg-hov_primary"
      : "flex justify-center items-center h-10 border border-jett_black capitalize bg-secondary_bg hover:bg-primary_bg";

  const width = size === "big" ? "w-32" : "w-20";

  return (
    <Link to={url} className={cn("", theme, width)}>
      {children}
    </Link>
  );
};
