const NotFound = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-gray-50 from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
            <div className="text-center">
                <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-400 dark:to-blue-500">
                    404
                </h1>
                <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Oops! Page Not Found
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>
                <a
                    href="/"
                    className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-indigo-800 transition-all"
                >
                    Back to Homepage
                </a>
            </div>
        </section>
    );
};

export default NotFound;
