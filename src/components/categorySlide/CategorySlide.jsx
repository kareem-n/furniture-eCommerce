import { useSelector } from "react-redux";
import { urlFor } from "../../utils/sanityClient";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import NextArrow from "../nextArrow/NextArrow";
import PrevArrow from "../prevArrow/PrevArrow";

// import {} from 'slick-carousel'



function CategorySlide() {

    const { categories } = useSelector(s => s.homeSlice);

    // console.log(categories);




    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
            breakpoint: 480,
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
        <div className="text-black mt-10 mx-5 md:mx-0 border-b border-t border-black border-opacity-40">
            <h2 className="font-bold text-2xl md:text-3xl py-10 pl-3 capitalize">
                Get what you need by room
            </h2>


            <Slider {...settings}>
                {
                    categories.data.map(dt => <div key={dt._id} className="p-4 h-[350px] w-full">
                        <Link to={`/room/${dt.path}`} className="relative h-full w-full object-cover">
                            <img src={urlFor(dt.image)} className="rounded-xl shadow-md h-full w-full object-cover" alt="" />
                            <div className="">
                                <p className="bg-white absolute font-semibold capitalize bottom-5 text-sm left-1/2 -translate-x-1/2 text-nowrap px-5 py-2 rounded-full">
                                    {
                                        dt.title
                                    }
                                </p>
                            </div>
                        </Link>
                    </div>)
                }
            </Slider>




        </div>
    )
}

export default CategorySlide