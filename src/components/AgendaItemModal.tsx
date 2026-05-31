import React, { useState, useEffect } from 'react';
import { Input, InputNumber } from 'antd';
import CustomDrawer from './CustomDrawer';
import { Clock, AlignLeft, Type } from 'lucide-react';
import toast from 'react-hot-toast';

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
      toast.success(initialData ? 'Agenda topic updated.' : 'Agenda topic added.');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(initialData ? 'Unable to update agenda topic.' : 'Unable to add agenda topic.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      icon={<Type className="h-5 w-5 text-primary" />}
      title={title}
      onOk={() => (document.getElementById('agenda-item-form') as HTMLFormElement | null)?.requestSubmit()}
      okText="Save Changes"
      loading={loading}
      disabled={!formData.title.trim()}
    >
      <form id="agenda-item-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold uppercase text-muted">
              <Type className="h-3 w-3" />
              Topic Title
            </label>
            <Input
              autoFocus
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Marketing Update"
              className="h-10! rounded-xl!"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold uppercase text-muted">
                <Clock className="h-3 w-3" />
                Duration (min)
              </label>
              <InputNumber
                min={1}
                required
                value={formData.duration}
                onChange={(value) => setFormData(prev => ({ ...prev, duration: Number(value) || 0 }))}
                className="h-10! w-full rounded-xl!"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold uppercase text-muted">
              <AlignLeft className="h-3 w-3" />
              Description (optional)
            </label>
            <Input.TextArea
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Details about this topic..."
              className="rounded-xl!"
            />
          </div>
        </div>
      </form>
    </CustomDrawer>
  );
}
