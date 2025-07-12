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

      const snap = await getDocs(collection(db, "products"));
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      setProducts(all.filter((p) => ids.includes(p.id)));
      setLoading(false);
    };
    fetch();
  }, [user]);

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
        />
      )}
    </>
  );
};

export default Bookmarks;
