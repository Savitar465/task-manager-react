import {useCallback, useEffect, useState} from "react";
import {Task, TaskFilters as TaskFiltersType, TaskStatus} from "../../types/task.ts";
import {CheckCircle, Edit, Trash2} from "lucide-react";
import TaskFilters from "../TaskFilters.tsx";
import TaskForm from "../TaskForm.tsx";
import {createTask} from "../../core/services/tasks/CreateTask.ts";
import {getTasks} from "../../core/services/tasks/GetTasks.ts";
import {updateTask} from "../../core/services/tasks/UpdateTask.ts";
import {deleteTask} from "../../core/services/tasks/DeleteTask.ts";
import Navbar from "../Navbar.tsx";

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filters, setFilters] = useState<TaskFiltersType>({});
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>();

    const handleCreateTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newTask: Task = {
            ...taskData,
        };
        let taskCreated = await createTask(newTask);
        if (taskCreated) {
            setTasks(prev => [...prev, taskCreated]);
            setIsFormOpen(false);
        } else {
            alert('Error creating task');
        }
    }, []);

    const handleUpdateTask = useCallback(async (taskData: Omit<Task, 'createdAt' | 'updatedAt'>) => {
        if (!editingTask) return;
        taskData.id = editingTask.id;
        let taskUpdated = await updateTask(taskData)

        if (taskUpdated) {
            setTasks(prev => prev.map(task =>
                task.id === taskUpdated.id
                    ? {...task, ...taskUpdated}
                    : task
            ));
            setEditingTask(undefined);
        } else {
            alert('Error updating task');
        }
    }, [editingTask]);

    const handleDeleteTask = useCallback(async (taskId: string) => {
        let taskDeleted = await deleteTask(taskId)
        console.log("taskDeleted", taskDeleted)
        setTasks(prev => prev.filter(task => task.id !== taskId));
    }, []);

    const handleStatusChange = useCallback(async (task: Task, newStatus: TaskStatus) => {
        // Validate status transitions
        if (
            (newStatus === 'in_progress' && task.status !== 'pending') ||
            (newStatus === 'completed' && task.status !== 'in_progress') ||
            (newStatus === 'pending') // Can't go back to pending
        ) {
            return;
        }
        task.status = newStatus;
        let taskUpdated = await updateTask(task)

        if (taskUpdated) {
            setTasks(prev => prev.map(t =>
                t.id === task.id
                    ? {...t, status: newStatus}
                    : t
            ));
        } else {
            alert('Error updating task');
        }
    }, []);


    useEffect(() => {
        const fetchFilteredTasks = async () => {
            try {
                const response = await getTasks(filters)
                setTasks(response);
            } catch (error) {
                console.error('Error fetching filtered tasks:', error);
            }
        };

        fetchFilteredTasks();
    }, [filters]);

    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-600 bg-yellow-50';
            case 'in_progress':
                return 'text-blue-600 bg-blue-50';
            case 'completed':
                return 'text-green-600 bg-green-50';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <Navbar onNewTaskClick={() => setIsFormOpen(true)}/>
            <div className="max-w-4xl mx-auto mt-6">
                <TaskFilters filters={filters} onFilterChange={setFilters}/>

                {(isFormOpen || editingTask) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="w-full max-w-md">
                            <TaskForm
                                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                                onCancel={() => {
                                    setIsFormOpen(false);
                                    setEditingTask(undefined);
                                }}
                                initialTask={editingTask}
                            />
                        </div>
                    </div>
                )}

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {tasks.map(task => (
                            <li key={task.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status!)}`}>
                        {task.status!.charAt(0).toUpperCase() + task.status!.slice(1).replace('-', ' ')}
                      </span>
                                        </div>
                                        {task.description && (
                                            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                                        )}
                                        {task.dueDate && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                Due: {new Date(task.dueDate).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                        {task.status !== 'completed' && (
                                            <>
                                                <button
                                                    onClick={() => setEditingTask(task)}
                                                    className="p-2 text-gray-400 hover:text-gray-500"
                                                >
                                                    <Edit className="h-5 w-5"/>
                                                </button>
                                                {task.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleStatusChange(task, 'in_progress')}
                                                        className="p-2 text-blue-400 hover:text-blue-500"
                                                    >
                                                        <CheckCircle className="h-5 w-5"/>
                                                    </button>
                                                )}
                                                {task.status === 'in_progress' && (
                                                    <button
                                                        onClick={() => handleStatusChange(task, 'completed')}
                                                        className="p-2 text-green-400 hover:text-green-500"
                                                    >
                                                        <CheckCircle className="h-5 w-5"/>
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        <button
                                            onClick={() => handleDeleteTask(task.id!)}
                                            className="p-2 text-red-400 hover:text-red-500"
                                        >
                                            <Trash2 className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {tasks.length === 0 && (
                            <li className="px-6 py-12">
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">No tasks found</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );

}