import React from "react";
import { useParams } from "react-router";
import { ProductHeader1 } from "../utility/components/ProductHeader1";
const ProductDetail = () => {
  const { id } = useParams();

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
      <ProductHeader1 id={id} products={products} />
    </>
  );
};

export default ProductDetail;
