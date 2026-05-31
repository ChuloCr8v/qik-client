import { Play, Users } from "lucide-react";
import { useMemo } from "react";
import { cn } from "../../lib/utils";
import { Meeting } from "../../types";

interface MeetingPrimaryActionProps {
    meeting: Meeting;
    isOwner: boolean;
    onStartMeeting: () => void;
    onStopMeeting: () => void;
    onOpenOverlay: () => void;
}

const actionBtn = (variant: "red" | "green" | "slate") =>
    cn(
        "flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold border transition-all active:scale-95 cursor-pointer sm:gap-2",
        {
            "bg-red-500 text-white hover:bg-red-600 border-red-500":
                variant === "red",
            "bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500":
                variant === "green",
            "bg-slate-100 text-secondary hover:bg-slate-200 border-slate-200":
                variant === "slate"
        }
    );

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
                      className: actionBtn("red"),
                      title: "End Meeting",
                      icon: <div className="h-2 w-2 rounded-sm bg-white" />,
                      onOk: onStopMeeting
                  }
                : {
                      className: actionBtn("green"),
                      title: "Join Room",
                      icon: <Users className="h-3 w-3" />,
                      onOk: onOpenOverlay
                  };
        case "completed":
            return {
                className: actionBtn("slate"),
                title: "Restart",
                icon: <Play className="h-3 w-3 fill-current" />,
                onOk: onStartMeeting
            };
        case "scheduled":
        default:
            return {
                className: actionBtn("green"),
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
        <button
            onClick={action.onOk}
            className={cn(action.className, "text-white!")}
        >
            {action.icon}
            <span className="text-white">{action.title}</span>
        </button>
    );
}
