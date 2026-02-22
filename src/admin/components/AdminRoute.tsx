import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AdminRoute = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return null;

    if (user && user.isAdmin) {
        return <Outlet />;
    }

    return <Navigate to="/" replace />;
};

export default AdminRoute;
