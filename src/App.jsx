import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Layout from './pages/Layout/Layout';
import Home from "./pages/Home/Home";
import Room from "./pages/Room/Room";
import BedRoom from "./components/Bedroom/BedRoom";
import ChildRoom from "./components/ChildrenRoom/ChildRoom";
import ProductDetials from "./pages/Product/ProductDetials";
import Buy from "./pages/Buy/Buy";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from './redux/slices/userSlice/CAT/getUser';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import CartProducts from "./components/cart/Cart";
import { getItemFromLocal } from "./redux/slices/cartSlice/cartSlice";
import { returnFromLocal } from "./redux/slices/wishingSlice/wishingSlice";
import Register from "./pages/Reigster/Register";
import LivingRoom from "./components/livingRoom/LivingRoom";
import PaymentSuccess from "./components/paymentSuccess/PaymentSuccess";


const App = () => {

  const dispatch = useDispatch();

  // console.log(user);

  function getUserInfo() {
    if (localStorage.getItem("userID")) {
      dispatch(getUser(localStorage.getItem("userID")))
    }
  }

  useEffect(() => {
    dispatch(returnFromLocal())
    dispatch(getItemFromLocal())
    getUserInfo()
  }, [])

  const ProtectRegister = ({ children }) => {

    if (localStorage.getItem("userID")) {
      return <Navigate to={'/'} />
    } else {
      return children
    }

  }




  const routes = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <Home /> },
        {
          path: '/room', element: <Room />, children: [
            { path: ':cat', element: <BedRoom /> },
            { path: ':cat', element: <ChildRoom /> },
            { path: ':cat', element: <LivingRoom /> },
          ]
        },
        {
          path: '/product/:id', element: <ProductDetials />
        },
        {
          path: '/buy', element: <ProtectRoute> <Buy /> </ProtectRoute>
        },
        {
          path: '/cart', element: <CartProducts />
        },
        {
          path: '/payment-success', element: <PaymentSuccess />
        },
        {
          path: '/register', element: <ProtectRegister> <Register /> </ProtectRegister>
        },

      ]
    }
  ])

  return <RouterProvider router={routes} >
  </RouterProvider>
}

export default App