import { AgendaItem } from '../types';

export interface MeetingTemplate {
  name: string;
  description?: string;
  items: Omit<AgendaItem, 'id' | 'order'>[];
}

export const MEETING_TEMPLATES: MeetingTemplate[] = [
  {
    name: 'Daily Scrum / Standup',
    description: 'A quick sync to align on goals and unblock the team.',
    items: [
      { title: 'Goal Check-in', duration: 2, description: 'Quick reaffirmation of the sprint goal.' },
      { title: 'Accomplishments', duration: 5, description: 'What did we complete since last we met?' },
      { title: 'Daily Plan', duration: 5, description: 'Primary focus for the next 24 hours.' },
      { title: 'Blockers & Impediments', duration: 3, description: 'Identifying issues requiring immediate attention.' },
    ]
  },
  {
    name: 'Project Kickoff',
    description: 'Standardize project beginnings with clear goals and roles.',
    items: [
      { title: 'Project Vision', duration: 10, description: 'Alignment on the "Why" behind the project.' },
      { title: 'Scope & Deliverables', duration: 15, description: 'What are we building exactly?' },
      { title: 'Roles & Responsibilities', duration: 10, description: 'Assigning owners for key workstreams.' },
      { title: 'Success Metrics (KPIs)', duration: 10, description: 'How will we measure project health?' },
      { title: 'Timeline & Milestones', duration: 10, description: 'Reviewing key dates on the roadmap.' },
    ]
  },
  {
    name: 'Design Review',
    description: 'Gather constructive feedback on UX/UI and user flows.',
    items: [
      { title: 'Context & Goals', duration: 5, description: 'Remind everyone of the problem being solved.' },
      { title: 'Design Walkthrough', duration: 20, description: 'Presenting current mocks or prototypes.' },
      { title: 'Themed Feedback', duration: 15, description: 'Specific areas for critique (Usability, Layout, Branding).' },
      { title: 'Synthesis & Action Items', duration: 10, description: 'Deciding which feedback to act upon.' },
    ]
  },
  {
    name: '1-on-1 Coaching',
    description: 'Structure for growth-focused individual conversations.',
    items: [
      { title: 'Check-in (Pulse)', duration: 5, description: 'Personal wellbeing and morale check.' },
      { title: 'Priority Review', duration: 10, description: 'Review progress on top objectives.' },
      { title: 'Opportunities & Challenges', duration: 15, description: 'Where can the manager provide help?' },
      { title: 'Development Goals', duration: 10, description: 'Skills to learn and path forward.' },
      { title: 'Next Actions', duration: 10, description: 'Clear commitments for the next interval.' },
    ]
  },
  {
    name: 'Strategy Brainstorm',
    description: 'High-level thinking for future growth and innovation.',
    items: [
      { title: 'Inspiration & Data', duration: 10, description: 'Reviewing current market trends or user data.' },
      { title: 'Quiet Ideation', duration: 10, description: 'Individual brainstorming to avoid groupthink.' },
      { title: 'Sharing & Clustering', duration: 15, description: 'Grouping similar ideas into themes.' },
      { title: 'Dot Voting', duration: 5, description: 'Rapid prioritization of the best strategies.' },
      { title: 'Refinement', duration: 15, description: 'Fleshing out the top 2 selected ideas.' },
    ]
  }
];
