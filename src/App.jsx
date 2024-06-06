import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Login from "./Login";
import Register from "./Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Test from "./test";
import ChangePassword from "./ForgotPassword";
import ResetPassword from "./ForgotPassword/message";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
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
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
