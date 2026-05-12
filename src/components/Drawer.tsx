import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, title, children, footer, className, icon }: DrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "fixed right-0 top-0 z-50 h-full w-full bg-white shadow-2xl sm:max-w-md flex flex-col",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border px-6 py-4">
              <div className="flex items-start gap-4 flex-1 pr-4">
                {icon && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100/50">
                    {icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {typeof title === 'string' ? (
                    <h3 className="text-[14px] font-bold text-secondary">{title}</h3>
                  ) : (
                    title
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-0.5 rounded-lg p-1.5 text-muted hover:bg-slate-50 hover:text-primary transition-all shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="border-t border-border px-6 py-4 bg-slate-50/50">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
