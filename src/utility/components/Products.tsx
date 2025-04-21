import type { ButtonProps } from "@relume_io/relume-ui";
import { Button, cn } from "@relume_io/relume-ui";
import { useState } from "react";
import { BiFilter } from "react-icons/bi";
import { FaFilter } from "react-icons/fa6";
import { RxChevronDown } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type ProductCardProps = {
  url: string;
  image: ImageProps;
  title: string;
  price: string;
  variant: string;
  button: ButtonProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  button: ButtonProps;
  products: ProductCardProps[];
};

export type Product8Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Product8 = (props: Product8Props) => {
  const { tagline, heading, description, button, products } = {
    ...Product8Defaults,
    ...props,
  };
  const [showDropdown, setShowDropdown] = useState(false);

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
    <section id="relume" className="px-[5%] py-12 md:py-18">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 md:mb-18 md:grid-cols-[1fr_max-content] lg:mb-20 lg:gap-20">
          <div className="max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="mb-3 text-5xl font-bold md:mb-4 md:text-7xl lg:text-8xl">
              {selectedCategory === "All products"
                ? "All Categories"
                : selectedCategory}
            </h1>
            <p className="md:text-md">{description}</p>
          </div>

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
        </div>
        <div className="grid grid-cols-2 justify-items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4 lg:gap-x-12">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  url,
  image,
  title,
  price,
  variant,
  button,
}) => {
  return (
    <div>
      <a href={url} className="mb-3 block aspect-[5/6] md:mb-4">
        <img
          src={image.src}
          alt={image.alt}
          className="size-full object-cover"
        />
      </a>
      <a href={url} className="flex justify-between md:text-md">
        <div className="mr-4">
          <h4 className="font-semibold">{title}</h4>
          <div className="text-sm">{variant}</div>
        </div>
        <div className="text-md font-semibold md:text-lg">{price}</div>
      </a>
      <Button {...button} className="mt-3 w-full md:mt-4">
        {button.title}
      </Button>
    </div>
  );
};

const productData = {
  url: "#",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image",
  },
  title: "Product name",
  price: "$55",
  variant: "Variant",
  button: { variant: "secondary", size: "sm", title: "Add to cart" },
};

export const Product8Defaults: Props = {
  tagline: "",
  heading: "Products",
  description: "Go through our curated selection of top-quality products.",
  button: {
    variant: "secondary",
    size: "primary",
    title: "",
  },
  products: [
    productData,
    productData,
    productData,
    productData,
    productData,
    productData,
  ],
};
