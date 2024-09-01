import { useSelector } from "react-redux"
import { urlFor } from "../../utils/sanityClient";
import NextArrow from "../nextArrow/NextArrow";
import PrevArrow from "../prevArrow/PrevArrow";
import Slider from "react-slick";
import { FaAngleRight } from "react-icons/fa";

function NowIn() {


    const { nowIn } = useSelector(s => s.homeSlice);
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
      };


    return (
        <div className="md:my-20 my-10 px-4">

            <h2 className="mb-10 font-bold uppercase md:text-3xl text-2xl">Available now in Furniture</h2>
            <Slider {...settings} className="h-full">
                {
                    nowIn?.data[0]?.item?.map(item => (
                        <div className="p-4" key={item._id}>
                            <div

                                className="h-full w-full relative"
                                style={{
                                    backgroundColor: item.color ? item.color : '#fff',
                                    color: item.color ? '#fff' : '#000',
                                    height: '520px'
                                }}
                            >
                                <img src={urlFor(item.img)} alt="" className="w-full object-contain" />
                                <div className="py-4 pl-3 md:pl-5 pb-14 relative">
                                    <h2 className="text-xl font-bold">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm md:mt-3 opacity-85 lowercase">
                                        {item.desc}
                                    </p>


                                </div>
                                <div className="absolute left-0 bottom-0 md:p-3 px-1 ">
                                    <FaAngleRight size={30} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>

        </div>
    )
}

export default NowIn