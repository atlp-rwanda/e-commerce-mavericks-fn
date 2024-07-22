// import ProductCard from '../../components/Products/ProductCard';
// import ProductCardSkeleton from '../../components/Products/ProductCardSkeleton';
// import { Product } from '../../types/Types';
// import { BiSolidCircle } from 'react-icons/bi';
// import { useGetProductsQuery } from '../../services/productApi';

// const perPage = 10;

// export default function NewArrivals() {
//   const { data: productsList, isLoading, isSuccess } = useGetProductsQuery()
//   // const [currentPage, setCurrentPage] = useState(0);
//   // const { isLoading, productsDataList: productsList } = useSelector((state: any) => state.products);
//   const next = () => {
//     setCurrentPage(prevPage => Math.min(prevPage + 1, Math.floor(productsList.data.length / perPage)));
//   };

//   const prev = () => {
//     setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
//   };

//   const startIndex = currentPage * perPage;
//   const endIndex = startIndex + perPage;
//   const sortedProducts = [...productsList.data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 13);
//   const allProductsOnPage = sortedProducts.slice(startIndex, endIndex);

//   return (
//     <div className='new-arrivals'>
//       <div className='arrivals-header py-5'>
//         <h1 className='text-3xl font-bold'>New Arrivals</h1>
//       </div>
//       <div className='flex justify-between items-start flex-wrap gap-1 sm:justify-between md:justify-start md:gap-2'>
//         {isLoading
//           ? Array.from({ length: perPage }).map((_, index) => <ProductCardSkeleton key={index} />)
//           : allProductsOnPage.map((product: Product) => <ProductCard key={product.id} product={product} />)}
//       </div>
//       <div className='next-previous flex justify-center items-center gap-2 p-7'>
//         <BiSolidCircle
//           onClick={prev}
//           className={`cursor-pointer text-2xl ${currentPage === 0 ? 'text-grayColor' : ''}`}
//         />
//         <BiSolidCircle
//           onClick={next}
//           className={`cursor-pointer text-2xl ${currentPage >= Math.floor(productsList.data.length / perPage) ? 'text-grayColor' : ''
//             }`}
//         />
//       </div>
//     </div>
//   );
// }
