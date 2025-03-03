import { useContext } from "react";
import {ToastContext} from "../context/ToastContext.js";

export const useToast = () => {
    return useContext(ToastContext);
};
