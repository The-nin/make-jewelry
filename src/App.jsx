import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Login from "./Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Test from "./test";
import Register from "./Register";
import ChangePassword from "./ForgotPassword";
import ResetPassword from "./ForgotPassword/message";
import Dashboard from "./Dashboard";
import Category from "./Category";
import Material from "./Material";
import AllAccount from "./components/AllAccount";
import HomePage from "./pages/HomePage";
import Product_template from "./Product";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Test />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ResetPassword />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard/category",
          element: <Category />,
        },
        // {
        //   path: "/dashboard/manage-account",
        //   element: <Account />,
        // },
        {
          path: "/dashboard/product",
          element: <Product_template />,
        },
        {
          path: "/dashboard/material",
          element: <Material />,
        },
        {
          path: "/dashboard/all-account",
          element: <AllAccount />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
