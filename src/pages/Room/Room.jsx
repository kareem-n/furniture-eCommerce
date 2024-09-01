import { useParams } from "react-router-dom"
import CategorySlide from "../../components/categorySlide/CategorySlide"
import { useEffect } from "react";
import { getRoomDetails } from './../../redux/slices/roomSlice/CAT/GetRoomDeatils';
import { useDispatch, useSelector } from "react-redux";
import { Bars } from "react-loader-spinner";
import { urlFor } from "../../utils/sanityClient";
import FinalProduct from "../../components/FinalProduct/FinalProduct";

function Room() {

    const { cat } = useParams();

    const dispatch = useDispatch();

    const {data , loading} = useSelector(s => s.roomSLice.room)

    console.log(data);
    


    useEffect(() => {
        if (cat)
            dispatch(getRoomDetails(cat));
    }, [cat])

    return (
        <div className="md:px-48 px-5">
            {
                !loading ? <>
                    <CategorySlide></CategorySlide>
                    {
                        data && <div className="py-20">
                            <h2 className="text-2xl md:text-5xl font-bold text-theme capitalize mb-2">
                                {
                                    data.text
                                }
                            </h2>
                            <p className="mb-7 text-xl text-gray-600">
                                {
                                    data.subText
                                }
                            </p>
                            <div className="relative rounded-lg overflow-hidden">
                                <img
                                    src={urlFor(data.mainImage)} className="w-full" alt="" />
                                <div
                                    style={{
                                        background: 'linear-gradient(0deg , rgba(0,0,0,0.4), rgba(255,255,255,0.0))'
                                    }}
                                    className="absolute inset-0">

                                </div>
                            </div>

                            <div className="my-20">
                                <h2 className="text-xl md:text-3xl font-bold">
                                    Discover all about {data.text}
                                </h2>
                                <div className="mt-10 grid grid-cols-3 gap-4 flex-wrap">
                                    {
                                        data.products?.map(item => <FinalProduct category={data.title} key={item._id} item={item} />)
                                    }
                                </div>
                            </div>
                        </div>
                    }


                    {/* <Outlet></Outlet> */}
                </> : <div className="flex min-h-[50vh] justify-center items-center">
                    <Bars width={100} height={100} />
                </div>
            }


        </div>
    )
}

export default Room