import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {login} from "../../core/services/auth/Login.ts";
import Loading from "../Loading.tsx";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let loginResponse = await login(email, password);
            if (loginResponse === null) {
                console.error('Invalid credentials');
                setError('Invalid credentials');
                setIsLoading(false);
                return;
            } else {
                console.log('Logged in');
                localStorage.setItem('token', loginResponse.token);
                navigate('/tasks');
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            // Handle error
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {isLoading && <Loading />}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                {error && <div className="mb-4 text-red-600">{error}</div>}
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Login
                </button>
                <div className="mt-4 text-center">
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register a new account
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;