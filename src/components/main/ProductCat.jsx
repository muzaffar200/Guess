import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCategory, getSubCategory } from '../../service/api';
import Filter from './Filter';
import { FilterData } from '../../context/FilterContext';
import { HiOutlineInboxStack } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { DATA } from '../../context/DataContext';
import { Basket } from '../../context/BasketContext';


function ProductCat() {
    const [Viwe, SetViwe] = useState(false)
    const [Featured, SetFeatured] = useState(false)
    const [SubidData, SetSubidData] = useState(null)
    const { subId, catId } = useParams()
    const [CardLayout, SetCardLayout] = useState(4)
    const [searchParams, setSearchParams] = useSearchParams();
    const { toggleFilter, OpenFilter } = useContext(FilterData)
    const { addToWishlist, wishlistDATA } = useContext(DATA)
    const { addToBasket } = useContext(Basket)
    const [togglePopup, SetTogglePopup] = useState([])
    const [selectedColor, setSelectedColor] = useState({})

    const Page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 10;
    const size = searchParams.get('size') || ''
    const color = searchParams.get('color') || ''
    const discount = searchParams.get('discount') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const sortOrder = searchParams.get('sortOrder') || 'asc'




    useEffect(() => {
        subId ? getSubCategory(subId, limit, Page, size, color, discount, minPrice, maxPrice,sortOrder).then(res => SetSubidData(res)) :
            getCategory(catId, limit, Page, size, color, discount, minPrice, maxPrice,sortOrder).then(res => SetSubidData(res))


    }, [catId, subId, limit, Page, size, color, minPrice, maxPrice,sortOrder])


    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);
    function changePage(increment) {
        const params = Object.fromEntries(searchParams)
        const newPage = parseInt(Page) + increment;
        if (newPage > 0 && newPage <= (SubidData?.meta.totalPages || 0)) {
            setSearchParams({ ...params, 'page': newPage });
        }
    }

    function addSize(selecSize) {
        const params = Object.fromEntries(searchParams)
        const sizes = params.size ? params.size.split(',') : []
        const updatedSizes = sizes.includes(selecSize) ? sizes.filter(i => i !== selecSize) : [...sizes, selecSize]
        if (updatedSizes != '') {
            setSearchParams({ ...params, 'size': updatedSizes.join(','), 'page': 1 })
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
        if (updatedColors != '') {

            setSearchParams({ ...params, 'color': updatedColors.join(','), 'page': 1 })
        }
        else {
            searchParams.delete('color')
            setSearchParams(searchParams)
        }
    }
    function addLimit(limit) {
        const params = Object.fromEntries(searchParams)
        setSearchParams({ ...params, 'limit': limit, page: 1 })
    }
    function addDiscount() {
        const params = Object.fromEntries(searchParams)
        if (params.discount) {
            searchParams.delete('discount')
            setSearchParams(searchParams)
        }
        else {
            setSearchParams({ ...params, 'discount': true, 'page': 1 })
        }
    }
    function addPrice(min, max) {
        const params = Object.fromEntries(searchParams)
        if (params.maxPrice == max && params.minPrice == min) {
            searchParams.delete('maxPrice')
            searchParams.delete('minPrice')
            setSearchParams(searchParams)
        }
        else {
            setSearchParams({ ...params, 'minPrice': min, 'maxPrice': max, 'page': 1 })
        }
    }

    function addSort(order) {
        const params = Object.fromEntries(searchParams)
        setSearchParams({ ...params, 'sortOrder': order})
    }
    function cardPopup(id) {
        const test = togglePopup.includes(id)
        if (test) {
            SetTogglePopup(togglePopup.filter((item) => item !== id))
        }
        else {
            SetTogglePopup([...togglePopup, id])
        }
    }
    function handlePopup(id, colors) {
        cardPopup(id)
        setSelectedColor({ ...selectedColor, [id]: colors[0] })
    }
    function handleColorChange(color, id) {
        setSelectedColor({ ...selectedColor, [id]: color })

    }
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
                                <p onClick={() => { addLimit(5) }} className='py-[5px] cursor-pointer'>Viwe 5</p>
                                <p onClick={() => { addLimit(10) }} className='py-[5px] cursor-pointer'>Viwe 10</p>
                                <p onClick={() => { addLimit(15) }} className='py-[5px] cursor-pointer'>Viwe 15</p>
                            </div>
                        </div>

                        <div className='flex items-center max-1024:hidden '>
                            <IoIosArrowBack onClick={() => { changePage(-1) }} className='cursor-pointer' />
                            <select value={Page} className=' outline-none' onChange={(e) => { setSearchParams({ 'page': e.target.value }) }} >
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
                            <span onClick={() => { SetCardLayout(2) }} className=' cursor-pointer px-[5px]'>2</span>
                            <span onClick={() => { SetCardLayout(4) }} className=' cursor-pointer px-[5px] border-l border-r'>4</span>
                            <span onClick={() => { SetCardLayout(6) }} className=' cursor-pointer px-[5px]'>6</span>
                        </div>
                        <div className=''>
                            <p onClick={() => { SetFeatured(!Featured) }} className=' cursor-pointer flex items-center underline max-1024:hidden '>Featured <IoIosArrowDown className='ml-[5px]' /></p>
                            <div className={`bg-white border px-[10px]  z-40 absolute top-[23px] w-full left-0   ${Featured ? 'block' : 'hidden'}`} >
                                <p onClick={()=>{addSort('asc')}} className='py-[5px] cursor-pointer'>Price: low to high</p>
                                <p onClick={()=>{addSort('desc')}} className='py-[5px] cursor-pointer'>Price: high to low</p>
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
                        <div className={`absolute px-[15px] filterrr top-0 left-0 transition-all  w-full duration-500 ease-in-out bg-[#fff] z-10  overflow-hidden   ${OpenFilter['MobilFilter'] ? 'max-h-auto' : 'max-h-0'}`}>
                            <div className='flex items-center justify-between pb-[30px] pt-[20px] border-b border-black'>
                                <span className='text-[18px]'>Filter</span>
                                <span className='text-[18px]'>{SubidData && SubidData.meta.totalProducts}Styles</span>
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
                            <Filter
                                title='Price'
                                isOpen={OpenFilter['Price']}
                                toggleFilter={() => toggleFilter("Price")}
                                type={'price'}
                                addPrice={addPrice}
                                maxPrice={maxPrice}
                                minPrice={minPrice}
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
                        <Filter
                            title='Price'
                            isOpen={OpenFilter['Price']}
                            toggleFilter={() => toggleFilter("Price")}
                            type={'price'}
                            addPrice={addPrice}
                            maxPrice={maxPrice}
                            minPrice={minPrice}

                        />
                    </div>
                </div>


                <div className='flex flex-wrap !gap-[16px] w-[80%]  m-0 p-0 max-1024:w-full' >
                    {
                        Array.isArray(SubidData?.data) && SubidData.data.length > 0 ? SubidData.data.map((item, i) => {
                            return (
                                <Link to={`/product/detalis/${item.id}`} key={i} className={` block border-box m-0 p-0 cardProduct !max-1024:flex-[0_1_calc((100%/4)-16px)]`} style={{ width: `calc((100% / ${CardLayout}) - 16px)`, transition: 'width 0.5s ease-in-out' }}>
                                    <div className='group relative'>
                                        <img className='' src={item.images[0]} alt="" />
                                        <img className=' absolute top-0 left-0 hidden group-hover:inline' src={item.images[1]} alt="" />
                                        <button
                                            onClick={(e) => { e.preventDefault(), handlePopup(item.id, item.Colors) }}
                                            className='absolute  text-[13px] right-[10px] bottom-[10px] border bg-white px-[11px] py-[4px] rounded-[5px]'
                                        >Add{togglePopup.includes(item.id) ? '-' : '+'}</button>
                                        <div
                                            style={{ display: togglePopup.includes(item.id) ? '' : 'none' }}
                                            className='w-[95%] p-[10px] rounded-[.3125rem] popupShadow  z-50 bg-[#f9f9f9]  absolute bottom-[-60wh] left-[50%] right-[50%] translate-x-[-50%]'>
                                            <p className='text-[16px] pt-[16px] pb-[8px]'>Select a color: </p>
                                            <div className='flex gap-[5px] cursor-pointer flex-wrap'>
                                                {
                                                    item.Colors.map((c, i) => {
                                                        return (
                                                            <>
                                                                <div key={i}
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        handleColorChange(c, item.id)
                                                                    }}
                                                                    className=' w-[30px] h-[30px] rounded-[50%] border border-[#bdbec0] relative'
                                                                    style={{ borderColor: c == selectedColor[item.id] ? 'black' : '' }}
                                                                >
                                                                    <div className=' w-[25px] h-[25px]  rounded-[50%] absolute  top-[50%] left-[50%]  transform -translate-x-1/2 -translate-y-1/2 translate-[50%]'
                                                                        style={{ backgroundColor: c }}
                                                                    >
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <p className='py-[10px]'>Select a size:</p>
                                            <div className='flex gap-[15px] text-[16px] underline'>
                                                {
                                                    item.Size.map((j, i) => <div onClick={(e)=>{e.preventDefault(),addToBasket(item.id,item.name,item.price,item.discount,selectedColor[item.id],j,item.images[0]),cardPopup(item.id)}}>{j}</div>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='allFont m-[5px]'>
                                        <div className='flex  justify-between  py-[7px]'>
                                            <p className=' !text-[15px] max-386:text-[12px] tracking-[.5px] '>{item.name} </p>
                                            <svg
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    addToWishlist(item)
                                                }}
                                                style={{
                                                    fill: wishlistDATA.find((j) => j.id === item.id) ? '#808284' : 'none'
                                                }}
                                                className="heart-icon m-[5px] shrink-0" width="19" height="19" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                        </div>
                                        <div className=' flex flex-wrap text-[14px] max-386:text-[13px] tracking-[.5px]'>
                                            <span className='mr-[5px]'>${(item.price - ((item.price * item.discount) / 100)).toFixed(2)}</span>
                                            <span className=' line-through mr-[10px] text-[#71767f] ' >${item.price}</span>
                                            <span className='text-[#71767f]' >({item.discount}% OFF)</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }) : (
                            <div className="  h-[80vh] w-full flex items-center justify-center" >
                                <div>
                                    {
                                        SubidData == null ?
                                            <div>
                                                <div className="flex items-center justify-center space-x-2">
                                                    <div className="w-8 h-8 rounded-full animate-pulse bg-pink-500"></div>
                                                    <div className="w-8 h-8 rounded-full animate-pulse bg-pink-500"></div>
                                                    <div className="w-8 h-8 rounded-full animate-pulse bg-pink-500"></div>
                                                </div>


                                            </div>
                                            :
                                            <>
                                                <HiOutlineInboxStack className='text-[35px] m-auto text-[#8a8a8b]' />
                                                <p className="text-[20px]">No data available</p>
                                            </>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='flex justify-center gap-[15px] pt-[40px]'>

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
                    <select className=' outline-none' value={Page} onChange={(e) => { setSearchParams({ 'page': e.target.value }) }} >
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