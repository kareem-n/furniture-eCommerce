import { Navigate } from 'react-router-dom';
import { setErrorMSG, setIsLoginSectionOpened } from '../../redux/slices/userSlice/userSlice';
import { useDispatch } from 'react-redux';

const ProtectRoute = ({ children }) => {


    const dispatch = useDispatch()

    if (!localStorage.getItem("userID")) {
        dispatch(setErrorMSG('please login first'));
        dispatch(setIsLoginSectionOpened(true));
        return <Navigate to={'/'} />;
        // Prevent navigation by redirecting to the current path (stay on the same page)
    }

    if (localStorage.getItem("userID")) {
        return children;
    }

    return null; // Return nothing if the user is not authenticated
};

export default ProtectRoute;
