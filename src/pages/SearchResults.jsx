import React, { useEffect, useState } from "react";
import { Product8 } from "../utility/components/Products";
import { useLocation } from "react-router";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results);
      setTerm(location.state.term || "");
    }
  }, [location.state]);

  const isSearch = true;

  return (
    <div>
      <Product8 products={results} isSearch={isSearch} term={term} />
    </div>
  );
};

export default SearchResults;
