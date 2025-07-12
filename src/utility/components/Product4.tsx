import type { ButtonProps } from "@relume_io/relume-ui";
import { Button } from "@relume_io/relume-ui";
import { Link } from "react-router";

type ImageProps = [string];

type ProductCardProps = {
  id: string;
  images: ImageProps;
  title: string;
  price: string;
  condition: string;
  button: ButtonProps;
  addToCart?: (id: string) => void;
  inCartIds?: string[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  button: ButtonProps;
  products: ProductCardProps[];
  addToCart?: (id: string) => void;
  inCartIds?: string[];
};

export type Product4Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Product4 = (props: Product4Props) => {
  const {
    tagline,
    heading,
    description,
    button,
    products,
    addToCart,
    inCartIds = [],
  } = {
    ...Product4Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:pb-24 lg:pb-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center flex flex-col items-center">
            <h4 className="font-semibold">{tagline}</h4>
            <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
              {heading}
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-items-start gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8 md:gap-y-16 lg:grid-cols-5">
          {products.map((product, index) => {
            return (
              <ProductCard
                key={index}
                {...product}
                addToCart={addToCart}
                inCartIds={inCartIds}
              />
            );
          })}
        </div>
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
  button,
  addToCart,
  inCartIds = [],
}) => {
  const already = inCartIds.includes(id);
  return (
    // <div>
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
      <Link to={id} className="flex flex-col text-center md:text-md">
        <div className="mb-2">
          <h4 className="text-sm md:text-md font-semibold">
            {title.length > 15 ? title.slice(0, 15) + "..." : title}
          </h4>
          <div className="text-xs md:text-sm">{condition}</div>
        </div>

        <div className="text-md font-semibold md:text-lg ">
          <span className="text-[12px]">Rs.</span> {price}
        </div>
      </Link>
      <Button
        {...button}
        onClick={() => !already && addToCart?.(id)}
        // disabled={already}
        className={` ${
          already
            ? "mt-2 md:mt-3 w-full bg-secondary_bg border text-text-primary  border-jett_black    cursor-default"
            : "mt-2 w-full md:mt-3 bg-primary hover:bg-hov_primary"
        }`}
      >
        {already ? "Added" : "Add to Cart"}
        {/* //   className="mt-2 w-full md:mt-3 bg-primary" */}
        {/* // > */}
        {/* //   Add to cart */}
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

export const Product4Defaults: Props = {
  tagline: "Tagline",
  heading: "saadassssssssssssssssssssssss",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: {
    variant: "secondary",
    size: "primary",
    title: "",
  },
  products: [
    // productData,
    // productData,
    // productData,
    // productData,
    // productData,
    // productData,
    // productData,
    // productData,
  ],
};
