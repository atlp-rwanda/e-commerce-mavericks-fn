import Register from './pages/Register';
import Success from './components/authentication/Success';
import RegisterSection from './components/authentication/RegisterSection';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import GoogleAuthSuccess from './components/authentication/GoogleAuthSucces';
import { ToastContainer } from 'react-toastify';
import AdminPage from './pages/Admin';
import Category from './pages/Admin/Category';
import Searchpage from './containers/searchResults/SearchPage';
import { useDispatch } from 'react-redux';
import { ProductResponse, Product } from './types/Types';
import { useEffect, useRef } from 'react';
import { useGetProductsQuery } from './services/productApi';
import { setError, setIsLoading, setProductFetched, setProductsDataList } from './redux/slices/productsSlice';
import { BuyerDashboard } from './pages/BuyerDashboard';
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
      path: 'user',
      element: <BuyerDashboard />,
      children: [],
    },
    {
      path: 'admin',
      element: <AdminPage />,
      children: [
        {
          index: true,
          element: <AdminPage />,
        },
        {
          path: 'categories',
          element: <Category />,
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
