import type { ReactNode } from 'react';
import { AuthBrandPanel } from './AuthBrandPanel';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <AuthBrandPanel />
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 bg-slate-50 lg:bg-white">
        {children}
      </div>
    </div>
  );
}
