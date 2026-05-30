import { Button, Checkbox, Modal, Spin } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { AlertTriangle, Activity } from "lucide-react";
import { usePopup } from "../context/PopupContext";

export enum ModalTheme {
    WARNING = "WARNING",
    DEFAULT = "DEFAULT",
}

interface Props {
    title: string;
    children: ReactNode;
    okText?: string;
    onCancel?: () => void;
    onOk?: () => void;
    modalSubtitle?: string;
    icon?: ReactNode;
    loading?: boolean;
    closable?: boolean;
    isDanger?: boolean;
    width?: number | string;
    disabled?: boolean;
    step?: boolean;
    showConfirmation?: boolean;
    confirmationText?: string;
    modalTheme?: ModalTheme;
    hideFooter?: boolean;
    maxHeight?: boolean;
    hideCancelButton?: boolean;
    footer?: ReactNode;
}

export default function CustomModal({
    children,
    loading,
    icon,
    onCancel,
    modalSubtitle,
    okText,
    step,
    showConfirmation,
    confirmationText,
    onOk,
    closable,
    title,
    isDanger = false,
    width = 680,
    disabled = false,
    modalTheme = ModalTheme.DEFAULT,
    hideFooter = false,
    maxHeight = true,
    hideCancelButton = false,
    footer
}: Props) {
    const [stepButtons, setStepButtons] = useState(step ?? false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { closeModal, isModalOpen } = usePopup();
    const warning = modalTheme === ModalTheme.WARNING;

    useEffect(() => {
        setStepButtons(step ?? false);
    }, [step]);

    return (
        <Modal
            open={isModalOpen}
            onCancel={onCancel ?? closeModal}
            footer={false}
            maskClosable={false}
            closable={closable ?? true}
            confirmLoading={loading}
            width={width}
            centered
            className="qa-custom-modal"
            styles={{ container: { padding: 0 } }}
        >
            <div className="flex max-h-[calc(100vh-48px)] flex-col overflow-hidden rounded-xl">
                <div
                    className={twMerge(
                        "flex w-full items-center gap-3 bg-linear-to-r from-primary/10 via-amber-50 to-emerald-50 px-4 py-4",
                        warning && "from-red-50 via-red-50 to-red-100"
                    )}
                >
                    <div
                        className={twMerge(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-xs",
                            warning && "text-red-600"
                        )}
                    >
                        {icon ?? (warning ? <AlertTriangle className="h-5 w-5" /> : <Activity className="h-5 w-5" />)}
                    </div>

                    <div className="min-w-0 text-left">
                        <p className="truncate text-sm font-semibold capitalize text-secondary">
                            {title}
                        </p>
                        {modalSubtitle && (
                            <p className="mt-0.5 text-xs leading-tight text-muted">
                                {modalSubtitle}
                            </p>
                        )}
                    </div>
                </div>

                <div
                    className={twMerge(
                        "w-full overflow-x-hidden px-6 py-5",
                        maxHeight && "max-h-[min(70vh,640px)] overflow-y-auto"
                    )}
                >
                    {loading ? (
                        <div className="flex h-full min-h-40 items-center justify-center py-10">
                            <Spin />
                        </div>
                    ) : (
                        children
                    )}
                </div>

                {showConfirmation && !loading && (
                    <div className="w-full px-6 pb-4">
                        <Checkbox onChange={event => setIsConfirmed(event.target.checked)}>
                            <span className="text-sm text-muted">
                                {confirmationText ?? "I confirm this action"}
                            </span>
                        </Checkbox>
                    </div>
                )}

                {footer ? <div className="px-6 py-4 pt-0">
                    {footer}
                </div> : !stepButtons && !hideFooter && (
                    <div className="w-full border-t border-border px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                            {!hideCancelButton && (
                                <Button onClick={onCancel ?? closeModal}>
                                    Cancel
                                </Button>
                            )}
                            <Button
                                onClick={onOk}
                                loading={loading}
                                type="primary"
                                danger={isDanger}
                                disabled={disabled || (showConfirmation ? !isConfirmed : false)}
                            >
                                {okText ?? "Submit"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
