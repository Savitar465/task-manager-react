import axiosInstance from "../AxiosInstance.ts";

export const deleteTask = async (id: string): Promise<any> => {
    const response = await axiosInstance.delete('/tasks/' + id);
    return response.data;
};