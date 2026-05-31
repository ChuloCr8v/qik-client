import React from 'react';
import { Button, Input, InputNumber } from 'antd';
import {
  Clock,
  Plus,
  Trash2
} from 'lucide-react';
import CustomDrawer from '../CustomDrawer';
import {
  AgendaItem
} from '../../types';

interface TemplateEditorDrawerProps {
  isOpen: boolean;
  isEditing: boolean;
  name: string;
  description: string;
  items: Omit<AgendaItem,
    'id' | 'order'>[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, field: keyof Omit<AgendaItem, 'id' | 'order'>, value: any) => void;
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
    <CustomDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Template' : 'Create Template'}
      onOk={() => (document.getElementById('template-form') as HTMLFormElement | null)?.requestSubmit()}
      okText="Save Template"
    >
      <form id="template-form" onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-muted">Template Name</label>
            <Input
              required
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="h-10! rounded-xl!"
              placeholder="e.g. Weekly Strategy Sync"
            />
          </div>
          <div>
            <label className="mb-2 block text-muted">Description</label>
            <Input.TextArea
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              rows={4}
              className="rounded-xl!"
              placeholder="Describe what this meeting is for..."
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold  text-secondary">Agenda Items</h3>
            <Button type="link" onClick={onAddItem} icon={<Plus className="h-3 w-3" />}>
              Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="w-full group relative rounded-lg border border-border bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md">
                <div className="grid w-full">
                  <div className="col-span-8 space-y-3">
                    <Input
                      value={item.title}
                      onChange={(e) => onUpdateItem(index, 'title', e.target.value)}
                      className="rounded-lg!"
                      placeholder="Item Title"
                    />
                    <Input.TextArea
                      value={item.description || ''}
                      onChange={(e) => onUpdateItem(index, 'description', e.target.value)}
                      className="rounded-lg!"
                      placeholder="Add description..."
                    />
                  </div>
                  <div className="col-span-3 w-full flex items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-lg   p-2 w-full">
                      <Clock className="h-3 w-3 text-muted" />
                      <InputNumber
                        value={item.duration}
                        onChange={(value) => onUpdateItem(index, 'duration', Number(value) || 0)}
                        className="w-full"
                      />
                      <span className="text-sm text-muted">m</span>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <Button type="text" danger onClick={() => onRemoveItem(index)} icon={<Trash2 className="h-4 w-4" />} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </CustomDrawer>
  );
}
