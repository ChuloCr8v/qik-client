import React, { useMemo, useState } from 'react';
import { Archive, CalendarClock, CheckCircle2, Clock, FileText, ListFilter, Plus, Search, Trash2, Users, Video } from 'lucide-react';
import { Meeting } from '../types';
import PageHeader from '../components/PageHeader';
import Table, { TableCell, TableRow } from '../components/Table';
import ConfirmModal from '../components/ConfirmModal';
import SummaryCard from '../components/global/SummaryCards';
import { cn, formatDate } from '../lib/utils';

interface MeetingsPageProps {
  meetings: Meeting[];
  onMeetingClick: (id: string) => void;
  onCreateMeeting: () => void;
  onDeleteMeeting: (id: string) => void;
}

type StatusFilter = 'all' | Meeting['status'];
type SortOption = 'newest' | 'oldest' | 'scheduled';

const statusOptions: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Live', value: 'active' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Completed', value: 'completed' },
  { label: 'Archived', value: 'archived' },
];

function getTimeValue(value?: string) {
  if (!value) return 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function getParticipantCount(meeting: Meeting) {
  return (meeting.invitees?.length ?? 0) + 1;
}

function getStatusMeta(status: Meeting['status']) {
  if (status === 'active') {
    return {
      label: 'Live Now',
      icon: Video,
      dotClassName: 'bg-emerald-500 animate-pulse',
      className: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    };
  }

  if (status === 'completed') {
    return {
      label: 'Completed',
      icon: CheckCircle2,
      dotClassName: 'bg-slate-400',
      className: 'border-slate-200 bg-slate-50 text-slate-600',
    };
  }

  if (status === 'archived') {
    return {
      label: 'Archived',
      icon: Archive,
      dotClassName: 'bg-slate-300',
      className: 'border-slate-200 bg-white text-slate-500',
    };
  }

  return {
    label: 'Scheduled',
    icon: CalendarClock,
    dotClassName: 'bg-amber-500',
    className: 'border-amber-100 bg-amber-50 text-amber-700',
  };
}

function StatusPill({ status }: { status: Meeting['status'] }) {
  const meta = getStatusMeta(status);

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold uppercase ', meta.className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', meta.dotClassName)} />
      {meta.label}
    </span>
  );
}

