import { Routes, Route, useLocation, Router } from "react-router-dom";
import RequireAuth from "./config/RequireAuth";
import RequireRoles from "./config/RequireRoles";
import { Roles } from "./config/Roles";
import Catalog from "./pages/catalog/Catalog";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MarketConfig from "./pages/marketconfig/MarketConfig";
import Register from "./pages/register/Register";
import SuperAdminMenu from "./pages/superadminmenu/SuperAdminMenu";
import Navbar from "./pages/Navbar";
import Unauthorized from "./pages/Unauthorized";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/role-denied" element={<Unauthorized />} />

                <Route element={<RequireAuth />}>
                    <Route
                        element={
                            <RequireRoles
                                allowedRoles={[...Object.values(Roles)]}
                            />
                        }
                    >
                        <Route path="/catalog" element={<Catalog />} />
                    </Route>
                    <Route
                        element={
                            <RequireRoles allowedRoles={[Roles.superadmin]} />
                        }
                    >
                        <Route
                            path="/superadmin"
                            element={<SuperAdminMenu />}
                        />
                    </Route>
                    <Route
                        element={
                            <RequireRoles
                                allowedRoles={[
                                    Roles.adminlocal,
                                    Roles.adminregional,
                                ]}
                            />
                        }
                    >
                        <Route
                            path="/config-market"
                            element={<MarketConfig />}
                        />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
