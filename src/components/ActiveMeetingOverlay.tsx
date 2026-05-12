import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AgendaItem, Participant } from '../types';
import { useStopMeetingMutation, useUpdateAgendaItemMutation, useUpdateMeetingProgressMutation } from '../features/meetings/meetingsApi';
import LiveMeetingControls from './meeting/live/LiveMeetingControls';
import LiveMeetingHeader from './meeting/live/LiveMeetingHeader';
import LiveMeetingSidebar from './meeting/live/LiveMeetingSidebar';
import LiveMeetingStage from './meeting/live/LiveMeetingStage';

interface ActiveMeetingOverlayProps {
  meetingId: string;
  meetingTitle: string;
  agenda: AgendaItem[];
  activeItemIndex: number;
  isPaused: boolean;
  isOwner: boolean;
  participants: Participant[];
  startedAt?: any;
  onClose: () => void;
  onStop: () => void;
}

export default function ActiveMeetingOverlay({
  meetingId,
  meetingTitle,
  agenda,
  activeItemIndex,
  isPaused,
  isOwner,
  participants,
  startedAt,
  onClose,
  onStop
}: ActiveMeetingOverlayProps) {
  const currentItem = agenda[activeItemIndex];
  const nextItem = agenda[activeItemIndex + 1];
  const [timeLeft, setTimeLeft] = useState(currentItem ? currentItem.duration * 60 : 0);
  const [timeUsed, setTimeUsed] = useState(0);
  const [timerMode, setTimerMode] = useState<'left' | 'used'>('left');
  const [updateMeetingProgress] = useUpdateMeetingProgressMutation();
  const [updateAgendaItem] = useUpdateAgendaItemMutation();
  const [stopMeeting] = useStopMeetingMutation();

  const handleNext = useCallback(async () => {
    if (activeItemIndex === agenda.length - 1) {
      if (currentItem) {
        await updateAgendaItem({ meetingId, itemId: currentItem.id, data: { completed: true } });
      }
      await stopMeeting(meetingId);
      onStop?.();
      return;
    }
    if (currentItem) {
      await updateAgendaItem({ meetingId, itemId: currentItem.id, data: { completed: true } });
    }
    await updateMeetingProgress({
      meetingId,
      data: { activeItemIndex: activeItemIndex + 1, isPaused: false, startedAt: new Date().toISOString() as any },
    });
  }, [activeItemIndex, agenda.length, currentItem, meetingId, onStop, stopMeeting, updateAgendaItem, updateMeetingProgress]);

  useEffect(() => {
    if (!currentItem || isPaused) return;

    const updateTimer = () => {
      if (!startedAt) {
        setTimeLeft(currentItem.duration * 60);
        setTimeUsed(0);
        return;
      }

      const startMs = startedAt.toMillis ? startedAt.toMillis() : new Date(startedAt).getTime();
      const elapsedSec = Math.floor((Date.now() - startMs) / 1000);
      const totalSec = currentItem.duration * 60;
      const remaining = Math.max(0, totalSec - elapsedSec);

      setTimeLeft(remaining);
      setTimeUsed(elapsedSec);

      if (remaining <= 0 && isOwner) {
        handleNext();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [currentItem, startedAt, isPaused, isOwner, handleNext]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePrevious = async () => {
    if (activeItemIndex > 0) {
      await updateMeetingProgress({ meetingId, data: {
        activeItemIndex: activeItemIndex - 1,
        isPaused: false,
        startedAt: new Date().toISOString() as any
      }});
    }
  };

  const handleTogglePause = async () => {
    if (isPaused) {
      const now = Date.now();
      const newStartedAt = new Date(now - timeUsed * 1000);
      await updateMeetingProgress({ meetingId, data: {
        isPaused: false,
        startedAt: newStartedAt.toISOString() as any
      }});
    } else {
      await updateMeetingProgress({ meetingId, data: { isPaused: true } });
    }
  };

  const progress = currentItem ? (1 - timeLeft / (currentItem.duration * 60)) * 100 : 0;
  const isTimeUp = timeLeft === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,rgba(217,119,6,0.15),rgba(15,23,42,0)_70%)]" />
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <LiveMeetingHeader meetingTitle={meetingTitle} participants={participants} onClose={onClose} />

      <div className="relative grid flex-1 overflow-hidden lg:grid-cols-[1fr_380px]">
        <div className="relative">
          <LiveMeetingStage
            currentItem={currentItem}
            activeItemIndex={activeItemIndex}
            timeLeft={timeLeft}
            timeUsed={timeUsed}
            timerMode={timerMode}
            isPaused={isPaused}
            progress={progress}
            isTimeUp={isTimeUp}
            onToggleTimerMode={() => setTimerMode(timerMode === 'left' ? 'used' : 'left')}
            formatTime={formatTime}
          />
          <LiveMeetingControls
            isOwner={isOwner}
            isPaused={isPaused}
            activeItemIndex={activeItemIndex}
            agendaLength={agenda.length}
            onPrevious={handlePrevious}
            onTogglePause={handleTogglePause}
            onNext={handleNext}
          />
        </div>

        <LiveMeetingSidebar
          agenda={agenda}
          activeItemIndex={activeItemIndex}
          participants={participants}
          nextItem={nextItem}
        />
      </div>
    </motion.div>
  );
}
