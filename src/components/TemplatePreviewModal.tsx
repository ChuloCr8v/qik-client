import React, { useState } from "react";
import { MeetingTemplate } from "../constants/templates";
import { Clock, ListChecks, Library } from "lucide-react";
import CustomDrawer from "./CustomDrawer";
import { usePopup } from "../context/PopupContext";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";

interface TemplatePreviewModalProps {
    onApply: (template: MeetingTemplate, scheduledAt?: string) => void;
    template: MeetingTemplate | null;
}

export default function TemplatePreviewModal({
    onApply,
    template
}: TemplatePreviewModalProps) {
    const [scheduledAt, setScheduledAt] = useState<Dayjs | null>(null);
    const { closeDrawer } = usePopup();

    if (!template) return null;

    const totalDuration = template.items.reduce(
        (acc, item) => acc + item.duration,
        0
    );

    const handleApply = async (template: MeetingTemplate, scheduledAt?: Dayjs) => {
        const scheduledAtStr = scheduledAt ? scheduledAt.toISOString() : undefined;
        await onApply(template, scheduledAtStr);
        setScheduledAt(null);
        closeDrawer();
    };

    return (
        <CustomDrawer
            onClose={closeDrawer}
            icon={<Library className="h-5 w-5 text-primary" />}
            onOk={() => handleApply(template, scheduledAt)}
            title={template.name}
        >
            <div className="space-y-3">
                {/* Summary Box */}
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2 pr-4 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                            <ListChecks className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-muted">Total Duration</p>
                            <p className="text-xs md:text-sm font-semibold text-secondary">
                                {totalDuration} minutes
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs md:text-sm text-muted">Items</p>
                        <p className="text-xs md:text-sm font-semibold text-secondary">
                            {template.items.length}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="text-sm font-semibold">Description</label>
                    <p className="text-xs md:text-sm text-muted">{template.description}</p>
                </div>

                {/* Schedule Picker */}
                <div className="flex flex-col mt-4">
                    <label className="text-sm font-semibold mb-1">
                        Schedule Date & Time (Optional)
                    </label>
                    <DatePicker
                        showTime
                        placeholder="Pick meeting time"
                        value={scheduledAt}
                        onChange={(value) => setScheduledAt(value)}
                        className="w-full text-xs"
                    />
                </div>

                {/* Agenda Items */}
                <div>
                    <label className="text-sm font-semibold">Agenda Items</label>
                    <div className="space-y-2 mt-2">
                        {template.items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-xl border border-border bg-gradient-to-b from-primary/10 to-transparent shadow-xs"
                            >
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-xs md:text-sm font-semibold text-muted">
                                    {i + 1}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="truncate text-xs md:text-sm font-semibold text-secondary">
                                            {item.title}
                                        </p>
                                        <div className="flex shrink-0 items-center gap-1 text-xs md:text-sm font-semibold text-primary">
                                            <Clock className="h-3 w-3" />
                                            {item.duration}m
                                        </div>
                                    </div>
                                    {item.description && (
                                        <p className="mt-2 text-xs md:text-sm text-muted line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CustomDrawer>
    );
}