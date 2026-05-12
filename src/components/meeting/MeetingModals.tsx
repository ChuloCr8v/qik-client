import ConfirmModal from '../ConfirmModal';
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
  onAddInvitee
}: MeetingModalsProps) {
  return (
    <>
      <InviteModal
        isOpen={isInviteOpen}
        onClose={onCloseInvite}
        meetingTitle={meeting.title}
        invitees={meeting.invitees || []}
        onAddInvitee={onAddInvitee}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={onCloseDelete}
        onConfirm={onConfirmDelete}
        title="Delete Meeting"
        message={<>Are you sure you want to delete <span className="font-semibold text-secondary">"{meeting.title}"</span>? This action is permanent and cannot be reversed.</>}
        isLoading={isDeleting}
        confirmText="Delete Permanently"
      />

      <AgendaItemModal
        isOpen={isAddOpen}
        onClose={onCloseAdd}
        onSave={onAddItem}
        title="Add Agenda Topic"
      />

      <AgendaItemModal
        isOpen={!!editingItem}
        onClose={onCloseEdit}
        onSave={onUpdateItem}
        initialData={editingItem ? {
          title: editingItem.title,
          description: editingItem.description || '',
          duration: editingItem.duration
        } : undefined}
        title="Edit Agenda Topic"
      />

      <TemplatePreviewModal
        isOpen={!!selectedTemplate}
        onClose={onCloseTemplate}
        onApply={onApplyTemplate}
        template={selectedTemplate}
      />
    </>
  );
}
