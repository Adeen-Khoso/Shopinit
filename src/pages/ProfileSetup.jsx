import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileForm from "../utility/components/ProfileForm";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const ProfileSetup = () => {
  const { user } = useContext(AuthContext);

  const onSave = () => {
    console.log("New Profile saved");
  };

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (user && !hasShownToast.current) {
      toast("Setup your profile !", {
        icon: "✎",
        style: {
          borderRadius: "0px",
          background: "#FFF5F5",
          color: "#333",
        },
      });
      hasShownToast.current = true;
    }
  }, [user]);

  return (
    <>
      <ProfileForm onSave={onSave} />
    </>
  );
};

export default ProfileSetup;
