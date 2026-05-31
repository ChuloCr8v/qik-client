import { Clock, Edit2, FileText, Layout, MoreHorizontal, Search, Sparkles, Trash2 } from 'lucide-react';
import { MeetingTemplate } from '../../constants/templates';
import { Button, Dropdown, type MenuProps, Tag } from 'antd';

export type TemplateListItem = MeetingTemplate & {
  id: string;
  isSystem: boolean;
};

interface TemplateGridProps {
  templates: TemplateListItem[];
  openDropdownId: string | null;
  onDropdownToggle: (id: string) => void;
  onPreview: (template: TemplateListItem) => void;
  onEdit: (template: TemplateListItem) => void;
  onDelete: (template: TemplateListItem) => void;
}

export default function TemplateGrid({
  templates,
  openDropdownId,
  onDropdownToggle,
  onPreview,
  onEdit,
  onDelete
}: TemplateGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {templates.map(template => (
        <div
          key={template.id}
          className="group overflow-hidden relative flex cursor-pointer items-start gap-4 rounded-2xl border border-border bg-white p-4 transition-all hover:border-primary/40 hover:shadow-lg"
          onClick={() => onPreview(template)}
        >


          <div className="min-w-0 flex-1 relative">
            <div className={`absolute  -bottom-20 rounded-full z-50 -right-15 flex h-30 w-30 shrink-0 items-center justify-center transition-colors ${template.isSystem ? 'bg-primary/5 text-primary' : 'bg-slate-100 text-slate-500'}`}>
              {template.isSystem ? <Sparkles className="h-15 w-15 opacity-10 -mt-7" /> : <Layout className="h-10 w-10 opacity-10" />}
            </div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate font-bold text-secondary transition-colors group-hover:text-primary">
                {template.name}
              </h3>
              <div onClick={(e) => e.stopPropagation()}>
                <Dropdown
                  trigger={['click']}
                  open={openDropdownId === template.id}
                  onOpenChange={(open) => onDropdownToggle(open ? template.id : '')}
                  menu={{
                    items: getTemplateMenuItems(template),
                    onClick: ({ key }) => {
                      if (key === 'preview') onPreview(template);
                      if (key === 'edit') onEdit(template);
                      if (key === 'delete') onDelete(template);
                    }
                  }}
                >
                  <Button size="small" icon={<MoreHorizontal className="h-4 w-4" />} />
                </Dropdown>
              </div>
            </div>
            <p className="mt-1 line-clamp-1 text-xs font-medium leading-relaxed text-muted">
              {template.description || 'Custom meeting layout'}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs  text-muted">
                <FileText className="h-2.5 w-2.5" />
                {template.items.length} sections
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Clock className="h-2.5 w-2.5" />
                {template.items.reduce((acc, item) => acc + item.duration, 0)}m duration
              </div>
              {template.isSystem && (
                <Tag className="ml-auto! mr-0!" color="default">Official</Tag>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getTemplateMenuItems(template: TemplateListItem): MenuProps['items'] {
  const items: MenuProps['items'] = [
    {
      key: 'preview',
      icon: <Search className="h-3.5 w-3.5" />,
      label: 'Preview',
    },
  ];

  if (!template.isSystem) {
    items.push(
      {
        key: 'edit',
        icon: <Edit2 className="h-3.5 w-3.5" />,
        label: 'Edit',
      },
      {
        key: 'delete',
        danger: true,
        icon: <Trash2 className="h-3.5 w-3.5" />,
        label: 'Delete',
      },
    );
  }

  return items;
}
