import React from "react";
import { FaBeerMugEmpty, FaInbox } from "react-icons/fa6";
import { Link } from "react-router";

const NoData = ({
  title = "Nothing here yet",
  subTitle = "Get back to shopping from ",
  link = "/products",
}) => {
  return (
    <div className="px-[5%]  h-[40vh] flex flex-col justify-center items-center gap-5 text-center ">
      <FaInbox className=" text-primary size-12 " />
      <h1 className=" text-2xl md:text-3xl  text-jett_black">{title}</h1>
      <p className="-mt-4">
        {subTitle}
        <Link to={link} className=" underline text-primary cursor-pointer">
          here
        </Link>
      </p>
    </div>
  );
};

export default NoData;
// -mt-24 md:-mt-32
