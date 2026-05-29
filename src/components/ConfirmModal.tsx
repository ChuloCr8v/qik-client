import React from 'react';
import Modal from './Modal';
import { AlertCircle, Loader2 } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
  isLoading = false
}: ConfirmModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title} 
      icon={<AlertCircle className={`h-5 w-5 ${isDestructive ? 'text-red-500' : 'text-primary'}`} />}
      className="max-w-sm"
      footer={
        <div className="flex flex-row justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-muted hover:bg-slate-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white transition-all active:scale-[0.98] ${
              isDestructive 
                ? 'bg-red-600 hover:bg-red-700   shadow-red-200' 
                : 'bg-primary hover:bg-primary/90   shadow-primary/20'
            }`}
          >
            {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
            <span>{confirmText}</span>
          </button>
        </div>
      }
    >
      <div className="space-y-1 py-2">
        <p className="text-xs text-muted leading-relaxed">
          {message}
        </p>
      </div>
    </Modal>
  );
}
