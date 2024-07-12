import { jwtDecode } from 'jwt-decode';

// Function to check token expiration and handle deletion
const isTokenExpired = async (token: string) => {
  if (!localStorage.getItem('token')) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp! * 1000;

    const currentTime = Date.now();
    return currentTime >= expirationTime;
  } catch (error) {
    return true;
  }
};

export default isTokenExpired;
