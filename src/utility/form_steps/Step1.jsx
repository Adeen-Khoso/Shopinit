import { Button, Input, Label, Textarea } from "@relume_io/relume-ui";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Step1 = ({ nextStep, formData, setFormData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <>
      <section id="relume" className="px-[5%]">
        <div className="relative flex flex-col justify-center overflow-auto pt-3 pb-6 md:py-4  ">
          <div className="bg-secondary_bg mx-auto w-full max-w-sm border border-border-primary px-6 py-8 sm:px-8 md:p-12">
            <div className="mb-6 text-center md:mb-8">
              <h1 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                Details
              </h1>
              <p className="md:text-md"> Add info about your Product</p>
            </div>

            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div className="grid">
                <Label htmlFor="name" className="mb-2">
                  Name*
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. iPhone 13 Pro Max"
                  className="rounded-none"
                  id="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid">
                <div className="flex justify-between">
                  <Label htmlFor="text" className="mb-2">
                    Description*
                  </Label>
                </div>
                <Textarea
                  type="text"
                  className="rounded-none"
                  id="text"
                  placeholder="e.g. Minor scratches"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid relative">
                <div className="flex justify-between">
                  <Label htmlFor="text" className="mb-2">
                    Condition*
                  </Label>
                </div>

                <select
                  required
                  className=" w-full border min-h-11 border-black bg-white text-sm px-3 py-2 appearance-none cursor-pointer focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                >
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>

                <div className="absolute inset-y-0 top-9 right-3 flex items-center pointer-events-none">
                  <FaChevronDown className=" text-xs" />
                </div>
              </div>

              <div className="flex justify-between items-center gap-24 ">
                <Button
                  type="submit"
                  className=" w-full bg-primary hover:bg-hov_primary"
                >
                  Next
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Step1;
