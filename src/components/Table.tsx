import React from 'react';
import { cn } from '../lib/utils';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export default function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-border bg-white shadow-xs", className)}>
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="border-b border-border bg-slate-50/50">
          <tr>
            {headers.map((header, i) => (
              <th 
                key={i} 
                className="px-3 py-2 sm:px-4 sm:py-2.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-muted/80"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export const TableRow: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string; key?: string | number }> = ({ children, onClick, className }) => {
  return (
    <tr 
      onClick={onClick}
      className={cn(
        "group transition-colors hover:bg-slate-50/50",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </tr>
  );
};

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <td className={cn("px-3 py-2 sm:px-4 sm:py-2.5 whitespace-nowrap", className)}>
      {children}
    </td>
  );
};
