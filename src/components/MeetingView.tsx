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
import {Button} from "antd"

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
            />

            <div className="relative mx-auto grid max-w-6xl items-start gap-4 px-4 py-4 sm:px-6 md:grid-cols-4">
                <div className="order-2 space-y-6 md:sticky md:top-24 md:order-1 md:col-span-1 md:h-fit md:self-start">
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

                <div className="md:col-span-3">
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
                    isAddOpen={ui.isAddAgendaModalOpen}
                    editingItem={ui.editingItem}
                    selectedTemplate={ui.selectedTemplateForPreview}
                    onCloseInvite={() => ui.setIsInviteModalOpen(false)}
                    onCloseDelete={() => ui.setIsDeleteModalOpen(false)}
                    onConfirmDelete={handleDeleteMeeting}
                    onCloseAdd={() => ui.setIsAddAgendaModalOpen(false)}
                    onCloseEdit={() => ui.setEditingItem(null)}
                    onCloseTemplate={() =>
                        ui.setSelectedTemplateForPreview(null)
                    }
                    onAddItem={actions.handleAddItem}
                    onUpdateItem={data =>
                        actions.handleUpdateItem(ui.editingItem, data)
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
