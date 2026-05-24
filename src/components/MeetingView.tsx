import AttendeesPanel from "./meeting/AttendeesPanel.tsx";
import Layout from "./Layout.tsx";
import AiCoachPanel from "./meeting/AiCoachPanel.tsx";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useAuth } from "../features/auth/AuthProvider";
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

interface MeetingViewProps {
    meetingId: string;
    onBack: () => void;
    onDeleteMeeting: (id: string) => void;
    onNavigate?: (path: string) => void;
}

export default function MeetingView({
    meetingId,
    onBack,
    onDeleteMeeting,
    onNavigate
}: MeetingViewProps) {
    const { user } = useAuth();
    const realtime = useMeetingRealtime(meetingId);
    const ui = useMeetingUiState();
    const ai = useMeetingAi(meetingId, realtime.meeting, realtime.agenda, user);
    const actions = useMeetingActions({
        meetingId,
        meeting: realtime.meeting,
        agenda: realtime.agenda,
        setAgenda: realtime.setAgenda,
        setIsCopying: ui.setIsCopying
    });

    const handleDeleteMeeting = async () => {
        ui.setIsDeleting(true);
        try {
            await onDeleteMeeting(meetingId);
            onBack();
        } catch (error) {
            console.error(error);
        } finally {
            ui.setIsDeleting(false);
            ui.setIsDeleteModalOpen(false);
        }
    };

    if (!realtime.meeting && realtime.meetingError) {
        return (
            <Layout user={user} hideFooter onNavigate={onNavigate}>
                <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
                    <div className="max-w-md rounded-3xl border border-border bg-white p-6 text-center shadow-sm">
                        <h1 className="text-xl font-bold text-secondary">
                            Meeting unavailable
                        </h1>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                            This meeting may not exist, or your signed-in email
                            may not be on the invite list.
                        </p>
                        <button
                            onClick={onBack}
                            className="button-primary mt-5"
                        >
                            Back to meetings
                        </button>
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

    return (
        <Layout user={user} hideFooter onNavigate={onNavigate}>
            <MeetingHeader
                meeting={meeting}
                participants={realtime.participants}
                totalTime={totalTime}
                progress={progress}
                isOwner={isOwner}
                isHeaderVisible={realtime.isHeaderVisible}
                isCopying={ui.isCopying}
                onStartMeeting={actions.handleStartMeeting}
                onStopMeeting={actions.handleStopMeeting}
                onOpenOverlay={() => realtime.setIsOverlayOpen(true)}
                onCopyLink={actions.handleCopyLink}
                onSendReminders={actions.handleSendReminders}
                onInvite={() => ui.setIsInviteModalOpen(true)}
                onExportPDF={() =>
                    exportAgendaToPDF(meeting, agenda, realtime.participants)
                }
                onExportMarkdown={() =>
                    exportAgendaToMarkdown(
                        meeting,
                        agenda,
                        realtime.participants
                    )
                }
                onDelete={() => ui.setIsDeleteModalOpen(true)}
                onTogglePublic={actions.handleTogglePublic}
            />

            <div className="relative mx-auto grid max-w-6xl items-start gap-6 px-4 py-4 sm:px-6 lg:grid-cols-4 lg:py-8">
                <div className="order-2 space-y-6 lg:sticky lg:top-24 lg:order-1 lg:col-span-1 lg:h-fit lg:self-start">
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
                    />
                    <AttendeesPanel participants={realtime.participants} />
                    <InviteesPanel
                        invitees={meeting.invitees || []}
                        onInvite={() => ui.setIsInviteModalOpen(true)}
                    />
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
                    onEditItem={item => {
                        if (isOwner) {
                            ui.setEditingItem(item);
                            ui.setIsAddAgendaModalOpen(true);
                        }
                    }}
                    onDragEnd={actions.handleOnDragEnd}
                    onSelectTemplate={ui.setSelectedTemplateForPreview}
                    onNavigateTemplates={() => onNavigate?.("/templates")}
                />

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
