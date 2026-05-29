import React from 'react';
import {
  motion
} from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onDemoSignIn: () => void;
}

export default function Hero({
  onGetStarted, onDemoSignIn
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20">
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full -translate-x-1/2 [background:radial-gradient(50%_50%_at_50%_50%,rgba(217,119,6,0.03)_0,rgba(255,255,255,0)_100%)]"></div>

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div
          initial={ { opacity: 0, scale: 0.95 }}
          animate={ { opacity: 1, scale: 1 }}
          transition={ { duration: 0.5 }}
          className="space-y-6"
          >
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-semibold text-primary border border-amber-100/50">
            <Sparkles className="h-3 w-3" />
            <span className="uppercase tracking-wider">One Prompt, Full Meeting Agenda</span>
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-secondary xl:text-6xl leading-[1.1]">
            Meetings that actually <span className="text-primary italic font-serif">move</span> teams.
          </h1>

          <p className="mx-auto md:-mt-5 max-w-xl text-base font-medium text-muted">
            Build structured, high-impact meetings in seconds. No more wasted hours.
          </p>

          <div className="max-w-[400px] w-full place-self-center flex md:grid grid-cols-2 flex-col items-center justify-center gap-3 sm:flex-row pt-4">
            <button
              onClick={onGetStarted}
              className="flex h-10! w-full items-center justify-center gap-2.5 rounded-xl bg-secondary px-8 py-3.5 text-[12px] font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95 sm:w-auto"
              >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onDemoSignIn}
              className="group h-10! w-full flex items-center justify-center gap-1.5 px-6 py-3.5 text-[12px] font-semibold text-muted transition-colors hover:text-primary"
              >
              <span>Explore Guest Demo</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={ { opacity: 0, y: 30 }}
          animate={ { opacity: 1, y: 0 }}
          transition={ { duration: 0.6, delay: 0.3 }}
          className="mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-1.5"
          >
          <div className="aspect-[21/9] rounded-xl bg-slate-50 p-6 flex flex-col gap-4 border border-border/30">
            <div className="flex items-center gap-2 border-b border-border/50 pb-3">
              <div className="h-2 w-2 rounded-full bg-slate-200" />
              <div className="h-2 w-2 rounded-full bg-slate-200" />
              <div className="h-2 w-2 rounded-full bg-slate-200" />
              <div className="ml-4 h-2 w-32 rounded-full bg-slate-100" />
            </div>
            <div className="flex-1 flex gap-4">
              <div className="w-1/3 space-y-2">
                <div className="h-2 w-full rounded bg-slate-200/50" />
                <div className="h-2 w-4/5 rounded bg-slate-200/30" />
                <div className="h-2 w-full rounded bg-slate-200/50" />
              </div>
              <div className="flex-1 rounded-lg bg-white border border-border/20   p-4 space-y-3">
                <div className="h-3 w-1/2 rounded bg-primary/10" />
                <div className="space-y-1.5 text-left">
                  <div className="h-2 w-full rounded bg-slate-50" />
                  <div className="h-2 w-full rounded bg-slate-50" />
                  <div className="h-2 w-3/4 rounded bg-slate-50" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-12 rounded bg-slate-50" />
                  <div className="h-6 w-12 rounded bg-slate-50" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}