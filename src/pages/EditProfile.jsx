import React from "react";
import ProfileForm from "../utility/components/ProfileForm";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const onSave = (event, name, bio, pronouns, pfp) => {
    console.log("New Profile saved", { name, bio, pronouns, pfp });
    event.preventDefault();
    navigate("/profile");
    toast.success("Profile Updated Successfully !", {
      icon: "👌",
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

  return (
    <>
      <ProfileForm onSave={onSave} />
    </>
  );
};

export default EditProfile;
