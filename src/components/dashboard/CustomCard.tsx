import { ChevronRight } from 'lucide-react';
import React from 'react'

type Props = {
    okText?: string;
    onOk?: () => void;
    icon?: React.ElementType;
    title: string;
    children?: React.ReactNode;
    headerAction?: () => void;
    headerActionText?: string;
    className?: string;
}

const CustomCard = (props: Props) => {
    return (
        <div className={`${props.className} rounded-2xl border border-border bg-white p-5 shadow-sm`}>
            <div className="flex justify-between">
                <div className="mb-3 flex items-center gap-2">
                    {props.icon && <props.icon className="h-3.5 w-3.5 text-primary" />}
                    <h3 className="font-semibold text-secondary">{props.title}</h3>
                </div>
                {props.headerAction &&
                    <button
                        className='flex h-6 items-center justify-center rounded border px-2 text-[10px] font-bold text-primary hover:bg-primary/10'
                        onClick={props.headerAction}
                    >
                        {props.headerActionText ?? <ChevronRight size={16} />}
                    </button>}
            </div>

            <div className="text-sm mb-4 text-muted-foreground">
                {props.children}
            </div>
            {props.onOk && props.okText &&
                <div className="grid grid-cols-1 gap-2">
                    <button
                        onClick={props.onOk}
                        className="mt-2 w-full rounded-xl border border-dashed border-border py-2.5  transition-all hover:border-primary hover:text-primary"
                    >
                        {props.okText}
                    </button>
                </div>}
        </div>

    )
}

export default CustomCard
