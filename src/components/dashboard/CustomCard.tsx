import { ChevronRight } from 'lucide-react';
import React from 'react'
import { Button } from 'antd';

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
        <div className={`${props.className} rounded-2xl border border-border bg-white p-5  `}>
            <div className="flex justify-between">
                <div className="mb-3 flex items-center gap-2">
                    {props.icon && <props.icon className="h-3.5 w-3.5 text-primary" />}
                    <h3 className="font-semibold text-secondary">{props.title}</h3>
                </div>
                {props.headerAction &&
                    <Button
                        type="text"
                        size="small"
                        className="text-primary!"
                        onClick={props.headerAction}
                    >
                        {props.headerActionText ?? <ChevronRight size={16} />}
                    </Button>}
            </div>

            <div className="text-sm mb-4 text-muted-foreground">
                {props.children}
            </div>
            {props.onOk && props.okText &&
                <div className="grid grid-cols-1 gap-2">
                    <Button
                        onClick={props.onOk}
                        className="mt-2 w-full border-dashed!"
                    >
                        {props.okText}
                    </Button>
                </div>}
        </div>

    )
}

export default CustomCard
