import {LoginResponse} from "../../../types/login-response.ts";
import {AxiosResponse} from "axios";
import axiosInstance from "../AxiosInstance.ts";

export const login = async (email: string, password: string): Promise<LoginResponse | null> => {
    try {
        const response: AxiosResponse<LoginResponse> = await axiosInstance.post('/auth/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        return null;
    }
};