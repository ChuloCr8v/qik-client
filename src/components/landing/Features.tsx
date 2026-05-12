import React from 'react';
import { motion } from 'motion/react';
import { Zap, Users, Shield, Clock, Target, Rocket } from 'lucide-react';

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: Zap,
      title: 'AI Drafting',
      desc: 'Describe your meeting and get a timed agenda in under 5 seconds.',
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      icon: Users,
      title: 'Real-time Sync',
      desc: 'Everyone stays on the same item, always. No more "where are we?"',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: Shield,
      title: 'Isolated Auth',
      desc: 'Your data is protected. Only authorized members access sensitive items.',
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      icon: Clock,
      title: 'Visual Timers',
      desc: 'Visual indicators keep sections under control to fit your schedule.',
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      icon: Target,
      title: 'Expert Templates',
      desc: 'Frameworks for Sprints, 1:1s, and board syncs built-in.',
      color: 'text-rose-500',
      bg: 'bg-rose-50'
    },
    {
      icon: Rocket,
      title: 'One-click Export',
      desc: 'Convert agendas to professional PDFs or clean Markdown instantly.',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50'
    }
  ];

  return (
    <section className="bg-slate-50/50 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-secondary">Purposeful features for productive teams.</h2>
          <p className="mt-2 text-[12px] text-muted font-medium">Streamlined tools that stay out of your way.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-4 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${feature.bg}`}>
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h3 className="mb-2 text-[14px] font-semibold text-secondary">{feature.title}</h3>
              <p className="text-[12px] font-medium leading-relaxed text-muted/80">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
