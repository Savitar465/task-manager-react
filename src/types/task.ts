export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  createdAt: Date;
}

export interface TaskFilters {
  status?: TaskStatus;
  searchQuery?: string;
  startDate?: Date;
  endDate?: Date;
}