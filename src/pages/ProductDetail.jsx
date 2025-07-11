import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ProductHeader1 } from "../utility/components/ProductHeader1";
import {
  query,
  collection,
  orderBy,
  setDoc,
  getDocs,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../utility/Loader";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProductDetail = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(false);

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

  const [sellerName, setSellerName] = useState("Unknown");

  useEffect(() => {
    const fetchSellerName = async () => {
      if (!product?.uid) return;

      const profileRef = doc(db, "users", product.uid, "profile", "info");
      const snap = await getDoc(profileRef);

      if (snap.exists()) {
        const data = snap.data();
        setSellerName(data.name || "Unknown");
      }
    };

    fetchSellerName();
  }, [product?.uid]);

  useEffect(() => {
    if (!user?.uid || !product) return;
    const checkCart = async () => {
      const cartRef = doc(db, "users", user.uid, "cart", product.id);
      const snap = await getDoc(cartRef);
      setInCart(snap.exists());
    };
    checkCart();
  }, [user, product]);

  // for add to cart button
  const addToCart = async (productId) => {
    setIsLoading(true);
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const cartRef = doc(db, "users", user.uid, "cart", productId);
      await setDoc(cartRef, {
        quantity: 1,
        addedAt: serverTimestamp(),
      });
      setIsLoading(false);
      setInCart(true);
    } catch (err) {
      setIsLoading(false);
      console.error("Error adding to cart:", err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ProductHeader1
        id={id}
        products={products}
        sellerName={sellerName}
        addToCart={addToCart}
        inCart={inCart}
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
