// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import ProductCard from '../Products/ProductCard';
import Button from '../common/Button';
import { Product } from '../../types/Types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface SearchQueryProps {
  searchQuery: string;
}
const SearchResults = ({ searchQuery }: SearchQueryProps) => {
  const { isLoading, productsDataList: productsList } = useSelector((state: any) => state.products);
  const filteredProducts = [
    ...productsList.filter((product: Product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())),
    ...productsList.filter((product: Product) => product.description.toLowerCase().includes(searchQuery.toLowerCase())),
  ];
 useEffect(() => {
   if (searchQuery.length !== 0 && filteredProducts.length !== 0) {
     const productNames = filteredProducts.map(product => product.name);
     let frequentlySearched = JSON.parse(localStorage.getItem('frequentlySearched') as string) || [];
     frequentlySearched = [...new Set(frequentlySearched)];
     frequentlySearched = [...new Set([...frequentlySearched, ...productNames])];
     localStorage.setItem('frequentlySearched', JSON.stringify(frequentlySearched));
   }
 }, [searchQuery]);


  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };
  return (
    <div>
      
      <div className='p-3 md:p-4 xl:px-10 flex flex-row flex-wrap gap-4'>
        {isLoading ? (
          'Loading....'
        ) : filteredProducts.length === 0 ? (
          <div className='w-full '>
            <p className='font-medium text-2xl italic'>
              No matching products were found for <span className='font-bold'>{searchQuery}</span>
            </p>
            <Button text='Return to HomePage' className='mt-10 mx-auto block' onClick={handleNavigate} />
          </div>
        ) : (
          filteredProducts.map((product: Product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default SearchResults;
