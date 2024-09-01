
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { MdHome } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Bars } from 'react-loader-spinner';
import { urlFor } from '../../utils/sanityClient';
import { FaShoppingCart } from 'react-icons/fa';

function Menu({ setisMenuActive }) {


    const { categories } = useSelector(s => s.homeSlice);


    console.log(categories.data);


    return (
        <div className='fixed inset-0 z-50'>

            <div
                onClick={() => {
                    setisMenuActive(false)
                }}
                className="absolute inset-0 bg-black bg-opacity-30"
            ></div>


            <motion.div
                initial={{
                    right: '100%'
                }}
                animate={{
                    right: '',
                    left: '0px'
                }}

                exit={{
                    left: '',
                    right: '100%'
                }}

                transition={{
                    duration: 0.3
                }}

                className='absolute z-50 top-0 bottom-0 w-[400px] bg-white py-4 rounded-r-lg shadow-xl'

            >

                <div className="h-full">
                    <Link
                        onClick={() => {
                            setisMenuActive(false)
                        }}
                        className='text-xl font-bold flex items-center gap-x-2 hover:bg-theme hover:text-white px-5 py-3'
                        to={'/'}
                    >
                        <MdHome size={25} />
                        Home
                    </Link>
                    <Link
                        onClick={() => {
                            setisMenuActive(false)
                        }}
                        className='text-xl font-bold flex items-center gap-x-3 hover:bg-theme hover:text-white px-5 py-3 mt-3'
                        to={'/cart'}
                    >
                        <FaShoppingCart size={21} />
                        cart
                    </Link>
                    <div className="px-5 mt-4 h-full">
                        <h3 className='text-2xl font-bold capitalize'>discover rooms</h3>
                        <style>
                            {`
                    /* Custom scrollbar styles */
                    .scroll::-webkit-scrollbar {
                        width: 5px;
                    }

                    .scroll::-webkit-scrollbar-track {
                        background: lightGray;
                    }

                    .scroll::-webkit-scrollbar-thumb {
                        background-color: green;
                        border-radius: 10px;
                    }

                    .scroll::-webkit-scrollbar-thumb:hover {
                        background-color: darkGreen;
                    }
                    `}
                        </style>
                        <div className="h-[72%] mt-5">
                            <div className="h-full grid grid-cols-2 gap-4 overflow-y-scroll scroll ">

                                {
                                    categories.data ? categories.data.map(item => <Link
                                        onClick={() => {
                                            setisMenuActive(false)
                                        }}
                                        to={`/room/${item.path}`}
                                        key={item._id} className="col-span-1 relative">
                                        <img src={urlFor(item.image)} className='block w-full rounded-lg shadow-xl' alt="" />


                                        <div className="text-sm font-semibold bg-white px-4 py-2 rounded-full absolute bottom-[10%] left-1/2 -translate-x-1/2 text-nowrap capitalize">
                                            {item.title}
                                        </div>

                                    </Link>) : <div className="h-full flex items-center justify-center">
                                        <Bars width={80} height={80} />
                                    </div>
                                }

                            </div>
                        </div>



                    </div>
                </div>


            </motion.div>
        </div>

    )
}

export default Menu