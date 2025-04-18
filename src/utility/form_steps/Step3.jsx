import { Button } from "@relume_io/relume-ui";
import { useState, useRef } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";

const Step3 = ({ prevStep, nextStep, formData, setFormData }) => {
  const [images, setImages] = useState(formData.images || []);
  const [valid, setValid] = useState(true);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    addImages(files);
  };

  const handleBrowse = (e) => {
    const files = Array.from(e.target.files);
    addImages(files);
  };

  const addImages = (files) => {
    const filtered = files.filter((file) => file.type.startsWith("image/"));
    const newImages = [...images, ...filtered].slice(0, 4);
    setImages(newImages);
    setFormData({ ...formData, images: newImages });
    console.log(images);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 1) {
      setValid(false);
    } else {
      nextStep();
    }
  };

  return (
    <section id="relume" className="px-[5%]">
      <div className="relative flex flex-col justify-center overflow-auto pt-3 pb-6 md:py-4">
        <div className=" bg-secondary_bg mx-auto w-full max-w-sm border border-border-primary px-6 py-8 sm:px-8 md:p-12">
          <div className="mb-6 text-center md:mb-8">
            <h1 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
              Images
            </h1>
            <p className="md:text-md">Add up to 4 images of your product</p>
          </div>
          {images.length < 4 && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border mb-6 md:mb-8 border-dashed border-neutral size-72 bg-white flex items-center mx-auto justify-center text-center cursor-pointer  rounded-none"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <FiUploadCloud className="text-primary size-6" />
                <div>
                  <p className="text-neutral font-medium text-sm">
                    Drag & drop files here
                  </p>
                  <p className="text-primary underline text-sm">
                    or click to browse
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleBrowse}
                hidden
              />
            </div>
          )}
          <div className="flex flex-row flex-wrap items-center justify-center gap-4  mb-6 md:mb-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative size-24 aspect-square border rounded-none "
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`uploaded-${index}`}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute  -top-1 -right-1 bg-neutral  text-white rounded-full "
                >
                  <FiX className=" text-white  size-3" />
                </button>
              </div>
            ))}
            {!valid && images.length < 1 && (
              <span className="text-system-error-red text-sm mt-1">
                Please add at least one Image !
              </span>
            )}
          </div>

          <div className="flex justify-between items-center gap-24 ">
            <Button
              onClick={() => prevStep()}
              className="w-full bg-dark_grey hover:bg-neutral-light"
            >
              Prev
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              className=" w-full bg-primary hover:bg-hov_primary"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step3;
