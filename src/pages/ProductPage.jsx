import React, { useId, useState } from "react";
import { Product8 } from "../utility/components/Products";
import iphone14 from "../assets/iphone14.jpg";
import iphone14pro from "../assets/iphone14_second.jpg";
import NoData from "../utility/NoData";

const ProductPage = () => {
  // this products array will be fetched from the server later.
  const products = [
    {
      id: "1",
      title: "iPhone 14 Pro Max",
      price: "$999",
      description: "98% battery health, no damage, almost like new phone.",
      condition: "used",
      category: "phones",
      image: [
        "https://mobilesyrup.com/wp-content/uploads/2022/09/iphone-14-pro-header-1-scaled.jpg",
        "https://spy.com/wp-content/uploads/2023/02/IMG_2114-rotated.jpg?w=1024",
      ],
      uid: "1234",
    },
    {
      id: "2",
      title: "iPhone 14 Pro Max",
      price: "$999",
      description: "98% battery health, no damage, almost like new phone.",
      condition: "used",
      category: "phones",
      image: ["https://placehold.co/600x400", "../assets/iphone14_second.jpg"],
      uid: "2234",
    },
  ];
  return (
    <>
      {products.length === 0 ? (
        <NoData
          title="No Products here yet"
          subTitle="Start adding products from "
          link="/sell"
        />
      ) : (
        <Product8 products={products} />
      )}
    </>
  );
};

export default ProductPage;
