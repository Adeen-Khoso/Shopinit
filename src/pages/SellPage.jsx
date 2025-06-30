import React, { useState } from "react";
import Step1 from "../utility/form_steps/Step1";
import Step2 from "../utility/form_steps/Step2";
import Step3 from "../utility/form_steps/Step3";
import Step4 from "../utility/form_steps/Step4";
import Stepper from "../utility/form_steps/Stepper";
import { supabase } from "../supabaseClient"; // step 1 file
import Loader from "../utility/Loader";
import toast from "react-hot-toast";

// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase";
// import { useAuth } from "../context/AuthContext"; // or however you get currentUse

// const SellPage = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     description: "",
//     condition: "",
//     category: "",
//     images: [],
//   });

//   const [currentStep, setCurrentStep] = useState(1);

//   const nextStep = () => {
//     setCurrentStep((current) => current + 1);
//   };
//   const prevStep = () => {
//     setCurrentStep((current) => current - 1);
//   };

//   const addProduct = (e) => {
//     console.log(formData);
//     // this function would send data to the backend and add product to the database
//   };

//   return (
//     <>
//       <Stepper currentStep={currentStep} />
//       {currentStep === 1 && (
//         <Step1
//           nextStep={nextStep}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       )}
//       {currentStep === 2 && (
//         <Step2
//           nextStep={nextStep}
//           prevStep={prevStep}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       )}
//       {currentStep === 3 && (
//         <Step3
//           nextStep={nextStep}
//           prevStep={prevStep}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       )}
//       {currentStep === 4 && (
//         <Step4
//           addProduct={addProduct}
//           prevStep={prevStep}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       )}
//     </>
//   );
// };

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SellPage = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    condition: "",
    category: "",
    images: [],
  });
  // …
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => {
    setCurrentStep((current) => current + 1);
  };
  const prevStep = () => {
    setCurrentStep((current) => current - 1);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in first.");

    setIsLoading(true);

    const uploadResults = await Promise.all(
      formData.images.map(async (file) => {
        const filePath = `${user.uid}/${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
          .from("products")
          .upload(filePath, file);

        if (error) throw error;
        // build the public URL
        const { data: urlData, error: urlError } = supabase.storage
          .from("products")
          .getPublicUrl(data.path);

        if (urlError) throw urlError;
        return urlData.publicUrl;
      })
    );

    try {
      console.log("About to save product with:", {
        ...formData,
        images: uploadResults,
        uid: user.uid,
      });

      await addDoc(collection(db, "products"), {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        condition: formData.condition,
        category: formData.category,
        images: uploadResults, // array of strings
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      toast.success("Product Added Successfully !", {
        icon: "👏",
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
      console.log("Product added successfully!");

      setFormData({
        title: "",
        price: "",
        description: "",
        condition: "",
        category: "",
        images: [],
      });
      setCurrentStep(1);
    } catch (err) {
      console.error("Add product failed:", err);
      setIsLoading(false); // ← stop the loader
      toast.error("Could not add product. Try again.", {
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
    } finally {
      setIsLoading(false); // ← stop the loader
    }
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <Stepper currentStep={currentStep} />
        {currentStep === 1 && (
          <Step1
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 2 && (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 3 && (
          <Step3
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 4 && (
          <Step4
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
            addProduct={addProduct}
          />
        )}
      </>
    );
  }
};

export default SellPage;
