import React, {
  useState
} from 'react';
import {
  Meeting
} from '../types';
import PageHeader from '../components/PageHeader';
import Table, {
  TableRow,
  TableCell
} from '../components/Table';
import {
  FileText,
  Search,
  Filter,
  Trash2,
  Plus,
  Clock
} from 'lucide-react';
import {
  formatDate
} from '../lib/utils';
import ConfirmModal from '../components/ConfirmModal';

interface MeetingsPageProps {
  meetings: Meeting[];
  onMeetingClick: (id: string) => void;
  onCreateMeeting: () => void;
  onDeleteMeeting: (id: string) => void;
}

export default function MeetingsPage({
  meetings, onMeetingClick, onCreateMeeting, onDeleteMeeting
}: MeetingsPageProps) {
  const [search,
    setSearch] = useState('');
  const [statusFilter,
    setStatusFilter] = useState < 'All' | 'Active' | 'Past' > ('All');
  const [meetingToDelete,
    setMeetingToDelete] = useState < Meeting | null > (null);
  const [isDeleting,
    setIsDeleting] = useState(false);

  const filteredMeetings = meetings.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
    statusFilter === 'All' ||
    (statusFilter === 'Active' && m.status === 'active') ||
    (statusFilter === 'Past' && m.status === 'completed');
    return matchesSearch && matchesStatus;
  });

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
    <div className="space-y-4 mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title={`All Meetings (${meetings.length})`}
        action={
        <button
          onClick={onCreateMeeting}
          className="button-primary flex items-center gap-2"
          >
          <Plus className="h-4 w-4" />
          <span>New Meeting</span>
        </button>
        }
        />

      <div className="mb-6 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          <input
          type="text"
          placeholder="Search meetings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-border bg-slate-50/50 py-2 pl-9 pr-4 text-xs font-medium focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
      </div>
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="appearance-none h-full flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-muted hover:border-primary hover:text-primary transition-colors cursor-pointer outline-none"
          >
          <option value="All">All Status</option>
          <option value="Active">Active Only</option>
          <option value="Past">Past Only</option>
        </select>
      </div>
    </div>

    {filteredMeetings.length > 0 ? (
      <Table headers={['#', 'Title', 'Created', 'Status', 'Participants', '']}>
        {filteredMeetings.map((meeting, index) => (
          <TableRow key={meeting.id} onClick={() => onMeetingClick(meeting.id)}>
            <TableCell className="w-8 text-muted font-semibold text-[11px]">{index + 1}</TableCell>
            <TableCell className="flex items-center gap-3">
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-[11px] font-semibold text-slate-900 leading-tight truncate">{meeting.title}</span>
                {meeting.scheduledAt ? (
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-normal">
                    <Clock className="h-2.5 w-2.5" />
                    Scheduled: {formatDate(meeting.scheduledAt)}
                  </span>
                ): undefined}
              </div>
            </TableCell>
            <TableCell className="text-[11px]! text-muted">
              {formatDate(meeting.createdAt)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1.5">
                {meeting.status === 'active' ? (
                  <>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest whitespace-nowrap">Live Now</span>
                  </>
                ): meeting.status === 'completed' ? (
                  <>
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Completed</span>
                  </>
                ): (
                  <>
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest whitespace-nowrap">Scheduled</span>
                  </>
                )}
              </div>
            </TableCell>
            <TableCell className="text-[11px] text-muted">
              {meeting.invitees?.length ? `${meeting.invitees.length + 1} People`: '1 Participant'}
            </TableCell>
            <TableCell className="text-right">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMeetingToDelete(meeting);
                }}
                className="p-2 text-muted hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                title="Delete Meeting"
                >
                <Trash2 className="h-4 w-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    ): (
      <div className="py-16 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
        <FileText className="mx-auto h-12 w-12 text-slate-200" />
        <div className="mt-4 space-y-1">
          <p className="text-sm font-semibold text-secondary">
            No meetings found
          </p>
          <p className="text-[11px] text-muted">
            Try adjusting your search or filter.
          </p>
        </div>
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