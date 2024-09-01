import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setIsLoginSectionOpened } from "../../redux/slices/userSlice/userSlice";
import toast from "react-hot-toast";

function Footer() {


  const { user } = useSelector(s => s.userSlice);

  const dispatch = useDispatch();
  return (
    <div className="md:py-10 py-5 md:px-48 px-5 bg-white flex items-center justify-between gap-x-10">

      <div className="md:text-6xl text-3xl uppercase font-bold text-theme">
        furniture
      </div>


      <div className="flex flex-col items-center gap-y-2">
        <h2 className="text-lg font-bold capitalize">
          quick links
        </h2>

        <Link className="hover:underline" to={'/'}>Home</Link>
        <Link className="hover:underline" to={'/cart'}>Cart</Link>
        <button
          onClick={() => {
            if (!user) {
              dispatch(setIsLoginSectionOpened(true))
            } else {
              toast.error("there is already user logged in")
            }

          }}
          className="hover:underline"
        >Login</button>
        <Link className="hover:underline" to={'/register'}>Create account</Link>

      </div>


    </div>
  )
}

export default Footer