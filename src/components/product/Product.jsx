import { useState } from 'react'
import { motion } from 'framer-motion';
import { urlFor } from '../../utils/sanityClient';
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Product({ product }) {

    const [isHovered, setIsHovered] = useState(false)


    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            key={product._id} className="relative">

            <img src={urlFor(product?.image)} className="w-full rounded-lg shadow-lg" alt="" />
            {
                product?.coordinates?.map(item =>
                    <motion.div

                        initial='hidden'
                        whileHover={'visible'}

                        animate={{ opacity: isHovered ? 1 : 0 }}

                        transition={{
                            duration: 0.5
                        }}

                        key={item._id}
                        className="absolute z-50 cursor-pointer"
                        style={{
                            top: item.top + '%',
                            left: item.left + '%'
                        }}>
                        <Link to={`/product/${item.productDetails._id}?cat=${item.productDetails.cat}`}>



                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.3 }}
                            className="border-4 border-white rounded-full w-7 h-7 ">
                        </motion.div>


                        <motion.div


                            variants={{
                                hidden: { opacity: 0, x: '30px', display: 'none', },
                                visible: { opacity: 1, transform: 'translateX(-50%)', display: 'block' }
                            }}

                            // initial='hidden'
                            // animate='visible'

                            transition={{
                                duration: 0.5
                            }}

                            className="px-5 py-2 bg-white shadow-lg rounded-lg absolute top-full mt-2 left-1/2">
                            <p className="text-sm text-nowrap">{item.productDetails.name}</p>
                            <p className="text-sm text-nowrap">{item.productDetails.subText}</p>
                            <p className="text-xl text-theme font-bold">
                                {item.productDetails.price}EGP
                            </p>
                            <p className="text-theme">
                                <FaAngleRight size={25} />
                            </p>
                        </motion.div>
                        </Link>

                    </motion.div>
                    


                )

            }
        </motion.div>
    )
}

export default Product