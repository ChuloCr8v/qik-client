import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { AgendaItem, Participant } from '../../../types';
import { generateAnimeName, getAnimeAvatar } from '../../../lib/userUtils';

interface LiveMeetingSidebarProps {
  agenda: AgendaItem[];
  activeItemIndex: number;
  participants: Participant[];
  nextItem?: AgendaItem;
}

export default function LiveMeetingSidebar({ agenda, activeItemIndex, participants, nextItem }: LiveMeetingSidebarProps) {
  return (
    <div className="group/sidebar hidden flex-col overflow-hidden border-l border-white/5 bg-slate-950 lg:flex">
      <div className="flex-1 space-y-10 overflow-y-auto p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Agenda Pipeline</h3>
            <div className="rounded-full border border-white/5 bg-slate-900 px-2 py-0.5 text-[9px] font-bold text-slate-400">
              {agenda.filter(item => item.completed).length} / {agenda.length}
            </div>
          </div>

          <div className="space-y-3">
            {agenda.map((item, index) => {
              const isActive = index === activeItemIndex;
              const isCompleted = item.completed;

              return (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'scale-102 border-amber-500/30 bg-amber-500/5 shadow-[0_0_20px_rgba(217,119,6,0.1)]'
                      : isCompleted
                        ? 'border-emerald-500/40 bg-emerald-500/10'
                        : 'border-white/5 bg-white/[0.02] opacity-40 hover:opacity-100'
                  }`}
                >
                  <div className="relative flex items-center gap-3 p-4">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                      isCompleted
                        ? 'bg-emerald-500 text-slate-950'
                        : isActive
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-white/10 text-white/30'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="text-[10px] font-bold">{index + 1}</span>}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-xs font-bold leading-none ${isActive || isCompleted ? 'text-white' : 'text-white/40'}`}>
                        {item.title}
                      </p>
                      <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">{item.duration}m</p>
                    </div>

                    {isActive && <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />}
                  </div>

                  {isActive && <motion.div layoutId="active-indicator" className="absolute bottom-0 left-0 top-0 w-1 bg-amber-500" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 border-t border-white/5 pt-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Participants</h3>
          <div className="grid grid-cols-2 gap-3">
            {participants.map(participant => (
              <div key={participant.id} className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-2">
                <img
                  src={participant.photoURL || getAnimeAvatar(participant.uid)}
                  alt={participant.displayName || generateAnimeName(participant.uid)}
                  className="h-6 w-6 rounded-lg ring-1 ring-white/10"
                />
                <span className="truncate text-[10px] font-bold text-white/60">{participant.displayName || generateAnimeName(participant.uid)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-slate-900/30 p-8">
        {nextItem ? (
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Next Topic</p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-colors group-hover/sidebar:border-amber-500/20">
              <h4 className="mb-1 truncate text-sm font-bold text-white">{nextItem.title}</h4>
              <p className="line-clamp-2 text-[11px] text-white/40">{nextItem.description || 'No description provided.'}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
            <CheckCircle2 className="mb-2 h-6 w-6 text-emerald-500" />
            <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-500">Agenda Completed</p>
          </div>
        )}
      </div>
    </div>
  );
}
