import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";

function Filter({ title, options, isOpen, toggleFilter, addOption, element, type, addDiscount, discount, addPrice, minPrice, maxPrice }) {
    const [input1, Setinput1] = useState('')
    const [input2, Setinput2] = useState('')
    const PriceNum = [25, 50, 100, 150, 200]

    return (
        <div className='border-b border-black py-[18px] relative'>
            <div onClick={() => { toggleFilter(title) }} className='flex justify-between items-center'>
                <p className='text-[17px] '>{title}</p>
                <IoIosArrowDown className={`text-[20px]  duration-500  ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>
            <div
                className={`transition-all duration-500 ease-in-out  overflow-hidden ${isOpen ? 'max-h-[300px]' : 'max-h-0'}`}
            >
                {
                    type == 'color' ?
                        options.map((item, i) => {
                            return (
                                <div key={i} onClick={() => { addOption(item) }} className='flex items-center mb-[5px] mt-[10px] cursor-pointer  '>
                                    <div className={`w-[16px] flex items-center justify-center h-[16px] rounded-[50%]  mr-[10px] `} style={{ backgroundColor: item, border: item == 'White' ? '1px solid #000' : '' }}>
                                        <FaCheck className={`text-[10px] text-[#fff] `} style={{ display: element.includes(item) ? 'block' : 'none', color: item == 'White' ? '#000' : '' }} />
                                    </div>
                                    <span className='text-[13px]'>{item}</span>
                                </div>
                            )
                        }) :
                        type == 'size' ?
                            options.map((item, i) => {
                                return (
                                    <div key={i} onClick={() => { addOption(item) }} className='flex items-center mb-[5px] mt-[10px] cursor-pointer'>
                                        <div className='w-[16px] flex items-center justify-center h-[16px] rounded-[50%] border border-black mr-[10px]' >
                                            <FaCheck className={`text-[10px] `} style={{ display: element.includes(item) ? 'block' : 'none' }} />
                                        </div>
                                        <span className='text-[13px]'>{item}</span>
                                    </div>
                                )
                            }) :
                            type == 'discount' ?
                                <div onClick={addDiscount} className="flex items-center py-[12px]">
                                    <div className='w-[16px] flex items-center justify-center h-[16px] rounded-[50%] border border-black mr-[10px]' >
                                        <FaCheck className={`text-[10px] `} style={{ display: discount ? 'block' : 'none' }} />
                                    </div>
                                    <span className='text-[14px]'>Discount</span>
                                </div>
                                :
                                type == 'price' ?
                                    <div>
                                        <div>
                                            {
                                                PriceNum.map((item, i) => {

                                                    return (
                                                        <div key={i} onClick={() => { addPrice(item, item * 2) }} className="flex items-center my-[8px]"  >
                                                            <div className='w-[16px] flex items-center justify-center h-[16px] rounded-[50%] border border-black mr-[10px]' >
                                                                <FaCheck className={`text-[10px] `} style={{ display: item == minPrice && item * 2 == maxPrice ? 'block' : 'none' }} />
                                                            </div>
                                                            <div className="text-[14px]">
                                                                <span>{item}$</span>
                                                                <span className="mx-[5px]">-</span>
                                                                <span>{item * 2}$</span>
                                                            </div>
                                                        </div>

                                                    )

                                                })
                                            }

                                        </div>
                                        <div>
                                            <p className="py-[15px]">Price range:</p>
                                            <div className=" flex items-center text-[15px]">
                                                <div className="flex border-b border-black">
                                                    <span>$</span>
                                                    <input type="number" className="w-[35px]  inp-price outline-none" onChange={(e) => { Setinput1(e.target.value) }} />
                                                </div>
                                                <FiMinus className="mx-[15px]" />

                                                <div className="flex border-b border-black">
                                                    <span>$</span>
                                                    <input type="number" className=" inp-price inp-price w-[35px] outline-none" onChange={(e) => { Setinput2(e.target.value) }} />
                                                </div>
                                                <span className="border-b border-black ml-[25px] cursor-pointer" onClick={()=>{addPrice(input1,input2)}}>Apply</span>
                                            </div>
                                        </div>
                                    </div>
                                    : ''



                }

            </div>
        </div>
    )
}







export default Filter