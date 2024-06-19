import Register from './pages/Register';
import Success from './components/authentication/Success';
import RegisterSection from './components/authentication/RegisterSection';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import GoogleAuthSuccess from './components/authentication/GoogleAuthSucces';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'auth/success/:token',
          element: <GoogleAuthSuccess />,
        },
      ],
    },
    {
      path: 'register',
      element: <Register />,
      children: [
        {
          path: '/register',
          element: <RegisterSection />,
        },
        { path: 'success', element: <Success /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
