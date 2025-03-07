import React, { useContext, useEffect, useState } from 'react'
import { DATA } from '../../context/DataContext'
import { IoIosSearch } from "react-icons/io";
import { MdClose } from 'react-icons/md';
import { HiMiniBars3 } from "react-icons/hi2";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { getProductSearch } from '../../service/api';
import { Basket } from '../../context/BasketContext';
import DropdownCart from '../main/DropdownCart';

function Header() {
  const [categoryStyle, SetCategoryStyle] = useState(false)
  const { categoryAll, wishlistDATA } = useContext(DATA)
  const [DataSubcategory, setDataSubcategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(true)
  const [ToggleSearch, setToggleSearch] = useState(false)
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [searchValue, setsearchValue] = useState(false)
  const [viewAll, setViewAll] = useState('')
  const [SearchData, SetSearchData] = useState([])
  const { DATAbasket } = useContext(Basket)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchValue.length > 1) {
      getProductSearch(searchValue)
        .then(res => SetSearchData(res))
    }
  }, [searchValue])

  function toggleMenu() {
    if (categoryStyle) {
      document.body.style.overflow = ""
    }
    else {
      document.body.style.overflow = "hidden"
    }
    SetCategoryStyle(!categoryStyle)

  }
  function onMausCart(para) {

    if (window.location.pathname == '/cart'||window.location.pathname == '/checkout') {
      setShowCartDropdown()
    }
    else {
      setShowCartDropdown(para)
    }
  }
  function getTotalItems() {
    return DATAbasket.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
}


  return (
    <>
      <header className=' relative  border max-1024:border-0'>
        {showCartDropdown  ?
          <DropdownCart setShowCartDropdown={setShowCartDropdown} /> : ''
        }
        <div className='w-[95%] mx-auto   flex justify-between items-center '>
          <div className='flex items-center'>
            <Link to={'/'}>
              <img className='w-[111px] h-[20px] mr-[25px] max-1024:my-[13px]' src="/assets/img/logo-guess-header.svg" alt="GuessLogo" />
            </Link>
            <ul className='flex max-1024:hidden'>
              {
                categoryAll ? categoryAll.map((item, i) => <li key={i} className='group text-[.875rem] border-b border-b-transparent hover:border-b-[#000] tracking-[.2em] py-[18px]   px-3 cursor-pointer '>{item.name}
                  <div className='absolute w-full top-[57px] left-0 group-hover:block hidden z-50 p-[30px] bg-[#fff] '>
                    <div className='flex'>
                      <ul className='!px-[80px]'>
                        <Link to={`/product/all/${item.id}`}><li className='font-[600] pb-[8px] hover:underline'>View all</li></Link>
                        {
                          item.Subcategory.map((s, i) => { return (<Link key={i} to={`/product/${s.id}`}><li className='py-[8px] hover:underline'>{s.name}</li></Link>) })
                        }
                      </ul>
                      <img className='w-[384px]' src={`/assets/img/headerList${i}.webp`} alt="" />
                    </div>
                  </div>
                </li>) : ''

              }
            </ul>
          </div>
          <div className='flex relative '>
            <p className=" text-[.81rem] px-[1em]  py-[5px] max-1024:hidden flex items-center">Hi, <a className="font-normal underline cursor-pointer" >Sign-in or register</a></p>
            <div className="flex items-center border-l-2 border-l-[#f2f2f2] gap-[15px] max-1024:border-0">

              <div
                className={`absolute left-[-300px] w-[435px] max-1024:left-[-430px] ${ToggleSearch ? '' : 'hidden'} max-768:hidden`}>                <div className='flex items-center bg-white border-b'>
                  <input
                    onChange={(e) => { setsearchValue(e.target.value) }}
                    placeholder='Search'
                    type="text"
                    className='py-[5px] text-[18px] px-[10px] outline-none w-full border-black  bg-[#fff] ' />
                  <MdClose onClick={() => { setToggleSearch(!ToggleSearch) }}
                    className='text-[20px] text-[#979797] cursor-pointer' />
                </div>

                <div style={{ display: searchValue == false ? 'none' : 'block' }}
                  className='absolute overflow-y-scroll overflow-x-hidden  p-[10px] z-[500] bg-white  max-h-[300px] w-full  '>
                  {
                    SearchData.length > 0 && searchValue.length > 1 ? (
                      SearchData.map((item, i) => (
                        <div onClick={() => { navigate(`/product/detalis/${item.id}`), setToggleSearch(!ToggleSearch) }} key={i} className="flex cursor-pointer items-center mb-[15px]">
                          <img
                            className="w-16"
                            src={item.images[0]}
                          />
                          <div>
                            <p className="text-sm pl-3 my-1">{item.name}</p>
                            <div className="flex pl-[10px] items-center gap-1">
                              <p className="text-sm line-through ">{item.price}</p>
                              <p className="text-red-600 text-sm">${(item.price - ((item.price * item.discount) / 100)).toFixed(2)}</p>
                            </div>
                            <div className="flex pl-3 gap-2 mt-2 items-center">
                              <p>Colors:</p>
                              {
                                item.Colors.map((c, i) => <div key={i} className="rounded-[50%] w-4 h-4 " style={{ backgroundColor: c }}></div>)
                              }
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1 className='text-[18px] text-center'>The product you are looking for was not found</h1>
                    )
                  }



                </div>
              </div>
              <IoIosSearch onClick={() => { setToggleSearch(!ToggleSearch) }} className=" cursor-pointer text-[24px] ml-[10px] max-1024:text-[29px]" />
              <div className="relative mr-[5px]">
                <Link to={'/wishlist'}><IoMdHeartEmpty className="text-[24px] max-1024:text-[29px]" /></Link>
                <span className="absolute right-[-9px] top-[3px] max-1024:top-[6px] text-xs ">{wishlistDATA.length ? wishlistDATA.length : ''}</span>
              </div>
              <div
                onMouseEnter={() => onMausCart(true)}
                className="relative mr-[5px]
              ">
                <Link
                  to={'/cart'}
                  onClick={() => { setShowCartDropdown(false) }}
                ><IoBagHandleOutline className="text-[24px] max-1024:text-[29px]" /> </Link>
                <span className="absolute right-[-9px] top-[3px] max-1024:top-[6px] text-xs ">{getTotalItems() ?getTotalItems() : ''}</span>
              </div>
              {categoryStyle === false && (
                <HiMiniBars3
                  onClick={() => toggleMenu()}
                  className="text-[24px] hidden max-1024:block max-1024:text-[29px]"
                />
              )}

              {categoryStyle === true && (
                <MdClose
                  onClick={() => toggleMenu()}
                  className="text-[24px] hidden max-1024:block max-1024:text-[29px]"
                />
              )}
            </div>


          </div>
        </div>
        <div className={`absolute w-full font-[300] overflow-hidden z-10 duration-300 bg-white h-[100vh]  ${categoryStyle ? 'right-0' : 'hidden'}`}>
          <ul >
            <li className=' py-[10px] px-[30px] text-[1.2rem] border-b-2'><p className=" ">Hi, <a className=" font-[300] underline cursor-pointer" >Sign-in or register</a></p></li>
            {
              categoryAll && categoryAll.map((item, i) =>
                <li key={i} onClick={() => { setDataSubcategory(item.Subcategory), setOpenSubcategory(!openSubcategory), setViewAll(item.id),console.log(item.id);
                 }}
                  className=' px-[30px] text-[1.2rem] tracking-[.05em] py-[10px] flex items-center justify-between border-b-2'
                >{item.name}
                  <IoIosArrowForward /></li>)
            }
          </ul>
          <div className={`absolute h-full w-full   duration-300 font-[300] z-50 top-0 bg-white ${openSubcategory ? 'translate-x-full' : "-translate-x-0"}`} >
            <ul >
              <li onClick={() => { setOpenSubcategory(!openSubcategory) }} className='px-[30px] py-[15px] text-[20px]'><FaArrowLeft /></li>
              <li onClick={() => { toggleMenu(), navigate(`/product/all/${viewAll}`) }} className='block px-[30px] text-[1.2rem] tracking-[.05em] py-[10px] border-b-2'>View all</li>
              {
                DataSubcategory && DataSubcategory.map((item, i) => <li onClick={() => { toggleMenu(), navigate(`/product/${item.id}`) }} ><li key={i} className=' px-[30px] text-[1.2rem] tracking-[.05em] py-[10px] border-b-2'>{item.name}</li></li>)
              }
            </ul>
          </div>
        </div>
      </header>

      <div
        className={`${ToggleSearch ? '' : '!hidden'} hidden max-768:block`}>
        <div className='w-[95%] mx-auto '>
          <div className='flex items-center bg-white border-b'>
            <input
              onChange={(e) => { setsearchValue(e.target.value) }}
              placeholder='Search'
              type="text"
              className='py-[5px] text-[18px] px-[10px] outline-none w-full border-black  bg-[#fff] ' />
            <MdClose onClick={() => { setToggleSearch(!ToggleSearch) }}
              className='text-[20px] text-[#979797] cursor-pointer' />
          </div>
        </div>

        <div style={{ display: searchValue == false ? 'none' : 'block' }}
          className='absolute overflow-y-scroll overflow-x-hidden  p-[15px] z-[500] bg-white  max-h-[300px] w-full  '>
          {
            SearchData.length > 0 && searchValue.length > 1 ? (
              SearchData.map((item, i) => (
                <div onClick={() => { navigate(`/product/detalis/${item.id}`), setToggleSearch(!ToggleSearch) }} key={i} className="flex cursor-pointer items-center mb-[15px]">
                  <img
                    className="w-16"
                    src={item.images[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-sm pl-3 my-1">{item.name}</p>
                    <div className="flex pl-[10px] items-center gap-1">
                      <p className="text-sm line-through ">{item.price}</p>
                      <p className="text-red-600 text-sm">${(item.price - ((item.price * item.discount) / 100)).toFixed(2)}</p>
                    </div>
                    <div className="flex pl-3 gap-2 mt-2 items-center">
                      <p>Colors:</p>
                      {
                        item.Colors.map((c, i) => <div key={i} className="rounded-[50%] w-4 h-4 " style={{ backgroundColor: c, border: c == 'WHITE' ? '1px solid black' : '' }}></div>)
                      }
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className='text-[18px] text-center'>The product you are looking for was not found</h1>
            )
          }



        </div>
      </div>
    </>
  )
}

export default Header