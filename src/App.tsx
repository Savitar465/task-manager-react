import {useCallback, useMemo, useState} from 'react';
import {CheckCircle, Edit, PlusCircle, Trash2} from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import {Task, TaskFilters as TaskFiltersType, TaskStatus} from './types/task';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filters, setFilters] = useState<TaskFiltersType>({});
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>();

    const handleCreateTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Task = {
            ...taskData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            status: 'pending' // New tasks always start as pending
        };
        setTasks(prev => [...prev, newTask]);
        setIsFormOpen(false);
    }, []);

    const handleUpdateTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
        if (!editingTask) return;

        setTasks(prev => prev.map(task =>
            task.id === editingTask.id
                ? {...task, ...taskData}
                : task
        ));
        setEditingTask(undefined);
    }, [editingTask]);

    const handleDeleteTask = useCallback((taskId: string) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    }, []);

    const handleStatusChange = useCallback((task: Task, newStatus: TaskStatus) => {
        // Validate status transitions
        if (
            (newStatus === 'in-progress' && task.status !== 'pending') ||
            (newStatus === 'completed' && task.status !== 'in-progress') ||
            (newStatus === 'pending') // Can't go back to pending
        ) {
            return;
        }

        setTasks(prev => prev.map(t =>
            t.id === task.id
                ? {...t, status: newStatus}
                : t
        ));
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            // Status filter
            if (filters.status && task.status !== filters.status) {
                return false;
            }

            // Search query filter
            if (filters.searchQuery) {
                const searchLower = filters.searchQuery.toLowerCase();
                const matchesSearch =
                    task.title.toLowerCase().includes(searchLower) ||
                    (task.description?.toLowerCase().includes(searchLower));

                if (!matchesSearch) {
                    return false;
                }
            }

            // Date range filter
            if (filters.startDate && task.dueDate && new Date(task.dueDate) < filters.startDate) {
                return false;
            }
            return !(filters.endDate && task.dueDate && new Date(task.dueDate) > filters.endDate);


        });
    }, [tasks, filters]);

    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-600 bg-yellow-50';
            case 'in-progress':
                return 'text-blue-600 bg-blue-50';
            case 'completed':
                return 'text-green-600 bg-green-50';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusCircle className="h-5 w-5 mr-2"/>
                        New Task
                    </button>
                </div>

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
                        {filteredTasks.map(task => (
                            <li key={task.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
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
                                                        onClick={() => handleStatusChange(task, 'in-progress')}
                                                        className="p-2 text-blue-400 hover:text-blue-500"
                                                    >
                                                        <CheckCircle className="h-5 w-5"/>
                                                    </button>
                                                )}
                                                {task.status === 'in-progress' && (
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
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="p-2 text-red-400 hover:text-red-500"
                                        >
                                            <Trash2 className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {filteredTasks.length === 0 && (
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

export default App;