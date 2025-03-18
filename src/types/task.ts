export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id?: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskFilters {
  status?: TaskStatus;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}