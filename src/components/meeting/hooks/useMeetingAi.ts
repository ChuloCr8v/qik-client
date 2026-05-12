import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAddAgendaItemMutation } from '../../../features/meetings/meetingsApi';
import { useSendNotificationMutation } from '../../../features/notifications/notificationsApi';
import { analyzeAgenda, generateAgenda } from '../../../services/groqService';
import { AgendaItem, Meeting, User } from '../../../types';

export function useMeetingAi(meetingId: string, meeting: Meeting | null, agenda: AgendaItem[], user: User | null) {
  const [aiContext, setAiContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [addAgendaItem] = useAddAgendaItemMutation();
  const [sendNotification] = useSendNotificationMutation();

  const handleGenerateAI = async () => {
    if (!aiContext.trim() || !meeting) return;
    setIsGenerating(true);
    try {
      const suggestedItems = await generateAgenda(meeting.title, aiContext, 60);
      for (let i = 0; i < suggestedItems.length; i++) {
        const item = suggestedItems[i];
        await addAgendaItem({
          meetingId,
          item: {
            title: item.title,
            description: item.description,
            duration: item.duration,
            order: agenda.length + i,
          },
        });
      }
      setAiContext('');

      if (user) {
        await sendNotification({
          userId: user.uid,
          title: 'AI Generation Complete',
          message: `Groq added ${suggestedItems.length} items to your agenda.`,
          type: 'success',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyzeAgenda = async () => {
    if (!meeting || agenda.length === 0) return;
    setIsAnalyzing(true);
    try {
      setAnalysisResult(await analyzeAgenda(meeting.title, agenda));
    } catch (error) {
      console.error(error);
      toast.error('Failed to analyze agenda.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    aiContext,
    setAiContext,
    isGenerating,
    analysisResult,
    isAnalyzing,
    handleGenerateAI,
    handleAnalyzeAgenda,
    dismissAnalysis: () => setAnalysisResult(null),
  };
}
