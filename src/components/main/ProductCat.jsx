import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useParams, useSearchParams } from 'react-router-dom';
import { getCategory, getSubCategory } from '../../service/api';
import Filter from './Filter';
import { FilterData } from '../../context/FilterContext';
import { HiOutlineInboxStack } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { PiX } from 'react-icons/pi';


function ProductCat() {
    const [Viwe, SetViwe] = useState(false)
    const [Featured, SetFeatured] = useState(false)
    const [SubidData, SetSubidData] = useState(null)
    const { subId, catId } = useParams()
    const [CardLayout, SetCardLayout] = useState(4)
    const [searchParams, setSearchParams] = useSearchParams();
    const { toggleFilter, OpenFilter } = useContext(FilterData)


    const Page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
    const size = searchParams.get('size') || ''
    const color = searchParams.get('color') || ''
    const discount = searchParams.get('discount') || ''

    useEffect(() => {
        subId ? getSubCategory(subId, limit, Page, size, color, discount).then(res => SetSubidData(res)) :
            getCategory(catId, limit, Page, size, color, discount).then(res => SetSubidData(res))

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
        if (updatedSizes != '') {
            setSearchParams({ ...params, 'size': updatedSizes.join(',') })
        }
        else {
            searchParams.delete('size')
            setSearchParams(searchParams)
        }

    }

    function addColor(selecColor) {
        const params = Object.fromEntries(searchParams)
        const colors = params.color ? params.color.split(',') : []
        const updatedColors = colors.includes(selecColor) ? colors.filter(i => i !== selecColor) : [...colors, selecColor]
        updatedColors != '' ? setSearchParams({ ...params, 'color': updatedColors.join(',') }) : setSearchParams(searchParams.delete('color'))
    }
    function addDiscount() {

        const params = Object.fromEntries(searchParams)
        if (params.discount) {
            searchParams.delete('discount')
            setSearchParams(searchParams)
        }
        else {
            setSearchParams({ ...params, 'discount': true })
        }

    }
    console.log(OpenFilter.MobilFilter)
    return (
        <main className='w-[95%] m-auto'>
            <div className=' flex justify-end'>
                <div className=' w-[80%] max-1024:w-full pt-[70px] pb-[40px] flex justify-between  pl-[40px] pr-[16px] max-1024:pl-0 '>
                    <span>({SubidData && SubidData.meta.totalProducts} styles)</span>
                    <div className='flex gap-[15px]'>
                        <div className='flex items-center relative max-1024:hidden'>
                            <div onClick={() => { SetViwe(!Viwe) }} className='flex items-center cursor-pointer'><span className='underline'>Viwe {limit}</span>
                                < IoIosArrowDown className='text-[17px] ml-[5px]' /></div>
                            <div className={`bg-white border px-[20px] absolute top-[33px] left-0 w-[100px] z-10 ${Viwe ? 'block' : 'hidden'}`} >
                                <p onClick={() => { setSearchParams({ 'limit': 5, 'page': 1 }); }} className='py-[5px] cursor-pointer'>Viwe 5</p>
                                <p onClick={() => { setSearchParams({ 'limit': 10, 'page': 1 }); }} className='py-[5px] cursor-pointer'>Viwe 10</p>
                                <p onClick={() => { setSearchParams({ 'limit': 15, 'page': 1 }); }} className='py-[5px] cursor-pointer'>Viwe 15</p>
                            </div>
                        </div>

                        <div className='flex items-center max-1024:hidden '>
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
                    <div className='flex items-center relative gap-[15px] '>
                        <div className='max-1024:hidden'>
                            <span>View</span>
                            <span onClick={() => { SetCardLayout(2) }} className=' px-[5px]'>2</span>
                            <span onClick={() => { SetCardLayout(4) }} className=' px-[5px] border-l border-r'>4</span>
                            <span onClick={() => { SetCardLayout(6) }} className=' px-[5px]'>6</span>
                        </div>
                        <div className=''>
                            <p onClick={() => { SetFeatured(!Featured) }} className=' cursor-pointer flex items-center underline max-1024:hidden '>Featured <IoIosArrowDown className='ml-[5px]' /></p>
                            <div className={`bg-white border px-[10px] absolute top-[23px] w-full left-0   ${Featured ? 'block' : 'hidden'}`} >
                                <p className='py-[5px]'>Price: low to high</p>
                                <p className='py-[5px]'>Price: high to low</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex max-1024:block'>
                <div className='w-[20%] max-1024:w-full mr-[50px] '>
                    <div className=' w-full  hidden max-1024:flex mb-[20px]  '>
                        <div className=' w-1/2  relative box-border border'>
                            <div onClick={() => { toggleFilter('Featured') }} className='flex items-center py-[10px]  pl-[10px]'>  <span className='mr-[5px]'>Sort by</span> <IoIosArrowDown /></div>
                            <div className={`absolute price top-[45px] left-0 z-10 bg-white w-full px-[10px] overflow-hidden  ${OpenFilter['Featured'] ? 'max-h-[100vh]' : 'max-h-0'}`}>
                                <p className='py-[5px]'>Price: low to high</p>
                                <p className='py-[5px]'>Price: high to low</p>
                            </div>
                        </div>
                        <div className=' w-1/2  relative '>
                            <div onClick={() => { toggleFilter('MobilFilter') }} className={`cursor-pointer  flex items-center  pl-[10px] border-l-0 border py-[10px] `} ><span className='mr-[5px]'>Filter</span> <IoIosArrowDown /></div>

                        </div>
                        <div className={`absolute px-[15px] filterrr top-0 left-0 transition-all  w-full duration-500 ease-in-out bg-[#fff] z-10 h-full overflow-hidden   ${OpenFilter['MobilFilter'] ? 'max-h-[100vh]' : 'max-h-0'}`}>
                            <div className='flex items-center justify-between pb-[30px] pt-[20px] border-b border-black'>
                                <span className='text-[18px]'>Filter</span>
                                <span className='text-[18px]'>28 Styles</span>
                                <IoMdClose className='text-[20px]' onClick={() => { toggleFilter('MobilFilter') }} />
                            </div>
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
                                element={color.split(',')}
                                type={'color'}
                            />
                            <Filter
                                title='Discount'
                                isOpen={OpenFilter['Discount']}
                                toggleFilter={() => toggleFilter("Discount")}
                                addDiscount={addDiscount}
                                type={'discount'}
                                discount={discount}
                            />
                        </div>
                    </div>
                    <div className='max-1024:hidden' >
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
                            element={color.split(',')}
                            type={'color'}
                        />
                        <Filter
                            title='Discount'
                            isOpen={OpenFilter['Discount']}
                            toggleFilter={() => toggleFilter("Discount")}
                            addDiscount={addDiscount}
                            type={'discount'}
                            discount={discount}
                        />
                    </div>
                </div>


                <div className='flex flex-wrap !gap-[16px] w-[80%]  m-0 p-0 max-1024:w-full' >
                    {
                        SubidData?.data?.length > 0 ? SubidData.data.map((item, i) => {
                            return (
                                <div key={i} className={`text-center border-box m-0 p-0 cardProduct !max-1024:flex-[0_1_calc((100%/4)-16px)]`} style={{ width: `calc((100% / ${CardLayout}) - 16px)`, transition: 'width 0.5s ease-in-out' }}>
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
            <div className='flex justify-center gap-[15px]'>

                <div className='flex items-center relative '>
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
        </main>
    )
}

export default ProductCat