// import React, { useRef } from "react";
// import Gradient from "../Gradient";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import {
//   FiEdit3,
//   FiEdit2,
//   FiTrash,
//   FiEdit,
//   FiUploadCloud,
//   FiUpload,
// } from "react-icons/fi";
// import blonde from "../../assets/blonde.jpg";
// import { Button, cn, Input, Label } from "@relume_io/relume-ui";
// import toast from "react-hot-toast";

// const ProfileForm = ({ onSave }) => {
//   const { user } = useContext(AuthContext);
//   // const user = {
//   //   img: blonde,
//   //   name: "John Doe",
//   //   bio: "I am a software developer",
//   //   pronouns: "He/Him",
//   // };

//   const [name, setName] = useState(user.name || "");
//   const [bio, setBio] = useState(user.bio || "");
//   const [pronouns, setPronouns] = useState(user.pronouns || "");
//   const [selectedImage, setSelectedImage] = useState(user.img || null);

//   const dataObj = {
//     name,
//     bio,
//     pronouns,
//     img: selectedImage,
//   };
//   console.log(dataObj);

//   const updateData = (event) => {
//     onSave(event, name, bio, pronouns, selectedImage);
//   };

//   const fileInputRef = useRef(null);
//   const [uploaded, setUploaded] = useState(false);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUploaded(true);
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImage(imageUrl);
//       event.target.value = "";
//     }
//   };

//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const removeImg = () => {
//     setSelectedImage(null);
//     setUploaded(false);
//   };

//   return (
//     <>
//       <Gradient />

//       <div className="flex justify-between flex-row md:flex-row gap-3 md:gap-4 items-center p-[5%]">
//         <div
//           onClick={handleButtonClick}
//           className=" cursor-pointer size-16 md:size-18 overflow-hidden rounded-full bg-primary hover:bg-hov_primary flex items-center justify-center relative"
//         >
//           {selectedImage ? (
//             <>
//               <img
//                 className={cn(
//                   "w-full h-full object-cover",
//                   uploaded ? "brightness-100" : "brightness-50"
//                 )}
//                 src={selectedImage}
//                 alt="User Profile"
//               />
//               {!uploaded ? (
//                 <div className="absolute inset-0 flex items-center justify-center transition ">
//                   <FiEdit className="text-white size-6 hover:text-primary_bg " />
//                 </div>
//               ) : null}
//             </>
//           ) : (
//             <FiUploadCloud className=" text-primary_bg size-5" />
//           )}
//         </div>

//         <div className="flex gap-[6px] md:gap-3">
//           <Button
//             onClick={handleButtonClick}
//             className=" text-text-primary bg-secondary_bg text-xs md:text-sm hover:bg-white "
//           >
//             {uploaded ? "Change" : "Upload"}
//             <input
//               ref={fileInputRef}
//               type="file"
//               className=" hidden"
//               onChange={handleImageChange}
//             />
//             <FiUpload className="w-2 md:w-3 text-primary" />
//           </Button>

//           {selectedImage ? (
//             <Button
//               onClick={removeImg}
//               className=" text-text-primary bg-secondary_bg text-xs md:text-sm hover:bg-white "
//             >
//               Remove <FiTrash className="w-2 md:w-3 text-primary" />
//             </Button>
//           ) : null}
//         </div>
//       </div>

