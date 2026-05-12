import React, { useState } from 'react';
import { User } from '../types';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  hideFooter?: boolean;
  activePath?: string;
  onNavigate?: (path: string) => void;
  onGoogleSignIn?: () => void;
}

export default function Layout({ 
  children, 
  user, 
  hideFooter = false,
  activePath = '/',
  onNavigate,
  onGoogleSignIn
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Persistent on desktop, drawer on mobile */}
      {user && onNavigate && (
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          activePath={activePath}
          onNavigate={onNavigate}
        />
      )}

      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <Header 
          user={user} 
          onMenuClick={() => setIsSidebarOpen(true)} 
          onNavigate={onNavigate} 
          onGoogleSignIn={onGoogleSignIn}
        />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="min-h-full flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            {!hideFooter && <Footer variant={user ? 'minimal' : 'full'} />}
          </div>
        </main>
      </div>
    </div>
  );
}
