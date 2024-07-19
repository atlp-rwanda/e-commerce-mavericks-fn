import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SellerLayout from '../seller/SellerLayout';

const RestrictedSellerRoute = ({ role }: { role: string }) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = useSelector((state: RootState) => state.user.token);

  if (!isAuthenticated && user.role !== role) {
    return <Navigate to='/' />;
  }

  return <SellerLayout />;
};

export default RestrictedSellerRoute;
