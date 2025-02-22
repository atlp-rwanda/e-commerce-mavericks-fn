import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AdminLayout from '../admin/AdminLayout';

const RestrictedRoute = ({ role }: { role: string }) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = useSelector((state: RootState) => state.user.token);

  if (!isAuthenticated && user.role !== role) {
    return <Navigate to='/' />;
  }

  return <AdminLayout />;
};

export default RestrictedRoute;
