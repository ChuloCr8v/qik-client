import React, { useMemo } from "react";
import { Button } from "antd";
import { FileText, CalendarClock, Plus, LayoutTemplate, ArrowRight } from "lucide-react";
import { MEETING_TEMPLATES, MeetingTemplate } from "../constants/templates";
import { getTemplateDuration } from "./dashboard/dashboardUtils.ts";
import { usePopup } from "../context/PopupContext.tsx";
import TemplatePreviewModal from "./TemplatePreviewModal"
import GradientCard from "./global/GradientCard.tsx";
type TemplatesTabProps = {
    onApplyTemplate: (template: MeetingTemplate, startTime?: string) => void;
    isCreatingMeeting?: boolean;
};

const TemplatesTab: React.FC<TemplatesTabProps> = ({
    onApplyTemplate,
    isCreatingMeeting = false
}) => {
    const featuredTemplates = useMemo(() => MEETING_TEMPLATES.slice(0, 3), []);

    const { openDrawer } = usePopup();

    return (
        <div className="space-y-3">
            {/* Info banner */}
            <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3">
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-xs">
                        <LayoutTemplate className="h-4 w-4" />
                    </div>
                    <div className="">
                        <p className="text-xs md:text-sm font-semibold text-secondary">
                            Start structured
                        </p>
                        <p className="mt-2 text-xs text-muted">
                            Pick a framework, preview the agenda, then launch
                            with the same meeting details.
                        </p>
                    </div>
                </div>
            </div>

            {/* Template list */}
            <div className="grid grid-cols-1 gap-2">
                {featuredTemplates.map(template => (
                    <Button
                        key={template.name}
                        disabled={isCreatingMeeting}
                        onClick={() =>
                            openDrawer(
                                <TemplatePreviewModal
                                    onApply={onApplyTemplate}
                                    template={template}
                                />
                            )
                        }
                        className="h-fit! px-0! w-full! border-0! flex items-center justify-between group"
                    >
                        <GradientCard className="w-full flex items-center justify-between!">
                            <div className="w-full flex flex-col items-start gap-0.5">
                                <span className="block truncate text-xs md:text-sm font-semibold text-secondary group-hover:text-primary duration-300">
                                    {template.name}
                                </span>
                                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                                    <FileText className="h-3 w-3" />
                                    {template.items.length} sections
                                    <CalendarClock className="ml-1 h-3 w-3" />
                                    {getTemplateDuration(template.items)}m
                                </span>
                            </div>
                            <ArrowRight className="h-5 w-5 text-secondary/20 group-hover:text-secondary/50 shrink-0 text-border group-hover:text-primary duration-300" />
                        </GradientCard>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TemplatesTab;
