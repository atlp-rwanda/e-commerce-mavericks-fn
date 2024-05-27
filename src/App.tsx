import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SamplePage from "./pages/SamplePage";
import Login from "./pages/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SamplePage />
    },
    {
      path: "login",
      element: <Login />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
