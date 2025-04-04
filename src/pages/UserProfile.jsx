import React from "react";
import Gradient from "../utility/Gradient";
import UserDetails from "../utility/components/UserDetails";
import { Product8 } from "../utility/components/Products";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NoData from "../utility/NoData";

const UserProfile = () => {
  const userProducts = [];

  const productProps = {
    tagline: "Explore",
    heading: "Your Products",
    description: "Browse through your products on sell.",
    button: {
      variant: "Hidden",
      size: "primary",
      title: "",
    },
    products: userProducts,
  };
  return (
    <>
      <Gradient />
      <UserDetails />
      {userProducts.length === 0 ? (
        <NoData
          title="Your Store is Empty"
          subTitle="Create store and begin selling now with us from "
          link="/sell"
        />
      ) : (
        <Product8 {...productProps} />
      )}
    </>
  );
};

export default UserProfile;
