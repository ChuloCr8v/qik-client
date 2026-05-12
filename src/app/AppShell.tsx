import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../features/auth/AuthProvider';

export default function AppShell() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const activePath = location.pathname.startsWith('/meetings')
    ? '/meetings'
    : location.pathname;

  return (
    <Layout
      user={user}
      activePath={activePath}
      onNavigate={navigate}
    >
      <Outlet />
    </Layout>
  );
}
