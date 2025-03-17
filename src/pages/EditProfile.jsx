import React from "react";
import ProfileForm from "../utility/components/ProfileForm";

const EditProfile = () => {
  const onSave = () => {
    console.log("Profile edited successfully");
  };
  return (
    <>
      <ProfileForm onSave={onSave} />
    </>
  );
};

export default EditProfile;
