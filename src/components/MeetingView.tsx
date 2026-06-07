import AttendeesPanel from "./meeting/AttendeesPanel.tsx";
import Layout from "./Layout.tsx";
import AiCoachPanel from "./meeting/AiCoachPanel.tsx";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../features/auth/AuthProvider";
import { useMeetings } from "../features/meetings/MeetingsProvider";
import {
    exportAgendaToMarkdown,
    exportAgendaToPDF
} from "../utils/meetingExport";
import ActiveMeetingOverlay from "./ActiveMeetingOverlay";
import { useMeetingAi } from "./meeting/hooks/useMeetingAi";
import AgendaList from "./meeting/AgendaList";
import InviteesPanel from "./meeting/InviteesPanel";
import LiveStickyBar from "./meeting/LiveStickyBar";
import MeetingHeader from "./meeting/MeetingHeader";
import MeetingModals from "./meeting/MeetingModals";
import UpgradePrompt from "./billing/UpgradePrompt";
import { useMeetingActions } from "./meeting/hooks/useMeetingActions";
import { useMeetingRealtime } from "./meeting/hooks/useMeetingRealtime";
import { useMeetingUiState } from "./meeting/hooks/useMeetingUiState";
import { isIntegrationConfigured, useGetHealthQuery } from "../features/system/systemApi";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useAddTemplateMutation } from "../features/templates/templatesApi";

