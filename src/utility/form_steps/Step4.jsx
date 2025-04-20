import { Button, Input, Label, Textarea } from "@relume_io/relume-ui";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const Step4 = ({ prevStep, nextStep, formData, setFormData, addProduct }) => {
  return (
    <>
      <section id="relume" className="px-[5%]">
        <div className="relative flex flex-col justify-center overflow-auto pt-3 pb-6 md:py-4  ">
          <div className="bg-secondary_bg mx-auto w-full max-w-sm border border-border-primary px-6 py-8 sm:px-8 md:p-12">
            <div className="mb-6 text-center md:mb-8">
              <h1 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                Review
              </h1>
              <p className="md:text-md"> Review your Product info</p>
            </div>

            <form className="grid gap-6">
              <div className="grid">
                <Label htmlFor="name" className="mb-2">
                  Name
                </Label>
                <Input
                  type="text"
                  className="rounded-none appearance-none cursor-auto"
                  id="text"
                  value={formData.title}
                  readOnly
                  required
                />
              </div>

              <div className="grid">
                <Label htmlFor="name" className="mb-2">
                  Description
                </Label>
                <Textarea
                  type="text"
                  rows={4}
                  className="rounded-none appearance-none cursor-auto "
                  id="text"
                  value={formData.description}
                  readOnly
                  required
                />
              </div>

              <div className="grid">
                <Label htmlFor="name" className="mb-2">
                  Category
                </Label>
                <Input
                  type="text"
                  className="rounded-none appearance-none cursor-auto "
                  id="text"
                  value={formData.category}
                  readOnly
                  required
                />
              </div>

              <div className="grid">
                <Label htmlFor="name" className="mb-2">
                  Condition
                </Label>
                <Input
                  type="text"
                  className="rounded-none appearance-none cursor-auto "
                  id="text"
                  value={formData.condition}
                  readOnly
                  required
                />
              </div>
              <div className="grid">
                <Label htmlFor="name" className="mb-2">
                  Price
                </Label>
                <Input
                  type="text"
                  className="rounded-none appearance-none cursor-auto "
                  id="text"
                  value={formData.price}
                  readOnly
                  required
                />
              </div>

              <div className="flex flex-row flex-wrap items-center justify-center gap-4 ">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative size-24 aspect-square border rounded-none "
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`uploaded-${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center gap-24 ">
                <Button
                  onClick={() => prevStep()}
                  className="w-full bg-dark_grey hover:bg-neutral-light"
                >
                  Prev
                </Button>
                <Button
                  onClick={(e) => addProduct(e)}
                  className=" w-full bg-primary hover:bg-hov_primary"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Step4;
