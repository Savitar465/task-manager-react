import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import PrivateRoute from "./core/routes/PrivateRoute.tsx";
import TasksPage from "./components/pages/TasksPage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import RegisterPage from "./components/pages/RegisterPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<Navigate to="/tasks" replace />} />
                <Route
                    path="/tasks"
                    element={
                        <PrivateRoute>
                            <TasksPage/>
                        </PrivateRoute>
                    }
                />
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;