import React from "react";
import { Product4 } from "../utility/components/Product4";
import { FaHeart } from "react-icons/fa6";
import NoData from "../utility/NoData";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../utility/Loader";
import { getBookmarkedIds } from "../utility/bookmarkService";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const Bookmarks = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [inCartIds, setInCartIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // const productsData = [];
  const getCartIds = async (uid) => {
    const snap = await getDocs(collection(db, "users", uid, "cart"));
    return snap.docs.map((d) => d.id);
  };

  useEffect(() => {
    const fetch = async () => {
      if (!user?.uid) return;
      const ids = await getBookmarkedIds(user.uid);

      const snap = await getDocs(collection(db, "products"));
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      setProducts(all.filter((p) => ids.includes(p.id)));
      const cartIds = await getCartIds(user.uid);
      setInCartIds(cartIds);

      setLoading(false);
    };
    fetch();
  }, [user]);

  // 4) addToCart handler
  const addToCart = async (productId) => {
    setLoading(true);
    if (!user?.uid) return alert("Please log in first");
    const ref = doc(db, "users", user.uid, "cart", productId);
    await setDoc(ref, { quantity: 1, addedAt: serverTimestamp() });
    setInCartIds((prev) => [...prev, productId]);
    setLoading(false);
  };

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
          addToCart={addToCart}
          inCartIds={inCartIds}
        />
      )}
    </>
  );
};

export default Bookmarks;
