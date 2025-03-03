import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "../constants/routes.js";
import LoginPage from "../modules/auth/pages/LoginPage.jsx";
import RegisterPage from "../modules/auth/pages/RegisterPage.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
