import { useSelector } from "react-redux"
import { urlFor } from "../../utils/sanityClient";
import { motion } from 'framer-motion';
import { FaAngleRight } from "react-icons/fa";

function CordSection() {


  const { allInOne } = useSelector(s => s.homeSlice);

  console.log(allInOne.data);


  return (
    <div className="px-10 mb-10">
      {
        allInOne.data.image && <>
          <h2 className="text-2xl font-bold ">All In one you will search</h2>
          <p className="pb-7 text-sm text-gray-700">Ideas based on your recently viewed products</p>
          <div className="relative">
            <img src={urlFor(allInOne.data?.image)} className="w-full rounded-lg" alt="" />
            {
              allInOne.data.coordinates.map(item =>
                <motion.div


                  initial='hidden'
                  whileHover={'visible'}

                  key={item._id}
                  className="absolute z-50 cursor-pointer"
                  style={{
                    top: item.top + '%',
                    left: item.left + '%'
                  }}>


                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.3 }}
                    className="border-4 border-white rounded-full w-7 h-7 ">
                  </motion.div>


                  <motion.div


                    variants={{
                      hidden: { opacity: 0, x: '30px' },
                      visible: { opacity: 1, x: '-50%' }
                    }}

                    // initial='hidden'
                    // animate='visible'

                    transition={{
                      duration: 0.5
                    }}

                    className="px-5 py-2 text-center bg-white shadow-lg rounded-lg absolute top-full mt-2 left-1/2">
                    <p className="text-sm text-nowrap">{item.name}</p>
                    <p className="text-xl text-theme font-bold">
                      {item.price}
                    </p>
                    <p className="text-theme flex justify-center">
                      <FaAngleRight size={25} />
                    </p>
                  </motion.div>
                </motion.div>


              )

            }


          </div>



        </>
      }


    </div>
  )
}

export default CordSection