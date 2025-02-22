import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import Hero from '../assets/Hero.png'
import { useSelector } from 'react-redux';
import { Category } from '../types/Types';
import { useDispatch } from 'react-redux';
import { useGetAllCategoriesQuery } from '../services/productApi';
import { setIsCategoriesFetched, setallCategories } from '../redux/slices/categorySlice';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import ProductCard from '../components/Products/ProductCard';



const CategoriesPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cateId, setCategoryId] = useState('');

  // categories
  const dispatch = useDispatch();
  const { allCategories, isCategoriesFetched }: any = useSelector((state: any) => state.category);
  const { data: categoriess, isLoading } = useGetAllCategoriesQuery();

  // categories on page load
  useEffect(() => {
    if (!isCategoriesFetched && categoriess) {
      dispatch(setallCategories(categoriess));
      dispatch(setIsCategoriesFetched(true));
    }
  }, [categoriess, isCategoriesFetched, dispatch]);

  useEffect(() => {
    if (!isLoading && allCategories) {
      const category = allCategories?.data?.find((cat: Category) => cat.name === categoryId);
      if (category) {
        setCategoryId(category.id);
      } else {
        setCategoryId("");
      }
    }
  }, [categoryId, allCategories, isLoading]);

  const categoriesToDisplay = allCategories.length ? allCategories.data : categoriess;
  const { productsDataList: productsList } = useSelector((state: any) => state.products);

  const [currentPage, setCurrentPage] = useState(0);
  const [nameFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('');

  const productsPerPage = 12;

  const handleNext = () => {
    if ((currentPage + 1) * productsPerPage < productsList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setCategoryId(event.target.value)
  };

  const filteredProducts = [...productsList]
    .filter(product => {
      const matchesName = product.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesMinPrice = minPrice === '' || product?.sizes?.[0]?.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || product?.sizes?.[0]?.price <= parseFloat(maxPrice);
      const matchesCategory = selectedCategory === '' || product.categoryName === selectedCategory;
      const matchesCategoryId = cateId === '' || product.categoryName === cateId;
      return matchesName && matchesMinPrice && matchesMaxPrice && matchesCategory && matchesCategoryId;
    })
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      else if (sortOption === 'rating') {
        return b.ratings - a.ratings;
      }
      return 0;
    });

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      <div className="font-roboto">
        <div className="bg-grayColor px-4 md:px-16 ">
          <div className="category-hero md:py-8 md:grid md:grid-cols-2 md:gap-4">
            <div className="hero-part-1 md:grid md:grid-cols-3 md:gap-2">
              <div className="text-part-empty-1 hidden md:col-span-1 md:block"></div>
              <div className="text-part-text-2 h-48 col-span-2 px-8 flex flex-col items-center justify-center gap-8">
                <p className="font-bold text-xl sm:text-sm md:text-2xl lg:text-4xl">
                  Grab up to 50% off on Selected Products
                </p>
                <button className="px-8 py-2 bg-darkGreen rounded-md text-whiteColor">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="hero-part-2 flex justify-end md:pr-16">
              <img
                className="h-48 w-full object-contain md:h-56"
                src={Hero}
                alt="Sale banner"
              />
            </div>
          </div>
        </div>
        <div className="filters md:px-16 md:py-4 bg-gray-100 md:rounded-lg shadow-lg md:flex md:justify-between">
          <div className="first-part grid grid-cols-2 mb-4 md:flex md:gap-6">
            <select className="border border-grayColor rounded-lg p-2 md:w-40 bg-white focus:outline-none font-bold"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                <>
                  <option value="">All</option>
                  {categoriesToDisplay?.data?.map((category: Category) => (
                    <option key={category.id} value={category.id} id='cat'>{category.name}</option>
                  ))}
                </>
              )}
            </select>
            <div className="price-filter flex items-center gap-2">
              <input
                type="number"
                className="border border-grayColor rounded-lg p-2 w-40 focus:outline-none"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="price-filter flex items-center gap-2">
              <input
                type="number"
                className="border border-grayColor rounded-lg p-2 px-4 w-40 focus:outline-none"
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="second-part">
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-grayColor rounded-lg p-2 px-4 w-40  bg-white focus:outline-none font-bold">
              <option value="">Sort By:</option>
              <option value="name">Names</option>
              <option value="date">Latest</option>
            </select>
          </div>
        </div>
        {/* Products */}
        <div className="products md:px-16">
          <div className="all py-2">
            <div className="flex justify-between items-start flex-wrap gap-1 sm:justify-between md:justify-start md:gap-3 mt-5">
              {currentProducts.length === 0 ? (
                <p className="text-center text-gray-500 mt-4 text-2xl font-bold md:text-3xl w-full">No products found.</p>
              ) : (currentProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
              )}
            </div>
            <div className="flex justify-between mt-4 px-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={` px-5 py-1 md:px-5 md:py-2 text-center bg-[#007A7A] hover:bg-[#2cdfdf] text-whiteColor font-bold rounded-md ${currentPage === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-500 text-white'}`}
              >
                <FaLongArrowAltLeft />
              </button>
              <button
                onClick={handleNext}
                disabled={(currentPage + 1) * productsPerPage >= filteredProducts.length}
                className={`px-5 py-2 text-center bg-[#007A7A] hover:bg-[#2cdfdf] text-whiteColor font-bold rounded-md ${(currentPage + 1) * productsPerPage >= filteredProducts.length ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-500 text-white'}`}
              >
                <FaLongArrowAltRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
