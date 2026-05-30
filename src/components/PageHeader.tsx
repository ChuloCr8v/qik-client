import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  title, description, action
}: PageHeaderProps) {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-semibold tracking-tight text-secondary sm:text-base break-words">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 hidden sm:block max-w-[200px] sm:max-w-xl text-xs text-muted leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="flex shrink-0 items-center pt-1">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
