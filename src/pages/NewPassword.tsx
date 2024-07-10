import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import NewPasswordComponent from '../components/passwordReset/NewPasswordComponent';

const NewPassword = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <NewPasswordComponent />
      <Footer />
    </div>
  );
};

export default NewPassword;
