import React, { useEffect, useState } from "react";
import { Product8 } from "../utility/components/Products";
import NoData from "../utility/NoData";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // your firebase.ts export
import Loader from "../utility/Loader";

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const [products, setProducts] = useState([]);
  // // this products array will be fetched from the server later.
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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {products.length === 0 ? (
        <NoData
          title="No Products here yet"
          subTitle="Start adding products from "
          link="/sell"
        />
      ) : (
        <Product8
          products={products}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </>
  );
};

export default ProductPage;
