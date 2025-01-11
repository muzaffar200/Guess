import React, { useContext, useEffect, useState } from 'react'
import { DATA } from '../../context/DataContext'
import { Link } from 'react-router-dom'
import { IoMdClose } from "react-icons/io"
import PopupWishlist from './PopupWishlist'
import { Basket } from '../../context/BasketContext'

function Wishlist() {
    const { addToWishlist, wishlistDATA, setwishlistDATA } = useContext(DATA)
    const [selectedItem, setSelectedItem] = useState(null)
    const [PopupVisible, setPopupVisible] = useState(false)
    const { addToBasket } = useContext(Basket)

    function handleEdit(item) {
        setSelectedItem(item)
        setPopupVisible(true)
    }
    function updatedWishlist(color, size) {
        if (size) {
            const index = wishlistDATA.findIndex((item, _) => item.id == selectedItem.id)
            wishlistDATA[index] = { ...wishlistDATA[index], 'Colors': color, 'Size': size }
            setwishlistDATA(wishlistDATA)
            localStorage.setItem('wishlist', JSON.stringify(wishlistDATA))
            setPopupVisible(false)
        }

    }

    return (
        <>
            <main className=' max-w-[800px] max-1024:max-w-[320px] m-auto'>
                <div>
                    <h1 className='font-bold text-[18px] border-b py-[25px] px-[15px]'>Favorites <span className='font-normal text-[14px]'>({wishlistDATA.length} Styles)</span></h1>
                    {
                        wishlistDATA.length > 0 ?
                            wishlistDATA.map((item, i) => {
                                return (
                                    <div key={i} className='flex max-1024:block border-b relative'>
                                        <div className='flex py-[25px] px-[15px] w-[475px] max-1024:w-full '>
                                            <Link to={`/product/detalis/${item.id}`} ><img className='w-[175px] max-1024:w-[120px]' src={item.images[0]} alt="" /> </Link>
                                            <div className='pl-[10px] pt-[15px]  w-full'>
                                                <div className='  text-[16px] max-1024:text-[15px] tracking-[.5px]'>
                                                    <span className=' font-bold mr-[5px] '>${(item.price - ((item.price * item.discount) / 100)).toFixed(2)}</span>
                                                    <span className='mr-[7px] text-[#71767f] line-through ' >{item.price}</span>
                                                    <span className='text-[#71767f]' >({item.discount}% OFF)</span>
                                                </div>
                                                <p className='text-[14px] mb-[30px]'>{item.name}</p>
                                                <div className='text-[13px] '>
                                                    <p className='border-b pb-[5px]'>Color: <span className='ml-[3px]'>{Array.isArray(item.Colors) ? item.Colors[0] : item.Colors}</span></p>
                                                    <div className=' border-b py-[5px] justify-between flex items-center '>

                                                        <span   className='underline text-[15px]'>
                                                            {Array.isArray(item.Size) ?
                                                                <span onClick={() => { handleEdit(item) }}>Select size</span> : <span>Size: {item.Size}</span>}
                                                        </span>

                                                        <span className='text-[14px]'>Qty:<span className='ml-[3px]'>1</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[328px] pt-[30px] max-1024:p-0 max-1024:w-full max-1024:px-[15px] max-1024:pb-[35px]'
                                            style={{ display: Array.isArray(item.Size) ? 'block' : 'none' }}

                                        >
                                            <div onClick={() => { handleEdit(item) }}
                                                className='flex justify-center items-center my-[20px] max-1024:my-0 h-[44px]  rounded-[22px]    bg-transparent  border-black border-[2px] text-[#000] hover:bg-black hover:text-[#fff] cursor-pointer'
                                            >Select a size</div>

                                        </div>
                                        <div
                                            onClick={() => { addToBasket(item.id, item.name, item.price, item.discount, item.Colors, item.Size, item.images[0]),addToWishlist(item) }}
                                            className='w-[328px] pt-[30px] max-1024:p-0 max-1024:w-full max-1024:px-[15px] max-1024:pb-[35px]'
                                            style={{ display: Array.isArray(item.Size) ? 'none' : 'block' }}
                                        >
                                            <div
                                                className='flex justify-center items-center my-[20px] max-1024:my-0 h-[44px]  rounded-[22px]    bg-transparent  border-black border-[2px] text-[#000] hover:bg-black hover:text-[#fff] cursor-pointer'
                                            >Add to bag</div>
                                        </div>
                                        <IoMdClose onClick={() => { addToWishlist(item) }} className='absolute top-[8px] right-[8px] cursor-pointer' />

                                    </div>
                                )
                            }) : ''
                    }
                </div>
            </main>
            {PopupVisible && selectedItem && (
                <PopupWishlist
                    item={selectedItem}
                    onClose={() => setPopupVisible(false)}
                    updatedWishlist={updatedWishlist}
                />

            )}
        </>
    )
}

export default Wishlist