import React from "react";
import { Product4 } from "../utility/components/Product4";
import { FaHeart } from "react-icons/fa6";

const Bookmarks = () => {
  return (
    <>
      <Product4
        tagline={<FaHeart className=" text-primary size-12 " />}
        heading="Bookmarks"
        description="Check out your favorite products"
        button={{ variant: "secondary", size: "primary", title: "View All" }}
        // products={productsData} later on, data will be provided using productsData to the children component
      />
    </>
  );
};

export default Bookmarks;
