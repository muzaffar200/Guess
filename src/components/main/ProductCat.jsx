import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { getCategory, getSubCategory } from '../../service/api';

function ProductCat() {
    const [Viwe, SetViwe] = useState(false)
    const [Featured, SetFeatured] = useState(false)
    const [limit, SetLimit] = useState('10')
    const [SubidData, SetSubidData] = useState(null)
    const [Page, SetPage] = useState(1)
    const { subId, catId } = useParams()

    useEffect(() => {
        subId ? getSubCategory(subId, limit, Page).then(res => SetSubidData(res)) :
            getCategory(catId, limit, Page).then(res => SetSubidData(res))
      
    }, [catId, subId, limit, Page])

    useEffect(() => {
        SetPage(1)
    }, [limit]);

    function changePage(a) {
        let newPage = Page + a
        newPage > 0 && SubidData.meta.totalPages >= newPage ? SetPage(newPage) : ''
    }
    return (
        <main className='w-[95%] m-auto'>
            <div className=' flex justify-end'>
                <div className=' w-[80%] pt-[70px] pb-[40px] flex justify-between  pl-[50px]'>
                    <span>({SubidData && SubidData.meta.totalProducts} styles)</span>
                    <div className='flex gap-[15px]'>
                        <div className='flex items-center relative'>
                            <div onClick={() => { SetViwe(!Viwe) }} className='flex items-center cursor-pointer'><span className='underline'>Viwe {limit}</span>
                                < IoIosArrowDown className='text-[17px] ml-[5px]' /></div>
                            <div className={`bg-white border px-[20px] absolute top-[33px] left-0 w-[100px] z-10 ${Viwe ? 'block' : 'hidden'}`} >
                                <p onClick={() => { SetLimit('5') }} className='py-[5px] cursor-pointer'>Viwe 5</p>
                                <p onClick={() => { SetLimit('10') }} className='py-[5px] cursor-pointer'>Viwe 10</p>
                                <p onClick={() => { SetLimit('15') }} className='py-[5px] cursor-pointer'>Viwe 15</p>
                            </div>
                        </div>
                        <div className='flex items-center '>
                            <IoIosArrowBack onClick={() => { changePage(-1) }} className='cursor-pointer' />
                            <select value={Page} onChange={(e) => { SetPage(Number(e.target.value)) }}>
                                {
                                    SubidData && Array(SubidData.meta.totalPages).fill("").map((item, i) => <option >{i + 1}</option>)
                                }
                            </select>
                            <span>of {SubidData && SubidData.meta.totalPages}</span>
                            <IoIosArrowForward onClick={() => { changePage(1) }} className='cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex items-center relative gap-[15px]'>
                        <div>
                            <span>View</span>
                            <span className=' px-[5px]'>2</span>
                            <span className=' px-[5px] border-l border-r'>4</span>
                            <span className=' px-[5px]'>6</span>
                        </div>
                        <div className=''>
                            <p onClick={() => { SetFeatured(!Featured) }} className=' cursor-pointer flex items-center underline '>Featured <IoIosArrowDown className='ml-[5px]' /></p>
                            <div className={`bg-white border px-[10px] absolute top-[23px] w-full left-0   ${Featured ? 'block' : 'hidden'}`} >
                                <p className='py-[5px]'>Price: low to high</p>
                                <p className='py-[5px]'>Price: high to low</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[20%] mr-[50px]'>
                    <div className='border-b border-black pt-[10px]  !pb-[20px]'>
                        <div className=' flex justify-between items-center '><p className='text-[17px]'>Size</p>< IoIosArrowDown className='text-[20px]' /></div>
                    </div>
                </div>
                <div className='flex flex-wrap gap-5 w-[80%]'>
                    {
                        SubidData && SubidData.data.map((item, i) => {
                            return (
                                <div className='text-center w-[18%] '>
                                    <div className='group relative'>
                                        <img className='' src={item.images[0]} alt="" />
                                        <img className=' absolute top-0 left-0 hidden group-hover:inline' src={item.images[1]} alt="" />
                                        <button className='absolute FuturaLight text-[13px] right-[10px] bottom-[10px] border bg-white px-[14px] py-[5px] rounded-[5px]'>Add</button>
                                    </div>
                                    <div className=' FuturaLight '>
                                        <p className='text-[14px] max-386:text-[12px] FuturaMedium'>{item.name}</p>
                                        <div className=' FuturaMedium !text-[12px] max-386:text-[10px]'><span>${(item.price - ((item.price * item.discount) / 100)).toFixed(2)}</span><span className='FuturaLight'>({item.discount}% OFF)</span></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}

export default ProductCat