import React, {
  useState
} from 'react';
import {
  Check,
  Clock,
  Edit2,
  GripVertical,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  AgendaItem
} from '../../types';
import {
  cn
} from '../../lib/utils';
import {
  useDeleteAgendaItemMutation,
  useUpdateAgendaItemMutation
} from '../../features/meetings/meetingsApi';

interface AgendaItemRowProps {
  item: AgendaItem;
  index: number;
  meetingId: string;
  onEdit: (item: AgendaItem) => void;
  provided: any;
  isOwner: boolean;
  isActive?: boolean;
  activeItemIndex?: number;
  progress?: number;
}

export default function AgendaItemRow({
  item,
  index,
  meetingId,
  onEdit,
  provided,
  isOwner,
  isActive,
  activeItemIndex = -1,
  progress = 0
}: AgendaItemRowProps) {
  const [timerMode,
    setTimerMode] = useState < 'left' | 'used' > ('left');
  const [updateAgendaItem] = useUpdateAgendaItemMutation();
  const [deleteAgendaItem] = useDeleteAgendaItemMutation();

  const toggleCompleted = () => {
    if (!isOwner) {
      toast.error('Only the meeting owner can complete items.');
      return;
    }
    updateAgendaItem( {
      meetingId, itemId: item.id, data: {
        completed: !item.completed
      }
    });
  };

  const isCompleted = item.completed || activeItemIndex > index;
  const isCurrent = isActive && activeItemIndex === index;
  const totalSeconds = item.duration * 60;
  const usedSeconds = Math.floor((progress / 100) * totalSeconds);
  const leftSeconds = Math.max(0, totalSeconds - usedSeconds);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={cn(
        'group relative cursor-default select-none rounded-xl border border-border bg-white p-3 pb-1 transition-all hover:bg-slate-50/50 hover:shadow-md',
        isCompleted && !isCurrent ? 'border-emerald-100 bg-emerald-50/50 grayscale-[0.2]': '',
        isCurrent ? 'z-10 scale-[1.01] border-primary shadow-lg ring-2 ring-primary/20': ''
      )}
      style={ {
        ...provided.draggableProps.style,
        background: isCurrent
        ? `linear-gradient(to right, rgb(251 191 36 / 0.1) ${progress}%, white ${progress}%)`: isCompleted
        ? '#ecfdf5': 'white'
      }}
      >
      <div className="flex items-start gap-3 text-left sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-end justify-between gap-3">
            <h4 className={`py-0.5 text-sm font-semibold leading-tight text-secondary ${isCompleted ? 'line-through decoration-slate-300': ''}`}>
              {item.title}
            </h4>

            <button
              onClick={() => isCurrent && setTimerMode(timerMode === 'left' ? 'used': 'left')}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full font-semibold transition-all',
                isCurrent
                ? 'scale-105 bg-amber-500 text-slate-950 ring-amber-600/20': isCompleted
                ? 'bg-emerald-100 text-emerald-700 ring-emerald-200': 'bg-slate-100/80 text-muted ring-slate-200/50 group-hover:bg-white group-hover:ring-primary/20'
              )}
              >
              <Clock className="h-3 w-3" />
              <span className="whitespace-nowrap font-bold">
                {isCurrent
                ? timerMode === 'left' ? `${formatTime(leftSeconds)} left`: `${formatTime(usedSeconds)} used`: `${item.duration}m`}
              </span>
            </button>
          </div>

          <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-500">
            {item.description || 'No additional details provided.'}
          </p>

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-1">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleCompleted}
                className={cn(
                  'mt-1.5 flex h-6! w-6! shrink-0 items-center justify-center rounded-full border-2 transition-all',
                  isCompleted
                  ? 'border-emerald-500 bg-emerald-500 text-white': 'border-slate-200 hover:border-primary/50'
                )}
                >
                {isCompleted && <Check className="h-3 w-3 bold" />}
              </button>

              <div
                {...provided.dragHandleProps}
                className="mt-1 flex h-7 w-7 shrink-0 cursor-grab select-none items-center justify-center rounded bg-slate-50 text-muted transition-all active:cursor-grabbing group-hover:bg-primary/10 group-hover:text-primary"
                >
                <GripVertical className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(item)}
                className="flex items-center gap-1.5  px-2.5 py-1 font-semibold text-slate-500 transition-colors hover:border-primary/20 hover:text-primary"
                >
                <Edit2 className="h-3 w-3" />
                Edit
              </button>
              <button
                onClick={() => deleteAgendaItem({ meetingId, itemId: item.id })}
                className="flex items-center gap-1.5 bg-white px-2.5 py-1 font-semibold text-red-400 transition-colors hover:border-red-100 hover:text-red-600"
                >
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}