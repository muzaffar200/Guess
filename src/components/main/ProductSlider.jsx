import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
function ProductSlider({ Product,title }) {
    return (
        <div className='w-[95%] m-auto mb-[30px]'>
            <h2 className={`${title?'':'hidden'} text-[3rem] font-[200] text-center  FreightDis italic pt-[90px] pb-[30px]  max-768:text-[2.2rem] max-447:text-[1.9rem]`}>{title}</h2>

            <Swiper
                slidesPerView={2.5}
                spaceBetween={10}
                freeMode={{
                    enabled: true,
                    sticky: false,
                }}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    nextEl: '.custom-swiper-button-next',
                    prevEl: '.custom-swiper-button-prev',
                }}
                breakpoints={{
                    1000: {
                        slidesPerView: 4.5,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3.5,
                        spaceBetween: 10,
                    },

                    500: {
                        slidesPerView: 2.5,
                        spaceBetween: 10,
                    },
                    0: {
                        slidesPerView: 1.9,
                        spaceBetween: 10,
                    },
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Navigation, Mousewheel]}
                className="mySwiper"
            >
                {
                    Product && Product.data.map((item, i) => {
                        return (
                            <SwiperSlide>
                                <div className='text-center '>
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
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default ProductSlider