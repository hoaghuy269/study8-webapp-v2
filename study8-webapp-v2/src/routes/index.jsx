import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "../constants/routes.js";
import Login from "../modules/auth/login/Login.jsx";
import Register from "../modules/auth/register/Register.jsx";
import NotFound from "../components/pages/NotFound.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
