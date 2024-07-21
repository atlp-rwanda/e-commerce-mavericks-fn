import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import VerifyOTP from '../components/authentication/VerifyOTP';

const VerifyOTPPage = () => {
  return (
    <div className='min-h-screen flex flex-col gap-16'>
      <Navbar />
      <VerifyOTP />
      <Footer />
    </div>
  );
};

export default VerifyOTPPage;
