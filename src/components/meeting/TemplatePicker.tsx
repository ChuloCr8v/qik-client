import { ChevronRight, Library } from 'lucide-react';
import { MEETING_TEMPLATES, MeetingTemplate } from '../../constants/templates';

interface TemplatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTemplates?: () => void;
  onSelectTemplate: (template: MeetingTemplate) => void;
}

export default function TemplatePicker({ isOpen, onClose, onNavigateTemplates, onSelectTemplate }: TemplatePickerProps) {
  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in slide-in-from-top-4 rounded-2xl border border-primary/10 bg-primary/5 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[12px] font-semibold text-secondary">Choose a Template</h3>
        <button
          onClick={onNavigateTemplates}
          className="ml-auto mr-4 flex items-center gap-1 text-[9px] font-semibold text-primary hover:underline"
        >
          Explore more <ChevronRight className="h-2 w-2" />
        </button>
        <button onClick={onClose} className="text-[9px] font-semibold text-muted hover:text-primary">Close</button>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-3">
        {MEETING_TEMPLATES.slice(0, 3).map(template => (
          <button
            key={template.name}
            onClick={() => onSelectTemplate(template)}
            className="group flex flex-col items-start gap-1.5 rounded-xl border border-border bg-white p-3 text-left transition-all hover:border-primary hover:shadow-md"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-50 transition-colors group-hover:bg-primary/10">
              <Library className="h-3 w-3 text-muted group-hover:text-primary" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-secondary">{template.name}</p>
              <p className="text-[9px] text-muted">{template.items.length} items</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
