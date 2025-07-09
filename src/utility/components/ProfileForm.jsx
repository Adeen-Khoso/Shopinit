import React, { useRef, useState, useContext, useEffect } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utility/cropImage";
import Gradient from "../Gradient";
import { AuthContext } from "../../context/AuthContext";
import { FiEdit, FiTrash, FiUploadCloud, FiUpload } from "react-icons/fi";
import { Button, cn, Input, Label } from "@relume_io/relume-ui";
import toast from "react-hot-toast";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfileForm = ({ onSave }) => {
  const { user } = useContext(AuthContext);

  // text fields
  // const [name, setName] = useState(user.name || "");
  // const [bio, setBio] = useState(user.bio || "");
  // const [pronouns, setPronouns] = useState(user.pronouns || "");

  // image & upload state

  // cropping modal state
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const fileInputRef = useRef(null);

  // 1️⃣ User picks a file → open crop modal
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageToCrop(url);
    setShowCropModal(true);
    e.target.value = ""; // reset so same file can be picked again
  };

  // 2️⃣ After cropping → apply and preview
  const applyCrop = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
      setSelectedImage(croppedBlob);
      setUploaded(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to crop image");
    } finally {
      setShowCropModal(false);
    }
  };

  // trigger file picker
  const handleButtonClick = () => fileInputRef.current.click();

  // remove image
  const removeImg = () => {
    setSelectedImage(null);
    setUploaded(false);
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(
      e,
      profileData.name,
      profileData.bio,
      profileData.pronouns,
      selectedImage
    );
  };

  // fetch profile data from Firestore to set initial values
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    pronouns: "",
    pfp: "",
  });

  const [selectedImage, setSelectedImage] = useState(profileData.pfp || null);
  const [uploaded, setUploaded] = useState(!!profileData.pfp);

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

  return (
    <>
      <Gradient />

      {/* 📸 Upload / Preview */}
      <div className="flex justify-between gap-4 items-center p-[5%]">
        <div
          onClick={handleButtonClick}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary hover:bg-hov_primary flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {selectedImage ? (
            <>
              <img
                // src={selectedImage}
                src={URL.createObjectURL(selectedImage)}
                alt="User Profile"
                className={cn(
                  "w-full h-full object-cover",
                  uploaded ? "brightness-100" : "brightness-50"
                )}
              />
              {!uploaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiEdit className="text-white text-2xl hover:text-primary_bg" />
                </div>
              )}
            </>
          ) : (
            <FiUploadCloud className="text-primary_bg text-3xl" />
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleButtonClick}
            className="flex items-center gap-1 bg-secondary_bg text-text-primary text-xs md:text-sm hover:bg-white"
          >
            {uploaded ? "Change" : "Upload"}{" "}
            <FiUpload className="w-3 h-3 text-primary" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {selectedImage && (
            <Button
              onClick={removeImg}
              className="flex items-center gap-1 bg-secondary_bg text-text-primary text-xs md:text-sm hover:bg-white"
            >
              Remove <FiTrash className="w-3 h-3 text-primary" />
            </Button>
          )}
        </div>
      </div>

      {/* ✍️ Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 md:gap-14 px-[5%] mt-3"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={profileData.name || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              required
              className="rounded-none"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="bio" className="mb-2">
              Bio
            </Label>
            <Input
              id="bio"
              type="text"
              placeholder="Your Bio"
              value={profileData.bio || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              required
              className="rounded-none"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="pronouns" className="mb-2">
              Pronouns
            </Label>
            <Input
              id="pronouns"
              type="text"
              placeholder="He/Him"
              value={profileData.pronouns || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, pronouns: e.target.value })
              }
              required
              className="rounded-none"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-primary hover:bg-hov_primary text-white md:w-32"
        >
          Done
        </Button>
      </form>

      {/* 🔲 Cropping Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-jett_black bg-opacity-55 flex items-center justify-center  z-50">
          <div className="bg-white w-[80vw] max-w-md p-7 border flex flex-col gap-4">
            <h4 className="text-lg -mt-1 ">Crop Profile Pic</h4>
            <div className="relative w-full h-64 bg-jett_black">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
              />
            </div>
            <div className="flex items-center self-center mt-1 gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full bg-primary rounded-lg appearance-none cursor-pointer accent-primary_bg "
                />
              </label>
            </div>
            <div className=" flex justify-between gap-2">
              <Button
                className="bg-secondary_bg w-full text-text-primary hover:bg-white"
                onClick={() => setShowCropModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-white w-full hover:bg-hov_primary"
                onClick={applyCrop}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileForm;
