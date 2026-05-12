export const PLAN_LIMITS = {
  Free: {
    meetings: 5,
    agendaItemsPerMeeting: 10,
    aiGenerations: 5,
    features: ['Real-time collaboration', 'Export to PDF', 'Basic Templates']
  },
  Pro: {
    meetings: Infinity,
    agendaItemsPerMeeting: 50,
    aiGenerations: Infinity,
    features: ['Everything in Free', 'Unlimited Meetings', 'AI Agenda Coaching', 'Custom Branding', 'Priority Support']
  },
  Enterprise: {
    meetings: Infinity,
    agendaItemsPerMeeting: 100,
    aiGenerations: Infinity,
    features: ['Everything in Pro', 'SSO & SAML', 'Detailed Audit Logs', 'Dedicated Success Manager', 'Custom Contracts']
  }
};

export type PlanName = keyof typeof PLAN_LIMITS;

export const getUsageStatus = (current: number, total: number) => {
  if (total === Infinity) return { percentage: 0, label: 'Unlimited' };
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  return { percentage, label: `${current} / ${total}` };
};
