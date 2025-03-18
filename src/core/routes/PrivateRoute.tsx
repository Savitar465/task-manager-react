import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {verifyToken} from "../services/auth/VerifyToken.ts";


const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const valid = await verifyToken(token);
                setIsValid(valid);
            } else {
                setIsValid(false);
            }
        };
        checkToken();
    }, []);

    if (isValid === null) {
        return <div>Loading...</div>;
    }

    return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;