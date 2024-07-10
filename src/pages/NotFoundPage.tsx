import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import photo404 from '../assets/404_page.png';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen content-center mx-4'>
      <section className='text-center flex flex-col justify-center items-center h-96 mb-8'>
        <img className='h-96 w-auto mt-16' src={photo404} alt='page not found' />
        <h1 className='text-6xl font-bold mb-4'>Not Found</h1>
        <p className='text-xl mb-5'>
          Oops! ... Looks like this page does not exist in <b className='text-[#26a69a]'>MAVERICKS</b>
        </p>
        <div>
          <Link
            to='/'
            className='flex items-center text-whiteColor bg-greenColor hover:bg-darkGreen rounded-md px-3 py-2 mt-4 mr-4'
          >
            <FaHome className='mr-2' /> {/* Add Home icon */}
            Go Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center text-whiteColor bg-[#1e88e5] hover:bg-[#1976d2] rounded-md px-3 py-2 mt-4'
          >
            <FaArrowLeft className='mr-3.5' /> {/* Add Back icon */}
            Go Back
          </button>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
