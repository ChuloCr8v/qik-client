import { Check, Clock, Copy, Download, Eye, EyeOff, FileText, MoreVertical, Play, Trash2, Users } from 'lucide-react';
import { motion } from 'motion/react';
import Dropdown, { DropdownItem } from '../Dropdown';
import { Meeting, Participant } from '../../types';
import { formatDate } from '../../lib/utils';
import ParticipantStack from './ParticipantStack';
import { Mail } from 'lucide-react';

interface MeetingHeaderProps {
  meeting: Meeting;
  participants: Participant[];
  totalTime: number;
  progress: number;
  isOwner: boolean;
  isHeaderVisible: boolean;
  isCopying: boolean;
  onStartMeeting: () => void;
  onStopMeeting: () => void;
  onOpenOverlay: () => void;
  onCopyLink: () => void;
  onSendReminders: () => void;
  onInvite: () => void;
  onExportPDF: () => void;
  onExportMarkdown: () => void;
  onDelete: () => void;
  onTogglePublic: () => void;
}

export default function MeetingHeader({
  meeting,
  participants,
  totalTime,
  progress,
  isOwner,
  isHeaderVisible,
  isCopying,
  onStartMeeting,
  onStopMeeting,
  onOpenOverlay,
  onCopyLink,
  onSendReminders,
  onInvite,
  onExportPDF,
  onExportMarkdown,
  onDelete,
  onTogglePublic
}: MeetingHeaderProps) {
  const hasInvitees = !!meeting.invitees?.length;

  return (
    <motion.div
      initial={false}
      animate={{ y: isHeaderVisible ? 0 : -80, opacity: isHeaderVisible ? 1 : 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="sticky top-0 z-20 border-b border-border bg-white/95 shadow-xs backdrop-blur-md"
    >
      <div className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 py-3 sm:h-16 sm:flex-row sm:items-center sm:px-6 sm:py-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex min-w-0 flex-col text-left">
            <h2 className="truncate text-sm font-bold tracking-tight text-secondary">{meeting.title}</h2>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium text-muted">
              <ParticipantStack participants={participants} max={3} />
              <span className="text-slate-300">-</span>
              <span className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                {totalTime}m
              </span>
              {meeting.scheduledAt && (
                <>
                  <span className="text-slate-300">-</span>
                  <span className="flex items-center gap-1">{formatDate(meeting.scheduledAt)}</span>
                </>
              )}
              <span className="text-slate-300">-</span>
              {meeting.status === 'active' ? (
                <span className="flex animate-pulse items-center gap-1 font-bold text-emerald-600">
                  <Play className="h-2 w-2 fill-current" />
                  LIVE
                </span>
              ) : meeting.status === 'completed' ? (
                <span className="flex items-center gap-1 font-bold text-slate-500">
                  <Check className="h-2 w-2" />
                  DONE
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Clock className="h-2 w-2" />
                  UPCOMING
                </span>
              )}
              <span className="text-slate-300">-</span>
              <span className={`flex items-center gap-1 font-bold ${meeting.isPublic ? 'text-primary' : 'text-slate-500'}`}>
                {meeting.isPublic ? <Eye className="h-2.5 w-2.5" /> : <EyeOff className="h-2.5 w-2.5" />}
                {meeting.isPublic ? 'PUBLIC' : 'PRIVATE'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 sm:justify-end sm:gap-3">
          <div className="flex items-center gap-2">
            {meeting.status === 'active' ? (
              isOwner ? (
                <button
                  onClick={onStopMeeting}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-sm transition-all hover:bg-red-600 active:scale-95 sm:gap-2 sm:text-xs"
                >
                  <div className="h-2 w-2 rounded-sm bg-white" />
                  <span>End Meeting</span>
                </button>
              ) : (
                <button
                  onClick={onOpenOverlay}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-sm transition-all hover:bg-emerald-600 active:scale-95 sm:gap-2 sm:text-xs"
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Join Room</span>
                </button>
              )
            ) : meeting.status === 'completed' ? (
              <button
                onClick={onStartMeeting}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-secondary shadow-sm transition-all hover:bg-slate-200 active:scale-95 sm:gap-2 sm:text-xs"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Restart</span>
              </button>
            ) : (
              <button
                onClick={onStartMeeting}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-sm transition-all hover:bg-emerald-600 active:scale-95 sm:gap-2 sm:text-xs"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Go Live</span>
              </button>
            )}
          </div>

          <div className="mx-1 flex h-8 w-px bg-border sm:hidden lg:block" />

          <div className="hidden items-center gap-2 lg:flex">
            <button onClick={onCopyLink} className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-sm transition-colors hover:border-primary">
              {isCopying ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
              {isCopying ? 'Copied' : 'Copy'}
            </button>
            {hasInvitees && (
              <button onClick={onSendReminders} className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-bold text-primary shadow-sm transition-colors hover:bg-primary/10">
                <Mail className="h-3.5 w-3.5" />
                Remind
              </button>
            )}
            <button onClick={onInvite} className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-sm transition-colors hover:border-primary">
              <Users className="h-3.5 w-3.5" />
              Invite
            </button>
            {isOwner && (
              <button onClick={onTogglePublic} className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-sm transition-colors hover:border-primary">
                {meeting.isPublic ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {meeting.isPublic ? 'Make Private' : 'Make Public'}
              </button>
            )}
            <button onClick={onExportPDF} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition-opacity hover:opacity-90">
              <Download className="h-3.5 w-3.5" />
              PDF
            </button>
            {isOwner && (
              <button onClick={onDelete} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 shadow-sm transition-colors hover:bg-red-100">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={onCopyLink} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white shadow-sm hover:bg-slate-50 active:scale-95">
              {isCopying ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4 text-secondary" />}
            </button>
            <Dropdown trigger={<button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white shadow-sm hover:bg-slate-50 active:scale-95"><MoreVertical className="h-4 w-4 text-secondary" /></button>}>
              <DropdownItem icon={Users} onClick={onInvite}>Invite Participants</DropdownItem>
              {isOwner && (
                <DropdownItem icon={meeting.isPublic ? EyeOff : Eye} onClick={onTogglePublic}>
                  {meeting.isPublic ? 'Make Private' : 'Make Public'}
                </DropdownItem>
              )}
              {hasInvitees && <DropdownItem icon={Mail} onClick={onSendReminders}>Send Reminders</DropdownItem>}
              <DropdownItem icon={Download} onClick={onExportPDF}>Export to PDF</DropdownItem>
              <DropdownItem icon={FileText} onClick={onExportMarkdown}>Export to Markdown</DropdownItem>
              {isOwner && <DropdownItem icon={Trash2} onClick={onDelete} className="text-red-600">Delete Meeting</DropdownItem>}
            </Dropdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
