import React, { useState } from "react";
import CartUI from "../utility/components/CartUI";
import iphone14 from "../assets/iphone14.jpg";
import iphone14pro from "../assets/iphone14_second.jpg";

const Cart = () => {
  const removeProduct = () => {
    console.log("remove product from cart");
  };
  // const products = [
  //   {
  //     title: "iPhone 14 Pro Max",
  //     price: "$999",
  //     description: "98% battery health, no damage, almost like new phone.",
  //     condition: "used",
  //     category: "phones",
  //     images: [iphone14, iphone14pro],
  //   },
  //   {
  //     title: "iPhone 14 Pro Max",
  //     price: "$999",
  //     description: "98% battery health, no damage, almost like new phone.",
  //     condition: "used",
  //     category: "phones",
  //     images: [iphone14, iphone14pro],
  //   },
  // ];

  const products = [
    {
      id: "1",
      title: "iPhone 14 Pro Max",
      price: "120000",
      description: "98% battery health, no damage, almost like new phone.",
      condition: "used",
      category: "phones",
      image: [
        "https://mobilesyrup.com/wp-content/uploads/2022/09/iphone-14-pro-header-1-scaled.jpg",
        "https://spy.com/wp-content/uploads/2023/02/IMG_2114-rotated.jpg?w=1024",
      ],
      // uid: "1234",
    },
    {
      id: "2",
      title: "iPhone 14 Pro Max",
      price: "120000",
      description: "98% battery health, no damage, almost like new phone.",
      condition: "used",
      category: "phones",
      image: ["https://placehold.co/600x400", "../assets/iphone14_second.jpg"],
      // uid: "2234",
    },
  ];

  const user = {
    name: "Mobile Store",
  };
  return (
    <>
      <CartUI products={products} user={user} removeProduct={removeProduct} />
    </>
  );
};

export default Cart;
