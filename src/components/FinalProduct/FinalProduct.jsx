import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa"
import { FaHeartCirclePlus } from "react-icons/fa6"
import { urlFor } from "../../utils/sanityClient"
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../redux/slices/cartSlice/cartSlice";
import toast from "react-hot-toast";
import { toggleWishList } from "../../redux/slices/wishingSlice/wishingSlice";

function FinalProduct({ item, category }) {

    const animate = useAnimation();

    const cardRef = useRef(null)
    const { items } = useSelector(s => s.wishingSlice);

    const [elVisbile, setElVisible] = useState(false)


    const dispatch = useDispatch();

    useEffect(() => {

        const ovserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setElVisible(true)
                ovserver.disconnect();
            }
        }, { threshold: 1.0 })

        if (cardRef.current) {
            ovserver.observe(cardRef.current)
        }

        return () => {
            if (cardRef.current) ovserver.unobserve(cardRef.current)
        }

    }, [])




    // const [isImgHovered, setIsImgHovered] = useState(false);

    return (
        <>
            <div

                ref={cardRef} key={item._id} className="col-span-3 md:col-span-1 rounded-2xl overflow-hidden shadow-xl">
                {
                    elVisbile ? <>
                        <Link
                            to={`/product/${item._id}?cat=${category}`}
                        >
                            <motion.img

                                animate={animate}

                                onMouseEnter={(e) => {
                                    animate.start({
                                        opacity: [0, 1],
                                        // scale: 1.2,
                                        transition: { duration: 1 },
                                    })
                                    e.target.src = urlFor(item.secondImage);
                                    // console.log(e.target);

                                }}
                                onMouseLeave={(e) => {
                                    animate.start({
                                        opacity: [0, 1],
                                        // scale: 1.6,
                                        transition: { duration: 1 },
                                    })
                                    e.target.src = urlFor(item.mainImage);
                                    // console.log(e.target);

                                }}
                                src={urlFor(item.mainImage)}
                                alt=""
                                className="transition-all w-full"
                            />
                        </Link>


                        <div className="p-4 bg-white">
                            <Link
                                to={`/product/${item._id}?cat=${category}`}
                                className="text-xl underline">
                                {item.name}
                            </Link>
                            <p className="text-gray-600 mt-2 text-nowrap text-ellipsis overflow-hidden">
                                {item.subText}
                            </p>
                            <p className="flex items-center">
                                EGP <span className="text-3xl font-bold">{item.price}</span>
                            </p>
                            <div className="text-white flex items-center gap-x-6 mt-4">
                                <motion.div
                                    initial={{
                                        scale: 1
                                    }}

                                    whileHover={{
                                        scale: 1.1
                                    }}

                                    onClick={() => {
                                        toast.success(`product ${item.name} added successfully`);
                                        dispatch(setCartItems({ id: item._id, cat: category }))
                                    }}

                                    className="cursor-pointer flex items-center bg-theme px-4 py-2 rounded-md">
                                    <FaCartPlus className="mr-3" size={20} />
                                    add ro cart
                                </motion.div>
                                <div

                                    onClick={() => {
                                        const isSuccess = items?.length > 0 && items?.find(itemW => itemW.id === item._id)

                                        if (!isSuccess) {
                                            toast.success("product added successfully")
                                        } else {
                                            toast.error("product removed successfully")
                                        }


                                        dispatch(toggleWishList({ id: item._id, cat: category }))

                                    }}

                                    className="hover:scale-110 transition-all"

                                >

                                    {
                                        (items.length > 0 && items.find(itemW => itemW.id === item._id)) ? <FaHeart className="text-theme transition-all cursor-pointer" size={30} /> : <FaRegHeart className="text-theme transition-all cursor-pointer" size={30} />
                                    }
                                </div>
                            </div>

                        </div>
                    </> : <motion.div
                        initial={{
                            opacity: 0.5
                        }}
                        animate={{
                            opacity: 1
                        }}

                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}

                        className="min-w-[400px] min-h-[600px] bg-gray-200"></motion.div>
                }

            </div>
        </>
    )
}

export default FinalProduct