export default function MeetingView() {
    const { meetingId } = useParams();
    const activeMeetingId = meetingId ?? "";
    const navigate = useNavigate();
    const { user } = useAuth();
    const { deleteMeetingById, refreshMeetings } = useMeetings();
    const { data: health } = useGetHealthQuery();
    const realtime = useMeetingRealtime(activeMeetingId);
    const ui = useMeetingUiState();
    const ai = useMeetingAi(activeMeetingId, realtime.meeting, realtime.agenda, user);
    const actions = useMeetingActions({
        meetingId: activeMeetingId,
        meeting: realtime.meeting,
        agenda: realtime.agenda,
        setAgenda: realtime.setAgenda,
        setIsCopying: ui.setIsCopying
    });
    const [addTemplate] = useAddTemplateMutation();
    const [isSaveTemplateOpen, setIsSaveTemplateOpen] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [isSavingTemplate, setIsSavingTemplate] = useState(false);
    const [isSaveTemplateUpgradeOpen, setIsSaveTemplateUpgradeOpen] = useState(false);

    if (!meetingId) {
        return null;
    }

    const handleDeleteMeeting = async () => {
        ui.setIsDeleting(true);
        try {
            await deleteMeetingById(meetingId);
            await refreshMeetings();
            toast.success("Meeting deleted.");
            navigate("/meetings");
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete meeting.");
        } finally {
            ui.setIsDeleting(false);
            ui.setIsDeleteModalOpen(false);
        }
    };

    if (!realtime.meeting && realtime.meetingError) {
        return (
            <Layout user={user} hideFooter onNavigate={navigate}>
                <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
                    <div className="max-w-md rounded-3xl border border-border bg-white p-6 text-center ">
                        <h1 className="text-xl font-bold text-secondary">
                            Meeting unavailable
                        </h1>
                        <p className="mt-3! text-sm leading-relaxed text-muted">
                            This meeting may not exist, or your signed-in email
                            may not be on the invite list.
                        </p>
                        <Button
                            onClick={async () => {
                                await refreshMeetings();
                                navigate("/meetings");
                            }}

                        >
                            Back to meetings
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!realtime.meeting) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    const meeting = realtime.meeting;
    const agenda = realtime.agenda;
    const isOwner = user?.uid === meeting.ownerId;
    const totalTime = agenda.reduce((acc, item) => acc + item.duration, 0);
    const completedTime = agenda
        .filter(item => item.completed)
        .reduce((acc, item) => acc + item.duration, 0);
    const progress = totalTime > 0 ? (completedTime / totalTime) * 100 : 0;
    const aiAvailable = isIntegrationConfigured(health, "ai");
    const mailAvailable = isIntegrationConfigured(health, "mail");

    const isPaidUser = user?.plan && user.plan !== 'Free';

    const handleSaveAsTemplate = () => {
        if (!isPaidUser) {
            setIsSaveTemplateUpgradeOpen(true);
            return;
        }
        setTemplateName(realtime.meeting?.title || "");
        setIsSaveTemplateOpen(true);
    };

    const handleConfirmSaveTemplate = async () => {
        if (!templateName.trim() || !realtime.agenda.length) return;
        setIsSavingTemplate(true);
        try {
            await addTemplate({
                name: templateName.trim(),
                description: realtime.meeting?.description || "",
                items: realtime.agenda.map(({ title, description, duration, order }) => ({ title, description, duration, order })),
            }).unwrap();
            toast.success("Saved as template!");
            setIsSaveTemplateOpen(false);
        } catch (err: any) {
            toast.error(err?.data?.message || "Unable to save template.");
        } finally {
            setIsSavingTemplate(false);
        }
    };

    const handleExportPDF = async () => {
        try {
            await exportAgendaToPDF(meeting, agenda, realtime.participants);
            toast.success("PDF exported.");
        } catch (error) {
            console.error(error);
            toast.error("Unable to export PDF.");
        }
    };

    const handleExportMarkdown = () => {
        try {
            exportAgendaToMarkdown(meeting, agenda, realtime.participants);
            toast.success("Markdown exported.");
        } catch (error) {
            console.error(error);
            toast.error("Unable to export Markdown.");
        }
    };

    return (
        <Layout user={user} hideFooter onNavigate={navigate}>
            <MeetingHeader
                meeting={meeting}
                participants={realtime.participants}
                totalTime={totalTime}
                progress={progress}
                isOwner={isOwner}
                isHeaderVisible={realtime.isHeaderVisible}
                isCopying={ui.isCopying}
                mailAvailable={mailAvailable}
                onStartMeeting={actions.handleStartMeeting}
                onStopMeeting={actions.handleStopMeeting}
                onOpenOverlay={() => realtime.setIsOverlayOpen(true)}
                onCopyLink={actions.handleCopyLink}
                onSendReminders={actions.handleSendReminders}
                onInvite={() => ui.setIsInviteModalOpen(true)}
                onExportPDF={handleExportPDF}
                onExportMarkdown={handleExportMarkdown}
                onDelete={() => ui.setIsDeleteModalOpen(true)}
                onTogglePublic={actions.handleTogglePublic}
                canSaveTemplate={!!isPaidUser}
                onSaveAsTemplate={handleSaveAsTemplate}
            />

            <div className="relative mx-auto grid h-full!  items-start gap-4 px-4 py-4 sm:px-6 md:grid-cols-3">
                <div className="max-md:pb-20! md:bg-white order-2 space-y-6 md:sticky md:-mt-4 md:pt-4 md:order-1 md:border-x md:shadow-xs md:border-slate-200 md:px-3 h-full! md:col-span-1 md:self-start">
                    <AiCoachPanel
                        aiContext={ai.aiContext}
                        agenda={agenda}
                        isGenerating={ai.isGenerating}
                        isAnalyzing={ai.isAnalyzing}
                        analysisResult={ai.analysisResult}
                        onContextChange={ai.setAiContext}
                        onGenerate={ai.handleGenerateAI}
                        onAnalyze={ai.handleAnalyzeAgenda}
                        onDismissAnalysis={ai.dismissAnalysis}
                        aiAvailable={aiAvailable}
                    />
                    <AttendeesPanel participants={realtime.participants} />
                    <InviteesPanel
                        invitees={meeting.invitees || []}
                        onInvite={() => ui.setIsInviteModalOpen(true)}
                        mailAvailable={mailAvailable}
                    />
                </div>

                <div className="md:col-span-2">
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-secondary mb-2">Description</p>
                        <p className="text-sm text-muted">{meeting.description}</p>
                    </div>
                    <AgendaList
                        meeting={meeting}
                        meetingId={meetingId}
                        agenda={agenda}
                        isOwner={isOwner}
                        isGenerating={ai.isGenerating}
                        currentProgress={realtime.currentProgress}
                        isTemplateListOpen={ui.isTemplateListOpen}
                        agendaEndRef={realtime.agendaEndRef}
                        onToggleTemplates={() =>
                            ui.setIsTemplateListOpen(!ui.isTemplateListOpen)
                        }
                        onCloseTemplates={() => ui.setIsTemplateListOpen(false)}
                        onOpenAddTopic={() => ui.setIsAddAgendaModalOpen(true)}
                        onDragEnd={actions.handleOnDragEnd}
                        onSelectTemplate={async template => {
                            await actions.applyTemplate(template);
                            ui.setIsTemplateListOpen(false);
                        }}
                        onNavigateTemplates={() => navigate("/templates")}
                    />
                </div>

                <MeetingModals
                    meeting={meeting}
                    isInviteOpen={ui.isInviteModalOpen}
                    isDeleteOpen={ui.isDeleteModalOpen}
                    isDeleting={ui.isDeleting}
                    selectedTemplate={ui.selectedTemplateForPreview}
                    onCloseInvite={() => ui.setIsInviteModalOpen(false)}
                    onCloseDelete={() => ui.setIsDeleteModalOpen(false)}
                    onConfirmDelete={handleDeleteMeeting}
                    onCloseTemplate={() =>
                        ui.setSelectedTemplateForPreview(null)
                    }
                    onApplyTemplate={async startTime => {
                        if (!ui.selectedTemplateForPreview) return;
                        await actions.applyTemplate(
                            ui.selectedTemplateForPreview,
                            startTime
                        );
                        ui.setSelectedTemplateForPreview(null);
                        ui.setIsTemplateListOpen(false);
                    }}
                    onAddInvitee={actions.handleAddInvitee}
                    mailAvailable={mailAvailable}
                />

                <UpgradePrompt
                    isOpen={ai.isUpgradePromptOpen}
                    onClose={ai.closeUpgradePrompt}
                    currentPlan={ai.currentPlan}
                    missingFeature="You have reached your monthly AI generation limit. Upgrade to continue generating agendas."
                />

                <UpgradePrompt
                    isOpen={isSaveTemplateUpgradeOpen}
                    onClose={() => setIsSaveTemplateUpgradeOpen(false)}
                    currentPlan={ai.currentPlan}
                    missingFeature="Saving meetings as templates is a paid feature. Upgrade to Individual or Organisation to build your own template library."
                />

                <Modal
                    open={isSaveTemplateOpen}
                    title="Save as Template"
                    okText="Save Template"
                    onOk={handleConfirmSaveTemplate}
                    onCancel={() => setIsSaveTemplateOpen(false)}
                    confirmLoading={isSavingTemplate}
                    okButtonProps={{ disabled: !templateName.trim() }}
                    width={420}
                >
                    <p className="mb-3 text-sm text-muted">
                        This will save the current agenda structure as a reusable template. Give it a name:
                    </p>
                    <Input
                        value={templateName}
                        onChange={e => setTemplateName(e.target.value)}
                        placeholder="e.g. Weekly Team Sync"
                        autoFocus
                        onPressEnter={handleConfirmSaveTemplate}
                    />
                </Modal>

                <LiveStickyBar
                    meeting={meeting}
                    agenda={agenda}
                    isOverlayOpen={realtime.isOverlayOpen}
                    onOpen={() => realtime.setIsOverlayOpen(true)}
                />

                <AnimatePresence>
                    {realtime.isOverlayOpen && (
                        <ActiveMeetingOverlay
                            meetingId={meetingId}
                            meetingTitle={meeting.title}
                            agenda={agenda}
                            activeItemIndex={meeting.activeItemIndex || 0}
                            isPaused={meeting.isPaused || false}
                            isOwner={isOwner}
                            participants={realtime.participants}
                            startedAt={meeting.startedAt}
                            onClose={() => realtime.setIsOverlayOpen(false)}
                            onStop={actions.handleStopMeeting}
                        />
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
}
