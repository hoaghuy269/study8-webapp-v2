import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {CheckCircleIcon} from "lucide-react";
import {t} from "i18next";
import ROUTES from "../../../constants/routes.js";

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-4 md:space-y-6 flex flex-col items-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <CheckCircleIcon className="w-16 h-16 text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">{t("text.auth.register_success")}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
                {t("text.auth.login_to_using")}
            </p>
            <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
                {t("text.auth.login_now")}
            </button>
        </div>
    );
};

export default SuccessPage;