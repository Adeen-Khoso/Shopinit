import React, { useRef } from "react";
import Gradient from "../Gradient";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  FiEdit3,
  FiEdit2,
  FiTrash,
  FiEdit,
  FiUploadCloud,
  FiUpload,
} from "react-icons/fi";
import blonde from "../../assets/blonde.jpg";
import { Button, cn, Input, Label } from "@relume_io/relume-ui";
import toast from "react-hot-toast";

const ProfileForm = ({ onSave }) => {
  const { user } = useContext(AuthContext);
  // const user = {
  //   img: blonde,
  // };

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [pronouns, setPronouns] = useState(user.pronouns || "");
  const [selectedImage, setSelectedImage] = useState(user.img || null);

  const dataObj = {
    name,
    bio,
    pronouns,
    img: selectedImage,
  };
  console.log(dataObj);

  const updateData = (event) => {
    onSave(event, name, bio, pronouns, selectedImage);
  };

  const fileInputRef = useRef(null);
  const [uploaded, setUploaded] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploaded(true);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      event.target.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const removeImg = () => {
    setSelectedImage(null);
    setUploaded(false);
  };

  return (
    <>
      <Gradient />

      <div className="flex justify-between flex-row md:flex-row gap-3 md:gap-4 items-center p-[5%]">
        <div
          onClick={handleButtonClick}
          className=" cursor-pointer size-16 md:size-18 overflow-hidden rounded-full bg-primary hover:bg-hov_primary flex items-center justify-center relative"
        >
          {selectedImage ? (
            <>
              <img
                className={cn(
                  "w-full h-full object-cover",
                  uploaded ? "brightness-100" : "brightness-50"
                )}
                src={selectedImage}
                alt="User Profile"
              />
              {!uploaded ? (
                <div className="absolute inset-0 flex items-center justify-center transition ">
                  <FiEdit className="text-white size-6 hover:text-primary_bg " />
                </div>
              ) : null}
            </>
          ) : (
            <FiUploadCloud className=" text-primary_bg size-5" />
          )}
        </div>

        <div className="flex gap-[6px] md:gap-3">
          <Button
            onClick={handleButtonClick}
            className=" text-text-primary bg-secondary_bg text-xs md:text-sm hover:bg-white "
          >
            {uploaded ? "Change" : "Upload"}
            <input
              ref={fileInputRef}
              type="file"
              className=" hidden"
              onChange={handleImageChange}
            />
            <FiUpload className="w-2 md:w-3 text-primary" />
          </Button>

          {selectedImage ? (
            <Button
              onClick={removeImg}
              className=" text-text-primary bg-secondary_bg text-xs md:text-sm hover:bg-white "
            >
              Remove <FiTrash className="w-2 md:w-3 text-primary" />
            </Button>
          ) : null}
        </div>
      </div>

      <form
        onSubmit={updateData}
        className="flex flex-col mt-3 md:justify-between md:mt-0 gap-8 md:gap-14 px-[5%]"
      >
        <div className="flex flex-col justify-center md:justify-between md:-mt-4 md:flex-row gap-3 ">
          <div className="grid grid-cols-1 md:w-[30%]">
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              className="rounded-none "
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:w-[30%]">
            <Label htmlFor="name" className="mb-2">
              Bio
            </Label>
            <Input
              type="text"
              id="name"
              className="rounded-none"
              placeholder="Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:w-[30%]">
            <Label htmlFor="name" className="mb-2">
              Pronouns
            </Label>
            <Input
              type="text"
              id="name"
              className="rounded-none"
              placeholder="He/Him"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              required
            />
          </div>
        </div>
        <Button
          className=" bg-primary hover:bg-hov_primary text-white md:w-32 "
          type="submit"
        >
          Done
        </Button>
      </form>
    </>
  );
};

export default ProfileForm;
