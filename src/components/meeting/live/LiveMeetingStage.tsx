import { AnimatePresence, motion } from 'motion/react';
import { Clock, Pause } from 'lucide-react';
import { AgendaItem } from '../../../types';

interface LiveMeetingStageProps {
  currentItem?: AgendaItem;
  activeItemIndex: number;
  timeLeft: number;
  timeUsed: number;
  timerMode: 'left' | 'used';
  isPaused: boolean;
  progress: number;
  isTimeUp: boolean;
  onToggleTimerMode: () => void;
  formatTime: (seconds: number) => string;
}

export default function LiveMeetingStage({
  currentItem,
  activeItemIndex,
  timeLeft,
  timeUsed,
  timerMode,
  isPaused,
  progress,
  isTimeUp,
  onToggleTimerMode,
  formatTime
}: LiveMeetingStageProps) {
  return (
    <div className="relative flex h-full flex-col bg-slate-950">
      <div className="flex-1 overflow-y-auto p-4 pb-32 md:p-8 lg:p-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="py-4 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 sm:space-y-10"
              >
                <div className="space-y-2 sm:space-y-4">
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold uppercase  text-amber-500">
                    Step {activeItemIndex + 1}
                  </span>
                  <h1 className="text-3xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-6xl">
                    {currentItem?.title}
                  </h1>
                  <p className="line-clamp-3 max-w-2xl text-sm font-normal leading-relaxed text-slate-400 sm:text-base md:text-lg">
                    {currentItem?.description || 'Collaborate and discuss the current topic to drive progress.'}
                  </p>
                </div>

                <div onClick={onToggleTimerMode} className="group relative cursor-pointer">
                  <div className="flex flex-col">
                    <div className="select-none text-[80px] font-bold leading-[0.85] tracking-tighter tabular-nums sm:text-[140px] md:text-[180px] lg:text-[200px]">
                      {formatTime(timerMode === 'left' ? timeLeft : timeUsed)}
                    </div>
                    <div className="mt-4 flex items-center gap-2 px-2">
                      <Clock className="h-3 w-3 text-amber-500 sm:h-4 sm:w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        {timerMode === 'left' ? 'Time Remaining' : 'Time Elapsed'} - Toggle
                      </span>
                    </div>
                  </div>

                  {isPaused && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-slate-950/20 backdrop-blur-[2px]">
                      <div className="flex animate-pulse items-center gap-3 rounded-2xl bg-amber-500 px-6 py-3 text-sm font-black uppercase  text-slate-950 shadow-2xl">
                        <Pause className="h-5 w-5 fill-current" />
                        Paused
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative pt-10">
                  <div className="relative h-4 w-full overflow-hidden rounded-full border border-white/5 bg-white/5 shadow-inner">
                    <AnimatePresence>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: 'spring', bounce: 0, duration: 1 }}
                        className={`relative h-full transition-colors duration-700 ${isTimeUp ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'bg-amber-500 shadow-[0_0_30px_rgba(217,119,6,0.3)]'
                          }`}
                      >
                        <motion.div
                          className="absolute inset-0 opacity-40"
                          animate={{ x: ['-100%', '0%'] }}
                          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', width: '200%' }}
                        />
                        <motion.div className="absolute inset-0 bg-white/10" animate={{ opacity: [0, 0.2, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="mt-3 flex justify-between px-1">
                    <span className="text-xs font-bold uppercase  text-slate-500">0% Complete</span>
                    <span className="font-mono text-xs font-bold uppercase  text-amber-500/50">{currentItem?.duration}m Agenda Target</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
