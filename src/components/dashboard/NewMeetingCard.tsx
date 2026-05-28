import type { FormEvent, ReactNode } from "react";
import React, { useMemo, useState } from "react";
import {
    CalendarClock,
    FileText,
    LayoutTemplate,
    Loader2,
    Plus,
    Sparkles
} from "lucide-react";
import TemplatePreviewModal from "../TemplatePreviewModal";
import { MEETING_TEMPLATES, MeetingTemplate } from "../../constants/templates";
import CustomCard from "./CustomCard";
import { getTemplateDuration, parseInvitees } from "./dashboardUtils";
import GuideLineCard from "./GuideLineCard";
import Modal from "../Modal";
type CreateMeetingInput = {
    title: string;
    template?: MeetingTemplate;
    scheduledAt?: string;
    invitees: string[];
};

type Props = {
    isCreatingMeeting: boolean;
    onCreateMeeting: (input: CreateMeetingInput) => Promise<void>;
    onBrowseTemplates: () => void;
    isOpen: boolean;
    onClose?: () => void;
};

type CreationMode = "details" | "templates";

export default function NewMeetingCard({
    isCreatingMeeting,
    onCreateMeeting,
    onBrowseTemplates,
    isOpen,
    onClose
}: Props) {
    const [mode, setMode] = useState<CreationMode>("details");
    const [title, setTitle] = useState("");
    const [scheduledAt, setScheduledAt] = useState("");
    const [invitees, setInvitees] = useState("");
    const [selectedTemplateForPreview, setSelectedTemplateForPreview] =
        useState<MeetingTemplate | null>(null);

    const featuredTemplates = useMemo(() => MEETING_TEMPLATES.slice(0, 3), []);

    const resetForm = () => {
        setTitle("");
        setScheduledAt("");
        setInvitees("");
    };

    const handleCreateMeeting = async (
        event?: FormEvent,
        template?: MeetingTemplate,
        templateStartTime?: string
    ) => {
        event?.preventDefault();
        if (!title.trim() && !template) return;

        await onCreateMeeting({
            title: title.trim() || template?.name || "Untitled Meeting",
            template,
            scheduledAt: templateStartTime || scheduledAt,
            invitees: parseInvitees(invitees)
        });
        resetForm();
    };

    return (
        <Modal title="Create Meeting" onClose={onClose} isOpen={isOpen}>
            <div className="flex flex-col gap-3">
                <button
                    className="place-self-end border-0! p-0! text-primary h-0! mb-3"
                    onClick={() =>
                        setMode(mode === "details" ? "templates" : "details")
                    }
                >
                    {mode === "details" ? "Templates" : "Details"}
                </button>
                <div className="flex flex-col space-y-3 md:grid grid-cols-6 gap-3">
                    {mode === "details" ? (
                        <form
                            onSubmit={handleCreateMeeting}
                            className="space-y-3"
                        >
                            <div className="space-y-1.5">
                                <label>Meeting Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Design Sync"
                                    value={title}
                                    onChange={event =>
                                        setTitle(event.target.value)
                                    }
                                    className="input-field"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label>Schedule Date & Time (Optional)</label>
                                <input
                                    type="datetime-local"
                                    value={scheduledAt}
                                    onChange={event =>
                                        setScheduledAt(event.target.value)
                                    }
                                    className="input-field"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label>Invite People (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Emails separated by commas"
                                    value={invitees}
                                    onChange={event =>
                                        setInvitees(event.target.value)
                                    }
                                    className="input-field"
                                />
                            </div>
                            <button
                                disabled={isCreatingMeeting}
                                className="button-primary flex w-full items-center justify-center gap-2"
                            >
                                {isCreatingMeeting ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                    <Plus className="h-3 w-3" />
                                )}
                                <span>Create Meeting</span>
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-3">
                            <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-xs">
                                        <LayoutTemplate className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-secondary">
                                            Start structured
                                        </p>
                                        <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                                            Pick a framework, preview the
                                            agenda, then launch with the same
                                            meeting details.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                                {featuredTemplates.map(template => (
                                    <button
                                        key={template.name}
                                        disabled={isCreatingMeeting}
                                        onClick={() =>
                                            setSelectedTemplateForPreview(
                                                template
                                            )
                                        }
                                        className="group flex h-full! items-center justify-between rounded-xl border border-border p-3 text-left transition-all hover:border-primary hover:bg-slate-50"
                                    >
                                        <div className="min-w-0">
                                            <span className="block truncate text-[11px] font-semibold text-secondary group-hover:text-primary">
                                                {template.name}
                                            </span>
                                            <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted">
                                                <FileText className="h-3 w-3" />
                                                {template.items.length} sections
                                                <CalendarClock className="ml-1 h-3 w-3" />
                                                {getTemplateDuration(
                                                    template.items
                                                )}
                                                m
                                            </span>
                                        </div>
                                        <Plus className="h-3.5 w-3.5 shrink-0 text-border group-hover:text-primary" />
                                    </button>
                                ))}

                                <button
                                    onClick={onBrowseTemplates}
                                    className="group h-full! bg-primary text-white text-center rounded-xl p-3 transition-all hover:bg-primary/60"
                                >
                                    More Templates
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="border-t border-gray-300"></div>
                    <GuideLineCard />
                </div>
            </div>

            <TemplatePreviewModal
                isOpen={!!selectedTemplateForPreview}
                onClose={() => setSelectedTemplateForPreview(null)}
                template={selectedTemplateForPreview}
                onApply={async startTime => {
                    if (!selectedTemplateForPreview) return;
                    await handleCreateMeeting(
                        undefined,
                        selectedTemplateForPreview,
                        startTime
                    );
                    setSelectedTemplateForPreview(null);
                }}
            />
        </Modal>
    );
}
