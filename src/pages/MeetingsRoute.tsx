import { useNavigate } from 'react-router-dom';
import MeetingsPage from './MeetingsPage';
import { useMeetings } from '../features/meetings/MeetingsProvider';

export default function MeetingsRoute() {
  const navigate = useNavigate();
  const { meetings, deleteMeetingById } = useMeetings();

  return (
    <MeetingsPage
      meetings={meetings}
      onMeetingClick={(id) => navigate(`/meetings/${id}`)}
      onCreateMeeting={() => navigate('/')}
      onDeleteMeeting={deleteMeetingById}
    />
  );
}
