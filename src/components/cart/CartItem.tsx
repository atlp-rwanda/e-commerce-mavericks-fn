import React, { useEffect, useState } from 'react'
import { useUpdateCartMutation } from '../../services/cartApi'
interface CartItem {
    id: string,
    name: string,
    image: string,
    price: number,
    sizes: [],
    quantity: number
}
const CartItem: React.FC<CartItem> = ({ id, name, image, sizes, quantity }) => {
    const [itemTotalPrice, setItemTotalPrice] = useState(sizes[0].price * quantity)
    const [updateCart] = useUpdateCartMutation()
    const currentPrice = sizes[0].price;

    useEffect(() => {
        setItemTotalPrice(currentPrice * quantity);
    }, [quantity, currentPrice]);

    const addQty = (quantity, productId, sizeId) => {
        const newQuantity = quantity + 1;
        updateCart({ id, updatedCart: { productId, quantity: newQuantity, sizeId } })
    }
    const removeQty = (quantity, productId, sizeId) => {
        const newQuantity = quantity - 1;
        if (newQuantity > 0) {
            updateCart({ id, updatedCart: { productId, quantity: newQuantity, sizeId } })
        }
    }
    return (
        <>
            <div className="flex gap-1 border-b border-b-grayColor py-2 px-3">
                <div className="h-36 max-w-[98px] min-w-[100px]">
                    <img src={image} alt="" className="w-full h-36" />
                </div>
                <div className="flex flex-col gap-2 ml-3 w-full">
                    <div className="flex justify-between font-semibold">
                        <h3 className="leading-5 w-2/3 text-wrap capitalize text-sm break-words font-medium tracking-normal outline-none
                            md:text-lg">{name}</h3>
                        <span className="text-xs md:text-base">${itemTotalPrice}</span>
                    </div>
                    <div className="">
                        <div className="flex flex-col gap-2 md:gap-1">
                            <div className="flex flex-col gap-1 font-light mt-1 md:gap-1">
                                <label htmlFor="size" className="leading-none text-xs opacity-70">Size</label>
                                <div id="size" className="border border-greenColor rounded-full h-9 p-[6px] text-sm bg-whiteColor w-4/5 font-medium outline-none md:w-1/2 justify-start flex items-center leading-none px-3">
                                    {sizes[0].size !== null ? sizes[0].size : 'One'}
                                </div>
                            </div>
                            <div className="flex flex-col font-light gap-1 mt-2">
                                <label htmlFor="quantity" className="leading-none text-xs opacity-70">Quantity</label>
                                <div>
                                    <button
                                        onClick={() => removeQty(quantity, id, sizes[0].id)}
                                        className="border w-10 h-9 text-greenColor rounded-l-full bg-whiteColor cursor-pointer text-center"
                                    >-</button>
                                    <input type="text" value={quantity} className="h-9 w-9 border-t border-t-greenColor border-b text-center outline-none" />
                                    <button
                                        onClick={() => addQty(quantity, id, sizes[0].id)}
                                        className="border w-10 h-9 text-greenColor rounded-r-full bg-whiteColor cursor-pointer text-center"
                                    >+</button>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-2 flex-col sm:flex-row">
                                <button className="border border-greenColor rounded-full px-3 py-1 text-xs font-medium cursor-pointer">Save For Later</button>
                                <button className="border border-greenColor rounded-full px-3 py-1 text-xs font-medium cursor-pointer">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CartItem
