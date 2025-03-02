const SelectField = ({ id, label, options, register, errors, validation }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <select
                id={id}
                {...register(id, validation)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
        </div>
    );
};

export default SelectField;
