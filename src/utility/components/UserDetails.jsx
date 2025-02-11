import React from "react";
import { Button, cn } from "@relume_io/relume-ui";
const buttonStyles = "bg-primary text-white hover:bg-hov_primary";
import blonde from "../../assets/blonde.jpg";

const UserDetails = ({
  img = blonde,
  name = "Alexa Rawles",
  bio = "Hey👋, This is your fav blonde Alexa herself !  ",
}) => {
  return (
    <section>
      <div className="w-[100vw] max-h-[40vh]  md:h-[20vh] flex flex-col gap-7 md:flex-row justify-center md:justify-between md:items-center p-[5%] ">
        {/* user data */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
          <div className=" size-16 md:size-14 overflow-hidden rounded-full">
            <img
              className="w-full h-full object-cover"
              src={img}
              alt="User Profile"
            />
          </div>
          <div className="flex flex-col">
            <h4 className=" text-md md:text-xl">{name}</h4>
            <p className=" text-sm text-background-tertiary">{bio}</p>
          </div>
        </div>

        {/* buttons */}
        <div className="flex flex-row items-center gap-4">
          <Button className={cn(buttonStyles)}>Edit</Button>
          <Button
            className={cn(buttonStyles, "bg-secondary_bg text-jett_black")}
          >
            Bookmarks
          </Button>
        </div>
      </div>
      <div className="mx-auto mt-4 w-11/12 border-b border-dark_grey"></div>
    </section>
  );
};

export default UserDetails;
