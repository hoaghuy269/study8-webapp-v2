const Toast = ({ message, type = "success", onClose }) => {
    const toastClasses = {
        success: "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
        error: "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200",
        warning: "text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200",
    };

    return (
        <div
            className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800 ${toastClasses[type]}`}
            role="alert"
        >
            <div className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${toastClasses[type]}`}>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
            </div>
            <div className="ms-3 text-sm font-normal">{message}</div>
            <button
                type="button"
                className="ms-auto bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={onClose}
            >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    );
};

export default Toast;
