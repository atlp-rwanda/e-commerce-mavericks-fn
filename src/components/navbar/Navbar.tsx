import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DesktopNav, PopularCategory } from '../../containers/nav/NavbarComponents';
import { useEffect } from 'react';
import WishNav from './wishNav/WishNav';
import CartNav from './cartNav/CartNav';
const Navbar: React.FC = () => {
    const [cartOpen, SetCartOpen] = useState(false)
    const [wish, setWish] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const humbergurBtn = document.getElementById('humbergurBtn');
        const closeBtn = document.getElementById('close');
        const overlay = document.getElementById('overlay');
        const container = document.getElementById('humbergerContainer');
        const hideScrollbar = () => {
            document.body.style.overflow = 'hidden';
        };
        const showScrollbar = () => {
            document.body.style.overflow = 'auto';
        };
        closeBtn?.addEventListener('click', () => {
            overlay?.classList.add('-translate-x-full');
            container?.classList.add('-translate-x-full');
            showScrollbar();
        });
        humbergurBtn?.addEventListener('click', () => {
            overlay?.classList.remove('-translate-x-full');
            container?.classList.remove('-translate-x-full');
            hideScrollbar();
        });
        overlay?.addEventListener('click', e => {
            if (e.target !== e.currentTarget) {
                return;
            }
            overlay?.classList.add('-translate-x-full');
            container?.classList.add('-translate-x-full');
            showScrollbar();
        });
    }, []);

    return (
        <>
            {
                (wish || cartOpen) && <div
                    onClick={(e) => {
                        if (e.target !== e.currentTarget) {
                            return
                        }
                        setWish(false)
                        SetCartOpen(false)
                    }}
                    className='absolute bg-[#00000000] top-0 w-full border h-full' style={{ zIndex: 10 }}></div>
            }
            <div className={`flex flex-col bg-blackColor md:bg-whiteColor md:text-blackColor text-whiteColor font-roboto w-full 2xl:items-center top-0 ${(wish || cartOpen) ? 'sticky' : ''} z-10`}>
                <div className='flex justify-between gap-2 flex-wrap p-3 md:p-4 xl:px-10 2xl:w-[1440px] relative'>
                    <div className='flex items-center gap-3 order-1'>
                        <div
                            id='humbergurBtn'
                            className='rounded-full p-1 text-txtColor active:bg-greenColor hover:bg-grayColor transition-all active:text-blackColor hover:text-blackColor md:hidden'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                className='size-7'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                                />
                            </svg>
                        </div>
                        <div
                            onClick={() => navigate('/')}
                            className='leading-none font-bold text-2xl hover:cursor-pointer md:text-3xl'
                        >
                            <h1>MAVERICKS🛒</h1>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 order-2 md:order-3'>
                        {/* Profile */}
                        <div
                            onClick={() => setWish(state => !state)}
                            className='rounded-full transition-all ease-in-out delay-100 hover:bg-grayColor active:bg-greenColor p-1 active:text-blackColor hover:text-blackColor'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6 md:size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            {wish && <div
                                onClick={(e) => {
                                    if (e.target !== e.currentTarget) {
                                        setWish(false)
                                        return
                                    }
                                }}
                                className='absolute top-0  md:h-[115px] w-screen right-0 h-[100px] bg-[#0000000] z-40'>
                                <WishNav setWish={setWish} />

                            </div>}
                        </div>
                        {/* Favorite */}
                        <NavLink to="shoppingcart"
                            className='rounded-full transition-all ease-in-out delay-100 hover:bg-grayColor active:bg-greenColor p-1  active:text-blackColor hover:text-blackColor relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6 md:size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />

                            </svg>
                            <span className='absolute top-1 right-1 w-2 h-2 rounded-full bg-redColor'></span>
                        </NavLink>
                        <div
                            onClick={() => SetCartOpen(state => !state)}
                            className='rounded-full transition-all ease-in-out delay-100 hover:bg-grayColor active:bg-greenColor active:text-blackColor hover:text-blackColor p-1 select-none'>
                            <div className='relative'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1}
                                    stroke='currentColor'
                                    className='size-6 md:size-8'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                                    />
                                </svg>
                                <span className='p-1 leading-none text-[9px] bg-redColor text-whiteColor rounded-full flex justify-center items-center w-5 h-5 md:w-6 md:h-6 md:text-xs absolute -top-1 -right-1 md:-right-2 md:-top-2'>
                                    3
                                </span>
                            </div>
                            {/* Cart */}
                            {cartOpen && <div
                                onClick={(e) => {
                                    if (e.target !== e.currentTarget) {
                                        SetCartOpen(false)
                                        return
                                    }
                                }}
                                className='absolute top-0  md:h-[115px] w-screen right-0 h-[100px] bg-[#00000000] z-40'>
                                <CartNav />

                            </div>}
                        </div>
                    </div>
                    {/* Searching box */}
                    <div className='order-3 md:order-2 w-full md:w-2/4'>
                        <form className='relative'>
                            <input
                                type='text'
                                className='w-full p-1 px-3 rounded-full text-blackColor outline-none text-xs py-2 md:text-sm md:py-2 font-light md:border md:border-blackColor'
                                placeholder='Search everything at Mavericks online'
                            />
                            <button className='text-blackColor absolute z-30 right-2 top-0 md:top-[3px] md:hover:bg-grayColor cursor-pointer p-1 rounded-full flex justify-center items-center transition-all ease-in delay-100 active:text-blackColor hover:text-blackColor'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='size-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
                {/* Desktop Navs */}
                <DesktopNav />
                {/* Mobile sidebar Navs */}
                <div
                    id='overlay'
                    className=' w-full h-screen z-40 bg-overlay absolute -translate-x-full transition-transform ease-linear'
                >
                    <div
                        id='humbergerContainer'
                        className='bg-whiteColor py-2 w-4/5 text-blackColor flex flex-col select-none h-screen overflow-auto -translate-x-full transition-transform duration-500 ease-in-out'
                    >
                        {/* close */}
                        <div className=' flex justify-end p-2'>
                            <div
                                id='close'
                                className='p-2 rounded-full active:bg-grayColor hover:bg-grayColor hover:cursor-pointer transition-all ease-in-out delay-75'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1}
                                    stroke='currentColor'
                                    className='size-8'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <PopularCategory title='Popular Categores' />
                            <PopularCategory title='shopping inspiration' />
                            <PopularCategory title='shopping inspiration' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar