export interface User {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL?: string;
  bio?: string;
  jobTitle?: string;
  createdAt?: any;
  updatedAt?: any;
  role?: 'Owner' | 'Admin' | 'Member';
  status?: 'Active' | 'Away' | 'Inactive';
  plan?: 'Free' | 'Individual' | 'Organisation' | 'OrganisationPlus';
  subscriptionStatus?: 'active' | 'trial' | 'cancelled' | string;
  subscriptionDate?: any;
  notifications?: {
    email: boolean;
    reminders: boolean;
    aiCoach: boolean;
  };
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  date?: string;
  scheduledAt?: string; // ISO String for Date + Time
  invitees?: string[]; // List of emails
  isPublic?: boolean;
  createdAt: string;
  status: 'scheduled' | 'active' | 'completed' | 'archived';
  isActive?: boolean;
  activeItemIndex?: number;
  isPaused?: boolean;
  startedAt?: any;
}

export interface PublicMeetingSummary {
  id: string;
  title: string;
  description?: string;
  scheduledAt?: string;
  status: 'scheduled' | 'active' | 'completed' | 'archived';
  ownerName?: string;
  agendaCount: number;
  totalDuration: number;
  inviteeCount: number;
  isPublic?: boolean;
}

export interface AgendaItem {
  id: string;
  title: string;
  description?: string;
  duration: number; // in minutes
  order: number;
  completed?: boolean;
}

export interface Participant {
  id: string; // The same as uid
  uid: string;
  displayName: string;
  photoURL?: string;
  lastSeen?: any;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'invite';
  read: boolean;
  createdAt: any;
}

export interface Invitation {
  id: string;
  email: string;
  meetingId: string;
  invitedBy: string;
  status: 'pending' | 'accepted';
  createdAt: any;
}
