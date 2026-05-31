import { Button, Checkbox, Drawer, Spin } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Activity, AlertTriangle } from "lucide-react";
import { usePopup } from "../context/PopupContext";
import { ModalTheme } from "./CustomModal";

interface Props {
    title: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
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
    actionItem?: ReactNode;
    hideCancelButton?: boolean;
    headerActions?: ReactNode;
}

export default function CustomDrawer({
    children,
    isOpen,
    loading,
    icon,
    onClose,
    onCancel,
    modalSubtitle,
    okText,
    step,
    showConfirmation,
    confirmationText,
    onOk,
    closable = true,
    title,
    width = 480,
    disabled = false,
    modalTheme = ModalTheme.DEFAULT,
    hideFooter = false,
    maxHeight = false,
    actionItem,
    hideCancelButton = false,
    headerActions
}: Props) {
    const [stepButtons, setStepButtons] = useState(step ?? false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { closeDrawer, isDrawerOpen } = usePopup();
    const warning = modalTheme === ModalTheme.WARNING;

    useEffect(() => {
        setStepButtons(step ?? false);
    }, [step]);

    const header = (
        <div
            className={twMerge(
                "flex w-full items-center justify-between bg-linear-to-r from-primary/10 via-amber-50 to-emerald-50 px-4 py-3",
                warning && "from-red-50 via-red-50 to-red-100"
            )}
        >
            <div className="flex w-full items-center gap-3">
                <div
                    className={twMerge(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-xs",
                        warning && "text-red-600",
                        !modalSubtitle && "h-8 w-8"
                    )}
                >
                    {icon ??
                        (warning ? (
                            <AlertTriangle className="h-5 w-5" />
                        ) : (
                            <Activity className="h-5 w-5" />
                        ))}
                </div>
                <div className="min-w-0">
                    <p
                        className={twMerge(
                            "truncate text-xs md:text-base font-semibold capitalize text-secondary",
                            !modalSubtitle && "text-sm"
                        )}
                    >
                        {title}
                    </p>
                </div>
            </div>
            {headerActions ? (
                <div className="flex items-center gap-2">{headerActions}</div>
            ) : actionItem ? (
                <div>{actionItem}</div>
            ) : null}
        </div>
    );

    return (
        <Drawer
            open={isOpen ?? isDrawerOpen}
            onClose={onCancel ?? onClose ?? closeDrawer}
            closable={false}
            width={width}
            maskClosable={false}
            classNames={{ header: "!p-0", body: "!p-0", footer: "p-0!" }}
            title={header}
            placement="right"
            footer={
                !stepButtons && !hideFooter ? (
                    <div className="flex justify-end gap-3 px-4 py-2 bg-muted/5">
                        {!onOk ? (
                            <Button
                                className="px-8!"
                                onClick={onCancel ?? onClose ?? closeDrawer}
                            >
                                Close
                            </Button>
                        ) : (
                            <>
                                {!hideCancelButton && (
                                    <Button
                                        className="px-8!"
                                        onClick={onCancel ?? onClose ?? closeDrawer}
                                    >
                                        Cancel
                                    </Button>
                                )}
                                <Button
                                    onClick={onOk}
                                    loading={loading}
                                    type="primary"
                                    danger={warning}
                                    className="px-8!"
                                    disabled={
                                        showConfirmation ? !isConfirmed : disabled
                                    }
                                >
                                    {okText ?? "Submit"}
                                </Button>
                            </>
                        )}
                    </div>
                ) : null
            }
        >
            <div
                className={twMerge(
                    "w-full px-4 py-4",
                    maxHeight && "h-full max-h-[96%] overflow-y-auto"
                )}
            >
                {loading ? (
                    <div className="flex h-full items-center justify-center py-10">
                        <Spin />
                    </div>
                ) : (
                    children
                )}
            </div>
            {showConfirmation && !loading && (
                <div className="w-full px-4 pb-4">
                    <Checkbox
                        onChange={event => setIsConfirmed(event.target.checked)}
                    >
                        <span className="text-sm text-muted">
                            {confirmationText ?? "I confirm this action"}
                        </span>
                    </Checkbox>
                </div>
            )}
        </Drawer>
    );
}
