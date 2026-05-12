import { BotIcon, Loader2, Shield, Sparkles } from 'lucide-react';
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
  onDismissAnalysis
}: AiCoachPanelProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-amber-50 text-primary">
          <BotIcon className="h-3 w-3" />
        </div>
        <h3 className="text-left  font-semibold text-secondary">AI Generator</h3>
      </div>
      <div className="space-y-3 rounded-xl border border-border bg-slate-50 p-4">
        <p className="text-left text-[10px] leading-relaxed text-muted">
          Describe what the meeting is about and AI will suggest topics.
        </p>
        <textarea
          value={aiContext}
          onChange={(e) => onContextChange(e.target.value)}
          placeholder="e.g. Planning the product roadmap..."
          className="min-h-[80px] w-full resize-none rounded-lg border border-border bg-white p-3 text-[11px] focus:border-primary focus:outline-none"
        />
        <button
          disabled={isGenerating || !aiContext.trim()}
          onClick={onGenerate}
          className="button-primary flex w-full items-center justify-center gap-2 py-1.5 text-[11px]"
        >
          {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
          Generate
        </button>
      </div>

      <div className="space-y-2">
        <button
          disabled={isAnalyzing || agenda.length === 0}
          onClick={onAnalyze}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 py-2 text-[10px] font-bold text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
        >
          {isAnalyzing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Shield className="h-3 w-3" />}
          Coach Beta: Review Agenda
        </button>

        {analysisResult && (
          <div className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-left">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-700">AI Feedback</p>
              <button onClick={onDismissAnalysis} className="text-[10px] text-emerald-500 hover:text-emerald-700">Dismiss</button>
            </div>
            <div className="space-y-1 text-[10px] leading-relaxed text-emerald-900">
              {analysisResult.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
