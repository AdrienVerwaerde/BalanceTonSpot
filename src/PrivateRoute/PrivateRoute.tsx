import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute ({ children }: { children: React.ReactNode }){
    const location = useLocation();
    const token = localStorage.getItem('userToken');

    if (!token) {
        // If token is absent, redirects to login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}