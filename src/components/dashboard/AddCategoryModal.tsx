import { FaTimes } from 'react-icons/fa';
import { useCreateCategoryMutation } from '../../services/categoryApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { setIsCreated } from '../../redux/slices/categorySlice';
import CustomInput from './CustomInput';

export interface ICategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function AddCategoryModal({
  openAddModal,
  handleOpenModal,
}: {
  openAddModal: boolean;
  handleOpenModal: () => void;
}) {
  const [createCategory, { isSuccess, isLoading }] = useCreateCategoryMutation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsCreated(true));
      handleOpenModal();
    }
  }, [isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ICategory>();

  const onSubmit: SubmitHandler<ICategory> = async data => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image[0]);

    await createCategory(formData);
  };

  return (
    <>
      <div
        className={`${openAddModal ? 'block' : 'hidden'} fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className='relative p-5 w-10/12 mx-auto mt-28 max-w-md max-h-full'>
          <div className='relative bg-whiteColor rounded-lg shadow'>
            <div className='flex items-center justify-between p-4 md:p-5 border-b border-b-grayColor rounded-t'>
              <h3 className='text-xl font-semibold text-[#111827] text-center'>Add new category</h3>
              <button
                type='button'
                className='end-2.5 text-[#9CA3AF] bg-transparent hover:bg-[#E5E7EB] hover:text-[#111827] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
                onClick={handleOpenModal}
              >
                <FaTimes size={20} className='text-[#A08D8D]' />
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <div className='p-4 md:p-5'>
              <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <CustomInput
                    type='text'
                    id='name'
                    className='bg-[#f4f5f7] border-[#D1D5DB] text-[#111827] text-sm rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5'
                    placeholder='Name of category'
                    {...register('name')}
                  />
                </div>
                <div>
                  <textarea
                    className='bg-[#f4f5f7] border-[#D1D5DB] text-[#111827] text-sm rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5 h-44 resize-none'
                    placeholder='Description of category'
                    {...register('description')}
                  ></textarea>
                </div>
                <div>
                  <CustomInput
                    type='file'
                    id='image'
                    className='bg-[#f4f5f7] border-[#D1D5DB] text-[#111827] text-sm rounded-lg focus:ring-[#3B82F6] focus:border-[#3B82F6] block w-full p-2.5'
                    {...register('image')}
                  />
                </div>
                <button
                  type='submit'
                  className='w-full text-[#FFFFFF] hover:bg-[#1877F2] bg-[#377eda] focus:ring-4 focus:outline-none focus:ring-[#93C5FD] font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  {isSubmitting || isLoading ? 'Creating...' : 'Create'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
