import React from 'react';

interface SectionHeadingProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function SectionHeading({
  title, description, action
}: SectionHeadingProps) {
  return (
    <div className="border-b border-border pb-1 mb-6">
      <div className="flex flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-semibold tracking-tight text-secondary sm:text-base break-words">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 max-w-[200px] sm:max-w-xl text-[11px] text-muted leading-relaxed">
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