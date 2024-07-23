import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AdminLayout from '../../components/admin/AdminLayout';
import BuyerProfile from '../../pages/BuyerProfile';

interface RestrictedRouteProp {
  role: 'admin' | 'buyer' | 'seller';
}

const BuyerRestrictedRoutes: React.FC<RestrictedRouteProp> = ({ role }) => {
  const userRole = useSelector((state: RootState) => state.user.role);
  const token = useSelector((state: RootState) => state.user.token);

//   orders
//  user profile


  if (!token || userRole !== role) {
    return <Navigate to='/' />;
  }

  switch (role) {
    case 'admin':
      return <AdminLayout />;
    case 'buyer':
      return <BuyerProfile />;
    default:
      return <Navigate to='/' />;
  }
};

export default BuyerRestrictedRoutes;
