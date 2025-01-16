import React, { useContext } from 'react'
import { FaLock } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoMdHeartEmpty } from "react-icons/io";
import { Basket } from '../../context/BasketContext';
import { IoMdClose } from "react-icons/io"
import { getProductId } from '../../service/api'
import { DATA } from '../../context/DataContext';

function ShoppingBag() {
    const { DATAbasket, BasketRemove, setDATAbasket } = useContext(Basket)
    const { wishlistDATA } = useContext(DATA)
    const { addToWishlist } = useContext(DATA)

    function MoveToFavorites(id) {
        getProductId(id).then(res => addToWishlist(res))
    }
    function getTotalItems() {
        return DATAbasket.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    }
    
    function totalPrice() {
        return DATAbasket.reduce((acc, item) => {
            const discountedPrice = item.price - (item.price * item.discount) / 100;
            return acc + discountedPrice * item.quantity
        }, 0).toFixed(2)
    }

    function chekWishlist(id) {
        return wishlistDATA.find((item, i) => item.id == id)
    }
    function changeQuantity(qty, id) {
        let updatedBasket = [...DATAbasket]
        const index = updatedBasket.findIndex((item, i) => item.id == id)
        updatedBasket[index].quantity = qty
        setDATAbasket(updatedBasket)
        localStorage.setItem('basket', JSON.stringify(updatedBasket))
    }

    return (
        <main>
            <div className='w-[970px] m-auto max-1024:max-w-[375px] max-447:max-w-[95%]'>
                <h1 className='pl-[15px] font-bold text-[17px] py-[20px]'>Shopping bag <span className='text-[#71767f] text-[15px]'>({getTotalItems()})</span></h1>
                {
                    DATAbasket.length > 0 ?
                        <div className='flex justify-between max-1024:block gap-[30px]'>
                            <div className='w-[60%] max-1024:w-full'>
                                <div className=' max-1024:block  relative'>
                                    {
                                        DATAbasket ? DATAbasket.map((item, i) => {
                                            return (

                                                <div key={i} className='flex border-b py-[25px] px-[15px]  w-full relative '>
                                                    <Link to={`/product/detalis/${item.id}`} ><img className='w-[175px] max-w-none max-1024:w-[120px]' src={item.img} alt="" /> </Link>
                                                    <div className='pl-[10px]  w-full'>
                                                        <div className='  text-[16px] max-1024:text-[15px] tracking-[.5px]'>
                                                            <span className=' font-bold mr-[5px] '>${(item.price - ((item.price * item.discount) / 100)).toFixed(2)}</span>
                                                            <span className='mr-[7px] text-[#71767f] line-through ' >{item.price}</span>
                                                            <span className='text-[#71767f]' >({item.discount}% OFF)</span>
                                                        </div>
                                                        <p className='text-[16px] mb-[30px]'>{item.name}</p>
                                                        <div className='text-[13px] '>
                                                            <p className=' underline border-b pb-[5px]'>Color:<span className='ml-[3px]'>{item.color}</span></p>
                                                            <div className=' border-b py-[5px] justify-between flex items-center '>
                                                                <span className='underline text-[15px]'>Size: <span>{item.size}</span></span>

                                                                <span className='text-[14px]'>Qty:
                                                                    <select
                                                                        value={item.quantity} // Bu, state-dən gələn current quantity ilə sinxron olmalıdır
                                                                        onChange={(e) => changeQuantity(e.target.value, item.id)} // Burada quantity-ni dəyişirik
                                                                        className="w-[50px]"
                                                                    >
                                                                        {Array(10).fill('').map((_, index) => (
                                                                            <option key={index} value={index + 1}>
                                                                                {index + 1}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{ display: chekWishlist(item.id) ? 'none' : '' }}
                                                            onClick={() => { MoveToFavorites(item.id), BasketRemove(item.id, item.color, item.size) }}
                                                            className='flex items-center text-[15px]  cursor-pointer gap-[7px] mt-[10px] '>
                                                            <IoMdHeartEmpty className='text-[17px]' />
                                                            <span className='underline'>Move to favorites</span>
                                                        </div>
                                                        <div className='flex justify-end font-bold pt-[25px]'>
                                                            <span>Item total:<span className='text-[14px] ml-[3px]'>${((item.price - ((item.price * item.discount) / 100)) * item.quantity).toFixed(2)}</span></span>
                                                        </div>
                                                    </div>
                                                    <IoMdClose onClick={() => { BasketRemove(item.id, item.color, item.size) }} className='absolute top-[25px] right-[2px] cursor-pointer' />

                                                </div>
                                            )
                                        }) : ''
                                    }
                                </div>
                            </div>
                            <div className='w-[40%] max-1024:w-full mt-[25px]'>
                                <div className='flex gap-[10px] mb-[15px]'>
                                    <div className='w-[50%] h-[50px] border border-black flex items-center justify-center rounded-[25px]'>
                                        <div className='flex'>
                                            <img className='w-[17px] h-[23px]' src="/assets/img/download (1).svg" alt="" />
                                            <img className='w-[72px] h-[23px]' src="/assets/img/download.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className='w-[50%] h-[50px] border border-black flex items-center justify-center rounded-[25px]'>
                                        <div className='flex'>
                                            <img className='h-[23px]' src="/assets/img/Screenshot 2024-12-20 214622.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <Link to={'/checkout'} className='  cursor-pointer bg-black h-[50px] rounded-[25px] border border-black flex items-center justify-center hover:bg-[#fff]  group   '>
                                    <p className='text-[#fff] font-bold tracking-[1.96px] group-hover:text-[#000]'>Checkout</p>
                                </Link>
                                <p className='text-[15px] tracking-[.5px] py-[20px]'>4 interest-free payments of $44.65 with <span className=' font-bold text-[17px]'>Klarna.</span></p>
                                <div className='text-[#666] border border-[#666] p-[15px] mb-[18px]'>
                                    <span>Free shipping</span>
                                </div>
                                <div className='p-[15px] bg-[#eeeeee]'>
                                    <p className='text-[17px] tracking-[.5px]  font-bold border-b border-black  py-[10px]'>Order summary</p>
                                    <div className='flex items-center justify-between py-[10px]'>
                                        <p>Subtotal</p>
                                        <p>${totalPrice()}</p>
                                    </div>
                                    <div
                                        style={{ display: totalPrice() > 150 ? '' : 'none' }}
                                        className='flex items-center justify-between pb-[20px] text-[#666]'>
                                        <p>Extra 15% Off Orders $150+</p>
                                        <span>-${((totalPrice() * 15) / 100).toFixed(2)}</span>
                                    </div>
                                    <div className='flex items-center justify-between pb-[10px]'>
                                        <p>Estimated sales tax</p>
                                        <span>--</span>
                                    </div>
                                    <div className='flex items-center justify-between  pb-[10px]'>
                                        <p>Shipping[?]</p>
                                        <p>FREE</p>
                                    </div>
                                    <div className='text-[17px] tracking-[.5px] font-bold flex items-center justify-between border-t border-black  py-[10px]'>
                                        <p>Estimated total</p>
                                        <span>${totalPrice() > 150 ? (totalPrice() - ((totalPrice() * 15) / 100)).toFixed(2) : totalPrice()}</span>
                                    </div>
                                </div>
                                <p className='flex items-center  py-[15px]'> <FaLock className='mr-[5px]' /><span>We care about your security</span></p>
                            </div>
                            <div>

                            </div>
                        </div> :
                        <div>
                            <p className='text-[17px] pb-[50px] pt-[30px] text-center'>You have no items in your bag.</p>
                            <div className='text-[17px]  p-[24px] text-center border-b border-t'>
                                Free shipping on All orders
                            </div>

                        </div>
                }
            </div>
        </main>
    )
}

export default ShoppingBag