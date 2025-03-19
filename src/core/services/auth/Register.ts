import {LoginResponse} from "../../../types/login-response.ts";
import {AxiosResponse} from "axios";
import axiosInstance from "../AxiosInstance.ts";

export const register = async (name: string, email: string, password: string): Promise<LoginResponse | null> => {
    try {
        const response: AxiosResponse<LoginResponse> = await axiosInstance.post('/auth/register', {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        return null;
    }
};
