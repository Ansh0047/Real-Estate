import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

// private route made so that,if user is authenticated then the profile is shown 
// else the user is redirected to the sign in page
const PrivateRoute = () => {
    const { currentUser } = useSelector(state => state.user);
    return (
        currentUser ? <Outlet /> : <Navigate to="/signin"/>
    );
};

export default PrivateRoute;