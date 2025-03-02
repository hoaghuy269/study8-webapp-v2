import { t } from "i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SubmitButton = ({ label, isLoading, className, ...props }) => {
    return (
        <button
            type="submit"
            className={`w-full flex justify-center items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
                disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                    {t("common.loading")}
                </>
            ) : (
                label
            )}
        </button>
    );
};

export default SubmitButton;
