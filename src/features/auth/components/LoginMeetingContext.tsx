import { CalendarClock, FileText, Loader2 } from 'lucide-react';
import { useGetPublicMeetingSummaryQuery } from '../../meetings/meetingsApi';
import { formatDate } from '../../../lib/utils';

type Props = {
  meetingId?: string | null;
};

export function LoginMeetingContext({ meetingId }: Props) {
  const { data: meeting, isLoading, isError } = useGetPublicMeetingSummaryQuery(meetingId || '', {
    skip: !meetingId,
  });

  if (!meetingId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-slate-50 p-4">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !meeting) {
    return (
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <p className="text-xs font-semibold text-amber-900">Sign in to continue</p>
        <p className="mt-1 text-[11px] leading-relaxed text-amber-800">
          We could not load the meeting preview, but we will still try to open the invite after sign-in.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-left">
      <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Meeting invite</p>
      <h3 className="mt-1 text-sm font-bold text-secondary">{meeting.title}</h3>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
          <CalendarClock className="h-3.5 w-3.5 text-primary" />
          <span className="truncate text-[10px] font-semibold text-secondary">
            {meeting.scheduledAt ? formatDate(meeting.scheduledAt) : 'Not scheduled'}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-semibold text-secondary">{meeting.agendaCount} agenda items</span>
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted">
        Sign in with your invited email and we will redirect you to this meeting.
      </p>
    </div>
  );
}
