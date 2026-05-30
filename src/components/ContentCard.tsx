import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface ContentCardProps {
    title: ReactNode;
    headerRight?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    className?: string;
    bodyClassName?: string;
    headerClassName?: string;
    footerClassName?: string;
}

export default function ContentCard({
    title,
    headerRight,
    footer,
    children,
    className,
    bodyClassName,
    headerClassName,
    footerClassName
}: ContentCardProps) {
    return (
        <section className={cn("overflow-hidden rounded-xl border border-border bg-white", className)}>
            <div
                className={cn(
                    "flex items-center justify-between gap-3 bg-slate-50/50 border-b border-border px-3 py-2",
                    headerClassName
                )}
            >
                <h2 className="truncate font-semibold tracking-tight text-secondary">
                    {title}
                </h2>
                {headerRight && (
                    <div className="shrink-0 text-sm font-bold leading-tight text-secondary">
                        {headerRight}
                    </div>
                )}
            </div>

            <div className={cn("overflow-y-auto", bodyClassName)}>{children}</div>

            {footer && (
                <div
                    className={cn(
                        "h-10 flex items-center justify-between gap-3 border-t border-border px-3 py-2",
                        footerClassName
                    )}
                >
                    {footer}
                </div>
            )}
        </section>
    );
}
