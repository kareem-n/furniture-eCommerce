import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCardData } from '../../redux/slices/cartSlice/ACTGetCartData';
import { Bars } from 'react-loader-spinner';
import { urlFor } from '../../utils/sanityClient';
import { FaLongArrowAltRight, FaRegTrashAlt } from "react-icons/fa";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { GrSecure } from "react-icons/gr";
import { MdRemoveShoppingCart } from "react-icons/md";
import { calcTotalPrice, decreaseItemQuantity, increaseItemQuantity, removeCartItem } from '../../redux/slices/cartSlice/cartSlice';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { setErrorMSG, setIsLoginSectionOpened } from '../../redux/slices/userSlice/userSlice';
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

const stripePromise = loadStripe("pk_test_51PsWmk057r2qHSz6yhqRwcLheMQkzMxMQZZQF5PSq8RsiE5AUm8Ljj5snjaF5mTl35XF8S2E6yJuNEMk42obcRFB00PilxvHb8");
function Cart() {


    const { items, cartFullData, cartFullDataLoading, totalPrice } = useSelector(s => s.cartSlice);
    const { user } = useSelector(s => s.userSlice);

    const dispatch = useDispatch();
    const getItemIds = (items) => items.map(item => item.id).join(',');

    const [prevIdString, setPrevIdString] = useState(getItemIds(items));
    const [isRendered, setIsRendered] = useState(true);


    const location = useLocation();

    const params = location.search

    const paymentStatues = new URLSearchParams(params);


    useEffect(() => {
        if (paymentStatues.get("statues")) {
            if( paymentStatues.get("statues") === 'payment_canceled' ){
                toast.error("payment canceled")
            }else {

                toast.success("payment success ")
            }
        }
    }, [paymentStatues.get("statues")])

    useEffect(() => {

        if (cartFullData?.length > 0) {
            dispatch(calcTotalPrice())
        }

    }, [cartFullData, dispatch])



    useEffect(() => {
        const currentIdString = getItemIds(items);

        if ((currentIdString !== prevIdString || isRendered) && items.length > 0) {
            dispatch(getCardData(items));
            setPrevIdString(currentIdString);
            setIsRendered(false)
        }


    }, [items, dispatch, prevIdString, isRendered]);



    const handleClick = async () => {
        const stripe = await stripePromise;
        let tmp = [];
        cartFullData.map(item => {
            let { quan } = items.find(product => product.id === item._id)
            tmp.push({ price: item.stripeProductID, quantity: quan })
        })

        const { error } = await stripe.redirectToCheckout({
            lineItems: tmp,
            mode: 'payment',
            successUrl: 'http://localhost:5173/cart?statues=payment-success',
            cancelUrl: 'http://localhost:5173/cart?statues=payment_canceled',
        });

        if (error) {
            console.error("Stripe error:", error);
        }
    };

    return (
        <div className='md:px-48 px-5 my-10 select-none'>
            <div className="relative">
                <h2 className="font-bold text-4xl capitalize">cart to go</h2>
                <p className='mt-4 text-gray-700 capitalize'>
                    total cart products :
                    <span> {items?.length}</span>
                </p>
                <span className="absolute top-full mt-3 w-full h-[1px] bg-black bg-opacity-10"></span>

            </div>
            {
                !cartFullDataLoading ? <div className="flex flex-wrap md:flex-nowrap gap-y-5 mt-10 gap-x-5 items-start relative">

                    {
                        cartFullData?.length > 0 ? <>
                            <div className="md:w-2/3 flex flex-col gap-y-5">
                                {
                                    cartFullData.map(product => <div key={product._id} className="flex items-center gap-x-5 bg-zinc-500 rounded-xl bg-opacity-20 hover:bg-opacity-30 transition-all py-5 md:py-0">
                                        <Link
                                            to={`/product/${product._id}?cat=${items.filter(item => item.id === product._id)[0]?.cat}`}
                                            className="w-[200px]">
                                            <img
                                                className='rounded-xl'
                                                src={urlFor(product.mainImage)}
                                                alt=""
                                            />
                                        </Link>
                                        <div className="w-full">
                                            <Link
                                                to={`/product/${product._id}?cat=${items.filter(item => item.id === product._id)[0]?.cat}`}
                                                className='font-bold text-xl hover:underline'>{product.name}</Link>
                                            <p className='text-gray-700 mt-1'>{product.subText}</p>
                                            <p>price per unit : <span className='font-bold text-theme '>{product.price} EGP</span></p>
                                            <div className="mt-4 flex items-center flex-wrap md:flex-nowrap gap-y-5 gap-x-5 w-full">
                                                <div className="flex gap-x-1">

                                                    {
                                                        items.map(item => {
                                                            if (item.id === product._id)
                                                                return <>
                                                                    <span
                                                                    key={item.id}
                                                                        onClick={() => {
                                                                            dispatch(decreaseItemQuantity(item.id))
                                                                            dispatch(calcTotalPrice())
                                                                        }}
                                                                        className='cursor-pointer flex items-center text-theme rounded-l-lg'>
                                                                        <FaCircleMinus size={22} />
                                                                    </span>
                                                                    <span className='border border-theme rounded-full px-4'>{item.quan}</span>
                                                                    <span
                                                                        onClick={() => {
                                                                            dispatch(increaseItemQuantity(item.id))
                                                                            dispatch(calcTotalPrice())

                                                                        }}
                                                                        className='cursor-pointer flex items-center text-theme rounded-l-lg'>
                                                                        <FaCirclePlus size={22} />
                                                                    </span>
                                                                </>

                                                        })
                                                    }

                                                </div>
                                                <button
                                                    onClick={() => {
                                                        dispatch(removeCartItem(product._id))
                                                    }}
                                                    className='border border-red-700 text-red-700 hover:bg-red-500 hover:text-white transition-all px-4 py-1 rounded-full flex gap-x-2 items-center'>
                                                    <FaRegTrashAlt /> <span>remove from cart</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                            <div className="md:w-1/3 w-full  p-7 bg-theme text-white rounded-xl sticky top-20">
                                {
                                    totalPrice && <>

                                        <p className='font-bold text-lg'>
                                            Order Summary
                                        </p>
                                        <p className='text-gray-300 mt-3 flex justify-between border-b pb-3'>
                                            Product items
                                            ({
                                                items?.reduce((total, item) => { return total + item.quan }, 0)
                                            })
                                            <span>{totalPrice} EGP</span>
                                        </p>
                                        <p className='flex items-center justify-between pt-3'>
                                            <span className='text-lg font-bold'>Subtotal incl. VAT</span>
                                            <span className='text-2xl font-bold'>{totalPrice} EGP</span>
                                        </p>
                                        <p className='text-xs mt-2 text-gray-200'>
                                            By clicking &quot;check  out&quot; you&apos;re agreeing to our Privacy Policy
                                        </p>

                                        <motion.div
                                            initial='start'
                                            whileHover={'end'}
                                            className='bg-black cursor-pointer text-lg w-full mt-5 py-4 rounded-full flex justify-center items-center'

                                            onClick={() => {
                                                if (user) {
                                                    handleClick();
                                                } else {
                                                    dispatch(setErrorMSG("login to check out"))
                                                    dispatch(setIsLoginSectionOpened(true))
                                                }
                                            }

                                            }
                                        >
                                            Go to checkout
                                            <motion.div

                                                variants={{
                                                    start: { x: 0, },
                                                    end: { x: 10, opacity: 1 }
                                                }}

                                                className="ml-3 mt-1 opacity-80">
                                                <FaLongArrowAltRight size={25} />
                                            </motion.div>
                                        </motion.div>


                                        <p className='text-gray-300 flex items-center gap-x-2 mt-3 px-2'>
                                            <GiReturnArrow /> 90 days to change your mind
                                        </p>
                                        <p className='text-gray-300 flex items-center gap-x-2 mt-1 px-2'>
                                            <GrSecure /> Secure shopping with SSL encryption
                                        </p>
                                    </>
                                }


                            </div>
                        </> : <motion.div
                            initial={{
                                scale: 0
                            }}

                            animate={{
                                scale: 1
                            }}

                            className='w-full flex flex-col text-theme items-center justify-center'>
                            <div className="">
                                <MdRemoveShoppingCart size={80} />
                            </div>
                            <p className='mt-4 font-bold  text-4xl capitalize'>
                                your cart is empty
                            </p>

                            <Link
                                to={'/'}
                                className='mt-4 text-white hover:scale-110 transition-all bg-theme px-5 py-3 rounded-full'
                            >
                                back to explore
                            </Link>

                        </motion.div>
                    }



                </div> : <div className="mt-10 flex items-center justify-center"><Bars width={100} height={100} /></div>
            }

        </div>
    )
}

export default Cart