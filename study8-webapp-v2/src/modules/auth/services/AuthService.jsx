import apiCaller from "../../../services/apiService.js";
import API_URL from "../../../constants/api.js";

const authService = {
    login: async (username, password) => {
        return apiCaller.post(API_URL.LOGIN, {username, password});
    },
    registerCREATE: async (email) => {
        return apiCaller.post(API_URL.REGISTER, {email, step: "CREATE"});
    },
    registerOTP: async (id) => {
        return apiCaller.post(API_URL.REGISTER, {id, step: "OTP"});
    }
};

export default authService;
