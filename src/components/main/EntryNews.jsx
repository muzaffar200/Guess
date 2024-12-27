import React from 'react'
import { Link } from 'react-router-dom'

function EntryNews() {
  return (
    <>
      <div className=" relative  w-full">
        <img className='w-full h-auto max-768:hidden' src="/assets/img/G_Site_Home_ContentCenter_NovSS_9958_01.jpeg" alt="" />
        <img className='w-full h-auto hidden max-768:block ' src="/assets/img/G_Mobile_Home_ContentCenter_MOE_9961_01.avif" alt="" />
        <div className='absolute right-0 top-[50%] transform -translate-y-1/2  w-[42%] m-auto max-768:top-[20%] max-768:w-full'>
          <h1 className='text-[#423639] font-[300]  text-center  text-[70px] max-1278:text-[60px] max-1085:text-[55px] max-877:text-[45px] max-386:text-[38px]'>
            <span className='FreightDis  text-[50px] max-1085:text-[40px] max-877:text-[35px] max-386:text-[28px]' >
              <span className='luxurious-script-regular '>M</span>ember <span className='luxurious-script-regular ' > P</span>review
            </span>
            <p className='FreightDis'>
              <span className=''>30</span>
              <sup className='mr-[15px]'>%</sup>
              <span className=''>OFF</span>
            </p>
            <span className='FreightDis uppercase'>Entire Site</span>
          </h1>
          <div className='flex justify-center '>
            <Link to={'/product/1'}  className='mr-[35px] max-386:text-[.9rem] max-877:mr-[15px] text-[1rem] tracking-[.20rem] max-1085:tracking-[.05rem]  max-877:tracking-[.015rem]  border-b-2 border-b-[#423639] '>Shop Women's Apparel</Link>
            <Link to={'/product/all/4'} className=' text-[1rem] max-386:text-[.9rem] tracking-[.20rem] border-b-2 max-1085:tracking-[.05rem] max-877:tracking-[.015rem]  border-b-[#423639] '>Shop Handbags</Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default EntryNews