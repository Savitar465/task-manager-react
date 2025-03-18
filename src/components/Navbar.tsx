import {LogOut, PlusCircle} from "lucide-react";
import {useNavigate} from "react-router-dom";
import taskIcon from '../../image/task.png';

interface NavbarProps {
    onNewTaskClick: () => void;
}

export default function Navbar({ onNewTaskClick }: NavbarProps) {
    const navigate = useNavigate();
    const onLogoutClick = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <nav className="bg-white shadow">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <img src={taskIcon} alt="Task Icon" className="h-9 w-16" />
                        <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={onNewTaskClick}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-label="Create new task"
                        >
                            <PlusCircle className="h-5 w-5 mr-2" />
                            <span className="hidden sm:inline">New Task</span>
                        </button>
                        <button
                            onClick={onLogoutClick}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            aria-label="Logout"
                        >
                            <LogOut className="h-5 w-5 mr-2" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}