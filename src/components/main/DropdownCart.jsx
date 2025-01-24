import React, { useContext } from 'react'
import { Basket } from '../../context/BasketContext'
import { Link } from 'react-router-dom'
import { IoMdClose } from "react-icons/io"

function DropdownCart({ setShowCartDropdown }) {
    const { DATAbasket, BasketRemove, setDATAbasket } = useContext(Basket)
    function totalPrice() {
        return DATAbasket.reduce((acc, item) => {
            const discountedPrice = item.price - (item.price * item.discount) / 100;
            return acc + discountedPrice * item.quantity
        }, 0).toFixed(2)
    }
    function changeQuantity(qty, id) {
        let updatedBasket = [...DATAbasket]
        const index = updatedBasket.findIndex((item, i) => item.id == id)
        updatedBasket[index].quantity = qty
        setDATAbasket(updatedBasket)
        localStorage.setItem('basket', JSON.stringify(updatedBasket))
    }
    function getTotalItems() {
        return DATAbasket.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    }

    return (
        <div
            onMouseLeave={() => { setShowCartDropdown(false) }}
            className=' max-1024:hidden w-[400px] p-[20px]  z-[1000] top-[58px] bg-white right-0 border absolute'>
            <div className='flex justify-between border-b pb-[7px]'>
                <p className='font-bold text-[18px]'>Shopping bag <span>({getTotalItems()})</span></p>
                <Link to={'/cart'} onClick={() => { setShowCartDropdown(false) }} className='underline'>View shopping bag</Link>
            </div>
            {
                DATAbasket && DATAbasket.length == 0 ?
                    <div className='center text-center'>
                        <p className='border-b py-[20px]'>You have no items in your bag.</p>
                        <p className='border-b py-[20px] text-blue-600'>Free shipping on All orders</p>
                    </div>
                    : <div className=' overflow-y-scroll py-[15px] max-h-[350px]'>
                        {

                            DATAbasket ? DATAbasket.map((item, i) => {
                                return (

                                    <div key={i} className='flex border-b py-[15px]  w-full relative '>
                                        <Link to={`/product/detalis/${item.id}`} ><img className='w-[135px]' src={item.img} alt="" /> </Link>
                                        <div className='pl-[10px]  w-full'>
                                            <div className='  text-[15px] max-1024:text-[15px] tracking-[.5px]'>
                                                <span className=' font-bold mr-[5px] '>${(item.price - ((item.price * item.discount) / 100)).toFixed(2)}</span>
                                            </div>
                                            <p className='text-[16px] mb-[5px]'>{item.name}</p>
                                            <div className='text-[13px] '>
                                                <p className=''>Color:<span className='ml-[3px]'>{item.color}</span></p>
                                                <div className='  '>
                                                    <p className=' text-[15px]'>Size: <span>{item.size}</span></p>
                                                    <p className='text-[14px]'>Qty:
                                                        <select value={item.quantity} onChange={(e) => { changeQuantity(e.target.value, item.id) }} className='w-[38px]' name="" id="">
                                                            {
                                                                Array(10).fill('').map((_, index) => {
                                                                    return (
                                                                        <option key={index} value={index + 1}>{index + 1}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex justify-end font-bold pt-[10px] mr-[8px]'>
                                                <span>Item total:<span className='text-[14px] ml-[3px]'>${((item.price - ((item.price * item.discount) / 100)) * item.quantity).toFixed(2)}</span></span>
                                            </div>
                                        </div>
                                        <IoMdClose onClick={() => { BasketRemove(item.id, item.color, item.size) }} className='absolute top-[25px] right-[8px] cursor-pointer' />

                                    </div>
                                )
                            }) : ''
                        }
                    </div>
            }

            {
                DATAbasket && DATAbasket.length != 0 ?
                    <div>
                        <div className='flex justify-between py-[10px] font-bold'>
                            <p className='text-[18px]'>Estimated total</p>
                            <p>${totalPrice()}</p>
                        </div>
                        <div className='flex justify-between gap-2 py-[10px]'>
                            <Link
                                onClick={() => { setShowCartDropdown(false) }}
                                to={'/cart'}
                                className=' w-1/2 cursor-pointer bg-black h-[45px] rounded-[22.5px] border-2 border-black flex items-center justify-center hover:bg-[#fff]  group'>
                                <p className='text-[#fff] font-bold tracking-[1.96px] group-hover:text-[#000]'>Shopping bag</p>
                            </Link>
                            <Link to={'/checkout'} className=' w-1/2  cursor-pointer bg-white h-[45px] rounded-[22.5px] border-2 border-black flex items-center justify-center hover:bg-[#000]  group'>
                                <p className='text-[#000] font-bold tracking-[1.96px] group-hover:text-[#fff]'>Checkout</p>
                            </Link>
                        </div>
                    </div>:''
}
        </div>
    )
}

export default DropdownCart