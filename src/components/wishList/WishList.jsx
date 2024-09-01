import { useDispatch, useSelector } from "react-redux"
import { setIsWishListOpened } from "../../redux/slices/wishingSlice/wishingSlice";
import { motion } from 'framer-motion';
import { useEffect } from "react";
import { getWishlistItems } from "../../redux/slices/wishingSlice/ACT";
import { Bars } from "react-loader-spinner";
import { urlFor } from "../../utils/sanityClient";
import { setCartItems } from "../../redux/slices/cartSlice/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function WishList() {

    const dispatch = useDispatch();

    const { items, loading, wishListFullDetails } = useSelector(s => s.wishingSlice);

    useEffect(() => {

        if (items.length > 0)
            dispatch(getWishlistItems(items))

    }, [items, dispatch])



    return (
        <div
            className="bg-black bg-opacity-30 fixed z-50 inset-0"
        >
            <div onClick={() => {
                dispatch(setIsWishListOpened(false))
            }} className="absolute inset-0 cursor-pointer"></div>


            <motion.div
                initial={{
                    left: '100%'
                }}
                animate={{
                    left: '',
                    right: 0
                }}

                exit={{
                    left: '100%'
                }}

                className="absolute top-0 right-0 bottom-0 bg-zinc-200 w-[400px] px-4 py-10">
                <div className="relative py-3">
                    <h3 className="font-bold text-2xl capitalize">products you liked</h3>
                    <span className="h-[1px] bg-gray-700 bg-opacity-40 absolute left-0 right-0 top-full">
                    </span>
                </div>
                <style>
                    {`
                    /* Custom scrollbar styles */
                    .wishlist-scrollbar::-webkit-scrollbar {
                        width: 2px;
                    }

                    .wishlist-scrollbar::-webkit-scrollbar-track {
                        background: lightGray;
                    }

                    .wishlist-scrollbar::-webkit-scrollbar-thumb {
                        background-color: green;
                        border-radius: 10px;
                    }

                    .wishlist-scrollbar::-webkit-scrollbar-thumb:hover {
                        background-color: darkGreen;
                    }
                    `}
                </style>

                <div className="mt-4 flex flex-col gap-y-4 overflow-y-scroll h-[90%] wishlist-scrollbar pr-3">
                    {
                        !loading ? wishListFullDetails && <>
                            {wishListFullDetails.map(product =>
                                <div className="" key={product._id}>
                                    <Link
                                        onClick={() => {
                                            dispatch(setIsWishListOpened(false))
                                        }}
                                        to={`product/${product._id}?cat=${items.find(item => item).cat}`}
                                    >
                                        <img
                                            className="rounded-lg"
                                            src={urlFor(product.mainImage)}
                                            alt="" />
                                    </Link>

                                    <div className="px-3 py-4">

                                        <h2 className="font-bold text-xl ">
                                            <Link
                                                onClick={() => {
                                                    dispatch(setIsWishListOpened(false))
                                                }}
                                                to={`product/${product._id}?cat=${items.find(item => item).cat}`}
                                                className="hover:underline"
                                            >
                                                {product.name}
                                            </Link>
                                        </h2>
                                        <h2 className="font-bold text-sm text-gray-500">{product.subText}</h2>
                                        <h2 className="font-bold text-theme text-2xl">{product.price}-EGP</h2>

                                        <button
                                            onClick={() => {
                                                toast.success("product added to cart successfully");
                                                dispatch(setCartItems({ id: product._id }))
                                            }}
                                            className="block text-center font-bold bg-theme text-white w-full my-3 py-4 rounded-lg text-xl capitalize">
                                            move to cart
                                        </button>

                                    </div>

                                </div>
                            )}
                        </>


                            : <div className="flex items-center justify-center py-5">
                                <Bars width={70} height={70} />
                            </div>
                    }

                </div>
            </motion.div>

        </div>
    )
}

export default WishList