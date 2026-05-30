import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

interface LiveMeetingControlsProps {
  isOwner: boolean;
  isPaused: boolean;
  activeItemIndex: number;
  agendaLength: number;
  onPrevious: () => void;
  onTogglePause: () => void;
  onNext: () => void;
}

export default function LiveMeetingControls({
  isOwner,
  isPaused,
  activeItemIndex,
  agendaLength,
  onPrevious,
  onTogglePause,
  onNext
}: LiveMeetingControlsProps) {
  if (!isOwner) return null;

  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 lg:p-8">
      <div className="pointer-events-auto mx-auto flex max-w-3xl items-center justify-center">
        <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-900/80 p-2 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl sm:gap-4 sm:p-2.5">
          <button
            onClick={onPrevious}
            disabled={activeItemIndex === 0}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white transition-all hover:bg-white/10 active:scale-95 disabled:opacity-20 sm:h-14 sm:w-14"
          >
            <SkipBack className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={onTogglePause}
            className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-[0_0_30px_rgba(217,119,6,0.2)] transition-all hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
          >
            {isPaused ? <Play className="h-6 w-6 fill-current sm:h-7 sm:w-7" /> : <Pause className="h-6 w-6 fill-current sm:h-7 sm:w-7" />}
          </button>

          <button
            onClick={onNext}
            className="group flex h-12 items-center justify-center gap-2 rounded-2xl bg-white pl-6 pr-4 font-bold text-slate-950 shadow-lg transition-all hover:bg-slate-100 active:scale-95 sm:h-14 sm:gap-3 sm:pl-8 sm:pr-6"
          >
            <span className="text-sm sm:text-sm">{activeItemIndex === agendaLength - 1 ? 'Finish' : 'Next'}</span>
            <SkipForward className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
