const handleGoogleAuthentication = (e: any) => {
  e.preventDefault();
  window.location.assign('https://e-commerce-mavericcks-bn-staging-istf.onrender.com/api/auth/google');
};

export default handleGoogleAuthentication;
