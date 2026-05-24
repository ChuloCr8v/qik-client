import React, {
  useState
} from 'react';
import {
  useNavigate
} from 'react-router-dom';
import {
  Loader2,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import TemplatePreviewModal from '../components/TemplatePreviewModal';
import TemplateEditorDrawer from '../components/templates/TemplateEditorDrawer';
import TemplateGrid, {
  TemplateListItem
} from '../components/templates/TemplateGrid';
import TemplateSearch from '../components/templates/TemplateSearch';
import {
  MEETING_TEMPLATES,
  MeetingTemplate
} from '../constants/templates';
import {
  AgendaItem
} from '../types';
import {
  useCreateMeetingMutation
} from '../features/meetings/meetingsApi';
import {
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplatesQuery,
  useUpdateTemplateMutation
} from '../features/templates/templatesApi';

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
  const [search,
    setSearch] = useState('');
  const [isModalOpen,
    setIsModalOpen] = useState(false);
  const [editingTemplate,
    setEditingTemplate] = useState < (MeetingTemplate & {
      id: string
    }) | null > (null);
  const [selectedTemplateForPreview,
    setSelectedTemplateForPreview] = useState < MeetingTemplate | null > (null);
  const [openDropdownId,
    setOpenDropdownId] = useState < string | null > (null);
  const [formName,
    setFormName] = useState('');
  const [formDesc,
    setFormDesc] = useState('');
  const [formItems,
    setFormItems] = useState < Omit < AgendaItem,
  'id' | 'order' > [] > ([]);

  const openEditor = (template?: MeetingTemplate & {
    id: string
  }) => {
    setEditingTemplate(template || null);
    setFormName(template?.name || '');
    setFormDesc(template?.description || '');
    setFormItems(template ? [...template.items]: [{
      title: 'Introduction', duration: 5, description: 'Setting the stage'
    },
      {
        title: 'Main Topic', duration: 15, description: 'Core discussion'
      },
      {
        title: 'Conclusion', duration: 5, description: 'Final thoughts'
      }]);
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
        await updateTemplate( {
          id: editingTemplate.id, data: templateData
        }).unwrap();
      } else {
        await addTemplate(templateData).unwrap();
      }
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleApplyTemplate = async (template: MeetingTemplate, startTime?: string) => {
    try {
      const meeting = await createMeeting( {
        title: template.name, template, scheduledAt: startTime
      }).unwrap();
      toast.success('Meeting created from template!');
      if (meeting.id) navigate(`/meetings/${meeting.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create meeting.');
    } finally {
      setSelectedTemplateForPreview(null);
    }
  };

  const handleDeleteTemplate = async (template: TemplateListItem) => {
    if (!confirm('Are you sure you want to delete this template?')) return;
    await deleteTemplate(template.id).unwrap();
    setOpenDropdownId(null);
    refetch();
  };

  const updateItem = (index: number, field: keyof Omit < AgendaItem, 'id' | 'order' >, value: any) => {
    const newItems = [...formItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setFormItems(newItems);
  };

  const allTemplates: TemplateListItem[] = [
    ...MEETING_TEMPLATES.map(template => ({
      ...template, id: `system-${template.name}`, isSystem: true
    })),
    ...customTemplates.map(template => ({
      ...template, isSystem: false
    }))
  ];

  const filteredTemplates = allTemplates.filter(template =>
    template.name.toLowerCase().includes(search.toLowerCase()) ||
    template.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-4 max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Meeting Templates"
        action={
        <button onClick={() => openEditor()} className="button-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Template</span>
        </button>
        }
        />

      <div className="grid gap-8">
        <TemplateSearch value={search} onChange={setSearch} />
        <TemplateGrid
          templates={filteredTemplates}
          openDropdownId={openDropdownId}
          onDropdownToggle={(id) => setOpenDropdownId(openDropdownId === id ? null: id)}
          onPreview={(template) => {
            setSelectedTemplateForPreview(template);
            setOpenDropdownId(null);
          }}
          onEdit={(template) => {
            openEditor(template);
            setOpenDropdownId(null);
          }}
          onDelete={handleDeleteTemplate}
          />
      </div>

      <TemplatePreviewModal
        isOpen={!!selectedTemplateForPreview}
        onClose={() => setSelectedTemplateForPreview(null)}
        template={selectedTemplateForPreview}
        onApply={(startTime) => selectedTemplateForPreview && handleApplyTemplate(selectedTemplateForPreview, startTime)}
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
        onAddItem={() => setFormItems([...formItems, { title: 'New Item', duration: 5, description: '' }])}
        onRemoveItem={(index) => setFormItems(formItems.filter((_, i) => i !== index))}
        onUpdateItem={updateItem}
        />
    </div>
  );
}