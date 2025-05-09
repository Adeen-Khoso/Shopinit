import { Button, Input, Label, Textarea } from "@relume_io/relume-ui";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Step2 = ({ prevStep, nextStep, formData, setFormData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) {
      formData.category = "Others";
    }
    nextStep();
  };
  return (
    <>
      <section id="relume" className="px-[5%]">
        <div className="relative flex flex-col justify-center overflow-auto pt-3 pb-6 md:py-4  ">
          <div className="bg-secondary_bg mx-auto w-full max-w-sm border border-border-primary px-6 py-8 sm:px-8 md:p-12">
            <div className="mb-6 text-center md:mb-8">
              <h1 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                Pricing
              </h1>
              <p className="md:text-md"> Add a fair price for your Product</p>
            </div>

            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div className="grid">
                <Label htmlFor="name" className="mb-2">
                  Price PKR*
                </Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g. Rs.999"
                  className="rounded-none appearance-none"
                  id="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid relative">
                <div className="flex justify-between">
                  <Label htmlFor="text" className="mb-2">
                    Category*
                  </Label>
                </div>

                <select
                  required
                  value={formData.category}
                  className=" w-full border min-h-11 border-black bg-white text-sm px-3 py-2 appearance-none cursor-pointer focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Others">Others</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Phones">Phones</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Household">Household</option>
                </select>

                <div className="absolute inset-y-0 top-9 right-3 flex items-center pointer-events-none">
                  <FaChevronDown className=" text-xs" />
                </div>
              </div>

              <div className="flex justify-between items-center gap-24 ">
                <Button
                  onClick={() => prevStep()}
                  className="w-full bg-dark_grey hover:bg-neutral-light"
                >
                  Prev
                </Button>
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

export default Step2;
