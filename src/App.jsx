import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";

function App() {
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
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
