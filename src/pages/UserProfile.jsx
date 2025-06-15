import React, { useState, useEffect } from "react";
import Gradient from "../utility/Gradient";
import UserDetails from "../utility/components/UserDetails";
import { Product8 } from "../utility/components/Products";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NoData from "../utility/NoData";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // your firebase.ts export
import Loader from "../utility/Loader";

const UserProfile = () => {
  // to be replaced with actual user data from AuthContext
  const { user } = useContext(AuthContext);
  console.log(user.uid);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const products = [
  //   {
  //     id: "1",
  //     title: "iPhone 14 Pro Max",
  //     price: "$999",
  //     description: "98% battery health, no damage, almost like new phone.",
  //     condition: "used",
  //     category: "phones",
  //     image: [
  //       "https://mobilesyrup.com/wp-content/uploads/2022/09/iphone-14-pro-header-1-scaled.jpg",
  //       "https://spy.com/wp-content/uploads/2023/02/IMG_2114-rotated.jpg?w=1024",
  //     ],
  //     uid: "1234",
  //   },
  //   {
  //     id: "2",
  //     title: "iPhone 14 Pro Max",
  //     price: "$999",
  //     description: "98% battery health, no damage, almost like new phone.",
  //     condition: "used",
  //     category: "phones",
  //     image: ["https://placehold.co/600x400", "../assets/iphone14_second.jpg"],
  //     uid: "2234",
  //   },
  // ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const userProducts = products.filter((p) => p.uid === user?.uid);
  console.log("User Products:", userProducts);

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
    profilePage: true,
    userId: user?.uid,
  };
  if (isLoading) {
    return <Loader />;
  }
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
