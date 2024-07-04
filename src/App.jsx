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
import Order from "./pages/Dashboard/Order";
import Stone from "./pages/Dashboard/Stone";
import ListOfOrder from "./pages/Dashboard/ListOfOrder";
import Collection from "./pages/CollectionPage/Collection";
import ProductDetail from "./pages/productdetail";
import RequestProduct from "./pages/requestProduct";
import OrderApproval from "./pages/Dashboard/OrderApproval";
import TaskStaff from "./pages/Dashboard/TaskStaff";
import MyOrder from "./pages/MyOrder";
import Cart from "./pages/CartPage/Cart";
// import Profile from "./pages/Profile";

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
      path: "/collections",
      element: <Collection />,
    },
    {
      path: "/product/:id",
      element: <ProductDetail />,
    },
    {
      path: "/booking",
      element: <RequestProduct />,
    },
    {
      path: "my-order",
      element: <MyOrder />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    // {
    //   path: "profile",
    //   element: <Profile />,
    // },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "category",
          element: <Category />,
        },
        // {
        //   path: "/dashboard/manage-account",
        //   element: <Account />,
        // },
        {
          path: "product",
          element: <Product_template />,
        },
        {
          path: "material",
          element: <Material />,
        },
        {
          path: "all-account",
          element: <AllAccount />,
        },
        {
          path: "stone",
          element: <Stone />,
        },
        {
          path: "all-order",
          element: <Order />,
        },
        {
          path: "assign-order",
          element: <ListOfOrder />,
        },
        {
          path: "approve-order",
          element: <OrderApproval />,
        },
        {
          path: "staff-task",
          element: <TaskStaff />,
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
