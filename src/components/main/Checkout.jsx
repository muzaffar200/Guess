import React, { useContext, useState } from 'react'
import { Basket } from '../../context/BasketContext';
import { FaLock } from "react-icons/fa6";

function Checkout() {
    const { DATAbasket } = useContext(Basket)
    const [shippingOptions, setShippingOptions] = useState('')
    function totalPrice() {
        return DATAbasket.reduce((acc, item) => {
            const discountedPrice = item.price - (item.price * item.discount) / 100
            return acc + discountedPrice * item.quantity
        }, 0)
    }
    function getTotalItems() {
        return DATAbasket.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    }
    
    const shippingArr = [
        {
            'name': 'Standard',
            'price': 9.00,
            'desc': 'Standard 5-7 business days'

        },
        {
            'name': 'Second day',
            'price': 14.95,
            'desc': 'Second business day'

        },
        {
            'name': 'Next day',
            'price': 26.95,
            'desc': 'Next business day'
        }
    ]
    return (
        <div className='max-w-[820px] max-1024:max-w-[385px] max-386:max-w-[90%] m-auto tracking-[.5px]'>
            <div className='flex justify-between pt-[35px] flex-wrap'>
                <div className='w-1/2 max-1024:w-full px-[1.875rem] max-386:px-[0]'>
                    <div className=' pb-[15px] border-b  '>
                        <h2 className='font-bold pb-[15px]'>Your contact information</h2>
                        <div className='flex justify-between'>
                            <p>mmustafayev004@gmail.com</p>
                            <span className='underline'>Edit</span>
                        </div>
                    </div>
                    <form action="">
                        <div>
                            <h2 className='font-bold pt-[20px] pb-[15px]'>Shipping address</h2>
                            <input
                                className='  border-[#71767f] text-[#71767f]  py-[6px] w-full border-b outline-none'
                                type="text"
                                placeholder='First name'
                                required

                            />
                            <input
                                className='  mt-[15px] mb-[22px] border-[#71767f] text-[#71767f]  py-[6px] w-full border-b outline-none'
                                type="text"
                                placeholder='Last name'
                                required

                            />
                            <input
                                className='  my-[15px] border-[#71767f] text-[#71767f]  py-[6px] w-full border-b outline-none'
                                type="text"
                                placeholder='Address'
                                required

                            />
                            <label className='text-[#71767f] text-[12px] mb-[-5px]' htmlFor="myInput">Address continued</label>
                            <input
                                id='myInput'
                                className='border-[#71767f] text-[#71767f]  pb-[6px] w-full border-b outline-none'
                                type="text"
                                placeholder='Apt #, Floor, etc. (optional)'
                                required

                            />
                            <div className='flex justify-between gap-[20px]'>
                                <input
                                    className='  mt-[15px] mb-[22px] border-[#71767f] text-[#71767f]  py-[6px] w-1/2 border-b outline-none'
                                    type="text"
                                    placeholder='City'
                                    required
                                />
                                <input
                                    className='  mt-[15px] mb-[22px] border-[#71767f] text-[#71767f]  py-[6px] w-1/2 border-b outline-none'
                                    type="text"
                                    placeholder='State'
                                    required

                                />
                            </div>

                            <input
                                className='   mb-[22px] border-[#71767f] text-[#71767f]  py-[6px] w-full border-b outline-none'
                                type="text"
                                placeholder='Zip code'
                                required

                            />
                        </div>
                        <div>
                            <h2 className='font-bold max-1024:w-full  pb-[25px] pt-[10px]'>Shipping options [?]</h2>
                            {
                                shippingArr.map((item, i) => {
                                    return (
                                        <div
                                            onClick={() => { setShippingOptions(item) }}
                                            className='flex  cursor-pointer items-center justify-between border px-[20px] py-[15px]'>
                                            <div className='relative w-[16px] h-[16px] rounded-full border-2 border-black'>
                                                <div style={{ display: item.desc == shippingOptions.desc ? '' : 'none' }} className='bg-black w-[8px] h-[8px] rounded-full  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
                                            </div>
                                            <div>
                                                <p>{item.name}</p>
                                                <p className='text-[12px] text-[#969696]'>Arrives by Friday, Jan 24</p>
                                            </div>
                                            <span>${item.price.toFixed(2)}</span>
                                        </div>

                                    )
                                })
                            }


                        </div>
                        <button type="submit" className=' flex justify-center w-full  items-center my-[20px]  h-[44px]  rounded-[22px]  bg-black  border-black border-[2px] text-[#fff] hover:bg-transparent hover:text-[#000] cursor-pointer'>
                            Continue to billing
                        </button>

                    </form>


                </div>
                <div className='w-1/2 max-1024:w-full px-[1.875rem] max-386:px-0'>
                    <div className='border-b pb-[10px] mb-[20px]'>
                        <h3>Your bag ({getTotalItems()})</h3>
                    </div>
                    <div className='p-[15px] bg-[#eeeeee]'>
                        <p className='text-[17px] tracking-[.5px]  font-bold border-b border-black  py-[10px]'>Order summary</p>
                        <div className='flex items-center justify-between py-[10px]'>
                            <p>Subtotal</p>
                            <p>${totalPrice().toFixed(2)}</p>
                        </div>
                        <div
                            style={{ display: totalPrice() > 150 ? '' : 'none' }}
                            className='flex items-center justify-between  text-[#666]'>
                            <p>Extra 15% Off Orders $150+</p>
                            <span>-${((totalPrice() * 15) / 100).toFixed(2)}</span>
                        </div>
                        <div
                            style={{ display: shippingOptions.name != 'Standard' ? 'none' : '' }}
                            className=' pt-[8px]  text-[13px] text-[#666] flex items-center justify-between '>
                            <p>Free shipping</p>
                            <span>-$9.00</span>
                        </div>
                        <div className='flex items-center justify-between pb-[10px] pt-[20px]'>
                            <p>Estimated sales tax</p>
                            <span>--</span>
                        </div>
                        <div className=' items-center justify-between  pb-[10px]'>
                            <p className='font-bold'>Shipping option</p>
                            <div className=' py-[5px] text-[13px] text-[#666] flex items-center justify-between '>
                                <p>{shippingOptions.desc}</p>
                                <span>
                                    {shippingOptions?.price == '9.00'
                                        ? 'FREE'
                                        : shippingOptions?.price
                                            ? `$${shippingOptions.price}`
                                            : ''}
                                </span>
                            </div>
                        </div>
                        <div className='text-[17px] tracking-[.5px] font-bold flex items-center justify-between border-t border-black  py-[10px]'>
                            <p>Estimated total</p>
                            <span>$
                                <span>
                                    {
                                        totalPrice() > 150
                                            ? (
                                                totalPrice() - ((totalPrice() * 15) / 100) +
                                                (Number(shippingOptions?.price) === 9 ? 0 : (shippingOptions?.price ?? 0))
                                            ).toFixed(2)
                                            : (
                                                totalPrice() +
                                                (Number(shippingOptions?.price) === 9 ? 0 : (shippingOptions?.price ?? 0))
                                            ).toFixed(2)
                                    }
                                </span>

                            </span>
                        </div>
                    </div>
                    <p className='flex items-center  py-[15px]'> <FaLock className='mr-[5px]' /><span>We care about your security</span></p>
                </div>
            </div>
        </div>
    )
}

export default Checkout