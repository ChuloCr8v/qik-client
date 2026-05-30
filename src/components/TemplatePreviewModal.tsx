import React, { useState } from 'react';
import Drawer from "./Drawer";
import { MeetingTemplate } from "../constants/templates";
import { Clock, ListChecks, Play, Library } from "lucide-react";

interface TemplatePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (scheduledAt?: string) => void;
    template: MeetingTemplate | null;
}

export default function TemplatePreviewModal({
    isOpen,
    onClose,
    onApply,
    template
}: TemplatePreviewModalProps) {
    const [scheduledAt, setScheduledAt] = React.useState("");

    if (!template) return null;

    const totalDuration = template.items.reduce(
        (acc, item) => acc + item.duration,
        0
    );

    const handleApply = () => {
        onApply(scheduledAt);
        setScheduledAt("");
    };

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            icon={<Library className="h-5 w-5 text-primary" />}
            title={
                <div className="space-y-0.5 text-left">
                    <h3 className="text-[14px] font-bold text-secondary">
                        {template.name}
                    </h3>
                    {template.description && (
                        <p className="text-sm font-medium text-muted leading-tight">
                            {template.description}
                        </p>
                    )}
                </div>
            }
            footer={
                <div className="flex flex-row justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="h-full! px-6 py-2.5 text-sm font-semibold text-muted hover:bg-slate-100 rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        className="h-full! flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white   shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98]"
                    >
                        <Play className="h-3.5 w-3.5" />
                        Apply Template
                    </button>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="flex flex-col text-left">
                    <label className="">Schedule Date & Time (Optional)</label>
                    <input
                        placeholder={"Pick meeting time"}
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={e => setScheduledAt(e.target.value)}
                        className="w-full h-full! pr-10 rounded-xl border border-border bg-slate-50/50 py-2 px-3 text-sm font-medium focus:border-primary focus:bg-white focus:outline-none transition-all"
                    />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2 pr-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white  ">
                            <ListChecks className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-muted uppercase tracking-wider">
                                Total Duration
                            </p>
                            <p className="text-sm font-semibold text-secondary">
                                {totalDuration} minutes
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-muted uppercase tracking-wider">
                            Items
                        </p>
                        <p className="text-sm font-semibold text-secondary">
                            {template.items.length}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase  text-muted">
                        Agenda Items
                    </h4>
                    <div className="space-y-2">
                        {template.items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white shadow-xs"
                            >
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-sm font-semibold text-muted">
                                    {i + 1}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="truncate text-sm font-semibold text-secondary">
                                            {item.title}
                                        </p>
                                        <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
                                            <Clock className="h-3 w-3" />
                                            {item.duration}m
                                        </div>
                                    </div>
                                    {item.description && (
                                        <p className="mt-1 text-sm text-muted line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Drawer>
    );
}
