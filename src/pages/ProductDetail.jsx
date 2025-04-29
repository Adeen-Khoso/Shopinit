import React from "react";
import { useParams } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();

  return <div>this is the product{id}</div>;
};

export default ProductDetail;
