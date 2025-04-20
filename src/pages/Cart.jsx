import React, { useState } from "react";
import CartUI from "../utility/components/CartUI";
import iphone14 from "../assets/iphone14.jpg";
import iphone14pro from "../assets/iphone14_second.jpg";

const Cart = () => {
  const removeProduct = () => {
    console.log("remove product from cart");
  };
  const products = [
    {
      title: "iPhone 14 Pro Max",
      price: "$999",
      description: "98% battery health, no damage, almost like new phone.",
      condition: "used",
      category: "phones",
      images: [iphone14, iphone14pro],
    },
    {
      title: "iPhone 14 Pro Max",
      price: "$999",
      description: "98% battery health, no damage, almost like new phone.",
      condition: "used",
      category: "phones",
      images: [iphone14, iphone14pro],
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
