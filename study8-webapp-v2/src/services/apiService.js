import axios from "axios";
import {t} from "i18next";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const handleResponse = (response) => {
    return response.data;
};

const handleError = (error) => {
    if (error.response) {
        const { statusCode, message, errorCode } = error.response.data;
        return Promise.reject({ statusCode, message, errorCode });
    } else {
        return Promise.reject({ statusCode: 500, message: t("api.error.status_500") });
    }
};

const apiCaller = {
    get: (url, params = {}) =>
        apiService.get(url, { params }).then(handleResponse).catch(handleError),

    post: (url, data) =>
        apiService.post(url, data).then(handleResponse).catch(handleError),

    put: (url, data) =>
        apiService.put(url, data).then(handleResponse).catch(handleError),

    delete: (url) =>
        apiService.delete(url).then(handleResponse).catch(handleError),
};

export default apiCaller;
