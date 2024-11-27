import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useParams, useSearchParams } from 'react-router-dom';
import { getCategory, getSubCategory } from '../../service/api';
import Filter from './Filter';
import { FilterData } from '../../context/FilterContext';
import { HiOutlineInboxStack } from "react-icons/hi2";

function ProductCat() {
    const [Viwe, SetViwe] = useState(false)
    const [Featured, SetFeatured] = useState(false)
    const [SubidData, SetSubidData] = useState(null)
    const { subId, catId } = useParams()
    const [CardLayout, SetCardLayout] = useState(4)
    const [searchParams, setSearchParams] = useSearchParams();
    const { toggleFilter, OpenFilter, addColor, color } = useContext(FilterData)


    const Page = searchParams.get('page') || 1;

    const limit = searchParams.get('limit') || 10;
    const size = searchParams.get('size') || ''


    useEffect(() => {
        subId ? getSubCategory(subId, limit, Page, size, color.join(',')).then(res => SetSubidData(res)) :
            getCategory(catId, limit, Page, size, color.join(',')).then(res => SetSubidData(res))

    }, [catId, subId, limit, Page, size, color])



    function changePage(increment) {
        const newPage = parseInt(Page) + increment;
        if (newPage > 0 && newPage <= (SubidData?.meta.totalPages || 0)) {
            setSearchParams({ 'page': newPage });
        }
    }

    function addSize(selecSize) {
        const params = Object.fromEntries(searchParams)
        const sizes = params.size ? params.size.split(',') : []
        const updatedSizes = sizes.includes(selecSize) ? sizes.filter(i => i !== selecSize) : [...sizes, selecSize]
        updatedSizes != '' ? setSearchParams({ ...params, 'size': updatedSizes.join(',') }) :
            setSearchParams(searchParams.delete('size'))


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
                                <p onClick={() => { setSearchParams({ 'limit': 5, 'page': 1 }); }} className='py-[5px] cursor-pointer'>Viwe 5</p>
                                <p onClick={() => { setSearchParams({ 'limit': 10, 'page': 1 }); }} className='py-[5px] cursor-pointer'>Viwe 10</p>
                                <p onClick={() => { setSearchParams({ 'limit': 15, 'page': 1 }); }} className='py-[5px] cursor-pointer'>Viwe 15</p>
                            </div>
                        </div>

                        <div className='flex items-center '>
                            <IoIosArrowBack onClick={() => { changePage(-1) }} className='cursor-pointer' />
                            <select value={Page} onChange={(e) => { setSearchParams({ 'page': e.target.value }) }} >
                                {
                                    SubidData && Array(SubidData.meta.totalPages).fill("").map((item, i) => <option key={i} >{i + 1}</option>)
                                }
                            </select>
                            <span>of {SubidData && SubidData.meta.totalPages}</span>
                            <IoIosArrowForward onClick={() => { changePage(1) }} className='cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex items-center relative gap-[15px]'>
                        <div>
                            <span>View</span>
                            <span onClick={() => { SetCardLayout(2) }} className=' px-[5px]'>2</span>
                            <span onClick={() => { SetCardLayout(4) }} className=' px-[5px] border-l border-r'>4</span>
                            <span onClick={() => { SetCardLayout(6) }} className=' px-[5px]'>6</span>
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
                    <Filter
                        title='Size'
                        options={['S', 'M', 'L', 'XL', 'XXL']}
                        isOpen={OpenFilter['Size']}
                        toggleFilter={() => toggleFilter("Size")}
                        addOption={addSize}
                        type={'size'}
                        element={size.split(',')}
                    />
                    <Filter
                        title='Color'
                        options={['Green', 'Red', 'Blue', 'Yellow', 'Black', 'White', 'Orange', 'Purple', 'Indigo', 'Violet']}
                        isOpen={OpenFilter['Color']}
                        toggleFilter={() => toggleFilter("Color")}
                        addOption={addColor}
                        element={color}
                        type={'color'}
                    />
                </div>


                <div className='flex flex-wrap gap-[20px] w-[80%] '>
                    {
                        SubidData?.data?.length > 0 ? SubidData.data.map((item, i) => {
                            return (
                                <div key={i} className={`text-center `} style={{ width: `${(100 / CardLayout) - 1.5}% `, transition: 'width 0.5s ease-in-out' }}>
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
                        }) : (
                            <div className="absolute top-[50%] left-[50%] translate-x-[50%] translate-y-[50%]">
                                <HiOutlineInboxStack className='text-[35px] m-auto text-[#8a8a8b]' />
                                <p className="">No data available</p>
                            </div>
                        )

                    }
                </div>
            </div>
        </main>
    )
}

export default ProductCat