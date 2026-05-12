import { RefObject } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { FileText, Library, Plus } from 'lucide-react';
import { AgendaItem, Meeting } from '../../types';
import { MEETING_TEMPLATES, MeetingTemplate } from '../../constants/templates';
import AgendaItemRow from './AgendaItemRow';
import TemplatePicker from './TemplatePicker';

const DraggableAny = Draggable as any;
const DroppableAny = Droppable as any;

interface AgendaListProps {
  meeting: Meeting;
  meetingId: string;
  agenda: AgendaItem[];
  isOwner: boolean;
  isGenerating: boolean;
  currentProgress: number;
  isTemplateListOpen: boolean;
  agendaEndRef: RefObject<HTMLDivElement>;
  onToggleTemplates: () => void;
  onCloseTemplates: () => void;
  onOpenAddTopic: () => void;
  onEditItem: (item: AgendaItem) => void;
  onDragEnd: (result: DropResult) => void;
  onSelectTemplate: (template: MeetingTemplate) => void;
  onNavigateTemplates?: () => void;
}

export default function AgendaList({
  meeting,
  meetingId,
  agenda,
  isOwner,
  isGenerating,
  currentProgress,
  isTemplateListOpen,
  agendaEndRef,
  onToggleTemplates,
  onCloseTemplates,
  onOpenAddTopic,
  onEditItem,
  onDragEnd,
  onSelectTemplate,
  onNavigateTemplates
}: AgendaListProps) {
  return (
    <div className="order-1 space-y-4 lg:order-2 lg:col-span-3">
      <div className="flex items-center justify-between">
        <div className="space-y-1 text-left">
          <h2 className="text-base font-semibold tracking-tight text-secondary">Meeting Agenda</h2>
        </div>
        {isOwner && (
          <div className="flex items-center gap-4">
            <button onClick={onToggleTemplates} className="flex items-center gap-1.5 text-[11px] font-semibold text-muted transition-colors hover:text-primary">
              <Library className="h-3.5 w-3.5" />
              <span>Templates</span>
            </button>
            <button onClick={onOpenAddTopic} className="flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:underline">
              <Plus className="h-3.5 w-3.5" />
              <span>Add Topic</span>
            </button>
          </div>
        )}
      </div>

      <TemplatePicker
        isOpen={isTemplateListOpen}
        onClose={onCloseTemplates}
        onSelectTemplate={onSelectTemplate}
        onNavigateTemplates={onNavigateTemplates}
      />

      <div className="space-y-3">
        {agenda.length === 0 && !isGenerating && (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-100 py-12 text-center">
            <div className="mb-4 rounded-full bg-slate-50 p-4">
              <FileText className="h-8 w-8 text-slate-200" />
            </div>
            <p className="mb-6 max-w-[200px] text-xs font-medium text-muted">
              No items yet. Use the generator or pick a template to start.
            </p>
            <div className="flex flex-wrap justify-center gap-2 px-6">
              {MEETING_TEMPLATES.map(template => (
                <button
                  key={template.name}
                  onClick={() => onSelectTemplate(template)}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-[10px] font-semibold text-secondary shadow-sm transition-all hover:border-primary hover:bg-slate-50"
                >
                  <Plus className="h-3 w-3" />
                  {template.name} Template
                </button>
              ))}
            </div>
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <DroppableAny droppableId="agenda">
            {(provided: any) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {agenda.map((item, index) => (
                  <DraggableAny key={item.id} draggableId={item.id} index={index}>
                    {(provided: any) => (
                      <AgendaItemRow
                        item={item}
                        index={index}
                        meetingId={meetingId}
                        isOwner={isOwner}
                        onEdit={onEditItem}
                        provided={provided}
                        isActive={meeting.isActive}
                        activeItemIndex={meeting.activeItemIndex}
                        progress={index === meeting.activeItemIndex ? currentProgress : 0}
                      />
                    )}
                  </DraggableAny>
                ))}
                {provided.placeholder}
              </div>
            )}
          </DroppableAny>
        </DragDropContext>
        <div ref={agendaEndRef} />
      </div>
    </div>
  );
}
