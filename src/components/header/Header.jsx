import React, { useContext, useState } from 'react'
import { DATA } from '../../context/DataContext'
import { IoIosSearch } from "react-icons/io";
import { MdClose } from 'react-icons/md';
import { HiMiniBars3 } from "react-icons/hi2";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Header() {
  const [categoryStyle, SetCategoryStyle] = useState(false)
  const { categoryAll,wishlistDATA } = useContext(DATA)
  const [DataSubcategory, setDataSubcategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(true)
console.log(wishlistDATA);

  return (
    <>
      <header className=' relative  border max-1024:border-0'>
        <div className='w-[95%] mx-auto  flex justify-between items-center '>
          <div className='flex items-center'>
            <Link to={'/'}>
              <img className='w-[111px] h-[20px] mr-[25px] max-1024:my-[13px]' src="/public/assets/img/logo-guess-header.svg" alt="GuessLogo" />
            </Link>
            <ul className='flex max-1024:hidden'>
              {
                categoryAll ? categoryAll.map((item, i) => <li key={i} className='group text-[.875rem] border-b border-b-transparent hover:border-b-[#000] tracking-[.2em] py-[18px]   mx-3 cursor-pointer '>{item.name}
                  <div className='absolute w-full top-[57px] left-0 group-hover:block hidden z-50 p-[30px] bg-[#fff] '>
                    <div className='flex'>
                      <ul className='!px-[80px]'>
                        <Link to={`/product/all/${item.id}`}><li className='font-[600] pb-[8px] hover:underline'>View all</li></Link>
                        {
                          item.Subcategory.map((s, i) => { return (<Link key={i} to={`/product/${s.id}`}><li className='py-[8px] hover:underline'>{s.name}</li></Link>) })
                        }
                      </ul>
                      <img className='w-[384px]' src={`/public/assets/img/headerList${i}.webp`} alt="" />
                    </div>
                  </div>
                </li>) : ''

              }
            </ul>
          </div>
          <div className='flex'>
            <p className=" text-[.81rem] px-[1em]  py-[5px] max-1024:hidden ">Hi, <a className="font-normal underline cursor-pointer" >Sign-in or register</a></p>
            <div className="flex items-center border-l-2 border-l-[#f2f2f2] gap-[15px] max-1024:border-0">
              <IoIosSearch className="text-[24px] ml-[10px] max-1024:text-[29px]" />
              <div className="relative mr-[5px]">
                <Link to={'/wishlist'}><IoMdHeartEmpty className="text-[24px] max-1024:text-[29px]" /></Link>
                <span className="absolute right-[-9px] top-[3px] max-1024:top-[6px] text-xs ">{wishlistDATA.length?wishlistDATA.length:''}</span>
              </div>
              <IoBagHandleOutline className="text-[24px] max-1024:text-[29px]" />

              {categoryStyle === false && (
                <HiMiniBars3
                  onClick={() => SetCategoryStyle(true)}
                  className="text-[24px] hidden max-1024:block max-1024:text-[29px]"
                />
              )}

              {categoryStyle === true && (
                <MdClose
                  onClick={() => SetCategoryStyle(false)}
                  className="text-[24px] hidden max-1024:block max-1024:text-[29px]"
                />
              )}
            </div>


          </div>
        </div>
        <div className={`absolute w-full font-[300] z-10 duration-300 bg-white  ${categoryStyle ? 'right-0' : 'hidden'}`}>
          <ul >
            <li className=' py-[10px] px-[30px] text-[1.2rem] border-b-2'><p className=" ">Hi, <a className=" font-[300] underline cursor-pointer" >Sign-in or register</a></p></li>
            {
              categoryAll && categoryAll.map((item, i) => <li key={i} onClick={() => { setDataSubcategory(item.Subcategory), setOpenSubcategory(!openSubcategory); }} className=' px-[30px] text-[1.2rem] tracking-[.05em] py-[10px] flex items-center justify-between border-b-2'>{item.name}<IoIosArrowForward /></li>)
            }
          </ul>
          <div className={`absolute h-full w-full   duration-300 font-[300] z-50 top-0 bg-white ${openSubcategory ? 'translate-x-full' : "-translate-x-0"}`} >
            <ul >
              <li onClick={() => { setOpenSubcategory(!openSubcategory) }} className='px-[30px] py-[15px] text-[20px]'><FaArrowLeft /></li>
              {
                DataSubcategory && DataSubcategory.map((item, i) => <li key={i} className=' px-[30px] text-[1.2rem] tracking-[.05em] py-[10px] border-b-2'>{item.name}</li>)
              }
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header