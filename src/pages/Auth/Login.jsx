import React, { useState } from "react";
import { Login3 } from "../../utility/components/LoginForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

const Login = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("success login user credential", userCredential);
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
