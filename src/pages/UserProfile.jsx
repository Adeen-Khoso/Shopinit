import React, { useState } from "react";
import Gradient from "../utility/Gradient";
import UserDetails from "../utility/components/UserDetails";
import { Product8 } from "../utility/components/Products";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NoData from "../utility/NoData";

const UserProfile = () => {
  const user = {
    id: "1234",
  };
  // const [profilepage, setIsProfilePage] = useState(true);
  // const profilePage = true;
  const userProducts = [
    {
      id: "1",
      title: "iPhone 14 Pro Max",
      price: "$999",
      description: "98% battery health, no damage, almost like new phone.",
      condition: "used",
      category: "phones",
      image: ["https://placehold.co/600x400", "../assets/iphone14_second.jpg"],
      uid: "1234",
    },
    {
      id: "1",
      title: "iPhone 14 Pro Max",
      price: "$999",
      description: "98% battery health, no damage, almost like new phone.",
      condition: "used",
      category: "phones",
      image: ["https://placehold.co/600x400", "../assets/iphone14_second.jpg"],
      uid: "2234",
    },
  ];

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
    profilePage: true,
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
