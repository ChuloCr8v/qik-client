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
import { Button, Dropdown, type MenuProps } from "antd";
import { Meeting } from "../../types";

interface MeetingActionsProps {
    meeting: Meeting;
    isOwner: boolean;
    isCopying: boolean;
    hasInvitees: boolean;
    mailAvailable?: boolean;
    onCopyLink: () => void;
    onSendReminders: () => void;
    onInvite: () => void;
    onTogglePublic: () => void;
    onExportPDF: () => void;
    onExportMarkdown: () => void;
    onDelete: () => void;
}

export default function MeetingActions({
    meeting,
    isOwner,
    isCopying,
    hasInvitees,
    mailAvailable = true,
    onCopyLink,
    onSendReminders,
    onInvite,
    onTogglePublic,
    onExportPDF,
    onExportMarkdown,
    onDelete
}: MeetingActionsProps) {
    const actionItems: MenuProps["items"] = [
        {
            key: "copy",
            icon: isCopying ? (
                <Check className="h-4 w-4 text-accent" />
            ) : (
                <Copy className="h-4 w-4" />
            ),
            label: isCopying ? "Copied" : "Copy invite link",
            onClick: onCopyLink
        },
        ...(isOwner
            ? [
                {
                    key: "visibility",
                    icon: meeting.isPublic ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    ),
                    label: meeting.isPublic ? "Make Private" : "Make Public",
                    onClick: onTogglePublic
                }
            ]
            : []),
        {
            key: "invite",
            icon: <Users className="h-4 w-4" />,
            label: "Invite Participants",
            disabled: !mailAvailable,
            onClick: onInvite
        },
        ...(hasInvitees
            ? [
                {
                    key: "reminders",
                    icon: <Mail className="h-4 w-4" />,
                    label: "Send Reminders",
                    disabled: !mailAvailable,
                    onClick: onSendReminders
                }
            ]
            : []),
        {
            key: "pdf",
            icon: <Download className="h-4 w-4" />,
            label: "Export to PDF",
            onClick: onExportPDF
        },
        {
            key: "markdown",
            icon: <FileText className="h-4 w-4" />,
            label: "Export to Markdown",
            onClick: onExportMarkdown
        },
        ...(isOwner
            ? [
                {
                    key: "delete",
                    danger: true,
                    icon: <Trash2 className="h-4 w-4" />,
                    label: "Delete Meeting",
                    onClick: onDelete
                }
            ]
            : [])
    ];

    return (
        <Dropdown
            menu={{ items: actionItems }}
            trigger={["click"]}
            placement="bottomRight"
        >
            <Button icon={<MoreVertical className="h-4 w-4" />}>
                {/* <span className="hidden sm:inline">Actions</span> */}
            </Button>
        </Dropdown>
    );
}
