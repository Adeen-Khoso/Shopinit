
interface SearchBoxProps {
  isSearchOpen: Boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>; // Declare that the `first` prop should be a string
}
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBox: React.FC<SearchBoxProps> = ({isSearchOpen, setIsSearchOpen}) => {

  return (
    <div className="relative">
      
      <div
        className={`fixed top-0 right-0 w-[40%] h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={() => setIsSearchOpen(false)}
          aria-label="Close search box"
        >
          ✖
        </button>

        {/* Search Input & Button */}
        <div className="mt-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 border rounded-md"
          />
          <button className="mt-3 w-full p-3 bg-primary text-white rounded-md">
            Search
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Popular Searches</h3>
          <ul className="text-gray-600">
            <li className="cursor-pointer hover:underline">Nike Sneakers</li>
            <li className="cursor-pointer hover:underline">iPhone 15</li>
            <li className="cursor-pointer hover:underline">Gaming Laptops</li>
            <li className="cursor-pointer hover:underline">Wireless Earbuds</li>
          </ul>
        </div>
      </div>

      {/* Overlay (Click to Close) */}
      {isSearchOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50"
          onClick={() => setIsSearchOpen(false)}
          role="button"
          aria-label="Close search box"
        ></div>
      )}
    </div>
  );
};

export default SearchBox;
