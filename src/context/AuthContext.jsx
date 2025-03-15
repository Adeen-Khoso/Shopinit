import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children, user }) => {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
