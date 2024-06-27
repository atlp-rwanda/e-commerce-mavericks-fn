import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import SearchHeader from '../../components/search/SearchHeader';
import SearchResults from '../../components/search/SearchResults';
import { useSearchParams } from 'react-router-dom';

const Searchpage = () => {
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('searchQuery') as string;
  return (
    <div className='w-full'>
      <span className='w-full h-screen block'>
        <Navbar />
        <SearchHeader searchQuery={searchParam} />
        <SearchResults searchQuery={searchParam} />
      </span>
      <Footer />
    </div>
  );
};

export default Searchpage;
