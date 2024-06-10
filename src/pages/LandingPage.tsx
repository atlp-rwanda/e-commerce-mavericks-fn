import HeroPage from '../containers/herosection/HeroPage';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';

const LandingPage = () => {
  return (
    <div className='w-full min-h-screen max-h-full overflow-x-hidden'>
      <Navbar />
      <HeroPage />
      <Footer />
    </div>
  );
};

export default LandingPage;
