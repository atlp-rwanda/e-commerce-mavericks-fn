import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { IoIosArrowUp } from 'react-icons/io';
import Input from '../common/Input';
import Button from '../common/Button';
import Select from '../common/Select';
import { IoClose } from 'react-icons/io5';
import { useCreateOrderMutation } from '../../services/orderApi';
import { useClearCartsMutation, useGetCartsQuery } from '../../services/cartApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressFields, addressSchema } from '../../utils/schemas';
import { usePaymentMutation } from '../../services/paymentApi';

const Checkout: React.FC = () => {
    const [newAddress, setNewAddress] = useState(false);
    const [addressAvailable, setAddressAvailable] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        country: '',
        city: '',
        phone: ''
    });
    const [createOrder, { isLoading: createOrderLoading }] = useCreateOrderMutation();
    const { data: carts, isLoading, isSuccess } = useGetCartsQuery();
    const [clearCarts] = useClearCartsMutation();
    const [payment, { isSuccess: paymentSuccess, data: paymentData }] = usePaymentMutation();

    const [totalPrice, setTotalPrice] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AddressFields>({ resolver: zodResolver(addressSchema) });

    useEffect(() => {
        if (isSuccess && carts) {
            const calculatedTotalPrice = carts.cartProducts.reduce((total, cart) => {
                const pricePerItem = cart.sizes[0]?.price || 0;
                const itemTotalPrice = pricePerItem * cart.quantity;
                return total + itemTotalPrice;
            }, 0);

            setTotalPrice(calculatedTotalPrice);
        }
    }, [isSuccess, carts]);

    const onAddressSubmit = async (orderAddress: { shippingAddress: string, country: string, city: string, phone: string }) => {
        const { shippingAddress, country, city, phone } = orderAddress;
        setShippingAddress({ address: shippingAddress, country, city, phone });
        setAddressAvailable(true);
        setNewAddress(false);
    };

    const handlePayment = async () => {
        if (!addressAvailable) {
            return; // Ensure address is available
        }

        // Create order
        const orderAddress = {
            shippingAddress1: shippingAddress.address,
            country: shippingAddress.country,
            city: shippingAddress.city,
            phone: shippingAddress.phone
        };

        const { data: createdOrder } = await createOrder(orderAddress);
        if (createdOrder.ok && createdOrder) {
            const orderId = createdOrder.order.id;
            const items = carts?.cartProducts.map(cart => ({
                id: cart.id,
                sizes: cart.sizes.map(size => ({
                    id: size.id,
                    quantity: cart.quantity
                }))
            }));

            // Initiate payment
            payment({ orderId, items });
        }
    };

    useEffect(() => {
        if (paymentSuccess && paymentData) {
            clearCarts({});
            window.location.replace(paymentData.url);
        }
    }, [paymentSuccess, paymentData, clearCarts]);

    let content;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        content = carts?.cartProducts.map((cart, index) => {
            const price = cart.sizes[0]?.price;
            const size = cart.sizes[0]?.size;
            const name = cart.name;
            return (
                <div key={index}>
                    <div className='flex items-center gap-2'>
                        <div className='flex w-[220px] gap-2'>
                            <img
                                src={cart.image}
                                className='w-14 h-20'
                            />
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm break-words line-clamp-2'>{name}</p>
                            </div>
                        </div>
                        <div className='flex-grow text-start'>{size ? size : 'One'}</div>
                        <div className='flex-grow text-start'>{cart.quantity}</div>
                        <div className='flex-grow text-end'>${price}</div>
                    </div>
                    <hr className='opacity-20' />
                </div>
            );
        });
    }

    return (
        <div className='relative'>
            {newAddress && (
                <div
                    onClick={e => {
                        if (e.target === e.currentTarget) {
                            setNewAddress(false);
                            return;
                        }
                    }}
                    className=' absolute w-full z-50 h-full bg-[#000000a3]'>
                    <div className='bg-whiteColor w-full h-full sm:w-4/6 md:w-[520px] relative'>
                        <button
                            onClick={() => setNewAddress(state => !state)}
                            className='absolute -right-12 p-2 cursor-pointer'>
                            <IoClose className='text-whiteColor text-4xl' />
                        </button>
                        <div className='bg-skyBlue px-5 py-3'>
                            <h3 className='font-lg text-xl leading-none'>Add Address</h3>
                        </div>
                        <form onSubmit={handleSubmit(onAddressSubmit)} className='flex flex-col gap-3 mt-5 p-5'>
                            <Input
                                id="shippingAddress"
                                label="Address Name (e.g: Uncle's House)"
                                type="text"
                                placeholder=''
                                {...register('shippingAddress')}
                                error={errors.shippingAddress && errors.shippingAddress?.message}
                            />
                            <Select
                                options={["Rwanda"]}
                                label="Country"
                                placeholder=''
                                {...register('country')}
                                error={errors.country && errors.country?.message}
                            />
                            <Input
                                id="City"
                                label="City"
                                type="text"
                                placeholder=''
                                {...register('city')}
                                error={errors.city && errors.city?.message}
                            />
                            <Input
                                id="phone"
                                label="Phone"
                                type="text"
                                placeholder=''
                                {...register('phone')}
                                error={errors.phone && errors.phone?.message}
                            />
                            <Button type='submit' text='Add And Use Address' className='bg-greenColor p-3 rounded-full text-whiteColor w-full mt-3' />
                        </form>
                    </div>
                </div>
            )}
            <div className="w-full min-h-screen overflow-x-hidden font-roboto flex flex-col 2xl:items-center">
                <Navbar />
                <div className="w-full px-3 pt-5 flex flex-col gap-2 md:p-4 lg:flex-row xl:px-10 2xl:w-[1440px]">
                    <div className=' flex flex-col gap-3 lg:flex-grow'>
                        <div className='flex flex-col gap-3 border-b pb-5 border-blackColor border-opacity-20'>
                            <div className='flex justify-between items-center bg-grayColor p-2 h-9 '>
                                <h3 className='leading-none font-medium text-base'>Total (Excl. Delivery)</h3>
                                <span className='text-sm font-normal'>${totalPrice.toFixed(2)}</span>
                            </div>
                            {addressAvailable ? (
                                <>
                                    <div className='flex flex-col gap-1 items-start mt-2'>
                                        <h3 className='font-medium text-base'>Delivery To</h3>
                                        <p className='text-sm font-normal'>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.country}</p>
                                        <button
                                            onClick={() => setNewAddress(state => !state)}
                                            className='text-sm text-greenColor font-medium underline'
                                        >Add New Address</button>
                                    </div>
                                    <div className='mt-2 flex flex-col gap-1'>
                                        <h3 className='font-medium text-base'>Choose your preferred delivery method</h3>
                                        <div className='flex gap-3'>
                                            <div className='rounded-md outline-none p-[6px] flex justify-start items-center gap-3  text-sm bg-[#007A7A] bg-opacity-40 border border-[#007A7A] border-opacity-40'>
                                                <input
                                                    type='radio'
                                                    name='deliveryMethod'
                                                    id='delivery'
                                                    className='transition delay-50 ease-in-out appearance-none h-2 w-2 outline outline-offset-2 outline-greenColor checked:bg-greenColor checked:rounded-full checked:border-transparent rounded-full'
                                                    checked
                                                />
                                                <label>{shippingAddress.address} delivery</label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className='flex flex-col gap-1 items-start mt-2'>
                                    <h3 className='font-medium text-base'>Delivery To</h3>
                                    <button
                                        onClick={() => setNewAddress(state => !state)}
                                        className='text-sm text-greenColor font-medium underline'
                                    >Add New Address</button>
                                </div>
                            )}
                        </div>
                        <div className='mt-2'>
                            <div className='flex flex-col items-start gap-2'>
                                <p className='text-xs'>I accept Mavericks terms and conditions</p>
                                <button
                                    type='button'
                                    className={`rounded-full text-center p-3 w-full select-none transition-all delay-75 sm:w-96 ${addressAvailable ? 'bg-greenColor text-whiteColor hover:bg-darkGreen' : ' bg-greenColor cursor-not-allowed text-whiteColor'}`}
                                    onClick={handlePayment}
                                    disabled={!addressAvailable}
                                >{createOrderLoading ? 'Processing...' : 'Continue to Payment'}</button>
                            </div>
                        </div>
                    </div>
                    <div className='lg:flex-grow'>
                        <div className='flex justify-between items-center bg-grayColor p-2 mt-5 h-9 lg:mt-0'>
                            <h3 className='leading-none font-medium text-base'>Your Order</h3>
                            <span className='text-sm font-normal'>
                                <IoIosArrowUp />
                            </span>
                        </div>
                        <div className='mt-1'>
                            <div className='flex flex-col gap-2'>
                                <ul className='flex gap-2 text-sm'>
                                    <li className='w-[220px]'>Item</li>
                                    <li className='flex-grow text-start'>Size</li>
                                    <li className='flex-grow text-start'>Quantity</li>
                                    <li className='flex-grow text-end'>Price</li>
                                </ul>
                                <div className='flex flex-col gap-3 text-sm'>
                                    {content}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col text-xs mt-4 gap-1'>
                            <div className='flex justify-between'>
                                <p>Order Value</p>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between font-medium'>
                                <p className='font-semibold'>Total (Excl.. Delivery)</p>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
