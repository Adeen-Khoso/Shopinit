// import React, { useState } from "react";
// import { CiSearch } from "react-icons/ci";

// const SearchBox = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       {/* Search Icon Button */}
//       <button onClick={() => setIsOpen(true)} className="p-2">
//         <CiSearch className="text-primary size-7" />
//       </button>

//       {/* Search Box Overlay */}
//       <div
//         className={`fixed top-0 right-0 w-[40%] h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-xl"
//           onClick={() => setIsOpen(false)}
//         >
//           ✖
//         </button>

//         {/* Search Input & Button */}
//         <div className="mt-10">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full p-3 border rounded-md"
//           />
//           <button className="mt-3 w-full p-3 bg-primary text-white rounded-md">
//             Search
//           </button>
//         </div>

//         {/* Popular Searches */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Popular Searches</h3>
//           <ul className="text-gray-600">
//             <li className="cursor-pointer hover:underline">Nike Sneakers</li>
//             <li className="cursor-pointer hover:underline">iPhone 15</li>
//             <li className="cursor-pointer hover:underline">Gaming Laptops</li>
//             <li className="cursor-pointer hover:underline">Wireless Earbuds</li>
//           </ul>
//         </div>
//       </div>

//       {/* Overlay (Click to Close) */}
//       {isOpen && (
//         <div
//           className="fixed top-0 left-0 w-full h-full bg-black/50"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default SearchBox;


import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* Search Icon Button */}
      <button onClick={() => setIsOpen(true)} className="p-2">
        <CiSearch className="text-primary size-7" />
      </button>

      {/* Search Box Overlay */}
      <div
        className={`fixed top-0 right-0 w-[40%] h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={() => setIsOpen(false)}
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
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50"
          onClick={() => setIsOpen(false)}
          role="button"
          aria-label="Close search box"
        ></div>
      )}
    </div>
  );
};

export default SearchBox;
