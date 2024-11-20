import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
function OurBest() {
    return (
        <>
            <div className='pb-[50px]'>
                <h2 className='text-[3rem] font-[200] text-center  FreightDis italic py-[25px] max-768:text-[2.2rem] max-447:text-[1.9rem]'>Our Best Event of the Year</h2>
                <div className='w-[95%] mx-auto '>
                    <div >

                        <Swiper
                            slidesPerView={2.5}
                            spaceBetween={10}
                            freeMode={{
                                enabled: true, // Paralel hərəkəti aktiv et
                                sticky: false, // Sürüşdürmə zamanı ən yaxın slayda yapışmasın
                            }}
                            mousewheel={{
                                forceToAxis: true, // Yalnız horizontal scroll üçün
                                sensitivity: 1, // Scroll sürətini idarə edir
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={{
                                nextEl: '.custom-swiper-button-next',
                                prevEl: '.custom-swiper-button-prev',
                            }}
                            breakpoints={{
                                768: { // 768px-dən böyük ekranlar üçün 6 slayd
                                    slidesPerView: 6,
                                    spaceBetween: 10,
                                },
                                0: { // 768px-dən kiçik ekranlar üçün 2 slayd
                                    slidesPerView: 2.5,
                                    spaceBetween: 10,
                                },
                            }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}

                            modules={[Navigation,Mousewheel]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className=' text-center'>
                                    <img className='w-full' src="public/assets/img/download.avif" alt="" />
                                    <span className=' mt-[7px] inline-block FreightDis tracking-[.1rem]  text-[20px] border-b-2 border-b-[#423639] max-1085:text-[16px]  max-1085:pb-[-3px]  max-768:text-[17px] max-1085:tracking-[.05rem] max-447:text-[13px]'>Women's Shirts</span>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>

                                <div className=' text-center'>
                                    <img className='w-full' src="public/assets/img/download (1).avif" alt="" />
                                    <span  className=' mt-[7px] inline-block FreightDis tracking-[.1rem]  text-[20px] border-b-2 border-b-[#423639] max-1085:text-[16px]  max-1085:pb-[-3px]  max-768:text-[17px] max-1085:tracking-[.05rem] max-447:text-[13px]'>Men's Tees</span>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>

                                <div className=' text-center'>
                                    <img className='w-full' src="public/assets/img/download (2).avif" alt="" />
                                    <span  className=' mt-[7px] inline-block FreightDis tracking-[.1rem]  text-[20px] border-b-2 border-b-[#423639] max-1085:text-[16px]  max-1085:pb-[-3px]  max-768:text-[17px] max-1085:tracking-[.05rem] max-447:text-[13px]'>Women's Knits</span>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>

                                <div className=' text-center'>
                                    <img className='w-full' src="public/assets/img/download (3).avif" alt="" />
                                    <span className=' mt-[7px] inline-block FreightDis tracking-[.1rem]  text-[20px] border-b-2 border-b-[#423639] max-1085:text-[16px]  max-1085:pb-[-3px]  max-768:text-[17px] max-1085:tracking-[.05rem] max-447:text-[13px]'>Women's Pant</span>
                                </div>
                            </SwiperSlide>
                            
                            <SwiperSlide>

                                <div className=' text-center'>
                                    <img className='w-full' src="public/assets/img/download (4).avif" alt="" />
                                    <span className=' mt-[7px] inline-block FreightDis tracking-[.1rem]  text-[20px] border-b-2 border-b-[#423639] max-1085:text-[16px]  max-1085:pb-[-3px]  max-768:text-[17px] max-1085:tracking-[.05rem] max-447:text-[13px]'>Women's Bodysuit</span>
                                </div>
                            </SwiperSlide>
                            
                            <SwiperSlide>

                                <div className=' text-center'>
                                    <img className='w-full' src="public/assets/img/download (5).avif" alt="" />
                                    <span className=' mt-[7px] inline-block FreightDis tracking-[.1rem]  text-[20px] border-b-2 border-b-[#423639] max-1085:text-[16px]  max-1085:pb-[-3px]  max-768:text-[17px] max-1085:tracking-[.05rem] max-447:text-[13px]'>Men's Knits</span>
                                </div>
                            </SwiperSlide>




                        </Swiper>
                    </div>
                </div>

            </div>
        </>
    )
}

export default OurBest