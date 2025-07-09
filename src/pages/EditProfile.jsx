import React, { useState } from "react";
import ProfileForm from "../utility/components/ProfileForm";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { db } from "../firebase"; // adjust path if needed
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../supabaseClient"; // your Supabase client
import Loader from "../utility/Loader"; // your Loader component

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const onSave = async (event, name, bio, pronouns, pfp) => {
    setLoading(true);
    event.preventDefault();
    console.log(pfp);

    let pfpUrl = null;

    if (pfp instanceof Blob) {
      const filePath = `profiles/${user.uid}/pfp_${Date.now()}.jpeg`;

      const { data, error } = await supabase.storage
        .from("products") // or “profile-pictures” bucket
        .upload(filePath, pfp, {
          contentType: "image/jpeg",
        });

      if (error) {
        console.error("Supabase upload error:", error);
        toast.error("Failed to upload profile picture");
        return;
      }

      // 2️⃣ Get its public URL
      const { data: urlData, error: urlError } = supabase.storage
        .from("products")
        .getPublicUrl(data.path);

      if (urlError) {
        console.error("Error getting public URL:", urlError);
        toast.error("Failed to get profile‑picture URL");
        return;
      }

      pfpUrl = urlData.publicUrl;
      console.log("Supabase URL:", pfpUrl);
    }

    try {
      const profileRef = doc(db, "users", user.uid, "profile", "info");

      await setDoc(
        profileRef,
        {
          name,
          bio,
          pronouns,
          ...(pfpUrl && { pfp: pfpUrl }),
          updatedAt: new Date(),
        },
        { merge: true }
      );

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
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <ProfileForm onSave={onSave} />
    </>
  );
};

export default EditProfile;
