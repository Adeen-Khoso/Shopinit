import React, { useState } from "react";
import { Login3 } from "../../utility/components/LoginForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Logged in successfully !", {
          icon: "☑️",
          style: {
            borderRadius: "0px",
            background: "#FFF5F5",
            color: "#333",
          },
        });

        // toast.success("Logged in successfully !", {
        //   style: {
        //     borderRadius: "0px",
        //     background: "#FFF5F5",
        //     color: "#2F3C7E",
        //     border: "1px solid #2F3C7E",
        //   },
        //   iconTheme: {
        //     primary: "#2F3C7E",
        //     secondary: "#FFFAEE",
        //   },
        // });
        console.log("success login user credential", userCredential);
        navigate("/profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <Login3
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loginUser={loginUser}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default Login;
