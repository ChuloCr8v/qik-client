import React from 'react';
import { motion } from 'motion/react';

interface SocialProofProps {
  onGetStarted: () => void;
}

export default function SocialProof({ onGetStarted }: SocialProofProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-linear-to-br from-secondary to-slate-800 p-8 sm:p-12"
        >
          <div className="flex flex-col items-center gap-6 text-center text-white md:flex-row md:text-left">
            <div className="flex-1 space-y-2">
              <h2 className="text-3xl font-semibold">Ready to save hours?</h2>
              <p className="text-[14px] font-medium opacity-70">Join 2,000+ teams leading high-performance meetings.</p>
            </div>
            <button
              onClick={onGetStarted}
              className="rounded-xl bg-primary px-8 py-3.5 text-[12px] font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-95"
            >
              Get Started for Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
