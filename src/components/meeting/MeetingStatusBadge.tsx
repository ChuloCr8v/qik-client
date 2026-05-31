import { Check, Clock, Play } from "lucide-react";
import { Meeting } from "../../types";

export default function MeetingStatusBadge({
    status
}: {
    status: Meeting["status"];
}) {
    if (status === "active") {
        return (
            <span className="flex animate-pulse items-center gap-1 font-semibold text-[10px] md:text-xs text-emerald-600">
                <Play className="h-2.5 w-2.5 fill-current" />
                LIVE
            </span>
        );
    }
    if (status === "completed") {
        return (
            <span className="flex items-center gap-1 font-semibold text-[10px] md:text-xs text-slate-500">
                <Check className="h-2.5 w-2.5" />
                DONE
            </span>
        );
    }
    return (
        <span className="flex items-center gap-1 font-semibold text-[10px] md:text-xs text-amber-600">
            <Clock className="h-2.5 w-2.5" />
            UPCOMING
        </span>
    );
}
