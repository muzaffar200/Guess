import React, { useState } from 'react';
// import CheckBox from './Checkout/CheckBox';
import { useNavigate } from 'react-router-dom';


const Footer = () => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const footer = [
    {
      title: 'My Account',
      list: [
        {
          name: 'Sign-in',
          link:  '/login'
        },
        {
          name: 'Register',
          link: '/register'
        },
        {
          name: 'Account',
          link: '/account'
        },
        {
          name: 'UNiDAYS',
          link: '/'
        }
      ]
    },
    {
      title: 'Customer Care',
      list: [
        'FAQs',
        'Returns',
        'Shipping',
        'Size Charts',
        'Gift Cards',
        'Store Locator',
        'Terms and Conditions',
        'Privacy Policy',
        'Contact Us'
      ]
    },
    {
      title: 'Our Company',
      list: [
        'Our Story',
        'Sustainability'
      ]
    },
    {
      title: 'Brand',
      list: [
        {
          name: 'GUESS',
          id: 1,
        },
        {
          name: 'Kids',
          id: 2
        },
        {
          name: 'Marciano',
          id: 3
        },
        {
          name: 'GUESS JEANS',
          id: 4
        }
      ]
    }
  ]

  const [checkbox, setCheckbox] = useState()
  const [flag, setFlag] = useState(null)

  return (
    <footer className="bg-gray-100 py-12  z-40 mt-[100px]">
      <div className="mx-auto w-[95%]  base:flex justify-between">
        {footer.map((item, index) => {

          const { title, list } = item

          return (
            <div key={index} className='base:w-full'>
              <div onClick={() => setFlag(flag === index ? null : index)} className='flex justify-between items-center cursor-pointer base:cursor-default'>
                <h4 className="text-base font-semibold mb-4">{title}</h4>
                <svg aria-hidden="true" className={`${flag === index ? 'rotate-90' : ' rotate-0'} duration-300 base:hidden block`} width="16" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.4.571 8.43 7.6a.549.549 0 0 1 0 .8L1.4 15.429" stroke="#000" strokeWidth="1.714" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </div>
              <ul className={`${flag === index ? 'max-h-[500px]' : 'max-h-0'} transition-all duration-300 base:max-h-[500px] overflow-hidden space-y-2 mb-6`}>
                {list.map((l, i) => (
                  <li key={i} onClick={() => navigate(l.link ? l.link : { pathname: '/products/all', search: `?brandId=${l.id}` })}><span className="text-gray-700 text-sm hover:underline cursor-pointer">{l.name ? l.name : l}</span></li>
                ))}
              </ul>

            </div>
          )
        })}
        {/* Newsletter Section */}
        <div className='w-full flex justify-center'>
          <div>
            <h4 className="text-red-500 font-bold mb-2">BE THE FIRST TO KNOW</h4>
            <h3 className='text-[1.25rem] font-medium tracking-[2px]'>Join for the latest trends</h3>
            <p className="text-gray-500 mb-4"> and shop like a VIP. Plus, you'll receive 20% off your first order!</p>
            <form>
              <div className="flex items-center space-x-4 mb-4">
                <label className="flex items-center">
                  <input type="radio" name="style" className="form-radio text-black" value="Men" />
                  <span className="ml-2">Men</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="style" className="form-radio text-black" value="Women" />
                  <span className="ml-2">Women</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="style" className="form-radio text-black" value="Both" />
                  <span className="ml-2">Both</span>
                </label>
              </div>
              <div className="flex w-full base:w-[40vw]">
                <input type="email" placeholder="Email Address" className="w-full p-2 border border-gray-300 rounded-l-md outline-none" />
                <button className="px-6 py-4 bg-black text-white rounded-r-md whitespace-nowrap select-none">Sign Up</button>
              </div>
              <label className="flex items-center mt-4">
                {/* <CheckBox /> */}
                <span className="ml-2 text-gray-600 select-none">By joining, you agree to GUESS Terms & Conditions</span>
              </label>
            </form>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
