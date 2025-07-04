import React from "react";
import { Product4 } from "../utility/components/Product4";
import { FaHeart } from "react-icons/fa6";
import NoData from "../utility/NoData";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getBookmarkedIds } from "../utility/bookmarkService";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../utility/Loader";

const Bookmarks = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // const productsData = [];

  useEffect(() => {
    const fetch = async () => {
      if (!user?.uid) return;
      const ids = await getBookmarkedIds(user.uid);

      // fetch all products once (or optimize to query only those IDs)
      const snap = await getDocs(collection(db, "products"));
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // filter to only bookmarked
      setProducts(all.filter((p) => ids.includes(p.id)));
      setLoading(false);
    };
    fetch();
  }, [user]);

  console.log("Bookmarked products:", products[0]);

  // This should be replaced with actual data fetching logic

  // const productData = {
  //   url: "#",
  //   image: {
  //     src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
  //     alt: "Relume placeholder image",
  //   },
  //   title: "Product name",
  //   price: "$55",
  //   variant: "Variant",
  //   button: { variant: "secondary", size: "sm", title: "Add to cart" },
  // };

  // const productsData = [productData, productData, productData, productData];

  if (loading) return <Loader />;
  return (
    <>
      {products.length === 0 ? (
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
          products={products}
          // later on, data will be provided using productsData to the children component
        />
      )}
    </>
  );
};

export default Bookmarks;
