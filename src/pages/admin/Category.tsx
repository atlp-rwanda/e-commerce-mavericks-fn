import { FaRegEdit } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import AddCategoryModal, { ICategory } from '../../components/dashboard/AddCategoryModal';
import DeleteCategoryModal from '../../components/dashboard/DeleteCategoryModal';
import { useGetCategoryQuery } from '../../services/categoryApi';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setIsCreated } from '../../redux/slices/categorySlice';

export default function Category() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenModal = () => {
    setOpenAddModal(!openAddModal);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const { data, isLoading, isError, refetch } = useGetCategoryQuery({});
  const isCategoryCreated = useSelector((state: RootState) => state.category.isCreated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
    if (isCategoryCreated) {
      refetch();
      dispatch(setIsCreated(false));
    }
  }, [data, isCategoryCreated, refetch, dispatch]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {openAddModal && <AddCategoryModal openAddModal={openAddModal} handleOpenModal={handleOpenModal} />}
      {openDeleteModal && (
        <DeleteCategoryModal openDeleteModal={openDeleteModal} handleOpenDeleteModal={handleOpenDeleteModal} />
      )}
      <div
        className={`fixed inset-0 bg-blackColor opacity-50 z-40 ${openAddModal || openDeleteModal ? 'block' : 'hidden'}`}
      ></div>
      <div className='md:ml-64'>
        <div className='text-right mx-6 mt-5 flex justify-between'>
          <div className='flex items-center rounded bg-whiteColor p-2'>
            <CiSearch className='mr-1.5 text-[#A08D8D]' size={20} />
            <input
              type='text'
              placeholder='Search category'
              className='border-none outline-none'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='flex items-center bg-[#0B8A8A] hover:bg-greenColor rounded px-2'>
            <IoIosAddCircleOutline className='text-whiteColor' size={20} />
            <button className='text-whiteColor p-2 uppercase text-sm' onClick={handleOpenModal}>
              Add new category
            </button>
          </div>
        </div>
        <div className='shadow-md rounded-lg bg-[#F9F9F9] p-5 m-6 overflow-auto'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className=''>
                  <th className='pb-5 px-4'>Image</th>
                  <th className='pb-5 px-4'>Name</th>
                  <th className='pb-5 px-4'>Description</th>
                  <th className='pb-5 px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className='py-2 px-4 text-center'>
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={4} className='py-2 px-4 text-center'>
                      Error loading categories
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category, index) => (
                    <tr key={category.id} className={`${index % 2 === 0 ? 'bg-[#D9D9D9]' : ''}`}>
                      <td className='py-2 px-4'>
                        <img
                          src={category.image || 'https://via.placeholder.com/400'}
                          alt={category.name}
                          width={35}
                          height={35}
                          className='rounded object-cover'
                        />
                      </td>
                      <td className='my-2 mx-4'>{category.name}</td>
                      <td className='my-2 mx-4 line-clamp-1'>{category.description}</td>
                      <td className='my-2 px-4'>
                        <button className='mr-2'>
                          <FaRegEdit size={20} className='hover:text-darkGreen' />
                        </button>
                        <button onClick={handleOpenDeleteModal}>
                          <RiDeleteBin6Line size={20} className='hover:text-[#c75151]' />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
