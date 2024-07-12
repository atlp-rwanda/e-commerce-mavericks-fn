import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/slices/userSlice';
import { CustomJwtPayload } from '../../types/Types';
import { jwtDecode } from 'jwt-decode';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      dispatch(setUser(decodedToken.id));
      navigate('/');
    }
  }, [location, dispatch, navigate]);

  return <div>Loading...</div>;
};

export default GoogleAuthSuccess;
