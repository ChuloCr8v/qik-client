import { Bot, BotIcon, Shield, Sparkles } from 'lucide-react';
import { Alert, Button, Input } from 'antd';
import { AgendaItem } from '../../types';

interface AiCoachPanelProps {
  aiContext: string;
  agenda: AgendaItem[];
  isGenerating: boolean;
  isAnalyzing: boolean;
  analysisResult: string | null;
  onContextChange: (value: string) => void;
  onGenerate: () => void;
  onAnalyze: () => void;
  onDismissAnalysis: () => void;
  aiAvailable?: boolean;
}

export default function AiCoachPanel({
  aiContext,
  agenda,
  isGenerating,
  isAnalyzing,
  analysisResult,
  onContextChange,
  onGenerate,
  onAnalyze,
  onDismissAnalysis,
  aiAvailable = true
}: AiCoachPanelProps) {
  const unavailableMessage = 'AI is temporarily unavailable because the provider is not configured.';

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
          <BotIcon className="h-4 w-4" />
        </div>
        <h3 className="text-left  font-semibold text-secondary">AI Generator</h3>
      </div>
      <div className="space-y-3! bg-slate-50">
        {!aiAvailable && (
          <Alert
            type="warning"
            showIcon
            message="AI unavailable"
            description={unavailableMessage}
          />
        )}
        <p className="text-left text-sm text-muted">
          Describe what the meeting is about and AI will suggest topics.
        </p>
        <Input.TextArea
          value={aiContext}
          onChange={(e) => onContextChange(e.target.value)}
          placeholder="e.g. Planning the product roadmap..."
          autoSize={{ minRows: 3, maxRows: 6 }}
          className='text-xs! mt-3!'
        />
        <Button
          type="primary"
          block
          disabled={!aiAvailable || isGenerating || !aiContext.trim()}
          loading={isGenerating}
          onClick={onGenerate}
          icon={!isGenerating ? <Sparkles className="h-3 w-3" /> : undefined}
        >
          Generate
        </Button>
      </div>

      <div className="space-y-2">
        <Button
          block
          disabled={!aiAvailable || isAnalyzing || agenda.length === 0}
          loading={isAnalyzing}
          onClick={onAnalyze}
          icon={!isAnalyzing ? <Bot className="h-3 w-3" /> : undefined}
          className="border-primary/20! bg-primary/5! text-xs! text-primary!"
        >
          QikBot Agenda Review
        </Button>

        {analysisResult && (
          <div className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-left">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-sm font-bold uppercase  text-emerald-700">AI Feedback</p>
              <Button type="link" size="small" onClick={onDismissAnalysis} className="text-emerald-600!">Dismiss</Button>
            </div>
            <div className="space-y-1 text-sm leading-relaxed text-emerald-900">
              {analysisResult.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
