import axiosInstance from "../AxiosInstance.ts";
import { Task } from '../../../types/task';

export const updateTask = async (task: Omit<Task, 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await axiosInstance.put('/tasks/'+task.id, task);
    return response.data;
};