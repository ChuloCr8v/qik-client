import { Play } from 'lucide-react'
import React from 'react'

type Props = {}

const GuideLineCard = (props: Props) => {
    return (
        <div className="rounded-2xl border border-border bg-amber-50/30 p-5 col-span-2 h-fit">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-secondary">
                <Play className="h-3 w-3 text-primary" />
                <span className="text-[12px]">Quick Guide</span>
            </h4>
            <ul className="space-y-3 text-[11px] font-medium text-muted">
                <li className="flex gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white font-semibold shadow-xs">1</span>
                    Create a meeting room and share the link.
                </li>
                <li className="flex gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white font-semibold shadow-xs">2</span>
                    Use AI to generate a professional agenda in seconds.
                </li>
                <li className="flex gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white font-semibold shadow-xs">3</span>
                    Collaborate in real-time and export to PDF.
                </li>
            </ul>
        </div>
    )
}

export default GuideLineCard