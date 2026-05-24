import { useNavigate } from 'react-router-dom';
import GuideLineCard from '../components/dashboard/GuideLineCard';
import NewMeetingCard from '../components/dashboard/NewMeetingCard';
import RecentMeetingsCard from '../components/dashboard/RecentMeetingsCard';
import UsageBadge from '../components/billing/UsageBadge';
import { MeetingTemplate } from '../constants/templates';
import { useMeetings } from '../features/meetings/MeetingsProvider';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { meetings, isCreatingMeeting, createNewMeeting } = useMeetings();

  const handleCreateMeeting = async (input: {
    title: string;
    template?: MeetingTemplate;
    scheduledAt?: string;
    invitees: string[];
  }) => {
    const id = await createNewMeeting(input);
    navigate(`/meetings/${id}`);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-4 flex justify-end">
        <UsageBadge />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-6 md:grid grid-cols-6 gap-6">
          <NewMeetingCard
            isCreatingMeeting={isCreatingMeeting}
            onCreateMeeting={handleCreateMeeting}
            onBrowseTemplates={() => navigate('/templates')}
          />
          <GuideLineCard />
        </div>

        <RecentMeetingsCard
          meetings={meetings}
          onShowAll={() => navigate('/meetings')}
          onOpenMeeting={(meetingId) => navigate(`/meetings/${meetingId}`)}
        />
      </div>
    </main>
  );
}
