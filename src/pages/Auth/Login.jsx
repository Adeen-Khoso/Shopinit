import React, { useState } from "react";
import { Login3 } from "../../utility/components/LoginForm";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../utility/Loader";
const provider = new GoogleAuthProvider();

// force push

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);

  const loginUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        toast.success("Logged in successfully !", {
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
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        console.log(errorCode, errorMessage);
      });
  };

  const loginWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setLoading(false);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        toast.success(`Welcome to Shopinit, ${user.displayName}  !`, {
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
        // the user data from here will be sent to backend and then be fetched from user profile.
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      {loading && <Loader />}
      <Login3
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loginUser={loginUser}
        error={error}
        setError={setError}
        loginWithGoogle={loginWithGoogle}
      />
    </>
  );
};

export default Login;
