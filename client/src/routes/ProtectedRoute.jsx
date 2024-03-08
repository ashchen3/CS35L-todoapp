import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../services/AuthContext";

/**
 * Checks that the user is authenticated and provides
 * an outlet to children routes.
 * Navigates to the login route if user is not authenticated.
 */
const ProtectedRoute = () => {
    const { token } = useAuth();
    if (token === null) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
