import { BarChart3 } from "lucide-react";

interface MetricEmptyStateProps {
    message?: string;
}

export default function MetricEmptyState({
    message = "No data yet"
}: MetricEmptyStateProps) {
    return (
        <div className="flex h-36 items-center justify-center px-4 text-center">
            <div className="space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
                    <BarChart3 className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-secondary">{message}</p>
                <p className="text-xs text-muted">Metrics will appear once meetings are available.</p>
            </div>
        </div>
    );
}
