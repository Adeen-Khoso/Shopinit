import React from "react";
import { Product4 } from "../utility/components/Product4";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router";

const Bookmarks = () => {
  const productsData = undefined;
  return (
    <>
      {productsData ? (
        <Product4
          tagline={<FaHeart className=" text-primary size-12 " />}
          heading="Bookmarks"
          description="Check out your favorite products"
          button={{ variant: "secondary", size: "primary", title: "View All" }}
          products={productsData}
          // later on, data will be provided using productsData to the children component
        />
      ) : (
        <div className="p-[5%] flex flex-col items-center gap-5 ">
          <FaHeart className=" text-primary size-12 " />
          <h1 className="text-3xl  text-jett_black">No Bookmarks added yet</h1>
          <p className="-mt-4">
            Choose the favs and add products to Bookmarks from
            <Link
              to={"/products"}
              className=" underline text-primary cursor-pointer"
            >
              here
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
};

export default Bookmarks;
