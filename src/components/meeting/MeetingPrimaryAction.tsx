import { Play, Users } from "lucide-react";
import { Button } from "antd";
import { useMemo } from "react";
import { Meeting } from "../../types";

interface MeetingPrimaryActionProps {
    meeting: Meeting;
    isOwner: boolean;
    onStartMeeting: () => void;
    onStopMeeting: () => void;
    onOpenOverlay: () => void;
}

function getActionConfig(
    meeting: Meeting,
    isOwner: boolean,
    onStartMeeting: () => void,
    onStopMeeting: () => void,
    onOpenOverlay: () => void
) {
    switch (meeting.status) {
        case "active":
            return isOwner
                ? {
                      danger: true,
                      type: "primary" as const,
                      title: "End Meeting",
                      icon: <div className="h-2 w-2 rounded-sm bg-white" />,
                      onOk: onStopMeeting
                  }
                : {
                      type: "primary" as const,
                      title: "Join Room",
                      icon: <Users className="h-3 w-3" />,
                      onOk: onOpenOverlay
                  };
        case "completed":
            return {
                type: "default" as const,
                title: "Restart",
                icon: <Play className="h-3 w-3 fill-current" />,
                onOk: onStartMeeting
            };
        case "scheduled":
        default:
            return {
                type: "primary" as const,
                title: "Go Live",
                icon: <Play className="h-3 w-3 fill-current" />,
                onOk: onStartMeeting
            };
    }
}

export default function MeetingPrimaryAction({
    meeting,
    isOwner,
    onStartMeeting,
    onStopMeeting,
    onOpenOverlay
}: MeetingPrimaryActionProps) {
    const action = useMemo(
        () =>
            getActionConfig(
                meeting,
                isOwner,
                onStartMeeting,
                onStopMeeting,
                onOpenOverlay
            ),
        [meeting.status, isOwner, onStartMeeting, onStopMeeting, onOpenOverlay]
    );

    return (
        <Button
            block
            type={action.type}
            danger={action.danger}
            onClick={action.onOk}
            icon={action.icon}
        >
            {action.title}
        </Button>
    );
}
