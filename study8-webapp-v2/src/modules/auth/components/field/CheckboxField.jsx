import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CheckboxField = ({ id, label, register, validation, error }) => {
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (error) {
            setShake(true);
            setTimeout(() => setShake(false), 500); // Dừng hiệu ứng sau 500ms
        }
    }, [error]);

    return (
        <motion.div
            className="flex items-center"
            animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.3 }}
        >
            <input
                id={id}
                type="checkbox"
                {...register(id, validation)}
                className="w-4 h-4 border-gray-300 rounded"
            />
            <label htmlFor={id} className="ml-2 text-sm text-gray-600">
                {label}
            </label>
        </motion.div>
    );
};

export default CheckboxField;
