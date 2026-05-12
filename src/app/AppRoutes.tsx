import { Navigate, Outlet, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import TeamPage from '../pages/TeamPage';
import SettingsPage from '../pages/SettingsPage';
import TemplatesPage from '../pages/TemplatesPage';
import DashboardPage from '../pages/DashboardPage';
import MeetingsRoute from '../pages/MeetingsRoute';
import MeetingDetailsPage from '../pages/MeetingDetailsPage';
import { useAuth } from '../features/auth/AuthProvider';
import { MeetingsProvider } from '../features/meetings/MeetingsProvider';
import AppShell from './AppShell';
import LoadingScreen from './LoadingScreen';
import MeetingInvitePrompt from '../features/invites/MeetingInvitePrompt';
import { clearPendingMeetingInvite, getMeetingRedirect, getPendingMeetingInvite, savePendingMeetingInvite } from '../features/invites/inviteStorage';

function RootRoute() {
  const { user, loading, authError, signInDemo } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    const meetingId = searchParams.get('m');
    if (meetingId) {
      clearPendingMeetingInvite();
      return <Navigate to={`/meetings/${meetingId}`} replace />;
    }

    return (
      <MeetingsProvider>
        <AppShell />
      </MeetingsProvider>
    );
  }

  const meetingId = searchParams.get('m');
  if (meetingId) {
    savePendingMeetingInvite(meetingId);
    return <MeetingInvitePrompt meetingId={meetingId} />;
  }

  return (
    <Layout
      user={null}
      onNavigate={navigate}
      onGoogleSignIn={() => navigate('/login')}
    >
      <LandingPage
        onGetStarted={() => navigate('/login')}
        onDemoSignIn={signInDemo}
        authError={authError}
      />
    </Layout>
  );
}

function LoginRoute() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || (searchParams.get('meetingId') ? getMeetingRedirect(searchParams.get('meetingId')!) : getPendingMeetingInvite() ? getMeetingRedirect(getPendingMeetingInvite()!) : '/');

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    clearPendingMeetingInvite();
    return <Navigate to={redirect} replace />;
  }

  return <LoginPage onBack={() => navigate('/')} />;
}

function ProtectedRoutes() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    const meetingMatch = location.pathname.match(/^\/meetings\/([^/]+)/);
    const meetingId = meetingMatch?.[1];
    if (meetingId) {
      savePendingMeetingInvite(meetingId);
    }

    const searchParams = new URLSearchParams({
      redirect: `${location.pathname}${location.search}`,
    });
    if (meetingId) {
      searchParams.set('meetingId', meetingId);
    }

    return <Navigate to={`/login?${searchParams.toString()}`} replace />;
  }

  return (
    <MeetingsProvider>
      <Outlet />
    </MeetingsProvider>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path="/login" element={<LoginRoute />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppShell />}>
          <Route path="meetings" element={<MeetingsRoute />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="meetings/:meetingId" element={<MeetingDetailsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
