import { MeetingTemplate } from '../../constants/templates';
import { Meeting } from '../../types';
import CustomModal, { ModalTheme } from '../CustomModal';
import InviteModal from '../InviteModal';
import TemplatePreviewModal from '../TemplatePreviewModal';

interface MeetingModalsProps {
  meeting: Meeting;
  isInviteOpen: boolean;
  isDeleteOpen: boolean;
  isDeleting: boolean;
  selectedTemplate: MeetingTemplate | null;
  onCloseInvite: () => void;
  onCloseDelete: () => void;
  onConfirmDelete: () => void;
  onCloseTemplate: () => void;
  onApplyTemplate: (startTime?: string) => void;
  onAddInvitee: (email: string) => Promise<void>;
  mailAvailable?: boolean;
}

export default function MeetingModals({
  meeting,
  isInviteOpen,
  isDeleteOpen,
  isDeleting,
  selectedTemplate,
  onCloseInvite,
  onCloseDelete,
  onConfirmDelete,
  onCloseTemplate,
  onApplyTemplate,
  onAddInvitee,
  mailAvailable = true
}: MeetingModalsProps) {
  return (
    <>
      <InviteModal
        isOpen={isInviteOpen}
        onClose={onCloseInvite}
        meetingTitle={meeting.title}
        invitees={meeting.invitees || []}
        onAddInvitee={onAddInvitee}
        mailAvailable={mailAvailable}
      />

      <CustomModal
        isOpen={isDeleteOpen}
        onClose={onCloseDelete}
        onCancel={onCloseDelete}
        onOk={onConfirmDelete}
        title="Delete Meeting"
        modalTheme={ModalTheme.WARNING}
        isDanger
        loading={isDeleting}
        okText="Delete Permanently"
        width={450}
      >
        <p className="text-sm text-muted leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-secondary">"{meeting.title}"</span>? This action is permanent and cannot be reversed.
        </p>
      </CustomModal>

      <TemplatePreviewModal
        isOpen={!!selectedTemplate}
        onClose={onCloseTemplate}
        onApply={(_template, startTime) => onApplyTemplate(startTime)}
        template={selectedTemplate}
      />
    </>
  );
}
