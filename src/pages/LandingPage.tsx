import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import SocialProof from '../components/landing/SocialProof';
import Benefits from '../components/landing/Benefits';

interface LandingPageProps {
  onGetStarted: () => void;
  onDemoSignIn: () => void;
  authError?: string | null;
}

export default function LandingPage({ onGetStarted, onDemoSignIn, authError }: LandingPageProps) {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <Hero onGetStarted={onGetStarted} onDemoSignIn={onDemoSignIn} />

      {authError && (
        <div className="mx-auto max-w-sm rounded-lg border border-red-100 bg-red-50 p-3 text-[11px] font-medium text-red-500 mb-8">
          {authError}
        </div>
      )}

      {/* Features Section */}
      <Features />

      {/* Social Proof (CTA) */}
      <SocialProof onGetStarted={onGetStarted} />

      {/* Benefits Content */}
      <Benefits />
    </div>
  );
}
