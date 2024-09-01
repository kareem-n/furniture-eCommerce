import { useSelector } from "react-redux";
import Slider from 'react-slick';
import { urlFor } from './../../utils/sanityClient';
import NextArrow from './../nextArrow/NextArrow';
import PrevArrow from './../prevArrow/PrevArrow';
import { motion } from 'framer-motion';
import { FaCartPlus } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Related() {

  const { data } = useSelector(s => s.productDetails.related);
  const test = useSelector(s => s.productDetails);


  console.log(test);
  


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
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
    prevArrow: <PrevArrow />,
  };


  return (
    <div className="px-5">
      <Slider {...settings}>
        {data.products?.map((item, index) => <div key={index} className="px-3">
          <Link
            to={`/product/${item._id}?cat=${data.title}`}
            className="block rounded-t-xl overflow-hidden">
            <img
              src={urlFor(item.mainImage)}
              className="block w-full h-full"
              alt={item.name}
            />
            <div className="bg-theme text-white px-4 py-6">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <h3 className="text-2xl flex items-center font-bold">EGP <span className="text-4xl">{item.price}</span> </h3>
              <div className="flex items-center gap-x-6 mt-4">
                <motion.div
                  initial={{
                    scale: 1
                  }}

                  whileHover={{
                    scale: 1.1
                  }}

                  className="cursor-pointer">
                  <FaCartPlus size={30} />
                </motion.div>
                <motion.div
                  initial={{
                    scale: 1
                  }}

                  whileHover={{
                    scale: 1.1
                  }}

                  className="cursor-pointer">
                  <FaHeartCirclePlus size={30} />
                </motion.div>
              </div>
            </div>

          </Link>
        </div>)}
      </Slider>
    </div>
  )
}

export default Related