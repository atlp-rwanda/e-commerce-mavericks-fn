import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <LandingPage />
        },
        {
          path: "login",
          element: <Login />
        }
      ]
    },
  ])
  return (
    <RouterProvider router={router} />
  );
};

export default App;
