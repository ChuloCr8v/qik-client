import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAddAgendaItemMutation, useAnalyzeAgendaMutation, useGenerateAgendaMutation } from '../../../features/meetings/meetingsApi';
import { useSendNotificationMutation } from '../../../features/notifications/notificationsApi';
import { useGetBillingUsageQuery } from '../../../features/billing/billingApi';
import { AgendaItem, Meeting, User } from '../../../types';

export function useMeetingAi(meetingId: string, meeting: Meeting | null, agenda: AgendaItem[], user: User | null) {
  const [aiContext, setAiContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isUpgradePromptOpen, setIsUpgradePromptOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [addAgendaItem] = useAddAgendaItemMutation();
  const [generateAgenda] = useGenerateAgendaMutation();
  const [analyzeAgenda] = useAnalyzeAgendaMutation();
  const [sendNotification] = useSendNotificationMutation();
  const { data: billingUsage } = useGetBillingUsageQuery(undefined, { skip: !user });

  const handleGenerateAI = async () => {
    if (!aiContext.trim() || !meeting) return;
    setIsGenerating(true);
    try {
      const result = await generateAgenda({
        meetingId,
        meetingTitle: meeting.title,
        context: aiContext,
        duration: 60,
      }).unwrap();
      const suggestedItems = result.agenda;
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
      const message = (error as any)?.data?.message || 'Failed to generate agenda.';
      if ((error as any)?.status === 403) {
        setIsUpgradePromptOpen(true);
      } else {
        toast.error(message);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyzeAgenda = async () => {
    if (!meeting || agenda.length === 0) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeAgenda({
        meetingTitle: meeting.title,
        agendaItems: agenda,
      }).unwrap();
      setAnalysisResult(result.analysis);
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
    isUpgradePromptOpen,
    closeUpgradePrompt: () => setIsUpgradePromptOpen(false),
    currentPlan: billingUsage?.plan || 'Free',
  };
}
