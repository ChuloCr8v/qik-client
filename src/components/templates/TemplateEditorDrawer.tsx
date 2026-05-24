import React from 'react';
import {
  Clock,
  Plus,
  Trash2
} from 'lucide-react';
import Drawer from '../Drawer';
import {
  AgendaItem
} from '../../types';

interface TemplateEditorDrawerProps {
  isOpen: boolean;
  isEditing: boolean;
  name: string;
  description: string;
  items: Omit < AgendaItem,
  'id' | 'order' > [];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, field: keyof Omit < AgendaItem, 'id' | 'order' >, value: any) => void;
}

export default function TemplateEditorDrawer({
  isOpen,
  isEditing,
  name,
  description,
  items,
  onClose,
  onSubmit,
  onNameChange,
  onDescriptionChange,
  onAddItem,
  onRemoveItem,
  onUpdateItem
}: TemplateEditorDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Template': 'Create Template'}
      footer={
      <div className="grid grid-cols-2  gap-3">
        <button form="template-form" type="submit" className="rounded-lg bg-secondary px-8 py-3 text-xs font-semibold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95">
          Save Template
        </button>
        <button type="button" onClick={onClose} className="rounded-lg px-6 py-3 text-xs text-muted transition-colors hover:bg-slate-50">
          Cancel
        </button>
      </div>
      }
      >
      <form id="template-form" onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-muted">Template Name</label>
            <input
            required
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-3 text-xs shadow-sm outline-none transition-all focus:border-primary"
            placeholder="e.g. Weekly Strategy Sync"
            />
        </div>
        <div>
          <label className="mb-2 block text-muted">Description</label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="h-24 w-full resize-none rounded-lg border border-border px-4 py-3 text-xs font-medium shadow-sm outline-none transition-all focus:border-primary"
            placeholder="Describe what this meeting is for..."
            />
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-semibold  tracking-wider text-secondary">Agenda Items</h3>
          <button type="button" onClick={onAddItem} className="flex items-center gap-1.5 text-xs font-semibold text-primary transition-opacity hover:opacity-80">
            <Plus className="h-3 w-3" /> Add Item
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="w-full group relative rounded-lg border border-border bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md">
              <div className="grid w-full">
                <div className="col-span-8 space-y-3">
                  <input
                  value={item.title}
                  onChange={(e) => onUpdateItem(index, 'title', e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-secondary shadow-sm rounded-lg p-2 outline-none placeholder:text-slate-300"
                  placeholder="Item Title"
                  />
                <textarea
                  value={item.description || ''}
                  onChange={(e) => onUpdateItem(index, 'description', e.target.value)}
                  className="w-full bg-transparent text-[10px] text-muted outline-none shadow-sm rounded-md p-2 placeholder:text-slate-200"
                  placeholder="Add description..."
                  />
              </div>
              <div className="col-span-3 w-full flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg shadow-sm p-2 w-full">
                  <Clock className="h-3 w-3 text-muted" />
                  <input
                  type="number"
                  value={item.duration}
                  onChange={(e) => onUpdateItem(index, 'duration', parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent text-[10px] font-semibold outline-none"
                  />
                <span className="text-[10px] text-muted">m</span>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <button type="button" onClick={() => onRemoveItem(index)} className="p-1 text-muted opacity-0 transition-all hover:text-red-500 group-hover:opacity-100">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          </div>
        ))}
    </div>
  </div>
</form>
</Drawer>
);
}