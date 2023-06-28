const { useLocation, Outlet, Navigate } = require("react-router-dom");

export default function RequireRoles({ allowedRoles }) {
    const location = useLocation();
    const userRole = localStorage.getItem("role");

    const authorize = allowedRoles.some((role) => userRole === role);
    console.log({ userRole, allowedRoles, authorize });
    if (authorize) {
        return <Outlet />;
    } else {
        return (
            <Navigate to="/role-denied" state={{ from: location }} replace />
        );
    }
}
