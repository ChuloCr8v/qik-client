import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Calendar, 
  Users, 
  Layout,
  HelpCircle,
  Menu,
  X,
  CreditCard,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import PricingDrawer from './PricingDrawer';
import { User } from '../types';
import { PLAN_LIMITS, getUsageStatus, PlanName } from '../lib/quota';
import { useAuth } from '../features/auth/AuthProvider';
import { useGetMeetingsQuery } from '../features/meetings/meetingsApi';
import { useGetCurrentUserQuery } from '../features/users/usersApi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePath?: string;
  onNavigate: (path: string) => void;
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Meetings', icon: Calendar, path: '/meetings' },
  { name: 'Templates', icon: Layout, path: '/templates' },
  { name: 'Team', icon: Users, path: '/team' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar({ isOpen, onClose, activePath = '/', onNavigate }: SidebarProps) {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const { user } = useAuth();
  const { data: meetings = [] } = useGetMeetingsQuery(undefined, { skip: !user });
  const { data: profile = null } = useGetCurrentUserQuery(undefined, { skip: !user });
  const meetingCount = meetings.length;

  const planName = (profile?.plan || 'Free') as PlanName;
  const limits = PLAN_LIMITS[planName];
  const { percentage, label } = getUsageStatus(meetingCount, limits.meetings);

  const handleNavigate = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transition-transform duration-300 lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex h-14 items-center px-6 border-b border-border">
             <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-base font-semibold tracking-tight text-secondary">QikAgenda</span>
             </div>
          </div>

          <div className="flex-1 px-4 py-4 space-y-6">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.path)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                    activePath === item.path 
                      ? "bg-primary/5 text-primary" 
                      : "text-muted hover:bg-slate-50 hover:text-secondary"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 transition-colors",
                    activePath === item.path ? "text-primary" : "text-muted group-hover:text-secondary"
                  )} />
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-border">
               <h4 className="px-3 mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted">Support</h4>
               <a
                  href="#"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-muted hover:bg-slate-50 hover:text-secondary transition-all"
                >
                  <HelpCircle className="h-4 w-4" />
                  Documentation
                </a>
            </div>
          </div>

          <div className="p-4 border-t border-border">
             <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                   <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{planName} Plan Usage</p>
                   {planName === 'Free' && (
                     <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
                   )}
                </div>
                
                <div className="space-y-3">
                   <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-semibold">
                         <span className="text-secondary">Meetings</span>
                         <span className="text-muted">{label}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                         <div 
                           className={cn(
                             "h-full transition-all duration-500",
                             percentage > 80 ? "bg-amber-500" : "bg-primary"
                           )} 
                           style={{ width: `${percentage}%` }} 
                         />
                      </div>
                   </div>

                   {planName === 'Free' && (
                     <button 
                       onClick={() => setIsPricingOpen(true)}
                       className="w-full py-2 bg-secondary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
                     >
                       <CreditCard className="h-3 w-3" />
                       Upgrade to Pro
                     </button>
                   )}
                </div>
             </div>
          </div>
        </div>
      </aside>

      <PricingDrawer isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </>
  );
}
