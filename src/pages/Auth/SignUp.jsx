import React, { useState } from "react";
import { Signup3 } from "../../utility/components/SignUpForm";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
export const auth = getAuth(app);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <Signup3
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        createUser={createUser}
      />
    </>
  );
};

export default SignUp;
