import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductId } from '../../service/api'
import { TfiLocationPin } from "react-icons/tfi";
import { LuShare } from "react-icons/lu";
import { PiPlantThin } from "react-icons/pi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { DATA } from '../../context/DataContext';
function Details() {
    const { addToWishlist,wishlistDATA } = useContext(DATA)
    const [singleProduct, SetsingleProduct] = useState(null)
    const { productId } = useParams()
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        productId ? getProductId(productId).then(res => SetsingleProduct(res)) : ''

    }, [productId])
    return (
        <main className='w-[95%] m-auto pt-[60px]'>
            {
                singleProduct ?
                    <div className='flex max-768:block'>
                        <div className='w-[80%] flex flex-wrap gap-[10px] max-1024:hidden'>
                            {
                                singleProduct.images.map((item, i) => {
                                    return (
                                        <img className='w-[49%]' src={item} alt="" />
                                    )
                                })

                            }
                        </div>

                        <div className='w-[50%]  flex-wrap gap-[10px] hidden max-1024:flex  max-768:w-full'>
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                            >
                                {
                                    singleProduct?.images?.map((item, i) => (
                                        <SwiperSlide key={i} className="w-full">
                                            <img className="w-full" src={item} alt={`Slide ${i + 1}`} />
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {
                                    singleProduct?.images?.map((item, i) => (
                                        <SwiperSlide key={i} className="w-full">
                                            <img className="w-full" src={item} alt={`Slide ${i + 1}`} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>

                        <div className='w-[400px] pl-[25px] max-768:w-full max-768:pl-0 max-768:pt-[30px]'>
                            <h1 className='font-[700] text-[20px] tracking-[1px]'>{singleProduct.name}</h1>
                            <div className='pt-[12px] pb-[20px] flex items-center gap-[3px]'>
                                <div className='text-[#018740] bg-[#f9f8f8]  tracking-[.0175rem]  h-[20px] rounded-[10px] flex items-center px-[8px] text-[12px]'>Sustainable</div>
                                <div className=' bg-[#f9f8f8]  tracking-[.0175rem]  h-[20px] rounded-[10px] flex items-center px-[8px] text-[12px]'>Extra 15% Off $ 150+ in Cart</div>

                            </div>
                            <div className='  text-[16px] tracking-[.5px]'>
                                <span className='mr-[5px] font-bold' >${singleProduct.price}</span>
                                <span className='line-through mr-[10px] text-[#71767f]'>${(singleProduct.price - ((singleProduct.price * singleProduct.discount) / 100)).toFixed(2)}</span>
                                <span className='text-[#71767f]' >({singleProduct.discount}% OFF)</span>
                            </div>
                            <div>
                                <div className='font-bold text-[15px] pt-[15px] pb-[8px]'>
                                    <span>Color:</span>
                                    <span>Red</span>
                                </div>
                                <div className='flex gap-[5px] cursor-pointer'>
                                    {
                                        singleProduct.Colors.map((item, i) => {
                                            return (
                                                <div className=' w-[35px] h-[35px] rounded-[50%] border border-[#bdbec0] relative'>
                                                    <div className=' w-[30px] h-[30px] bg-[red]  rounded-[50%] absolute  top-[50%] left-[50%]  transform -translate-x-1/2 -translate-y-1/2 translate-[50%]'
                                                        style={{ backgroundColor: item }}
                                                    >

                                                    </div>
                                                </div>

                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div className='text-[18px] py-[15px]'>
                                <div className='border-b   border-black py-[8px] flex items-center mb-[9px]'>
                                    <span className=''>Size:</span>
                                    <select className='w-full outline-none ml-[6px]'>
                                        {
                                            singleProduct ? singleProduct.Size.map((item, i) => {
                                                return (
                                                    <option value="">{item}</option>
                                                )
                                            }) : ''
                                        }

                                    </select>
                                </div>
                                <div className='border-b text-[18px]  border-black py-[8px] flex items-center'>
                                    <span className=''>Qty:</span>
                                    <select className='w-full text-[15px] outline-none ml-[6px]' name="" id="">

                                        {
                                            Array(10).fill('').map((_, i) => {
                                                return (
                                                    <option value="">{i + 1}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>

                            </div>
                            <div className='flex justify-center items-center my-[20px]  h-[44px]  rounded-[22px]  bg-black  border-black border-[2px] text-[#fff] hover:bg-transparent hover:text-[#000] cursor-pointer'>Add to bag</div>
                            <p className='text-[16px]'>4 interest-free payments of $18.90 with <span className='font-bold'>Klarna</span>.</p>

                            <div className='text-[18px] pt-[10px]'>
                                <div onClick={() => {
                                        addToWishlist(singleProduct)
                                    }} className='flex items-center  cursor-pointer '>
                                    <svg 
                                        style={{
                                            fill: wishlistDATA.find((j) => j.id === singleProduct.id) ? '#808284' : 'none'
                                        }}
                                        className="heart-icon" width="19" height="19" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span className='underline ml-[7px]'>Add to favorites</span>
                                </div>
                                <div className='flex items-center underline py-[7px] cursor-pointer'>
                                    <TfiLocationPin className='text-[#808284] text-[19px]' />
                                    <span className='underline ml-[7px]'>Free pick-up in-store</span>
                                </div>
                                <div className='flex items-center underline cursor-pointer'>
                                    <LuShare className='text-[#808284] text-[19px]' />
                                    <span className='underline ml-[7px]'>Share</span>
                                </div>
                            </div>
                            <p className='flex items-center w-full py-[15px]'>This product promotes <span className='underline ml-[5px]'>Sustainability </span><PiPlantThin className='text-[#018740] ml-[5px] text-[20px]' /></p>
                        </div>
                    </div>

                    : ''
            }

        </main>
    )
}

export default Details