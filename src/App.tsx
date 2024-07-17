import Register from './pages/Register';
import Success from './components/authentication/Success';
import RegisterSection from './components/authentication/RegisterSection';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import GoogleAuthSuccess from './components/authentication/GoogleAuthSucces';
import EditUserProfile from './pages/editUserProfile';
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
import UserManagement from './pages/admin/UserManagement';
import NotFoundPage from './pages/NotFoundPage';
import SellerSettings from './pages/seller/Settings';
import SellersPage from './pages/seller';
import Orders from './pages/seller/Orders';
import Products from './pages/seller/Products';
import Customers from './pages/seller/Customers';
import AdminSettings from './pages/admin/Settings';
import AddNewProduct from './pages/seller/AddNewProduct';
import RestrictedSellerRoute from './components/dashboard/RestrictedSellerLayout';

import CategoriesPage from './pages/CategoriesPage';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import { ProductDetail } from './pages/product/ProductDetail';
import Cart from './components/cart/Cart';
import { cartApi } from './services/cartApi';

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
        const productsList = productsData.data as unknown as Product[];
        dispatch(setProductsDataList([...productsList]));
        dispatch(setIsLoading(false));
        dispatch(setProductFetched(true));
      }
    };
    fetchProducts();

    dispatch<any>(cartApi.endpoints.getCarts.initiate());
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
        {
          path: 'profile',
          element: <EditUserProfile />,
        },
        {
          path: 'categories/:categoryId',
          element: <CategoriesPage />,
        },
        {
          path: '/reset-password',
          children: [
            { path: '', element: <ResetPassword /> },
            {
              path: ':token',
              element: <NewPassword />,
            },
          ],
        },
        {
          path: 'products/:id',
          element: <ProductDetail />,
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
          path: 'users',
          element: <UserManagement />,
        },
        {
          path: 'settings',
          element: <AdminSettings />,
        },
      ],
    },
    {
      path: 'seller',
      element: <RestrictedSellerRoute role='seller' />,
      children: [
        {
          index: true,
          element: <SellersPage />,
        },
        {
          path: 'orders',
          element: <Orders />,
        },
        {
          path: 'products',
          element: <Products />,
        },
        {
          path: 'add-new-product',
          element: <AddNewProduct />,
        },
        {
          path: 'customers',
          element: <Customers />,
        },
        {
          path: 'settings',
          element: <SellerSettings />,
        },
      ],
    },
    {
      path: 'search',
      element: <Searchpage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
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