//       <form
//         onSubmit={updateData}
//         className="flex flex-col mt-3 md:justify-between md:mt-0 gap-8 md:gap-14 px-[5%]"
//       >
//         <div className="flex flex-col justify-center md:justify-between md:-mt-4 md:flex-row gap-3 ">
//           <div className="grid grid-cols-1 md:w-[30%]">
//             <Label htmlFor="name" className="mb-2">
//               Name
//             </Label>
//             <Input
//               type="text"
//               id="name"
//               className="rounded-none "
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="grid grid-cols-1 md:w-[30%]">
//             <Label htmlFor="name" className="mb-2">
//               Bio
//             </Label>
//             <Input
//               type="text"
//               id="name"
//               className="rounded-none"
//               placeholder="Your Bio"
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               required
//             />
//           </div>
//           <div className="grid grid-cols-1 md:w-[30%]">
//             <Label htmlFor="name" className="mb-2">
//               Pronouns
//             </Label>
//             <Input
//               type="text"
//               id="name"
//               className="rounded-none"
//               placeholder="He/Him"
//               value={pronouns}
//               onChange={(e) => setPronouns(e.target.value)}
//               required
//             />
//           </div>
//         </div>
//         <Button
//           className=" bg-primary hover:bg-hov_primary text-white md:w-32 "
//           type="submit"
//         >
//           Done
//         </Button>
//       </form>
//     </>
//   );
// };

// export default ProfileForm;

// // src/components/ProfileForm.jsx
// import React, { useRef, useState, useContext } from "react";
// import Cropper from "react-easy-crop";
// import { getCroppedImg } from "../../utility/cropImage"; // adjust path if needed
// import Gradient from "../Gradient";
// import { AuthContext } from "../../context/AuthContext";
// import { FiEdit, FiTrash, FiUploadCloud, FiUpload } from "react-icons/fi";
// import { Button, cn, Input, Label } from "@relume_io/relume-ui";
// import toast from "react-hot-toast";

// const ProfileForm = ({ onSave }) => {
//   const { user } = useContext(AuthContext);

//   // text fields
//   const [name, setName] = useState(user.name || "");
//   const [bio, setBio] = useState(user.bio || "");
//   const [pronouns, setPronouns] = useState(user.pronouns || "");

//   // image & upload state
//   const [selectedImage, setSelectedImage] = useState(user.img || null);
//   const [uploaded, setUploaded] = useState(!!user.img);

//   // cropping modal state
//   const [showCropModal, setShowCropModal] = useState(false);
//   const [imageToCrop, setImageToCrop] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const fileInputRef = useRef(null);

//   // 1️⃣ When user picks a file, open crop modal
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImageToCrop(url);
//       setShowCropModal(true);
//     }
//     e.target.value = ""; // reset so same file can be picked again
//   };

//   // 2️⃣ Apply the crop, get a new blob URL
//   const applyCrop = async () => {
//     try {
//       const croppedUrl = await getCroppedImg(imageToCrop, croppedAreaPixels);
//       setSelectedImage(croppedUrl);
//       setUploaded(true);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to crop image");
//     } finally {
//       setShowCropModal(false);
//     }
//   };

//   // trigger hidden file input
//   const handleButtonClick = () => fileInputRef.current.click();

//   // remove image
//   const removeImg = () => {
//     setSelectedImage(null);
//     setUploaded(false);
//   };

//   // form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(e, name, bio, pronouns, selectedImage);
//   };

//   return (
//     <>
//       <Gradient />

//       {/* 📸 Upload / Preview */}
//       <div className="flex justify-between gap-4 items-center p-[5%]">
//         <div
//           onClick={handleButtonClick}
//           className="relative w-16 h-16 md:w-18 md:h-18 rounded-full bg-primary hover:bg-hov_primary flex items-center justify-center cursor-pointer overflow-hidden"
//         >
//           {selectedImage ? (
//             <>
//               <img
//                 src={selectedImage}
//                 alt="User Profile"
//                 className={cn(
//                   "w-full h-full object-cover",
//                   uploaded ? "brightness-100" : "brightness-50"
//                 )}
//               />
//               {!uploaded && (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <FiEdit className="text-white text-2xl hover:text-primary_bg" />
//                 </div>
//               )}
//             </>
//           ) : (
//             <FiUploadCloud className="text-primary_bg text-3xl" />
//           )}
//         </div>

