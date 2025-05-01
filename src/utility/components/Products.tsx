import type { ButtonProps } from "@relume_io/relume-ui";
import { Button, cn } from "@relume_io/relume-ui";
import { useState } from "react";
import { BiFilter, BiHeart, BiSolidHeart, BiTrash } from "react-icons/bi";
import { PiCarProfileBold } from "react-icons/pi";
import { Link } from "react-router";

const user = {
  id: "1234",
  name: "John Doe",
};

type ImageProps = [string];

type ProductCardProps = {
  id: string;
  image: ImageProps;
  title: string;
  price: string;
  condition: string;
  button: ButtonProps;
  uid: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  button: ButtonProps;
  products: ProductCardProps[];
  profilePage?: boolean;
};

export type Product8Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Product8 = (props: Product8Props) => {
  const { tagline, heading, description, button, products, profilePage } = {
    ...Product8Defaults,
    ...props,
  };

  const userProducts = products.filter((p) => p.uid === user.id);

  const [showDropdown, setShowDropdown] = useState(false);
  console.log(profilePage);
  const categories = [
    "All products",
    "Electronics",
    "Fashion",
    "Household",
    "Vehicles",
    "Phones",
    "Others",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All products"); //this is going to be sent to parent comp: and will be sent to backend later for filtering

  return (
    <section id="relume" className="px-[5%] py-8 ">
      <div className="container">
        <div className="mb-8 grid grid-cols-1 items-end gap-8 md:mb-12 md:grid-cols-[1fr_max-content]  lg:gap-20">
          <div className="max-w-lg">
            {!profilePage ? (
              <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            ) : (
              ""
            )}
            <h1 className="mb-3 text-5xl font-bold md:mb-4 md:text-7xl lg:text-8xl">
              {profilePage && profilePage == true
                ? "Your Products"
                : selectedCategory === "All products"
                ? "All Categories"
                : selectedCategory}
            </h1>
            <p className="md:text-md">{description}</p>
          </div>
          {profilePage ? (
            ""
          ) : (
            <div className="relative inline-block text-left">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex  items-center gap-2 border px-4 py-2 bg-white hover:bg-opacity-60 focus:outline-none min-w-[150px] text-center"
              >
                <BiFilter className=" size-6 text-primary" />
                {selectedCategory}
              </button>

              {showDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white border shadow-sm">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowDropdown(false);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-grey ${
                        category === selectedCategory
                          ? "bg-grey font-semibold"
                          : ""
                      }`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 justify-items-start gap-x-6 gap-y-12 md:grid-cols-6 md:gap-x-8 md:gap-y-16 ">
          {profilePage
            ? userProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))
            : products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  condition,
  button,
  uid,
}) => {
  const removeProduct = () => {
    console.log("remove product");
    // will remove product from backend later on
  };
  const [bookmark, setBookmark] = useState(false);
  return (
    <div className="flex flex-col gap-2 ">
      <Link to={id} className=" block aspect-[5/6] ">
        <img
          src={image[0]}
          alt={title || "Product image"}
          className="size-full object-cover"
        />
      </Link>

      <Link to={id} className="flex justify-between md:text-md">
        <div className="mr-4">
          <h4 className="text-sm font-semibold">{title}</h4>
          <div className=" capitalize text-xs -mt-[2px]">{condition}</div>
        </div>
      </Link>

      <div className="flex justify-between items-center ">
        <div className="text-sm font-semibold md:text-sm">{price}</div>
        {uid === user.id ? (
          <button onClick={() => removeProduct()}>
            <BiTrash className="text-primary mr-[2px]" />
          </button>
        ) : (
          <button onClick={() => setBookmark((prev) => !prev)}>
            {bookmark ? (
              <BiSolidHeart className="text-primary" />
            ) : (
              <BiHeart className="text-primary" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// bluff data
// const productData = {
//   url: "#",
//   image: {
//     src: "https://d22po4pjz3o32e.cloudfront.net/placeholder",
//     alt: "Relume placeholder image",
//   },
//   title: "Product name",
//   price: "$55",
//   variant: "Variant",
//   button: { variant: "secondary", size: "sm", title: "Add to cart" },
// };

export const Product8Defaults: Props = {
  tagline: "",
  heading: "Products",
  description: "Go through our curated selection of top-quality products.",
  button: {
    variant: "secondary",
    size: "primary",
    title: "",
  },
  products: [],
  profilePage: false,
};
