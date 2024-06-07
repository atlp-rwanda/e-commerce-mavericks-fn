const handleGoogleAuthentication = (e: any) => {
  e.preventDefault();
  window.location.assign('http://localhost:8080/api/auth/google');
};

export default handleGoogleAuthentication;
