import { useEffect, useState } from 'react';
import isTokenExpired from '../utils/token';

const useCheckToken = () => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const expired = await isTokenExpired(token);
        setIsExpired(expired);

        if (expired) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    checkToken();
  }, []);

  return isExpired;
};

export default useCheckToken;
