import React, { useState, useEffect } from "react";
import { Input, InputNumber, Form } from "antd";
import CustomModal from "./CustomModal";
import { Clock, AlignLeft, Type } from "lucide-react";
import toast from "react-hot-toast";
import {
    useUpdateAgendaItemMutation,
    useAddAgendaItemMutation
} from "../features/meetings/meetingsApi";
import { AgendaItem } from "../types";
import { usePopup } from "../context/PopupContext";

interface AgendaItemModalProps {
    data?: AgendaItem;
    meetingId?: string;
}

export default function AgendaItemModal({
    data,
    meetingId
}: AgendaItemModalProps) {
    const { closeModal } = usePopup();
    const [updateAgendaItem, { isLoading: isUpdatingAgenda }] =
        useUpdateAgendaItemMutation();
    const [addAgendaItem, { isLoading: isAddingAgenda }] =
        useAddAgendaItemMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (!data) return;
        const initialData = {
            title: data.title,
            description: data.description,
            duration: data.duration
        };

        form.setFieldsValue(initialData);
    }, [data]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (!data) {
                await addAgendaItem({ meetingId, item: values }).unwrap();
                toast.success("Agenda topic added.");
                closeModal();
                return;
            } else {
                await updateAgendaItem({
                    meetingId,
                    itemId: data.id,
                    data: values
                }).unwrap();
                toast.success("Agenda topic updated.");
                closeModal();
            }
        } catch (error) {
            console.error(error);
            toast.error(
                data
                    ? "Unable to update agenda topic."
                    : "Unable to add agenda topic."
            );
        }
    };

    const loading = isUpdatingAgenda || isAddingAgenda;

    return (
        <CustomModal
            icon={<Type className="h-5 w-5 text-primary" />}
            title={data ? "Edit Agenda" : "Add Agenda"}
            onOk={handleSubmit}
            okText="Save Changes"
            loading={loading}
        >
            <Form form={form}>
                <Form.Item required name="title" label="Topic">
                    <Input
                        autoFocus
                        required
                        placeholder="e.g., Marketing Update"
                        className="w-full h-9! text-xs!"
                    />
                </Form.Item>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Form.Item required name="duration" label="Duration (mins)">
                        <InputNumber
                            min={1}
                            required
                            className="w-full! text-xs! h-9!"
                        />
                    </Form.Item>
                </div>

                <Form.Item name="description" label="Description (optional)">
                    <Input.TextArea
                        rows={6}
                        placeholder="Details about this topic..."
                        className="w-full text-xs! pt-2!"
                    />
                </Form.Item>
            </Form>
        </CustomModal>
    );
}
