import React, { useEffect, useState } from "react"
import Navbar from "../navbar/Navbar"
import CartItem from "./CartItem"
import { Link } from "react-router-dom"
import { ICartProduct, ICartsHookResponse, ICartsResponse } from "../../utils/schemas"
import { useGetCartsQuery } from "../../services/cartApi"

const Cart: React.FC = () => {
    const { data: carts, isLoading, isSuccess, isError, error } = useGetCartsQuery<ICartsResponse>() as ICartsHookResponse;
    const [totalPrice, setTotalPrice] = useState(0)
    const [items, setItems] = useState(0)

    useEffect(() => {
        if (isSuccess && carts) {
            // Calculate total price
            const calculatedTotalPrice = carts.cartProducts.reduce((total: number, cart: ICartProduct) => {
                const pricePerItem = cart.sizes[0]?.price || 0;
                const itemTotalPrice = pricePerItem * cart.quantity;
                return total + itemTotalPrice;
            }, 0);

            // Update total price state
            setTotalPrice(calculatedTotalPrice);

            // Optionally calculate the number of items if needed
            const totalItems = carts.cartProducts.length;
            setItems(totalItems);
        }
    }, [isSuccess, carts]);

    let content;
    if (isLoading) {
        content = <div>Loading</div>
    } else if (isSuccess) {
        const renderedCart = carts?.cartProducts.map((cart, index) => {
            const price = cart.sizes[0]?.price
            return <CartItem key={index} {...cart} price={price} />
        })
        content = renderedCart
    } else if (isError) {
        content = <div>{error?.toString()}</div>
    }
    return (
        <div className="w-full min-h-screen overflow-x-hidden font-roboto flex flex-col 2xl:items-center">
            <Navbar />
            <div className="w-full px-3 pt-5 flex flex-col gap-2 md:p-4 xl:px-10 2xl:w-[1440px]">
                <h1 className="leading-none font-semibold text-lg subpixel-antialiased tracking-wide">Shopping Cart ({items})</h1>
                <p className="leading-none subpixel-antialiased text-xs tracking-wide font-light hidden md:block">Your cart contains {items} items and comes to a total of ${totalPrice}</p>
                <div className="flex flex-col md:flex-row-reverse lg:gap-10 xl:gap-12">
                    <div className="flex flex-col gap-4 px-3 py-2 pt-4 md:flex-grow lg:w-72 lg:flex-grow-0 xl:flex-grow-0 xl:w-80">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="md:font-semibold md:text-lg">Total:</span>
                            <span className="md:font-semibold md:text-lg">${totalPrice}</span>
                        </div>
                        <Link to="/checkoutbag"
                            className="leading-none bg-greenColor hover:bg-[#1a6461] rounded-full px-5 py-3 text-whiteColor font-medium text-xs transition-all delay-75 ease-in cursor-pointer text-center"
                        >Checkout</Link>
                    </div>
                    <div className="bg-[#f7f7f7] flex flex-col py-3 mt-2 md:flex-grow">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart
