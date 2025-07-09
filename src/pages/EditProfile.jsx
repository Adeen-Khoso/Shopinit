import React from "react";
import ProfileForm from "../utility/components/ProfileForm";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { db } from "../firebase"; // adjust path if needed
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const onSave = async (event, name, bio, pronouns, pfp) => {
    event.preventDefault();

    try {
      const profileRef = doc(db, "users", user.uid, "profile", "info");

      await setDoc(profileRef, {
        name,
        bio,
        pronouns,
        // no pfp for now
        updatedAt: new Date(),
      });

      console.log("✅ Profile info saved to Firestore");

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

      navigate("/profile");
    } catch (err) {
      console.error("🔥 Error saving profile info:", err);
      toast.error("Failed to save profile info.");
    }
  };

  // const onSave = (event, name, bio, pronouns, pfp) => {
  //   console.log("New Profile saved", { name, bio, pronouns, pfp });
  //   event.preventDefault();
  //   navigate("/profile");
  //   toast.success("Profile Updated Successfully !", {
  //     icon: "👌",
  //     style: {
  //       borderRadius: "0px",
  //       background: "#FFF5F5",
  //       color: "#2F3C7E",
  //       border: "1px solid #2F3C7E",
  //     },
  //     iconTheme: {
  //       primary: "#2F3C7E",
  //       secondary: "#FFFAEE",
  //     },
  //   });
  // };

  return (
    <>
      <ProfileForm onSave={onSave} />
    </>
  );
};

export default EditProfile;
