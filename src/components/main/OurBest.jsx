import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
function OurBest() {
    const cardData = [
        {
            name: "Women's Shirts",
            img: '/assets/img/download.avif',
            id:1
        },
        {
            name: "Men's Tees",
            img: '/assets/img/download (1).avif',
            id:25
        },
        {
            name: "Women's Knits",
            img: '/assets/img/download (2).avif',
            id:18
        },
        {
            name: "Women's Pant",
            img: '/assets/img/download (3).avif',
            id:2

        },
        {
            name: "Women's Bodysuit",
            img: '/assets/img/download (4).avif',
            id:17
        },
        {
            name: "Men's Knits",
            img: '/assets/img/download (5).avif',
            id:20
            
        }


    ]
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
                                enabled: true,
                                sticky: false
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
                                768: {
                                    slidesPerView: 6,
                                    spaceBetween: 10,
                                },
                                0: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 10,
                                },
                            }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}

                            modules={[Navigation, Mousewheel]}
                            className="mySwiper"
                        >
                            {
                                cardData.map((item, i) => {
                                    return (
                                        <SwiperSlide>
                                            <Link to={`/product/${item.id}`} className=' text-center block'>
                                                <img className='w-full' src={item.img} alt="" />
                                                <span className=' mt-[7px] inline-block FreightDis tracking-[.1rem]  text-[20px] border-b-2 border-b-[#423639] max-1085:text-[16px]  max-1085:pb-[-3px]  max-768:text-[17px] max-1085:tracking-[.05rem] max-447:text-[13px]'>{item.name}</span>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>

            </div>
        </>
    )
}

export default OurBest