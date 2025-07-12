import React, { useState, useEffect, useContext } from "react";
import CartUI from "../utility/components/CartUI";
import iphone14 from "../assets/iphone14.jpg";
import iphone14pro from "../assets/iphone14_second.jpg";
import { AuthContext } from "../context/AuthContext";
import Loader from "../utility/Loader";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCartIds = async (userId) => {
    const snap = await getDocs(collection(db, "users", userId, "cart"));
    return snap.docs.map((doc) => doc.id);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!user?.uid) return;

      const ids = await getCartIds(user.uid);

      const snap = await getDocs(collection(db, "products"));
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      const cartProducts = all.filter((p) => ids.includes(p.id));

      const enriched = await Promise.all(
        cartProducts.map(async (p) => {
          const profSnap = await getDoc(
            doc(db, "users", p.uid, "profile", "info")
          );
          return {
            ...p,
            sellerName: profSnap.exists() ? profSnap.data().name : "Unknown",
          };
        })
      );

      setProducts(enriched);
      setLoading(false);
    };

    fetchCartProducts();
  }, [user]);

  const removeProduct = async (productId) => {
    setLoading(true);
    if (!user?.uid) return;
    await deleteDoc(doc(db, "users", user.uid, "cart", productId));
    setProducts((prev) => prev.filter((item) => item.id !== productId));
    setLoading(false);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <CartUI products={products} removeProduct={removeProduct} />
    </>
  );
};

export default Cart;
