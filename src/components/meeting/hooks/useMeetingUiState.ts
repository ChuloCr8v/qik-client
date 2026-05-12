import { useState } from 'react';
import { MeetingTemplate } from '../../../constants/templates';
import { AgendaItem } from '../../../types';

export function useMeetingUiState() {
  const [isCopying, setIsCopying] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddAgendaModalOpen, setIsAddAgendaModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AgendaItem | null>(null);
  const [selectedTemplateForPreview, setSelectedTemplateForPreview] = useState<MeetingTemplate | null>(null);
  const [isTemplateListOpen, setIsTemplateListOpen] = useState(false);

  return {
    isCopying,
    setIsCopying,
    isInviteModalOpen,
    setIsInviteModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDeleting,
    setIsDeleting,
    isAddAgendaModalOpen,
    setIsAddAgendaModalOpen,
    editingItem,
    setEditingItem,
    selectedTemplateForPreview,
    setSelectedTemplateForPreview,
    isTemplateListOpen,
    setIsTemplateListOpen,
  };
}
