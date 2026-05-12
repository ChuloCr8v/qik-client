import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function Benefits() {
  const items = [
    'Eliminate silent minutes with guided transitions.',
    'Ensure every voice is heard with clear roles.',
    'Track items and decisions in real-time.',
    'Synchronized timers across all timezones.'
  ];

  const stats = [
    { label: 'Faster Syncs', value: '45%', color: 'text-primary' },
    { label: 'Templates', value: '100+', color: 'text-secondary' },
    { label: 'Prep Time', value: '0h', color: 'text-secondary' },
    { label: 'Satisfaction', value: '98%', color: 'text-primary' }
  ];

  return (
    <section className="py-16 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-6"
           >
              <h2 className="text-3xl font-semibold text-secondary leading-tight">Focus on decisions,<br />not the structure.</h2>
              <div className="space-y-4">
                 {items.map((item, i) => (
                   <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                         <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <p className="text-[14px] font-medium text-secondary/70">{item}</p>
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
                   <div key={i} className="rounded-2xl border border-border bg-slate-50 p-5">
                      <div className={`${stat.color} font-semibold text-2xl mb-0.5`}>{stat.value}</div>
                      <div className="text-[9px] font-semibold text-muted uppercase tracking-wider">{stat.label}</div>
                   </div>
                 ))}
              </div>
              <div className="space-y-3">
                 {stats.slice(2).map((stat, i) => (
                   <div key={i} className="rounded-2xl border border-border bg-slate-50 p-5">
                      <div className={`${stat.color} font-semibold text-2xl mb-0.5`}>{stat.value}</div>
                      <div className="text-[9px] font-semibold text-muted uppercase tracking-wider">{stat.label}</div>
                   </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
