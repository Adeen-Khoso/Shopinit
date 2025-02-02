import React from "react";

interface SearchBoxProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ isSearchOpen, setIsSearchOpen }) => {
  return (
    <>
      {/* Overlay (Click to Close) */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={() => setIsSearchOpen(false)}
          role="button"
          aria-label="Close search box"
        ></div>
      )}

      {/* Search Box */}
      <div
        className={`fixed top-0 right-0  w-[90%] md:w-[30%] h-full bg-secondary_bg shadow-lg py-9 px-10 transform transition-transform duration-700 z-[1000] ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center">

          <h4 className=" text-sm uppercase font-bold">
            Search Shopinit
          </h4>

          <button
            className="text-sm underline uppercase font-bold"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search box"
          >
            Close
          </button>

        </div>

        {/* Search Input & Button */}
        <div className="mt-10">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-5 border-b text-lg focus:outline-none mb-3 bg-secondary_bg "
          />
          <button className="mt-3 w-full p-3 bg-primary text-white hover:bg-hov_primary ">
            Search
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-7">
          <h4 className="text-sm font-semibold uppercase mb-5">Popular Searches</h4>
          <ul className="text-gray-600">
            <li className="cursor-pointer hover:underline text-sm mb-2">Nike Sneakers</li>
            <li className="cursor-pointer hover:underline text-sm mb-2">iPhone 15</li>
            <li className="cursor-pointer hover:underline text-sm mb-2">Gaming Laptops</li>
            <li className="cursor-pointer hover:underline text-sm mb-2">Wireless Earbuds</li>
            <li className="cursor-pointer hover:underline text-sm mb-2">Samsung s25 Ultra</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
