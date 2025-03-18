import axiosInstance from "../AxiosInstance.ts";
import { Task } from '../../../types/task';

export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await axiosInstance.post('/tasks', task);
    return response.data;
};