import React from 'react'
import { Link } from 'react-router-dom';

interface WishNav {
    setWish: React.Dispatch<React.SetStateAction<boolean>>
}

const WishNav: React.FC<WishNav> = () => {
    return (
        <>
            <div className='absolute w-[280px] right-20 md:right-24 top-12 md:top-14 mt-2 bg-whiteColor text-blackColor rounded-md border border-grayColor shadow-customShadow p-3 px-4 flex flex-col gap-3 z-50'>
                <div className='flex justify-center items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6 md:size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <Link to="/" className='hover:underline font-light text-base'>My Account</Link>
                </div>
                <div className='flex flex-col justify-center items-center gap-2 font-light'>
                    <span>Not Ange?</span>
                    <button className='rounded-full py-1 px-2 font-normal text-center select-none border border-greenColor cursor-pointer w-full'>Sign Out</button>
                </div>
            </div>
        </>
    )
}

export default WishNav