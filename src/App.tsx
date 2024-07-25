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
import { useEffect } from 'react';
import { productsApi } from './services/productApi';
import Checkout from './components/checkout/Checkout';
import RestrictedRoute from './components/dashboard/RestrictedRoute';
import AdminPage from './pages/admin';
import Category from './pages/admin/Category';
import Sellers from './pages/admin/Sellers';
import Buyers from './pages/admin/Buyers';
import UserManagement from './pages/admin/UserManagement';
import SellerSettings from './pages/seller/Settings';
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
import VerifyOTPPage from './pages/VerifyOTPPage';
import PaymentSuccessCard from './components/checkout/PaymentSuccessCard';
import PaymentPage from './pages/PaymentPage';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { SellerDashboard } from './pages/seller';
import { ErrorPage } from './pages/ErrorPage';
import EditProduct from './pages/seller/EditProduct';

import BuyerRestrictedRoutes from './containers/buyer/BuyerRestrictedRoutes';
const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(productsApi.endpoints.getProducts.initiate());
    if (isAuthenticated) {
      dispatch<any>(cartApi.endpoints.getCarts.initiate());
      console.log('Cart');
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
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
          path: 'shoppingcart',
          element: <Cart />,
        },
        {
          path: 'categories/:categoryId',
          element: <CategoriesPage />,
        },
        {
          path: 'payment',
          element: <PaymentPage />,
          children: [
            {
              path: 'success',
              element: <PaymentSuccessCard />,
            },
          ],
        },
        {
          path: 'verifyOTP',
          element: <VerifyOTPPage />,
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
        {
          path: '/checkoutbag',
          element: <Checkout />,
        },
        {
          path: 'buyer-profile',
          element: <BuyerRestrictedRoutes role='buyer' />,
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
          element: <SellerDashboard />,
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
          path: 'products/add-new-product',
          element: <AddNewProduct />,
        },
        {
          path: 'products/edit-product/:id',
          element: <EditProduct />,
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
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
