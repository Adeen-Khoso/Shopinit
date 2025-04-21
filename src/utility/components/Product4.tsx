import type { ButtonProps } from "@relume_io/relume-ui";
import { Button } from "@relume_io/relume-ui";

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

export type Product4Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Product4 = (props: Product4Props) => {
  const { tagline, heading, description, button, products } = {
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
        <div className="grid grid-cols-2 justify-items-start gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        <div className="mt-10 flex justify-center md:mt-14 lg:mt-16">
          <Button {...button}>{button.title}</Button>
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
      <a href={url} className="flex flex-col text-center md:text-md">
        <div className="mb-2">
          <h3 className="font-semibold">{title}</h3>
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

export const Product4Defaults: Props = {
  tagline: "Tagline",
  heading: "saadassssssssssssssssssssssss",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: {
    variant: "secondary",
    size: "primary",
    title: "View all",
  },
  products: [
    productData,
    productData,
    productData,
    productData,
    productData,
    productData,
    productData,
    productData,
  ],
};
