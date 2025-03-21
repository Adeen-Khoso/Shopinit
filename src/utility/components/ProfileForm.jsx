import React, { useRef } from "react";
import Gradient from "../Gradient";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  FiEdit3,
  FiEdit2,
  FiEdit,
  FiUploadCloud,
  FiUpload,
} from "react-icons/fi";
import blonde from "../../assets/blonde.jpg";
import { Button, cn } from "@relume_io/relume-ui";

const ProfileForm = ({ onSave }) => {
  // const { user } = useContext(AuthContext);
  const user = {
    img: blonde,
  };

  const [selectedImage, setSelectedImage] = useState(user.img || null);

  const fileInputRef = useRef(null);
  const [uploaded, setUploaded] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploaded(true);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Gradient />

      <div className="w-[100vw] max-h-[40vh] md:h-[20vh] flex flex-col gap-7 md:flex-row justify-center md:justify-between md:items-center p-[5%]">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
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
          <div className="flex flex-col">
            <Button
              onClick={handleButtonClick}
              className=" text-text-primary bg-secondary_bg text-sm hover:bg-white  "
            >
              Upload
              <input
                ref={fileInputRef}
                type="file"
                className=" hidden"
                onChange={handleImageChange}
              />
              <FiUpload className=" size-3" />
            </Button>
          </div>
        </div>

        <div>done</div>
      </div>

      <form className="grid grid-cols-1 gap-6" onSubmit={onSave}></form>
    </>
  );
};

export default ProfileForm;
