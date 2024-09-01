import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom"
import { getProductDetails } from "../../redux/slices/productDetials/CAT/getProductDetails";
import { Bars } from "react-loader-spinner";
import { urlFor } from './../../utils/sanityClient';
import { FaCartPlus, FaHeart, FaRegHeart, FaTruck } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import Related from './../../components/related/Related';
import Rate from "../../components/rate/Rate";
import toast, { Toaster } from "react-hot-toast";
import { setCartItems } from "../../redux/slices/cartSlice/cartSlice";
import { toggleWishList } from "../../redux/slices/wishingSlice/wishingSlice";

function ProductDetials() {


  const paddingSectionRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const categoryName = search.get("cat")



  const { data } = useSelector(s => s.productDetails.product);
  const { items } = useSelector(s => s.wishingSlice);


  const { loading } = useSelector(s => s.productDetails);

  const [mainImg, setMainImg] = useState(null);
  const [click, setClick] = useState(false);


  useEffect(() => {
    setMainImg(null)

    if (id && categoryName) {

      dispatch(getProductDetails({ id, categoryName }))
    }

  }, [id, categoryName])

  useEffect(() => {

    setMainImg(null)
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        paddingSectionRef.current.style.top = '85px';
      }
    })

  }, [])







  return (
    <>
      {
        !loading ? <div className="md:px-48 px-5 py-20 ">
          {
            data && <div className="flex flex-wrap md:flex-nowrap items-start gap-x-3 relative">
              <Toaster></Toaster>
              <div className="w-full md:w-3/5">
                <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
                  <span className="flex order-2 md:order-1 gap-y-4 md: gap-x-3 items-center w-full md:flex-col md:w-auto justify-center">
                    <img
                      onMouseEnter={(e) => {
                        setMainImg(e.target.src);
                      }}
                      onMouseLeave={() => {
                        if (!click)
                          setMainImg(data.mainImage);
                      }}
                      onClick={() => {
                        setClick(true)
                      }}
                      className="w-24 rounded-lg" src={urlFor(data.mainImage)} alt="" />
                    <img

                      onClick={() => {
                        setClick(true)
                      }}
                      onMouseEnter={(e) => {
                        setMainImg(e.target.src);
                      }}
                      onMouseLeave={() => {
                        if (!click)
                          setMainImg(data.mainImage);
                      }}
                      className="w-24 rounded-lg" src={urlFor(data.secondImage)} alt="" />
                  </span>
                  <div
                    onMouseMove={(e) => {
                      e.target.style.transition = ''

                      // console.log(e.target.parentElement.offsetLeft);
                      const { left, top, width, height } = e.target.getBoundingClientRect();
                      const x = ((e.clientX - left) / width) * 100;
                      const y = ((e.clientY - top) / height) * 100;

                      e.target.style.transformOrigin = `${x}% ${y}%`

                      e.target.style.transform = 'scale(1.2)'
                    }}

                    onMouseLeave={(e) => {
                      e.target.style.transition = '1s'
                      e.target.style.transform = "scale(1)"
                    }}

                    className="w-full order-1 rounded-lg overflow-hidden cursor-zoom-in">
                    <img
                      src={mainImg ? urlFor(mainImg) : urlFor(data?.mainImage)} className="w-full h-full object-cover" alt="" />
                  </div>

                </div>

                <div className="mt-20">
                  <Related />
                </div>


              </div>

              <div ref={paddingSectionRef} className="md:w-1/2 mt-20 md:mt-0 transition-all px-10 sticky top-0">
                <div className="flex items-center justify-between w-full border-b border-black border-opacity-10 pb-5">
                  <div className="">
                    <h2 className="text-xl md:text-3xl font-bold">{data.name}</h2>
                    <h2 className="text-md text-gray-600">{data.subText}</h2>
                  </div>
                  <div

                    onClick={() => {
                      const isSuccess = items.length > 0 && items.find(item => item.id === data._id)

                      if (!isSuccess) {
                        toast.success("product added successfully")
                      } else {
                        toast.error("product removed successfully")
                      }


                      dispatch(toggleWishList({ id: data._id, cat: categoryName }))

                    }}

                    className="hover:scale-110 transition-all"

                  >
                    {
                      (items.length > 0 && items.find(item => item.id === data._id)) ? <FaHeart className="text-theme transition-all cursor-pointer" size={30} /> : <FaRegHeart className="text-theme transition-all cursor-pointer" size={30} />
                    }
                  </div>
                </div>
                <div className="pt-5">
                  <h3 className="text-3xl md:text-5xl font-bold flex items-center"> <span className="text-2xl font-normal mr-1">EGP</span>{data.price}</h3>

                  <p className="flex items-start text-sm text-black text-opacity-80 mt-3">
                    <IoIosAlert size={30} className="mr-1 pb-1" />
                    Interior accessories that help you organise inside your wardrobe are sold separately. Knobs and handles are sold separately.
                  </p>
                </div>

                <div className="border-black border-opacity-20 border-b border-t py-2 my-5">
                  <h2 className="text-xl font-bold mb-1">Available Colors</h2>
                  {
                    data.colors?.map((color, index) => <span key={index}> {index !== 0 && '-'} {color}</span>)
                  }
                  {
                    data.rate && <div className="mt-2">
                      <Rate rating={data.rate} />
                    </div>
                  }

                </div>
                <div className="">
                  <h2 className="text-lg mb-1">How to Get it?</h2>
                  <div className="border border-black border-opacity-20 mt-2 rounded-md px-5">
                    <div className="py-3 flex items-center">
                      <FaTruck className="mr-4" size={30} />
                      <div className="flex flex-col">
                        <span className="font-bold">Delivery</span>
                        <div className="flex items-center">
                          <span className="w-3 h-3 mr-2 bg-red-700 rounded-full"></span>
                          Not Available
                        </div>
                      </div>
                    </div>
                    <div className="py-3 flex items-center border-t border-black border-opacity-10">
                      <IoStorefront className="mr-4" size={30} />
                      <div className="flex flex-col">
                        <span className="font-bold">In Stock</span>
                        <div className="flex items-center">
                          <span className="w-3 h-3 mr-2 bg-green-700 rounded-full"></span>
                          Available
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="mt-5">
                    {/* <Link
                      to={user && `/buy/${data._id}`}


                      onClick={() => {
                        if (!user) {
                          dispatch(setIsLoginSectionOpened(true));
                        }

                      }}

                      className=" flex items-center justify-center w-full rounded-lg border border-theme text-theme py-4 font-bold uppercase text-lg">
                      Buy Now
                    </Link> */}
                    <button

                      onClick={() => {
                        toast.success("product added successfully")
                        dispatch(setCartItems({ id: data._id, cat: categoryName }))
                      }}

                      className="mt-4 flex items-center justify-center w-full rounded-lg bg-theme text-white py-4 font-bold uppercase text-lg">
                      <FaCartPlus className="mr-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>

              </div>

            </div>
          }



        </div>
          :
          <div className="min-h-[50vh] flex items-center justify-center">
            <Bars width={100} height={100} />
          </div>
      }


    </>
  )
}

export default ProductDetials