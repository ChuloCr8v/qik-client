import type { ElementType } from 'react';
import { CalendarClock, Eye, EyeOff, FileText, Loader2, LogIn, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useGetPublicMeetingSummaryQuery } from '../meetings/meetingsApi';
import { formatDate } from '../../lib/utils';
import { getMeetingRedirect, savePendingMeetingInvite } from './inviteStorage';

type Props = {
  meetingId: string;
};

export default function MeetingInvitePrompt({ meetingId }: Props) {
  const navigate = useNavigate();
  const { data: meeting, isLoading, isError } = useGetPublicMeetingSummaryQuery(meetingId);

  const handleContinue = () => {
    savePendingMeetingInvite(meetingId);
    const redirect = getMeetingRedirect(meetingId);
    navigate(`/login?meetingId=${encodeURIComponent(meetingId)}&redirect=${encodeURIComponent(redirect)}`);
  };

  return (
    <Layout user={null} onNavigate={navigate} onGoogleSignIn={handleContinue} hideFooter>
      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-lg rounded-3xl border border-border bg-white p-6 shadow-xl shadow-slate-200/60">
          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : isError || !meeting ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-muted">
                <FileText className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-secondary">Meeting link unavailable</h1>
                <p className="mt-2 text-sm text-muted">This meeting may have been removed or the link is incorrect.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-bold uppercase  text-primary">
                  {meeting.isPublic ? 'Public meeting link' : 'Meeting invitation'}
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-secondary">{meeting.title}</h1>
                {meeting.description && (
                  <p className="text-sm leading-relaxed text-muted">{meeting.description}</p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <InviteMeta icon={CalendarClock} label="When" value={meeting.scheduledAt ? formatDate(meeting.scheduledAt) : 'Not scheduled'} />
                <InviteMeta icon={FileText} label="Agenda" value={`${meeting.agendaCount} items`} />
                <InviteMeta icon={meeting.isPublic ? Eye : EyeOff} label="Access" value={meeting.isPublic ? 'Public' : 'Private'} />
              </div>

              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4">
                <p className="text-sm font-semibold text-secondary">Sign in to access this meeting</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {meeting.isPublic
                    ? 'Anyone with this link can join after signing in. We will take you straight to the meeting room.'
                    : 'Use the email address that received the invite. After sign-in, we will take you straight to the meeting room.'}
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="button-primary flex w-full items-center justify-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Continue to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function InviteMeta({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <Icon className="mb-2 h-4 w-4 text-primary" />
      <p className="text-sm font-bold uppercase  text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-secondary">{value}</p>
    </div>
  );
}
