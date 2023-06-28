import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
    const user = localStorage.getItem("id");
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user) {
        return <Outlet />;
    }
}
