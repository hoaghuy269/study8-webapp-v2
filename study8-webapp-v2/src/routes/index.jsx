import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "../constants/routes.js";
import LoginPage from "../modules/auth/pages/LoginPage.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
