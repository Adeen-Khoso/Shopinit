import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductHeader1 } from "../utility/components/ProductHeader1";
import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../utility/Loader";
const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ProductHeader1
        id={id}
        products={products}
        sellerName={sellerName}
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
