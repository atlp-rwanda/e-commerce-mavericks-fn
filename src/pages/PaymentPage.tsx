import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
const PaymentPage = () => {
  return (
    <div className='mx-auto  flex flex-col items-center  justify-center'>
      <div className='min-h-screen h-fit w-full'>
        <Navbar />
        <div className='bg-whiteColor'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
