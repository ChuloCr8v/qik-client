import React from 'react'
import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const GradientCard = (props: Props) => {
    return (
        <div {...props} className={twMerge("gap-3 p-3 rounded-xl border border-border bg-gray-50 from-primary/10 to-transparent shadow-xs", props.className)}>
            {props.children}
        </div>
    )
}

export default GradientCard
