import React, { useContext, useState, useEffect } from "react";
import { Button, cn } from "@relume_io/relume-ui";
const buttonStyles = "bg-primary text-white hover:bg-hov_primary";
import { auth } from "../../App";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FiUser } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { db } from "../../firebase"; // adjust path
import { doc, getDoc } from "firebase/firestore";

const UserDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    pronouns: "",
    pfp: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;

      const profileRef = doc(db, "users", user.uid, "profile", "info");
      const docSnap = await getDoc(profileRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        console.log("No profile data found");
      }
    };

    fetchProfile();
  }, [user]);

  // const name = user.name || "Unknown";
  // const bio = user.bio || "No bio yet.";
  // const pronouns = user.pronouns || "Unknown/Unknown";
  const img = user.img || null;

  return (
    <section>
      <div className="w-[100vw] max-h-[40vh]  md:h-[20vh] flex flex-col gap-7 md:flex-row justify-center md:justify-between md:items-center p-[5%] ">
        {/* user data */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
          <div className=" size-16 md:size-14 overflow-hidden rounded-full bg-primary hover:bg-hov_primary flex items-center justify-center relative">
            {img ? (
              <img
                className="w-full h-full object-cover"
                src={img}
                alt="User Profile"
              />
            ) : (
              <FiUser className=" text-primary_bg size-5" />
            )}
          </div>
          <div className="flex flex-col">
            <h4 className=" text-md md:text-xl flex items-center gap-3">
              {profileData.name || "Unknown"}
              <span className="text-xs text-jett_black text-opacity-50 md:-mb-[2px]">
                {profileData.pronouns || "Unknown/Unknown"}
              </span>
            </h4>
            <p className=" text-sm text-background-tertiary">
              {profileData.bio || "No bio yet."}
            </p>
          </div>
        </div>

        {/* button div */}
        <div className="flex flex-row items-center gap-4">
          <Button
            onClick={() => navigate("/bookmarks")}
            className={cn(buttonStyles, " h-[49.333px] relative group")}
          >
            <FaHeart className="size-3" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-6 opacity-0 group-hover:opacity-100 transition bg-jett_black bg-opacity-30 text-white text-[8px] px-1 py-1  whitespace-nowrap hidden md:block">
              Bookmarks
            </span>
          </Button>
          <Button
            onClick={() => navigate("/editProfile")}
            className={cn(buttonStyles)}
          >
            Edit
          </Button>
          <Button
            onClick={() => signOut(auth)}
            className={cn(
              buttonStyles,
              " hover:bg-primary_bg bg-secondary_bg text-jett_black"
            )}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="mx-auto mt-4 w-11/12 border-b border-dark_grey"></div>
    </section>
  );
};

export default UserDetails;
