import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";

function PopupWishlist({ item, onClose,updatedWishlist }) {
    const [color, SetColor] = useState(item.Colors[0])
    const [size, SetSize] = useState(null)
    return (
        <div>
            <div className='   fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 opacity-1   bg-white w-[300px] '>
                <div className='p-[25px] px-[29px] pb-[30px] relative ' >
                    <p>{item.name}</p>
                    <p className='text-[14px] pt-[16px] pb-[8px]'>Color: <span>{ color}</span> </p>
                    <div className='flex gap-[5px] cursor-pointer'>
                        {
                            item.Colors.map((item, i) => {
                                return (
                                    <div key={i}
                                     className=' w-[30px] h-[30px] rounded-[50%] border border-[#bdbec0] relative'
                                     style={{borderColor:item==color?'black':''}}
                                     >
                                        <div onClick={() => { SetColor(item) }} className=' w-[25px] h-[25px]  rounded-[50%] absolute  top-[50%] left-[50%]  transform -translate-x-1/2 -translate-y-1/2 translate-[50%]'
                                            style={{ backgroundColor: item }}
                                        >
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='border-b border-black py-[8px] flex items-center mt-[20px] mb-[40px]'>
                        <span className=''>Size:</span>
                        <select
                            onChange={(e) => { SetSize(e.target.value), console.log(e.target.value) }}
                            className='w-full outline-none ml-[6px]'>
                            <option disabled selected value="">Select Size</option>
                            {
                                item.Size.map((item, i) => <option value={item}>{item}</option>)
                            }

                        </select>
                    </div>
                    <div onClick={()=>{updatedWishlist(color,size),onClose()}} className='flex justify-center items-center my-[20px] max-1024:my-0 h-[44px]  rounded-[22px]    bg- border-black border-[2px] text-[#000] hover:bg-black hover:text-[#fff] cursor-pointer'>Update</div>
                    <IoMdClose onClick={onClose} className='absolute top-[8px] right-[8px] cursor-pointer' />
                </div>
            </div>
            <div className='fixed top-0 bg-[black] opacity-[.5] w-full h-full'>
            </div>
        </div>
    )
}

export default PopupWishlist