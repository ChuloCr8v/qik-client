import type {
  FormEvent
} from 'react';
import {
  CalendarArrowDown
} from 'lucide-react';
import {
  EmailSignInForm
} from './EmailSignInForm';
import {
  GoogleSignInButton
} from './GoogleSignInButton';
import {
  LoginMeetingContext
} from './LoginMeetingContext';

interface LoginFormPanelProps {
  email: string;
  isEmailLoading: boolean;
  isGoogleLoading: boolean;
  onEmailChange: (email: string) => void;
  onEmailSubmit: (event: FormEvent) => void;
  onGoogleSignIn: () => void;
  meetingId?: string | null;
}

export function LoginFormPanel({
  email,
  isEmailLoading,
  isGoogleLoading,
  onEmailChange,
  onEmailSubmit,
  onGoogleSignIn,
  meetingId,
}: LoginFormPanelProps) {
  return (
    <div className="w-full max-w-sm space-y-4 max-lg:-mt-48">
      <div className="text-center lg:text-left space-y-2">
        <div className="lg:hidden mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-6">
          <CalendarArrowDown className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-secondary">Welcome back</h2>
        <p className="font-medium text-muted">
          Sign in to manage your meetings and agendas.
        </p>
      </div>

      <LoginMeetingContext meetingId={meetingId} />

      <div className="space-y-4">
        <GoogleSignInButton isLoading={isGoogleLoading} onClick={onGoogleSignIn} />

        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-slate-50 lg:bg-white px-4 text-sm text-slate-600">OR</span>
        </div>

        <EmailSignInForm
          email={email}
          isLoading={isEmailLoading}
          onEmailChange={onEmailChange}
          onSubmit={onEmailSubmit}
        />
      </div>

      <p className="text-center text-gray-600 px-8">
        By clicking continue, you agree to our <br></br>{' '}
        <a href="#" className="font-bold text-secondary hover:underline">Terms of Service</a> and{' '}
        <a href="#" className="font-bold text-secondary hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
}