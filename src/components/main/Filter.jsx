import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

function Filter({ title, options, isOpen, toggleFilter, addOption, element, type ,addDiscount,discount}) {


    return (
        <div className='border-b border-black py-[18px] relative'>
            <div onClick={() => { toggleFilter(title) }} className='flex justify-between items-center'>
                <p className='text-[17px] '>{title}</p>
                <IoIosArrowDown className={`text-[20px]  duration-500  ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>
            <div
                className={`transition-all duration-500 ease-in-out  overflow-hidden ${isOpen ? 'max-h-[300px]' : 'max-h-0'}`}
            >
                {
                    type == 'color' ?
                        options.map((item, i) => {
                            return (
                                <div key={i} onClick={() => { addOption(item) }} className='flex items-center mb-[5px] mt-[10px] cursor-pointer  '>
                                    <div className={`w-[16px] flex items-center justify-center h-[16px] rounded-[50%]  mr-[10px] `} style={{ backgroundColor: item, border: item == 'White' ? '1px solid #000' : '' }}>
                                        <FaCheck className={`text-[10px] text-[#fff] `} style={{ display: element.includes(item) ? 'block' : 'none', color: item == 'White' ? '#000' : '' }} />
                                    </div>
                                    <span className='text-[13px]'>{item}</span>
                                </div>
                            )
                        }) :
                        type == 'size' ?
                            options.map((item, i) => {
                                return (
                                    <div key={i} onClick={() => { addOption(item) }} className='flex items-center mb-[5px] mt-[10px] cursor-pointer'>
                                        <div className='w-[16px] flex items-center justify-center h-[16px] rounded-[50%] border border-black mr-[10px]' >
                                            <FaCheck className={`text-[10px] `} style={{ display: element.includes(item) ? 'block' : 'none' }} />
                                        </div>
                                        <span className='text-[13px]'>{item}</span>
                                    </div>
                                )
                            }) :
                            type == 'discount' ?
                                <div onClick={addDiscount} className="flex items-center py-[12px]">
                                    <div className='w-[16px] flex items-center justify-center h-[16px] rounded-[50%] border border-black mr-[10px]' >
                                        <FaCheck className={`text-[10px] `}style={{ display:discount?'block' : 'none' }}  />
                                    </div>
                                    <span className='text-[14px]'>Discount</span>
                                </div>
                                : ''


                }

            </div>
        </div>
    )
}







export default Filter