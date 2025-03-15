import React from "react";
import Gradient from "../utility/Gradient";
import UserDetails from "../utility/components/UserDetails";
import { Product8 } from "../utility/components/Products";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(
    "user profile now has access to the user with email of",
    user?.email
  );

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
      <UserDetails email={user?.email} />
      <Product8 {...productProps} />
    </>
  );
};

export default UserProfile;
