import React, {
  useState
} from 'react';
import {
  Calendar,
  Bell,
  LogOut,
  Settings,
  User as UserIcon,
  ChevronDown,
  Menu,
  Check
} from 'lucide-react';
import Dropdown, {
  DropdownItem
} from './Dropdown';
import {
  formatDate
} from '../lib/utils';
import {
  generateAnimeName,
  getAnimeAvatar
} from '../lib/userUtils';
import {
  User
} from '../types';
import {
  useAuth
} from '../features/auth/AuthProvider';
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation
} from '../features/notifications/notificationsApi';

interface HeaderProps {
  user: User | null;
  onMenuClick?: () => void;
  onNavigate?: (path: string) => void;
  onGoogleSignIn?: () => void;
}

export default function Header({
  user, onMenuClick, onNavigate, onGoogleSignIn
}: HeaderProps) {
  const [showNotifications,
    setShowNotifications] = useState(false);
  const {
    signOut
  } = useAuth();
  const {
    data: notifications = []
  } = useGetNotificationsQuery(undefined, {
      skip: !user, pollingInterval: 10000
    });
  const [markAsRead] = useMarkNotificationAsReadMutation();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {user && <button
            onClick={onMenuClick}
            className="p-2 border-none! h-full! -ml-2 text-muted hover:text-primary lg:hidden"
            >
            <Menu className="h-5 w-5" />
          </button>}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Calendar className="h-4 w-4" />
          </div>
          <span className="hidden text-base font-semibold tracking-tight text-secondary sm:block">QikAgenda</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification Menu */}
          {user ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-muted  border-none! h-full! hover:text-primary transition-colors"
                  >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <div className="absolute right-0 mt-2 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-white shadow-xl ring-1 ring-black/5">
                      <div className="border-b border-border bg-slate-50/50 px-4 py-3 flex items-center justify-between">
                        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted">Notifications</h3>
                        {unreadCount > 0 && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary">
                            {unreadCount} New
                          </span>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`group relative border-b border-border p-4 transition-colors hover:bg-slate-50/50 ${!n.read ? 'bg-primary/[0.02]': ''}`}
                              >
                              <div className="flex gap-3">
                                <div className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${n.read ? 'bg-transparent': 'bg-primary'}`} />
                                <div className="space-y-1">
                                  <p className="text-[11px] font-semibold text-secondary leading-tight">
                                    {n.title}
                                  </p>
                                  <p className="text-[10px] text-muted leading-relaxed">
                                    {n.message}
                                  </p>
                                  <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">
                                    {n.createdAt ? formatDate(n.createdAt): 'Just now'}
                                  </p>
                                </div>
                              </div>
                              {!n.read && (
                                <button
                                  onClick={() => markAsRead(n.id)}
                                  className="absolute right-2 top-2 rounded-md p-1 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-primary transition-all"
                                  >
                                  <Check className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          ))
                        ): (
                          <div className="py-12 text-center">
                            <Bell className="mx-auto h-8 w-8 text-slate-200" />
                            <p className="mt-2 text-[10px] text-muted uppercase tracking-widest">
                              No notifications yet
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Dropdown
                trigger={
                <button className="flex items-center gap-2  border-none! h-full! rounded-full border border-border p-1 pr-3 transition-hover hover:border-primary">
                  <img
                  src={user.photoURL || getAnimeAvatar(user.email || user.uid)}
                  className="h-7 w-7 rounded-full object-cover"
                  alt={user.displayName || 'User'}
                  />
                <span className="hidden max-w-[80px] truncate text-xs font-semibold sm:block">
                  {(user.displayName || generateAnimeName(user.email || user.uid)).split(' ')[0]}
                </span>
                <ChevronDown className="h-3 w-3 text-muted" />
              </button>
              }
              >
              <div className="px-3 py-2 border-b border-border mb-1">
                <p className="text-[10px] font-semibold text-muted uppercase tracking-widest">
                  Signed in as
                </p>
                <p className="text-xs font-semibold truncate text-secondary">
                  {user.email || 'Guest Session'}
                </p>
              </div>
              <DropdownItem icon={Settings} onClick={() => onNavigate?.('/settings')}>Settings</DropdownItem>
              <div className="my-1 border-t border-border" />
              <DropdownItem icon={LogOut} variant="danger" onClick={signOut}>
                Sign Out
              </DropdownItem>
            </Dropdown>
          </>
        ): (
          <button
            onClick={onGoogleSignIn}
            className="rounded-xl h-full! bg-primary px-4 py-2 text-xs font-semibold text-white   hover:opacity-90 active:scale-95 transition-all"
            >
            Get Started
          </button>
        )}
      </div>
    </div>
  </header>
);
}