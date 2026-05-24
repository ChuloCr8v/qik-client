import React, {
  useState,
  useRef,
  useEffect
} from 'react';
import {
  motion,
  AnimatePresence
} from 'motion/react';
import {
  cn
} from '../lib/utils';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export default function Dropdown({
  trigger, children, align = 'right', className
}: DropdownProps) {
  const [isOpen,
    setIsOpen] = useState(false);
  const containerRef = useRef < HTMLDivElement > (null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  },
    []);

  return (
    <div className={cn("relative inline-block text-left", className)} ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={ { opacity: 0, y: 8, scale: 0.95 }}
            animate={ { opacity: 1, y: 0, scale: 1 }}
            exit={ { opacity: 0, y: 8, scale: 0.95 }}
            transition={ { duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute z-50 mt-2 w-56 rounded-xl border border-border p-1 bg-white  focus:outline-none",
              align === 'right' ? "right-0": "left-0"
            )}
            onClick={() => setIsOpen(false)}
            >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

  export function DropdownItem({
    children,
    onClick,
    className,
    icon: Icon,
    variant = 'default'
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    icon?: any;
    variant?: 'default' | 'danger';
  }) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "group border-none flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors",
          variant === 'default' ? "text-secondary hover:bg-slate-50 hover:text-primary": "text-red-600 hover:bg-red-50",
          className
        )}
        >
        {Icon && <Icon className="mr-3 h-4 w-4 shrink-0 transition-colors" />}
        {children}
      </button>
    );
  }