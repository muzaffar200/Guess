import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { useContext } from 'react';
import { Basket } from '../../context/BasketContext';

function ProductSlider({ Product, title }) {
    const{addToBasket}=useContext(Basket)
    const [selectedColor, setSelectedColor] = useState({});
    const [togglePopup, setTogglePopup] = useState([]);

    function handlePopup(id, colors) {
        cardPopup(id);
        setSelectedColor({ ...selectedColor, [id]: colors[0] });
    }

    function cardPopup(id) {
        const test = togglePopup.includes(id);
        if (test) {
            setTogglePopup(togglePopup.filter((item) => item !== id));
        } else {
            setTogglePopup([...togglePopup, id]);
        }
    }

    function handleColorChange(color, id) {
        setSelectedColor({ ...selectedColor, [id]: color });
    }

    return (
        <div className="w-[95%] m-auto mb-[30px]">
            <h2 className={`${title ? '' : 'hidden'} text-[3rem] font-[200] text-center FreightDis italic pt-[90px] pb-[30px] max-768:text-[2.2rem] max-447:text-[1.7rem] max-877:pt-[50px]`}>
                {title}
            </h2>

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
                {Product &&
                    Product.data.map((item, i) => (
                        <SwiperSlide key={i} className="">
                            <Link to={`/product/detalis/${item.id}`} className="">
                                <div className="group relative">
                                    <img className="" src={item.images[0]} alt="" />
                                    <img className="absolute top-0 left-0 hidden group-hover:inline" src={item.images[1]} alt="" />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePopup(item.id, item.Colors);
                                        }}
                                        className="absolute text-[13px] right-[10px] bottom-[10px] border bg-white px-[11px] py-[4px] rounded-[5px]"
                                    >
                                        Add{togglePopup.includes(item.id) ? '-' : '+'}
                                    </button>
                                    <div
                                        style={{ display: togglePopup.includes(item.id) ? '' : 'none' }}
                                        className="w-[95%] p-[10px] rounded-[.3125rem] popupShadow bg-[#f9f9f9] absolute bottom-0 left-[50%] transform -translate-x-1/2"
                                    >
                                        <p className="text-[16px] pt-[16px] pb-[8px]">Select a color: </p>
                                        <div className="flex gap-[5px] cursor-pointer flex-wrap">
                                            {item.Colors.map((c, i) => (
                                                <div
                                                    key={i}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleColorChange(c, item.id);
                                                    }}
                                                    className="w-[30px] h-[30px] rounded-[50%] border border-[#bdbec0] relative"
                                                    style={{ borderColor: c == selectedColor[item.id] ? 'black' : '' }}
                                                >
                                                    <div
                                                        className="w-[25px] h-[25px] rounded-[50%] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                                                        style={{ backgroundColor: c }}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="py-[10px]">Select a size:</p>
                                        <div className="flex gap-[15px] text-[16px] underline">
                                            {item.Size.map((j, i) => (
                                                <div
                                                    key={i}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToBasket(item.id, item.name, item.price, item.discount, selectedColor[item.id], j, item.images[0]);
                                                        cardPopup(item.id);
                                                    }}
                                                >
                                                    {j}
                                                </div>
                                            ))}
                                        </div>

                                        <IoIosClose className=' absolute top-[5px] right-[5px] text-[20px]' onClick={(e) => {
                                            e.preventDefault();
                                            handlePopup(item.id, item.Colors);
                                        }} />

                                    </div>
                                </div>
                                <div className="py-[5px] text-[#9C6944]">
                                    <p className="text-[16px]">{item.name}</p>
                                    <div className="text-[14px]">
                                        <span>
                                            ${(
                                                item.price - (item.price * item.discount) / 100
                                            ).toFixed(2)}
                                        </span>
                                        <span className="text-[#71767F]">({item.discount}% OFF)</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default ProductSlider;
