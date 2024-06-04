import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
const Register = () => {
  return (
    <div className='mx-auto  flex flex-col items-center  justify-center'>
      <div className='min-h-screen h-fit w-full'>
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
