import React from "react";
import Gradient from "../utility/Gradient";
import UserDetails from "../utility/components/UserDetails";
import { Product8 } from "../utility/components/Products";

const UserProfile = () => {
  const products = [];

  const productProps = {
    tagline: "Explore",
    heading: "Your Products",
    description: "Browse through your products on sell.",
    button: {
      variant: "Hidden",
      size: "primary",
      title: "",
    },
    products: products,
  };
  return (
    <>
      <Gradient />
      <UserDetails />
      <Product8 {...productProps} />
    </>
  );
};

export default UserProfile;
