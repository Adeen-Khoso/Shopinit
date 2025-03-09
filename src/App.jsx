import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import ProductPage from "./pages/ProductPage";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UserProfile from "./pages/UserProfile";
import SellPage from "./pages/SellPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "./firebase";
export const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("User is signed in", user);
      } else {
        setUser(null);
        console.log("User is signed out");
      }
    });
  }, []);

  console.log(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <ProductPage />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/profile",
          element: user ? <UserProfile /> : <Navigate to="/login" replace />,
        },
        {
          path: "/sell",
          element: user ? <SellPage /> : <Navigate to="/login" replace />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
