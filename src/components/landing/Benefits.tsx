import React from 'react';
import {
  motion
} from 'motion/react';
import {
  CheckCircle2
} from 'lucide-react';

export default function Benefits() {
  const items = [
    'Eliminate silent minutes with guided transitions.',
    'Ensure every voice is heard with clear roles.',
    'Track items and decisions in real-time.',
    'Synchronized timers across all timezones.'
  ];

  const stats = [{
    label: 'Faster Syncs',
    value: '45%',
    color: 'text-primary',
    bg: 'from-primary/10'
  },
  {
    label: 'Templates',
    value: '100+',
    color: 'text-secondary',
    bg: 'from-blue-600/10',
  },
  {
    label: 'Prep Time',
    value: '0h',
    color: 'text-secondary',
    bg: 'from-teal-600/10',
  },
  {
    label: 'Satisfaction',
    value: '98%',
    color: 'text-primary',
    bg: 'from-yellow-600/10',
  }];

  return (
    <section className="py-8 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl! md:text-4xl! font-bold text-secondary leading-tight">Focus on decisions,<br />not the structure.</h2>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-base text-secondary/70">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="space-y-3 mt-8">
              {stats.slice(0, 2).map((stat, i) => (
                <div key={i} className={
                  `bg-gradient-to-br ${stat.bg} to-transparent rounded-2xl border border-border p-5`}>
                  <div className={`${stat.color} font-semibold text-3xl mb-0.5`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {stats.slice(2).map((stat, i) => (
                <div key={i} className={
                  `bg-gradient-to-br ${stat.bg} to-transparent rounded-2xl border border-border p-5`}>
                  <div className={`${stat.color} font-semibold text-3xl mb-0.5`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}