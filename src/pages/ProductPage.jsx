import React, { useEffect, useState } from "react";
import { Product8 } from "../utility/components/Products";
import NoData from "../utility/NoData";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase"; // your firebase.ts export
import Loader from "../utility/Loader";
import { toast } from "react-hot-toast"; // or your toast library
import {
  addBookmark,
  removeBookmark,
  isProductBookmarked,
} from "../utility/bookmarkService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState([]);

  const { user } = useContext(AuthContext);
  const userId = user?.uid;

  const removeProduct = async (productId) => {
    setIsLoading(true);
    try {
      console.log("remove function was called with ID:", productId);
      await deleteDoc(doc(db, "products", productId));

      setProducts((prev) => prev.filter((p) => p.id !== productId));

      toast.success("Product removed successfully!", {
        icon: "🗑️",
        style: {
          borderRadius: "0px",
          background: "#FFF5F5",
          color: "#2F3C7E",
          border: "1px solid #2F3C7E",
        },
      });
    } catch (err) {
      console.error("Failed to remove product:", err);
      toast.error("Could not remove product. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
        console.log("Fetched products:", items);
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
          removeProduct={removeProduct}
          addBookmark={addBookmark}
          removeBookmark={removeBookmark}
          isProductBookmarked={isProductBookmarked}
          userId={userId}
        />
      )}
    </>
  );
};

export default ProductPage;
