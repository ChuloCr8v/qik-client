import {
    Check,
    Copy,
    Download,
    Eye,
    EyeOff,
    FileText,
    Mail,
    MoreVertical,
    Trash2,
    Users
} from "lucide-react";
import Dropdown, { DropdownItem } from "../Dropdown";
import { Meeting } from "../../types";

interface MeetingActionsProps {
    meeting: Meeting;
    isOwner: boolean;
    isCopying: boolean;
    hasInvitees: boolean;
    onCopyLink: () => void;
    onSendReminders: () => void;
    onInvite: () => void;
    onTogglePublic: () => void;
    onExportPDF: () => void;
    onExportMarkdown: () => void;
    onDelete: () => void;
}

const sharedBtnClass =
    "flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600   transition-colors hover:border-primary";

export default function MeetingActions({
    meeting,
    isOwner,
    isCopying,
    hasInvitees,
    onCopyLink,
    onSendReminders,
    onInvite,
    onTogglePublic,
    onExportPDF,
    onExportMarkdown,
    onDelete
}: MeetingActionsProps) {
    return (
        <>
            {/* Desktop */}
            <div className="hidden items-center gap-2 lg:flex">
                <button onClick={onCopyLink} className={sharedBtnClass}>
                    {isCopying ? (
                        <Check className="h-3.5 w-3.5 text-accent" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" />
                    )}
                    {isCopying ? "Copied" : "Copy"}
                </button>

                {hasInvitees && (
                    <button
                        onClick={onSendReminders}
                        className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-bold text-primary   transition-colors hover:bg-primary/10"
                    >
                        <Mail className="h-3.5 w-3.5" />
                        Remind
                    </button>
                )}

                <button onClick={onInvite} className={sharedBtnClass}>
                    <Users className="h-3.5 w-3.5" />
                    Invite
                </button>

                {isOwner && (
                    <button onClick={onTogglePublic} className={sharedBtnClass}>
                        {meeting.isPublic ? (
                            <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                            <Eye className="h-3.5 w-3.5" />
                        )}
                        {meeting.isPublic ? "Make Private" : "Make Public"}
                    </button>
                )}

                <button
                    onClick={onExportPDF}
                    className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-[11px] font-bold text-white   transition-opacity hover:opacity-90"
                >
                    <Download className="h-3.5 w-3.5" />
                    PDF
                </button>

                {isOwner && (
                    <button
                        onClick={onDelete}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500   transition-colors hover:bg-red-100"
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                )}
            </div>

            {/* Mobile */}
            <div className="w-full flex items-center gap-2 lg:hidden">
                <button
                    onClick={onCopyLink}
                    className="flex gap-2 p-4 py-2 shrink-0 items-center justify-center active:scale-95"
                >
                    {isCopying ? (
                        <Check className="h-3 w-3 text-accent" />
                    ) : (
                        <Copy className="h-3 w-3 text-secondary" />
                    )}
                    Copy Invite Link
                </button>

                <Dropdown
                    trigger={
                        <button className="flex items-center p-3 justify-center bg-white hover:bg-slate-50 active:scale-95">
                            <MoreVertical className="h-3 w-3 text-secondary" />
                        </button>
                    }
                >
                    {isOwner && (
                        <DropdownItem
                            icon={meeting.isPublic ? EyeOff : Eye}
                            onClick={onTogglePublic}
                        >
                            {meeting.isPublic ? "Make Private" : "Make Public"}
                        </DropdownItem>
                    )}
                    <DropdownItem icon={Users} onClick={onInvite}>
                        Invite Participants
                    </DropdownItem>
                    {hasInvitees && (
                        <DropdownItem icon={Mail} onClick={onSendReminders}>
                            Send Reminders
                        </DropdownItem>
                    )}
                    <DropdownItem icon={Download} onClick={onExportPDF}>
                        Export to PDF
                    </DropdownItem>
                    <DropdownItem icon={FileText} onClick={onExportMarkdown}>
                        Export to Markdown
                    </DropdownItem>
                    {isOwner && (
                        <DropdownItem
                            icon={Trash2}
                            onClick={onDelete}
                            className="text-red-600"
                        >
                            Delete Meeting
                        </DropdownItem>
                    )}
                </Dropdown>
            </div>
        </>
    );
}
