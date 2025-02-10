import React from "react";
import { Button } from "@relume_io/relume-ui";
const buttonStyles = "bg-primary text-white hover:bg-hov_primary";
import blonde from "../../assets/blonde.jpg";

const UserDetails = ({
  img = blonde,
  name = "Alexa Rawles",
  bio = "Hey👋, This is Alexa here",
}) => {
  return (
    <>
      <div>
        {/* user pfp */}
        <div>
          <img src={img} alt="" />
        </div>

        {/* user data */}
        <div>
          <h3>{name}</h3>
          <p>{bio}</p>
        </div>

        {/* buttons */}
        <Button className={buttonStyles}>button</Button>
        <Button className={buttonStyles}>button</Button>
      </div>
    </>
  );
};

export default UserDetails;
