import React from "react";
import { MeetingTemplate } from "../constants/templates";
import { Clock } from "lucide-react";
import { Button } from "antd";
import CustomDrawer from "./CustomDrawer";

interface TemplateAgendaListProps {
    template: MeetingTemplate;
    onOk: (itemIndex: number) => void;
    onClose: () => void;
}

const TemplateAgendaList: React.FC<TemplateAgendaListProps> = ({
    template,
    onOk,
    onClose
}) => {
    return (
        <CustomDrawer
            onOk={onOk}
            okText={"Select"}
            title={template?.name}
        >
            {/* Agenda List */}
            <p className="text-base font-semibold">Agenda List</p>
            <div className="space-y-2 mt-3">
                {template.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-xl border border-border bg-gradient-to-b from-primary/10 to-transparent shadow-xs"
                    >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-xs md:text-sm font-semibold text-muted">
                            {index + 1}
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
        </CustomDrawer>
    );
};

export default TemplateAgendaList;
