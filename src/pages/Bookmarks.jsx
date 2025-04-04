import React from "react";
import { Product4 } from "../utility/components/Product4";
import {
  FaBatteryEmpty,
  FaBeerMugEmpty,
  FaBoxOpen,
  FaCircle,
  FaCircleExclamation,
  FaFaceMeh,
  FaFolderOpen,
  FaHeart,
  FaInbox,
  FaMartiniGlassEmpty,
  FaWineGlassEmpty,
} from "react-icons/fa6";
import { Link } from "react-router";
import NoData from "../utility/NoData";

const Bookmarks = () => {
  const productsData = [];
  return (
    <>
      {productsData.length === 0 ? (
        <NoData
          title="No Bookmarks added yet"
          subTitle="Choose the favs and add products to Bookmarks from "
          link="/products"
        />
      ) : (
        <Product4
          tagline={<FaHeart className=" text-primary size-12 " />}
          heading="Bookmarks"
          description="Check out your favorite products"
          button={{ variant: "secondary", size: "primary", title: "View All" }}
          products={productsData}
          // later on, data will be provided using productsData to the children component
        />
      )}
    </>
  );
};

export default Bookmarks;
