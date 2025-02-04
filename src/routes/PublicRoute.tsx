import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/search" replace /> : <Outlet />;
};

export default PublicRoute;
