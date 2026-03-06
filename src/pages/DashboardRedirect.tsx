import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const DashboardRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section');

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'traveler') {
    const travelerSection = section === 'settings' ? 'profile' : section;
    return (
      <Navigate
        to={travelerSection ? `/dashboard/traveler?section=${travelerSection}` : '/dashboard/traveler'}
        replace
      />
    );
  }

  const adminSection = section === 'profile' ? 'settings' : section;
  return <Navigate to={adminSection ? `/dashboard/admin?section=${adminSection}` : '/dashboard/admin'} replace />;
};

export default DashboardRedirect;
