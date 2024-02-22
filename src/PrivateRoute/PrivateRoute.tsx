import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute ({ children }: { children: React.ReactNode }){
    const location = useLocation();
    const token = localStorage.getItem('userToken');

    if (!token) {
        // Si le token n'est pas présent, redirige vers la page de connexion
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}