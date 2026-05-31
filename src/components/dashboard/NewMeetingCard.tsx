import type { FormEvent } from "react";
import React, { useState } from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useMeetings } from "../../features/meetings/MeetingsProvider";
import { usePopup } from "../../context/PopupContext";
import CustomModal from "../CustomModal.tsx";
import TemplatesTab from "../TemplatesTab";
import { MeetingTemplate } from "../../constants/templates";
import { parseInvitees } from "./dashboardUtils";

type NewMeetingCardProps = {
    isOpen: boolean;
};

const NewMeetingCard: React.FC<NewMeetingCardProps> = ({ isOpen }) => {
    const [activeTab, setActiveTab] = useState<"details" | "templates">(
        "details"
    );
    const [title, setTitle] = useState<string>("");
    const [scheduledAt, setScheduledAt] = useState<string>("");
    const [invitees, setInvitees] = useState<string>("");

    const { isCreatingMeeting, createNewMeeting } = useMeetings();
    const { closeModal, closeDrawer } = usePopup();
    const navigate = useNavigate();

    const resetForm = () => {
        setTitle("");
        setScheduledAt("");
        setInvitees("");
    };

    const handleCreateMeeting = async (
        event?: FormEvent<HTMLFormElement>,
        template?: MeetingTemplate,
        templateStartTime?: string
    ) => {
        try {
            event?.preventDefault();
            if (!title.trim() && !template) return;

            const input = {
                title: title.trim() || template?.name || "Untitled Meeting",
                template,
                scheduledAt: templateStartTime || scheduledAt,
                invitees: parseInvitees(invitees)
            };

            const id = await createNewMeeting(input);

            navigate(`/meetings/${id}`);
            resetForm();
            closeModal();
            closeDrawer();
        } catch (e) {
            console.log(e);
        }
    };

    const handleApplyTemplate = async (
        template: MeetingTemplate,
        startTime?: string
    ) => {
        await handleCreateMeeting(undefined, template, startTime);
        closeDrawer();
    };

    const handleOk = () => {
        if (activeTab === "templates") {
            closeModal();
            navigate("/templates");
        } else {
            handleCreateMeeting();
        }
    };

    const DetailsTab = (
        <form className="space-y-3 mt-3" onSubmit={handleCreateMeeting}>
            <div className="space-y-1.5">
                <label>Meeting Name</label>
                <input
                    required
                    type="text"
                    placeholder="e.g. Design Sync"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="space-y-1.5">
                <label>Schedule Date & Time (Optional)</label>
                <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="space-y-1.5">
                <label>Invite People (Optional)</label>
                <input
                    type="text"
                    placeholder="Emails separated by commas"
                    value={invitees}
                    onChange={(e) => setInvitees(e.target.value)}
                    className="input-field"
                />
            </div>
        </form>
    );

    const tabItems = [
        { key: "details", label: "Details", children: DetailsTab },
        {
            key: "templates",
            label: "Templates",
            children: (
                <TemplatesTab
                    onApplyTemplate={handleApplyTemplate}
                    isCreatingMeeting={isCreatingMeeting}
                />
            )
        }
    ];

    return (
        <CustomModal
            title="Create Meeting"
            modalSubtitle="Start from scratch or use an existing template"
            onClose={closeModal}
            className="max-w-xl min-w-[400px]"
            onOk={handleOk}
            okText={activeTab === "details" ? "Create Meeting" : "More Templates"}
            loading={isCreatingMeeting}
        >
            <div className="flex flex-col">
                <Tabs
                    centered
                    activeKey={activeTab}
                    onChange={(key) =>
                        setActiveTab(key as "details" | "templates")
                    }
                    items={tabItems}
                    size="small"
                    className="w-full"
                />
            </div>
        </CustomModal>
    );
};

export default NewMeetingCard;