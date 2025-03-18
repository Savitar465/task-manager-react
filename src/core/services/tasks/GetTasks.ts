import axiosInstance from "../AxiosInstance.ts";
import {Task, TaskFilters as TaskFiltersType} from '../../../types/task';

export const getTasks = async (filters: TaskFiltersType): Promise<Task[]> => {
    const response = await axiosInstance.get('/tasks',
        {
            params: {
                ...filters
            }
        }
    );
    return response.data;
};