import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import clsx from "clsx";
import { FaInbox } from "react-icons/fa6";
import { Link } from "react-router";

// type ImageProps = {
//   src: string;
//   alt?: string;
// };

type ImageProps = {
  src: string;
  alt?: string;
};

type BreadcrumbProps = {
  url: string;
  title: string;
};

// type GalleryProps = {
//   images: ImageProps[];
// };
type GalleryProps = {
  images: string[] | ImageProps[];
};

type QuestionsProps = {
  title: string;
  answer: string;
};

type RatingProps = {
  review: number;
  starsNumber: number;
};

type SelectVariant = {
  value: string;
  label: string;
};

type ProductType = {
  id: string;
  title: string;
  price: string;
  description: string;
  condition: string;
  category: string;
  image: string[];
  uid: string;
};

type Props = {
  id?: string;
  products?: ProductType[];
  breadcrumbs: BreadcrumbProps[];
  heading: string;
  images: ImageProps[];
  description: string;
  price: string;
  rating: RatingProps;
  buttons: ButtonProps[];
  options: ButtonProps[];
  quantityInputPlaceholder: string;
  freeShipping: string;
  questions: QuestionsProps[];
  selectVariants: SelectVariant[];
};

export type ProductHeader1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const ProductHeader1 = (props: ProductHeader1Props) => {
  const {
    breadcrumbs,
    heading,
    images,
    price,
    description,
    freeShipping,
    questions,
  } = {
    ...ProductHeader1Defaults,
    ...props,
  };

  const { id, products } = props;
  const product = products?.find((product) => product.id === id);
  const userId = product?.uid;
  // we send this uid to baackend and get the user name from there.

  if (!product)
    return (
      <div className="px-[5%]  h-[40vh] flex flex-col justify-center items-center gap-5 text-center ">
        <FaInbox className=" text-primary size-12 " />
        <h1 className=" text-2xl md:text-3xl text-jett_black">
          Product Not Found
        </h1>
        <p className="-mt-4">
          Get back to shopping from
          <Link
            to={"/products"}
            className=" underline text-primary cursor-pointer ml-1"
          >
            here
          </Link>
        </p>
      </div>
    );
  return (
    <header id="relume" className="px-[5%] py-8">
      <div className="container">
        <Breadcrumb className="mb-6 flex flex-wrap items-center text-sm">
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 gap-y-8 md:gap-y-10 lg:grid-cols-[1.25fr_1fr] lg:gap-x-20">
          <Gallery images={product.image} />
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Product name and seller */}
            <div className="border-b border-neutral-lighter pb-2 ">
              <h1 className="mb-2 text-4xl font-bold leading-[1.2] md:text-5xl lg:text-6xl">
                {product.title}
              </h1>
              <p className="text-xs md:text-sm -mt-1 text-neutral">
                {product.uid}
                {/* for now only showing user id, later we'll bring in user name from backend using uid */}
              </p>
            </div>

            {/* Price */}
            <p className="mt-2 text-2xl text-primary font-bold md:text-2xl ">
              <span className="text-sm mr-1">Rs.</span>
              {product.price}
            </p>

            {/* Description */}
            <p className="">{product.description}</p>

            {/* Category */}
            <div className="flex flex-col gap-1 mt-1">
              <p>Category</p>
              <div>
                <Button className=" px-4 py-2 text-sm bg-primary  ">
                  {product.category}
                </Button>
              </div>
            </div>
            {/* condition */}
            <div className="flex flex-col gap-1 mt-1">
              <p>Condition</p>
              <div>
                <Button className=" px-4 py-2 text-sm bg-white text-brand-black ">
                  {product.condition}
                </Button>
              </div>
            </div>

            <Button className=" bg-primary mt-2 md:mt-3 hover:bg-hov_primary">
              Add to cart
            </Button>

            <p className="text-center text-xs">{freeShipping}</p>

            <Accordion type="multiple">
              {questions.map((question, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                    {question.title}
                  </AccordionTrigger>
                  <AccordionContent className="md:pb-6">
                    {question.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </header>
  );
};

const Gallery = ({ images }: GalleryProps) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // ✅ Normalize images here
  const normalizedImages: ImageProps[] = Array.isArray(images)
    ? typeof images[0] === "string"
      ? (images as string[]).map((url) => ({
          src: url,
          alt: "Product image",
        }))
      : (images as ImageProps[])
    : [];

  useEffect(() => {
    if (!mainApi || !thumbApi) return;

    mainApi.on("select", () => {
      const index = mainApi.selectedScrollSnap();
      setCurrent(index);
      thumbApi.scrollTo(index);
    });
  }, [mainApi, thumbApi]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[5rem_1fr] md:gap-x-4">
      <div className="relative hidden h-full md:block">
        <div className="absolute bottom-0 top-0 max-h-full overflow-y-auto">
          <Carousel
            setApi={setThumbApi}
            orientation="vertical"
            opts={{
              align: "start",
              containScroll: "keepSnaps",
              dragFree: true,
            }}
            className="m-0"
          >
            <CarouselContent className="m-0 gap-y-4">
              {normalizedImages.map((slide, index) => (
                <CarouselItem key={index} className="p-0">
                  <button
                    onClick={() => mainApi?.scrollTo(index)}
                    className={clsx("block", current === index && "opacity-60")}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt ?? "Product image"}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/300x400?text=No+Image"; // Add this file to your `public` folder
                      }}
                      className="aspect-[5/6] size-full object-cover"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="overflow-hidden">
        <Carousel
          setApi={setMainApi}
          opts={{
            loop: true,
            align: "start",
          }}
          className="m-0"
        >
          <CarouselContent className="m-0">
            {normalizedImages.map((slide, index) => (
              <CarouselItem key={index} className="basis-full pl-0">
                <button>
                  <img
                    src={slide.src}
                    alt={slide.alt ?? "Product image"}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/800x1000?text=No+Image"; // Add this file to your `public` folder
                    }}
                    className="aspect-[5/6] size-full object-cover"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export const ProductHeader1Defaults: Props = {
  breadcrumbs: [
    { url: "/products", title: "Shop all" },
    { url: "/products", title: "Category" },
    { url: ``, title: "Product name" },
  ],
  heading: "Product name",
  price: "$55",
  rating: {
    review: 10,
    starsNumber: 3.5,
  },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  selectVariants: [
    { value: "first-choice", label: "Option One" },
    { value: "second-choice", label: "Option Two" },
    { value: "third-choice", label: "Option Three" },
  ],
  images: [
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 1",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 2",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 3",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 4",
    },
  ],
  buttons: [
    { title: "Add to cart" },
    { title: "Buy now", variant: "secondary" },
  ],
  options: [
    {
      title: "Option one",
      url: "#",
    },
    { title: "Option two", url: "#", variant: "secondary" },
    { title: "Option three", url: "#", variant: "secondary", disabled: true },
  ],
  quantityInputPlaceholder: "1",
  freeShipping: "Free shipping over Rs/1999",
  questions: [
    {
      title: "Process",
      answer:
        "We’re just the bridge. You’re responsible for reviewing the product and seller. We don’t verify seller credibility or take responsibility for scams — order wisely. We’re here to help if you need us, though.",
    },
    {
      title: "Shipping",
      answer:
        "Sellers are expected to ship within a few working days. If not shipped in time, your order will be canceled and you’ll be notified. We don’t handle delivery or logistics. We wont take responsibility for any issues with delivery.",
    },
    {
      title: "Returns",
      answer:
        "All sales are final. Returns are not possible as most sellers stay anonymous post-delivery. Make sure to double-check everything before you place your order.",
    },
  ],
};
