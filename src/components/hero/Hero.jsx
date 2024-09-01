import { urlFor } from '../../utils/sanityClient';
import { useSelector } from 'react-redux';
function Hero() {

    const { hero } = useSelector(s => s.homeSlice)


    return (
        <div className=''>
            {
                hero.data && <div className='flex flex-wrap md:flex-nowrap gap-2 md:pr-2'>

                    <div className="bg-theme md:w-2/4 w-full py-10 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className='font-bold text-4xl uppercase '>Limtied time offers</h2>
                            <h2 className='font-bold uppercase flex items-center justify-center mt-4 text-9xl'>
                                15
                                <div className="flex flex-col mt-2">
                                    <span className='text-7xl'>%</span>
                                    <span className='text-3xl'>off</span>
                                </div>
                            </h2>
                            <h2 className='bg-white text-theme capitalize mt-4 py-2 text-4xl font-bold'>on all living rooms</h2>
                            <p className='mt-5'>offers include sofas, armchairs and coffee tables</p>
                        </div>
                    </div>
                    <div className="md:w-2/4 w-full flex items-start gap-4">
                        <div className="flex gap-y-5 gap-x-4 flex-col">

                            {
                                hero.data.slice(0, 2).map(dt => <div key={dt._id}>
                                    <img src={urlFor(dt.image)} alt="" />
                                </div>)
                            }
                        </div>
                        <div className="flex gap-x-4 gap-y-5 flex-col">

                            {
                                hero.data.slice(2, 4).map(dt => <div key={dt._id}>
                                    <img src={urlFor(dt.image)} alt="" />
                                </div>)
                            }
                        </div>
                    </div>


                </div>
            }




        </div>
    )
}

export default Hero