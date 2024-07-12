import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import { ErrorContainer } from '../containers/Error/ErrorContainer';

export const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <ErrorContainer />
      <Footer />
    </>
  );
};
