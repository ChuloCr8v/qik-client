import { useEffect, useRef, useState } from 'react';
import {
  useGetAgendaQuery,
  useGetMeetingQuery,
  useGetParticipantsQuery,
  useLeaveMeetingMutation,
  useUpdatePresenceMutation,
} from '../../../features/meetings/meetingsApi';
import { AgendaItem, Meeting, Participant } from '../../../types';

export function useMeetingRealtime(meetingId: string) {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const scrollRef = useRef<number>(0);
  const agendaEndRef = useRef<HTMLDivElement>(null);
  const prevAgendaLength = useRef(0);

  const { data: meetingData, error: meetingError } = useGetMeetingQuery(meetingId, { pollingInterval: 3000 });
  const { data: agendaData } = useGetAgendaQuery(meetingId, { skip: !meetingData, pollingInterval: 3000 });
  const { data: participantsData } = useGetParticipantsQuery(meetingId, { skip: !meetingData, pollingInterval: 5000 });
  const [updatePresence] = useUpdatePresenceMutation();
  const [leaveMeeting] = useLeaveMeetingMutation();

  useEffect(() => {
    setMeeting(meetingData || null);
  }, [meetingData]);

  useEffect(() => {
    if (agendaData) {
      setAgenda(agendaData);
    }
  }, [agendaData]);

  useEffect(() => {
    if (participantsData) {
      setParticipants(participantsData);
    }
  }, [participantsData]);

  useEffect(() => {
    const scrollContainer = document.querySelector('main');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;

      if (currentScrollY < 20) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > scrollRef.current + 50) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < scrollRef.current - 10) {
        setIsHeaderVisible(true);
      }

      scrollRef.current = currentScrollY;
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOverlayOpen(!!meeting?.isActive && meeting.status === 'active');
  }, [meeting?.status, meeting?.isActive]);

  useEffect(() => {
    if (agenda.length > prevAgendaLength.current) {
      agendaEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevAgendaLength.current = agenda.length;
  }, [agenda.length]);

  useEffect(() => {
    if (!meeting?.id) return;

    const presenceInterval = setInterval(() => updatePresence(meetingId), 30000);
    updatePresence(meetingId);

    const handleUnload = () => leaveMeeting(meetingId);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(presenceInterval);
      window.removeEventListener('beforeunload', handleUnload);
      leaveMeeting(meetingId);
    };
  }, [meeting?.id, meetingId, updatePresence, leaveMeeting]);

  useEffect(() => {
    if (!meeting?.isActive || meeting.isPaused) {
      setCurrentProgress(0);
      return;
    }

    const interval = setInterval(() => {
      if (!meeting.startedAt) return;

      const started = meeting.startedAt?.toMillis ? meeting.startedAt.toMillis() : new Date(meeting.startedAt).getTime();
      const currentItem = agenda[meeting.activeItemIndex || 0];
      if (!currentItem) return;

      const durationMs = currentItem.duration * 60 * 1000;
      const elapsed = Date.now() - started;
      setCurrentProgress(Math.min(Math.round((elapsed / durationMs) * 100), 100));
    }, 1000);

    return () => clearInterval(interval);
  }, [meeting?.isActive, meeting?.isPaused, meeting?.startedAt, meeting?.activeItemIndex, agenda]);

  return {
    meeting,
    meetingError,
    agenda,
    setAgenda,
    participants,
    currentProgress,
    isHeaderVisible,
    isOverlayOpen,
    setIsOverlayOpen,
    agendaEndRef,
  };
}
