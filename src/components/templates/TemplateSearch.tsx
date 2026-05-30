import { Search } from 'lucide-react';

interface TemplateSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TemplateSearch({ value, onChange }: TemplateSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="text"
        placeholder="Search templates..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-white py-2.5 pl-10! pr-4 text-sm font-medium shadow-xs outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/10"
      />
    </div>
  );
}
