import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Activity,
    Archive,
    CalendarClock,
    CheckCircle2,
    Clock,
    FileText,
    Plus,
    Search,
    Trash2,
    Users,
    Video,
    MoreVertical
} from "lucide-react";
import { Meeting } from "../types";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import CustomModal, { ModalTheme } from "../components/CustomModal";
import SummaryCard from "../components/global/SummaryCards";
import { cn, formatDate } from "../lib/utils";
import { Button, Empty, Input, Select, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMeetings } from "../features/meetings/MeetingsProvider";
import { usePopup } from "../context/PopupContext";
import NewMeetingCard from "../components/dashboard/NewMeetingCard";
import toast from "react-hot-toast";
import TableComponent from "../components/Table";

type StatusFilter = "all" | Meeting["status"];
type SortOption = "newest" | "oldest" | "scheduled";

const statusOptions: { label: string; value: StatusFilter }[] = [
    { label: "All", value: "all" },
    { label: "Live", value: "active" },
    { label: "Scheduled", value: "scheduled" },
    { label: "Completed", value: "completed" },
    { label: "Archived", value: "archived" }
];

function getTimeValue(value?: string) {
    if (!value) return 0;
    const time = new Date(value).getTime();
    return Number.isNaN(time) ? 0 : time;
}

function getParticipantCount(meeting: Meeting) {
    return (meeting.invitees?.length ?? 0) + 1;
}

function getStatusMeta(status: Meeting["status"]) {
    if (status === "active") {
        return {
            label: "Live",
            color: "success",
            icon: Activity,
            iconClassName: "text-emerald-500",
            borderClassName: "!border-emerald-400"
        };
    }

    if (status === "completed") {
        return {
            label: "Completed",
            color: "default",
            icon: CheckCircle2,
            iconClassName: "text-slate-400",
            borderClassName: "!border-slate-300"
        };
    }

    if (status === "archived") {
        return {
            label: "Archived",
            color: "default",
            icon: Archive,
            iconClassName: "text-slate-300",
            borderClassName: "!border-slate-200"
        };
    }

    return {
        label: "Scheduled",
        color: "warning",
        icon: CalendarClock,
        iconClassName: "text-amber-500",
        borderClassName: "!border-amber-400"
    };
}

function StatusPill({ status }: { status: Meeting["status"] }) {
    const meta = getStatusMeta(status);
    const Icon = meta.icon;

    return (
        <Tag
            color={meta.color}
            className={cn(
                "!m-0 flex! items-center gap-1 rounded-full! !border px-2 py-0.5 !text-[10px] font-semibold uppercase w-fit!",
                meta.borderClassName
            )}
        >
            <Icon className={cn("h-3 w-3 shrink-0", meta.iconClassName)} />
            {meta.label}
        </Tag>
    );
}

