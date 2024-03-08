import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../services/AuthContext";

/**
 * Checks that the user is not authenticated and provides
 * an outlet to children routes.
 * Navigates to the home page if user is authenticated.
 */
const AnonymousRoute = () => {
    const { token } = useAuth();
    if (token !== null) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default AnonymousRoute;
