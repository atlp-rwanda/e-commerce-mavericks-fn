import Arrivals from "../components/landingPage/Arrivals";
import FeaturedProduct from "../components/landingPage/FeaturedProduct";
import Wrapper from "../utils/Wrapper";

const SamplePage = () => {
  return (
    <div className=''>
      <Wrapper>
         <FeaturedProduct />
         <Arrivals />
      </Wrapper>
    </div>
  );
};

export default SamplePage;
