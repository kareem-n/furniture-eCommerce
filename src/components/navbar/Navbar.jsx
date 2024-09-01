
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiCart, BiHeart, BiMenu, BiUser } from "react-icons/bi";
import { FaAngleUp } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setNavbarH } from "../../redux/slices/global";
import { setIsLoginSectionOpened, setUser } from "../../redux/slices/userSlice/userSlice";
import { setIsWishListOpened } from "../../redux/slices/wishingSlice/wishingSlice";
import Menu from "../menu/Menu";

const Navbar = () => {


  const { user } = useSelector(s => s.userSlice);
  const { items } = useSelector(s => s.cartSlice);
  const [isMenuActive, setisMenuActive] = useState(false)
  const headerRef = useRef(null);
  const lastScroll = useRef(0);
  const dispatch = useDispatch();


  const wishItems = useSelector(s => s.wishingSlice.items);

  const scrollEvent = (Y) => {
    if (Y > 50) {
      headerRef.current.classList.add("bg-white", "shadow-lg");
      headerRef.current.classList.remove("text-white");

      headerRef.current.firstElementChild.firstElementChild.classList.replace("text-white", "text-theme");
    } else {
      headerRef.current.classList.remove("bg-white", "shadow-lg");
      headerRef.current.classList.add("text-black")

      headerRef.current.firstElementChild.firstElementChild.classList.add("text-black");
    }

    if (Y > lastScroll.current) {
      // Scrolling down
      // headerRef.current.classList.remove("sticky");
      headerRef.current.classList.replace("top-0", "-top-48");
    } else if (Y < lastScroll.current) {
      // Scrolling up
      // headerRef.current.classList.add("bg-white");
      headerRef.current.classList.replace("-top-48", "top-0");
    }

    setTimeout(() => {
      if (Y == lastScroll.current) {
        // headerRef.current.classList.add("sticky");
        headerRef.current.classList.replace("-top-48", "top-0");
        return
      }
    }, 100);

    lastScroll.current = Y;

  }


  useEffect(() => {

    if (headerRef) {
      dispatch(setNavbarH(headerRef.current.offsetHeight))
      scrollEvent(window.scrollY)
      window.addEventListener("scroll", () => scrollEvent(window.scrollY))
    }

  }, [])


  return <header ref={headerRef} className="flex-grow sticky w-full transition-all -top-48 z-50">
    <div className="md:px-48 px-3">
      <div className="flex justify-between items-center py-4 relative ">

        {/* LOGO */}
        <div className="">
          <Link to={'/'} className="text-2xl font-bold uppercase">
            furniture
          </Link>
        </div>


        <div className="flex relative items-center gap-x-4">
          <div className="flex gap-x-2 items-center">

            <motion.div
              initial='hidden'
              whileHover='visible'
              className="relative">
              <Link
                to={'/cart'}
                className="block hover:bg-theme hover:bg-opacity-30 rounded-full p-1 cursor-pointer relative">
                <span className="absolute top-0 right-0 translate-x-1/2 bg-theme text-xs w-4 h-4 flex items-center justify-center text-white rounded-full">
                  {
                    items?.length > 0 ? items.length : '0'
                  }
                </span>
                <BiCart size={22} />
              </Link>

              <motion.div
                variants={{
                  visible: { opacity: 1, scale: 1, x: '-50%' },
                  hidden: { opacity: 0, scale: 0, x: 0 }
                }}

                transition={{ duration: 0.1 }}

                className=" bg-theme mt-3 text-sm text-white py-3 px-4 rounded-xl absolute top-full left-1/2 text-nowrap flex flex-col">
                <div className="bg-theme rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1">
                  <FaAngleUp />
                </div>
                cart items {
                  items?.length > 0 ? items.length : '0'
                }
              </motion.div>

            </motion.div>
            <motion.div
              initial='hidden'
              whileHover='visible'
              className="relative">
              <div
                onClick={() => {
                  dispatch(setIsWishListOpened(true))
                }}
                className="hover:bg-theme hover:bg-opacity-30 rounded-full p-1 cursor-pointer relative">
                <span className="absolute top-0 right-0 translate-x-1/2 bg-theme text-xs w-4 h-4 flex items-center justify-center text-white rounded-full">
                  {wishItems.length > 0 ? wishItems.length : '0'}
                </span>
                <BiHeart size={22} />
              </div>

              <motion.div
                variants={{
                  visible: { opacity: 1, scale: 1, x: '-50%' },
                  hidden: { opacity: 0, scale: 0, x: 0 }
                }}

                transition={{ duration: 0.1 }}

                className=" bg-theme mt-3 text-sm text-white py-2 px-4 rounded-full absolute top-full left-1/2 text-nowrap">
                <div className="bg-theme rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1">
                  <FaAngleUp />
                </div>
                wishing list {wishItems.length > 0 ? wishItems.length : '0'}
              </motion.div>

            </motion.div>
            <motion.div
              initial='hidden'
              whileHover='visible'
              className="relative">
              <div className="hover:bg-theme hover:bg-opacity-30 rounded-full p-1 cursor-pointer">
                <BiUser size={22} />
              </div>
              <motion.div
                variants={{
                  visible: { opacity: 1, scale: 1, x: '-50%' },
                  hidden: { opacity: 0, scale: 0, x: 0 }
                }}

                // initial={'visible'}

                transition={{ duration: 0.1 }}

                className=" bg-theme mt-3 text-sm text-white py-4 px-5 rounded-lg absolute top-full left-1/2 text-nowrap flex flex-col gap-y-2 text-center">
                <div className="bg-theme rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1">
                  <FaAngleUp />
                </div>
                <span className="text-gray-300 pb-2">
                  {user ? user.email : 'no user logged in'}
                </span>
                {
                  !user ? <>
                    <button
                      onClick={() => {
                        if (!user) {
                          dispatch(setIsLoginSectionOpened(true));
                        }
                      }}

                      className="py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg">Login</button>
                    <Link to={'/register'} className="py-2 px-4 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg">Create new account</Link>
                  </> : <>
                    <motion.button

                      onClick={() => {
                        console.log(0);

                        localStorage.removeItem("userID");
                        dispatch(setUser(null))
                      }}

                      whileTap={{
                        scale: 1.1
                      }}

                      className="bg-black text-white py-2 rounded-lg">
                      Logout
                    </motion.button>
                  </>

                }




              </motion.div>

            </motion.div>

          </div>
          <div className={(isMenuActive && ' bg-theme bg-opacity-30 ') + " hover:bg-theme hover:bg-opacity-30 cursor-pointer relative rounded-full"}>
            {
              isMenuActive ?
                <div

                  onClick={() => setisMenuActive(false)}
                  className={'text-red-500'}
                >
                  <FaXmark size={30} />
                </div> : <div

                  onClick={() => setisMenuActive(true)}
                  className=""
                >
                  <BiMenu size={30} />
                </div>
            }



          </div>


        </div>








      </div>
    </div>
    <AnimatePresence>
      {isMenuActive && <Menu setisMenuActive={setisMenuActive} />}
    </AnimatePresence>

  </header>

};

export default Navbar;

