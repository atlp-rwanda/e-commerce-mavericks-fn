import { FaTimes } from 'react-icons/fa';
import { BsExclamationCircle } from 'react-icons/bs';

export default function DeleteCategoryModal({
  openDeleteModal,
  handleOpenDeleteModal,
}: {
  openDeleteModal: boolean;
  handleOpenDeleteModal: () => void;
}) {
  return (
    <>
      <div
        className={`${openDeleteModal ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className='relative p-4 w-10/12 mx-auto mt-28 max-w-md max-h-full'>
          <div className='relative bg-whiteColor rounded-lg shadow'>
            <button
              type='button'
              className='absolute top-3 end-2.5 hover:bg-[#E5E7EB] hover:text-[#111827] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
              onClick={handleOpenDeleteModal}
            >
              <FaTimes size={20} className='text-[#A08D8D]' />
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='p-4 md:p-5 text-center'>
              <BsExclamationCircle className='w-14 h-14 text-[#9CA3AF] mx-auto mb-4' />
              <h3 className='mb-5 text-lg font-normal text-gray-500'>Are you sure you want to delete this category?</h3>
              <button
                type='button'
                className='text-whiteColor bg-[#DC2626] hover:bg-[#B91C1C] focus:ring-4 focus:outline-none focus:ring-[#FCA5A5] font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
              >
                Yes, I&apos;m sure
              </button>
              <button
                type='button'
                className='py-2.5 px-5 ms-3 text-sm font-medium text-[#1F2937] focus:outline-none bg-whiteColor rounded-lg border border-[#E5E7EB] hover:bg-[#F3F4F6] hover:text-[#1D4ED8] focus:z-10 focus:ring-4 focus:ring-[#F3F4F6]'
                onClick={handleOpenDeleteModal}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
