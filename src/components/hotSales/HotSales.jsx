import { useSelector } from "react-redux"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Product from "../product/Product";

function HotSales() {


  const { hotProducts } = useSelector(s => s.homeSlice);


  return (
    <>
      {
        hotProducts?.data && <div className="md:my-20 my-10 ">

          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold capitalize">Gallery for inspirations</h2>
          </div>

          <div className="grid grid-cols-3 grid-flow-dense row-auto flex-wrap gap-5 [200px] mt-10">

          </div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="20px" >
              {
                hotProducts.data.map(product =>

                  <Product key={product._id} product={product} />

                )
              }
              {/* Children */}


            </Masonry>
          </ResponsiveMasonry>
        </div>
      }

    </>

  )
}

export default HotSales