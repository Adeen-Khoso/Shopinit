import React from "react";
import ProfileForm from "../utility/components/ProfileForm";

const ProfileSetup = () => {
  const onSave = () => {
    console.log("New Profile saved");
  };
  return (
    <>
      <ProfileForm onSave={onSave} />
    </>
  );
};

export default ProfileSetup;
