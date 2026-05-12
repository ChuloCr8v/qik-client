const pendingMeetingKey = 'qa_pending_meeting_id';

export function savePendingMeetingInvite(meetingId: string) {
  localStorage.setItem(pendingMeetingKey, meetingId);
}

export function getPendingMeetingInvite() {
  return localStorage.getItem(pendingMeetingKey);
}

export function clearPendingMeetingInvite() {
  localStorage.removeItem(pendingMeetingKey);
}

export function getMeetingRedirect(meetingId: string) {
  return `/meetings/${encodeURIComponent(meetingId)}`;
}
