import axiosInstance from "../AxiosInstance.ts";

export const verifyToken = async (): Promise<boolean> => {
    try {
        const response = await axiosInstance.get('/auth/verify-token');
        return response.status === 200;
    } catch (error) {
        return false;
    }
};