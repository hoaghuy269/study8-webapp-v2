import {BrowserRouter, Route, Routes} from "react-router-dom";
import ROUTES from "../constants/routes.js";
import LoginPage from "../pages/auth/LoginPage.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes