import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/userSlice';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
      console.log(token);
      navigate('/');
    }
  }, [location, dispatch, navigate]);

  return <div>Loading...</div>;
};

export default AuthSuccess;
