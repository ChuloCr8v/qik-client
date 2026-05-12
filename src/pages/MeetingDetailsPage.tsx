import { useNavigate, useParams } from 'react-router-dom';
import MeetingView from '../components/MeetingView';
import { useMeetings } from '../features/meetings/MeetingsProvider';

export default function MeetingDetailsPage() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { deleteMeetingById, refreshMeetings } = useMeetings();

  if (!meetingId) {
    return null;
  }

  return (
    <MeetingView
      meetingId={meetingId}
      onBack={async () => {
        await refreshMeetings();
        navigate('/meetings');
      }}
      onDeleteMeeting={async (id) => {
        await deleteMeetingById(id);
        navigate('/meetings');
      }}
      onNavigate={navigate}
    />
  );
}
