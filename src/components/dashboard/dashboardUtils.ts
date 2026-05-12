import { Meeting } from '../../types';

export function parseInvitees(value: string) {
  return value
    .split(',')
    .map(email => email.trim())
    .filter(email => email && email.includes('@'));
}

export function getTemplateDuration(items: { duration: number }[]) {
  return items.reduce((total, item) => total + item.duration, 0);
}

export function getMeetingStatusLabel(status: Meeting['status']) {
  if (status === 'active') return 'Live Now';
  if (status === 'completed') return 'Completed';
  return 'Scheduled';
}

export function getMeetingStatusClassName(status: Meeting['status']) {
  if (status === 'active') return 'text-emerald-600';
  if (status === 'completed') return 'text-slate-500';
  return 'text-amber-600';
}

export function getMeetingStatusDotClassName(status: Meeting['status']) {
  if (status === 'active') return 'animate-pulse bg-emerald-500';
  if (status === 'completed') return 'bg-slate-400';
  return 'bg-amber-500';
}
