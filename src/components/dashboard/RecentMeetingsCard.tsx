import { ArrowLeft, ChevronRight, FileText } from 'lucide-react';
import PageHeader from '../PageHeader';
import Table, { TableCell, TableRow } from '../Table';
import { Meeting } from '../../types';
import {
  getMeetingStatusClassName,
  getMeetingStatusDotClassName,
  getMeetingStatusLabel,
} from './dashboardUtils';

type Props = {
  meetings: Meeting[];
  onShowAll: () => void;
  onOpenMeeting: (meetingId: string) => void;
};

export default function RecentMeetingsCard({ meetings, onShowAll, onOpenMeeting }: Props) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Your Meetings (${meetings.length})`}
        action={
          <button
            onClick={onShowAll}
            className="group flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-secondary shadow-sm transition-all hover:border-primary hover:text-primary"
          >
            <span>Show All</span>
            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        }
      />

      {meetings.length > 0 ? (
        <Table headers={['#', 'Meeting', 'Status', '']}>
          {meetings.slice(0, 4).map((meeting, index) => (
            <TableRow key={meeting.id} onClick={() => onOpenMeeting(meeting.id)}>
              <TableCell className="w-8 font-semibold text-muted">{index + 1}</TableCell>
              <TableCell className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="truncate text-xs font-semibold leading-tight text-slate-900">{meeting.title}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <div className={`h-1.5 w-1.5 rounded-full ${getMeetingStatusDotClassName(meeting.status)}`} />
                  <span className={`whitespace-nowrap font-bold tracking-widest ${getMeetingStatusClassName(meeting.status)}`}>
                    {getMeetingStatusLabel(meeting.status)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <button className="rounded-full p-1.5 text-muted transition-colors hover:bg-slate-50 hover:text-primary">
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/30 py-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-slate-200" />
          <div className="mt-4 space-y-1">
            <p className="text-[12px] font-semibold text-secondary">Cloud-based meetings</p>
            <p className="text-[11px] text-muted">Create your first meeting to start collaborating.</p>
          </div>
        </div>
      )}
    </div>
  );
}
