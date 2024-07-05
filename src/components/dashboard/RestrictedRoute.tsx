import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AdminLayout from './AdminLayout';

interface RestrictedRouteProp {
  role: string;
}

const RestrictedRoute: React.FC<RestrictedRouteProp> = ({ role }) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = useSelector((state: RootState) => state.user.token);

  if (!isAuthenticated && user.role !== role) {
    return <Navigate to='/' />;
  }

  return <AdminLayout />;
};

export default RestrictedRoute;
