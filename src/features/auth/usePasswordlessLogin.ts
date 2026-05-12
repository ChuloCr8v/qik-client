import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { setToken } from './authSlice';
import {
  useGoogleSignInMutation,
  useStartEmailSignInMutation,
  useVerifyEmailSignInMutation,
} from './authApi';
import { useAppDispatch } from '../../store/hooks';
import {
  googleClientId,
  isGoogleSignInConfigured,
  loadGoogleIdentityScript,
} from './googleIdentity';

type UsePasswordlessLoginOptions = {
  onAuthenticated?: () => void;
};

export function usePasswordlessLogin(options: UsePasswordlessLoginOptions = {}) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [devCode, setDevCode] = useState('');
  const [isCodeStep, setIsCodeStep] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [startEmailSignIn] = useStartEmailSignInMutation();
  const [verifyEmailSignIn] = useVerifyEmailSignInMutation();
  const [googleSignIn] = useGoogleSignInMutation();

  const handleGoogleSignIn = async () => {
    if (!isGoogleSignInConfigured()) {
      toast.error('Google sign-in needs GOOGLE_CLIENT_ID in the client env.');
      return;
    }

    setIsGoogleLoading(true);
    try {
      await loadGoogleIdentityScript();
      window.google?.accounts.id.initialize({
        client_id: googleClientId!,
        callback: async response => {
          if (!response.credential) {
            toast.error('Google did not return a credential.');
            setIsGoogleLoading(false);
            return;
          }

          try {
            const result = await googleSignIn({ credential: response.credential }).unwrap();
            dispatch(setToken(result.token));
            toast.success('Successfully signed in!');
            options.onAuthenticated?.();
          } catch (error) {
            console.error(error);
            toast.error('Google sign-in failed.');
          } finally {
            setIsGoogleLoading(false);
          }
        },
      });
      window.google?.accounts.id.prompt(notification => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setIsGoogleLoading(false);
        }
      });
    } catch (error) {
      console.error(error);
      toast.error('Google sign-in failed to load.');
      setIsGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async (event: FormEvent) => {
    event.preventDefault();
    if (!email) return;

    setIsEmailLoading(true);
    try {
      const result = await startEmailSignIn({ email }).unwrap();
      setIsCodeStep(true);
      setDevCode(result.devCode || '');
      if (result.devCode) {
        setCode(result.devCode);
      }
      toast.success('Sign-in code sent!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send sign-in code.');
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleVerifyCode = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !code) return;

    setIsEmailLoading(true);
    try {
      const result = await verifyEmailSignIn({ email, code }).unwrap();
      dispatch(setToken(result.token));
      toast.success('Successfully signed in!');
      options.onAuthenticated?.();
    } catch (error) {
      console.error(error);
      toast.error('Invalid or expired sign-in code.');
    } finally {
      setIsEmailLoading(false);
    }
  };

  const resetEmailStep = () => {
    setIsCodeStep(false);
    setCode('');
    setDevCode('');
  };

  return {
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
  };
}
