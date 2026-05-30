import React from 'react';
import {
  motion
} from 'motion/react';

interface SocialProofProps {
  onGetStarted: () => void;
}

export default function SocialProof({
  onGetStarted
}: SocialProofProps) {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_18%_20%,rgba(16,185,129,0.34),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(245,158,11,0.42),transparent_28%),linear-gradient(135deg,#0f172a_0%,#1e293b_42%,#064e3b_100%)] p-8 shadow-2xl shadow-emerald-900/20 sm:p-12"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:36px_36px] opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_34%,rgba(255,255,255,0.08)_68%,transparent)]" />
          <div className="absolute -bottom-16 left-1/2 h-36 w-3/4 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 text-center text-white">
            <div className="flex-1 space-y-2">
              <h2 className="text-4xl font-semibold">Ready to <br className="md:hidden"></br>save hours?</h2>
              <p className="text-base text-emerald-50/80">
                Join 2,000+ teams leading high-performance meetings.
              </p>
            </div>
            <button
              onClick={onGetStarted}
              className="w-full md:max-w-100 text-base! rounded-xl bg-primary px-8 flex items-center justify-center text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-95 border-none! h-10!"
            >
              Get Started for Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
