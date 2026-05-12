import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { CodeVerificationCard } from '../features/auth/components/CodeVerificationCard';
import { LoginFormPanel } from '../features/auth/components/LoginFormPanel';
import { usePasswordlessLogin } from '../features/auth/usePasswordlessLogin';
import { clearPendingMeetingInvite, getMeetingRedirect, savePendingMeetingInvite } from '../features/invites/inviteStorage';

interface LoginPageProps {
  onBack?: () => void;
}

export default function LoginPage({ onBack: _onBack }: LoginPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get('meetingId');
  const redirect = searchParams.get('redirect') || (meetingId ? getMeetingRedirect(meetingId) : '/');

  useEffect(() => {
    if (meetingId) {
      savePendingMeetingInvite(meetingId);
    }
  }, [meetingId]);

  const {
    email,
    setEmail,
    code,
    setCode,
    devCode,
    isCodeStep,
    isEmailLoading,
    isGoogleLoading,
    handleGoogleSignIn,
    handleEmailSignIn,
    handleVerifyCode,
    resetEmailStep,
  } = usePasswordlessLogin({
    onAuthenticated: () => {
      clearPendingMeetingInvite();
      navigate(redirect, { replace: true });
    },
  });

  return (
    <AuthLayout>
      {isCodeStep ? (
        <CodeVerificationCard
          email={email}
          code={code}
          devCode={devCode}
          isLoading={isEmailLoading}
          onCodeChange={setCode}
          onSubmit={handleVerifyCode}
          onUseDifferentEmail={resetEmailStep}
        />
      ) : (
        <LoginFormPanel
          email={email}
          isEmailLoading={isEmailLoading}
          isGoogleLoading={isGoogleLoading}
          onEmailChange={setEmail}
          onEmailSubmit={handleEmailSignIn}
          onGoogleSignIn={handleGoogleSignIn}
          meetingId={meetingId}
        />
      )}
    </AuthLayout>
  );
}
