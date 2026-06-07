import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Modal, Pagination } from "antd";
import PageHeader from "../components/PageHeader";
import TemplatePreviewModal from "../components/TemplatePreviewModal";
import TemplateEditorDrawer from "../components/templates/TemplateEditorDrawer";
import TemplateGrid, {
    TemplateListItem
} from "../components/templates/TemplateGrid";
import TemplateSearch from "../components/templates/TemplateSearch";
import { MEETING_TEMPLATES, MeetingTemplate } from "../constants/templates";
import { AgendaItem } from "../types";
import { useCreateMeetingMutation } from "../features/meetings/meetingsApi";
import {
    useAddTemplateMutation,
    useDeleteTemplateMutation,
    useGetTemplatesQuery,
    useUpdateTemplateMutation
} from "../features/templates/templatesApi";

const PAGE_SIZE = 9;

export default function TemplatesPage() {
    const navigate = useNavigate();
    const {
        data: customTemplates = [],
        isLoading: loading,
        refetch
    } = useGetTemplatesQuery();
    const [createMeeting] = useCreateMeetingMutation();
    const [addTemplate] = useAddTemplateMutation();
    const [updateTemplate] = useUpdateTemplateMutation();
    const [deleteTemplate] = useDeleteTemplateMutation();

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<
        (MeetingTemplate & { id: string }) | null
    >(null);
    const [selectedTemplateForPreview, setSelectedTemplateForPreview] =
        useState<MeetingTemplate | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [formName, setFormName] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [formItems, setFormItems] = useState<
        Omit<AgendaItem, "id" | "order">[]
    >([]);

    const openEditor = (template?: MeetingTemplate & { id: string }) => {
        setEditingTemplate(template || null);
        setFormName(template?.name || "");
        setFormDesc(template?.description || "");
        setFormItems(
            template
                ? [...template.items]
                : [
                      {
                          title: "Introduction",
                          duration: 5,
                          description: "Setting the stage"
                      },
                      {
                          title: "Main Topic",
                          duration: 15,
                          description: "Core discussion"
                      },
                      {
                          title: "Conclusion",
                          duration: 5,
                          description: "Final thoughts"
                      }
                  ]
        );
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const templateData = {
            name: formName,
            description: formDesc,
            items: formItems
        };
        try {
            if (editingTemplate) {
                await updateTemplate({
                    id: editingTemplate.id,
                    data: templateData
                }).unwrap();
                toast.success("Template updated.");
            } else {
                await addTemplate(templateData).unwrap();
                toast.success("Template created.");
            }
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.error(error);
            toast.error(
                editingTemplate
                    ? "Failed to update template."
                    : "Failed to create template."
            );
        }
    };

    const handleApplyTemplate = async (
        template: MeetingTemplate,
        startTime?: string
    ) => {
        try {
            const meeting = await createMeeting({
                title: template.name,
                template,
                scheduledAt: startTime
            }).unwrap();
            toast.success("Meeting created from template!");
            if (meeting.id) navigate(`/meetings/${meeting.id}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to create meeting.");
        } finally {
            setSelectedTemplateForPreview(null);
        }
    };

    const handleDeleteTemplate = async (template: TemplateListItem) => {
        Modal.confirm({
            title: "Delete template?",
            content: `This will permanently delete "${template.name}".`,
            okText: "Delete",
            okButtonProps: { danger: true },
            onOk: async () => {
                try {
                    await deleteTemplate(template.id).unwrap();
                    setOpenDropdownId(null);
                    refetch();
                    toast.success("Template deleted.");
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete template.");
                }
            }
        });
    };

    const updateItem = (
        index: number,
        field: keyof Omit<AgendaItem, "id" | "order">,
        value: any
    ) => {
        const newItems = [...formItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormItems(newItems);
    };

    // ── Build + filter all templates ──────────────────────────────────────────

    const allTemplates: TemplateListItem[] = [
        ...MEETING_TEMPLATES.map(template => ({
            ...template,
            id: `system-${template.name}`,
            isSystem: true
        })),
        ...customTemplates.map(template => ({
            ...template,
            isSystem: false
        }))
    ];

    const filteredTemplates = allTemplates.filter(
        template =>
            template.name.toLowerCase().includes(search.toLowerCase()) ||
            template.description?.toLowerCase().includes(search.toLowerCase())
    );

    // ── Pagination slice ──────────────────────────────────────────────────────

    const paginatedTemplates = filteredTemplates.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    // Reset to page 1 whenever search changes
    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    // ── Loading state ─────────────────────────────────────────────────────────

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="mx-auto space-y-3 max-w-6xl p-4">
            <PageHeader
                title="Meeting Templates"
                // action={
                //     <Button
                //         type="primary"
                //         onClick={() => openEditor()}
                //         icon={<Plus className="h-4 w-4" />}
                //     >
                //         <span className="max-md:hidden">New Template</span>
                //     </Button>
                // }
            />

            <div className="grid gap-3">
                <TemplateSearch value={search} onChange={handleSearch} />

                <TemplateGrid
                    templates={paginatedTemplates}
                    openDropdownId={openDropdownId}
                    onDropdownToggle={id =>
                        setOpenDropdownId(openDropdownId === id ? null : id)
                    }
                    onPreview={template => {
                        setSelectedTemplateForPreview(template);
                        setOpenDropdownId(null);
                    }}
                    onEdit={template => {
                        openEditor(template);
                        setOpenDropdownId(null);
                    }}
                    onDelete={handleDeleteTemplate}
                />

                {/* Pagination */}
                {filteredTemplates.length > PAGE_SIZE && (
                    <div className="flex justify-center pt-2">
                        <Pagination
                            current={currentPage}
                            pageSize={PAGE_SIZE}
                            total={filteredTemplates.length}
                            onChange={page => setCurrentPage(page)}
                            showSizeChanger={false}
                            // showTotal={(total, range) =>
                            //     `${range[0]}–${range[1]} of ${total}`
                            // }
                        />
                    </div>
                )}
            </div>

            <TemplatePreviewModal
                isOpen={!!selectedTemplateForPreview}
                onClose={() => setSelectedTemplateForPreview(null)}
                template={selectedTemplateForPreview}
                onApply={handleApplyTemplate}
            />

            <TemplateEditorDrawer
                isOpen={isModalOpen}
                isEditing={!!editingTemplate}
                name={formName}
                description={formDesc}
                items={formItems}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSave}
                onNameChange={setFormName}
                onDescriptionChange={setFormDesc}
                onAddItem={() =>
                    setFormItems([
                        ...formItems,
                        { title: "New Item", duration: 5, description: "" }
                    ])
                }
                onRemoveItem={index =>
                    setFormItems(formItems.filter((_, i) => i !== index))
                }
                onUpdateItem={updateItem}
            />
        </div>
    );
}
