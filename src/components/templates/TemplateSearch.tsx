import { Search } from 'lucide-react';
import { Input } from 'antd';

interface TemplateSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TemplateSearch({ value, onChange }: TemplateSearchProps) {
  return (
    <Input
        prefix={<Search className="h-4 w-4 text-muted" />}
        placeholder="Search templates..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
  );
}
