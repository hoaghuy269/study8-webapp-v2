import apiCaller from "../../../services/apiService.js";
import API_URL from "../../../constants/api.js";

const authService = {
    login: async (username, password) => {
        return apiCaller.post(API_URL.LOGIN, {username, password});
    }
};

export default authService;
