import React from "react";
import Gradient from "../Gradient";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfileForm = ({ onSave }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Gradient />

      <div className="w-[100vw] max-h-[40vh] md:h-[20vh] flex flex-col gap-7 md:flex-row justify-center md:justify-between md:items-center p-[5%]">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
          <div className=" size-16 md:size-18 overflow-hidden rounded-full bg-primary hover:bg-hov_primary">
            {user.img ? (
              <img
                className="w-full h-full object-cover"
                src={user.img}
                alt="User Profile"
              />
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col">
            <h4 className=" text-md md:text-xl">
              {user.img ? "Update your Profile pic" : "Upload your Profile pic"}
            </h4>
            <p className=" text-sm text-background-tertiary">
              Try a unique pic to standout!
            </p>
          </div>
        </div>

        <div>done</div>
      </div>
    </>
  );
};

export default ProfileForm;
