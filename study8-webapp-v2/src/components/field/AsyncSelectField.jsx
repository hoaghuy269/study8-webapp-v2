import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import apiCaller from "../../services/apiService.js";
import { useToast } from "../../hook/useToast.js";

const AsyncSelectField = ({ id, label, placeholder, url, control, errors, validation }) => {
    const { addToast } = useToast();
    const [options, setOptions] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const isFetching = useRef(false);
    const debounceTimeout = useRef(null);

    const fetchOptions = async (search = "", pageNum = 0) => {
        if (isFetching.current) return;

        isFetching.current = true;
        try {
            const fullUrl = `${url}&search=${encodeURIComponent(search)}&page=${pageNum}`;
            const response = await apiCaller.get(fullUrl);

            const data = response?.data?.datas;
            const totalData = response?.data?.totalData ?? 0;

            if (!Array.isArray(data)) {
                return;
            }

            const newOptions = data.map((item) => ({
                value: item.code,
                label: item.value,
            }));

            setOptions((prev) => (pageNum === 0 ? newOptions : [...prev, ...newOptions]));
            setHasMore(options.length + newOptions.length < totalData);
        } catch (error) {
            addToast(error.message);
        } finally {
            isFetching.current = false;
        }
    };

    const handleInputChange = (newValue) => {
        if (newValue === searchTerm) return;

        setSearchTerm(newValue);
        setPage(0);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            await fetchOptions(newValue, 0);
        }, 500);
    };

    const handleMenuScrollToBottom = async () => {
        if (hasMore && !isFetching.current) {
            const nextPage = page + 1;
            setPage(nextPage);
            await fetchOptions(searchTerm, nextPage);
        }
    };

    useEffect(() => {
        fetchOptions("", 0);
    }, [url]);

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <Controller
                name={id}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        id={id}
                        options={options}
                        onInputChange={handleInputChange}
                        onMenuScrollToBottom={handleMenuScrollToBottom}
                        isLoading={!options.length}
                        isClearable
                        placeholder={placeholder}
                        className="mt-1"
                    />
                )}
            />
            {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
        </div>
    );
};

export default AsyncSelectField;