//         <div className="flex gap-2">
//           <Button
//             onClick={handleButtonClick}
//             className="flex items-center gap-1 text-text-primary bg-secondary_bg text-xs md:text-sm hover:bg-white"
//           >
//             {uploaded ? "Change" : "Upload"}{" "}
//             <FiUpload className="w-3 h-3 text-primary" />
//           </Button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageChange}
//           />

//           {selectedImage && (
//             <Button
//               onClick={removeImg}
//               className="flex items-center gap-1 text-text-primary bg-secondary_bg text-xs md:text-sm hover:bg-white"
//             >
//               Remove <FiTrash className="w-3 h-3 text-primary" />
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* ✍️ Profile Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-8 md:gap-14 px-[5%] mt-3"
//       >
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1">
//             <Label htmlFor="name" className="mb-2">
//               Name
//             </Label>
//             <Input
//               id="name"
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="rounded-none"
//             />
//           </div>
//           <div className="flex-1">
//             <Label htmlFor="bio" className="mb-2">
//               Bio
//             </Label>
//             <Input
//               id="bio"
//               type="text"
//               placeholder="Your Bio"
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               required
//               className="rounded-none"
//             />
//           </div>
//           <div className="flex-1">
//             <Label htmlFor="pronouns" className="mb-2">
//               Pronouns
//             </Label>
//             <Input
//               id="pronouns"
//               type="text"
//               placeholder="He/Him"
//               value={pronouns}
//               onChange={(e) => setPronouns(e.target.value)}
//               required
//               className="rounded-none"
//             />
//           </div>
//         </div>

//         <Button
//           type="submit"
//           className="bg-primary hover:bg-hov_primary text-white md:w-32"
//         >
//           Done
//         </Button>
//       </form>

//       {/* 🔲 Cropping Modal */}
//       {showCropModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm">
//             {/* Cropping area */}
//             <div className="relative w-full h-64 bg-gray-100">
//               <Cropper
//                 image={imageSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 onCropChange={onCropChange}
//                 onZoomChange={onZoomChange}
//                 onCropComplete={onCropComplete}
//               />
//             </div>

//             {/* Controls */}
//             <div className="mt-4 flex items-center gap-3">
//               <button
//                 onClick={onCancel}
//                 className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={onDone}
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//         // <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         //   <div className="bg-white p-4 rounded-xl w-[90vw] md:w-[400px] h-[400px] flex flex-col">
//         //     <Cropper
//         //       image={imageToCrop}
//         //       crop={crop}
//         //       zoom={zoom}
//         //       aspect={1}
//         //       onCropChange={setCrop}
//         //       onZoomChange={setZoom}
//         //       onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
//         //     />
//         //     <div className="mt-4 flex justify-end gap-2">
//         //       <Button onClick={() => setShowCropModal(false)}>Cancel</Button>
//         //       <Button onClick={applyCrop} className="bg-primary text-white">
//         //         Done
//         //       </Button>
//         //     </div>
//         //   </div>
//         // </div>
//       )}
//     </>
//   );
// };

// export default ProfileForm;

// src/components/ProfileForm.jsx
import React, { useRef, useState, useContext } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utility/cropImage";
import Gradient from "../Gradient";
import { AuthContext } from "../../context/AuthContext";
import { FiEdit, FiTrash, FiUploadCloud, FiUpload } from "react-icons/fi";
import { Button, cn, Input, Label } from "@relume_io/relume-ui";
import toast from "react-hot-toast";

const ProfileForm = ({ onSave }) => {
  const { user } = useContext(AuthContext);

  // text fields
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [pronouns, setPronouns] = useState(user.pronouns || "");

  // image & upload state
  const [selectedImage, setSelectedImage] = useState(user.img || null);
  const [uploaded, setUploaded] = useState(!!user.img);

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
      const croppedUrl = await getCroppedImg(imageToCrop, croppedAreaPixels);
      setSelectedImage(croppedUrl);
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
    onSave(e, name, bio, pronouns, selectedImage);
  };

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
                src={selectedImage}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
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
