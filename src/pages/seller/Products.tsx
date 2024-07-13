import { CiSearch } from 'react-icons/ci';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Navbar from '../../components/dashboard/Navbar';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link, Outlet } from 'react-router-dom';

import { FaRegEdit } from 'react-icons/fa';
import { LuEye } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useGetProductsBySellerQuery } from '../../services/productApi';
export interface IProduct {
  name: string;
  description: string;
  price: string;
  images: string[];
  sales: number;
  remaining: number;
  categoryName: string;
}

export interface IProductResponse {
  data: IProduct[];
}

export default function Products() {
  const { data, isLoading } = useGetProductsBySellerQuery();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (data) {
      setProducts(data.data);
    }
  }, [data]);

  return (
    <>
      <Navbar location='Products' page='seller' />
      <div className='mx-auto p-4 md:ml-64'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center rounded bg-whiteColor p-2 border border-grayColor'>
                <CiSearch className='mr-1.5 text-[#A08D8D]' size={20} />
                <input type='text' placeholder='Search products' className='border-none outline-none' />
              </div>
              <div className='flex items-center bg-[#0B8A8A] hover:bg-greenColor rounded px-2 border border-[#0B8A8A]'>
                <IoIosAddCircleOutline className='text-whiteColor' size={20} />
                <Link to={'/seller/add-new-product'} className='text-whiteColor p-2 uppercase text-sm'>
                  Add New Product
                </Link>
                <Outlet />
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className='bg-whiteColor rounded-lg shadow-lg p-4 border border-grayColor relative'>
      <div className='flex justify-between'>
        <div className='flex'>
          <img src={product.images[0]} alt={product.name} className='w-24 h-24 object-cover mb-4 rounded' />
          <div className='flex flex-col ml-2'>
            <h2 className='text-xl font-bold mb-2 text-[#000]'>{product.name}</h2>
            <p className='text-[#4A4A4A] mb-4 font-bold'>{product.price}</p>
          </div>
        </div>
        <div className='relative'>
          <button className='rounded bg-[#EFEFEF] p-2 cursor-pointer' onClick={handleOpenModal}>
            <HiDotsHorizontal />
          </button>
          {openModal && (
            <div className='absolute top-8 right-0 bg-whiteColor p-2 w-28 rounded-lg border border-grayColor'>
              <ul>
                <li className='py-3 hover:text-skyBlueText cursor-pointer'>
                  <div className='flex items-center justify-center'>
                    <span>View</span>
                    <LuEye className='ml-2' />
                  </div>
                </li>
                <li className='py-3 hover:text-skyBlueText cursor-pointer'>
                  <div className='flex items-center justify-center'>
                    <span>Update</span>
                    <FaRegEdit className='ml-2' />
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <h3>Summary</h3>
      <p className='text-[#7A7A7A] mb-4 line-clamp-1'>{product.description}</p>
      <div className='border p-3 border-[#E0E0E0] rounded'>
        <div className='flex justify-between items-center mb-2'>
          <span className='font-light text-sm'>Sales</span>
          <span className='font-light text-sm text-[#999]'>324</span>
        </div>
        <div className='border-b border-[#E0E0E0] my-3'></div>
        <div className='flex justify-between items-center'>
          <span className='font-light text-sm'>Remaining Products</span>
          <span className='font-light text-sm text-[#999]'>343</span>
        </div>
      </div>
    </div>
  );
};
