import React from "react";
import { Button, cn } from "@relume_io/relume-ui";
const buttonStyles = "bg-primary text-white hover:bg-hov_primary";
import blonde from "../../assets/blonde.jpg";

const UserDetails = ({
  img = blonde,
  name = "Alexa Rawles",
  bio = "Hey👋, This is Alexa here",
}) => {
  return (
    <>
      <div className="w-[100vw] h-[16vh] md:h-[20vh] bg-secondary_bg border-b rounded-none border-opacity-5 flex justify-between items-center px-[5%] py-[7%] ">
        {/* user data */}
        <div className="flex gap-4 items-center">
          <div className="size-14 overflow-hidden rounded-full">
            <img
              className="w-full h-full object-cover"
              src={img}
              alt="User Profile"
            />
          </div>
          <div className="flex flex-col">
            <h4 className=" text-xl">{name}</h4>
            <p className=" text-sm text-background-tertiary">{bio}</p>
          </div>
        </div>

        {/* buttons */}
        <div className="flex flex-row items-center gap-4">
          <Button className={cn(buttonStyles)}>button</Button>
          <Button
            className={cn(buttonStyles, "bg-secondary_bg text-jett_black")}
          >
            button
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
