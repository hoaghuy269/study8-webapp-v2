import { Info } from "lucide-react";

const InfoInputField = ({ id, label, type = "text", placeholder, register, errors, validation, tooltip }) => {
    return (
        <div className="relative">
            <div className="flex items-center gap-1">
                <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
                {tooltip && (
                    <div className="relative group">
                        <Info size={16} className="text-gray-500 cursor-pointer group-hover:text-blue-500" />
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs rounded p-2 shadow-lg">
                            {tooltip}
                        </div>
                    </div>
                )}
            </div>
            <input
                id={id}
                type={type}
                {...register(id, validation)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
            />
            {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
        </div>
    );
};

export default InfoInputField;
