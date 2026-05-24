import {
  motion
} from 'motion/react';
import {
  Meeting,
  Participant
} from '../../types';
import MeetingMeta from './MeetingMeta';
import MeetingPrimaryAction from './MeetingPrimaryAction';
import MeetingActions from './MeetingActions';

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
  onTogglePublic,
}: MeetingHeaderProps) {
  const hasInvitees = !!meeting.invitees?.length;

  return (
    <motion.div
      initial={false}
      animate={ { y: isHeaderVisible ? 0: -80, opacity: isHeaderVisible ? 1: 0 }}
      transition={ { duration: 0.2, ease: 'easeInOut' }}
      className="sticky top-0 z-20 border-b border-border bg-white/95 shadow-xs backdrop-blur-md"
      >
      {/* Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500 ease-out"
        style={ { width: `${progress}%` }}
        />

      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 py-3 sm:h-16 sm:flex-row sm:items-center sm:px-6 sm:py-0">

        {/* Left */}
        <MeetingMeta
          meeting={meeting}
          allParticipants={participants}
          totalTime={totalTime}
          />

        {/* Right */}
        <div className="flex items-center justify-between *:basis-full gap-2">
          <MeetingPrimaryAction
            meeting={meeting}
            isOwner={isOwner}
            onStartMeeting={onStartMeeting}
            onStopMeeting={onStopMeeting}
            onOpenOverlay={onOpenOverlay}
            />

          <MeetingActions
            meeting={meeting}
            isOwner={isOwner}
            isCopying={isCopying}
            hasInvitees={hasInvitees}
            onCopyLink={onCopyLink}
            onSendReminders={onSendReminders}
            onInvite={onInvite}
            onTogglePublic={onTogglePublic}
            onExportPDF={onExportPDF}
            onExportMarkdown={onExportMarkdown}
            onDelete={onDelete}
            />
        </div>
      </div>
    </motion.div>
  );
}