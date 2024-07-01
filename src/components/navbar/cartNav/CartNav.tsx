import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectAllCarts } from '../../../services/cartApi';

const CartNav: React.FC = () => {
    const carts = useSelector(selectAllCarts);

    return (
        <>
            <div className='absolute w-[360px] right-2 md:right-4 top-12 md:top-14 mt-2 z-[55] bg-whiteColor text-blackColor rounded-md border border-grayColor shadow-customShadow'>
                <h2 className='p-3'>{carts.length} Items in cart</h2>
                <div className='bg-[#f7f7f7] flex flex-col'>
                    <div className='flex flex-col overflow-auto h-56 scrollbar-hide'>
                        {carts.map((cart, index) => (
                            <div className="flex gap-1 p-3" key={index}>
                                <div className="h-24 min-w-[75px]">
                                    <img src={cart.image} alt="" className="w-full h-24" />
                                </div>
                                <div className="flex flex-col ml-3 w-full">
                                    <div className="flex justify-between font-semibold">
                                        <h3 className="leading-5 w-2/3 text-wrap capitalize text-sm break-words font-medium tracking-normal outline-none md:text-base">{cart.name}</h3>
                                        <span className="text-xs md:text-base">${cart.sizes[0]?.price}</span>
                                    </div>
                                    <div className="">
                                        <div className="flex flex-col gap-1 md:gap-1">
                                            <div className="flex gap-1 font-light text-xs items-center mt-1 md:gap-1">
                                                <label htmlFor="size" className="leading-none text-xs opacity-70">Size:</label>
                                                <span>{cart.sizes[0]?.size ? cart.sizes[0]?.size : 'One'}</span>
                                            </div>
                                            <div className="flex font-light items-center text-xs gap-1">
                                                <label htmlFor="quantity" className="leading-none text-xs opacity-70">Quantity:</label>
                                                <span>{cart.quantity}</span>
                                            </div>
                                            <span className='text-greenColor font-normal text-xs'>In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='px-3 py-2 mt-2'>
                    <div className='flex justify-between text-sm font-medium'>
                        <span>Total:</span>
                        <span>${carts.reduce((total, cart) => total + (cart.sizes[0]?.price * cart.quantity), 0).toFixed(2)}</span>
                    </div>
                    <div className='py-2 flex justify-center gap-3 mt-2'>
                        <NavLink to="/shoppingcart" className='flex-grow rounded-full border border-greenColor text-sm py-2 px-2 hover:border-[#1a6461] transition-all delay-75 ease-in cursor-pointer text-center'>View Cart</NavLink>
                        <NavLink to="/checkoutbag" className='flex-grow rounded-full border border-greenColor text-sm py-2 px-2 bg-greenColor text-whiteColor transition-all delay-75 ease-in cursor-pointer hover:bg-[#1a6461] text-center'>Checkout</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartNav;
