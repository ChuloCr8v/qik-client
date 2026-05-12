import { Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AgendaItem, Meeting } from '../../types';

interface LiveStickyBarProps {
  meeting: Meeting;
  agenda: AgendaItem[];
  isOverlayOpen: boolean;
  onOpen: () => void;
}

export default function LiveStickyBar({ meeting, agenda, isOverlayOpen, onOpen }: LiveStickyBarProps) {
  return (
    <AnimatePresence>
      {meeting.status === 'active' && !isOverlayOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="pointer-events-none fixed bottom-6 left-0 right-0 z-40 px-4"
        >
          <div className="mx-auto flex w-full max-w-[400px] items-center justify-between rounded-full border border-white/10 bg-secondary/95 p-2 shadow-2xl backdrop-blur-xl pointer-events-auto">
            <div className="flex items-center gap-3 pl-4">
              <div className="relative">
                <div className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Meeting is Live</span>
                <span className="max-w-[120px] truncate text-[11px] font-medium text-white/60">
                  {agenda[meeting.activeItemIndex || 0]?.title || 'Current Topic'}
                </span>
              </div>
            </div>

            <button
              onClick={onOpen}
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
            >
              <Play className="h-3 w-3 fill-current" />
              Enter Room
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
