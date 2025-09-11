import React from "react";
import SearchBox from "../utility/components/SearchBox";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";

const SearchBar = ({ isSearchOpen, setIsSearchOpen }) => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("Updated search results:", results);
  }, [results]);

  useEffect(() => {
    if (!isSearchOpen) return;
    (async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        setAllProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching products for search:", err);
      }
    })();
  }, [isSearchOpen]);

  const doSearch = (term) => {
    const q = term.trim().toLowerCase().replace(/\s+/g, "");
    console.log("this is term:", term);
    if (!q) {
      setResults([]);
      return;
    }

    // setResults(
    //   allProducts.filter((p) => {
    //     const title = p.title.toLowerCase().replace(/\s+/g, "");
    //     const desc = p.description.toLowerCase().replace(/\s+/g, "");
    //     const category = p.category.toLowerCase().replace(/\s+/g, "");

    //     return title.includes(q) || desc.includes(q) || category.includes(q);
    //   })
    // );
    // navigate("/searchResults");

    const filtered = allProducts.filter((p) => {
      const title = p.title.toLowerCase().replace(/\s+/g, "");
      const desc = p.description.toLowerCase().replace(/\s+/g, "");
      const category = p.category.toLowerCase().replace(/\s+/g, "");
      return title.includes(q) || desc.includes(q) || category.includes(q);
    });

    setResults(filtered);
    navigate("/searchResults", {
      state: { results: filtered, term: term },
    });
    setIsSearchOpen(false);
  };

  return (
    <div>
      <SearchBox
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        doSearch={doSearch}
        results={results}
      />
    </div>
  );
};

export default SearchBar;
