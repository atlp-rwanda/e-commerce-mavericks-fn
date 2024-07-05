import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Buyer } from '../containers/Dashboard/Buyer';

export const BuyerDashboard = () => {
  return (
    <>
      <Navbar />
      <Buyer />
      <Footer />
    </>
  );
};
