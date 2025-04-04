import React, { useState } from "react";
import { Signup3 } from "../../utility/components/SignUpForm";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../utility/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const createUser = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/login");
        const user = userCredential.user;
        toast.success("Account created Successfully !", {
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

        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorCode);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Signup3
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          createUser={createUser}
          error={error}
          setError={setError}
        />
      )}
    </>
  );
};

export default SignUp;
