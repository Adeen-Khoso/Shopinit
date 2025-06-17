import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductHeader1 } from "../utility/components/ProductHeader1";
import { query, collection, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../utility/Loader";
const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // this products array will be fetched from the server later.
  // const products = [
  //   {
  //     id: "1",
  //     title: "iPhone 14 Pro Max",
  //     price: "120000",
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
  //     price: "120000",
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

  const product = products?.find((product) => product.id === id);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ProductHeader1
        id={id}
        products={products}
        breadcrumbs={[
          { url: "/products", title: "Shop all" },
          { url: "/products", title: "Category" },
          { url: `/products/${id}`, title: `${product?.title}` },
        ]}
      />
    </>
  );
};

export default ProductDetail;
