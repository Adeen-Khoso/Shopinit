import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileForm from "../utility/components/ProfileForm";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const ProfileSetup = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSave = (event, name, bio, pronouns, pfp) => {
    console.log("New Profile saved", { name, bio, pronouns, pfp });
    event.preventDefault();
    navigate("/profile");
    toast.success("Profile Created Successfully !", {
      icon: "👏",
      style: {
        borderRadius: "0px",
        background: "#FFF5F5",
        color: "#2F3C7E",
        border: "1px solid #2F3C7E",
      },
      iconTheme: {
        primary: "#2F3C7E",
        secondary: "#FFFAEE",
      },
    });
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
