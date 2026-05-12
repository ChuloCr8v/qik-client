import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';
import { Clock, AlignLeft, Type, Loader2 } from 'lucide-react';

interface AgendaItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string; duration: number }) => Promise<void>;
  initialData?: { title: string; description: string; duration: number };
  title: string;
}

export default function AgendaItemModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title
}: AgendaItemModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 5
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: '', description: '', duration: 5 });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      icon={<Type className="h-5 w-5 text-primary" />}
      title={title}
      footer={
        <div className="flex flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-semibold text-muted hover:bg-slate-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            form="agenda-item-form"
            type="submit"
            disabled={loading || !formData.title.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
          >
            {loading && <Loader2 className="h-3 w-3 animate-spin" />}
            Save Changes
          </button>
        </div>
      }
    >
      <form id="agenda-item-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
              <Type className="h-3 w-3" />
              Topic Title
            </label>
            <input
              autoFocus
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Marketing Update"
              className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-xs font-semibold text-secondary focus:border-primary focus:bg-white focus:outline-none transition-all shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                <Clock className="h-3 w-3" />
                Duration (min)
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-xs font-semibold text-secondary focus:border-primary focus:bg-white focus:outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
              <AlignLeft className="h-3 w-3" />
              Description (optional)
            </label>
            <textarea
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Details about this topic..."
              className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-xs font-medium text-secondary focus:border-primary focus:bg-white focus:outline-none transition-all resize-none custom-scrollbar shadow-sm"
            />
          </div>
        </div>
      </form>
    </Drawer>
  );
}
