import { Button, Input } from "@relume_io/relume-ui";
import React, { useState } from "react";
import { FiArrowLeft, FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router";

const Cart = () => {
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const openPromo = () => {
    setIsPromoOpen((prev) => !prev);
  };
  return (
    <>
      <section className="  py-12 md:py-16  px-[5%]">
        <div className="container flex flex-col md:flex-row justify-between gap-16">
          {/* Main Cart div */}
          <div className="flex flex-col w-full  ">
            {/* heading */}
            <div className="flex flex-row items-center justify-between pb-3 border-b border-b-dark_grey">
              <h1 className="text-4xl md:text-5xl lg:text-6xl">Cart</h1>
              <p className="text-md md:text-lg flex items-center gap-2 ">
                <span className="text-primary text-xl md:text-2xl font-semibold">
                  3
                </span>
                Items
              </p>
            </div>

            {/* cart content */}
            <div className="flex flex-col">
              <div>product 1</div>
              <div>product 1</div>
              <div>product 1</div>
            </div>

            {/* back button */}
            <Link
              to={"/products"}
              className="cursor-pointer text-primary text-xs md:text-sm hover:underline hover:text-hov_primary flex  items-center gap-1"
            >
              <FiArrowLeft className="text-primary " />
              Continue Shopping
            </Link>
          </div>

          <div className=" w-full md:w-[40%] flex flex-col items-center gap-6">
            {/* Order summary */}
            <div className=" w-full px-4 py-5 bg-primary border">
              <div className="flex flex-col gap-4">
                <h4 className=" text-white text-sm md:text-md ">
                  Order Summary
                </h4>

                <div className="flex flex-col gap-[3px]">
                  <div className=" flex  justify-between text-white text-opacity-80 text-xs md:text-sm ">
                    <p>Items</p>
                    <p>3</p>
                  </div>
                  <div className=" flex  justify-between text-white text-opacity-80 text-xs md:text-sm ">
                    <p>Price</p>
                    <p>$499</p>
                  </div>
                  <div className=" flex  justify-between text-white text-opacity-80 text-xs md:text-sm border-b border-b-neutral-light pb-2">
                    <p>Estimated shipping</p>
                    <p>$20</p>
                  </div>
                  <div className=" flex  justify-between text-white text-opacity-80 text-xs md:text-sm ">
                    <p>
                      <span className="underline cursor-pointer mr-1">
                        Promo Code
                      </span>
                      discount
                    </p>
                    <p>0%</p>
                  </div>
                </div>

                <div className=" flex  justify-between text-grey text-xs md:text-sm ">
                  <p className="text-md">Total</p>
                  <p className=" font-semibold">$519</p>
                </div>

                <Button className="bg-white text-jett_black hover:bg-grey">
                  Checkout
                </Button>
              </div>
            </div>

            {/* Promo code */}
            <div className=" cursor-auto hover:bg-hov_primary w-full px-4 py-4 border flex flex-col  text-white bg-primary">
              <div className="flex items-center justify-between ">
                <p
                  onClick={() => openPromo()}
                  className=" cursor-pointer text-sm"
                >
                  Apply Promo Code
                </p>
                {isPromoOpen ? (
                  <FiPlusCircle
                    onClick={() => openPromo()}
                    className=" cursor-pointer text-white rotate-45"
                  />
                ) : (
                  <FiPlusCircle
                    onClick={() => openPromo()}
                    className=" cursor-pointer text-white"
                  />
                )}
              </div>
              {isPromoOpen && (
                <div className=" mt-3">
                  <Input
                    className="text-jett_black"
                    placeholder="Enter promo code"
                    type="text "
                  ></Input>
                </div>
              )}
            </div>

            {/* Need help div */}
            <div className="w-full flex flex-col  px-4 py-4 border bg-primary">
              <p className=" text-white text-sm font-semibold pb-2 ">
                Need Help?
              </p>
              <Link
                to={"/#footer"}
                className=" text-white  text-opacity-80 underline text-xs cursor-pointer "
              >
                Contact us
              </Link>
              <Link
                to={"https://www.linkedin.com/in/adeen-khoso/"}
                className=" text-white  text-opacity-80 underline text-xs cursor-pointer "
              >
                Our Developer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
