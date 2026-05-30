import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    className,
    icon
}: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={cn(
                                "pointer-events-auto w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 flex flex-col",
                                className
                            )}
                        >
                            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-50">
                                <div className="flex items-start gap-4 flex-1 pr-4">
                                    {icon && (
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100/50">
                                            {icon}
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        {typeof title === "string" ? (
                                            <h3 className="text-base! font-semibold text-secondary">
                                                {title}
                                            </h3>
                                        ) : (
                                            title
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="rounded-xl p-1.5 text-muted hover:bg-slate-100 hover:text-primary transition-all shrink-0"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="px-6 py-2 pb-4 text-sm flex-1">
                                {children}
                            </div>
                            {footer && (
                                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
