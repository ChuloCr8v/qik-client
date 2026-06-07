import CustomModal, { ModalTheme } from '../CustomModal';
import AgendaItemModal from '../AgendaItemModal';
import InviteModal from '../InviteModal';
import TemplatePreviewModal from '../TemplatePreviewModal';
import { AgendaItem, Meeting } from '../../types';
import { MeetingTemplate } from '../../constants/templates';

interface MeetingModalsProps {
  meeting: Meeting;
  isInviteOpen: boolean;
  isDeleteOpen: boolean;
  isDeleting: boolean;
  isAddOpen: boolean;
  editingItem: AgendaItem | null;
  selectedTemplate: MeetingTemplate | null;
  onCloseInvite: () => void;
  onCloseDelete: () => void;
  onConfirmDelete: () => void;
  onCloseAdd: () => void;
  onCloseEdit: () => void;
  onCloseTemplate: () => void;
  onAddItem: (data: { title: string; description: string; duration: number }) => Promise<void>;
  onUpdateItem: (data: { title: string; description: string; duration: number }) => Promise<void>;
  onApplyTemplate: (startTime?: string) => void;
  onAddInvitee: (email: string) => Promise<void>;
  mailAvailable?: boolean;
}

export default function MeetingModals({
  meeting,
  isInviteOpen,
  isDeleteOpen,
  isDeleting,
  isAddOpen,
  editingItem,
  selectedTemplate,
  onCloseInvite,
  onCloseDelete,
  onConfirmDelete,
  onCloseAdd,
  onCloseEdit,
  onCloseTemplate,
  onAddItem,
  onUpdateItem,
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
