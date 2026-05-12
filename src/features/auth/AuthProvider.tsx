import React, { createContext, useContext, useMemo } from 'react';
import toast from 'react-hot-toast';
import { User } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setToken } from './authSlice';
import { useGetMeQuery, useStartEmailSignInMutation, useVerifyEmailSignInMutation } from './authApi';
import { baseApi } from '../api/baseApi';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  authError: string | null;
  signInDemo: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const { data: user, isLoading, error } = useGetMeQuery(undefined, { skip: !token });
  const [startEmailSignIn] = useStartEmailSignInMutation();
  const [verifyEmailSignIn] = useVerifyEmailSignInMutation();

  const signInDemo = async () => {
    const id = crypto.randomUUID().slice(0, 8);
    const email = `guest-${id}@qikagenda.local`;
    const startResult = await startEmailSignIn({
      email,
    }).unwrap();
    if (!startResult.devCode) {
      toast.error('Demo sign-in needs local dev codes enabled.');
      return;
    }
    const result = await verifyEmailSignIn({ email, code: startResult.devCode }).unwrap();
    dispatch(setToken(result.token));
    toast.success('Signed in as guest');
  };

  const signOut = () => {
    dispatch(setToken(null));
    dispatch(baseApi.util.resetApiState());
  };

  const value = useMemo(
    () => ({
      user: token ? user || null : null,
      loading: !!token && isLoading,
      authError: error ? 'Your session expired. Please sign in again.' : null,
      signInDemo,
      signOut,
    }),
    [user, token, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
