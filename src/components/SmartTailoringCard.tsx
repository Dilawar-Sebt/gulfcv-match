import React, { useState } from 'react';
import { TailoringTip } from '../types';
import { Sparkles, Copy, Check, Lightbulb, ShieldAlert } from 'lucide-react';

interface SmartTailoringCardProps {
  tips: TailoringTip[];
}

export const SmartTailoringCard: React.FC<SmartTailoringCardProps> = ({ tips }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (tips.length === 0) return null;

  const handleCopy = async (bullet: string, index: number) => {
    try {
      await navigator.clipboard.writeText(bullet);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 card-print">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
            <Sparkles className="w-4 h-4" />
          </span>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            AI-Style Resume Tailoring Assistant (JobSprout Methodology)
          </h3>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Contextual bullet point suggestions showing you how to naturally incorporate missing clusters without awkward keyword stuffing.
        </p>
      </div>

      {/* Advisory Banner */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Authenticity Rule:</strong> These sample bullets illustrate how to weave keywords into measurable achievements. Adapt the company context and numbers to reflect your actual past performance.
        </div>
      </div>

      {/* Tips Cards */}
      <div className="space-y-4">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                  {tip.clusterTitle}
                </span>
                <span className="text-xs text-slate-500">
                  Addresses: <strong>{tip.missingKeywords.join(', ')}</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(tip.sampleBullet, idx)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors self-start sm:self-auto shadow-2xs"
                title="Copy suggested bullet point"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Bullet</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-600 flex items-start gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
              <span>{tip.suggestedAction}</span>
            </p>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed italic">
              • {tip.sampleBullet}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