function MeetingCard({
    meeting,
    onOpen,
    onDelete
}: {
    key?: React.Key;
    meeting: Meeting;
    onOpen: () => void;
    onDelete: () => void;
}) {
    const meta = getStatusMeta(meeting.status);
    const Icon = meta.icon;
    const count = getParticipantCount(meeting);

    const iconBoxClass = cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
        meeting.status === "active" && "bg-emerald-50 border-emerald-200/60",
        meeting.status === "scheduled" && "bg-amber-50 border-amber-200/60",
        meeting.status === "completed" && "bg-slate-100 border-slate-200/60",
        meeting.status === "archived" && "bg-slate-100 border-slate-200/60"
    );

    const pillClass = cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide",
        meeting.status === "active" && "bg-emerald-50 border-emerald-200/70 text-emerald-500",
        meeting.status === "scheduled" && "bg-amber-50 border-amber-200/70 text-amber-500",
        meeting.status === "completed" && "bg-slate-100 border-slate-200/70 text-slate-400",
        meeting.status === "archived" && "bg-slate-100 border-slate-200/70 text-slate-300"
    );

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpen();
                }
            }}
            className="w-full rounded-[14px] border border-border bg-white px-3 py-2.5 text-left shadow-xs transition-all hover:bg-[var(--status-soft)] hover:border-[var(--status-accent)]/25 hover:shadow-md cursor-pointer"
        >
            <div className="flex items-center gap-2.5">
                {/* Icon box */}
                <div className={iconBoxClass}>
                    <Icon className={cn("h-4 w-4", meta.iconClassName)} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                        <span className={pillClass}>
                            <Icon className={cn("h-2.5 w-2.5", meta.iconClassName)} />
                            {meta.label}
                        </span>
                        <Button
                            type="text"
                            size="small"
                            icon={<MoreVertical className="h-3.5 w-3.5 text-muted" />}
                            onClick={event => {
                                event.stopPropagation();
                                onDelete();
                            }}
                            title="Meeting options"
                            className="shrink-0 -mr-1"
                        />
                    </div>

                    <p className="mt-0.5 text-[12.5px] font-bold text-secondary leading-snug truncate">
                        {meeting.title}
                    </p>

                    {meeting.description && (
                        <p className="mt-0.5 text-[10.5px] text-muted line-clamp-1 leading-snug">
                            {meeting.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-2 pt-1.5 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10.5px] text-muted">
                    <Clock className="h-2.5 w-2.5 shrink-0 text-slate-400" />
                    <span>
                        {meeting.scheduledAt
                            ? formatDate(meeting.scheduledAt)
                            : formatDate(meeting.createdAt)}
                    </span>
                </div>

                {/* Stacked avatars */}
                <div className="flex items-center">
                    {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                        <div
                            key={i}
                            className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white text-[7px] font-bold text-white"
                            style={{
                                background: ["#6366f1","#10b981","#f59e0b"][i],
                                marginLeft: i === 0 ? 0 : -5,
                                zIndex: 3 - i,
                                position: "relative"
                            }}
                        >
                            {String.fromCharCode(65 + i)}
                        </div>
                    ))}
                    {count > 3 && (
                        <div
                            className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[7px] font-bold text-slate-500"
                            style={{ marginLeft: -5, position: "relative", zIndex: 0 }}
                        >
                            +{count - 3}
                        </div>
                    )}
                    <span className="ml-1.5 text-[10.5px] text-muted">
                        {count} {count === 1 ? "person" : "people"}
                    </span>
                </div>
            </div>
        </div>
    );
}
export default function MeetingsPage() {
    const navigate = useNavigate();
    const { meetings, deleteMeetingById } = useMeetings();
    const { openModal } = usePopup();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [meetingToDelete, setMeetingToDelete] = useState<Meeting | null>(
        null
    );
    const [isDeleting, setIsDeleting] = useState(false);

    const stats = useMemo(
        () => ({
            total: meetings.length,
            active: meetings.filter(meeting => meeting.status === "active")
                .length,
            scheduled: meetings.filter(
                meeting => meeting.status === "scheduled"
            ).length,
            completed: meetings.filter(
                meeting => meeting.status === "completed"
            ).length
        }),
        [meetings]
    );

    const filteredMeetings = useMemo(() => {
        return meetings
            .filter(meeting => {
                const query = search.trim().toLowerCase();
                const matchesSearch =
                    !query ||
                    meeting.title.toLowerCase().includes(query) ||
                    meeting.description?.toLowerCase().includes(query);
                const matchesStatus =
                    statusFilter === "all" || meeting.status === statusFilter;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === "oldest")
                    return (
                        getTimeValue(a.createdAt) - getTimeValue(b.createdAt)
                    );
                if (sortBy === "scheduled")
                    return (
                        getTimeValue(b.scheduledAt) -
                        getTimeValue(a.scheduledAt)
                    );
                return getTimeValue(b.createdAt) - getTimeValue(a.createdAt);
            });
    }, [meetings, search, sortBy, statusFilter]);

    const handleDeleteConfirm = async () => {
        if (!meetingToDelete) return;
        setIsDeleting(true);
        try {
            await deleteMeetingById(meetingToDelete.id);
            setMeetingToDelete(null);
            toast.success("Meeting deleted.");
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete meeting.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCreateMeeting = () => openModal(<NewMeetingCard />);

    const columns: ColumnsType<Meeting> = [
        {
            title: "Meeting",
            dataIndex: "title",
            render: (_value, meeting) => (
                <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-secondary">
                        {meeting.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted max-w-[200px]!">
                        {meeting.description || "Agenda workspace"}
                    </p>
                </div>
            )
        },
        {
            title: "Schedule",
            dataIndex: "scheduledAt",
            render: scheduledAt =>
                scheduledAt ? formatDate(scheduledAt) : "Not scheduled",
            className: "text-xs text-muted"
        },
        {
            title: "Status",
            dataIndex: "status",
            render: status => <StatusPill status={status} />
        },
        {
            title: "Participants",
            key: "participants",
            render: (_value, meeting) => (
                <span className="text-xs text-muted">
                    {getParticipantCount(meeting)}{" "}
                    {getParticipantCount(meeting) === 1 ? "person" : "people"}
                </span>
            )
        },
        {
            title: "Created",
            dataIndex: "createdAt",
            render: createdAt => (
                <span className="text-xs text-muted">
                    {formatDate(createdAt)}
                </span>
            )
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            render: (_value, meeting) => (
                <Button
                    danger
                    type="text"
                    size="small"
                    icon={<Trash2 className="h-4 w-4" />}
                    onClick={event => {
                        event.stopPropagation();
                        setMeetingToDelete(meeting);
                    }}
                    title="Delete meeting"
                />
            )
        }
    ];

    return (
        <div className="mx-auto w-full max-w-6xl space-y-4 p-4">
            <PageHeader
                title="Meetings"
                description="Review, schedule, and manage every agenda in one place."
                action={
                    <Button
                        type="primary"
                        icon={<Plus className="h-4 w-4" />}
                        onClick={handleCreateMeeting}
                    >
                        <span className="hidden md:block">New Meeting</span>
                    </Button>
                }
            />

            <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        label: "Total",
                        value: stats.total,
                        icon: FileText,
                        bg: "bg-primary/5",
                        color: "text-primary"
                    },
                    {
                        label: "Live",
                        value: stats.active,
                        icon: Video,
                        bg: "bg-emerald-50",
                        color: "text-emerald-600"
                    },
                    {
                        label: "Scheduled",
                        value: stats.scheduled,
                        icon: CalendarClock,
                        bg: "bg-amber-50",
                        color: "text-amber-600"
                    },
                    {
                        label: "Completed",
                        value: stats.completed,
                        icon: CheckCircle2,
                        bg: "bg-slate-100",
                        color: "text-slate-600"
                    }
                ].map(stat => (
                    <SummaryCard key={stat.label} stat={stat} />
                ))}
            </div>

            <div className="rounded-xl border border-border bg-white p-3">
                <div className="grid grid-cols-2 md:flex flex-col gap-2 md:flex-row lg:items-center lg:justify-between">
                    <div className="relative min-w-0 flex-1">
                        <Input
                            className="text-xs! h-7!"
                            prefix={<Search className="h-4 w-4 text-muted" />}
                            type="text"
                            placeholder="Search by title or description..."
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 items-center">
                        <Select
                            value={statusFilter}
                            onChange={value =>
                                setStatusFilter(value as StatusFilter)
                            }
                            options={statusOptions}
                            className="w-full text-xs! h-7! sm:w-36"
                        />

                        <Select
                            value={sortBy}
                            onChange={value => setSortBy(value)}
                            className="w-full text-xs! h-7! sm:w-44"
                            options={[
                                { label: "Newest first", value: "newest" },
                                { label: "Oldest first", value: "oldest" },
                                {
                                    label: "Scheduled time",
                                    value: "scheduled"
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>

            {filteredMeetings.length > 0 ? (
                <>
                    <div className="hidden md:block">
                        <TableComponent
                            columns={columns}
                            dataSource={filteredMeetings}
                            className="rounded-2xl"
                            onRow={meeting =>
                                navigate(`/meetings/${meeting.id}`)
                            }
                            bordered
                        />
                    </div>

                    <div className="grid gap-3 md:hidden">
                        {filteredMeetings.map(meeting => (
                            <MeetingCard
                                key={meeting.id}
                                meeting={meeting}
                                onOpen={() =>
                                    navigate(`/meetings/${meeting.id}`)
                                }
                                onDelete={() => setMeetingToDelete(meeting)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <div className="mx-auto max-w-sm">
                                <p className="text-base font-semibold text-secondary">
                                    No meetings found
                                </p>
                                <p className="mt-1 text-xs text-muted">
                                    Try a different search, clear the status
                                    filter, or create a new meeting.
                                </p>
                            </div>
                        }
                    >
                        <Button
                            type="primary"
                            icon={<Plus className="h-4 w-4" />}
                            onClick={handleCreateMeeting}
                        >
                            <span>Create Meeting</span>
                        </Button>
                    </Empty>
                </div>
            )}

            <CustomModal
                isOpen={!!meetingToDelete}
                onClose={() => setMeetingToDelete(null)}
                onCancel={() => setMeetingToDelete(null)}
                onOk={handleDeleteConfirm}
                title="Delete Meeting"
                modalTheme={ModalTheme.WARNING}
                isDanger
                loading={isDeleting}
                okText="Delete Meeting"
            >
                <p className="text-xs text-muted leading-relaxed">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-secondary">
                        "{meetingToDelete?.title}"
                    </span>
                    ? This action cannot be undone and all agenda data will be
                    lost.
                </p>
            </CustomModal>
        </div>
    );
}
