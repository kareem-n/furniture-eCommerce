import {  useSelector } from "react-redux"
import Hero from "../../components/hero/Hero";
import CategorySlide from "../../components/categorySlide/CategorySlide";
import { Bars } from "react-loader-spinner";
import NowIn from "../../components/nowIn/NowIn";
import CordSection from "../../components/cordSection/CordSection";
import HotSales from './../../components/hotSales/HotSales';

function Home() {


    // const { navbarH } = useSelector(s => s.global);
    const { isLoading } = useSelector(s => s.homeSlice);

    // console.log(x.hero.data)





    return (
        <div className="text-white">
            {
                !isLoading ? <>
                    <Hero />
                    <div className="md:px-44 px-3 text-black">
                        <HotSales />
                        <CategorySlide />
                        <NowIn />
                    </div>

                </> : <div className='fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center'>
                    <Bars />
                </div>
            }


        </div>
    )
}

export default Home