import React from "react";
import { Button } from "@relume_io/relume-ui";
const buttonStyles = "bg-primary text-white hover:bg-hov_primary";

const UserDetails = () => {
  return (
    <>
      <div>
        {/* user pfp */}
        <div>
          <img src="" alt="" />
        </div>

        {/* user data */}
        <div>
          <h3>Alexa Rawles</h3>
          <p>alexarawles@gmail.com</p>
        </div>

        {/* buttons */}
        <Button className={buttonStyles}>button</Button>
        <Button className={buttonStyles}>button</Button>
      </div>
    </>
  );
};

export default UserDetails;
