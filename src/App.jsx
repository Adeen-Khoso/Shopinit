import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import ProductPage from "./pages/ProductPage";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/Auth/SignUp";
import UserProfile from "./pages/UserProfile";
import SellPage from "./pages/SellPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "./firebase";
export const auth = getAuth(app);
import { AuthProvider } from "./context/AuthContext";
import ProfileSetup from "./pages/ProfileSetup";
import EditProfile from "./pages/EditProfile";
import Bookmarks from "./pages/Bookmarks";
import Loader from "./utility/Loader";
import Cursor from "./utility/Cursor";

// somewhere temporary, e.g. in App.js
import { supabase } from "./supabaseClient";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  useEffect(() => {
    supabase
      .from("nonexistent") // a safe, read query
      .select("*")
      .then(console.log)
      .catch(console.error);
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthLoading(false);

        console.log("User is signed in", user);
      } else {
        setUser(null);
        setIsAuthLoading(false);
        console.log("User is signed out");
      }
    });
  }, []);

  if (isAuthLoading) {
    return <Loader />;
  }
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
          path: "/products/:id",
          element: <ProductDetail />,
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
        {
          path: "/profileSetup",
          element: user ? <ProfileSetup /> : <Navigate to="/login" replace />,
        },
        {
          path: "/editProfile",
          element: user ? <EditProfile /> : <Navigate to="/login" replace />,
        },
        {
          path: "/bookmarks",
          element: user ? <Bookmarks /> : <Navigate to="/login" replace />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: user ? <Navigate to="/profile" replace /> : <Login />,
        },
        {
          path: "/signup",
          // element: <SignUp />,
          element: user ? <Navigate to="/profileSetup" replace /> : <SignUp />,
        },
      ],
    },
  ]);
  return (
    <>
      <AuthProvider user={user}>
        <Cursor />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
