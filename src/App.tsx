import Register from './pages/Register';
import Success from './components/register/Success';
import RegisterSection from './components/register/RegisterSection';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

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
  return <RouterProvider router={router} />;
};

export default App;
