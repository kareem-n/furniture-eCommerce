import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHomeData } from "../../redux/slices/homeSlice/homeCAT";
import Footer from './../../components/Footer/Footer';
import { Bars } from "react-loader-spinner";
import Login from "../Login/Login";
import { AnimatePresence } from "framer-motion";
import WishList from "../../components/wishList/WishList";
import { Toaster } from 'react-hot-toast';

function Layout() {

    const dispatch = useDispatch();

    const { loading, isLoginSectionOpened } = useSelector(s => s.userSlice);
    const { isWishListOpened } = useSelector(s => s.wishingSlice);

    useEffect(() => {
        dispatch(getHomeData())

    }, [])


    return <div className="min-h-screen flex flex-col">
        {
            loading && <div className="min-h-screen flex items-center justify-center">
                <Bars width={100} height={100} />
            </div>

        }
        <Navbar />
        <Toaster></Toaster>
        <div className="flex-grow-[50]">
            <AnimatePresence>
                {
                    isLoginSectionOpened && <Login />
                }
                {
                    isWishListOpened && <WishList />
                }
            </AnimatePresence>

            <Outlet></Outlet>

        </div>

        <Footer />

    </div>

}

export default Layout