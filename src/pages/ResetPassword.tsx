import PasswordResetComponent from '../components/passwordReset/PasswordResetComponent';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
const ResetPassword = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <PasswordResetComponent />
      <Footer />
    </div>
  );
};

export default ResetPassword;
