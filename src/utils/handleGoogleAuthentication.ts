const handleGoogleAuthentication = (e: any) => {
  e.preventDefault();
  window.location.assign('https://mavericks.nijohn.dev/api/auth/google');
};

export default handleGoogleAuthentication;