function MeetingCard({ meeting, onOpen, onDelete }: { key?: React.Key; meeting: Meeting; onOpen: () => void; onDelete: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
      className="h-auto! w-full rounded-xl border border-border bg-white p-4 text-left shadow-xs transition-all hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <StatusPill status={meeting.status} />
          <h3 className="truncate text-base font-semibold text-secondary">{meeting.title}</h3>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          className="h-9! rounded-lg border-none! p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-500"
          title="Delete meeting"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-muted">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-400" />
          <span>{meeting.scheduledAt ? formatDate(meeting.scheduledAt) : formatDate(meeting.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-slate-400" />
          <span>{getParticipantCount(meeting)} {getParticipantCount(meeting) === 1 ? 'participant' : 'participants'}</span>
        </div>
      </div>
    </div>
  );
}

export default function MeetingsPage({
  meetings,
  onMeetingClick,
  onCreateMeeting,
  onDeleteMeeting,
}: MeetingsPageProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [meetingToDelete, setMeetingToDelete] = useState<Meeting | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const stats = useMemo(() => ({
    total: meetings.length,
    active: meetings.filter(meeting => meeting.status === 'active').length,
    scheduled: meetings.filter(meeting => meeting.status === 'scheduled').length,
    completed: meetings.filter(meeting => meeting.status === 'completed').length,
  }), [meetings]);

  const filteredMeetings = useMemo(() => {
    return meetings
      .filter(meeting => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          meeting.title.toLowerCase().includes(query) ||
          meeting.description?.toLowerCase().includes(query);
        const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'oldest') return getTimeValue(a.createdAt) - getTimeValue(b.createdAt);
        if (sortBy === 'scheduled') return getTimeValue(b.scheduledAt) - getTimeValue(a.scheduledAt);
        return getTimeValue(b.createdAt) - getTimeValue(a.createdAt);
      });
  }, [meetings, search, sortBy, statusFilter]);

  const handleDeleteConfirm = async () => {
    if (!meetingToDelete) return;
    setIsDeleting(true);
    try {
      await onDeleteMeeting(meetingToDelete.id);
      setMeetingToDelete(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 py-4">
      <PageHeader
        title="Meetings"
        description="Review, schedule, and manage every agenda in one place."
        action={
          <button onClick={onCreateMeeting} className="button-primary flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden md:block">New Meeting</span>
          </button>
        }
      />

      <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total meetings', value: stats.total, icon: FileText, bg: 'bg-primary/5', color: 'text-primary' },
          { label: 'Live now', value: stats.active, icon: Video, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Scheduled', value: stats.scheduled, icon: CalendarClock, bg: 'bg-amber-50', color: 'text-amber-600' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle2, bg: 'bg-slate-100', color: 'text-slate-600' },
        ].map(stat => (
          <SummaryCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="rounded-xl border border-border bg-white p-3 shadow-xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by title or description..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10! w-full rounded-xl border border-border bg-slate-50/70 py-2 pl-10! pr-4 text-sm font-medium transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex rounded-xl border border-border bg-slate-50 p-1">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatusFilter(option.value)}
                  className={cn(
                    'h-8! rounded-lg border-none! px-3 text-xs font-bold uppercase transition-all',
                    statusFilter === option.value
                      ? 'bg-white text-secondary shadow-xs'
                      : 'text-muted hover:text-secondary'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <ListFilter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="h-10! w-full appearance-none rounded-xl border border-border bg-white py-2 pl-10 pr-8 text-sm font-semibold text-muted outline-none transition-colors hover:border-primary hover:text-primary sm:w-40"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="scheduled">Scheduled time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filteredMeetings.length > 0 ? (
        <>
          <div className="hidden md:block">
            <Table
              headers={['Meeting', 'Schedule', 'Status', 'Participants', 'Created', '']}
              className="rounded-2xl"
            >
              {filteredMeetings.map(meeting => (
                <TableRow key={meeting.id} onClick={() => onMeetingClick(meeting.id)}>
                  <TableCell>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-secondary">{meeting.title}</p>
                      <p className="mt-0.5 truncate text-xs text-muted max-w-[200px]!">{meeting.description || 'Agenda workspace'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted">
                    {meeting.scheduledAt ? formatDate(meeting.scheduledAt) : 'Not scheduled'}
                  </TableCell>
                  <TableCell>
                    <StatusPill status={meeting.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted">
                    {getParticipantCount(meeting)} {getParticipantCount(meeting) === 1 ? 'person' : 'people'}
                  </TableCell>
                  <TableCell className="text-sm text-muted">
                    {formatDate(meeting.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMeetingToDelete(meeting);
                      }}
                      className="h-9! rounded-lg border-none! p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Delete meeting"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </div>

          <div className="grid gap-3 md:hidden">
            {filteredMeetings.map(meeting => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onOpen={() => onMeetingClick(meeting.id)}
                onDelete={() => setMeetingToDelete(meeting)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-xs">
            <FileText className="h-7 w-7" />
          </div>
          <div className="mx-auto mt-5 max-w-sm space-y-2">
            <p className="text-base font-semibold text-secondary">No meetings found</p>
            <p className="text-sm text-muted">Try a different search, clear the status filter, or create a new meeting.</p>
          </div>
          <button onClick={onCreateMeeting} className="button-primary mt-6 inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Create Meeting</span>
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={!!meetingToDelete}
        onClose={() => setMeetingToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Meeting"
        message={
          <>
            Are you sure you want to delete <span className="font-semibold text-secondary">"{meetingToDelete?.title}"</span>? This action cannot be undone and all agenda data will be lost.
          </>
        }
        isLoading={isDeleting}
        confirmText="Delete Meeting"
      />
    </div>
  );
}
