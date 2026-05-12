import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: any) {
  if (!date) return '';
  
  // Handle Firestore Timestamp
  const d = typeof date.toDate === 'function' ? date.toDate() : new Date(date);
  
  // Check if date is valid
  if (isNaN(d.getTime())) return '';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function generateId() {
  return Math.random().toString(36).substring(2, 11);
}
