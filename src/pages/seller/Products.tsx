import { CiSearch } from 'react-icons/ci';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Navbar from '../../components/dashboard/Navbar';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link, Outlet } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useGetProductsBySellerQuery } from '../../services/productApi';
import DeleteProductModal from '../../components/seller/DeleteProductModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { MdRemoveShoppingCart } from 'react-icons/md';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  sales: number;
  remaining: number;
  categoryName: string;
}

export interface IProductResponse {
  ok: true;
  message: string;
  data: IProduct[];
}

export default function Products() {
  const { data, isLoading, isError, refetch } = useGetProductsBySellerQuery();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null); // Added state for selected product id
  const isProductCrudChanged = useSelector((state: RootState) => state.products.isProductAddedOrUpdatedOrDeleted);

  useEffect(() => {
    if (data) {
      setProducts(data.data);
    }

    let timer: any;
    if (isError) {
      timer = setTimeout(() => {
        refetch();
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (isProductCrudChanged) {
      refetch();
    }
  }, [data, refetch, isError, isProductCrudChanged]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenDeleteModal = (productId: string | null) => {
    setSelectedProductId(productId);
    setOpenDeleteModal(!openDeleteModal);
  };

  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <Navbar location='Products' page='seller' />
      <div className={`fixed inset-0 bg-blackColor opacity-50 z-40 ${openDeleteModal ? 'block' : 'hidden'}`}></div>
      <div className='p-4 md:ml-64'>
        {isError ? (
          <div className='text-center text-redColor'>Retrying...</div>
        ) : isLoading ? (
          <div className='text-center text-greenColor'>Loading...</div>
        ) : (
          <>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center rounded bg-whiteColor p-2 border border-grayColor'>
                <CiSearch className='mr-1.5 text-[#A08D8D]' size={20} />
                <input
                  type='text'
                  placeholder='Search products'
                  className='border-none outline-none'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className='flex items-center bg-[#0B8A8A] hover:bg-greenColor rounded px-2 border border-[#0B8A8A]'>
                <IoIosAddCircleOutline className='text-whiteColor' size={20} />
                <Link to={'/seller/products/add-new-product'} className='text-whiteColor p-2 uppercase text-sm'>
                  Add New Product
                </Link>
                <Outlet />
              </div>
            </div>
            {filteredProducts.length === 0 && (
              <div className='flex items-center justify-center mt-28'>
                <div className=''>
                  <MdRemoveShoppingCart size={50} className='mx-auto mb-4' />
                  It looks like you don't have any products in the store. Add them instead!
                </div>
              </div>
            )}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} handleOpenDeleteModal={handleOpenDeleteModal} />
              ))}
            </div>
          </>
        )}
      </div>
      {openDeleteModal && selectedProductId && (
        <DeleteProductModal
          openDeleteModal={openDeleteModal}
          handleOpenDeleteModal={() => handleOpenDeleteModal(null)}
          productId={selectedProductId}
        />
      )}
    </>
  );
}

const ProductCard = ({
  product,
  handleOpenDeleteModal,
}: {
  product: IProduct;
  handleOpenDeleteModal: (productId: string | null) => void; // Updated prop type
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleDeleteClick = () => {
    handleOpenDeleteModal(product.id);
    setOpenModal(false);
  };

  return (
    <>
      <div className='bg-whiteColor rounded-lg shadow-lg p-4 border border-grayColor'>
        <div className='flex justify-between'>
          <div className='flex'>
            <img src={product.images[0]} alt={product.name} className='w-24 h-24 object-cover mb-4 rounded' />
            <div className='flex flex-col ml-2'>
              <h2 className='text-xl font-bold mb-2 text-[#000] line-clamp-1'>{product.name}</h2>
              <p className='text-[#4A4A4A] mb-4 font-bold'>{product.price}</p>
            </div>
          </div>
          <div className='relative'>
            <button className='rounded bg-[#EFEFEF] p-2 cursor-pointer' onClick={handleOpenModal}>
              <HiDotsHorizontal />
            </button>
            {openModal && (
              <div className='absolute top-8 right-0 bg-whiteColor p-2 w-28 rounded-lg border border-grayColor'>
                <div className='pb-3 p-1'>
                  <button className='hover:text-redColor cursor-pointer ml-2' onClick={handleDeleteClick}>
                    <div className='flex items-center justify-center'>
                      <span> Delete </span>
                      <RiDeleteBin6Line className='ml-2' />
                    </div>
                  </button>
                </div>
                <div className='pb-3 p-1'>
                  <Link
                    to={`/seller/products/edit-product/${product.id}`}
                    className='hover:text-skyBlueText cursor-pointer'
                  >
                    <div className='flex items-center justify-center'>
                      <span> Update </span>
                      <FaRegEdit className='ml-2' />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <h3>Summary</h3>
        <p className='text-[#7A7A7A] mb-4 line-clamp-1'>{product.description}</p>
        <div className='border p-3 border-[#E0E0E0] rounded'>
          <div className='flex justify-between items-center mb-2'>
            <span className='font-light text-sm'>Sales</span>
            <span className='font-light text-sm text-[#999]'>{product.sales}</span>
          </div>
          <div className='border-b border-[#E0E0E0] my-3'></div>
          <div className='flex justify-between items-center'>
            <span className='font-light text-sm'>Remaining Products</span>
            <span className='font-light text-sm text-[#999]'>{product.remaining}</span>
          </div>
        </div>
      </div>
    </>
  );
};
