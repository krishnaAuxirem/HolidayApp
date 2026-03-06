import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'traveler') {
    return <Navigate to="/dashboard/traveler" replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  return <Navigate to="/" replace />;
};

export default Profile;
