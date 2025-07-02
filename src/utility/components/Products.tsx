import type { ButtonProps } from "@relume_io/relume-ui";
import { Button, cn } from "@relume_io/relume-ui";
import { useEffect, useState } from "react";
import { BiFilter, BiHeart, BiSolidHeart, BiTrash } from "react-icons/bi";
import { FaInbox } from "react-icons/fa6";
import { PiCarProfileBold } from "react-icons/pi";
import { Link } from "react-router";
import { useContext } from "react";

type ImageProps = [string];

export type RemoveProductFn = (productId: string) => void;
// export type AddBookmarkFn = (userId: string, product: ProductCardProps) => void;
export type RemoveBookmarkFn = (userId: string, productId: string) => void;
export type AddBookmarkFn = (userId: string, productId: string) => void;
export type IsProductBookmarkedFn = (
  userId: string,
  productId: string
) => Promise<boolean>;

type ProductCardProps = {
  id: string;
  images: ImageProps;
  title: string;
  price: string;
  condition: string;
  category: string;
  button: ButtonProps;
  uid: string;
  profilePage?: boolean;
  userId?: string;
  removeProduct?: RemoveProductFn;
  addBookmark?: AddBookmarkFn;
  removeBookmark?: RemoveBookmarkFn;
  isProductBookmarked?: IsProductBookmarkedFn;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  button: ButtonProps;
  products: ProductCardProps[];
  profilePage?: boolean;
  selectedCategory?: string;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  removeProduct?: RemoveProductFn; // accept remove function
  addBookmark?: AddBookmarkFn; // accept add bookmark function
  removeBookmark?: RemoveBookmarkFn; // accept remove bookmark function
  isProductBookmarked?: IsProductBookmarkedFn; // accept isProductBookmarked function
};

export type Product8Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Product8 = (props: Product8Props) => {
  const {
    tagline = Product8Defaults.tagline,
    heading = Product8Defaults.heading,
    description = Product8Defaults.description,
    button = Product8Defaults.button,
    products = Product8Defaults.products,
    profilePage = Product8Defaults.profilePage,
    selectedCategory = Product8Defaults.selectedCategory,
    setSelectedCategory = Product8Defaults.setSelectedCategory,
    userId = Product8Defaults.userId,
    removeProduct,
    addBookmark,
    removeBookmark,
    isProductBookmarked,
  } = props;

  // const {
  //   tagline,
  //   heading,
  //   description,
  //   button,
  //   products,
  //   profilePage,
  //   selectedCategory,
  //   setSelectedCategory,
  //   userId,
  //   removeProduct,
  // } = {
  //   ...Product8Defaults,
  //   ...props,
  // };

  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    "All Products",
    "Electronics",
    "Fashion",
    "Household",
    "Vehicles",
    "Phones",
    "Others",
  ];

  const filteredProducts =
    selectedCategory && selectedCategory !== "All Products"
      ? products.filter((product) => product.category == selectedCategory)
      : products;

  const userProducts = products.filter((p) => p.uid === userId);

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
                : selectedCategory === "All Products"
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
                        setSelectedCategory?.(category);
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
        {profilePage ? (
          <div className="grid grid-cols-2 justify-items-start gap-x-6 gap-y-12 md:grid-cols-6 md:gap-x-8 md:gap-y-16 ">
            {userProducts.map((product, index) => {
              console.log("in the products parent ", removeProduct);
              console.log("Mapped Product:", product);

              return (
                <ProductCard
                  key={index}
                  userId={userId}
                  removeProduct={removeProduct}
                  {...product}
                />
              );
            })}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 justify-items-start gap-x-6 gap-y-12 md:grid-cols-6 md:gap-x-8 md:gap-y-16 ">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                profilePage={profilePage}
                {...product}
                userId={userId}
                addBookmark={addBookmark}
                removeBookmark={removeBookmark}
                isProductBookmarked={isProductBookmarked}
              />
            ))}
          </div>
        ) : (
          <div className="px-[5%]  h-[40vh] flex flex-col justify-center items-center gap-5 text-center ">
            <FaInbox className=" text-primary size-12 " />
            <h1 className=" text-2xl md:text-3xl text-jett_black">
              No products in this Category
            </h1>
            <p className="-mt-4">
              Start adding products from
              <Link
                to={"/sell"}
                className=" underline text-primary cursor-pointer ml-1"
              >
                here
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  images,
  title,
  price,
  condition,
  category,
  button,
  uid,
  profilePage,
  userId,
  removeProduct,
  addBookmark,
  removeBookmark,
  isProductBookmarked,
}) => {
  const [bookmark, setBookmark] = useState(false);

  // On mount, check bookmark state
  useEffect(() => {
    if (!userId) return;
    isProductBookmarked?.(userId, id).then(setBookmark);
  }, [userId, id]);

  const handleBookmarkClick = async () => {
    if (!userId) return;
    if (bookmark) {
      removeBookmark?.(userId, id);
    } else {
      addBookmark?.(userId, id);
    }
    setBookmark((b) => !b);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <Link
        to={`/products/${id}`}
        className=" block aspect-[5/6] w-full overflow-hidden "
      >
        <img
          src={images[0]}
          alt={title || "Product image"}
          className="size-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";
          }}
        />
      </Link>

      <Link to={id} className="flex justify-between md:text-md">
        <div className="mr-4">
          <h4 className="text-sm font-semibold">
            {title.length > 15 ? title.slice(0, 15) + "..." : title}
          </h4>
          <div className=" capitalize text-xs -mt-[2px]">{condition}</div>
        </div>
      </Link>

      <div className="flex justify-between items-center ">
        <div className="text-sm font-semibold md:text-sm ">
          <span className="text-[10px]">Rs.</span> {price}
        </div>
        {uid === userId ? (
          <button onClick={() => removeProduct?.(id)}>
            <BiTrash className="text-primary mr-[2px]" />
          </button>
        ) : (
          <button onClick={() => handleBookmarkClick()}>
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
  userId: "",
  removeProduct: undefined, // allow this to be undefined
};
