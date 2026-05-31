import React from "react";
import { Button } from "antd";
import { ChevronRight, Library } from "lucide-react";
import { MEETING_TEMPLATES, MeetingTemplate } from "../../constants/templates";
import { usePopup } from "../../context/PopupContext";
import TemplateAgendaList from "../TemplateAgendaList";

interface TemplatePickerProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigateTemplates?: () => void;
    onSelectTemplate: (template: MeetingTemplate) => void;
}

export default function TemplatePicker({
    isOpen,
    onClose,
    onNavigateTemplates,
    onSelectTemplate
}: TemplatePickerProps) {
    if (!isOpen) return null;

    const { closeDrawer, openDrawer } = usePopup();

    const handleSelectTemplate = (template: MeetingTemplate) => {
        onSelectTemplate(template);
        closeDrawer();
        onClose();
    };

    return (
        <div className="animate-in fade-in slide-in-from-top-4 rounded-xl border border-primary/10 bg-white p-4">
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-secondary text-base">
                    Choose a Template
                </h3>
                <Button
                    danger
                    type="text"
                    size="small"
                    onClick={onClose}
                    className="text-muted hover:text-primary"
                >
                    X
                </Button>
            </div>

            {/* Templates Grid */}
            <div className="grid gap-3 sm:grid-cols-3">
                {MEETING_TEMPLATES.slice(0, 3).map(template => (
                    <Button
                        key={template.name}
                        onClick={() =>
                            openDrawer(
                                <TemplateAgendaList
                                    template={template}
                                    onOk={() => handleSelectTemplate(template)}
                                    onClose={closeDrawer}
                                />
                            )
                        }
                        type="default"
                        block
                        className="group bg-linear-to-b! from-primary/5 to-transparent flex items-center! justify-start! h-14! text-left transition-all hover:border-primary! hover:shadow-md!"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/10">
                            <Library className="h-4 w-4 text-muted group-hover:text-primary" />
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="md:text-sm font-semibold text-secondary truncate">
                                {template.name}
                            </p>
                            <p className="text-xs text-muted">
                                {template.items.length} Agenda items
                            </p>
                        </div>
                    </Button>
                ))}
            </div>

            {/* More Templates Button */}
            {onNavigateTemplates && (
                <div className="mt-3 flex justify-end">
                    <Button
                        type="link"
                        size="small"
                        onClick={onNavigateTemplates}
                        className="flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                        More <ChevronRight className="h-3 w-3" />
                    </Button>
                </div>
            )}
        </div>
    );
}
