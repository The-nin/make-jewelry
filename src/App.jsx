

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Login'
import Test from './test';

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
  ]);

  return  <RouterProvider router={router} />
}

export default App
