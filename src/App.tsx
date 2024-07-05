import Register from './pages/Register';
import Success from './components/authentication/Success';
import RegisterSection from './components/authentication/RegisterSection';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import GoogleAuthSuccess from './components/authentication/GoogleAuthSucces';
import { ToastContainer } from 'react-toastify';
import Searchpage from './containers/searchResults/SearchPage';
import { useDispatch } from 'react-redux';
import { ProductResponse, Product } from './types/Types';
import { useEffect, useRef } from 'react';
import { useGetProductsQuery } from './services/productApi';
import { setError, setIsLoading, setProductFetched, setProductsDataList } from './redux/slices/productsSlice';
import RestrictedRoute from './components/dashboard/RestrictedRoute';
import AdminPage from './pages/admin';
import Category from './pages/admin/Category';
import Sellers from './pages/admin/Sellers';
import Buyers from './pages/admin/Buyers';
import Messages from './pages/admin/Messages';
import Settings from './pages/admin/Settings';

const App = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const productsData: ProductResponse = data as unknown as ProductResponse;

  useEffect(() => {
    const fetchProducts = async () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (error) {
        dispatch(setError(error));
        dispatch(setIsLoading(false));
        dispatch(setProductFetched(false));
        return;
      }
      if (!isLoading && productsData) {
        const productsList = productsData.data as Product[];
        dispatch(setProductsDataList([...productsList]));
        dispatch(setIsLoading(false));
        dispatch(setProductFetched(true));
      }
    };
    fetchProducts();
  }, [productsData, isLoading, dispatch]);

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
    {
      path: 'admin',
      element: <RestrictedRoute role='admin' />,
      children: [
        {
          index: true,
          element: <AdminPage />,
        },
        {
          path: 'categories',
          element: <Category />,
        },
        {
          path: 'sellers',
          element: <Sellers />,
        },
        {
          path: 'buyers',
          element: <Buyers />,
        },
        {
          path: 'messages',
          element: <Messages />,
        },
        {
          path: 'settings',
          element: <Settings />,
        },
      ],
    },
    {
      path: 'search',
      element: <Searchpage />,
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
